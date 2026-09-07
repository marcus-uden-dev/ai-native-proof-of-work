async function copyText(button) {
  const value = button.dataset.copyValue;
  const label = button.dataset.copyLabel || 'Copy';
  const statusRegion = button.closest('section')?.querySelector('[data-copy-status]');
  if (!value) return;

  try {
    await navigator.clipboard.writeText(value);
    button.dataset.originalLabel ||= button.textContent;
    button.textContent = 'Copied';
    if (statusRegion) statusRegion.textContent = `${label} succeeded.`;
    window.setTimeout(() => {
      button.textContent = button.dataset.originalLabel;
    }, 2200);
  } catch {
    if (statusRegion) statusRegion.textContent = `${label} failed. Select and copy the visible text instead.`;
  }
}

for (const button of document.querySelectorAll('[data-copy-value]')) {
  button.addEventListener('click', () => copyText(button));
}

const promptGenerator = document.querySelector('#ai-review');

if (promptGenerator) {
  const input = promptGenerator.querySelector('#recruiterInput');
  const output = promptGenerator.querySelector('#repositoryPrompt');
  const result = promptGenerator.querySelector('#generatorResult');
  const error = promptGenerator.querySelector('#inputError');
  const generateButton = promptGenerator.querySelector('#generatePrompt');
  const clearButton = promptGenerator.querySelector('#clearInput');
  const copyButton = promptGenerator.querySelector('#copyPrompt');
  const copyStatus = promptGenerator.querySelector('#copyStatus');
  const classification = promptGenerator.querySelector('#inputClassification');
  const modeChoices = [...promptGenerator.querySelectorAll('[data-mode-choice]')];
  let selectedMode = 'auto';
  const templatesPromise = Promise.all([
    fetch('repository-question-prompt.txt', { cache: 'no-store' }),
    fetch('repository-interview-prompt.txt', { cache: 'no-store' })
  ]).then(async ([questionResponse, roleResponse]) => {
    if (!questionResponse.ok || !roleResponse.ok) throw new Error('Prompt template unavailable');
    return { question: await questionResponse.text(), role: await roleResponse.text() };
  });

  function detectInputMode(value) {
    const normalized = value.toLowerCase();
    const roleSignals = [
      /\b(job description|role summary|responsibilities|requirements|qualifications|we are looking for|about the role|ansvar|krav|kvalifikationer|arbetsuppgifter|vi söker)\b/,
      /\n\s*(?:[-•]|\d+\.)\s+.+/,
      /\b(?:years of experience|erfarenhet av|experience with)\b/
    ];
    const matches = roleSignals.filter((signal) => signal.test(normalized)).length;
    return matches >= 2 || (normalized.length > 700 && matches >= 1) ? 'role' : 'question';
  }

  function effectiveMode(value) {
    return selectedMode === 'auto' ? detectInputMode(value) : selectedMode;
  }

  function updateClassification() {
    const mode = effectiveMode(input.value.trim());
    const label = mode === 'role' ? 'role assessment' : 'evidence question';
    classification.textContent = selectedMode === 'auto'
      ? `Detected mode: ${label}.`
      : `Selected mode: ${label}.`;
  }

  function setMode(mode) {
    selectedMode = mode;
    for (const choice of modeChoices) {
      choice.setAttribute('aria-pressed', String(choice.dataset.modeChoice === mode));
    }
    updateClassification();
  }

  for (const choice of modeChoices) {
    choice.addEventListener('click', () => setMode(choice.dataset.modeChoice));
  }

  input.addEventListener('input', updateClassification);

  for (const button of promptGenerator.querySelectorAll('[data-example]')) {
    button.addEventListener('click', () => {
      input.value = button.dataset.example;
      input.focus();
      updateClassification();
    });
  }

  clearButton.addEventListener('click', () => {
    input.value = '';
    output.textContent = '';
    result.hidden = true;
    error.textContent = '';
    copyStatus.textContent = '';
    input.focus();
    updateClassification();
  });

  generateButton.addEventListener('click', async () => {
    const recruiterInput = input.value.trim();
    if (!recruiterInput) {
      error.textContent = 'Add a question or paste a job description first.';
      result.hidden = true;
      input.focus();
      return;
    }

    try {
      const templates = await templatesPromise;
      const mode = effectiveMode(recruiterInput);
      output.textContent = templates[mode].replace('{{INPUT}}', recruiterInput);
      error.textContent = '';
      result.hidden = false;
      result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch {
      error.textContent = 'The prompt template is unavailable. Use the canonical prompt link instead.';
      result.hidden = true;
    }
  });

  copyButton.addEventListener('click', async () => {
    try {
      if (!output.textContent) throw new Error('No generated prompt');
      await navigator.clipboard.writeText(output.textContent.trim());
      copyStatus.textContent = 'Prompt copied.';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(output);
      selection.removeAllRanges();
      selection.addRange(range);
      copyStatus.textContent = 'Select and copy the highlighted prompt.';
    }
  });

  updateClassification();
}
