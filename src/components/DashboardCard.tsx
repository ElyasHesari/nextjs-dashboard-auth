import { DashboardCard as DashboardCardType } from '@/types';

interface Props {
  card: DashboardCardType;
}

export const DashboardCard = ({ card }: Props) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
      <h3 className="text-sm font-medium text-gray-600 mb-3">{card.title}</h3>
      <p className="text-3xl font-bold bg-gradient-to-br from-teal-500 to-teal-600 bg-clip-text text-transparent">
        {card.value.toLocaleString('fa-IR')}
      </p>
    </div>
  );
};