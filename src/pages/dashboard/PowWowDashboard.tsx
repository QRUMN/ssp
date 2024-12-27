import React from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import {
  Calendar, MapPin, Users, ArrowUpRight, Star,
  MessageSquare, Award, Crown, Ticket
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  image: string;
  exclusive?: boolean;
}

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'VIP Cultural Gala',
    date: '2024-12-28',
    location: 'Grand Hall',
    attendees: 80,
    image: 'https://github.com/OpalBridgeAi/Uploads/blob/main/Image%2012%20(17).jpg?raw=true',
    exclusive: true
  },
  {
    id: '2',
    title: 'Private Wine Tasting',
    date: '2024-12-30',
    location: 'Vintage Cellar',
    attendees: 30,
    image: 'https://github.com/OpalBridgeAi/Uploads/blob/main/Image%2012%20(17).jpg?raw=true',
    exclusive: true
  }
];

export function PowWowDashboard() {
  return (
    <DashboardLayout
      title="Pow Wow Dashboard"
      subtitle="Your premium cultural experience"
    >
      {/* Premium Status */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-xl bg-gradient-to-r from-teal to-sand text-paper"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Crown className="w-6 h-6" />
              <h2 className="text-xl font-bold">Premium Member</h2>
            </div>
            <p className="text-paper/80">
              Enjoy exclusive access to premium events and features
            </p>
          </div>
          <Button variant="secondary">View Benefits</Button>
        </div>
      </motion.section>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-paper/5 border border-ink/10 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Exclusive Events</h3>
            <Ticket className="w-5 h-5 text-teal" />
          </div>
          <p className="text-2xl font-bold">4</p>
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
            <h3 className="font-semibold">Messages</h3>
            <MessageSquare className="w-5 h-5 text-teal" />
          </div>
          <p className="text-2xl font-bold">12</p>
          <Button variant="ghost" className="w-full justify-between">
            Open Chat <ArrowUpRight className="w-4 h-4" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-paper/5 border border-ink/10 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Achievements</h3>
            <Award className="w-5 h-5 text-teal" />
          </div>
          <p className="text-2xl font-bold">8</p>
          <Button variant="ghost" className="w-full justify-between">
            View All <ArrowUpRight className="w-4 h-4" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl bg-paper/5 border border-ink/10 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Network</h3>
            <Users className="w-5 h-5 text-teal" />
          </div>
          <p className="text-2xl font-bold">156</p>
          <Button variant="ghost" className="w-full justify-between">
            Connect <ArrowUpRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </section>

      {/* Exclusive Events */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold">Exclusive Events</h2>
            <span className="px-2 py-1 text-xs font-medium bg-teal/10 text-teal rounded-full">
              Premium Only
            </span>
          </div>
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
                {event.exclusive && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-teal text-paper rounded-full text-sm font-medium flex items-center space-x-1">
                    <Crown className="w-4 h-4" />
                    <span>Exclusive</span>
                  </div>
                )}
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
                  <Button>RSVP Now</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold">Recent Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: 'Event Explorer', description: 'Attended 5 events', icon: Calendar },
            { title: 'Networker', description: 'Connected with 50 members', icon: Users },
            { title: 'Culture Enthusiast', description: 'Joined 3 different cultural events', icon: Globe },
            { title: 'VIP Status', description: 'Maintained premium membership for 3 months', icon: Crown }
          ].map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-paper/5 border border-ink/10 flex items-start space-x-3"
            >
              <div className="p-2 rounded-lg bg-teal/10">
                <achievement.icon className="w-5 h-5 text-teal" />
              </div>
              <div>
                <h3 className="font-medium">{achievement.title}</h3>
                <p className="text-sm text-ink/60">{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}
