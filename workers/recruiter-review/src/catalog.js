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
