const allowedViews = ['today', 'discover', 'job', 'research', 'tailor', 'cv', 'prepare'];
const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];
const status = document.querySelector('[data-view-status]');
const fixtureUrl = '../../../../../evidence/fixtures/job-agent-company-v1.json';

function selectedView() {
  const hash = window.location.hash.slice(1);
  return allowedViews.includes(hash) ? hash : 'today';
}

function showView(view, { focusTab = false } = {}) {
  const safeView = allowedViews.includes(view) ? view : 'today';
  for (const tab of tabs) {
    const selected = tab.dataset.viewLink === safeView;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focusTab) tab.focus();
  }
  for (const panel of panels) panel.hidden = panel.dataset.view !== safeView;
  if (status) status.textContent = `${tabs.find((tab) => tab.dataset.viewLink === safeView)?.textContent ?? safeView} view selected.`;
}

function moveTab(currentIndex, direction) {
  const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
  const next = tabs[nextIndex];
  window.location.hash = next.dataset.viewLink;
  showView(next.dataset.viewLink, { focusTab: true });
}

for (const [index, tab] of tabs.entries()) {
  tab.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      moveTab(index, 1);
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      moveTab(index, -1);
    }
    if (event.key === 'Home') {
      event.preventDefault();
      window.location.hash = tabs[0].dataset.viewLink;
      showView(tabs[0].dataset.viewLink, { focusTab: true });
    }
    if (event.key === 'End') {
      event.preventDefault();
      const last = tabs.at(-1);
      window.location.hash = last.dataset.viewLink;
      showView(last.dataset.viewLink, { focusTab: true });
    }
  });
}

window.addEventListener('hashchange', () => showView(selectedView()));

function sourceLabel(field) {
  return `<span class="data-source data-source--${field.sourceClass === 'synthetic_demo' ? 'synthetic' : 'inferred'}">${field.sourceLabel}</span>`;
}

function renderResearch(fixture) {
  for (const element of document.querySelectorAll('[data-company-name]')) element.textContent = fixture.company.name;
  const fields = document.querySelector('[data-research-fields]');
  fields.innerHTML = fixture.researchFields.map((field) => `
    <article class="demo-research-field" data-demo-field="${field.id}">
      <div><p>${field.label}</p>${sourceLabel(field)}</div>
      <h3>${field.value}</h3>
      <p>${field.evidenceNote}</p>
      <dl><dt>Confidence</dt><dd>${field.confidence}</dd><dt>Decision use</dt><dd>${field.decisionUse}</dd></dl>
    </article>
  `).join('');

  const renderSignals = (signals) => signals.map((signal) => `<li><span>${signal.label}</span><small>${signal.sourceClass.replace('_', ' ')}</small></li>`).join('');
  document.querySelector('[data-positive-signals]').innerHTML = renderSignals(fixture.signals.positive);
  document.querySelector('[data-warning-signals]').innerHTML = renderSignals(fixture.signals.warnings);
}

async function loadFixture() {
  try {
    const response = await fetch(fixtureUrl);
    if (!response.ok) throw new Error('Fixture unavailable');
    renderResearch(await response.json());
  } catch {
    const fields = document.querySelector('[data-research-fields]');
    fields.innerHTML = '<p class="fixture-error">The synthetic fixture is unavailable. Review the <a href="../../../../../evidence/fixtures/job-agent-company-v1.json">public evidence file</a> directly.</p>';
  }
}

showView(selectedView());
loadFixture();

