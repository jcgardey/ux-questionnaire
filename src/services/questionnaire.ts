import api from './api';

export type Category = 'UX' | 'TE' | 'MX';
export type Severity = 'H' | 'M' | 'L';

export interface QuestionnaireItem {
  code: string;
  description: string;
  contribution: string;
  effort: number;
  category: Category;
  severity: Severity;
}

export interface Questionnaire {
  name: string;
  items: QuestionnaireItem[];
}

export const getQuestionnaire = (): Promise<Questionnaire> =>
  api.get('/questionnaire').then((response) => response.data);
