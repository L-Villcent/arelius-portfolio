'use strict';
const director = {
 active:false, paused:false, executing:false, timer:null, actionTimer:null, pending:null, index:-1, steps:[], scenario:null,
 el(s){return document.querySelector(s)},
 clearFocus(){document.querySelectorAll('.demo-focus-target,.demo-phone-active').forEach(x=>x.classList.remove('demo-focus-target','demo-phone-active'))},
 cancel(){if(this.executing)return;clearTimeout(this.timer);clearTimeout(this.actionTimer);this.pending=null;document.querySelectorAll('.tap-marker').forEach(x=>x.remove());this.active=false;this.paused=false;this.clearFocus();this.controls()},
 reset(){this.cancel();document.querySelectorAll('.tap-marker').forEach(x=>x.remove());this.el('.connection').classList.remove('signal-forward','signal-backward');this.steps=[];this.index=-1;this.el('#step-track').innerHTML='';this.caption('Guide','Follow every step. See every response.','Choose a scenario. Highlights show where to look; rings show where a tap happens.','Ready to start')},
 caption(n,title,description,actor){this.el('#step-number').textContent=n;this.el('#step-title').textContent=title;this.el('#step-description').textContent=description;this.el('#step-actor').textContent=actor},
 controls(){this.el('#play-pause').disabled=!this.active;this.el('#step-next').disabled=!this.active;this.el('#play-pause').textContent=this.paused?'Resume':'Pause';this.el('#step-replay').disabled=!this.scenario},
 focus(selector){
  this.clearFocus();const target=selector&&this.el(selector);if(!target)return;
  target.classList.add('demo-focus-target');target.closest('.phone')?.classList.add('demo-phone-active');
  const scroller=target.closest('.phone-scroll');
  if(scroller){const a=target.getBoundingClientRect(),b=scroller.getBoundingClientRect();if(a.bottom>b.bottom-12)scroller.scrollTop+=a.bottom-b.bottom+18;else if(a.top<b.top+12)scroller.scrollTop-=b.top-a.top+18;}
 },
 tap(target,automatic=false){
  if(!target)return;const marker=document.createElement('span');
  marker.className='tap-marker';marker.setAttribute('aria-hidden','true');
  marker.innerHTML=`<i></i><b>${automatic?'Demo tap':'Tapped'}</b>`;target.appendChild(marker);setTimeout(()=>marker.remove(),1000);
 },
 signal(direction='forward'){
  const c=this.el('.connection');c.classList.remove('signal-forward','signal-backward');void c.offsetWidth;c.classList.add(`signal-${direction}`);
 },
 manual(title,description,selector,actor='Action feedback'){
  if(this.executing)return;this.caption('Action',title,description,actor);this.el('#step-track').innerHTML='';this.focus(selector);
 },
 track(){this.el('#step-track').innerHTML=this.steps.map((s,i)=>`<li class="${i===this.index?'current':i<this.index?'done':''}" ${i===this.index?'aria-current="step"':''}><span>${i<this.index?'✓':i+1}</span>${s.short}</li>`).join('')},
 finishAction(){clearTimeout(this.actionTimer);const fn=this.pending;this.pending=null;if(fn)fn()},
 schedule(){clearTimeout(this.timer);clearTimeout(this.actionTimer);if(this.active&&!this.paused){if(this.pending)this.actionTimer=setTimeout(()=>this.finishAction(),650);else this.timer=setTimeout(()=>this.next(),(this.steps[this.index]?.duration||2800)*Number(this.el('#playback-speed').value||1))}},
 next(){
  clearTimeout(this.timer);if(!this.active)return;if(this.pending){this.finishAction();return}
  if(this.index+1>=this.steps.length){this.active=false;this.controls();return}
  const s=this.steps[++this.index];
  this.caption(`${this.index+1} / ${this.steps.length}`,s.title,s.description,s.actor);this.track();
  const complete=()=>{this.executing=true;try{s.action?.()}finally{this.executing=false}this.focus(s.focus);if(s.signal)this.signal(s.signal);this.controls();this.schedule()};
  if(s.tap){this.focus(s.tap);this.tap(this.el(s.tap),true);this.pending=complete;this.actionTimer=setTimeout(()=>this.finishAction(),650);this.controls()}else complete();
 },
 run(name){
  this.cancel();reset();this.reset();this.scenario=name;this.steps=this.scenarios(name);this.index=-1;this.active=true;this.paused=false;
  this.el('.workspace').dataset.view='both';document.querySelectorAll('button[data-view]').forEach(x=>{x.classList.toggle('active',x.dataset.view==='both');x.setAttribute('aria-pressed',String(x.dataset.view==='both'))});
  this.el('.director').scrollIntoView({behavior:'smooth',block:'start'});this.next();
 },
 scenarios(name){
  const reminder={short:'Reminder',actor:'System · Demo time 08:00',title:'① The reminder reaches the older adult',description:'Look at the medication card on the left. The family is waiting for a response; no tap has occurred.',focus:'.med-card'};
  if(name==='normal')return [reminder,
   {short:'Get ready',actor:'Older adult Margaret',title:'② Next, tap “I’ve taken it”',description:'The green outline marks the next button. A ring will show the simulated tap.',focus:'[data-action="confirm"]'},
   {short:'Check in',actor:'Older adult Margaret · Demo time 08:05',title:'③ A tap sends the check-in to the family',description:'The ring marks the tap. The moving dot shows the update traveling to the family.',tap:'[data-action="confirm"]',action:()=>{state.minutes=485;confirmMedication()},focus:'.success-panel',signal:'forward'},
   {short:'Family updated',actor:'Family Alex',title:'④ Look right: the check-in is confirmed',description:'The family sees the check-in time and new timeline entries. This does not verify medication was taken.',focus:'.state-card'},
   {short:'Complete',actor:'Demo complete',title:'One tap. The same update on both screens.',description:'Replay, choose another scenario or tap a phone to keep exploring.',focus:'.state-card',duration:1800}];
  if(name==='no-response')return [reminder,
   {short:'Await response',actor:'System waiting · Demo time 08:30',title:'② No tap yet. The system keeps waiting.',description:'Time advances; this is not a tap. The family has not received a check-in.',action:()=>{state.minutes=510;render()},focus:'.med-card'},
   {short:'Remind again',actor:'System · Demo time 08:30',title:'③ The system sends a follow-up reminder',description:'Notice the updated text on the left. Sending a reminder does not mean a response was received.',action:()=>sendReminder(),focus:'.med-card',signal:'backward'},
   {short:'Escalate',actor:'System · Demo time 09:00',title:'④ Still no response. Family follow-up is needed.',description:'The status changes to an alert color. This does not confirm on anyone’s behalf or place a real call.',action:()=>{state.minutes=540;escalate()},focus:'.state-card',signal:'forward'},
   {short:'Your turn',actor:'Your turn · Family Alex',title:'⑤ Select “Contact Margaret” on the right',description:'Record a demo call, then select “Resolve” and enter the outcome to complete the follow-up.',focus:'[data-action="call"]'}];
  return [
   {short:'Get ready',actor:'Older adult Margaret',title:'① Look at “I need help” on the left',description:'The help button is highlighted first. The next step simulates a tap; no real call is placed.',focus:'[data-action="help"]'},
   {short:'Ask for help',actor:'Older adult Margaret',title:'② A help request travels to the family',description:'The ring marks the tap. The older adult sees confirmation and the family receives an alert.',tap:'[data-action="help"]',action:()=>requestHelp(),focus:'.success-panel',signal:'forward'},
   {short:'Family updated',actor:'Family Alex',title:'③ A help request appears on the right',description:'Look at the family status card: prompt contact is needed. This demo does not alert emergency services.',focus:'.state-card'},
   {short:'Your turn',actor:'Your turn · Family Alex',title:'④ Select “Contact Margaret”, then record the outcome',description:'The guided demo hands over to you here. Try making contact and recording the follow-up yourself.',focus:'[data-action="call"]'}
  ];
 }
};
document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b||b.disabled||b.closest('.playback'))return;
 if(b.dataset.action||b.dataset.view){
  director.cancel();director.tap(b);
  if(['confirm','help','reminder','record-call'].includes(b.dataset.action)){
   e.stopImmediatePropagation();
   const action=b.dataset.action;
   director.actionTimer=setTimeout(()=>{
    actions[action]?.();
    if(feedback[action])director.manual(...feedback[action]);
    if(['confirm','help','reminder'].includes(action))director.signal(action==='reminder'?'backward':'forward');
   },650);
  }
 }
},true);
document.querySelector('#play-pause').addEventListener('click',()=>{director.paused=!director.paused;director.controls();director.schedule()});
document.querySelector('#step-next').addEventListener('click',()=>{director.paused=true;director.next()});
document.querySelector('#step-replay').addEventListener('click',()=>{if(director.scenario)director.run(director.scenario)});
document.querySelector('#playback-speed').addEventListener('change',()=>director.schedule());
