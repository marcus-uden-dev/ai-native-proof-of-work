const VERIFIED_DATE = "2026-05-28";

const ICONS = {
  revenue_growth: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-7"/></svg>`,
  remote: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/></svg>`,
  product: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A4.5 4.5 0 0 1 12 6c1.5 2 4 3.5 4 7a4 4 0 0 1-7.5 1.5Z"/><path d="M12 6c0-2 1-3 2-4 1 2 2 4 2 6"/></svg>`,
  learning: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/></svg>`,
  culture: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3Z"/><path d="M8 11c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3Z"/><path d="M2 20c.6-3 2.6-5 6-5s5.4 2 6 5"/><path d="M10 20c.5-2.5 2.2-4 5-4 2.6 0 4.3 1.5 5 4"/></svg>`,
  research: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/><path d="M8 11h6"/><path d="M11 8v6"/></svg>`,
  long_hours: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
  bureaucracy: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14H4V6a2 2 0 0 1 2-2h2"/><path d="M8 12h8"/><path d="M8 16h5"/></svg>`,
  uncertainty: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>`,
  comp: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 9v.01"/><path d="M18 15v.01"/></svg>`,
  stability: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M6 21V8l6-4 6 4v13"/><path d="M9 21v-7h6v7"/></svg>`,
};

const DATA_LABELS = {
  public_source: "public source",
  synthetic: "synthetic demo",
  inferred_demo: "inferred demo",
  mixed: "mixed",
};

const MANIFEST = [
  {
    project: "job-agent",
    snapshot_id: "job-agent-clickable-company-research",
    title: "Job-agent clickable demo with company research KPI cards",
    audience: "external",
    status: "recruiter-safe",
    date: VERIFIED_DATE,
    commit: "current-worktree",
    branch: "main",
    data_class: "mixed",
    source_urls: [
      "https://openai.com/about/",
      "https://openai.com/jobs/",
      "https://www.anthropic.com/company",
      "https://www.anthropic.com/careers",
    ],
    change_summary:
      "Clickable static mock of job-agent with jobs, discovery, company research, apply/CV, feedback, and privacy flows.",
    why:
      "Company research shows product depth: public sources, demo-only KPI signals, and reviewable decision support.",
    rollback_note:
      "Use this as the baseline if later research UI becomes visually noisy or loses source labeling.",
    screenshot_path: "../assets/screenshots/job-agent-03-company-research-icons.png",
    demo_path: "index.html#job-agent",
  },
  {
    project: "pkm",
    snapshot_id: "pkm-clickable-knowledge-feed",
    title: "PKM knowledge feed mock",
    audience: "external",
    status: "recruiter-safe",
    date: VERIFIED_DATE,
    commit: "current-worktree",
    branch: "main",
    data_class: "synthetic",
    source_urls: [],
    change_summary:
      "Static clickable knowledge-feed and source-capture surface.",
    why:
      "Shows supporting proof around ingestion, source quality, tagging, and retrieval workflows.",
    rollback_note:
      "Keep as a lightweight supporting proof point; do not let it overshadow job-agent.",
    screenshot_path: "../assets/screenshots/pkm-01-knowledge-feed.png",
    demo_path: "index.html#pkm",
  },
  {
    project: "household-budget",
    snapshot_id: "household-budget-clickable-dashboard",
    title: "Household budget dashboard mock",
    audience: "external",
    status: "recruiter-safe",
    date: VERIFIED_DATE,
    commit: "current-worktree",
    branch: "main",
    data_class: "synthetic",
    source_urls: [],
    change_summary:
      "Static clickable dashboard with liquidity, budget, import review, and household-scope panels.",
    why:
      "Shows supporting proof around financial domain modeling and household/shared-account state.",
    rollback_note:
      "Use as the baseline sample-data demo for future budget-app screenshots.",
    screenshot_path: "../assets/screenshots/household-budget-01-dashboard.png",
    demo_path: "index.html#household-budget",
  },
];

const STATE = {
  audience: "external",
  route: "overview",
  jobFlow: "company",
  selectedCompany: "openai",
  selectedJob: 1,
  pkmTab: "feed",
  budgetTab: "dashboard",
};

const JOBS = [
  {
    id: 1,
    role: "AI Workflow Product Engineer",
    companyId: "openai",
    company: "OpenAI",
    location: "San Francisco / Remote-friendly research context",
    status: "saved",
    overall: 86,
    match: 91,
    tags: ["research + deployment", "product systems", "high agency"],
  },
  {
    id: 2,
    role: "Cross-functional Prompt Engineer",
    companyId: "anthropic",
    company: "Anthropic",
    location: "San Francisco / New York / Remote-friendly roles",
    status: "research",
    overall: 82,
    match: 88,
    tags: ["Claude behavior", "safety", "product consistency"],
  },
  {
    id: 3,
    role: "Automation Strategist",
    companyId: "synthetic",
    company: "Northstar Systems",
    location: "Stockholm / Hybrid",
    status: "new",
    overall: 74,
    match: 80,
    tags: ["synthetic", "workflow ops", "demo-only"],
  },
];

const COMPANIES = {
  openai: {
    name: "OpenAI",
    role: "AI Workflow Product Engineer",
    sourceLabel: "Official OpenAI pages",
    summary:
      "OpenAI is presented publicly as an AI research and deployment company with a mission focused on ensuring that AGI benefits all of humanity. In this demo, public-source facts anchor the company story while compensation, fit scores, and KPI cards remain synthetic demo values.",
    verified: VERIFIED_DATE,
    fields: [
      {
        label: "Public mission",
        value: "AGI benefits all of humanity",
        dataClass: "public_source",
      },
      {
        label: "Company type",
        value: "AI research and deployment",
        dataClass: "public_source",
      },
      {
        label: "Demo salary",
        value: "Synthetic benchmark only",
        dataClass: "synthetic",
      },
    ],
    positive: [
      {
        icon: "research",
        label: "Research + deployment",
        detail: "Official company positioning links research and deployment.",
        dataClass: "public_source",
      },
      {
        icon: "learning",
        label: "Learning support",
        detail: "Careers page mentions learning and development support.",
        dataClass: "public_source",
      },
      {
        icon: "product",
        label: "Product impact",
        detail: "Careers copy describes products that can transform how people live and work.",
        dataClass: "public_source",
      },
      {
        icon: "remote",
        label: "Workflow fit",
        detail: "Demo inference: strong fit for AI-native workflow/product proof.",
        dataClass: "inferred_demo",
      },
    ],
    warnings: [
      {
        icon: "long_hours",
        label: "Intensity risk",
        detail: "Demo-only warning based on high-intensity frontier AI work category.",
        dataClass: "inferred_demo",
      },
      {
        icon: "bureaucracy",
        label: "Complex governance",
        detail: "Synthetic demo warning: safety, policy, and deployment constraints can slow decisions.",
        dataClass: "synthetic",
      },
    ],
    compensation: {
      monthly: "88,000 SEK",
      region: "San Francisco-equivalent demo",
      roleMatch: "AI product / systems",
      comparison: "above market",
      score: 84,
      confidence: "demo",
      evidence:
        "Synthetic compensation benchmark. It is included to show the UI shape, not as an OpenAI salary claim.",
      dataClass: "synthetic",
    },
    culture: [
      { label: "Stage", value: "Frontier AI", dataClass: "inferred_demo" },
      { label: "Culture", value: "Mission-led", dataClass: "public_source" },
      { label: "Mode", value: "Research/product", dataClass: "public_source" },
    ],
    kpis: [
      { label: "Operating margin", value: "+12%", hint: "demo-only", trend: "up", dataClass: "synthetic" },
      { label: "Profit / employee", value: "N/A", hint: "not public here", trend: "flat", dataClass: "synthetic" },
      { label: "Revenue / employee", value: "N/A", hint: "not public here", trend: "flat", dataClass: "synthetic" },
      { label: "Company age", value: "demo", hint: "avoid unsourced claim", trend: "flat", dataClass: "synthetic" },
    ],
    sources: [
      {
        label: "OpenAI About",
        url: "https://openai.com/about/",
        dataClass: "public_source",
      },
      {
        label: "OpenAI Careers / Jobs",
        url: "https://openai.com/jobs/",
        dataClass: "public_source",
      },
    ],
  },
  anthropic: {
    name: "Anthropic",
    role: "Cross-functional Prompt Engineer",
    sourceLabel: "Official Anthropic career pages",
    summary:
      "Anthropic publicly describes its mission as creating reliable, interpretable, and steerable AI systems that are safe and beneficial. This demo uses that public framing for company research while keeping KPI cards, compensation, and warning signals explicitly synthetic or inferred.",
    verified: VERIFIED_DATE,
    fields: [
      {
        label: "Public mission",
        value: "Reliable, interpretable, steerable AI systems",
        dataClass: "public_source",
      },
      {
        label: "Product surface",
        value: "Claude, Claude Code, products",
        dataClass: "public_source",
      },
      {
        label: "Demo salary",
        value: "Synthetic benchmark only",
        dataClass: "synthetic",
      },
    ],
    positive: [
      {
        icon: "research",
        label: "Interpretability focus",
        detail: "Public careers text frames interpretability as a core research bet.",
        dataClass: "public_source",
      },
      {
        icon: "stability",
        label: "Safety mission",
        detail: "Official mission emphasizes safe and beneficial AI systems.",
        dataClass: "public_source",
      },
      {
        icon: "product",
        label: "Claude product surface",
        detail: "Role copy references Claude across products including claude.ai and Claude Code.",
        dataClass: "public_source",
      },
      {
        icon: "culture",
        label: "Cross-functional work",
        detail: "Demo inference: research, policy, engineering, and business collaboration.",
        dataClass: "inferred_demo",
      },
    ],
    warnings: [
      {
        icon: "uncertainty",
        label: "Research ambiguity",
        detail: "Demo-only warning: evaluation quality can be hard to measure.",
        dataClass: "inferred_demo",
      },
      {
        icon: "long_hours",
        label: "Frontier pressure",
        detail: "Synthetic demo warning for high-stakes frontier AI product work.",
        dataClass: "synthetic",
      },
    ],
    compensation: {
      monthly: "86,000 SEK",
      region: "US frontier AI demo",
      roleMatch: "AI research/product",
      comparison: "above market",
      score: 82,
      confidence: "demo",
      evidence:
        "Synthetic compensation benchmark. It is included to show the UI shape, not as an Anthropic salary claim.",
      dataClass: "synthetic",
    },
    culture: [
      { label: "Stage", value: "Frontier AI", dataClass: "inferred_demo" },
      { label: "Culture", value: "Safety-led", dataClass: "public_source" },
      { label: "Mode", value: "Research/product", dataClass: "public_source" },
    ],
    kpis: [
      { label: "Operating margin", value: "+9%", hint: "demo-only", trend: "up", dataClass: "synthetic" },
      { label: "Profit / employee", value: "N/A", hint: "not public here", trend: "flat", dataClass: "synthetic" },
      { label: "Revenue / employee", value: "N/A", hint: "not public here", trend: "flat", dataClass: "synthetic" },
      { label: "Company age", value: "demo", hint: "avoid unsourced claim", trend: "flat", dataClass: "synthetic" },
    ],
    sources: [
      {
        label: "Anthropic Research Manager careers page",
        url: "https://www.anthropic.com/company",
        dataClass: "public_source",
      },
      {
        label: "Anthropic Prompt Engineer careers page",
        url: "https://www.anthropic.com/careers",
        dataClass: "public_source",
      },
    ],
  },
};

const PKM_ITEMS = [
  {
    title: "Designing durable AI workflow memory",
    type: "article",
    summary:
      "A synthetic saved source about turning scattered project context into reviewed, retrievable knowledge.",
    tags: ["AI workflows", "source quality", "memory"],
  },
  {
    title: "Evaluation loops for product research agents",
    type: "paper",
    summary:
      "A synthetic source summary about ranking sources, preserving evidence, and promoting reviewed insights.",
    tags: ["evaluation", "research", "agents"],
  },
  {
    title: "From saved links to reusable product decisions",
    type: "note",
    summary:
      "A synthetic example of turning a raw link into a decision-quality product note.",
    tags: ["product", "decisions", "PKM"],
  },
];

const BUDGET_ITEMS = {
  dashboard: [
    ["Opening balance", "42,500 SEK"],
    ["Lowest next 90d", "-9,800 SEK"],
    ["Tracked accounts", "3"],
    ["Active goals", "2"],
  ],
  budget: [
    ["Planned recurring", "21,090 SEK"],
    ["Actual imported", "29,960 SEK"],
    ["Budget gap", "-8,870 SEK"],
    ["After goal reserve", "-18,670 SEK"],
  ],
  imports: [
    ["Queued imports", "2"],
    ["Needs review", "14 rows"],
    ["Suggested rules", "5"],
    ["Duplicate checks", "Passed"],
  ],
};

function badge(dataClass) {
  return `<span class="data-badge ${dataClass}">${DATA_LABELS[dataClass] ?? dataClass}</span>`;
}

function setRoute(route) {
  STATE.route = route;
  document.querySelectorAll("[data-route]").forEach((item) => {
    item.classList.toggle("active", item.dataset.route === route);
  });
  window.location.hash = route;
  render();
}

function filteredManifest() {
  return MANIFEST.filter((item) => (
    STATE.audience === "all" || (item.audience === "external" && item.status === "recruiter-safe")
  ));
}

function render() {
  const root = document.getElementById("view-root");
  if (STATE.route === "job-agent") root.innerHTML = renderJobAgent();
  else if (STATE.route === "pkm") root.innerHTML = renderPkm();
  else if (STATE.route === "household-budget") root.innerHTML = renderBudget();
  else if (STATE.route === "timeline") root.innerHTML = renderTimeline();
  else root.innerHTML = renderOverview();
  bindDynamicEvents(root);
}

function renderOverview() {
  return `
    <section class="section">
      <p class="eyebrow">Gallery</p>
      <h2>Recruiter-safe project demos</h2>
      <p class="section-intro">
        These static demos use mocked data and public-source labels. They are designed
        to run without install steps, servers, credentials, or product backends.
      </p>
      <div class="grid cols-3">
        ${filteredManifest().map(renderSnapshotCard).join("")}
      </div>
    </section>
    <section class="section">
      <p class="eyebrow">Data policy</p>
      <div class="grid cols-3">
        <div class="card"><h3>Public source</h3><p>Official public company information with source URLs and verification date.</p>${badge("public_source")}</div>
        <div class="card"><h3>Synthetic</h3><p>Demo-only values used to show UI shape without claiming real company or user facts.</p>${badge("synthetic")}</div>
        <div class="card"><h3>Inferred demo</h3><p>Reasonable demo interpretation, clearly marked so it is not confused with verified fact.</p>${badge("inferred_demo")}</div>
      </div>
    </section>
  `;
}

function renderSnapshotCard(item) {
  return `
    <article class="card clickable" data-open-route="${item.project}">
      <div class="chips">
        ${badge(item.data_class === "mixed" ? "inferred_demo" : item.data_class)}
        <span class="badge">${item.status}</span>
      </div>
      <h3>${item.title}</h3>
      <p>${item.why}</p>
      <p class="field-note">Date: ${item.date} · Branch: ${item.branch}</p>
      <div class="actions">
        <button class="button small primary" type="button">Open demo</button>
      </div>
    </article>
  `;
}

function renderJobAgent() {
  const flows = [
    ["jobs", "Jobs dashboard"],
    ["discovery", "Discovery"],
    ["company", "Company research"],
    ["apply", "Apply / CV"],
    ["feedback", "Feedback"],
    ["privacy", "Privacy"],
  ];
  return `
    <section class="demo-frame">
      <div class="demo-topbar">
        <div>
          <p class="eyebrow">Lead proof point</p>
          <h2>Job-agent clickable mock</h2>
        </div>
        <div class="chips">
          ${badge("public_source")}
          ${badge("synthetic")}
          ${badge("inferred_demo")}
        </div>
      </div>
      <div class="demo-body">
        <div class="flow-nav">
          ${flows.map(([id, label]) => `<button type="button" data-job-flow="${id}" class="${STATE.jobFlow === id ? "active" : ""}">${label}</button>`).join("")}
        </div>
        <div class="flow-content">${renderJobFlow()}</div>
      </div>
    </section>
  `;
}

function renderJobFlow() {
  if (STATE.jobFlow === "discovery") return renderDiscovery();
  if (STATE.jobFlow === "company") return renderCompanyResearch();
  if (STATE.jobFlow === "apply") return renderApply();
  if (STATE.jobFlow === "feedback") return renderFeedback();
  if (STATE.jobFlow === "privacy") return renderPrivacy();
  return renderJobsDashboard();
}

function renderJobsDashboard() {
  return `
    <p class="eyebrow">Jobs</p>
    <h2>Reviewed opportunities</h2>
    <p class="section-intro">A candidate can scan ranked opportunities, inspect source-backed company research, and keep application state reviewable.</p>
    <div class="toolbar">
      <button class="button small primary" type="button" data-job-flow="discovery">Run discovery</button>
      <button class="button small" type="button" data-job-flow="company">Open company research</button>
    </div>
    <div class="jobs-list" style="margin-top:16px">
      ${JOBS.map((job) => `
        <div class="job-row" data-select-job="${job.id}" data-job-flow="company">
          <div>
            <h3>${job.role}</h3>
            <p>${job.company} · ${job.location}</p>
            <div class="chips">${job.tags.map((tag) => `<span class="badge">${tag}</span>`).join("")}</div>
          </div>
          <div class="chips">
            <span class="score">${job.overall}/100</span>
            <span class="badge">${job.match}% match</span>
            <span class="badge">${job.status}</span>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderDiscovery() {
  return `
    <p class="eyebrow">Discovery</p>
    <h2>Search criteria and monitors</h2>
    <p class="section-intro">A mock of the discovery workflow: keywords, sources, company monitors, and saved searches.</p>
    <div class="grid cols-2">
      <div class="card">
        <h3>Criteria</h3>
        <div class="field-row">
          <span class="badge">AI workflow</span>
          <span class="badge">product operations</span>
          <span class="badge">safety systems</span>
          <span class="badge">Stockholm / Remote</span>
        </div>
        <p class="field-note">Expanded search terms and source rankings are synthetic demo behavior.</p>
        ${badge("synthetic")}
      </div>
      <div class="card">
        <h3>Saved monitoring</h3>
        <p>AI workflow companies · daily cadence · 4 new roles in last synthetic run.</p>
        <div class="actions">
          <button class="button small primary" type="button">Run now</button>
          <button class="button small" type="button" data-job-flow="jobs">View results</button>
        </div>
      </div>
    </div>
  `;
}

function renderCompanyResearch() {
  const company = COMPANIES[STATE.selectedCompany];
  return `
    <div class="company-selector" aria-label="Company selector">
      ${Object.entries(COMPANIES).map(([id, item]) => `
        <button type="button" data-company="${id}" class="${STATE.selectedCompany === id ? "active" : ""}">
          ${item.name}
        </button>
      `).join("")}
    </div>
    <p class="eyebrow">Company research</p>
    <h2>${company.name} · ${company.role}</h2>
    <p class="section-intro">
      ${company.summary}
    </p>
    <div class="chips" style="margin-bottom:16px">
      <span class="badge">Verified: ${company.verified}</span>
      <span class="badge">${company.sourceLabel}</span>
      ${badge("public_source")}
      ${badge("synthetic")}
      ${badge("inferred_demo")}
    </div>

    <div class="chips" style="margin-bottom:12px">
      ${company.positive.map((flag) => renderSignalChip(flag, "green")).join("")}
      ${company.warnings.map((flag) => renderSignalChip(flag, "red")).join("")}
    </div>

    <div class="research-panel">
      <div class="research-section">
        <p class="eyebrow">Summary fields</p>
        <div class="field-grid three">
          ${company.fields.map((field) => `
            <div class="metric">
              <label>${field.label}</label>
              <strong>${field.value}</strong>
              ${badge(field.dataClass)}
            </div>
          `).join("")}
        </div>
      </div>

      <div class="research-section">
        <p class="eyebrow">Comp signal</p>
        <div class="field-grid three">
          <div class="metric"><label>Monthly benchmark</label><strong>${company.compensation.monthly}</strong>${badge(company.compensation.dataClass)}</div>
          <div class="metric"><label>Region</label><strong>${company.compensation.region}</strong>${badge(company.compensation.dataClass)}</div>
          <div class="metric"><label>Role match</label><strong>${company.compensation.roleMatch}</strong>${badge(company.compensation.dataClass)}</div>
        </div>
        <div class="chips" style="margin-top:12px">
          <span class="signal-chip green">${ICONS.comp}${company.compensation.comparison}</span>
          <span class="badge">Score ${company.compensation.score}</span>
          <span class="badge">Confidence ${company.compensation.confidence}</span>
        </div>
        <p class="field-note">${company.compensation.evidence}</p>
      </div>

      <div class="research-section">
        <p class="eyebrow">Culture signals</p>
        <div class="chips">
          ${company.culture.map((item) => `<span class="signal-chip green">${item.label}: ${item.value} ${badge(item.dataClass)}</span>`).join("")}
        </div>
      </div>

      <div class="research-section">
        <p class="eyebrow">Financial KPI cards</p>
        <div class="kpi-grid">
          ${company.kpis.map((kpi) => `
            <div class="metric">
              <label>${kpi.label}</label>
              <strong>${kpi.trend === "up" ? "▲ " : ""}${kpi.value}</strong>
              <p class="trend">${kpi.hint}</p>
              ${badge(kpi.dataClass)}
            </div>
          `).join("")}
        </div>
      </div>

      <div class="research-section">
        <div class="grid cols-2">
          <div>
            <p class="eyebrow">Positive signals</p>
            <div class="flag-list">${company.positive.map((flag) => renderFlagRow(flag, "green")).join("")}</div>
          </div>
          <div>
            <p class="eyebrow">Warning signals</p>
            <div class="flag-list">${company.warnings.map((flag) => renderFlagRow(flag, "red")).join("")}</div>
          </div>
        </div>
      </div>

      <div class="research-section">
        <p class="eyebrow">Sources</p>
        <div class="source-list">
          ${company.sources.map((source) => `
            <a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.label}</a>
            <span>${badge(source.dataClass)} <span class="field-note">Verified ${company.verified}</span></span>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderSignalChip(flag, color) {
  return `<span class="signal-chip ${color}" title="${flag.detail}">${ICONS[flag.icon] ?? ""}${flag.label}</span>`;
}

function renderFlagRow(flag, color) {
  return `
    <div class="flag-row">
      <span class="signal-chip ${color}" aria-hidden="true">${ICONS[flag.icon] ?? ""}</span>
      <strong>${flag.label}</strong>
      <span class="field-note">${flag.detail}</span>
      ${badge(flag.dataClass)}
    </div>
  `;
}

function renderApply() {
  return `
    <p class="eyebrow">Apply / CV assistant</p>
    <h2>Review before sending</h2>
    <div class="grid cols-2">
      <div class="card">
        <h3>Recommended CV variant</h3>
        <p>Product systems CV · emphasizes workflow automation, evidence packaging, and safety-minded product work.</p>
        <div class="chips"><span class="score">84/100</span>${badge("synthetic")}</div>
      </div>
      <div class="card">
        <h3>Application answer draft</h3>
        <textarea class="mock-textarea">I build reviewed AI-assisted workflows that turn messy operational context into concrete product decisions...</textarea>
        <div class="actions"><button class="button small primary" type="button">Copy draft</button><button class="button small" type="button">Save as snippet</button></div>
      </div>
    </div>
  `;
}

function renderFeedback() {
  return `
    <p class="eyebrow">Feedback loop</p>
    <h2>Capture product and AI-output feedback</h2>
    <div class="grid cols-3">
      <div class="card"><h3>Helpful?</h3><p>Rate generated content without treating it as automatically correct.</p><div class="actions"><button class="button small">Good</button><button class="button small">Needs work</button></div></div>
      <div class="card"><h3>Correction reason</h3><p>Track whether the issue is tone, missing evidence, weak fit, or source quality.</p>${badge("synthetic")}</div>
      <div class="card"><h3>Next action</h3><p>Promote useful snippets into the next generation pass.</p>${badge("inferred_demo")}</div>
    </div>
  `;
}

function renderPrivacy() {
  return `
    <p class="eyebrow">Privacy / settings</p>
    <h2>Trust surfaces</h2>
    <div class="grid cols-2">
      <div class="card"><h3>Consent choices</h3><p>Necessary only, analytics, personalization, and training are represented as explicit choices.</p>${badge("synthetic")}</div>
      <div class="card"><h3>Data rights</h3><p>Export and delete requests are modeled as reviewable, auditable actions rather than hidden automation.</p>${badge("inferred_demo")}</div>
    </div>
  `;
}

function renderPkm() {
  return `
    <section class="demo-frame">
      <div class="demo-topbar">
        <div><p class="eyebrow">Supporting proof point</p><h2>PKM clickable mock</h2></div>
        ${badge("synthetic")}
      </div>
      <div class="flow-content">
        <div class="tabs">
          ${["feed", "search", "capture"].map((tab) => `<button type="button" data-pkm-tab="${tab}" class="${STATE.pkmTab === tab ? "active" : ""}">${tab}</button>`).join("")}
        </div>
        ${renderPkmTab()}
      </div>
    </section>
  `;
}

function renderPkmTab() {
  if (STATE.pkmTab === "search") {
    return `<h2>Search</h2><div class="toolbar"><input class="mock-input" value="AI workflow memory" aria-label="Search query" /><button class="button primary">Search</button></div><div class="grid" style="margin-top:16px">${PKM_ITEMS.slice(0, 2).map(renderPkmCard).join("")}</div>`;
  }
  if (STATE.pkmTab === "capture") {
    return `<h2>Source capture</h2><div class="card"><input class="mock-input" value="https://example.invalid/source-quality" /><textarea class="mock-textarea">Why this matters: source quality checks prevent the portfolio from becoming a hype archive.</textarea><div class="actions"><button class="button primary">Save source</button><button class="button">Generate tags</button></div></div>`;
  }
  return `<h2>Knowledge feed</h2><div class="grid">${PKM_ITEMS.map(renderPkmCard).join("")}</div>`;
}

function renderPkmCard(item) {
  return `<article class="card"><div class="chips"><span class="badge">${item.type}</span>${badge("synthetic")}</div><h3>${item.title}</h3><p>${item.summary}</p><div class="chips">${item.tags.map((tag) => `<span class="badge">${tag}</span>`).join("")}</div></article>`;
}

function renderBudget() {
  return `
    <section class="demo-frame">
      <div class="demo-topbar">
        <div><p class="eyebrow">Supporting proof point</p><h2>Household budget clickable mock</h2></div>
        ${badge("synthetic")}
      </div>
      <div class="flow-content">
        <div class="tabs">
          ${["dashboard", "budget", "imports", "household"].map((tab) => `<button type="button" data-budget-tab="${tab}" class="${STATE.budgetTab === tab ? "active" : ""}">${tab}</button>`).join("")}
        </div>
        ${renderBudgetTab()}
      </div>
    </section>
  `;
}

function renderBudgetTab() {
  if (STATE.budgetTab === "household") {
    return `<h2>Household scope</h2><div class="grid cols-3"><div class="card"><h3>Visible households</h3><p>1 synthetic household</p></div><div class="card"><h3>Membership rows</h3><p>2 members</p></div><div class="card"><h3>Ownership state</h3><p>3 shared account owner rows</p></div></div>`;
  }
  const items = BUDGET_ITEMS[STATE.budgetTab] ?? BUDGET_ITEMS.dashboard;
  return `
    <h2>${STATE.budgetTab === "imports" ? "Import review" : STATE.budgetTab === "budget" ? "Budget snapshot" : "Liquidity dashboard"}</h2>
    <div class="kpi-grid">${items.map(([label, value]) => `<div class="metric"><label>${label}</label><strong>${value}</strong>${badge("synthetic")}</div>`).join("")}</div>
    <div class="card" style="margin-top:16px">
      <h3>Reviewable model</h3>
      <p>Sample data shows the UI shape without exposing real household finances, accounts, imports, or private transactions.</p>
    </div>
  `;
}

function renderTimeline() {
  return `
    <section class="section">
      <p class="eyebrow">Design evolution</p>
      <h2>Snapshot timeline</h2>
      <p class="section-intro">This timeline is the base layer for a later animated design-evolution slideshow.</p>
      <div class="timeline">
        ${filteredManifest().map((item) => `
          <article class="timeline-item">
            <div>
              <p class="eyebrow">${item.date}</p>
              <span class="badge">${item.project}</span>
            </div>
            <div>
              <h3>${item.title}</h3>
              <p>${item.change_summary}</p>
              <p><strong>Why:</strong> ${item.why}</p>
              <p><strong>Rollback note:</strong> ${item.rollback_note}</p>
              <div class="chips">${badge(item.data_class === "mixed" ? "inferred_demo" : item.data_class)}<span class="badge">${item.branch}</span></div>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function bindDynamicEvents(root) {
  root.querySelectorAll("[data-open-route]").forEach((button) => {
    button.addEventListener("click", () => setRoute(button.dataset.openRoute));
  });
  root.querySelectorAll("[data-job-flow]").forEach((button) => {
    button.addEventListener("click", () => {
      STATE.jobFlow = button.dataset.jobFlow;
      render();
    });
  });
  root.querySelectorAll("[data-select-job]").forEach((row) => {
    row.addEventListener("click", () => {
      const job = JOBS.find((item) => item.id === Number(row.dataset.selectJob));
      STATE.selectedJob = job?.id ?? STATE.selectedJob;
      if (job?.companyId === "openai" || job?.companyId === "anthropic") {
        STATE.selectedCompany = job.companyId;
      }
      STATE.jobFlow = row.dataset.jobFlow ?? "company";
      render();
    });
  });
  root.querySelectorAll("[data-company]").forEach((button) => {
    button.addEventListener("click", () => {
      STATE.selectedCompany = button.dataset.company;
      render();
    });
  });
  root.querySelectorAll("[data-pkm-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      STATE.pkmTab = button.dataset.pkmTab;
      render();
    });
  });
  root.querySelectorAll("[data-budget-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      STATE.budgetTab = button.dataset.budgetTab;
      render();
    });
  });
}

function init() {
  document.querySelectorAll("[data-route]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setRoute(link.dataset.route);
    });
  });
  document.querySelectorAll("[data-audience]").forEach((button) => {
    button.addEventListener("click", () => {
      STATE.audience = button.dataset.audience;
      document.querySelectorAll("[data-audience]").forEach((item) => {
        item.classList.toggle("active", item.dataset.audience === STATE.audience);
      });
      render();
    });
  });
  syncRouteFromHash();
  render();
}

function syncRouteFromHash() {
  const route = window.location.hash.replace("#", "") || "overview";
  STATE.route = ["overview", "job-agent", "pkm", "household-budget", "timeline"].includes(route)
    ? route
    : "overview";
  document.querySelectorAll("[data-route]").forEach((item) => {
    item.classList.toggle("active", item.dataset.route === STATE.route);
  });
}

window.addEventListener("hashchange", () => {
  syncRouteFromHash();
  render();
});

init();
