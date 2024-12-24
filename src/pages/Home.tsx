import React from 'react';
import { useEvents } from '../hooks/useEvents';
import { useUser } from '../hooks/useUser';
import { Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { format } from 'date-fns';

export function Home() {
  const { user, isLoading: userLoading } = useUser();
  const { data: events, isLoading: eventsLoading } = useEvents();

  if (userLoading || eventsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-br from-teal to-teal/80">
        <CardContent className="py-12">
          <h1 className="text-4xl font-bold text-paper mb-4">
            Welcome back, {user?.name}
          </h1>
          <p className="text-paper/80">
            Your community hub for events, discussions, and connections.
          </p>
        </CardContent>
      </Card>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-ink">Upcoming Events</h2>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            View All
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events?.slice(0, 3).map((event) => (
            <Card key={event.id} hover>
              {event.flyer_url && (
                <img
                  src={event.flyer_url}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <CardContent>
                <h3 className="text-lg font-semibold text-ink mb-2">
                  {event.title}
                </h3>
                <p className="text-ink/60 text-sm mb-4">
                  {format(new Date(event.date), 'PPP')}
                </p>
                <Button variant="primary" size="sm" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}