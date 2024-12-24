import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useEvents } from '../../hooks/useEvents';
import { Card, CardContent } from '../ui/Card';

export function EventsShowcase() {
  const { data: events } = useEvents();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-paper">Featured Events</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {events?.slice(0, 4).map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover className="h-full">
              {event.flyer_url && (
                <img
                  src={event.flyer_url}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <CardContent>
                <h3 className="text-lg font-semibold text-paper mb-2">
                  {event.title}
                </h3>
                <p className="text-paper/60 text-sm">
                  {format(new Date(event.date), 'PPP')}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}