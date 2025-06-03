import { Title } from '@/components/Title';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  deleteQuestionnaireResponse,
  exportAllQuestionnaireResponses,
  getAllQuestionnaireResponses,
  type QuestionnaireResponse,
} from '@/services/responses';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { saveFile } from '@/utils/file';
import { TrashIcon } from 'lucide-react';

export const SamplesPage = () => {
  const [responses, setResponses] = useState<QuestionnaireResponse[]>([]);

  useEffect(() => {
    getAllQuestionnaireResponses().then((data) => {
      setResponses(data);
    });
  }, []);

  const handleExport = () => {
    // Implement export logic here
    exportAllQuestionnaireResponses().then((blob) => {
      saveFile('respuestas.csv', blob);
    });
  };

  const handleDelete = (response: QuestionnaireResponse) => {
    if (
      confirm(
        `¿Estás seguro de eliminar la respuesta del ${dayjs(
          response.created_at
        ).format('DD/MM/YYYY HH:mm:ss')}?`
      )
    ) {
      deleteQuestionnaireResponse(response.id).then(() => {
        setResponses(responses.filter((r) => r.id !== response.id));
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Title variant="h2" text="Respuestas" />
      <div>
        <Button variant={'outline'} onClick={handleExport}>
          Exportar muestras
        </Button>
      </div>
      <p>
        Cantidad de respuestas:{' '}
        <span className="font-medium">{responses.length}</span>
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Edad</TableHead>
            <TableHead>G&eacute;nero</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Experiencia Rol</TableHead>
            <TableHead>Experiencia Agiles</TableHead>
            <TableHead>Tipo de proyecto</TableHead>
            <TableHead>Otro tipo de proyecto</TableHead>
            <TableHead>Experiencia Sprint Planning</TableHead>
            <TableHead>Issues Seleccionados</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {responses.map((response) => (
            <TableRow key={response.id}>
              <TableCell>
                {dayjs(response.created_at).format('DD/MM/YYYY HH:mm:ss')}
              </TableCell>
              <TableCell>{response.age}</TableCell>
              <TableCell>{response.gender}</TableCell>
              <TableCell>{response.role}</TableCell>
              <TableCell>{response.role_experience}</TableCell>
              <TableCell>{response.agile_experience}</TableCell>
              <TableCell>{response.project_type}</TableCell>
              <TableCell>{response.project_type_other}</TableCell>
              <TableCell>{response.sprint_planning_experience}</TableCell>
              <TableCell>
                {response.response_items
                  .map((ri) => ri.questionnaire_item.code)
                  .join(', ')}
              </TableCell>
              <TableCell>
                <Button
                  size="icon"
                  onClick={() => {
                    handleDelete(response);
                  }}
                >
                  <TrashIcon color="red" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
