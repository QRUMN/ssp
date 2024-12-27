import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Search,
  Filter,
  Plus,
  Users,
  Clock,
  MapPin,
  MoreVertical,
  Eye,
  Edit,
  Trash,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar as CalendarIcon,
  List,
  Grid,
  Share,
  Download
} from 'lucide-react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'live' | 'ended' | 'cancelled';
  ticketsSold: number;
  totalCapacity: number;
  revenue: number;
  coverImage: string;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: "New Year's Eve Gala",
    date: '2024-12-31',
    time: '20:00',
    location: 'Grand Ballroom',
    status: 'upcoming',
    ticketsSold: 150,
    totalCapacity: 200,
    revenue: 15000,
    coverImage: '/path/to/image1.jpg'
  },
  {
    id: '2',
    title: 'Cultural Arts Festival',
    date: '2024-01-15',
    time: '14:00',
    location: 'City Park',
    status: 'upcoming',
    ticketsSold: 500,
    totalCapacity: 1000,
    revenue: 25000,
    coverImage: '/path/to/image2.jpg'
  },
  {
    id: '3',
    title: 'Tech Conference 2024',
    date: '2024-02-01',
    time: '09:00',
    location: 'Convention Center',
    status: 'upcoming',
    ticketsSold: 300,
    totalCapacity: 500,
    revenue: 45000,
    coverImage: '/path/to/image3.jpg'
  }
];

const filters = [
  { label: 'All Events', value: 'all' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Live', value: 'live' },
  { label: 'Ended', value: 'ended' },
  { label: 'Cancelled', value: 'cancelled' }
];

export function EventManagement() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'upcoming':
        return 'text-teal bg-teal/10';
      case 'live':
        return 'text-green-500 bg-green-500/10';
      case 'ended':
        return 'text-ink/60 bg-ink/10';
      case 'cancelled':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-ink/60 bg-ink/10';
    }
  };

  const getStatusIcon = (status: Event['status']) => {
    switch (status) {
      case 'upcoming':
        return Clock;
      case 'live':
        return CheckCircle;
      case 'ended':
        return XCircle;
      case 'cancelled':
        return AlertTriangle;
      default:
        return AlertTriangle;
    }
  };

  const filteredEvents = mockEvents.filter(event => {
    if (selectedFilter !== 'all' && event.status !== selectedFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEvents.map(event => {
        const StatusIcon = getStatusIcon(event.status);
        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-paper/5 border border-ink/10 rounded-xl overflow-hidden"
          >
            {/* Event Cover Image */}
            <div className="aspect-video relative">
              <img
                src={event.coverImage}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    event.status
                  )}`}
                >
                  <StatusIcon className="w-4 h-4 mr-1" />
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Event Details */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-medium text-lg">{event.title}</h3>
                  <div className="flex items-center text-sm text-ink/60 mt-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </div>
                  <div className="flex items-center text-sm text-ink/60 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {event.location}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <div className="text-sm text-ink/60">Tickets Sold</div>
                  <div className="font-medium">
                    {event.ticketsSold}/{event.totalCapacity}
                  </div>
                  <div className="w-full bg-ink/10 rounded-full h-2">
                    <div
                      className="bg-teal h-2 rounded-full"
                      style={{
                        width: `${(event.ticketsSold / event.totalCapacity) * 100}%`
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-ink/60">Revenue</div>
                  <div className="font-medium">
                    ${event.revenue.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-4 gap-2 border-t border-ink/10 pt-4">
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500">
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  const renderListView = () => (
    <div className="bg-paper/5 border border-ink/10 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-ink/10">
            <th className="px-6 py-4 text-left text-sm font-medium text-ink/60">
              Event
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-ink/60">
              Date & Time
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-ink/60">
              Location
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-ink/60">
              Status
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-ink/60">
              Tickets
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-ink/60">
              Revenue
            </th>
            <th className="px-6 py-4 text-right text-sm font-medium text-ink/60">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map(event => {
            const StatusIcon = getStatusIcon(event.status);
            return (
              <tr
                key={event.id}
                className="border-b border-ink/10 hover:bg-ink/5"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <img
                        src={event.coverImage}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="font-medium">{event.title}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center text-ink/60">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(event.date).toLocaleDateString()}
                    <br />
                    {event.time}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-ink/60">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {event.location}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      event.status
                    )}`}
                  >
                    <StatusIcon className="w-4 h-4 mr-1" />
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="text-sm">
                      {event.ticketsSold}/{event.totalCapacity}
                    </div>
                    <div className="w-24 bg-ink/10 rounded-full h-2">
                      <div
                        className="bg-teal h-2 rounded-full"
                        style={{
                          width: `${
                            (event.ticketsSold / event.totalCapacity) * 100
                          }%`
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">
                  ${event.revenue.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Events</h1>
            <p className="text-ink/60">Manage your events and track performance</p>
          </div>
          <Link to="/events/create">
            <Button>
              <Plus className="w-5 h-5 mr-2" />
              Create Event
            </Button>
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-ink/10 bg-paper/5 focus:outline-none focus:border-teal"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-ink/60" />
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    selectedFilter === filter.value
                      ? 'bg-teal text-paper'
                      : 'hover:bg-ink/5'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2 border-l border-ink/10 pl-4">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Events List */}
        {viewMode === 'grid' ? renderGridView() : renderListView()}

        {/* Export and Analytics */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline">
            View Analytics
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
