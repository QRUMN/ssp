import React from 'react';
import { EventCard } from './EventCard';
import { Spinner } from '../ui/Spinner';
import { useEvents } from '../../hooks/useEvents';

export function EventList() {
  const { data: events, isLoading } = useEvents();

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!events?.length) {
    return (
      <div className="text-center py-8 text-gray-400">
        No events found
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}