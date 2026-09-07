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
