import {
  ParticipantForm,
  type ParticipantData,
} from '@/components/Demographics/ParticipationForm';
import { Title } from '@/components/Title';
import type { Questionnaire } from '@/services/questionnaire';
import { createQuestionnaireResponse } from '@/services/responses';
import { useNavigate } from 'react-router';

export const DemographicsPage = () => {
  let navigate = useNavigate();

  const questionnaire = JSON.parse(
    localStorage.getItem('questionnaire') || 'null'
  ) as Questionnaire | null;

  if (!questionnaire) {
    navigate('/welcome');
    return null;
  }

  const handleSubmit = (data: ParticipantData) => {
    createQuestionnaireResponse({
      questionnaireId: questionnaire.id,
      participant: data,
    }).then((participant) => {
      localStorage.setItem('participantId', participant.id);
      navigate('/priorization');
    });
  };

  return (
    <div>
      <Title variant="h2" text="Datos Demográficos" />
      <p className="my-4">
        Te pedimos algo de información sobre vos y tu trabajo que nos ayudará a
        analizar mejor todas las respuestas y sacar mejores conclusiones. No
        recopilamos datos que no sean los que vos indicás en las respuestas.
      </p>
      <div className="my-4 w-1/2">
        <ParticipantForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};
