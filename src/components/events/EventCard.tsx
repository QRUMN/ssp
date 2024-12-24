import React from 'react';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { format } from 'date-fns';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { Database } from '../../lib/database.types';
import { useUser } from '../../hooks/useUser';

type Event = Database['public']['Tables']['events']['Row'];

interface EventCardProps {
  event: Event;
  onTicketClick: (eventId: string) => void;
}

export function EventCard({ event, onTicketClick }: EventCardProps) {
  const { user } = useUser();
  const isCurator = user?.membership_tier === 'curator';

  return (
    <Card className="overflow-hidden">
      {event.flyer_url && (
        <img
          src={event.flyer_url}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-ink mb-2">{event.title}</h3>
          <div className="space-y-2 text-ink/60">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{format(new Date(event.date), 'PPP')}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{event.venue_name}, {event.venue_city}</span>
            </div>
          </div>
        </div>

        <p className="text-ink/80 line-clamp-2">{event.description}</p>

        <div className="flex justify-between items-center">
          {isCurator && (
            <span className="text-sm text-teal bg-teal/10 px-2 py-1 rounded">
              30% Curator Discount
            </span>
          )}
          <Button 
            variant="accent"
            onClick={() => onTicketClick(event.id)}
            className="ml-auto"
          >
            <Ticket className="w-4 h-4 mr-2" />
            Get Tickets
          </Button>
        </div>
      </div>
    </Card>
  );
}