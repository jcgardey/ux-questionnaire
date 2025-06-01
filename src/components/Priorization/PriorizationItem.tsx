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

interface PriorizationItemProps {
  item: QuestionnaireItem;
  onClick: (item: QuestionnaireItem) => void;
}

export const PriorizationItem: React.FC<PriorizationItemProps> = ({
  item,
  onClick,
}) => {
  const handleClick = () => {
    onClick(item);
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
    <Card
      onClick={handleClick}
      className={`cursor-pointer ${severityColors[item.severity]}`}
    >
      <CardHeader>
        <CardTitle>{item.description}</CardTitle>
        <CardDescription>{item.contribution}</CardDescription>
        <CardAction className="flex flex-row gap-2">
          <div
            className={`w-34 p-1 text-center rounded ${
              severityColors[item.severity]
            }`}
          >
            Severidad:{' '}
            <span className="font-bold">{severityLabels[item.severity]}</span>
          </div>
          <div
            className={`w-20 p-1 text-center rounded ${
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
