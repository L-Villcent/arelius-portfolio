/* Adapt the preserved guided demo into the standalone offline product. */
(() => {
 const nav=document.querySelector('.care-section-nav');
 nav.innerHTML='<a href="#care-demo">Guided example</a><a href="#care-plans">Plans</a><a href="workspace.html">Care workspace ↗</a><a href="offer.html">Customer offer</a><a href="business.html">Business model</a><a href="outreach.html">Customer outreach</a><a href="presentation.html">Classroom kit</a>';
 // Keep the portfolio identity and return link from the original masthead.
 const first=document.querySelector('.care-intro-actions a');first.href='workspace.html';first.textContent='Open care workspace ↗';
 const second=document.querySelector('.care-intro-actions a:nth-child(2)');second.textContent='Explore plans & demo checkout ↓';
 document.querySelector('.mode-badge strong').textContent='Local household planning · Reports';
 document.querySelector('.mode-badge small').innerHTML='Working offline features.<br>Payment, AI and notifications are simulated.';
 document.querySelector('.edition-number').textContent='OFFLINE 1.0';
 document.querySelectorAll('.care-comparison-table thead small').forEach(x=>{if(x.textContent==='Planned')x.textContent='Offline workspace';});
 const questions=[...document.querySelectorAll('.care-faq-list details')];
 questions[0].querySelector('p').textContent='A family shares one plan and its AI simulation allowance. Offline capacities: Free 1 recipient / 1 family role; Plus 2 / 4; Pro 5 / 8. These are classroom product defaults.';
 questions[3].querySelector('p').textContent='Use the Care workspace for profiles, plans, follow-up, reports and Pro rota/handovers. Payment and AI are local simulations. No cross-device synchronisation or notification service is connected. The two-phone guided example is a separate teaching scenario.';
 const notice=document.createElement('p');notice.className='care-guide-note';notice.textContent='GUIDED EXAMPLE / These two screens share one care scenario. For saved household plans, demo subscriptions and downloadable reports, open the Care workspace. Its records are separate.';document.querySelector('.intro').append(notice);
 const style=document.createElement('style');style.textContent='.intro{flex-wrap:wrap}.care-guide-note{flex:1 0 100%;font:12px/1.7 var(--shell-type);color:var(--shell-muted);border-top:1px solid var(--shell-line);padding-top:14px;margin:10px 0 0}.care-section-nav{gap:8px 22px}.care-plan-action{font-size:12px}';document.head.append(style);
})();
