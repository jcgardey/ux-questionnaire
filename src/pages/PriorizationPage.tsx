import { PriorizationItem } from '@/components/Priorization/PriorizationItem';
import { Title } from '@/components/Title';
import { Button } from '@/components/ui/button';
import {
  type Questionnaire,
  type QuestionnaireItem,
} from '@/services/questionnaire';
import { addItemsToQuestionnaireResponse } from '@/services/responses';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const PriorizationPage = () => {
  const questionnaire = JSON.parse(
    localStorage.getItem('questionnaire') || 'null'
  ) as Questionnaire | null;
  const [selectedItems, setSelectedItems] = useState<QuestionnaireItem[]>([]);

  const navigate = useNavigate();
  const participantId = localStorage.getItem('participantId');

  if (!participantId || !questionnaire) {
    navigate('/welcome');
    return;
  }

  const handleItemClick = (item: QuestionnaireItem, selected: boolean) => {
    if (!selected) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItemsToQuestionnaireResponse({
      participantId: participantId as string,
      items: selectedItems.map((i) => i.id),
    }).then(() => {
      localStorage.removeItem('participantId');
      navigate('/success');
    });
  };

  const clearSelectedItems = () => {
    setSelectedItems([]);
  };

  const unassignedEffort =
    questionnaire.avaible_effort -
    selectedItems.reduce((acc, item) => acc + item.effort, 0);

  return (
    <div>
      <Title variant="h2" text="Tarea de priorización" />
      <p className="my-2">
        Estás trabajando en un proyecto de desarrollo de un navegador web. El
        equipo sigue una metodología ágil y está en la fase de planificación
        para los próximos sprints.
      </p>

      <p className="my-2">
        Hay 25 issues en el backlog que incluyen tareas técnicas y tareas de UX.
      </p>

      <p className="my-2">
        Se te pide que propongas cuáles deberían incluirse en el próximo sprint.
      </p>

      <h6>Tene en cuenta estos criterios:</h6>
      <ol className="list-decimal ml-8 my-2 flex flex-col gap-2">
        <li>
          <span className="font-bold">Objetivo del Sprint:</span> El objetivo de
          este sprint es mejorar la UX y mantener la estabilidad técnica del
          producto.
        </li>
        <li>
          <span className="font-bold">Restricciones:</span> Para este sprint se
          cuenta con un máximo de 100 horas asignables.
        </li>
        <li>
          <span className="font-bold">Criterios de Priorización:</span>
          <ul className="list-disc ml-8">
            <li>
              <span className="font-bold">UX:</span> Priorizá issues que mejoren
              significativamente la UX.
            </li>
            <li>
              <span className="font-bold">Técnico:</span> Asegura que los
              problemas técnicos críticos sean resueltos, sin descuidar la UX.
            </li>
            <li>
              <span className="font-bold">Severidad:</span> Los issues con alta
              severidad deben ser resueltos si afectan la estabilidad del
              sistema o la usabilidad.
            </li>
          </ul>
        </li>
      </ol>
      <p className="my-4">
        Para cada issue se indica su descripcion, la categoría que tiene
        asociada (UX o Técnico) y el Esfuerzo estimado en horas para
        implementarlo
      </p>
      <form onSubmit={handleSubmit}>
        <div className="my-8 flex flex-col gap-4">
          {questionnaire.items.map((item) => (
            <PriorizationItem
              key={item.code}
              item={item}
              onClick={handleItemClick}
              selected={selectedItems.some((it) => it.id === item.id)}
            />
          ))}
        </div>
        <div className="my-8 flex justify-center items-center gap-4">
          <Button
            variant={'outline'}
            disabled={
              unassignedEffort < 0 ||
              selectedItems.length > questionnaire.selectable_items ||
              !selectedItems.length
            }
          >
            Finalizar
          </Button>
          <Button variant={'secondary'} onClick={clearSelectedItems}>
            Limpiar selección
          </Button>
        </div>
      </form>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-50 p-4 flex items-center gap-4 justify-center">
        <p className="font-bold">
          {selectedItems.length} ítem/s seleccionado/s
        </p>
        <p>
          <span className="font-bold">Horas disponibles:</span>{' '}
          {unassignedEffort} / {questionnaire.avaible_effort}
        </p>
      </div>
    </div>
  );
};
