export interface Problem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  sampleInput: string;
  sampleOutput: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}
