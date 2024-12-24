import React, { useState } from 'react';
import { EventHeader } from '../components/events/EventHeader';
import { EventGrid } from '../components/events/EventGrid';
import { TicketDialog } from '../components/events/TicketDialog';
import { useUpcomingEvents } from '../hooks/useUpcomingEvents';
import type { Database } from '../lib/database.types';

type Event = Database['public']['Tables']['events']['Row'];

export function Events() {
  const { data: events, isLoading } = useUpcomingEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleTicketClick = (eventId: string) => {
    const event = events?.find(e => e.id === eventId) || null;
    setSelectedEvent(event);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <EventHeader />
      <EventGrid 
        events={events} 
        isLoading={isLoading}
        onTicketClick={handleTicketClick}
      />
      <TicketDialog
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}