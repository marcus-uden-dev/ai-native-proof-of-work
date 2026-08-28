(() => {
  const ACCESS_KEY = 'marcus-proof-preview-unlocked';
  const PASSWORD_HASH = 'cbdd10d72000b3a4068a0ea6c99aec6b306c0d49beb065c105143ee2e815256f';
  const root = document.documentElement;

  let unlocked = false;
  try {
    unlocked = sessionStorage.getItem(ACCESS_KEY) === '1';
  } catch {
    unlocked = false;
  }

  if (!unlocked) root.setAttribute('data-preview-locked', '');

  async function hash(value) {
    const bytes = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(digest)]
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  function unlock() {
    root.removeAttribute('data-preview-locked');
    try {
      sessionStorage.setItem(ACCESS_KEY, '1');
    } catch {
      // The gate still works for this page when session storage is unavailable.
    }
  }

  function mount() {
    if (unlocked) return;

    const gate = document.createElement('main');
    gate.className = 'access-gate';
    gate.setAttribute('aria-labelledby', 'access-gate-title');
    gate.innerHTML = `
      <div class="access-gate__panel">
        <p class="access-gate__eyebrow">Private preview · WIP</p>
        <h1 id="access-gate-title">This site is still being finished.</h1>
        <p class="access-gate__intro">Enter the preview password to review the current proof-of-work site.</p>
        <form class="access-gate__form">
          <label for="access-gate-password">Preview password</label>
          <div class="access-gate__input-row">
            <input id="access-gate-password" name="password" type="password" autocomplete="off" required>
            <button class="button button--primary" type="submit">Open preview</button>
          </div>
          <p class="access-gate__error" role="alert" aria-live="polite"></p>
        </form>
        <p class="access-gate__note">WIP: content, evidence, and presentation may change.</p>
      </div>
    `;
    document.body.prepend(gate);

    const form = gate.querySelector('form');
    const input = gate.querySelector('input');
    const submit = gate.querySelector('button');
    const error = gate.querySelector('.access-gate__error');
    input.focus();

    input.addEventListener('input', () => {
      error.textContent = '';
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      submit.disabled = true;
      error.textContent = '';

      try {
        if (await hash(input.value) === PASSWORD_HASH) {
          unlock();
          gate.remove();
          return;
        }
        error.textContent = 'That password did not match. Please try again.';
        input.select();
      } catch {
        error.textContent = 'This preview could not verify the password in this browser.';
      } finally {
        submit.disabled = false;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
