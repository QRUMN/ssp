import React from 'react';
import { Hash, Users, Music, Book, Coffee } from 'lucide-react';
import { Card } from '../ui/Card';

const channels = [
  { id: 'general', name: 'General', icon: Hash },
  { id: 'introductions', name: 'Introductions', icon: Users },
  { id: 'events', name: 'Events', icon: Music },
  { id: 'learning', name: 'Learning', icon: Book },
  { id: 'casual', name: 'Casual', icon: Coffee },
];

export function CommunityChannels() {
  const [activeChannel, setActiveChannel] = React.useState('general');

  return (
    <Card className="p-4 h-fit">
      <h2 className="text-lg font-semibold text-ink dark:text-paper mb-4">Channels</h2>
      <div className="space-y-1">
        {channels.map((channel) => {
          const Icon = channel.icon;
          return (
            <button
              key={channel.id}
              onClick={() => setActiveChannel(channel.id)}
              className={`w-full px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                activeChannel === channel.id
                  ? 'bg-teal/10 text-teal dark:bg-sand/10 dark:text-sand'
                  : 'text-ink/60 dark:text-paper/60 hover:bg-ink/5 dark:hover:bg-paper/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{channel.name}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}