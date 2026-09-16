'use strict';
const $ = s => document.querySelector(s);
const escapeHTML = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const states={
 WAITING:{title:'Awaiting check-in',en:'WAITING',detail:'The 08:00 reminder was sent. Waiting for Margaret to respond.',bg:'#fff5dd',fg:'#896322',line:'#ebdfbc',symbol:'◷'},
 CONFIRMED:{title:'Check-in confirmed',en:'CONFIRMED',detail:'Margaret has checked in. This does not verify that medication was taken.',bg:'#eaf4ed',fg:'#296543',line:'#cfe2d4',symbol:'✓'},
 REMINDER_SENT:{title:'Reminder sent',en:'REMINDER SENT',detail:'No response yet. A follow-up reminder has been sent.',bg:'#fff0db',fg:'#9a6624',line:'#edd9b7',symbol:'◷'},
 FOLLOW_UP_REQUIRED:{title:'Family follow-up needed',en:'FOLLOW-UP REQUIRED',detail:'Still no response. Please contact Margaret to check on her.',bg:'#fceae5',fg:'#a34a3c',line:'#eccdc4',symbol:'!'},
 EMERGENCY:{title:'Margaret needs help',en:'EMERGENCY',detail:'Please contact Margaret promptly. This demo does not alert emergency services.',bg:'#fae5e2',fg:'#a23531',line:'#e5bcb9',symbol:'!'},
 RESOLVED:{title:'Follow-up complete',en:'RESOLVED',detail:'Alex has completed the follow-up. This does not confirm medication was taken.',bg:'#eaf1f9',fg:'#436784',line:'#cddfeb',symbol:'✓'}
};
let state, timers=[], noticeTimer, syncTimer, history=[];
try {const saved=JSON.parse(localStorage.getItem('anxin-history-en')||'[]');if(Array.isArray(saved))history=saved.filter(x=>x&&typeof x.text==='string'&&typeof x.time==='string').slice(-200);}catch{}
const time=()=>`${String(Math.floor(state.minutes/60)%24).padStart(2,'0')}:${String(state.minutes%60).padStart(2,'0')}`;
function save(){try{localStorage.setItem('anxin-history-en',JSON.stringify(history.slice(-200)));}catch{}}
function addEvent(text){const e={time:time(),text};state.events.push(e);history.push({...e,date:'2026-09-15 (demo)'});history=history.slice(-200);save();}
function stop(){timers.forEach(clearTimeout);timers=[];director.cancel();}
function later(fn,ms){timers.push(setTimeout(fn,ms));}
function message(text){$('#demo-status').textContent=text;}
function notify(text,alert=false){clearTimeout(noticeTimer);$('#notification').textContent=text;$('#notification').classList.add('visible');noticeTimer=setTimeout(()=>$('#notification').classList.remove('visible'),2400);if(alert){$('#family-phone').classList.remove('shake');void $('#family-phone').offsetWidth;$('#family-phone').classList.add('shake');}}
function sync(text){clearTimeout(syncTimer);$('.connection').classList.add('sync');$('#sync-label').textContent='Syncing…';syncTimer=setTimeout(()=>{$('.connection').classList.remove('sync');$('#sync-label').textContent='Synced';},650);notify(text);}
function reset(){stop();clearTimeout(noticeTimer);clearTimeout(syncTimer);state={status:'WAITING',minutes:480,confirmedAt:null,helpRequested:false,events:[],note:'',resolvedAt:null};$('#notification').classList.remove('visible');$('.connection').classList.remove('sync');$('#sync-label').textContent='Connected';$('#family-phone').classList.remove('shake');addEvent('Initial medication reminder sent (demo)');render();message('Reset complete. Ready for a new demo.');}
function render(){
 document.querySelectorAll('.clock').forEach(el=>el.textContent=time());$('#demo-clock').textContent=time();
 const blocked=['EMERGENCY','FOLLOW_UP_REQUIRED','RESOLVED'].includes(state.status);
 const elderlyStatus=state.helpRequested?`<div class="success-panel help"><strong>${state.status==='RESOLVED'?'Help request resolved':'Help requested (demo)'}</strong>${state.status==='RESOLVED'?'Alex has recorded the outcome.':'No real alert is sent. In an emergency, contact local emergency services immediately.'}</div>`:state.confirmedAt?`<div class="success-panel"><strong>✓ Check-in complete</strong>Thank you. Your family view is up to date.<br>Check-in time ${state.confirmedAt}</div>`:'';
 $('#older-content').innerHTML=`<h3 class="greeting">Good morning,Margaret <span aria-hidden="true">☀</span></h3><p class="date">Tuesday, September 15</p>${elderlyStatus}<div class="med-card"><div class="card-overline"><span>Today’s medication</span><span class="pill-icon" aria-hidden="true">◒</span></div><div class="med-time">08:00<small>AM</small></div><div class="med-detail">After breakfast · Morning dose</div><div class="med-divider"></div><div class="med-bottom">${state.confirmedAt?'✓ Checked in today':state.status==='REMINDER_SENT'?'Reminder sent. Please check in.':blocked?'Please contact your family':'Take as prescribed'}</div></div><button class="elder-button confirm-button" data-action="confirm" ${state.confirmedAt||blocked?'disabled':''}>${state.confirmedAt?'✓ I’ve checked in':'✓ I’ve taken it'}</button><button class="elder-button help-button" data-action="help" ${state.status==='EMERGENCY'?'disabled':''}>${state.status==='EMERGENCY'?'Help requested':'♡ I need help'}</button><p class="elder-hint">Tap to confirm after taking your medication.<br>Let your family know you’ve checked in.</p><div class="elder-contact">Family contact: Alex<br><button data-action="call-family">Call family (demo) ↗</button></div>`;
 const s=states[state.status], canResolve=['FOLLOW_UP_REQUIRED','EMERGENCY'].includes(state.status), canRemind=state.status==='WAITING';
 $('#family-content').innerHTML=`<div class="family-top"><div><small>Care Together · Family care</small><h3>Good morning,Alex</h3></div><span class="avatar">A</span></div><div class="family-person"><span class="person-avatar">M</span><div><strong>Margaret’s status today</strong><small>Tuesday, September 15 · Demo profile</small></div></div><section class="state-card" aria-live="polite" style="--card-bg:${s.bg};--card-fg:${s.fg};--card-line:${s.line}"><div class="state-top"><span>${s.en}</span><span class="state-symbol">${s.symbol}</span></div><h3>${s.title}</h3><p>${state.status==='CONFIRMED'?`Check-in time ${state.confirmedAt}。 `:''}${state.status==='RESOLVED'?`Follow-up by Alex at ${state.resolvedAt}. ${escapeHTML(state.note)}`:s.detail}</p></section><div class="family-actions"><button class="primary" data-action="call">↗ Contact Margaret</button><button data-action="reminder" ${canRemind?'':'disabled'}>◷ Remind again</button><button data-action="resolve" ${canResolve?'':'disabled'}>✓ Resolve</button><button data-action="note">＋ Add note</button></div><div class="timeline-head"><h4>Today’s timeline</h4><button data-action="history">View history ↗</button></div><ol class="timeline">${state.events.map(e=>`<li><time>${e.time}</time><span>${escapeHTML(e.text)}</span></li>`).join('')}</ol>${state.events.length?'':'<p class="empty">No entries yet. Your next action will appear here.</p>'}<div class="family-foot">Demo updates sync within this page only</div>`;
}
const iconPaths={
 check:'<path d="m5 12 4 4L19 6"/>',
 clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
 heart:'<path d="M20.8 5.8a5 5 0 0 0-7.1 0L12 7.5l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21l8.8-8.1a5 5 0 0 0 0-7.1Z"/>',
 phone:'<path d="m7 3 3 5-3 2a15 15 0 0 0 7 7l2-3 5 3-1 4C10 22 2 14 3 4Z"/>',
 note:'<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8M8 12h8M8 16h4"/>',
 chevron:'<path d="m9 5 7 7-7 7"/>',
 pill:'<rect x="6" y="2" width="12" height="20" rx="6" transform="rotate(40 12 12)"/><path d="m7.4 8.1 9.2 7.8"/>',
 alert:'<path d="M12 7v6M12 17h.01"/><circle cx="12" cy="12" r="9"/>'
};
function uiIcon(name){return `<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${iconPaths[name]||iconPaths.check}</svg>`}
function polishPhones(){
 $('.greeting').innerHTML='<span class="greeting-small">Good morning,</span>Margaret';
 $('.pill-icon').innerHTML=uiIcon('pill');
 const labels={
  confirm:['check',state.confirmedAt?'I’ve checked in':'I’ve taken it'],
  help:['heart',state.status==='EMERGENCY'?'Help requested':'I need help'],
  call:['phone','Contact Margaret'],reminder:['clock','Remind again'],
  resolve:['check','Resolve'],note:['note','Add note'],
  'call-family':['phone','Call family (demo)'],history:['chevron','View history']
 };
 for(const [action,[icon,label]] of Object.entries(labels)){
  const button=$(`[data-action="${action}"]`);
  if(button)button.innerHTML=`${uiIcon(icon)}<span>${label}</span>`;
 }
 $('.state-symbol').innerHTML=uiIcon(['WAITING','REMINDER_SENT'].includes(state.status)?'clock':['EMERGENCY','FOLLOW_UP_REQUIRED'].includes(state.status)?'alert':'check');
}
const renderContent=render;
render=function(){renderContent();polishPhones()};
function confirmMedication(){if(state.confirmedAt||!['WAITING','REMINDER_SENT'].includes(state.status))return;stop();state.confirmedAt=time();state.status='CONFIRMED';addEvent('Margaret checked in');addEvent('Family view updated');render();sync('✓ Margaret has checked in');message('Check-in complete. Both screens are up to date.');}
function sendReminder(){if(state.status!=='WAITING')return;state.status='REMINDER_SENT';addEvent('No check-in received');addEvent('Follow-up reminder sent (demo)');render();sync('Follow-up reminder sent');message('Reminder sent. Waiting for a response.');}
function escalate(){if(state.status!=='REMINDER_SENT')return;state.status='FOLLOW_UP_REQUIRED';addEvent('Still no response. Family follow-up needed.');render();notify('Follow-up needed: Margaret has not responded',true);message('Use the family screen to make contact and record the outcome.');}
function requestHelp(){if(state.status==='EMERGENCY')return;stop();state.status='EMERGENCY';state.helpRequested=true;addEvent('Margaret requested help (demo)');render();sync('Urgent: Margaret needs help');notify('Urgent: Margaret needs help',true);message('Help request synced. Please follow up on the family screen.');}
function showModal(html){$('#modal-body').innerHTML=html;if(!$('#modal').open)$('#modal').showModal();}
function callOlderAdult(){showModal(`<h2>Contact Margaret</h2><p class="modal-copy">This is a simulated call; no call will be placed. In a real service, family members would check on the older adult and record the outcome.</p><button class="submit" data-action="record-call">Record a demo call</button>`);}
function showNote(resolve=false){showModal(`<h2>${resolve?'Record follow-up':'Add note'}</h2><p class="modal-copy">${resolve?'Record what you learned and the action taken. Resolving a case does not confirm medication on the older adult’s behalf.':'Notes are stored in this browser’s demo history. Do not enter real medical or private information.'}</p><form id="note-form"><label for="note-input">Follow-up notes${resolve?' (required)':''}</label><textarea id="note-input" maxlength="500" placeholder="Example: Made a demo call to Margaret; she said she was safe." required></textarea><button class="submit" type="submit">${resolve?'Save & resolve':'Save note'}</button></form>`);$('#note-form').addEventListener('submit',e=>{e.preventDefault();const note=$('#note-input').value.trim();if(!note)return;if(resolve&&!['FOLLOW_UP_REQUIRED','EMERGENCY'].includes(state.status)){return;}stop();state.note=note;if(resolve){state.status='RESOLVED';state.resolvedAt=time();addEvent(`Alex resolved: ${note}`);}else addEvent(`Alex noted: ${note}`);$('#modal').close();render();notify(resolve?'✓ Alex recorded the outcome':'Note saved');message(resolve?'Follow-up complete. This care flow is now closed.':'Note added');});}
function normal(){director.run('normal');}
function noResponse(){director.run('no-response');}
function advance(){stop();state.minutes+=30;if(state.status==='WAITING')sendReminder();else if(state.status==='REMINDER_SENT')escalate();else{render();message(`Demo time advanced to ${time()}`);}}
const actions={
 confirm:confirmMedication,help:requestHelp,normal,'no-response':noResponse,emergency:()=>director.run('emergency'),reminder:()=>{stop();sendReminder();},reset:()=>{reset();director.reset();},advance,call:callOlderAdult,
 'record-call':()=>{addEvent('Alex made a demo call to Margaret (no real call)');$('#modal').close();render();notify('Demo call recorded. Add the follow-up outcome.');},
 resolve:()=>{if(['FOLLOW_UP_REQUIRED','EMERGENCY'].includes(state.status))showNote(true);},note:()=>showNote(),
 history:()=>showModal(`<h2>Demo history</h2><p class="modal-copy">Saved in this browser · Resetting a scenario keeps history</p><div class="modal-history">${history.length?history.slice().reverse().map(e=>`<p><small>${escapeHTML(e.date||'Demo')} ${escapeHTML(e.time)}</small><br>${escapeHTML(e.text)}</p>`).join(''):'<p>No demo history yet.</p>'}</div>`),
 clear:()=>showModal('<h2>Clear demo history?</h2><p class="modal-copy">This deletes local history and today’s timeline without changing the current status. This cannot be undone.</p><button class="submit" data-action="confirm-clear">Clear history</button>'),
 'confirm-clear':()=>{stop();history=[];state.events=[];save();$('#modal').close();render();message('Local demo history cleared');},
 'call-family':()=>showModal('<h2>Contact Alex</h2><p class="modal-copy">This is a demo; no real call will be placed. Contact your family through your usual channels. In an emergency, contact local emergency services immediately.</p>'),
 about:()=>showModal('<h2>Care Together</h2><p class="modal-copy">Medication and Family Safety Check-in Service</p><p class="modal-copy">Explore a complete family care flow: reminders, check-ins, escalation after no response and recorded follow-up.</p><p class="modal-copy">All names, dates, times and notifications are fictional demo data. No real calls, messages, medical data or emergency systems are connected. Both screens share this page’s state; cross-device communication is not supported.</p><p class="modal-copy">This prototype is not a medical device. A check-in cannot verify that medication was taken or guarantee anyone’s safety. Do not use it for real medication monitoring.</p>'),
 'demo-focus':()=>{$('#demo-panel').scrollIntoView({behavior:'smooth',block:'center'});$('#demo-panel').focus({preventScroll:true});}
};
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;if(b.dataset.action)actions[b.dataset.action]?.();if(b.dataset.view){$('.workspace').dataset.view=b.dataset.view;document.querySelectorAll('[data-view]').forEach(x=>{if(x.tagName==='BUTTON'){x.classList.toggle('active',x.dataset.view===b.dataset.view);x.setAttribute('aria-pressed',String(x.dataset.view===b.dataset.view));}});}});
reset();
director.reset();
const feedback={
 confirm:['Check-in confirmed. Family view updated.','See the green status card and new timeline entries on the right.',' .state-card','Older adult → Family'],
 help:['Help request sent to the family view','An alert appears on the right. A family member should now make contact.','.state-card','Older adult → Family'],
 reminder:['Follow-up reminder sent','The left card shows the follow-up reminder. A response is still needed.','.med-card','Family → Older adult'],
 call:['Family prepares to make contact','This dialog simulates contact. No real call will be placed.',null,'Family Alex'],
 'record-call':['Demo call recorded','Next, select “Resolve” and record what you learned.','[data-action="resolve"]','Family Alex'],
 resolve:['Record follow-up','Enter follow-up notes in the dialog, then save to update the status.',null,'Family Alex'],
 note:['Add a note','Notes stay in this browser’s demo history. Do not enter private information.',null,'Family Alex']
};
document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b||b.disabled)return;const f=feedback[b.dataset.action];
 if(f){director.manual(...f);if(['confirm','help','reminder'].includes(b.dataset.action))director.signal(b.dataset.action==='reminder'?'backward':'forward')}
});
document.addEventListener('submit',e=>{
 if(e.target.id==='note-form')director.manual(state.status==='RESOLVED'?'Follow-up complete. The family view now shows it as resolved.':'Note recorded',state.status==='RESOLVED'?'See the blue status card and follow-up notes. Resolving a case does not confirm medication was taken.':'See the new entry in the timeline.',state.status==='RESOLVED'?'.state-card':'.timeline','Family Alex');
});
if(document.modelContext?.registerTool){
 const lifecycle=new AbortController();
 try{Promise.resolve(document.modelContext.registerTool({
  name:'read_demo_status',title:'Read two-screen demo status',
  description:'Read the simulated status, time and events. Contains no real medical information.',
  inputSchema:{type:'object',properties:{},additionalProperties:false},
  annotations:{readOnlyHint:true,untrustedContentHint:true},
  execute(input){if(!input||typeof input!=='object'||Object.keys(input).length)throw new Error('Expected an empty object');return {status:state.status,time:time(),confirmedAt:state.confirmedAt,events:state.events.map(e=>({...e}))};}
 },{signal:lifecycle.signal})).catch(()=>{});}catch{}
 window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
}
