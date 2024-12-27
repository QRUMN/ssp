import React from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Calendar, MapPin, Users, ArrowUpRight, Star } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  image: string;
}

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Cultural Night Market',
    date: '2024-12-28',
    location: 'Downtown Plaza',
    attendees: 120,
    image: 'https://github.com/OpalBridgeAi/Uploads/blob/main/Image%2012%20(17).jpg?raw=true'
  },
  {
    id: '2',
    title: 'International Food Festival',
    date: '2024-12-30',
    location: 'City Park',
    attendees: 250,
    image: 'https://github.com/OpalBridgeAi/Uploads/blob/main/Image%2012%20(17).jpg?raw=true'
  }
];

export function NomadDashboard() {
  return (
    <DashboardLayout
      title="Nomad Dashboard"
      subtitle="Discover and join cultural events"
    >
      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-paper/5 border border-ink/10 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Upcoming Events</h3>
            <Calendar className="w-5 h-5 text-teal" />
          </div>
          <p className="text-2xl font-bold">{upcomingEvents.length}</p>
          <Button variant="ghost" className="w-full justify-between">
            View All <ArrowUpRight className="w-4 h-4" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-paper/5 border border-ink/10 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Local Events</h3>
            <MapPin className="w-5 h-5 text-teal" />
          </div>
          <p className="text-2xl font-bold">15</p>
          <Button variant="ghost" className="w-full justify-between">
            Explore Nearby <ArrowUpRight className="w-4 h-4" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-paper/5 border border-ink/10 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Community</h3>
            <Users className="w-5 h-5 text-teal" />
          </div>
          <p className="text-2xl font-bold">2.5k</p>
          <Button variant="ghost" className="w-full justify-between">
            Connect <ArrowUpRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </section>

      {/* Upcoming Events */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Upcoming Events</h2>
          <Button variant="outline">View All</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative overflow-hidden rounded-xl bg-paper/5 border border-ink/10"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-ink/60">
                      <span className="inline-flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="inline-flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {event.location}
                      </span>
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Star className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink/60">
                    <Users className="w-4 h-4 inline mr-1" />
                    {event.attendees} attending
                  </span>
                  <Button>Join Event</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Upgrade Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-xl bg-gradient-to-r from-teal to-sand p-8"
      >
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl font-bold text-paper mb-2">
            Upgrade to Pow Wow
          </h2>
          <p className="text-paper/80 mb-6">
            Get access to exclusive events, premium features, and connect with more cultural enthusiasts.
          </p>
          <Button variant="secondary">Upgrade Now</Button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/20 to-transparent" />
      </motion.section>
    </DashboardLayout>
  );
}
