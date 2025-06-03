import { Title } from '@/components/Title';

export const SuccessPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <Title variant="h1" text="Cierre y agradecimiento" />
      <p>
        Muchas gracias por participar en este ejercicio! Tu contribución es
        valiosa y nos ayudará a comprender mejor cómo se toman las decisiones de
        priorización en entornos ágiles. Apreciamos el tiempo que dedicaste a
        completar esta tarea.
      </p>

      <p>
        Si tenés comentarios o preguntas sobre el ejercicio, no dudes en
        contactarnos.
      </p>

      <p>¡Gracias nuevamente y que tengas un excelente día!</p>
    </div>
  );
};
