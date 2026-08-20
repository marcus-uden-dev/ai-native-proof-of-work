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
