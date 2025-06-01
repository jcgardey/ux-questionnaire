import { PriorizationItem } from '@/components/Priorization/PriorizationItem';
import { Button } from '@/components/ui/button';
import {
  getQuestionnaire,
  type Questionnaire,
  type QuestionnaireItem,
} from '@/services/questionnaire';
import { useEffect, useState } from 'react';

export const PriorizationPage = () => {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(
    null
  );
  const [selectedItems, setSelectedItems] = useState<QuestionnaireItem[]>([]);

  useEffect(() => {
    getQuestionnaire().then((data) => {
      setQuestionnaire(data);
    });
  }, []);

  if (!questionnaire) {
    return <div>Loading...</div>;
  }

  const handleItemClick = (item: QuestionnaireItem) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div>
      <h1>Tarea de priorización</h1>
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
      <div className="my-8 flex flex-col gap-4">
        {questionnaire.items.map((item) => (
          <PriorizationItem
            key={item.code}
            item={item}
            onClick={handleItemClick}
          />
        ))}
      </div>
      <div className="my-8">
        <Button variant={'outline'}>Finalizar</Button>
      </div>
    </div>
  );
};
