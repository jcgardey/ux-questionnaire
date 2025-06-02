import type { ParticipantData } from '@/components/Demographics/ParticipationForm';
import api from './api';

export interface Participant extends ParticipantData {
  id: string;
}

interface CreateQuestionnaireResponseData {
  participant: ParticipantData;
  questionnaireId: string;
}

export const createQuestionnaireResponse = (
  data: CreateQuestionnaireResponseData
): Promise<Participant> => {
  return api
    .post(
      `/responses/questionnaire/${data.questionnaireId}/new`,
      data.participant
    )
    .then((response) => response.data);
};

interface AddItemsData {
  participantId: string;
  items: number[];
}

export const addItemsToQuestionnaireResponse = (
  data: AddItemsData
): Promise<void> => {
  return api
    .put(`/responses/${data.participantId}/add-items`, { items: data.items })
    .then((response) => response.data);
};
