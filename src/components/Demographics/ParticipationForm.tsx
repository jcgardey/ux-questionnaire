import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { AgileExperience, Gender, ProjectType, Role, RoleExperience, SprintPlanningExperience } from '@/types/response';

interface ParticipationFormProps {
  onSubmit: (data: ParticipantData) => void;
}

export interface ParticipantData {
  age: number | null;
  gender: Gender | null;
  role: Role | null;
  role_experience: RoleExperience | null;
  agile_experience: AgileExperience | null;
  project_type: ProjectType | null;
  project_type_other?: string;
  sprint_planning_experience: SprintPlanningExperience | null;
}

export const ParticipantForm: React.FC<ParticipationFormProps> = ({
  onSubmit,
}) => {
  const [form, setForm] = useState<ParticipantData>({
    age: null,
    gender: null,
    role: null,
    role_experience: null,
    agile_experience: null,
    project_type: null,
    project_type_other: '',
    sprint_planning_experience: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) : value,
    }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const notNullableFields: (keyof ParticipantData)[] = [
    'age',
    'gender',
    'role',
    'role_experience',
    'agile_experience',
    'sprint_planning_experience',
  ];
  const isFormValid =
    Object.keys(form).every(
      (key) =>
        !notNullableFields.includes(key as keyof ParticipantData) ||
        form[key as keyof ParticipantData] !== null
    ) &&
    (form.project_type !== 'OTHER' || form.project_type_other?.trim() !== '');

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Label htmlFor="edad">Edad</Label>
        <Input
          id="age"
          name="age"
          type="number"
          min={0}
          value={form.age ?? ''}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-4">
        <Label>Género con el que te identificás</Label>
        <RadioGroup
          value={form.gender}
          onValueChange={(value) => handleRadioChange('gender', value)}
        >
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="F" id="genero-femenino" />
            <Label className="font-normal" htmlFor="genero-femenino">
              Femenino
            </Label>
          </div>
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="M" id="genero-masculino" />
            <Label className="font-normal" htmlFor="genero-masculino">
              Masculino
            </Label>
          </div>
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="NB" id="genero-nobinario" />
            <Label className="font-normal" htmlFor="genero-nobinario">
              No binario
            </Label>
          </div>
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="NL" id="genero-otra" />
            <Label className="font-normal" htmlFor="genero-otra">
              Mi identidad no está en la lista
            </Label>
          </div>
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="UN" id="genero-prefiero" />
            <Label className="font-normal" htmlFor="genero-prefiero">
              Prefiero no decirlo
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-4">
        <Label>Rol actual en trabajo</Label>
        <RadioGroup
          value={form.role}
          onValueChange={(value) => handleRadioChange('role', value)}
        >
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="DEV" id="rol-desarrollo" />
            <Label className="font-normal" htmlFor="rol-desarrollo">
              Desarrollo
            </Label>
          </div>
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="UX" id="rol-ux" />
            <Label className="font-normal" htmlFor="rol-ux">
              Investigación o Diseño UX
            </Label>
          </div>
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="LEAD" id="rol-lider" />
            <Label className="font-normal" htmlFor="rol-lider">
              Líder
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-4">
        <Label>Experiencia en rol actual</Label>
        <RadioGroup
          value={form.role_experience}
          onValueChange={(value) => handleRadioChange('role_experience', value)}
        >
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="menos de un año" id="exp-menos" />
            <Label className="font-normal" htmlFor="exp-menos">
              Menos de un año
            </Label>
          </div>
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="<1" id="exp-1-3" />
            <Label className="font-normal" htmlFor="exp-1-3">
              1 a 3 años
            </Label>
          </div>
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="1-3" id="exp-3-5" />
            <Label className="font-normal" htmlFor="exp-3-5">
              3 a 5 años
            </Label>
          </div>
          <div className="flex gap-2 items-center">
            <RadioGroupItem value=">5" id="exp-mas5" />
            <Label className="font-normal" htmlFor="exp-mas5">
              Más de 5 años
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-4">
        <Label>Experiencia con métodos ágiles</Label>
        <RadioGroup
          value={form.agile_experience}
          onValueChange={(value) =>
            handleRadioChange('agile_experience', value)
          }
        >
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="NEVER" id="agil-nunca" />
            <Label className="font-normal" htmlFor="agil-nunca">
              Nunca trabajé con métodos ágiles
            </Label>
          </div>
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="OCCASIONAL" id="agil-ocasional" />
            <Label className="font-normal" htmlFor="agil-ocasional">
              He trabajado ocasionalmente con métodos ágiles
            </Label>
          </div>
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="USUAL" id="agil-regular" />
            <Label className="font-normal" htmlFor="agil-regular">
              Trabajo regularmente con métodos ágiles
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-4">
        <Label>Tipo de proyectos en los que trabajas habitualmente</Label>
        <RadioGroup
          value={form.project_type}
          onValueChange={(value) => handleRadioChange('project_type', value)}
        >
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="WEB" id="proyecto-web" />
            <Label className="font-normal" htmlFor="proyecto-web">
              Aplicaciones web
            </Label>
          </div>
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="MOBILE" id="proyecto-movil" />
            <Label className="font-normal" htmlFor="proyecto-movil">
              Aplicaciones para móviles
            </Label>
          </div>
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="OTHER" id="proyecto-otra" />
            <Label className="font-normal" htmlFor="proyecto-otra">
              Otra (indicar opción)
            </Label>
          </div>
        </RadioGroup>
        {form.project_type === 'OTHER' && (
          <Input
            name="project_type_other"
            value={form.project_type_other}
            onChange={handleChange}
            placeholder="Indicar opción"
            required
            className="mt-2"
          />
        )}
      </div>

      <div className="flex flex-col gap-4">
        <Label>
          Experiencia en asignación de prioridades o planificación de sprints
        </Label>
        <RadioGroup
          value={form.sprint_planning_experience}
          onValueChange={(value) =>
            handleRadioChange('sprint_planning_experience', value)
          }
        >
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="USUAL" id="planif-habitual" />
            <Label className="font-normal" htmlFor="planif-habitual">
              Habitualmente participo
            </Label>
          </div>
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="SOMETIMES" id="planif-algunas" />
            <Label className="font-normal" htmlFor="planif-algunas">
              Algunas veces he participado
            </Label>
          </div>
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="ONLY_CRITICAL" id="planif-criticos" />
            <Label className="font-normal" htmlFor="planif-criticos">
              Participo sólo cuando hay ítems críticos relacionados con mi rol
            </Label>
          </div>
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="NEVER" id="planif-nunca" />
            <Label className="font-normal" htmlFor="planif-nunca">
              Nunca participo de esas actividades
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Button
        disabled={!isFormValid}
        type="submit"
        variant="outline"
        className="hover:cursor-pointer"
      >
        Continuar
      </Button>
    </form>
  );
};
