import React from 'react';
import { format } from 'date-fns';
import { Avatar } from '../../ui/Avatar';

interface PostHeaderProps {
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  timestamp: Date;
}

export function PostHeader({ author, timestamp }: PostHeaderProps) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <Avatar
        src={author.avatar}
        alt={author.name}
        size="sm"
      />
      <div>
        <div className="flex items-baseline gap-2">
          <h3 className="font-medium text-paper text-sm">{author.name}</h3>
          <span className="text-xs text-paper/60">
            {format(timestamp, 'MMM d')}
          </span>
        </div>
        <p className="text-xs text-teal">{author.role}</p>
      </div>
    </div>
  );
}