import type React from 'react';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import type {
  Category,
  QuestionnaireItem,
  Severity,
} from '@/services/questionnaire';
import { Checkbox } from '../ui/checkbox';

interface PriorizationItemProps {
  item: QuestionnaireItem;
  onClick: (item: QuestionnaireItem, selected: boolean) => void;
  selected: boolean;
}

export const PriorizationItem: React.FC<PriorizationItemProps> = ({
  item,
  onClick,
  selected,
}) => {
  const handleCheckCange = (checked: boolean) => {
    onClick(item, checked);
  };

  const categoryColors: Record<Category, string> = {
    UX: 'bg-blue-900 text-blue-50',
    TE: 'bg-purple-900 text-purple-50',
    MX: 'bg-gray-900 text-gray-50',
  };

  const categoryLabels: Record<Category, string> = {
    UX: 'UX',
    TE: 'Técnico',
    MX: 'Mixto',
  };

  const severityColors: Record<Severity, string> = {
    H: 'bg-red-50 text-red-800',
    M: 'bg-yellow-50 text-orange-800',
    L: 'bg-green-50 text-green-800',
  };
  const severityLabels: Record<Severity, string> = {
    H: 'Alta',
    M: 'Media',
    L: 'Baja',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <Checkbox
            onCheckedChange={handleCheckCange}
            className="bg-white text-slate-800 w-4 h-4"
            checked={selected}
          />
          {item.description}
        </CardTitle>
        <CardDescription>{item.contribution}</CardDescription>
        <CardAction className="flex flex-row items-center gap-2">
          <p className="flex items-center gap-1">
            Esfuerzo:{' '}
            <span className="font-medium text-xl">{item.effort} HS</span>
          </p>
          <div
            className={`w-34 p-1 text-center rounded-full ${
              severityColors[item.severity]
            }`}
          >
            Severidad:{' '}
            <span className="font-bold">{severityLabels[item.severity]}</span>
          </div>
          <div
            className={`w-20 text-center rounded-full ${
              categoryColors[item.category]
            }`}
          >
            {categoryLabels[item.category]}
          </div>
        </CardAction>
      </CardHeader>
    </Card>
  );
};
