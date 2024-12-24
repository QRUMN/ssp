import { useMemo } from 'react';
import type { Database } from '../lib/database.types';
import type { EventFilters } from '../components/events/EventFilters';

type Event = Database['public']['Tables']['events']['Row'];

export function useFilteredEvents(events: Event[] | undefined, filters: EventFilters) {
  return useMemo(() => {
    if (!events) return [];

    return events.filter(event => {
      const matchesSearch = !filters.search || 
        event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.description.toLowerCase().includes(filters.search.toLowerCase());

      const matchesDate = !filters.date || 
        event.date.startsWith(filters.date);

      const matchesLocation = !filters.location || 
        event.venue_city.toLowerCase().includes(filters.location.toLowerCase());

      return matchesSearch && matchesDate && matchesLocation;
    });
  }, [events, filters]);
}