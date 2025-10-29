import React from 'react';
import { Card } from '../ui/Card';
import { StatCard as StatCardType } from '../../types';
import { formatChange } from '../../utils/formatters';
import { 
  BookOpen, CheckCircle2, Clock, TrendingUp, 
  TrendingDown, ArrowRight 
} from 'lucide-react';

interface StatCardProps {
  stat: StatCardType;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const getIcon = () => {
    switch (stat.icon) {
      case 'BookOpen':
        return <BookOpen size={20} />;
      case 'CheckCircle2':
        return <CheckCircle2 size={20} />;
      case 'Clock':
        return <Clock size={20} />;
      case 'TrendingUp':
        return <TrendingUp size={20} />;
      default:
        return <ArrowRight size={20} />;
    }
  };

  const getColorClasses = () => {
    switch (stat.color) {
      case 'blue':
        return 'bg-blue-100 text-blue-700';
      case 'green':
        return 'bg-green-100 text-green-700';
      case 'purple':
        return 'bg-purple-100 text-purple-700';
      case 'orange':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{stat.title}</p>
          <h3 className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</h3>
        </div>
        <div className={`p-2 rounded-lg ${getColorClasses()}`}>
          {getIcon()}
        </div>
      </div>
      
      <div className="mt-4 flex items-center">
        {stat.change > 0 ? (
          <TrendingUp size={16} className="text-green-500 mr-1" />
        ) : stat.change < 0 ? (
          <TrendingDown size={16} className="text-red-500 mr-1" />
        ) : (
          <div className="w-4 mr-1" />
        )}
        
        <span 
          className={`text-sm font-medium ${
            stat.change > 0 
              ? 'text-green-500' 
              : stat.change < 0 
              ? 'text-red-500' 
              : 'text-gray-500'
          }`}
        >
          {formatChange(stat.change)} from last period
        </span>
      </div>
    </Card>
  );
};

export default StatCard;