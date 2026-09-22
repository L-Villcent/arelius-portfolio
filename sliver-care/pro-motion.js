/* Decorative orbital study: not a usage graph. No dependencies or network calls. */
(() => {
  'use strict';
  const card = document.querySelector('.care-plan--pro');
  const canvas = card?.querySelector('.care-pro-orbits');
  const context = canvas?.getContext('2d');
  if (!context) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let inView = false;
  let width = 0, height = 0, frame = 0, last = 0, phase = 0;
  let quietZones = [];
  let high = card.querySelector('[data-pro="high"]').getAttribute('aria-pressed') === 'true';
  let boost = high ? 1 : 0;
  card.dataset.proEffect = high ? '20x' : '5x';

  function draw() {
    context.clearRect(0,0,width,height);
    const cx = width * .88, cy = 100;
    const radius = Math.min(width * .44,156) * (1 + boost*.12);
    context.save();
    // Keep all particles in the upper right, away from prices and benefit copy.
    context.beginPath();
    context.rect(width * .4,0,width * .6,260);
    context.clip();
    for (let ring = 0; ring < 4; ring++) {
      const r = radius * (.48 + ring * .22);
      const tilt = -.55 + ring * .4;
      context.save();
      context.translate(cx,cy);
      context.rotate(tilt);
      context.strokeStyle = 'rgba(206,218,211,' + (.15 + boost*.13) + ')';
      context.lineWidth = .7;
      context.beginPath();
      context.ellipse(0,0,r,r*.48,0,0,Math.PI*2);
      context.stroke();
      for (let dot = 0; dot < 22; dot++) {
        const angle = dot/22 * Math.PI*2 + phase * (ring%2 ? -.10 : .08);
        const x = Math.cos(angle)*r, y = Math.sin(angle)*r*.48;
        const front = (Math.sin(angle)+1)/2;
        const accent = dot%11 === 0 || (boost > .5 && dot%7 === 0);
        context.fillStyle = accent ? 'rgba(242,139,113,' + (.75 + boost*.2) + ')' : 'rgba(215,225,217,' + (.18 + front*.4 + boost*.12) + ')';
        context.beginPath();
        context.arc(x,y,accent ? 2.2 + boost*.5 : .9 + front*.45,0,Math.PI*2);
        context.fill();
      }
      context.restore();
    }
    context.restore();

    // A restrained silver wave field spans the lower half, with no random data.
    for (let row = 0; row < 13; row++) {
      for (let column = 0; column < 27; column++) {
        const x = 8 + column*(width-27)/26;
        const wave = Math.sin(column*.18 + phase*.35 + row*.24);
        const y = height*.52 + row*15 + wave*(17 + boost*11);
        if (y > height-18) continue;
        const strength = .10 + (.22 + boost*.14)*(wave+1)/2;
        context.fillStyle = 'rgba(193,214,201,' + strength + ')';
        context.beginPath(); context.arc(x,y,.85,0,Math.PI*2); context.fill();
      }
    }
    // A low-contrast contour traces a broad diagonal between the two fields.
    context.strokeStyle = 'rgba(205,216,208,.12)';
    context.beginPath();
    context.moveTo(width*.7,180);
    context.bezierCurveTo(width*.92,height*.43,width*.1,height*.44,width*.25,height*.76);
    context.stroke();
    // Clear around the measured text and controls, including changed prices.
    quietZones.forEach(box => context.clearRect(box.x,box.y,box.width,box.height));
  }
  function active() { return !reduced.matches && inView && !document.hidden; }
  function tick(now) {
    frame = 0;
    if (!active()) { card.dataset.motion = 'paused'; return; }
    if (!last || now-last >= 1000/30) {
      const delta = last ? Math.min((now-last)/1000,.1) : 0;
      boost += ((high ? 1 : 0)-boost)*(1-Math.exp(-delta*5));
      phase += delta*(1+boost*1.8);
      last = now;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame);
    frame = 0; last = 0;
    card.dataset.motion = active() ? 'running' : 'paused';
    if (reduced.matches) {
      boost = high ? 1 : 0;
    }
    draw();
    if (active()) frame = requestAnimationFrame(tick);
  }
  function resize() {
    const box = canvas.getBoundingClientRect();
    width = box.width; height = box.height;
    const scale = Math.min(devicePixelRatio || 1,2);
    canvas.width = Math.round(width*scale); canvas.height = Math.round(height*scale);
    context.setTransform(scale,0,0,scale,0,0);
    quietZones = [];
    const walker = document.createTreeWalker(card.querySelector('.care-plan-body'),NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      if (!walker.currentNode.textContent.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(walker.currentNode);
      for (const rect of range.getClientRects()) {
        quietZones.push({x:rect.left-box.left-5,y:rect.top-box.top-4,width:rect.width+10,height:rect.height+8});
      }
    }
    card.querySelectorAll('.care-pro-options,.care-plan-action').forEach(element => {
      const rect = element.getBoundingClientRect();
      quietZones.push({x:rect.left-box.left-3,y:rect.top-box.top-3,width:rect.width+6,height:rect.height+6});
    });
    draw();
  }
  reduced.addEventListener('change',sync);
  document.addEventListener('visibilitychange',sync);
  let observer;
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; sync(); },{threshold:0});
    observer.observe(card);
  }
  const sizeObserver = new ResizeObserver(resize);
  sizeObserver.observe(canvas);
  card.addEventListener('care:plan-change',() => {
    const nextHigh = card.querySelector('[data-pro="high"]').getAttribute('aria-pressed') === 'true';
    if (nextHigh !== high) {
      high = nextHigh;
      if (reduced.matches) boost = high ? 1 : 0;
      card.dataset.proEffect = high ? '20x' : '5x';
    }
    resize();
  });
  document.fonts?.ready.then(resize);
  window.addEventListener('pagehide',() => { cancelAnimationFrame(frame); frame = 0; last = 0; });
  window.addEventListener('pageshow',sync);
  resize(); sync();
})();
