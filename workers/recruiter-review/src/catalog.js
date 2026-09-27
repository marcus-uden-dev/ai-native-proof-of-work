import catalogueDocument from '../../../site/evidence/experience-fit-catalog.json' with { type: 'json' };

export const experienceFitCatalogue = catalogueDocument.records;

export const experienceFitDimensions = [
  { id: 'product-framing', label: 'Product framing' },
  { id: 'workflow-design', label: 'Workflow design' },
  { id: 'ai-native-execution', label: 'AI-native execution' },
  { id: 'evidence-synthesis', label: 'Evidence synthesis' },
  { id: 'operational-collaboration', label: 'Operational collaboration' },
  { id: 'technical-delivery', label: 'Technical delivery' },
  { id: 'business-prioritisation', label: 'Business prioritisation' }
];

export const experienceFitEvidenceHints = {
  'product-framing': ['cv-customer-journey', 'job-agent-decisions'],
  'workflow-design': ['cv-product-operations', 'cv-customer-journey', 'job-agent-decisions', 'recursive-workflow-controls'],
  'ai-native-execution': ['job-agent-decisions', 'recursive-workflow-controls', 'decision-log-traceability'],
  'evidence-synthesis': ['cv-customer-journey', 'decision-log-traceability', 'recursive-workflow-controls'],
  'operational-collaboration': ['cv-product-operations', 'cv-risk-controls', 'job-agent-decisions'],
  'technical-delivery': ['job-agent-decisions', 'recursive-workflow-controls'],
  'business-prioritisation': ['cv-customer-journey', 'job-agent-decisions', 'decision-log-traceability']
};

export const stableDirectEvidence = {
  'product-framing': ['job-agent-product-framing', 'cv-customer-journey', 'job-agent-decisions'],
  'workflow-design': ['ai-harness-workflow-design', 'recursive-workflow-controls', 'cv-product-operations'],
  'ai-native-execution': ['ai-native-workflow-execution', 'ai-harness-workflow-design', 'decision-log-traceability']
};

export const roleCapabilityTaxonomy = [
  {
    id: 'ai-workflow-automation',
    label: 'AI and workflow automation',
    tags: ['ai-native-workflows', 'automation-judgment', 'workflow-automation', 'context-engineering'],
    evidenceHints: ['ai-native-workflow-execution', 'ai-harness-workflow-design', 'decision-log-automation-judgment']
  },
  {
    id: 'systems-api-integration',
    label: 'Systems, APIs, and integrations',
    tags: ['systems-thinking', 'reusable-infrastructure', 'governance-architecture'],
    evidenceHints: ['cv-product-operations', 'job-agent-decisions', 'decision-log-governance-architecture']
  },
  {
    id: 'operational-service-design',
    label: 'Operational and service design',
    tags: ['stakeholder-understanding', 'decision-support', 'product-discovery'],
    evidenceHints: ['cv-product-operations', 'job-agent-product-framing', 'decision-log-stakeholder-understanding']
  },
  {
    id: 'research-experimentation',
    label: 'Research, measurement, and experimentation',
    tags: ['research-synthesis', 'validation', 'continuous-improvement', 'quality-assurance'],
    evidenceHints: ['cv-customer-journey', 'recursive-workflow-controls', 'decision-log-research-synthesis']
  },
  {
    id: 'risk-governance-controls',
    label: 'Risk, governance, and controls',
    tags: ['risk-awareness', 'risk-controls', 'governance-architecture', 'human-in-the-loop'],
    evidenceHints: ['cv-risk-controls', 'job-agent-product-framing', 'decision-log-governance-architecture']
  },
  {
    id: 'commercial-product-strategy',
    label: 'Commercial product strategy',
    tags: ['commercial-awareness', 'value-creation', 'product-judgment', 'prioritization'],
    evidenceHints: ['cv-customer-journey', 'job-agent-decisions', 'decision-log-commercial-strategy']
  }
];
