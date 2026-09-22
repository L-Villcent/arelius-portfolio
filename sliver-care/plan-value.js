/* Value copy and isolated examples. Prices and allowances come from SCare.PLANS. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./product-core.js'));else root.CarePlanValue=factory(root.SCare);})(typeof globalThis!=='undefined'?globalThis:this,function(C){
 'use strict';
 const copy={
  plus:{title:'Everyday family care',zh:'日常照护，有分工有记录',who:'Families sharing the daily care of a parent.',value:'See who is responsible, what still needs follow-up and what the family recorded.',extra:'Adds multiple reminder plans, family roles and a downloadable weekly report.',benefits:['2 care recipients · 4 family roles','Named responsibility & multiple plans','Weekly report & record export']},
  pro5:{title:'Clearer shifts & handovers',zh:'多人轮换，交接清楚',who:'Families rotating care between several people.',value:'Keep a named owner when shifts change or a backup needs to take over.',extra:'Adds rota, backup responsibility, adjustable follow-up rules and care overview.',benefits:['5 care recipients · 8 family roles','Rotas, backups & handover notes','Adjustable follow-up & overview']},
  pro20:{title:'More frequent record summaries',zh:'相同照护，更高整理额度',who:'Families who need to organise records more often.',value:'Generate more summaries and handover drafts from saved records.',extra:'¥20 more per month than Pro 5x adds 300 generations. All care features stay the same.',benefits:['All Pro 5x care features included','100 to 400 generations / month','Same model quality · more usage']}
 };
 const rules=[
  ['One successful draft = one use','A saved successful template generation counts once. Each new successful regeneration counts again.'],
  ['Failures and cancellations = zero','Failed, cancelled or invalid requests do not consume allowance. Viewing or saving an existing result and exporting a care report are free.'],
  ['One allowance for the family','All care recipients and family roles share one counter in this local household. Roles are not connected remote accounts.'],
  ['Monthly, including annual plans','Unused allowance does not roll over. A new demo cycle resets the used counter; past drafts remain. The local cycle is advanced manually.'],
  ['Changing plans keeps usage','Upgrading or downgrading preserves this cycle’s used count. Basic reminders, responses and manual follow-up continue after exhaustion.']
 ];
 function scenario(planId,step=0){
  if(!copy[planId]||!Number.isInteger(step)||step<0||step>2)throw Error('Unknown care scenario.');
  const s=C.newState();s.clock=Date.UTC(2026,8,14,8);s.caregivers[0].name='Maya';
  C.activate(s,planId==='pro20'?'pro5':planId,'month','success','isolated-example');
  const brother=C.addCaregiver(s,'Leo','Adult child');
  if(planId==='pro5'){
   C.saveSchedule(s,{...s.schedules[0],backupId:brother.id,remindAfter:10,followAfter:25});
   C.setRota(s,'r1','g1','2026-09-14');C.setRota(s,'r1',brother.id,'2026-09-15');
  }
  const item=C.startCase(s,'t1');let title='',note='',result='';
  if(planId==='plus'){
   C.act(s,item.id,'help');title='A request with a named owner';note='Margaret requested help. Maya is responsible for the follow-up.';
   if(step>=1){C.act(s,item.id,'resolve','Maya spoke with Margaret and recorded the agreed follow-up for lunch.');title='The family records what happened';note='Maya saved an outcome. This item is no longer open.';}
   if(step===2){result=C.report(s);title='The same note appears in the report';note='A report from saved actions, using zero AI generations.';}
  }else if(planId==='pro5'){
   C.act(s,item.id,'note','Maya: the lunch follow-up still needs a response.');C.act(s,item.id,'help');title='Monday: Maya is on duty';note='Leo is the backup. Tuesday’s rota names Leo for new items.';
   if(step>=1){C.advance(s,1440);C.handover(s,item.id,brother.id,'Lunch follow-up is still open. Leo will contact Margaret and record the outcome.');title='Tuesday: Leo receives the handover';note='The existing open item changes owner explicitly; its note stays attached.';}
   if(step===2){result=C.report(s);title='Open work survives the change of day';note='The report shows Leo, the unresolved item and the handover note.';}
  }else{
   for(let n=0;n<C.PLANS.pro5.ai;n++)C.generate(s,'summary','r1');
   title='100 successful drafts in this example';note='Pro 5x has no allowance left. The care item remains available.';
   if(step>=1){C.activate(s,'pro20','month','success','isolated-upgrade');title='20x adds 300 remaining uses';note='Used count stays at 100. The allowance is now 400. Care features do not change.';}
   if(step===2){result=C.generate(s,'handover','r1').text;title='One more handover draft';note='101 used, 299 remaining. Review the draft; nothing is sent.';}
  }
  return {state:s,title,note,result,owner:s.caregivers.find(g=>g.id===item.ownerId).name,status:C.STATUS[item.status],open:C.metrics(s).open,used:s.subscription.used,allowance:C.plan(s).ai};
 }
 return {copy,rules,scenario};
});
