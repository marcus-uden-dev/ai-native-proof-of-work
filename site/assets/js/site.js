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
  const templatePromise = fetch('repository-interview-prompt.txt', { cache: 'no-store' }).then((response) => {
    if (!response.ok) throw new Error('Prompt template unavailable');
    return response.text();
  });

  for (const button of promptGenerator.querySelectorAll('[data-example]')) {
    button.addEventListener('click', () => {
      input.value = button.dataset.example;
      input.focus();
    });
  }

  clearButton.addEventListener('click', () => {
    input.value = '';
    output.textContent = '';
    result.hidden = true;
    error.textContent = '';
    copyStatus.textContent = '';
    input.focus();
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
      const template = await templatePromise;
      output.textContent = template.replace('{{INPUT}}', recruiterInput);
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
}
