import api from './api';

export type Category = 'UX' | 'TE' | 'MX';
export type Severity = 'H' | 'M' | 'L';

export interface QuestionnaireItem {
  id: number;
  code: string;
  description: string;
  contribution: string;
  effort: number;
  category: Category;
  severity: Severity;
}

export interface Questionnaire {
  id: string;
  name: string;
  items: QuestionnaireItem[];
  avaible_effort: number;
  selectable_items: number;
}

export const getQuestionnaire = (): Promise<Questionnaire> =>
  api.get('/questionnaire').then((response) => response.data);
