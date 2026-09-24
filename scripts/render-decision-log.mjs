import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const entries = JSON.parse(readFileSync(resolve(root, 'site/evidence/decision-log.json'), 'utf8'));
const tagTaxonomy = JSON.parse(readFileSync(resolve(root, 'site/evidence/decision-log-tags.json'), 'utf8'));
const projects = [
  { name: 'Job-agent', id: 'job-agent', qualifier: 'lead proof', className: 'decision-log-oracle__project--lead' },
  { name: 'Personal AI Harness', id: 'personal-ai-harness', qualifier: 'operating layer', className: 'decision-log-oracle__project--harness' },
  { name: 'PKM', id: 'pkm', qualifier: 'supporting proof', className: '' },
  { name: 'Household budget', id: 'household-budget', qualifier: 'supporting proof', className: '' }
];

const projectByName = new Map(projects.map((project) => [project.name, project]));
const check = process.argv.includes('--check');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function replaceRegion(document, name, content, file) {
  const pattern = new RegExp(`(<!-- ${name}:BEGIN -->)[\\s\\S]*?(<!-- ${name}:END -->)`);
  if (!pattern.test(document)) throw new Error(`${file} is missing ${name} markers`);
  return document.replace(pattern, `$1\n${content}\n          $2`);
}

function renderStatus(status) {
  if (!status) return '';
  const statusClass = status === 'Planned' ? ' pill--status pill--planned' : status === 'Hypothesis' ? ' pill--status pill--hypothesis' : ' pill--status';
  return `<span class="pill${statusClass}">${escapeHtml(status)}</span>`;
}

function renderEntries() {
  return entries.map((entry) => {
    const project = projectByName.get(entry.project);
    if (!project) throw new Error(`Unsupported project for ${entry.date}: ${entry.project ?? '(missing)'}`);
    const tags = entry.tags.map((tag) => `<span class="pill">${escapeHtml(tag)}</span>`).join('');
    const type = entry.type ? `<span class="visually-hidden">Decision type:</span><span class="pill">${escapeHtml(entry.type)}</span>` : '';
    return `          <li data-project="${project.id}" data-tags="${entry.tags.map(escapeHtml).join(' ')}"><p class="decision-log-entry__date">${escapeHtml(entry.date)}</p><p class="decision-log-entry__tags"><span class="visually-hidden">Project:</span><span class="pill pill--gold">${project.name}</span>${renderStatus(entry.status)}${type}<span class="visually-hidden">Capabilities shown:</span>${tags}</p><p class="decision-log-entry__why"><strong>Why: </strong>${escapeHtml(entry.why)}</p><p class="decision-log-entry__demonstrates"><strong>Shows: </strong>${escapeHtml(entry.demonstrates)}</p></li>`;
  }).join('\n');
}

function renderFacts() {
  const capabilityCount = new Set(entries.flatMap((entry) => entry.tags)).size;
  return `          <div><strong>${entries.length}</strong><span>decision records</span></div>\n          <div><strong>${projects.length}</strong><span>project lenses</span></div>\n          <div><strong>${capabilityCount}</strong><span>capability tags</span></div>`;
}

function renderProjects() {
  const buttons = projects.map((project) => {
    const count = entries.filter((entry) => entry.project === project.name).length;
    const className = ['decision-log-oracle__project', project.className].filter(Boolean).join(' ');
    return `<button class="${className}" type="button" data-filter-type="project" data-filter-value="${project.id}" aria-pressed="false">${project.name} <small>${count} records · ${project.qualifier}</small></button>`;
  });
  return `          <span class="decision-log-oracle__filter-label">Filter by project</span>\n          <button class="decision-log-oracle__project decision-log-oracle__project--all" type="button" data-filter-type="all" aria-pressed="true">All decisions <small>${entries.length} records</small></button>\n          ${buttons.join('\n          ')}`;
}

function renderTags() {
  const usedTags = new Set(entries.flatMap((entry) => entry.tags));
  return `          <span class="decision-log-oracle__filter-label">Filter by capability</span>\n          ${tagTaxonomy.filter(({ tag }) => usedTags.has(tag)).map(({ tag }, index) => `<button class="pill${index === 0 ? ' pill--gold' : ''}" type="button" data-filter-type="tag" data-filter-value="${tag}">${escapeHtml(tag)}</button>`).join('')}`;
}

function renderFile(relativePath) {
  const path = resolve(root, relativePath);
  const original = readFileSync(path, 'utf8');
  let rendered = replaceRegion(original, 'DECISION_LOG_FACTS', renderFacts(), relativePath);
  rendered = replaceRegion(rendered, 'DECISION_LOG_PROJECTS', renderProjects(), relativePath);
  rendered = replaceRegion(rendered, 'DECISION_LOG_TAGS', renderTags(), relativePath);
  rendered = replaceRegion(rendered, 'DECISION_LOG_ENTRIES', renderEntries(), relativePath);
  if (relativePath === 'site/index.html') {
    rendered = replaceRegion(rendered, 'HOW_I_THINK_DECISION_COUNT', `<strong>${entries.length}</strong><span>decision records</span>`, relativePath);
  }
  if (check) {
    if (rendered !== original) throw new Error(`${relativePath} is out of date. Run npm run render:decision-log.`);
    return;
  }
  if (rendered !== original) writeFileSync(path, rendered);
}

renderFile('site/index.html');
renderFile('site/proof/recursive-workflow/index.html');
