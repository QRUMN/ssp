import React, { useState } from 'react';
import {
  Calendar, MapPin, Users, Clock,
  Shield, AlertTriangle, CheckCircle,
  Eye, Edit, Trash2, Filter
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface EventData {
  id: string;
  title: string;
  organizer: string;
  location: string;
  date: string;
  status: 'approved' | 'pending' | 'flagged';
  attendees: number;
  type: string;
}

const mockEvents: EventData[] = [
  {
    id: '1',
    title: 'Cultural Festival 2024',
    organizer: 'John Doe',
    location: 'Central Park, NY',
    date: '2024-06-15',
    status: 'approved',
    attendees: 250,
    type: 'Festival'
  },
  // Add more mock events...
];

export function EventsPage() {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleEventAction = async (action: 'approve' | 'reject' | 'delete', eventId: string) => {
    // TODO: Implement event actions
    console.log(`${action} event ${eventId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-500 bg-green-50 dark:bg-green-900/10';
      case 'pending': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/10';
      case 'flagged': return 'text-red-500 bg-red-50 dark:bg-red-900/10';
      default: return 'text-gray-500 bg-gray-50 dark:bg-gray-900/10';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Event Moderation</h1>
          <p className="text-ink/60">Review and manage community events</p>
        </div>
        <div className="flex gap-4">
          <Button 
            className="glass-card glass-card-hover text-yellow-500"
            onClick={() => console.log('View reported events')}
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            Reported Events
          </Button>
          <Button 
            className="bg-gradient-to-r from-teal to-sand text-paper"
            onClick={() => console.log('Create event')}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Create Event
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4">
          <div className="glass-input flex items-center px-3 py-2 rounded-lg">
            <Filter className="w-5 h-5 text-ink/40 mr-2" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-transparent outline-none"
            >
              <option value="all">All Events</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>
        </div>

        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-input w-full px-4 py-2"
          />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEvents.map((event) => (
          <div key={event.id} className="glass-card overflow-hidden">
            {/* Event Image */}
            <div className="relative h-48">
              <img
                src={`https://source.unsplash.com/random/800x600?event&sig=${event.id}`}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
              </div>
            </div>

            {/* Event Details */}
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold">{event.title}</h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-ink/60">
                  <Users className="w-4 h-4" />
                  <span>Organized by {event.organizer}</span>
                </div>
                <div className="flex items-center gap-2 text-ink/60">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-ink/60">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-ink/60">
                  <Users className="w-4 h-4" />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-ink/10">
                <div className="flex items-center gap-2">
                  <Button
                    className="p-2 hover:bg-ink/5 rounded-lg"
                    onClick={() => handleEventAction('approve', event.id)}
                  >
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </Button>
                  <Button
                    className="p-2 hover:bg-ink/5 rounded-lg"
                    onClick={() => console.log('View event details')}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    className="p-2 hover:bg-ink/5 rounded-lg"
                    onClick={() => console.log('Edit event')}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  className="p-2 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg text-red-500"
                  onClick={() => handleEventAction('delete', event.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
