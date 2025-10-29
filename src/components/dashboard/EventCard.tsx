import React from 'react';
import { Event } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formattedDate = formatDate(event.date);
  
  return (
    <Card hover>
      <CardHeader className="pb-2">
        <CardTitle>{event.title}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-700">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-start text-gray-700">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
            <span>{event.location}</span>
          </div>
          
          {event.description && (
            <p className="pt-2 text-gray-600">{event.description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;