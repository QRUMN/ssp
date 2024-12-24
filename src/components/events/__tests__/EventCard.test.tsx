import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { EventCard } from '../EventCard';
import { renderWithProviders } from '../../../test/utils';

const mockEvent = {
  id: '1',
  title: 'Test Event',
  date: '2024-03-01T18:00:00Z',
  venue_name: 'Test Venue',
  venue_city: 'Test City',
  description: 'Test Description',
  flyer_url: null,
  created_by: 'user-1',
  created_at: '2024-02-20T00:00:00Z',
  updated_at: '2024-02-20T00:00:00Z'
};

describe('EventCard', () => {
  it('renders event details correctly', () => {
    renderWithProviders(
      <EventCard 
        event={mockEvent}
        onTicketClick={() => {}}
      />
    );

    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('Test Venue, Test City')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});