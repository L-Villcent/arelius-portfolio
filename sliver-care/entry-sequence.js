(() => {
  'use strict';
  const panel = document.getElementById('care-entry');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Fail open: without scripting, styling or dialog support the page stays usable.
  if (!panel || motion.matches || typeof panel.showModal !== 'function' ||
      getComputedStyle(panel).position !== 'fixed') return;
  const skip = document.getElementById('care-entry-skip');
  const fill = document.getElementById('care-entry-fill');
  const counter = document.getElementById('care-entry-counter');
  const phase = document.getElementById('care-entry-phase');
  let frame = 0, exitTimer = 0, deadline = 0, finished = false;
  const restoreOverflow = () => document.body.classList.remove('care-entry-open');
  function close() {
    finished = true;
    cancelAnimationFrame(frame);
    clearTimeout(exitTimer);
    clearTimeout(deadline);
    const hadFocus = panel.contains(document.activeElement);
    if (panel.open) panel.close();
    restoreOverflow();
    motion.removeEventListener?.('change', onMotionChange);
    window.removeEventListener('pagehide', onPageHide);
    if (hadFocus) {
      const heading = document.querySelector('main h1');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({preventScroll: true});
        heading.addEventListener('blur', () => heading.removeAttribute('tabindex'), {once: true});
      }
    }
  }
  function finish(immediate = false) {
    if (finished) return;
    finished = true;
    cancelAnimationFrame(frame);
    if (immediate || motion.matches) { close(); return; }
    fill.style.transform = 'scaleX(1)';
    counter.textContent = '100';
    phase.textContent = 'ENTER DEMO';
    panel.classList.add('is-leaving');
    exitTimer = setTimeout(close, 280);
  }
  function onMotionChange(event) { if (event.matches) close(); }
  function onPageHide() { close(); }
  skip.addEventListener('click', () => finish(true));
  panel.addEventListener('cancel', event => { event.preventDefault(); finish(true); });
  panel.addEventListener('close', restoreOverflow);
  motion.addEventListener?.('change', onMotionChange);
  window.addEventListener('pagehide', onPageHide);
  try {
    panel.showModal();
    document.body.classList.add('care-entry-open');
    // Independent deadline prevents an interrupted animation leaving a modal behind.
    deadline = setTimeout(close, 3200);
    const start = performance.now();
    function tick(now) {
      if (finished) return;
      const progress = Math.min(1, (now - start) / 1700);
      const stepped = Math.floor(progress * 20) / 20;
      fill.style.transform = `scaleX(${stepped})`;
      counter.textContent = String(Math.round(stepped * 100)).padStart(3, '0');
      phase.textContent = progress < .35 ? 'INTRO / 01' : progress < .75 ? 'TWO SCREENS / 02' : 'ONE CARE FLOW / 03';
      if (progress >= 1) finish();
      else frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
  } catch { close(); }
})();
