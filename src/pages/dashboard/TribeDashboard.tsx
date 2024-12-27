import React from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import {
  Calendar, MapPin, Users, ArrowUpRight, Star,
  TrendingUp, Building2, BarChart, Plus,
  MessageSquare, Globe, Clock
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  image: string;
  status: 'upcoming' | 'live' | 'past';
}

const events: Event[] = [
  {
    id: '1',
    title: 'Cultural Heritage Exhibition',
    date: '2024-12-28',
    location: 'Main Gallery',
    attendees: 150,
    image: 'https://github.com/OpalBridgeAi/Uploads/blob/main/Image%2012%20(17).jpg?raw=true',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Traditional Arts Workshop',
    date: '2024-12-30',
    location: 'Studio Space',
    attendees: 45,
    image: 'https://github.com/OpalBridgeAi/Uploads/blob/main/Image%2012%20(17).jpg?raw=true',
    status: 'upcoming'
  }
];

export function TribeDashboard() {
  return (
    <DashboardLayout
      title="Tribe Dashboard"
      subtitle="Manage your organization and events"
    >
      {/* Organization Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-paper/5 border border-ink/10 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Total Events</h3>
            <Calendar className="w-5 h-5 text-teal" />
          </div>
          <p className="text-2xl font-bold">24</p>
          <div className="flex items-center text-sm text-teal">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+12% this month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-paper/5 border border-ink/10 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Total Members</h3>
            <Users className="w-5 h-5 text-teal" />
          </div>
          <p className="text-2xl font-bold">1,250</p>
          <div className="flex items-center text-sm text-teal">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+8% this month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-paper/5 border border-ink/10 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Engagement</h3>
            <BarChart className="w-5 h-5 text-teal" />
          </div>
          <p className="text-2xl font-bold">85%</p>
          <div className="flex items-center text-sm text-teal">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+5% this month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl bg-paper/5 border border-ink/10 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Messages</h3>
            <MessageSquare className="w-5 h-5 text-teal" />
          </div>
          <p className="text-2xl font-bold">48</p>
          <Button variant="ghost" className="w-full justify-between">
            View Inbox <ArrowUpRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-gradient-to-r from-teal to-sand text-paper"
        >
          <Button
            variant="secondary"
            className="w-full justify-center space-x-2 mb-4"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Event</span>
          </Button>
          <p className="text-sm text-paper/80">
            Start planning your next cultural event
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-gradient-to-r from-sand to-teal text-paper"
        >
          <Button
            variant="secondary"
            className="w-full justify-center space-x-2 mb-4"
          >
            <Globe className="w-5 h-5" />
            <span>Manage Community</span>
          </Button>
          <p className="text-sm text-paper/80">
            Engage with your members
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-gradient-to-r from-teal via-sand to-teal text-paper"
        >
          <Button
            variant="secondary"
            className="w-full justify-center space-x-2 mb-4"
          >
            <BarChart className="w-5 h-5" />
            <span>View Analytics</span>
          </Button>
          <p className="text-sm text-paper/80">
            Track your organization's growth
          </p>
        </motion.div>
      </section>

      {/* Event Management */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Event Management</h2>
          <Button variant="outline">View All Events</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
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
                <div className="absolute top-4 right-4 px-3 py-1 bg-teal text-paper rounded-full text-sm font-medium">
                  {event.status === 'live' ? (
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
                      Live Now
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Upcoming
                    </span>
                  )}
                </div>
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
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink/60">
                    <Users className="w-4 h-4 inline mr-1" />
                    {event.attendees} registered
                  </span>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button size="sm">Manage</Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Community Engagement */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold">Community Engagement</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Active Discussions',
              count: '28',
              icon: MessageSquare,
              trend: '+15%',
            },
            {
              title: 'Member Growth',
              count: '120',
              icon: TrendingUp,
              trend: '+22%',
            },
            {
              title: 'Event Participation',
              count: '92%',
              icon: Users,
              trend: '+8%',
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-paper/5 border border-ink/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{stat.title}</h3>
                <stat.icon className="w-5 h-5 text-teal" />
              </div>
              <p className="text-2xl font-bold mb-2">{stat.count}</p>
              <span className="text-sm text-teal">{stat.trend} this month</span>
            </motion.div>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}
