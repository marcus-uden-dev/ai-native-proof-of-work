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
  const apiReviewResult = promptGenerator.querySelector('#apiReviewResult');
  const apiReviewStatus = promptGenerator.querySelector('#apiReviewStatus');
  const apiReviewOutput = promptGenerator.querySelector('#apiReviewOutput');
  const modeChoices = [...promptGenerator.querySelectorAll('[data-mode-choice]')];
  const apiEndpoint = window.RECRUITER_REVIEW_API?.endpoint;
  let selectedMode = 'auto';
  let cataloguePromise;
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
    apiReviewResult.hidden = true;
    apiReviewStatus.textContent = '';
    apiReviewOutput.replaceChildren();
    input.focus();
    updateClassification();
  });

  async function generateFallbackPrompt() {
    const recruiterInput = input.value.trim();
    if (!recruiterInput) {
      error.textContent = 'Add a question or paste a job description first.';
      result.hidden = true;
      input.focus();
      return false;
    }

    try {
      const templates = await templatesPromise;
      const mode = effectiveMode(recruiterInput);
      output.textContent = templates[mode].replace('{{INPUT}}', recruiterInput);
      error.textContent = '';
      result.hidden = false;
      result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return true;
    } catch {
      error.textContent = 'The prompt template is unavailable. Use the canonical prompt link instead.';
      result.hidden = true;
      return false;
    }
  }

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

  async function getCatalogue() {
    cataloguePromise ||= fetch('evidence/experience-fit-catalog.json', { cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) throw new Error('Evidence catalogue unavailable');
        const document = await response.json();
        return new Map(document.records.map((record) => [record.id, record]));
      });
    return cataloguePromise;
  }

  function addEvidenceLinks(container, evidenceIds, catalogue) {
    const list = document.createElement('ul');
    list.className = 'review-evidence-links';
    let missingEvidence = false;
    for (const id of evidenceIds) {
      const record = catalogue.get(id);
      if (!record) {
        missingEvidence = true;
        continue;
      }
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = record.url;
      link.target = '_blank';
      link.rel = 'noreferrer';
      link.textContent = `${record.label} ↗`;
      item.append(link);
      list.append(item);
    }
    if (missingEvidence) {
      const item = document.createElement('li');
      item.className = 'review-evidence-unavailable';
      item.textContent = 'Evidence link unavailable.';
      list.append(item);
    }
    if (list.childElementCount) container.append(list);
  }

  function renderQuestion(answer, catalogue) {
    const fragment = document.createDocumentFragment();
    const summary = document.createElement('p');
    summary.className = 'review-summary';
    summary.textContent = answer.summary;
    fragment.append(summary);
    const findings = document.createElement('ol');
    findings.className = 'review-findings';
    for (const finding of answer.findings) {
      const item = document.createElement('li');
      const claim = document.createElement('p');
      claim.textContent = finding.claim;
      item.append(claim);
      addEvidenceLinks(item, finding.evidenceIds, catalogue);
      findings.append(item);
    }
    fragment.append(findings);
    appendTextSection(fragment, 'Evidence limits', answer.limitations, 'review-detail-list');
    return fragment;
  }

  function appendTextSection(container, headingText, items, className) {
    if (!items.length) return;
    const section = document.createElement('section');
    section.className = 'review-detail';
    const heading = document.createElement('h4');
    heading.textContent = headingText;
    const list = document.createElement('ul');
    list.className = className;
    for (const item of items) {
      const row = document.createElement('li');
      row.textContent = item;
      list.append(row);
    }
    section.append(heading, list);
    container.append(section);
  }

  function stateLabel(state) {
    return {
      direct: 'Direct evidence',
      transferable: 'Transferable evidence',
      needs_interview_verification: 'Needs interview verification',
      not_evidenced: 'Not evidenced in this public record'
    }[state] || state;
  }

  function renderSemanticRadar(dimensions) {
    const svgNamespace = 'http://www.w3.org/2000/svg';
    const center = 130;
    const radii = { direct: 102, transferable: 78, needs_interview_verification: 54, not_evidenced: 30 };
    const pointFor = (index, radius) => {
      const angle = ((Math.PI * 2 * index) / dimensions.length) - (Math.PI / 2);
      return [center + Math.cos(angle) * radius, center + Math.sin(angle) * radius];
    };
    const svg = document.createElementNS(svgNamespace, 'svg');
    svg.classList.add('experience-fit-radar__svg');
    svg.setAttribute('viewBox', '0 0 260 260');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', `Experience Fit Map. ${dimensions.map((dimension) => `${dimension.label}: ${stateLabel(dimension.state)}`).join('. ')}`);

    for (const radius of [30, 54, 78, 102]) {
      const ring = document.createElementNS(svgNamespace, 'polygon');
      ring.setAttribute('class', 'experience-fit-radar__ring');
      ring.setAttribute('points', dimensions.map((_, index) => pointFor(index, radius).join(',')).join(' '));
      svg.append(ring);
    }
    dimensions.forEach((dimension, index) => {
      const [axisX, axisY] = pointFor(index, 108);
      const axis = document.createElementNS(svgNamespace, 'line');
      axis.setAttribute('class', 'experience-fit-radar__axis');
      axis.setAttribute('x1', center);
      axis.setAttribute('y1', center);
      axis.setAttribute('x2', axisX);
      axis.setAttribute('y2', axisY);
      svg.append(axis);
    });
    const evidence = document.createElementNS(svgNamespace, 'polygon');
    evidence.setAttribute('class', 'experience-fit-radar__evidence');
    evidence.setAttribute('points', dimensions.map((dimension, index) => pointFor(index, radii[dimension.state]).join(',')).join(' '));
    svg.append(evidence);
    dimensions.forEach((dimension, index) => {
      const [x, y] = pointFor(index, radii[dimension.state]);
      const marker = document.createElementNS(svgNamespace, 'circle');
      marker.setAttribute('class', `experience-fit-radar__marker experience-fit-radar__marker--${dimension.state}`);
      marker.setAttribute('cx', x);
      marker.setAttribute('cy', y);
      marker.setAttribute('r', 3.5);
      svg.append(marker);
    });
    return svg;
  }

  function renderRole(assessment, catalogue) {
    const fragment = document.createDocumentFragment();
    const summary = document.createElement('p');
    summary.className = 'review-summary';
    summary.textContent = assessment.summary;
    fragment.append(summary);

    const map = document.createElement('div');
    map.className = 'experience-fit-map';
    const title = document.createElement('p');
    title.className = 'review-map-label';
    title.textContent = 'Experience Fit Map — public evidence coverage, not a candidate score.';
    map.append(title);
    const radar = document.createElement('figure');
    radar.className = 'experience-fit-radar';
    radar.append(renderSemanticRadar(assessment.dimensions));
    const caption = document.createElement('figcaption');
    caption.textContent = 'The shape encodes cited public-evidence states only. Read the evidence tracks for the full interpretation.';
    radar.append(caption);
    map.append(radar);
    const tracks = document.createElement('div');
    tracks.className = 'experience-fit-tracks';
    for (const dimension of assessment.dimensions) {
      const track = document.createElement('article');
      track.className = 'experience-fit-track';
      const heading = document.createElement('h4');
      heading.textContent = dimension.label;
      const state = document.createElement('p');
      state.className = `evidence-state evidence-state--${dimension.state}`;
      state.textContent = stateLabel(dimension.state);
      const explanation = document.createElement('p');
      explanation.textContent = dimension.explanation;
      track.append(heading, state, explanation);
      addEvidenceLinks(track, dimension.evidenceIds, catalogue);
      if (dimension.verificationQuestion) {
        const question = document.createElement('p');
        question.className = 'verification-question';
        question.textContent = `Interview question: ${dimension.verificationQuestion}`;
        track.append(question);
      }
      tracks.append(track);
    }
    map.append(tracks);
    fragment.append(map);
    appendTextSection(fragment, 'Role needs', assessment.roleNeeds, 'review-detail-list');
    appendTextSection(fragment, 'Interview validation', assessment.interviewQuestions, 'review-detail-list');
    appendTextSection(fragment, 'Evidence limits', assessment.limitations, 'review-detail-list');
    return fragment;
  }

  async function runAiReview() {
    const recruiterInput = input.value.trim();
    if (!recruiterInput) {
      error.textContent = 'Add a question or paste a job description first.';
      input.focus();
      return;
    }

    const mode = effectiveMode(recruiterInput);
    error.textContent = '';
    apiReviewResult.hidden = false;
    apiReviewStatus.textContent = 'Reviewing published evidence…';
    apiReviewOutput.replaceChildren();
    generateButton.disabled = true;
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ mode, clientMode: selectedMode, input: recruiterInput })
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Review unavailable');
      const catalogue = await getCatalogue();
      apiReviewOutput.append(payload.kind === 'role'
        ? renderRole(payload.assessment, catalogue)
        : renderQuestion(payload.answer, catalogue));
      apiReviewStatus.textContent = mode === 'role'
        ? 'Role assessment based on published evidence.'
        : 'Answer based on published evidence.';
    } catch (requestError) {
      apiReviewStatus.textContent = `${requestError.message} A copyable prompt is available below.`;
      await generateFallbackPrompt();
    } finally {
      generateButton.disabled = false;
      apiReviewResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  if (apiEndpoint) generateButton.textContent = 'Review with AI';
  generateButton.addEventListener('click', () => (apiEndpoint ? runAiReview() : generateFallbackPrompt()));

  updateClassification();
}
