(() => {
  const filterButtons = [...document.querySelectorAll('[data-filter-type]')];
  const entries = [...document.querySelectorAll('[data-project][data-tags]')];
  const status = document.querySelector('[data-scroll-status]');
  const viewport = document.querySelector('[data-auto-scroll]');
  if (!filterButtons.length || !entries.length || !status) return;

  const pauseForInteraction = () => {
    if (!viewport) return;
    viewport.classList.add('is-paused');
    status.innerHTML = '<strong>Paused</strong> · Filter selected. Choose All decisions to reset.';
  };

  const applyFilter = (type, value, label) => {
    filterButtons.forEach((button) => button.setAttribute('aria-pressed', button.dataset.filterType === type && (type === 'all' || button.dataset.filterValue === value) ? 'true' : 'false'));
    let visibleCount = 0;
    entries.forEach((entry) => {
      const matches = type === 'all' || (type === 'project' && entry.dataset.project === value) || (type === 'tag' && entry.dataset.tags.split(' ').includes(value));
      entry.hidden = !matches;
      if (matches) visibleCount += 1;
    });
    pauseForInteraction();
    status.innerHTML = `<strong>${visibleCount} decision${visibleCount === 1 ? '' : 's'}</strong> · Filter: ${label}`;
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button.dataset.filterType, button.dataset.filterValue || '', button.textContent.trim().split('\n')[0]));
  });

  applyFilter('all', '', 'All decisions');
})();

(() => {
  const viewport = document.querySelector('[data-auto-scroll]');
  const status = document.querySelector('[data-scroll-status]');
  if (!viewport || !status || viewport.scrollHeight <= viewport.clientHeight || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let paused = false;
  const speed = 10;

  const pause = () => {
    paused = true;
    viewport.classList.add('is-paused');
    status.innerHTML = '<strong>Paused</strong> · Scroll or move away to read.';
  };

  ['pointerenter', 'focusin', 'wheel', 'touchstart', 'pointerdown', 'keydown'].forEach((eventName) => {
    viewport.addEventListener(eventName, pause, { passive: eventName !== 'keydown' });
  });

  const tick = () => {
    if (!paused) {
      viewport.scrollTop += speed / 20;
      if (viewport.scrollTop >= viewport.scrollHeight - viewport.clientHeight) viewport.scrollTop = 0;
    }
  };

  window.setTimeout(() => window.setInterval(tick, 50), 900);
})();
