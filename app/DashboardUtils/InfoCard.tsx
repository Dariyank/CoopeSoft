import React from 'react';
import { IconType } from 'react-icons'; 

interface InfoCardProps {
  title: string;
  icon: IconType;
  value: string;
  change: string;
  iconColor: string;
  iconSize?: string; // Tamaño opcional para los íconos
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon: Icon, value, change, iconColor, iconSize = "24px" }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600 text-sm uppercase">{title}</span>
        <Icon style={{ color: iconColor, fontSize: iconSize }} />
      </div>
      <div className="text-2xl font-semibold">{value}</div>
      <div className={`text-sm px-3 ${change.includes('+') ? 'text-[#00755D]' : 'text-red-500'}`}>{change}</div>
    </div>
  );
};

export default InfoCard;
