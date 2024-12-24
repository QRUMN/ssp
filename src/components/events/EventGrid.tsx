import React from 'react';
import { EventCard } from './EventCard';
import { Spinner } from '../ui/Spinner';
import type { Database } from '../../lib/database.types';

type Event = Database['public']['Tables']['events']['Row'];

interface EventGridProps {
  events?: Event[];
  isLoading: boolean;
  onTicketClick: (eventId: string) => void;
}

export function EventGrid({ events, isLoading, onTicketClick }: EventGridProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!events?.length) {
    return (
      <div className="text-center py-12 text-ink/60">
        No upcoming events found
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onTicketClick={onTicketClick}
        />
      ))}
    </div>
  );
}