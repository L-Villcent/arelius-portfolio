/* Selection feedback only; scenario execution remains in the original demo. */
(() => {
  const choices = [...document.querySelectorAll('.scenario-grid button')];
  function select(action) {
    choices.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.action === action)));
  }
  select(null);
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || button.disabled) return;
    if (choices.includes(button)) select(button.dataset.action);
    else if (button.dataset.action === 'reset') select(null);
    else if (button.id === 'step-replay' && typeof director !== 'undefined') select(director.scenario);
  });
})();
