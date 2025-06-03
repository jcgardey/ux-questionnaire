import { Title } from '@/components/Title';
import { getQuestionnaire } from '@/services/questionnaire';
import { useEffect } from 'react';
import { Link } from 'react-router';

export const WelcomePage = () => {
  useEffect(() => {
    getQuestionnaire().then((data) => {
      localStorage.setItem('questionnaire', JSON.stringify(data));
    });
  }, []);

  return (
    <div>
      <Title variant="h1" text="Priorización de Backlog para un Sprint" />
      <div className="my-8">
        <p className="my-2">
          ¡Hola! Desde el Centro de Investigación LIFIA de la UNLP te
          agradecemos por tomarte unos minutos para participar de este
          ejercicio.
        </p>
        <p className="my-2">
          El objetivo es simular una situación habitual en equipos ágiles:
          decidir qué tareas o problemas resolver en el siguiente sprint dentro
          de recursos limitados. Esto nos ayudará a entender cómo los diferentes
          perfiles de participantes abordan la planificación de un sprint y las
          decisiones de priorización en un entorno ágil.
        </p>
        <p className="my-2">
          Tu tarea será imaginar que estás trabajando en un equipo de desarrollo
          para mejorar un navegador web. El equipo se encuentra en la fase de
          planificación y tenés que proponer qué issues del backlog se incluirán
          en el próximo sprint.
        </p>
        <p className="my-2">
          Si estás dispuesto a participar, hace click en siguiente.
          <span className="font-bold mx-1">
            El ejercicio completo te llevará de 10 a 20 minutos.
          </span>
        </p>
        <div className="my-8">
          <Link
            className="border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 rounded"
            to="/demographics"
          >
            Siguiente
          </Link>
        </div>
      </div>
    </div>
  );
};
