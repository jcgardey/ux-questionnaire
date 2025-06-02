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

  const unassignedEffort =
    questionnaire.avaible_effort -
    selectedItems.reduce((acc, item) => acc + item.effort, 0);

  return (
    <div>
      <Title variant="h2" text="Tarea de priorización" />
      <p className="my-2">
        Estás trabajando en un proyecto de desarrollo de un navegador web. El
        equipo sigue una metodología ágil y está en la fase de planificación
        para los próximos sprints. Hay 25 issues en el backlog que incluyen
        tareas técnicas y tareas de UX. Se te pide que propongas cuáles deberían
        incluirse en el próximo sprint.
      </p>

      <h6>Tene en cuenta estos criterios:</h6>
      <ol>
        <li>
          Objetivo del Sprint: El objetivo de este sprint es mejorar la UX y
          mantener la estabilidad técnica del producto.
        </li>
        <li>
          Restricciones: Este sprint debe incluir 10 issues con un esfuerzo
          total no mayor a 100 horas.
        </li>
        <li>
          Criterios de Priorización:
          <ul>
            <li>UX: Priorizá issues que mejoren significativamente la UX.</li>
            <li>
              Técnico: Asegura que los problemas técnicos críticos sean
              resueltos, sin descuidar la UX.
            </li>
            <li>
              Severidad: Los issues con alta severidad deben ser resueltos si
              afectan la estabilidad del sistema o la usabilidad.
            </li>
          </ul>
        </li>
      </ol>
      <p>
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
              selected={selectedItems.includes(item)}
            />
          ))}
        </div>
        <div className="my-8">
          <Button
            variant={'outline'}
            disabled={
              unassignedEffort < 0 ||
              selectedItems.length > questionnaire.selectable_items
            }
          >
            Finalizar
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
