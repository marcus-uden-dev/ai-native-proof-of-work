const DATA_DATE = "2026-06-01";

const icons = {
  revenue_growth: `<svg viewBox="0 0 24 24"><path d="M3 3v18h18"></path><path d="m7 15 4-4 3 3 5-7"></path></svg>`,
  remote: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15 15 0 0 1 0 20"></path><path d="M12 2a15 15 0 0 0 0 20"></path></svg>`,
  product: `<svg viewBox="0 0 24 24"><path d="M8.5 14.5A4.5 4.5 0 0 1 12 6c1.5 2 4 3.5 4 7a4 4 0 0 1-7.5 1.5Z"></path><path d="M12 6c0-2 1-3 2-4 1 2 2 4 2 6"></path></svg>`,
  learning: `<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"></path></svg>`,
  culture: `<svg viewBox="0 0 24 24"><path d="M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3Z"></path><path d="M8 11c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3Z"></path><path d="M2 20c.6-3 2.6-5 6-5s5.4 2 6 5"></path><path d="M10 20c.5-2.5 2.2-4 5-4 2.6 0 4.3 1.5 5 4"></path></svg>`,
  long_hours: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>`,
  bureaucracy: `<svg viewBox="0 0 24 24"><rect x="8" y="2" width="8" height="4" rx="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14H4V6a2 2 0 0 1 2-2h2"></path><path d="M8 12h8"></path><path d="M8 16h5"></path></svg>`,
  launch_pressure: `<svg viewBox="0 0 24 24"><path d="M4.5 16.5c-1.5 1.3-2 3.3-2 3.3s2-.5 3.3-2"></path><path d="M9 15 3 9l4-1 3-5 6 6-5 3-2 4Z"></path><path d="m14 4 6 6"></path></svg>`,
  comp: `<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2"></rect><circle cx="12" cy="12" r="3"></circle><path d="M6 9v.01"></path><path d="M18 15v.01"></path></svg>`,
  stability: `<svg viewBox="0 0 24 24"><path d="M3 21h18"></path><path d="M6 21V8l6-4 6 4v13"></path><path d="M9 21v-7h6v7"></path></svg>`,
};

const companies = {
  openai: {
    company: "OpenAI",
    role: "AI Workflow Product Engineer",
    location: "San Francisco / global roles",
    score: 91,
    match: 87,
    status: "saved",
    summary:
      "OpenAI describes itself publicly as an AI research and deployment company with a mission to ensure that AGI benefits humanity. This snapshot uses official public pages for the company story; salary, fit, risk and financial KPI fields are demo signals.",
    fields: [
      ["Mission", "AGI benefits humanity", "public_source"],
      ["Structure", "Foundation + public benefit corporation group", "public_source"],
      ["Comp", "Demo benchmark only", "synthetic"],
    ],
    sources: [
      ["OpenAI About", "https://openai.com/about/"],
      ["OpenAI Jobs", "https://openai.com/jobs/"],
    ],
    green: [
      ["product", "Research + deployment", "Official company page describes OpenAI as an AI research and deployment company.", "public_source"],
      ["learning", "Cross-disciplinary hiring", "OpenAI says safe and beneficial AI requires people from many disciplines and backgrounds.", "public_source"],
      ["culture", "Mission-led", "Official mission and structure pages anchor this culture signal.", "public_source"],
      ["revenue_growth", "Growth signal", "Synthetic visual signal to show how company research renders upside.", "synthetic"],
    ],
    red: [
      ["long_hours", "Intensity risk", "Demo warning signal for frontier-AI operating pace.", "synthetic"],
      ["bureaucracy", "Complex governance", "Inferred demo risk for high-stakes AI/product environments.", "inferred_demo"],
      ["launch_pressure", "Launch pressure", "Synthetic launch-risk chip to demonstrate warning UI.", "synthetic"],
    ],
    comp: {
      monthly: "88 000 SEK",
      region: "Stockholm / global benchmark lens",
      ssyk: "2512 Software and system developers",
      comparison: "above salary floor",
      score: 86,
      confidence: "medium",
      evidence: "Synthetic monthly benchmark used only to demonstrate the compensation signal row.",
    },
    culture: {
      remote: "Not asserted in this demo",
      stage: "Frontier AI",
      type: "Research and deployment",
      confidence: "medium",
      evidence: "Mission, company type, and structure are public-source; work-mode details are not asserted unless backed by a specific role.",
    },
    kpis: [
      ["Operating margin", "demo", "Synthetic KPI placeholder", "synthetic", "warn"],
      ["Profit / employee", "N/A", "Not public here", "synthetic", "warn"],
      ["Revenue / employee", "N/A", "Not public here", "synthetic", "warn"],
      ["Company age", "demo", "Avoid unsourced claim", "synthetic", "warn"],
    ],
  },
  anthropic: {
    company: "Anthropic",
    role: "Product Engineer, AI Safety Workflows",
    location: "San Francisco / New York / London",
    score: 88,
    match: 84,
    status: "saved",
    summary:
      "Anthropic describes itself publicly as an AI safety and research company building reliable, interpretable and steerable AI systems. This snapshot uses official public company/careers pages for mission, values, benefits and work-policy context; salary, fit and financial KPI fields remain demo signals.",
    fields: [
      ["Company type", "AI safety and research company", "public_source"],
      ["Products", "Claude and related product suite", "public_source"],
      ["Comp", "Demo benchmark only", "synthetic"],
    ],
    sources: [
      ["Anthropic Company", "https://www.anthropic.com/company"],
      ["Anthropic Careers", "https://www.anthropic.com/careers"],
    ],
    green: [
      ["stability", "Safety-led mission", "Official company page says Anthropic builds reliable, interpretable and steerable AI systems.", "public_source"],
      ["product", "Claude product surface", "Official pages list Claude and related product offerings.", "public_source"],
      ["learning", "Education stipend", "Careers page lists an annual education stipend among benefits.", "public_source"],
      ["remote", "Office-regular policy", "Careers FAQ says most staff are in the Bay Area and come to the office regularly; some farther away come one week per month.", "public_source"],
    ],
    red: [
      ["long_hours", "Long-hours risk", "Demo warning chip for intensive frontier AI work.", "synthetic"],
      ["launch_pressure", "Model launch pressure", "Demo risk chip for visualizing warning UI.", "synthetic"],
      ["bureaucracy", "Research/product coordination", "Inferred demo risk around cross-functional coordination.", "inferred_demo"],
    ],
    comp: {
      monthly: "84 000 SEK",
      region: "Stockholm proxy benchmark",
      ssyk: "2512 Software and system developers",
      comparison: "above salary floor",
      score: 82,
      confidence: "medium",
      evidence: "Synthetic benchmark row; not a claim about Anthropic compensation.",
    },
    culture: {
      remote: "Office-regular; some monthly office travel",
      stage: "Frontier AI",
      type: "Safety-led",
      confidence: "medium",
      evidence: "Official company and careers pages support the safety, values, benefits and remote-policy framing; detailed role fit remains demo inference.",
    },
    kpis: [
      ["Operating margin", "demo", "Synthetic KPI placeholder", "synthetic", "warn"],
      ["Profit / employee", "N/A", "Not public here", "synthetic", "warn"],
      ["Revenue / employee", "N/A", "Not public here", "synthetic", "warn"],
      ["Company age", "demo", "Avoid unsourced claim", "synthetic", "warn"],
    ],
  },
};

const state = {
  route: "today",
  todayTab: "open",
  jobTab: "company",
  selectedCompany: "openai",
  discoverTab: "criteria",
  generatedAssets: true,
};

function badge(kind) {
  const label = kind === "public_source" ? "public source" : kind === "synthetic" ? "synthetic demo" : "inferred demo";
  return `<span class="data-badge ${kind}">${label}</span>`;
}

function setRoute(route) {
  state.route = route;
  window.location.hash = route;
  render();
}

function syncFromHash() {
  const route = window.location.hash.replace("#", "");
  if (["today", "find", "prepare", "library", "profile", "settings"].includes(route)) {
    state.route = route;
  }
}

function render() {
  document.querySelectorAll("[data-route]").forEach((link) => {
    link.classList.toggle("active", link.dataset.route === state.route);
  });
  const app = document.getElementById("app");
  if (state.route === "find") app.innerHTML = renderFind();
  else if (state.route === "prepare") app.innerHTML = renderSimple("Prepare", "Interview prep, assessment practice, and follow-up drafting surfaces are represented here as a static snapshot.", "Practice queue", "Mock interview prompts, structured notes, and follow-up drafts.");
  else if (state.route === "library") app.innerHTML = renderSimple("Library", "Document library, CV variants, snippets, and application material live here in the real product.", "Documents", "CV - Product Engineer.pdf, CV - AI Workflow.docx, Snippet library.");
  else if (state.route === "profile") app.innerHTML = renderSimple("Profile", "Persona, target roles, constraints, and career preferences are used by scoring and generation flows.", "Career signal", "AI-native product/workflow roles, Stockholm/remote preference, privacy-conscious workflow.");
  else if (state.route === "settings") app.innerHTML = renderSimple("Settings", "Privacy, consent, billing, export/delete, and product-feedback settings.", "Data rights", "Export request, delete request, consent preferences, billing state.");
  else app.innerHTML = renderToday();
  bindEvents();
}

function renderToday() {
  if (state.todayTab === "detail") return renderJobDetail();
  const rows = [companies.openai, companies.anthropic, {
    company: "Northstar Systems",
    role: "Workflow Automation Lead",
    location: "Stockholm / hybrid",
    score: 78,
    match: 74,
    status: "new",
    green: [["culture", "Ownership", "Synthetic supporting row.", "synthetic"]],
    red: [["bureaucracy", "Legacy process", "Synthetic supporting row.", "synthetic"]],
  }];

  return `
    <section>
      <div class="page-head">
        <div>
          <h1>Today</h1>
          <p class="lead">Your job search, in one place. New matches at the top, drafts below.</p>
        </div>
        <button class="primary-button" type="button">+ Add Job</button>
      </div>

      <div class="focus-card">
        <div class="focus-row">
          <div>
            <p class="eyebrow">Next move</p>
            <h2>Rank 2 new matches by fit</h2>
            <p class="lead">You have fresh jobs without full company research or scoring. Rank them first, then decide what deserves your time.</p>
          </div>
          <div class="detail-actions">
            <button class="primary-button" type="button" data-open-job="openai">Rank now</button>
            <button class="secondary-button" type="button" data-route="find">Find jobs</button>
          </div>
        </div>
        <div class="stat-grid">
          <div class="stat"><label>New</label><strong>3</strong></div>
          <div class="stat"><label>Unranked</label><strong>2</strong></div>
          <div class="stat"><label>Starred</label><strong>2</strong></div>
          <div class="stat"><label>Drafting</label><strong>1</strong></div>
        </div>
      </div>

      <div class="segmented">
        ${["open", "applied", "closed"].map((tab) => `<button type="button" data-today-tab="${tab}" class="${state.todayTab === tab ? "active" : ""}">${tab === "open" ? "Open" : tab === "applied" ? "Applied" : "Closed"}</button>`).join("")}
      </div>

      <div class="filters">
        <div class="filter-row"><span>Mode</span><button class="chip-button active">All</button><button class="chip-button">Remote</button><button class="chip-button">On-site</button><span>Sort</span><button class="chip-button">Newest</button><button class="chip-button active">Best fit</button><button class="chip-button">Starred</button></div>
        <div class="filter-row"><span>Status</span><button class="chip-button active">All</button><button class="chip-button">new</button><button class="chip-button">saved</button></div>
        <div class="filter-row"><span>Search</span><input class="search-input" value="AI workflow product" aria-label="Search" /></div>
      </div>

      <div class="job-list">
        ${rows.map((job, index) => renderJobRow(job, index)).join("")}
      </div>
    </section>
  `;
}

function renderJobRow(job, index) {
  const green = job.green?.slice(0, 2) ?? [];
  const red = job.red?.slice(0, 1) ?? [];
  return `
    <article class="job-row ${index === 0 ? "selected" : ""}" data-open-job="${job.company === "Northstar Systems" ? "openai" : job.company.toLowerCase()}">
      <div class="job-main">
        <div class="job-title-line">
          <h3>${job.role}</h3>
          <span class="score">${job.score}<span class="muted">/100</span></span>
          <span class="match">${job.match}%</span>
        </div>
        <div class="company-line"><span>${job.company}</span><span class="deadline">Apply by 18 Jun</span><span class="deadline">${job.location}</span></div>
        <div class="badge-row">
          ${green.map((flag) => `<span class="mini-badge green">${flag[1]} <span>${flag[3]}</span></span>`).join("")}
          ${red.map((flag) => `<span class="mini-badge red">${flag[1]} <span>${flag[3]}</span></span>`).join("")}
        </div>
      </div>
      <div class="job-side">
        <span class="status-pill">${job.status}</span>
        <span class="star">★</span>
      </div>
    </article>
  `;
}

function renderJobDetail() {
  const company = companies[state.selectedCompany];
  return `
    <section class="job-detail">
      <button class="back-link" type="button" data-back-today>← Back to Today</button>
      <div class="detail-top">
        <div class="page-head">
          <div>
            <h1>${company.role}</h1>
            <p class="detail-meta">${company.company} · ${company.location} · demo fit ${company.score}/100 · demo match ${company.match}%</p>
          </div>
          <span class="star">★</span>
        </div>
        <div class="detail-actions">
          <button class="primary-button" type="button" data-job-tab-direct="apply">Generate letters</button>
          <button class="secondary-button" type="button">Open posting</button>
          <button class="ghost-button" type="button">Delete</button>
        </div>
      </div>
      <div class="tab-bar">
        ${["overview", "apply", "company", "prep", "posting"].map((tab) => `<button type="button" data-job-tab="${tab}" class="${state.jobTab === tab ? "active" : ""}">${tab[0].toUpperCase() + tab.slice(1)}</button>`).join("")}
      </div>
      <div class="ai-strip">
        <button class="ai-action" type="button" data-job-tab-direct="company"><strong>↻ Re-research</strong><span>Refresh company intel, KPI signals and source notes.</span></button>
        <button class="ai-action" type="button" data-job-tab-direct="overview"><strong>✦ Analyze with AI</strong><span>Fit breakdown, CV gaps and what they really want.</span></button>
        <button class="ai-action" type="button" data-job-tab-direct="apply"><strong>Generate CV</strong><span>Create a tailored CV variant for this role.</span></button>
        <button class="ai-action" type="button" data-job-tab-direct="apply"><strong>Generate letters</strong><span>Draft multiple tone variants and application answers.</span></button>
      </div>
      ${state.jobTab === "company" ? renderCompany(company) : renderJobTab(company)}
    </section>
  `;
}

function renderCompany(company) {
  return `
    <div class="signal-row">
      ${company.green.map((f) => `<span class="signal-chip green" title="${f[2]}">${icons[f[0]] ?? ""}${f[1]}</span>`).join("")}
      ${company.red.map((f) => `<span class="signal-chip red" title="${f[2]}">${icons[f[0]] ?? ""}${f[1]}</span>`).join("")}
    </div>
    <p class="small-note">Verified demo snapshot: ${DATA_DATE}. Company-specific uncertain values are labeled as synthetic or inferred demo.</p>

    <div class="detail-actions" style="margin-bottom: 20px;">
      <button class="ghost-button" type="button">↻ Re-research company</button>
      <button class="ghost-button" type="button" data-company-select="openai">OpenAI</button>
      <button class="ghost-button" type="button" data-company-select="anthropic">Anthropic</button>
    </div>

    <div class="panel">
      <section class="panel-section">
        <p class="section-title">Summary</p>
        <p class="summary-text">${company.summary}</p>
        <div class="source-links">
          ${company.sources.map(([label, url]) => `<a href="${url}" target="_blank" rel="noreferrer">${label}</a>`).join("")}
          ${badge("public_source")}
          ${badge("synthetic")}
          ${badge("inferred_demo")}
        </div>
      </section>

      <section class="panel-section editable-grid">
        ${company.fields.map(([label, value, kind]) => `<div><span class="field-label">${label}</span><div class="fake-input">${value}</div>${badge(kind)}</div>`).join("")}
      </section>

      <section class="panel-section">
        <p class="section-title">Comp signal</p>
        <div class="three-grid">
          <div class="metric"><label>Monthly benchmark</label><strong>${company.comp.monthly}</strong>${badge("synthetic")}</div>
          <div class="metric"><label>Region</label><strong>${company.comp.region}</strong>${badge("synthetic")}</div>
          <div class="metric"><label>SSYK match</label><strong>${company.comp.ssyk}</strong>${badge("synthetic")}</div>
        </div>
        <div class="signal-row">
          <span class="signal-chip green">${icons.comp}${company.comp.comparison}</span>
          <span class="signal-chip">${company.comp.score ? `Score ${company.comp.score}` : "Unscored"}</span>
          <span class="signal-chip">Mapping ${company.comp.confidence}</span>
        </div>
        <p class="evidence-text">${company.comp.evidence}</p>
      </section>

      <section class="panel-section">
        <p class="section-title">Culture signals</p>
        <div class="signal-row">
          <span class="signal-chip">${icons.remote}<span class="muted">Remote</span> ${company.culture.remote}</span>
          <span class="signal-chip"><span class="muted">Stage</span> ${company.culture.stage}</span>
          <span class="signal-chip"><span class="muted">Culture</span> ${company.culture.type}</span>
          <span class="signal-chip">Confidence ${company.culture.confidence}</span>
        </div>
        <p class="evidence-text">${company.culture.evidence}</p>
      </section>

      <section class="panel-section">
        <p class="section-title">Financial KPIs</p>
        <div class="four-grid">
          ${company.kpis.map(([label, value, hint, kind, tone]) => `<div class="metric"><label>${label}</label><strong class="${tone}">${value}</strong><span class="muted">${hint}</span>${badge(kind)}</div>`).join("")}
        </div>
      </section>

      <section class="panel-section">
        <p class="section-title" style="color: var(--green);">Positive signals</p>
        <div class="flag-list">
          ${company.green.map((f) => renderFlagLine(f, "green")).join("")}
          <span class="muted">+ Add</span>
        </div>
      </section>

      <section class="panel-section">
        <p class="section-title" style="color: var(--red);">Warning signals</p>
        <div class="flag-list">
          ${company.red.map((f) => renderFlagLine(f, "red")).join("")}
          <span class="muted">+ Add</span>
        </div>
      </section>
    </div>
  `;
}

function renderFlagLine(flag, tone) {
  return `
    <div class="flag-line ${tone}">
      <span>${icons[flag[0]] ?? ""}</span>
      <span class="flag-label">${flag[1]}</span>
      <span class="flag-detail">${flag[2]}</span>
      <span>${badge(flag[3])}</span>
    </div>
  `;
}

function renderJobTab(company) {
  if (state.jobTab === "apply") {
    return `
      <div class="flow-cue">This is the deeper application workspace: generated CV variant, cover letter variants, application answers, and review controls. All personal details are synthetic.</div>
      <div class="mock-card">
        <span class="field-label">ATS Keywords · 4 matched · 2 missing</span>
        <div class="tag-row"><span class="mini-badge green">AI workflow</span><span class="mini-badge green">Product engineering</span><span class="mini-badge green">source quality</span><span class="mini-badge yellow">+ safety evals</span><span class="mini-badge yellow">+ launch operations</span></div>
      </div>
      <div class="asset-grid">
        ${renderCvPreview(company)}
        <div>
          <div class="mock-card">
            <span class="field-label">Tailored CV</span>
            <h3>CV - ${company.company} Product Engineer</h3>
            <p>Generated mock CV variant for this role. Synthetic candidate details, real UI shape.</p>
            <div class="detail-actions"><button class="primary-button">Regenerate</button><button class="ghost-button">PDF ↓</button><button class="ghost-button">DOCX ↓</button><button class="secondary-button">Refine ✦</button></div>
          </div>
          ${renderLetters(company)}
          ${renderAnswers(company)}
        </div>
      </div>
    `;
  }
  if (state.jobTab === "prep") {
    return `<div class="mock-card"><span class="field-label">Prep</span><h3>Interview and assessment prep</h3><p>Practice prompts, role-specific risk notes, company questions, and follow-up material.</p></div>`;
  }
  if (state.jobTab === "posting") {
    return `<div class="mock-card"><span class="field-label">Posting</span><h3>${company.role}</h3><p>Formatted job posting preview. Requirements, responsibilities and source URL would render here in the live app.</p></div>`;
  }
  return `
    <div class="mock-card"><span class="field-label">What they really want</span><p>Build product-quality AI workflows, keep users in control, and translate research capability into useful product surfaces.</p></div>
    <div class="mock-card"><span class="field-label">CV variant</span><h3>CV - AI Workflow Product Engineer</h3><p>Recommended existing variant with gaps surfaced before generation.</p></div>
    <div class="mock-card"><span class="field-label">Fit breakdown</span><div class="tag-row"><span class="mini-badge green">North star alignment 88</span><span class="mini-badge yellow">CV coverage 67</span><span class="mini-badge green">Product depth 84</span></div></div>
  `;
}

function renderCvPreview(company) {
  return `
    <article class="document-preview">
      <h3>Marcus Demo</h3>
      <p>AI-native product builder · Workflow automation · Product-quality research systems</p>
      <h4>Target role</h4>
      <p>${company.role} at ${company.company}</p>
      <h4>Profile</h4>
      <p>Builds reviewed AI workflow products that turn scattered context into prioritized, source-labeled decisions. Strong focus on privacy, product judgment, QA loops and recruiter-readable proof of work.</p>
      <h4>Selected evidence</h4>
      <ul>
        <li>Designed a career workflow product with discovery, company research, CV adaptation, apply support and feedback loops.</li>
        <li>Built static and live-verifiable product snapshots with public-source vs synthetic data labels.</li>
        <li>Created review loops where AI output is inspected, corrected and promoted into reusable product knowledge.</li>
      </ul>
      <h4>Role-matched skills</h4>
      <p>LLM workflow design · UX systems · research synthesis · product strategy · privacy-aware automation · Playwright verification</p>
      <p class="muted">Synthetic CV content for demo. No private CV data included.</p>
    </article>
  `;
}

function renderLetters(company) {
  const letter = `Dear ${company.company} team,\n\nI am interested in the ${company.role} role because it sits exactly where I have been doing my strongest work: turning AI capability into reviewed, usable workflow products.\n\nIn my recent job-agent work, I designed a career workflow system that connects discovery, company research, CV tailoring, application support and feedback into one product surface. The part I am most proud of is the research layer: public-source company evidence, explicit synthetic/inferred labels, KPI-style signals, and warning/positive chips that help a user decide what deserves attention.\n\nI would bring product judgment, practical implementation depth, and a strong bias toward systems that keep humans in control while making AI genuinely useful.\n\nBest,\nMarcus Demo`;
  return `
    <section class="letter-card">
      <div class="page-head" style="margin-bottom: 10px;">
        <div><span class="field-label">Cover Letters</span><h3>Results-Focused Draft</h3></div>
        <div class="detail-actions" style="margin-top: 0;"><button class="ghost-button">Copy</button><button class="ghost-button">Save snippet</button><button class="secondary-button">Regenerate</button></div>
      </div>
      <textarea aria-label="Generated cover letter">${letter}</textarea>
      <div class="tag-row"><span class="mini-badge green">risk low</span><span class="mini-badge green">source grounded</span><span class="mini-badge yellow">synthetic applicant text</span></div>
    </section>
    <section class="letter-card">
      <span class="field-label">Alternative tone</span>
      <h3>Human & Warm</h3>
      <p>I care about tools that help people think clearly under uncertainty. This role is interesting because it combines product execution with the discipline needed around powerful AI systems.</p>
      <div class="detail-actions"><button class="ghost-button">Expand</button><button class="secondary-button">Regenerate warm</button></div>
    </section>
  `;
}

function renderAnswers(company) {
  return `
    <section class="answer-card">
      <div class="page-head" style="margin-bottom: 10px;">
        <div><span class="field-label">Application Answers</span><h3>Generated screening answers</h3></div>
        <button class="primary-button">Generate answers</button>
      </div>
      <p class="summary-text"><span class="confidence-dot"></span>Confidence 82% · tone matched to Results-Focused Draft</p>
      <label class="field-label">Why ${company.company}?</label>
      <textarea>Because the work combines high-stakes AI product development with a need for careful workflow design. My strongest recent work has been building reviewable AI-assisted systems where research, UX, evidence quality and user control are treated as product requirements rather than afterthoughts.</textarea>
      <div class="detail-actions"><button class="secondary-button">Approve</button><button class="ghost-button">Reject</button><button class="ghost-button">Thumbs up</button><button class="ghost-button">Thumbs down</button></div>
    </section>
  `;
}

function renderFind() {
  return `
    <section class="discover-shell">
      <div class="page-head">
        <div>
          <h1>Discover</h1>
          <p class="lead">Configure how jobs are found and how they match your situation.</p>
        </div>
      </div>
      <div class="segmented">
        <button class="${state.discoverTab === "criteria" ? "active" : ""}" data-discover-tab="criteria">Search criteria</button>
        <button class="${state.discoverTab === "preferences" ? "active" : ""}" data-discover-tab="preferences">Preferences</button>
      </div>
      ${state.discoverTab === "criteria" ? renderCriteria() : renderPreferences()}
    </section>
  `;
}

function renderCriteria() {
  return `
    <p class="lead">Jobs are fetched automatically every 4 hours. You can also trigger a run manually.</p>
    <div class="mock-card"><span class="field-label">Keywords</span><div class="tag-row"><span class="tag">AI product engineer</span><span class="tag">workflow automation</span><span class="tag">LLM evaluation</span></div></div>
    <div class="mock-card"><span class="field-label">Locations</span><div class="tag-row"><span class="tag">Stockholm</span><span class="tag">Remote</span><span class="tag">London</span></div></div>
    <div class="mock-card"><span class="field-label">Sources</span><div class="source-grid"><label><input type="checkbox" checked /> Jobtech / Platsbanken</label><label><input type="checkbox" checked /> Ashby</label><label><input type="checkbox" checked /> Direct careers</label><label><input type="checkbox" /> Greenhouse</label><label><input type="checkbox" /> Lever</label></div></div>
    <div class="detail-actions"><button class="primary-button">Save criteria</button><button class="primary-button">Discover now</button></div>
    <div class="mock-card"><span class="field-label">Saved monitoring</span><h3>Frontier AI product roles</h3><p>AI workflow product, LLM evals · Stockholm, Remote · ashby, direct_careers · 4 new since last run</p><button class="primary-button">Run now</button></div>
  `;
}

function renderPreferences() {
  return `
    <div class="mock-card"><span class="field-label">Work mode</span><div class="tag-row"><span class="tag">remote</span><span class="tag">hybrid</span></div></div>
    <div class="mock-card"><span class="field-label">Commute</span><p>Home area and transport preferences are used for commute estimates in the job detail view.</p></div>
  `;
}

function renderSimple(title, intro, cardTitle, cardText) {
  return `
    <section class="simple-page">
      <div class="page-head"><div><h1>${title}</h1><p class="lead">${intro}</p></div></div>
      <div class="mock-card"><span class="field-label">Static snapshot</span><h3>${cardTitle}</h3><p>${cardText}</p>${badge("synthetic")}</div>
    </section>
  `;
}

function bindEvents() {
  document.querySelectorAll("[data-route]").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      setRoute(el.dataset.route);
    });
  });
  document.querySelectorAll("[data-today-tab]").forEach((el) => {
    el.addEventListener("click", () => {
      state.todayTab = el.dataset.todayTab;
      render();
    });
  });
  document.querySelectorAll("[data-open-job]").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.dataset.openJob;
      state.selectedCompany = id === "anthropic" ? "anthropic" : "openai";
      state.todayTab = "detail";
      state.jobTab = "company";
      render();
    });
  });
  document.querySelectorAll("[data-back-today]").forEach((el) => {
    el.addEventListener("click", () => {
      state.todayTab = "open";
      render();
    });
  });
  document.querySelectorAll("[data-job-tab]").forEach((el) => {
    el.addEventListener("click", () => {
      state.jobTab = el.dataset.jobTab;
      render();
    });
  });
  document.querySelectorAll("[data-job-tab-direct]").forEach((el) => {
    el.addEventListener("click", () => {
      state.jobTab = el.dataset.jobTabDirect;
      state.todayTab = "detail";
      render();
    });
  });
  document.querySelectorAll("[data-company-select]").forEach((el) => {
    el.addEventListener("click", () => {
      state.selectedCompany = el.dataset.companySelect;
      render();
    });
  });
  document.querySelectorAll("[data-discover-tab]").forEach((el) => {
    el.addEventListener("click", () => {
      state.discoverTab = el.dataset.discoverTab;
      render();
    });
  });
}

window.addEventListener("hashchange", () => {
  syncFromHash();
  render();
});

syncFromHash();
render();
