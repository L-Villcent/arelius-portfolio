/* Visual adaptation only: the existing action/state/director engine is retained. */
let selectedPeriod='today';
const referenceIcons={check:'check',clock:'clock',heart:'heart',phone:'phone',note:'notebook-text',chevron:'chevron-right',pill:'pill',alert:'circle-alert',sun:'sun',more:'ellipsis'};
uiIcon=function(name){return `<img class="ui-icon" src="assets/icons/${referenceIcons[name]||'check'}.svg" alt="" aria-hidden="true">`;};
function periodRecords(){
 const entries=selectedPeriod==='today'?state.events:history;
 return entries.length?entries.slice().reverse().map(e=>`<li><time>${escapeHTML(e.time)}</time><span>${escapeHTML(e.text)}</span></li>`).join(''):'<li><span>No demo history yet</span></li>';
}
polishPhones=function(){
 const blocked=['EMERGENCY','FOLLOW_UP_REQUIRED','RESOLVED'].includes(state.status);
 const s=states[state.status], confirmed=!!state.confirmedAt;
 const badges={WAITING:'Pending',CONFIRMED:'Confirmed',REMINDER_SENT:'Remind again',FOLLOW_UP_REQUIRED:'Follow up',EMERGENCY:'Help needed',RESOLVED:'Resolved'};
 const summaryText={WAITING:'Reminder sent. Awaiting response.',CONFIRMED:'Checked in; medication not verified.',REMINDER_SENT:'Reminded again. Awaiting response.',FOLLOW_UP_REQUIRED:'No check-in yet. Please follow up.',EMERGENCY:'Help requested. Please make contact.',RESOLVED:'Family recorded the outcome.'};
 const heading=state.status==='WAITING'?'Medication reminder sent':s.title;
 const detail=state.status==='WAITING'?'We’ll let you know when Margaret checks in.':state.status==='RESOLVED'?`Follow-up by Alex at ${state.resolvedAt}. ${escapeHTML(state.note)}`:s.detail;
 const status=state.helpRequested?`<div class="success-panel help"><strong>${state.status==='RESOLVED'?'Help request resolved':'Help requested (demo)'}</strong>${state.status==='RESOLVED'?'Alex has recorded the outcome.':'No real alert is sent. In an emergency, contact local emergency services immediately.'}</div>`:confirmed?`<div class="success-panel"><strong>Check-in complete</strong>Checked in at ${state.confirmedAt} · Family updated</div>`:'';
 $('#older-content').innerHTML=`
  <div class="elder-welcome"><h3 class="greeting"><span>Good morning,</span>Margaret</h3><p class="date">Tuesday, September 15</p><div class="weather"><span>A little care today.<br>Take your dose on time.</span>${uiIcon('sun')}</div></div>
  ${status}
  <div class="med-card"><span class="pill-icon">${uiIcon('pill')}</span><div class="card-overline">Today’s medication</div><div class="med-time">08:00</div><div class="med-detail">Morning dose<small>After breakfast</small></div><div class="med-bottom">${confirmed?'Checked in today':state.status==='REMINDER_SENT'?'Reminder sent. Please check in.':blocked?'Please contact your family':'Take as prescribed'}</div></div>
  <button class="elder-button confirm-button" data-action="confirm" ${confirmed||blocked?'disabled':''}>${uiIcon('check')}<span>${confirmed?'I’ve checked in':'I’ve taken it'}</span></button>
  <button class="elder-button help-button" data-action="help" ${state.status==='EMERGENCY'?'disabled':''}>${uiIcon('heart')}<span>${state.status==='EMERGENCY'?'Help requested':'I need help'}</span></button>
  <p class="elder-hint">“ Every dose on time.<br>A little more care for yourself. ”</p>
  <div class="elder-contact"><button data-action="call-family">${uiIcon('phone')} Contact Alex (demo)</button></div>`;
 const milestones=state.status==='WAITING'?`<li class="reached">08:00&nbsp; Reminder sent</li><li>Waiting for Margaret’s check-in</li><li>Another reminder after 30 minutes</li>`:state.events.slice(-3).map(e=>`<li class="reached">${e.time}&nbsp; ${escapeHTML(e.text)}</li>`).join('');
 $('#family-content').innerHTML=`
  <div class="family-person"><span class="person-avatar">M</span><div class="person-copy"><strong>Margaret ${uiIcon('chevron')}</strong><small>78 · Lives alone</small></div><div class="person-status"><button class="more-button" data-action="about" aria-label="Profile and demo information">${uiIcon('more')}</button><span><i></i>Connected</span><small>In-page simulation</small></div></div>
  <div class="period-tabs" role="group" aria-label="Record period">${[['today','Today'],['week','Week'],['month','Month']].map(([key,label])=>`<button data-action="period-${key}" aria-pressed="${selectedPeriod===key}" class="${selectedPeriod===key?'selected':''}">${label}</button>`).join('')}</div>
  <section class="state-card" aria-live="polite" style="--card-bg:${state.status==='WAITING'?'#fbf7ee':s.bg};--card-fg:${s.fg};--card-line:${s.line}">
   <div class="state-top"><span class="state-symbol">${uiIcon('pill')}</span><span class="reminder-name">Morning dose · 08:00</span><span class="status-badge">${badges[state.status]}</span></div>
   <h3>${heading}</h3><p>${detail}</p><ol class="status-steps">${milestones}</ol>
  </section>
  <button class="contact-card" data-action="call"><span class="call-icon">${uiIcon('phone')}</span><span><strong>Contact <b>Margaret</b></strong><small>Voice & video calls (demo)</small></span>${uiIcon('chevron')}</button>
  <div class="family-actions">${[['reminder','clock','Remind again',state.status!=='WAITING'],['resolve','check','Resolve',!['FOLLOW_UP_REQUIRED','EMERGENCY'].includes(state.status)],['note','note','Add note',false]].map(([action,icon,label,disabled])=>`<button data-action="${action}" ${disabled?'disabled':''}>${uiIcon(icon)}<span>${label}</span></button>`).join('')}</div>
  <div class="timeline-head"><h4>${selectedPeriod==='today'?'Today’s medication':selectedPeriod==='week'?'This week’s records':'This month’s records'}</h4><button data-action="history">View all ${uiIcon('chevron')}</button></div>
  ${selectedPeriod==='today'?`<div class="medication-summary"><span class="summary-icon">${uiIcon(confirmed?'check':'clock')}</span><div><strong><time>08:00</time> Morning dose</strong><small>${summaryText[state.status]}</small></div><span class="status-badge">${badges[state.status]}</span></div>`:'<p class="period-note">Only September 15 demo records stored in this browser are shown. No real medical data.</p>'}
  <ol class="timeline">${periodRecords()}</ol><div class="family-foot">Demo profile · Updates sync within this page only</div>`;
};
for(const key of ['today','week','month']) actions[`period-${key}`]=()=>{selectedPeriod=key;render();};
const originalResetAction=actions.reset;
actions.reset=()=>{selectedPeriod='today';originalResetAction();};
document.querySelectorAll('.statusbar > span:last-child').forEach(el=>{el.innerHTML='<img class="system-status" src="assets/ios-status-icons.svg" alt="Signal, Wi-Fi and battery">';});
document.querySelectorAll('.role-chip').forEach((el,i)=>{el.textContent=i?'For the ones who care':'For a calmer today';});
$('.prototype').textContent='Interactive prototype';
$('.edition-number').textContent='V2.4';
render();
