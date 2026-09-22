/* Offline product rules. No network, real payments or clinical inference. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.SCare=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const VERSION=1;
 const PLANS=Object.freeze({
  free:{id:'free',name:'Free',month:0,year:0,recipients:1,caregivers:1,ai:0,rank:0},
  plus:{id:'plus',name:'Plus',month:39,year:390,recipients:2,caregivers:4,ai:20,rank:1},
  pro5:{id:'pro5',name:'Pro 5x',month:79,year:790,recipients:5,caregivers:8,ai:100,rank:2},
  pro20:{id:'pro20',name:'Pro 20x',month:99,year:990,recipients:5,caregivers:8,ai:400,rank:2}
 });
 const STATUS={waiting:'Waiting for a response',reminded:'Follow-up reminder',followup:'Family follow-up needed',help:'Help requested',confirmed:'Self-reported check-in',resolved:'Follow-up recorded'};
 const OPEN=['waiting','reminded','followup','help'];
 const clone=x=>JSON.parse(JSON.stringify(x));
 function check(ok,message){if(!ok)throw new Error(message);}
 function text(value,max=100){return String(value||'').trim().slice(0,max);}
 function id(s,prefix){return prefix+'-'+(++s.sequence);}
 function date(s){return new Date(s.clock).toISOString().slice(0,16).replace('T',' ');}
 function plan(s){return PLANS[s.subscription.plan];}
 function requireTier(s,rank){check(plan(s).rank>=rank,rank===2?'This action needs a Pro demo plan.':'This action needs a Plus or Pro demo plan.');}
 function recipient(s,rid){const r=s.recipients.find(x=>x.id===rid);check(r,'Choose a care recipient.');return r;}
 function caregiver(s,gid){const g=s.caregivers.find(x=>x.id===gid);check(g,'Choose a family caregiver.');return g;}
 function caseById(s,cid){const c=s.cases.find(x=>x.id===cid);check(c,'Care item not found.');return c;}
 function event(s,type,rid,cid,note,actorId){s.events.push({id:id(s,'event'),type,recipientId:rid,caseId:cid||'',note:text(note,1000),actorId:actorId||'',at:s.clock});}
 function newState(){return {version:VERSION,sequence:10,clock:Date.UTC(2026,8,15,8),subscription:{plan:'free',billing:'month',cycle:1,used:0,orders:[]},recipients:[{id:'r1',name:'Margaret',context:'Demo profile · lives independently'}],caregivers:[{id:'g1',name:'Alex',role:'Adult child'}],schedules:[{id:'t1',recipientId:'r1',title:'Morning check-in',time:'08:00',ownerId:'g1',backupId:'',remindAfter:30,followAfter:60,lastRunDay:''}],cases:[],events:[],handovers:[],rota:[],aiResults:[],drafts:[],outreach:[],offerRequests:[]};}
 function addRecipient(s,name,context){
  check(s.recipients.length<plan(s).recipients,'This demo plan’s recipient capacity is reached.');name=text(name,60);check(name,'Enter a fictional recipient name.');check(!s.recipients.some(r=>r.name.toLowerCase()===name.toLowerCase()),'That recipient name already exists.');
  const r={id:id(s,'recipient'),name,context:text(context,160)};s.recipients.push(r);return r;
 }
 function addCaregiver(s,name,role){
  check(s.caregivers.length<plan(s).caregivers,'This demo plan’s caregiver capacity is reached.');name=text(name,60);check(name,'Enter a fictional caregiver name.');check(!s.caregivers.some(g=>g.name.toLowerCase()===name.toLowerCase()),'That caregiver name already exists.');
  const g={id:id(s,'caregiver'),name,role:text(role,80)};s.caregivers.push(g);return g;
 }
 function saveSchedule(s,input){
  recipient(s,input.recipientId);caregiver(s,input.ownerId);const title=text(input.title,80);check(title,'Enter a reminder title.');check(/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(input.time),'Choose a valid time.');
  const existing=input.id?s.schedules.find(x=>x.id===input.id):null;if(input.id)check(existing,'Reminder plan not found.');if(!existing&&s.schedules.length>=1)requireTier(s,1);check(s.schedules.length<50||existing,'The offline demo supports up to 50 reminder plans.');
  if(plan(s).rank===0)check(input.recipientId===s.recipients[0].id&&input.ownerId===s.caregivers[0].id,'Free edits use the first profile and caregiver. Existing records remain accessible.');
  let remindAfter=30,followAfter=60,backupId='';
  if(plan(s).rank===2){remindAfter=Number(input.remindAfter);followAfter=Number(input.followAfter);check(Number.isInteger(remindAfter)&&remindAfter>=5&&remindAfter<=120,'Reminder delay must be 5–120 minutes.');check(Number.isInteger(followAfter)&&followAfter>remindAfter&&followAfter<=240,'Follow-up must be later than the reminder, up to 240 minutes.');backupId=input.backupId||'';if(backupId){caregiver(s,backupId);check(backupId!==input.ownerId,'Use a different backup caregiver.');}}
  const item={id:existing?.id||id(s,'schedule'),recipientId:input.recipientId,title,time:input.time,ownerId:input.ownerId,backupId,remindAfter,followAfter,lastRunDay:existing?.lastRunDay||''};if(existing)Object.assign(existing,item);else s.schedules.push(item);event(s,'plan',item.recipientId,'','Reminder plan saved: '+title,item.ownerId);return item;
 }
 function assignedOwner(s,t,at){if(plan(s).rank<2)return t.ownerId;const day=new Date(at).toISOString().slice(0,10);return s.rota.find(r=>r.day===day&&r.recipientId===t.recipientId)?.caregiverId||t.ownerId;}
 function startCase(s,tid,dueAt=s.clock){
  const t=s.schedules.find(x=>x.id===tid);check(t,'Choose a reminder plan.');if(plan(s).rank===0)check(t===s.schedules[0],'Additional saved reminder plans need Plus or Pro.');check(!s.cases.some(c=>c.scheduleId===tid&&OPEN.includes(c.status)),'Finish the open item for this reminder first.');
  const ownerId=assignedOwner(s,t,dueAt);const c={id:id(s,'case'),scheduleId:tid,recipientId:t.recipientId,title:t.title,ownerId,backupId:plan(s).rank===2&&t.backupId!==ownerId?t.backupId:'',remindAfter:plan(s).rank===2?t.remindAfter:30,followAfter:plan(s).rank===2?t.followAfter:60,status:'waiting',dueAt,updatedAt:s.clock};s.cases.push(c);t.lastRunDay=new Date(dueAt).toISOString().slice(0,10);event(s,'started',c.recipientId,c.id,'Reminder started: '+c.title,ownerId);return c;
 }
 function act(s,cid,action,note=''){
  const c=caseById(s,cid);
  if(action==='confirm'){check(['waiting','reminded'].includes(c.status),'This item needs family follow-up or is already closed.');c.status='confirmed';event(s,'confirmed',c.recipientId,c.id,'Self-reported check-in; medication intake is not verified.','');}
  else if(action==='help'){check(OPEN.includes(c.status),'Start a new reminder for another help request.');if(c.status==='help')return c;c.status='help';event(s,'help',c.recipientId,c.id,'Help requested in this local demo. No message was sent.',c.ownerId);}
  else if(action==='resolve'){check(OPEN.includes(c.status),'This item is already closed.');note=text(note,500);check(note,'Record what the family did and the outcome.');c.status='resolved';event(s,'resolved',c.recipientId,c.id,note,c.ownerId);}
  else if(action==='note'){note=text(note,500);check(note,'Enter a follow-up note.');event(s,'note',c.recipientId,c.id,note,c.ownerId);}
  else throw new Error('Unknown care action.');c.updatedAt=s.clock;return c;
 }
 function advance(s,minutes){
  check(Number.isInteger(minutes)&&minutes>0&&minutes<=1440,'Advance the demo by 1–1440 minutes.');const previous=s.clock;s.clock+=minutes*60000;const day=new Date(s.clock).toISOString().slice(0,10);const enabled=plan(s).rank>0?s.schedules:s.schedules.slice(0,1);
  for(let midnight=Math.floor(previous/86400000)*86400000;midnight<=s.clock;midnight+=86400000){const runDay=new Date(midnight).toISOString().slice(0,10);for(const t of enabled){const dueAt=Date.parse(runDay+'T'+t.time+':00Z');if(dueAt>previous&&dueAt<=s.clock&&t.lastRunDay!==runDay&&!s.cases.some(c=>c.scheduleId===t.id&&OPEN.includes(c.status)))startCase(s,t.id,dueAt);}}
  for(const c of s.cases){const age=(s.clock-c.dueAt)/60000;if(c.status==='waiting'&&age>=c.remindAfter){c.status='reminded';c.updatedAt=s.clock;event(s,'reminded',c.recipientId,c.id,'A follow-up reminder is shown locally.',c.ownerId);}if(c.status==='reminded'&&age>=c.followAfter){c.status='followup';c.updatedAt=s.clock;if(plan(s).rank===2&&c.backupId)c.ownerId=c.backupId;event(s,'followup',c.recipientId,c.id,'No response recorded; family follow-up is needed.',c.ownerId);}}
 }
 function setRota(s,recipientId,caregiverId,day){requireTier(s,2);recipient(s,recipientId);caregiver(s,caregiverId);check(/^\d{4}-\d{2}-\d{2}$/.test(day)&&Number.isFinite(Date.parse(day+'T00:00:00Z')),'Choose a rota date.');const old=s.rota.find(x=>x.day===day&&x.recipientId===recipientId);if(old)old.caregiverId=caregiverId;else s.rota.push({recipientId,caregiverId,day});event(s,'rota',recipientId,'','Duty scheduled for '+day,caregiverId);}
 function handover(s,cid,toId,note){requireTier(s,2);const c=caseById(s,cid);caregiver(s,toId);check(OPEN.includes(c.status),'Only open care items need a handover.');check(c.ownerId!==toId,'Choose a different caregiver.');note=text(note,500);check(note,'Add context for the next caregiver.');s.handovers.push({id:id(s,'handover'),caseId:cid,fromId:c.ownerId,toId,note,at:s.clock});c.ownerId=toId;c.updatedAt=s.clock;event(s,'handover',c.recipientId,cid,note,toId);}
 function activate(s,planId,billing,outcome,orderToken){
  check(PLANS[planId]&&planId!=='free','Choose a paid demo plan.');check(['month','year'].includes(billing),'Choose monthly or yearly.');check(['success','failure','cancel'].includes(outcome),'Choose a simulated outcome.');if(outcome!=='success')return {activated:false,outcome};check(typeof orderToken==='string'&&orderToken.length>0&&orderToken.length<100,'Order token is required.');
  const previous=s.subscription.orders.find(o=>o.token===orderToken);if(previous)return {activated:false,outcome:'duplicate',order:previous};const order={id:id(s,'order'),token:orderToken,plan:planId,billing,amount:PLANS[planId][billing],actualCharge:0,at:s.clock};s.subscription.plan=planId;s.subscription.billing=billing;s.subscription.orders.push(order);return {activated:true,outcome,order};
 }
 function resetPurchase(s){s.subscription.plan='free';s.subscription.billing='month';}
 function resetCare(s){const outreach=s.outreach,offerRequests=s.offerRequests;Object.assign(s,newState(),{outreach,offerRequests});}
 function nextCycle(s){s.subscription.cycle++;s.subscription.used=0;}
 function metrics(s,rid='all',days=7){
  const since=s.clock-days*86400000,inScope=x=>rid==='all'||x.recipientId===rid;
  const cases=s.cases.filter(c=>inScope(c)&&c.dueAt>=since&&c.dueAt<=s.clock);
  const openCases=s.cases.filter(c=>inScope(c)&&c.dueAt<=s.clock&&OPEN.includes(c.status));
  const events=s.events.filter(e=>inScope(e)&&e.at>=since&&e.at<=s.clock);
  return {cases,openCases,events,started:cases.length,confirmed:events.filter(e=>e.type==='confirmed').length,resolved:events.filter(e=>e.type==='resolved').length,open:openCases.length,help:events.filter(e=>e.type==='help').length};
 }
 function trend(s,rid='all',days=7){
  const m=metrics(s,rid,days),rows=new Map();
  for(let day=Math.floor((s.clock-days*86400000)/86400000)*86400000;day<=s.clock;day+=86400000)rows.set(new Date(day).toISOString().slice(0,10),{day:new Date(day).toISOString().slice(0,10),started:0,checkins:0,followups:0});
  for(const c of m.cases)rows.get(new Date(c.dueAt).toISOString().slice(0,10)).started++;
  for(const e of m.events){const row=rows.get(new Date(e.at).toISOString().slice(0,10));if(e.type==='confirmed')row.checkins++;if(e.type==='resolved')row.followups++;}
  return [...rows.values()];
 }
 function report(s,rid='all',days=7){
  requireTier(s,1);if(rid!=='all')recipient(s,rid);const m=metrics(s,rid,days);const lines=['SLIVER CARE · LOCAL CARE REPORT','Fictional classroom data · not a medical record','Demo clock: '+date(s),'Activity period: last '+days+' demo days','Open items include all saved dates, including earlier reminders.','Scope: '+(rid==='all'?'All saved demo profiles':recipient(s,rid).name),'Plan: '+plan(s).name,'','Reminders started: '+m.started,'Self-reported check-ins: '+m.confirmed,'Family follow-ups recorded: '+m.resolved,'Currently open (all saved dates): '+m.open,'Help requests recorded: '+m.help,'','CARE ITEMS STARTED IN THIS PERIOD'];
  const itemLine=c=>recipient(s,c.recipientId).name+' | '+c.title+' | '+STATUS[c.status]+' | Responsible: '+caregiver(s,c.ownerId).name;
  m.cases.forEach(c=>lines.push(itemLine(c)));if(!m.cases.length)lines.push('No care items started in this period.');
  const earlier=m.openCases.filter(c=>!m.cases.some(recent=>recent.id===c.id));if(earlier.length){lines.push('','OPEN ITEMS FROM EARLIER DATES');earlier.forEach(c=>lines.push(new Date(c.dueAt).toISOString().slice(0,16).replace('T',' ')+' | '+itemLine(c)));}
  lines.push('','FOLLOW-UP NOTES AND EVENTS IN THIS PERIOD');m.events.forEach(e=>lines.push(new Date(e.at).toISOString().slice(0,16).replace('T',' ')+' | '+recipient(s,e.recipientId).name+' | '+(e.caseId?caseById(s,e.caseId).title+' | ':'')+e.note));
  if(plan(s).rank===2){lines.push('','PRO · RECIPIENT OVERVIEW');s.recipients.filter(r=>rid==='all'||r.id===rid).forEach(r=>{const n=metrics(s,r.id,days);lines.push(r.name+': '+n.started+' started, '+n.confirmed+' check-ins, '+n.resolved+' follow-up outcomes in this period; '+n.open+' currently open across all saved dates.');});lines.push('','PRO · HANDOVERS IN THIS PERIOD');s.handovers.filter(h=>h.at>=s.clock-days*86400000&&h.at<=s.clock&&(rid==='all'||caseById(s,h.caseId).recipientId===rid)).forEach(h=>lines.push(caregiver(s,h.fromId).name+' → '+caregiver(s,h.toId).name+': '+h.note));}
  if(plan(s).rank===2){lines.push('','PRO · DAILY ACTIVITY IN THIS ROLLING PERIOD','Date | reminders started | check-in events | follow-up outcomes');trend(s,rid,days).forEach(r=>lines.push(r.day+' | '+r.started+' | '+r.checkins+' | '+r.followups));lines.push('Boundary dates can be partial days. Events reflect activity dates, not a clinical adherence rate.');}
  lines.push('','A check-in is a self-report, not verified medication intake. A resolved item records a family action, not clinical safety. No real notification, call, payment or AI service is connected.');return lines.join('\n');
 }
 function generate(s,kind,rid,background='',outcome='success'){
  requireTier(s,1);recipient(s,rid);check(['summary','handover','message'].includes(kind),'Choose an assistant template.');check(['success','failure','cancel'].includes(outcome),'Choose an outcome.');if(outcome!=='success')return null;check(s.subscription.used<plan(s).ai,'This cycle’s AI simulation allowance is used. Care and manual reporting remain available.');
  const m=metrics(s,rid),name=recipient(s,rid).name;let result='LOCAL TEMPLATE SIMULATION · NO LIVE AI\n';
  if(kind==='summary')result+=name+' / last seven demo days: '+m.started+' reminders started; '+m.confirmed+' self-reported check-ins; '+m.resolved+' recorded family follow-ups. Currently open across all saved dates: '+m.open+'.\n'+(m.events.length?'Latest recorded note: '+m.events[m.events.length-1].note:'No events are recorded in the last seven demo days.');
  if(kind==='handover')result+='Handover draft for '+name+'\nOpen items across all saved dates:\n'+(m.openCases.map(c=>c.title+' — '+STATUS[c.status]+'; responsible: '+caregiver(s,c.ownerId).name).join('\n')||'No open items across saved records.')+'\nReview these records with the next caregiver. This draft does not assign anyone.';
  if(kind==='message')result+='Hello '+name+', when you have a moment, please let us know how you are doing. If you would like help, please contact your family through your usual channel.';
  background=text(background,400);if(background)result+='\nUser-provided context (not independently verified): '+background;result+='\nReview before use. This text makes no medical assessment and is not sent automatically.';const item={id:id(s,'ai'),kind,recipientId:rid,text:result,at:s.clock,cycle:s.subscription.cycle};s.aiResults.push(item);s.subscription.used++;return item;
 }
 function saveDraft(s,resultId){const result=s.aiResults.find(x=>x.id===resultId);check(result,'Generated draft not found.');if(!s.drafts.some(x=>x.resultId===resultId))s.drafts.push({resultId,text:result.text,at:s.clock});}
 function validate(v){
  check(v&&v.version===VERSION,'Unsupported backup version.');check(Number.isInteger(v.sequence)&&v.sequence>=0&&Number.isFinite(v.clock),'Invalid demo state.');check(v.subscription&&PLANS[v.subscription.plan]&&['month','year'].includes(v.subscription.billing),'Invalid subscription.');check(Number.isInteger(v.subscription.used)&&v.subscription.used>=0&&Number.isInteger(v.subscription.cycle)&&v.subscription.cycle>0,'Invalid allowance.');
  for(const k of ['recipients','caregivers','schedules','cases','events','handovers','rota','aiResults','drafts','outreach','offerRequests'])check(Array.isArray(v[k])&&v[k].length<=10000,'Invalid collection: '+k);check(v.recipients.length>0&&v.caregivers.length>0&&Array.isArray(v.subscription.orders),'Missing household data.');
  for(const r of v.recipients)check(typeof r.id==='string'&&typeof r.name==='string'&&r.name.length<=60,'Invalid profile.');for(const g of v.caregivers)check(typeof g.id==='string'&&typeof g.name==='string','Invalid caregiver.');
  const ids=new Set();for(const x of [...v.recipients,...v.caregivers,...v.schedules,...v.cases,...v.events,...v.aiResults,...v.subscription.orders]){check(typeof x.id==='string'&&!ids.has(x.id),'Duplicate or invalid ID.');ids.add(x.id);}
  for(const t of v.schedules){recipient(v,t.recipientId);caregiver(v,t.ownerId);check(typeof t.title==='string'&&typeof t.time==='string'&&/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(t.time),'Invalid reminder.');check(Number.isFinite(t.remindAfter)&&t.remindAfter>0&&t.followAfter>t.remindAfter,'Invalid timing.');if(t.backupId)caregiver(v,t.backupId);}
  for(const c of v.cases){recipient(v,c.recipientId);caregiver(v,c.ownerId);check(STATUS[c.status]&&Number.isFinite(c.dueAt)&&typeof c.title==='string','Invalid care item.');}
  const validText=(x,max,empty=true)=>typeof x==='string'&&x.length<=max&&(empty||x.trim().length>0);
  const validTime=x=>Number.isFinite(x)&&Math.abs(x)<8e15;
  const validDay=x=>validText(x,10,false)&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(Date.parse(x+'T00:00:00Z'))&&new Date(x+'T00:00:00Z').toISOString().slice(0,10)===x;
  check(validTime(v.clock)&&Object.hasOwn(PLANS,v.subscription.plan),'Invalid clock or plan.');
  for(const r of v.recipients)check(validText(r.name,60,false)&&validText(r.context,160),'Invalid profile details.');
  for(const g of v.caregivers)check(validText(g.name,60,false)&&validText(g.role,80),'Invalid caregiver details.');
  for(const t of v.schedules)check(Number.isInteger(t.remindAfter)&&t.remindAfter>=5&&t.remindAfter<=120&&Number.isInteger(t.followAfter)&&t.followAfter<=240&&validText(t.title,80,false)&&(!t.lastRunDay||validDay(t.lastRunDay)),'Invalid reminder details.');
  for(const c of v.cases){check(v.schedules.some(t=>t.id===c.scheduleId&&t.recipientId===c.recipientId)&&validTime(c.dueAt)&&validTime(c.updatedAt)&&validText(c.title,80,false)&&Number.isInteger(c.remindAfter)&&c.remindAfter>=5&&c.remindAfter<=120&&Number.isInteger(c.followAfter)&&c.followAfter>c.remindAfter&&c.followAfter<=240,'Invalid care item details.');if(c.backupId)caregiver(v,c.backupId);}
  for(const e of v.events){recipient(v,e.recipientId);check(validTime(e.at)&&validText(e.note,1000)&&['plan','started','confirmed','help','resolved','note','reminded','followup','rota','handover'].includes(e.type),'Invalid event.');if(e.caseId)caseById(v,e.caseId);if(e.actorId)caregiver(v,e.actorId);}
  for(const a of v.aiResults){recipient(v,a.recipientId);check(validText(a.text,20000)&&['summary','handover','message'].includes(a.kind)&&validTime(a.at)&&Number.isInteger(a.cycle)&&a.cycle>0&&a.cycle<=v.subscription.cycle,'Invalid assistant result.');}
  const orderTokens=new Set();for(const o of v.subscription.orders){check(Object.hasOwn(PLANS,o.plan)&&o.plan!=='free'&&['month','year'].includes(o.billing)&&o.amount===PLANS[o.plan][o.billing]&&o.actualCharge===0&&validText(o.token,99,false)&&!orderTokens.has(o.token)&&validTime(o.at),'Invalid demo order.');orderTokens.add(o.token);}
  for(const h of v.handovers){check(validText(h.id,100,false)&&!ids.has(h.id)&&validText(h.note,500,false)&&validTime(h.at),'Invalid handover.');ids.add(h.id);caseById(v,h.caseId);caregiver(v,h.fromId);caregiver(v,h.toId);}
  const rotaKeys=new Set();for(const r of v.rota){recipient(v,r.recipientId);caregiver(v,r.caregiverId);const key=r.day+'/'+r.recipientId;check(validDay(r.day)&&!rotaKeys.has(key),'Invalid duty rota.');rotaKeys.add(key);}
  const draftKeys=new Set();for(const d of v.drafts){check(v.aiResults.some(a=>a.id===d.resultId)&&!draftKeys.has(d.resultId)&&validText(d.text,20000)&&validTime(d.at),'Invalid saved draft.');draftKeys.add(d.resultId);}
  for(const r of v.outreach)check(r.source==='actual-user-record'&&r.actual==='on'&&validText(r.target,120,false)&&validText(r.when,30,false)&&Number.isFinite(Date.parse(r.when))&&validText(r.channel,80,false)&&validText(r.offer,1200,false)&&validText(r.notes,1200,false)&&validText(r.evidence,200)&&validText(r.next,200)&&['positive','negative','no_response'].includes(r.outcome),'Invalid outreach record.');
  for(const r of v.offerRequests)check(r.source==='local-unsent-draft'&&validText(r.alias,60,false)&&validText(r.interest,100,false)&&validText(r.question,400,false),'Invalid evaluation draft.');
  for(const value of ids){const suffix=/-(\d+)$/.exec(value);if(suffix)check(Number(suffix[1])<=v.sequence,'Invalid sequence counter.');}
  return clone(v);
 }
 return {VERSION,PLANS,STATUS,OPEN,clone,newState,plan,date,addRecipient,addCaregiver,saveSchedule,startCase,act,advance,setRota,handover,activate,resetPurchase,resetCare,nextCycle,metrics,trend,report,generate,saveDraft,validate};
});
