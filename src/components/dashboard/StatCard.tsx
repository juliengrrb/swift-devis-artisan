
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  color?: string;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color = 'bg-blue-50', icon }) => {
  return (
    <div className="card p-4 flex flex-col items-center justify-center animate-fade-in">
      {icon && <div className="mb-2">{icon}</div>}
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
};

export default StatCard;
