import React from 'react';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

const onlineMembers = [
  { id: '1', name: 'Sarah K.', role: 'Host', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
  { id: '2', name: 'David M.', role: 'Member', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
  { id: '3', name: 'Elena R.', role: 'Guide', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' },
];

export function CommunityMembers() {
  return (
    <Card className="p-4 h-fit">
      <h2 className="text-lg font-semibold text-ink dark:text-paper mb-4">Online Members</h2>
      <div className="space-y-3">
        {onlineMembers.map((member) => (
          <div key={member.id} className="flex items-center gap-3">
            <div className="relative">
              <Avatar src={member.avatar} alt={member.name} size="sm" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-teal dark:bg-sand rounded-full ring-2 ring-paper" />
            </div>
            <div>
              <div className="text-sm font-medium text-ink dark:text-paper">{member.name}</div>
              <Badge variant="secondary" className="mt-0.5">{member.role}</Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}