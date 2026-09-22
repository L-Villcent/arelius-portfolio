/* Pricing display; local workspace handles the simulated subscription. */
(() => {
  'use strict';
  const main = document.querySelector('main');
  if (!main || document.getElementById('care-plans')) return;
  // One price/capacity source shared with the working offline checkout.
  const catalogue = window.SCare.PLANS;
  const value = window.CarePlanValue;
  const plans = {
    free: {name:'Free',number:'01',tag:'THE FIRST STEP',description:'Get to know the care flow.',month:catalogue.free.month,year:catalogue.free.year,priceStatus:'confirmed',status:'Core care works locally',benefits:['Reminders & check-ins','Help requests & follow-up','Local records & notes'],action:'Open Free workspace'},
    plus: {name:'Plus',number:'02',tag:'RECOMMENDED FOR FAMILIES / 家庭推荐',description:'Everyday care, with a named owner.',month:catalogue.plus.month,year:catalogue.plus.year,ai:catalogue.plus.ai,priceStatus:'confirmed',status:'Working offline family features',benefits:value.copy.plus.benefits,action:'Try Plus — simulated checkout'},
    pro: {name:'Pro',number:'03',tag:'ADVANCED COORDINATION',description:'Rotating care, clearer handovers.',month:{standard:catalogue.pro5.month,high:catalogue.pro20.month},year:{standard:catalogue.pro5.year,high:catalogue.pro20.year},ai:{standard:catalogue.pro5.ai,high:catalogue.pro20.ai},labels:{standard:'5x',high:'20x'},priceStatus:{month:'confirmed',year:'confirmed'},status:'Working offline coordination',benefits:value.copy.pro5.benefits,action:'Try Pro — simulated checkout'}
  };
  const state = {billing:'month',pro:'standard'};
  const comparison = [
    ['Care profiles',catalogue.free.recipients+' demo recipient','Up to '+catalogue.plus.recipients+' recipients','Up to '+catalogue.pro5.recipients+' recipients & overview'],
    ['Family responsibilities','One demo caregiver','Assign a responsible family member','Add backups, rotas & handovers'],
    ['Reminders & follow-up','Try the core care flow','Multiple plans & staged follow-up','Configure timing & responsibility'],
    ['Summaries & records','Local demo history','Weekly summaries & text export','Recipient overview, daily activity & handovers'],
    ['AI template allowance','No allowance',() => plans.plus.ai + ' simulations / monthly cycle',() => plans.pro.ai[state.pro] + ' simulations / monthly cycle']
  ];
  document.querySelector('.intro > div:first-child').insertAdjacentHTML('beforeend', '<p class="care-value">Know what needs follow-up, who is helping, and what happens next.</p><div class="care-intro-actions"><a href="#care-demo">Experience the demo ↗</a><a href="#care-plans">Explore the plans ↓</a></div>');
  document.querySelector('.view-tabs').id = 'care-demo';
  const nav = document.createElement('nav');
  nav.className = 'care-section-nav';
  nav.setAttribute('aria-label','Explore Sliver Care');
  nav.innerHTML = '<a href="#care-demo">01 / Demo</a><a href="#care-plans">02 / Plans</a><a href="#care-business">03 / Business model</a>';
  document.querySelector('.masthead').after(nav);
  const presentation = document.createElement('div');
  presentation.className = 'care-presentation';
  const cards = Object.entries(plans).map(([id,plan]) => [
    '<article class="care-plan care-plan--' + id + '" aria-labelledby="care-' + id + '-title">',
    id === 'pro' ? '<canvas class="care-pro-orbits" aria-hidden="true"></canvas>' : '',
    '<div class="care-plan-banner"><span>' + plan.tag + '</span>' + (id === 'plus' ? '' : '<span>' + plan.number + '</span>') + '</div>',
    '<div class="care-plan-body"><div class="care-plan-identity"><h3 id="care-' + id + '-title">' + plan.name + (id === 'plus' ? '<span aria-hidden="true">+</span>' : '') + '</h3><p>' + plan.description + '</p></div>',
    '<div class="care-price-block"><div class="care-price" data-price="' + id + '"></div><p class="care-price-note" data-price-note="' + id + '"></p></div>',
    '<div class="care-plan-options">' + (id === 'pro' ? '<div class="care-segment care-pro-options" role="group" aria-label="Pro AI allowance"><button type="button" data-pro="standard" aria-pressed="true">' + plan.labels.standard + '</button><button type="button" data-pro="high" aria-pressed="false">' + plan.labels.high + '</button></div>' : '<span class="care-plan-status">' + plan.status + '</span>') + '</div>',
    '<ul class="care-benefits">' + plan.benefits.map(item => '<li>' + item + '</li>').join('') + '</ul><div class="care-ai-note" data-ai="' + id + '"></div>',
    '<a class="care-plan-action" data-workspace-plan="'+id+'" href="workspace.html">'+plan.action+'<span aria-hidden="true">↗</span></a></div></article>'
  ].join('')).join('');
  presentation.innerHTML = [
    '<section class="care-pricing" id="care-plans" aria-labelledby="care-plans-title">',
    '<div class="care-kicker"><span>02 / FAMILY PLANS</span><span lang="zh-CN">家庭订阅方案</span><span>RMB / CNY</span></div>',
    '<div class="care-pricing-heading"><h2 id="care-plans-title">CARE IS SHARED.<br><span>CHOOSE YOUR PLAN.</span></h2><div class="care-heading-aside"><p>One family.<br> One shared plan.</p><span lang="zh-CN">让照护有分工，让跟进有记录。</span></div></div>',
    '<p class="care-value-boundary">Proposed service prices, per family within the plan limits. Current evaluation is free on one local device. Checkout and AI are simulated; connected accounts, cross-device sync and remote notifications are proposed and not connected.</p>',
    '<div class="care-pricing-toolbar"><p>Start with the essentials. Plan for the way your family cares.</p><div class="care-segment" role="group" aria-label="Billing period"><button type="button" data-billing="month" aria-pressed="true">Monthly</button><button type="button" data-billing="year" aria-pressed="false">Yearly</button></div></div>',
    '<div class="care-plan-grid">' + cards + '</div>',
    '<div class="care-pricing-footnote"><span>DESIGNED AROUND FAMILY COORDINATION.</span><p>Paid features run locally in the workspace. Checkout and AI are simulations. No real payment or connected services. AI allowance never blocks basic care.</p></div>',
    '<p class="care-sr-only" id="care-price-announcement" role="status" aria-live="polite" aria-atomic="true"></p></section>',
    '<section class="care-comparison" id="care-comparison" aria-labelledby="care-comparison-title" tabindex="-1"><div class="care-kicker"><span>THE DETAILS</span><span lang="zh-CN">权益比较</span></div>',
    '<div class="care-section-heading"><h2 id="care-comparison-title">A little clarity.<br>A better fit.</h2><p>All tiers can be explored offline.<br>Paid plans activate through simulated checkout.</p></div>',
    '<div class="care-table-wrap" tabindex="0" role="region" aria-label="Plan comparison. Scroll horizontally on small screens."><table class="care-comparison-table"><caption class="care-sr-only">Working offline plan benefits</caption><thead><tr><th scope="col">What your family needs</th><th scope="col">Free<small>Current demo</small></th><th scope="col">Plus<small>Offline workspace</small></th><th scope="col">Pro<small>Offline workspace</small></th></tr></thead><tbody id="care-comparison-rows"></tbody></table></div>',
    '<p class="care-small-note">Local capacities: Free 1 recipient / 1 role; Plus 2 / 4; Pro 5 / 8. Plus supports everyday responsibility and export. Pro 5x adds rota, backups and handovers. Pro 20x changes only the allowance: 100 to 400 per monthly cycle. Both Pro options share the same care features. No live AI is connected.</p></section>',
    '<section class="care-business" id="care-business" aria-labelledby="care-business-title"><div class="care-kicker"><span>03 / THE BUSINESS MODEL</span><span lang="zh-CN">商业模式</span><span>FAMILY FIRST.</span></div>',
    '<div class="care-section-heading"><h2 id="care-business-title">Built for families.<br>Funded by a shared plan.</h2><p>A proposed family subscription.<br>Coordination is the value; AI is an extra.</p></div>',
    '<ol class="care-business-flow"><li><span class="care-flow-index">01 / WHO PAYS</span><h3>The family organiser.</h3><p>An adult child coordinating care for a parent or an older family member.</p></li><li><span class="care-flow-index">02 / WHAT THEY GET</span><h3>Care, coordinated.</h3><p>Shared responsibilities, clearer follow-up and a record of what happened next.</p></li><li><span class="care-flow-index">03 / HOW IT WORKS</span><h3>One family subscription.</h3><p>Monthly or annual billing. The proposed connected service charges per family. This edition keeps roles on one local device.</p></li></ol>',
    '<details class="care-business-details"><summary><span>Behind the model <small lang="zh-CN">课堂展示详情</small></span><span class="care-details-mark" aria-hidden="true">+</span></summary><div class="care-model-grid"><div><h3>Target families</h3><p>Older adults living independently, with adult children who cannot be present for every reminder but can follow up.</p></div><div><h3>Proposed channels</h3><p>Caregiver communities, useful educational content, family referrals and possible community pilots. Partnerships are not yet secured.</p></div><div><h3>Operating costs</h3><p>Product development, hosting, notifications, support, privacy and security work, and customer acquisition.</p></div><div><h3>What needs validation</h3><p>Willingness to pay, repeat use, reliable delivery and cost to serve. The prototype does not establish demand or profitability.</p></div></div></details></section>',
    '<section class="care-faq" aria-labelledby="care-faq-title"><div><div class="care-kicker"><span>A FEW GOOD QUESTIONS</span></div><h2 id="care-faq-title">Before you choose.<small lang="zh-CN">常见问题</small></h2></div><div class="care-faq-list">',
    '<details><summary>Is each family member charged separately?</summary><p>No. The proposed paid plan is shared by a family, including its AI allowance. Local limits are Free 1 recipient / 1 family role, Plus 2 / 4 and Pro 5 / 8. No separate charge per family role; remote shared accounts are not connected.</p></details>',
    '<details><summary>What changes between the two Pro options?</summary><p data-pro-explanation></p></details>',
    '<details><summary>What happens when the AI allowance runs out?</summary><p>The demo allowance only affects new local template generations. Basic reminders, check-ins, requests for help and manual follow-up remain available.</p></details>',
    '<details><summary>What can I actually try today?</summary><p>Try check-ins, no-response follow-up, help requests and local notes in the two-phone demo. Paid care features work in Care workspace after simulated activation. Live AI, cross-device sync and remote notifications are not connected. The new plan scenarios demonstrate everyday follow-up, handover and shared allowance.</p><a href="#care-demo">Back to the interactive demo ↗</a></details>',
    '<details><summary>How does yearly billing work?</summary><p data-year-explanation></p></details></div></section>',
    '<div class="care-closing"><p>Start with one check-in.<br><strong>See what happens next.</strong></p><a href="#care-demo">Experience the demo <span aria-hidden="true">↗</span></a></div>'
  ].join('');
  main.querySelector('footer').before(presentation);
  function render(announce = false) {
    for (const [id,plan] of Object.entries(plans)) {
      const amount = id === 'pro' ? plan[state.billing][state.pro] : plan[state.billing];
      const price = presentation.querySelector('[data-price="' + id + '"]');
      price.classList.toggle('care-price--pending',amount === null);
      price.innerHTML = amount === null ? '<strong>TBD</strong><span>Yearly / 待定</span>' : '<span class="care-currency">¥</span><strong>' + amount + '</strong><span>/' + state.billing + '</span>';
      presentation.querySelector('[data-price-note="' + id + '"]').textContent = id === 'free' ? 'Free to explore. No payment required.' : amount === null ? 'Annual price not confirmed. No annual offer yet.' : state.billing === 'year' ? 'Billed ¥' + amount + ' once a year · ¥' + (amount / 12).toFixed(2) + '/month equivalent.' : 'Per family · proposed monthly service price.';
      presentation.querySelector('[data-ai="' + id + '"]').textContent = id === 'free' ? 'Core care needs no AI allowance.' : id === 'plus' ? 'AI simulation · ' + plan.ai + ' successful generations/month · shared by the household' : plan.labels[state.pro] + ' = '+plan.ai[state.pro]+' generations/month. '+(state.pro==='high'?'¥20/month more adds 300 uses; same care features.':'5 × Plus usage; rota, backup & handover included.');
      const workspaceId=id==='pro'?(state.pro==='high'?'pro20':'pro5'):id;
      presentation.querySelector('[data-workspace-plan="'+id+'"]').href='workspace.html'+(id==='free'?'':'?plan='+workspaceId+'&billing='+state.billing+'#account');
    }
    const currentPro=state.pro==='high'?'pro20':'pro5';
    presentation.querySelector('#care-pro-title').textContent='Pro '+plans.pro.labels[state.pro];
    presentation.querySelector('.care-plan--pro .care-plan-identity p').textContent=value.copy[currentPro].title;
    presentation.querySelector('.care-plan--pro .care-benefits').innerHTML=value.copy[currentPro].benefits.map(item=>'<li>'+item+'</li>').join('');
    presentation.querySelector('#care-comparison-rows').innerHTML = comparison.map(([label,...values]) => '<tr><th scope="row">' + label + '</th>' + values.map(value => '<td>' + (typeof value === 'function' ? value() : value) + '</td>').join('') + '</tr>').join('');
    presentation.querySelector('[data-pro-explanation]').textContent = 'Both options have the same working offline coordination features. Pro ' + plans.pro.labels.standard + ' is ¥' + plans.pro.month.standard + '/month with ' + plans.pro.ai.standard + ' local template generations per monthly demo cycle; Pro ' + plans.pro.labels.high + ' is ¥' + plans.pro.month.high + '/month with ' + plans.pro.ai.high + '. The names refer to multiples of the Plus AI allowance, not model quality or care outcomes.';
    presentation.querySelector('[data-year-explanation]').textContent = 'Paid once per year: Plus ¥' + plans.plus.year + ' (¥' + (plans.plus.year / 12).toFixed(2) + '/month equivalent); Pro ' + plans.pro.labels.standard + ' ¥' + plans.pro.year.standard + ' (about ¥' + (plans.pro.year.standard / 12).toFixed(2) + '/month); Pro ' + plans.pro.labels.high + ' ¥' + plans.pro.year.high + ' (¥' + (plans.pro.year.high / 12).toFixed(2) + '/month). Each annual total equals ten monthly fees, paid upfront. AI allowance remains monthly, with no rollover; local cycles are advanced manually. The current evaluation charges ¥0.';
    if (announce) presentation.querySelector('#care-price-announcement').textContent = (state.billing === 'year' ? 'Yearly prices, paid once per year. ' : 'Monthly prices. ') + 'Free ¥0. Plus ¥' + plans.plus[state.billing] + '. Pro ' + plans.pro.labels[state.pro] + ' ¥' + plans.pro[state.billing][state.pro] + '. AI allowance ' + plans.pro.ai[state.pro] + ' per month.';
    presentation.querySelector('.care-plan--pro').dispatchEvent(new Event('care:plan-change'));
  }
  presentation.addEventListener('click',event => {
    const billing = event.target.closest('[data-billing]');
    const pro = event.target.closest('[data-pro]');
    if (billing || pro) {
      const key = billing ? 'billing' : 'pro';
      const button = billing || pro;
      state[key] = button.dataset[key];
      presentation.querySelectorAll('[data-' + key + ']').forEach(item => item.setAttribute('aria-pressed',String(item === button)));
      render(true);
    }
    const compare = event.target.closest('[data-compare]');
    if (compare) {
      const target = document.getElementById('care-comparison');
      target.dataset.selectedPlan = compare.dataset.compare;
      target.focus({preventScroll:true});
    }
  });
  render();
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('care-arrived');
      observer.unobserve(entry.target);
    }),{threshold:0.08});
    presentation.querySelectorAll(':scope > section').forEach(section => observer.observe(section));
  }
})();
