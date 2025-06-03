import type { ParticipantData } from '@/components/Demographics/ParticipationForm';
import api from './api';
import type {
  AgileExperience,
  Gender,
  ProjectType,
  Role,
  RoleExperience,
  SprintPlanningExperience,
} from '@/types/response';
import type { QuestionnaireItem } from './questionnaire';

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

interface QuestionnaireResponseItem {
  id: string;
  questionnaire_item: QuestionnaireItem;
}

export interface QuestionnaireResponse {
  id: string;
  created_at: string;
  age: number;
  gender: Gender;
  role: Role;
  role_experience: RoleExperience;
  agile_experience: AgileExperience;
  project_type: ProjectType;
  project_type_other?: string;
  sprint_planning_experience: SprintPlanningExperience;
  response_items: QuestionnaireResponseItem[];
}

export const getAllQuestionnaireResponses = (): Promise<
  QuestionnaireResponse[]
> => {
  return api.get('/questionnaire/responses').then((response) => response.data);
  // Placeholder for actual implementation
};
