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
  exportAllQuestionnaireResponses,
  getAllQuestionnaireResponses,
  type QuestionnaireResponse,
} from '@/services/responses';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { saveFile } from '@/utils/file';

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

  return (
    <div className="flex flex-col gap-4">
      <Title variant="h2" text="Respuestas" />
      <div>
        <Button variant={'outline'} onClick={handleExport}>
          Exportar muestras
        </Button>
      </div>
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
            <TableHead>Experiencia Sprint Planning</TableHead>
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
              <TableCell>{response.sprint_planning_experience}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
