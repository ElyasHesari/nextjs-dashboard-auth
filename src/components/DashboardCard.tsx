import { DashboardCard as DashboardCardType } from '@/types';

interface Props {
  card: DashboardCardType;
}

export const DashboardCard = ({ card }: Props) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-sm font-medium text-gray-600 mb-2">{card.title}</h3>
      <p className="text-3xl font-bold text-blue-600">
        {card.value.toLocaleString('fa-IR')}
      </p>
    </div>
  );
};