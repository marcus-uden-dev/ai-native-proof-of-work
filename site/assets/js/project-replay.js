(() => {
  const story = document.querySelector('[data-project-story]');
  if (!story) return;

  const chapters = [...story.querySelectorAll('[data-story-event]')];
  const markers = [...story.querySelectorAll('[data-story-marker]')];
  const selects = [...story.querySelectorAll('[data-story-select]')];
  const controls = story.querySelector('[data-story-controls]');
  const stage = story.querySelector('[data-story-stage]');
  const range = story.querySelector('[data-story-range]');
  const dateOutput = story.querySelector('[data-story-date-output]');
  const note = story.querySelector('[data-story-note]');
  const previous = story.querySelector('[data-story-previous]');
  const next = story.querySelector('[data-story-next]');
  const play = story.querySelector('[data-story-play]');
  const pause = story.querySelector('[data-story-pause]');
  const current = story.querySelector('[data-story-current]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let position = chapters.length - 1;
  let timer = null;

  if (!controls || !stage || !range || !previous || !next || !play || !pause || !current || chapters.length === 0) return;

  function stopPlayback() {
    if (timer) window.clearInterval(timer);
    timer = null;
    play.disabled = false;
    pause.disabled = true;
  }

  function showChapter(nextPosition, { focus = false } = {}) {
    position = Math.max(0, Math.min(chapters.length - 1, nextPosition));
    const chapter = chapters[position];
    const date = chapter.querySelector('time')?.textContent ?? '';
    const title = chapter.querySelector('h3')?.textContent ?? 'Selected chapter';

    const chapterCopy = chapter.querySelector('article').cloneNode(true);
    chapterCopy.classList.add('project-story__chapter');
    stage.replaceChildren(chapterCopy);
    stage.hidden = false;
    range.value = String(position);
    dateOutput.textContent = date;
    previous.disabled = position === 0;
    next.disabled = position === chapters.length - 1;
    current.disabled = position === chapters.length - 1;

    markers.forEach((marker, index) => {
      marker.hidden = index > position;
      marker.toggleAttribute('data-story-selected', index === position);
    });
    selects.forEach((select, index) => {
      select.setAttribute('aria-current', index === position ? 'step' : 'false');
      select.tabIndex = index > position ? -1 : 0;
    });

    note.textContent = position === 0
      ? `At the origin: ${title}. Use Next chapter or Play from origin to continue.`
      : position === chapters.length - 1
        ? `Current state: ${title}. All public chapters are available.`
        : `${position + 1} of ${chapters.length} public chapters are available at this point.`;

    if (focus) {
      stage.tabIndex = -1;
      stage.focus();
    }
  }

  function beginPlayback() {
    stopPlayback();
    showChapter(0, { focus: true });
    if (reduceMotion.matches) {
      note.textContent = 'Reduced motion is enabled. Playback starts at the origin and advances only when you select Next chapter.';
      return;
    }
    play.disabled = true;
    pause.disabled = false;
    timer = window.setInterval(() => {
      if (position >= chapters.length - 1) {
        stopPlayback();
        return;
      }
      showChapter(position + 1);
    }, 3500);
  }

  selects.forEach((select) => {
    select.addEventListener('click', (event) => {
      event.preventDefault();
      stopPlayback();
      showChapter(Number(select.dataset.storyIndex), { focus: true });
      history.replaceState(null, '', select.getAttribute('href'));
    });
    select.addEventListener('keydown', (event) => {
      const selectedIndex = Number(select.dataset.storyIndex);
      const nextPosition = event.key === 'ArrowRight' ? selectedIndex + 1 : event.key === 'ArrowLeft' ? selectedIndex - 1 : null;
      if (nextPosition === null || nextPosition < 0 || nextPosition >= chapters.length) return;
      event.preventDefault();
      stopPlayback();
      showChapter(nextPosition, { focus: true });
    });
  });

  range.addEventListener('input', () => {
    stopPlayback();
    showChapter(Number(range.value));
  });
  previous.addEventListener('click', () => {
    stopPlayback();
    showChapter(position - 1, { focus: true });
  });
  next.addEventListener('click', () => {
    stopPlayback();
    showChapter(position + 1, { focus: true });
  });
  play.addEventListener('click', beginPlayback);
  pause.addEventListener('click', () => {
    stopPlayback();
    note.textContent = 'Playback paused. Select a chapter, use the slider, or continue with Next chapter.';
  });
  current.addEventListener('click', () => {
    stopPlayback();
    showChapter(chapters.length - 1, { focus: true });
  });
  window.addEventListener('pagehide', stopPlayback, { once: true });

  controls.hidden = false;
  story.classList.add('project-story--enhanced');
  pause.disabled = true;
  showChapter(position);
})();
