import type { ParticipantData } from '@/components/Demographics/ParticipationForm';
import api from './api';

export interface Participant extends ParticipantData {
  id: string;
}

export const createQuestionnaireResponse = (
  data: ParticipantData
): Promise<Participant> => {
  return api.post('/responses/new', data).then((response) => response.data);
};
