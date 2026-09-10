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
  const recruiterFollowUp = promptGenerator.querySelector('#recruiterFollowUp');
  const followUpName = promptGenerator.querySelector('#recruiterName');
  const followUpEmail = promptGenerator.querySelector('#recruiterEmail');
  const followUpOrganisation = promptGenerator.querySelector('#recruiterOrganisation');
  const followUpConsent = promptGenerator.querySelector('#recruiterConsent');
  const followUpButton = promptGenerator.querySelector('#submitRecruiterFollowUp');
  const followUpStatus = promptGenerator.querySelector('#recruiterFollowUpStatus');
  const modeChoices = [...promptGenerator.querySelectorAll('[data-mode-choice]')];
  const apiEndpoint = window.RECRUITER_REVIEW_API?.endpoint;
  const enquiryEndpoint = window.RECRUITER_REVIEW_API?.enquiryEndpoint || apiEndpoint?.replace(/\/api\/recruiter-review$/, '/api/recruiter-enquiry');
  let selectedMode = 'auto';
  let cataloguePromise;
  let followUpSubmissionId;
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
    resetFollowUp();
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

  function appendTextSection(container, headingText, items, className, sectionClass = '') {
    if (!items.length) return;
    const section = document.createElement('section');
    section.className = `review-detail ${sectionClass}`.trim();
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
    svg.setAttribute('viewBox', '-70 -38 400 340');
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
    dimensions.forEach((dimension, index) => {
      const [labelX, labelY] = pointFor(index, 128);
      const label = document.createElementNS(svgNamespace, 'text');
      const lines = dimension.label.split(' ');
      const anchor = labelX > center + 12 ? 'start' : labelX < center - 12 ? 'end' : 'middle';
      label.setAttribute('class', 'experience-fit-radar__axis-label');
      label.setAttribute('x', labelX);
      label.setAttribute('y', labelY - ((lines.length - 1) * 4));
      label.setAttribute('text-anchor', anchor);
      lines.forEach((line, lineIndex) => {
        const row = document.createElementNS(svgNamespace, 'tspan');
        row.setAttribute('x', labelX);
        if (lineIndex > 0) row.setAttribute('dy', '10');
        row.textContent = line;
        label.append(row);
      });
      svg.append(label);
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

  function renderEvidenceStateBar(state, label) {
    const group = document.createElement('div');
    group.className = 'experience-fit-state-indicator';
    const description = document.createElement('p');
    description.className = 'experience-fit-state-indicator__label';
    description.textContent = `Evidence state: ${stateLabel(state)}`;
    const bar = document.createElement('div');
    bar.className = `experience-fit-state-bar experience-fit-state-bar--${state}`;
    bar.setAttribute('role', 'img');
    bar.setAttribute('aria-label', `${label}: ${stateLabel(state)}. This is a semantic evidence state, not a score.`);
    for (let index = 0; index < 4; index += 1) bar.append(document.createElement('span'));
    group.append(description, bar);
    return group;
  }

  function renderRoleCoverage(roleCoverage, catalogue) {
    if (!Array.isArray(roleCoverage) || roleCoverage.length === 0) return null;
    const section = document.createElement('section');
    section.className = 'role-coverage';
    const heading = document.createElement('h4');
    heading.textContent = 'Role-specific evidence coverage';
    const introduction = document.createElement('p');
    introduction.className = 'role-coverage__intro';
    introduction.textContent = 'These tracks change with the submitted role. They show cited public evidence for the role requirements, not a candidate score.';
    const list = document.createElement('div');
    list.className = 'role-coverage__list';
    for (const coverage of roleCoverage) {
      const item = document.createElement('article');
      item.className = 'role-coverage__item';
      const roleNeed = document.createElement('h5');
      roleNeed.textContent = coverage.roleNeed;
      const capability = document.createElement('p');
      capability.className = 'role-coverage__capability';
      capability.textContent = coverage.label;
      const state = document.createElement('p');
      state.className = `evidence-state evidence-state--${coverage.state}`;
      state.textContent = stateLabel(coverage.state);
      const explanation = document.createElement('p');
      explanation.textContent = coverage.explanation;
      item.append(roleNeed, capability, state, renderEvidenceStateBar(coverage.state, coverage.roleNeed), explanation);
      addEvidenceLinks(item, coverage.evidenceIds, catalogue);
      if (coverage.verificationQuestion) {
        const question = document.createElement('p');
        question.className = 'verification-question';
        question.textContent = `Interview question: ${coverage.verificationQuestion}`;
        item.append(question);
      }
      list.append(item);
    }
    section.append(heading, introduction, list);
    return section;
  }

  function renderRole(assessment, catalogue, { roleTitle = 'Submitted role description' } = {}) {
    const fragment = document.createDocumentFragment();
    const summary = document.createElement('p');
    summary.className = 'review-summary';
    summary.textContent = assessment.summary;
    fragment.append(summary);

    appendTextSection(fragment, 'Role-specific needs detected', assessment.roleNeeds, 'review-detail-list role-needs-list', 'review-detail--role-needs');

    const map = document.createElement('div');
    map.className = 'experience-fit-map';
    const title = document.createElement('p');
    title.className = 'review-map-label';
    title.textContent = 'Experience Fit Map — public evidence coverage, not a candidate score.';
    const reviewedRole = document.createElement('p');
    reviewedRole.className = 'reviewed-role';
    reviewedRole.textContent = `Role reviewed: ${roleTitle}`;
    map.append(title, reviewedRole);
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
      track.append(heading, state, renderEvidenceStateBar(dimension.state, dimension.label), explanation);
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
    const roleCoverage = renderRoleCoverage(assessment.roleCoverage, catalogue);
    if (roleCoverage) fragment.append(roleCoverage);
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
    resetFollowUp();
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
      if (!response.ok) throw new Error(userFacingApiError(payload, response.status));
      const catalogue = Array.isArray(payload.evidenceSources)
        ? new Map(payload.evidenceSources.map((source) => [source.id, source]))
        : await getCatalogue();
      apiReviewOutput.append(payload.kind === 'role'
        ? renderRole(payload.assessment, catalogue, { roleTitle: 'Submitted role description' })
        : renderQuestion(payload.answer, catalogue));
      apiReviewStatus.textContent = mode === 'role'
        ? 'Role assessment based on published evidence.'
        : 'Answer based on published evidence.';
    } catch (requestError) {
      apiReviewStatus.textContent = `${requestError.message} A copyable prompt is available below.`;
      await generateFallbackPrompt();
    } finally {
      generateButton.disabled = false;
      showFollowUp();
      apiReviewResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function userFacingApiError(payload, status) {
    const messages = {
      review_timeout: 'The review took too long. Please try again.',
      provider_rate_limited: 'The AI review service is busy. Please try again in a moment.',
      provider_unavailable: 'The AI review service is temporarily unavailable. Please try again shortly.',
      provider_configuration: 'The AI review service is temporarily unavailable.',
      provider_response_invalid: 'The AI review response could not be used safely.',
      review_validation_failed: 'The AI review response could not be verified against the public evidence.'
    };
    return messages[payload?.code] || (status === 429 ? 'Too many requests. Please try again shortly.' : 'The review is unavailable.');
  }

  function showFollowUp() {
    if (enquiryEndpoint) recruiterFollowUp.hidden = false;
  }

  function resetFollowUp() {
    recruiterFollowUp.hidden = true;
    followUpName.value = '';
    followUpEmail.value = '';
    followUpOrganisation.value = '';
    followUpConsent.checked = false;
    followUpStatus.textContent = '';
    followUpButton.disabled = false;
    followUpSubmissionId = undefined;
  }

  async function submitFollowUp() {
    const recruiterInput = input.value.trim();
    const email = followUpEmail.value.trim();
    if (!recruiterInput) {
      followUpStatus.textContent = 'Add a question or role description first.';
      return;
    }
    if (!email) {
      followUpStatus.textContent = 'Add a work email address to request follow-up.';
      followUpEmail.focus();
      return;
    }
    if (!followUpConsent.checked) {
      followUpStatus.textContent = 'Confirm consent before submitting follow-up details.';
      followUpConsent.focus();
      return;
    }
    followUpStatus.textContent = 'Saving your follow-up request…';
    followUpButton.disabled = true;
    try {
      const response = await fetch(enquiryEndpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          submissionId: followUpSubmissionId ||= crypto.randomUUID(),
          mode: effectiveMode(recruiterInput),
          input: recruiterInput,
          name: followUpName.value,
          email,
          organisation: followUpOrganisation.value,
          consent: true
        })
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.error || 'Follow-up is unavailable.');
      followUpStatus.textContent = payload.duplicate
        ? 'This follow-up request has already been saved.'
        : 'Follow-up request saved. Marcus can contact you using the details you provided.';
      followUpButton.disabled = true;
    } catch (requestError) {
      followUpStatus.textContent = requestError.message || 'Follow-up is unavailable. Please use the contact email below.';
      followUpButton.disabled = false;
    }
  }

  async function loadSavedSmokeTest() {
    const smokeTestId = new URLSearchParams(window.location.search).get('smoke');
    if (!smokeTestId) return;
    if (!/^[a-z0-9-]+$/.test(smokeTestId)) return;

    apiReviewResult.hidden = false;
    apiReviewStatus.textContent = 'Loading saved smoke test…';
    apiReviewOutput.replaceChildren();
    try {
      const response = await fetch(`evidence/smoke-tests/${smokeTestId}.json`, { cache: 'no-store' });
      if (!response.ok) throw new Error('Saved smoke test unavailable.');
      const snapshot = await response.json();
      if (snapshot.kind !== 'role' || !snapshot.assessment || !Array.isArray(snapshot.evidenceSources)) throw new Error('Saved smoke test is invalid.');
      input.value = snapshot.roleBrief || '';
      setMode('role');
      const catalogue = new Map(snapshot.evidenceSources.map((source) => [source.id, source]));
      if (snapshot.sourceUrl) {
        const source = document.createElement('p');
        source.className = 'result-note';
        source.textContent = `${snapshot.sourceNote || 'Saved smoke test.'} `;
        const link = document.createElement('a');
        link.href = snapshot.sourceUrl;
        link.target = '_blank';
        link.rel = 'noreferrer';
        link.textContent = 'Source role listing ↗';
        source.append(link);
        apiReviewOutput.append(source);
      }
      apiReviewOutput.append(renderRole(snapshot.assessment, catalogue, { roleTitle: snapshot.title }));
      apiReviewStatus.textContent = `Saved smoke test: ${snapshot.title}. Public evidence coverage only.`;
    } catch (loadError) {
      apiReviewStatus.textContent = loadError.message;
    }
  }

  if (apiEndpoint) generateButton.textContent = 'Review with AI';
  generateButton.addEventListener('click', () => (apiEndpoint ? runAiReview() : generateFallbackPrompt()));
  followUpButton.addEventListener('click', submitFollowUp);

  updateClassification();
  loadSavedSmokeTest();
}
