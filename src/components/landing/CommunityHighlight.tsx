import React from 'react';
import { motion } from 'framer-motion';
import { Avatar } from '../ui/Avatar';

const members = [
  {
    name: 'Sarah K.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
  {
    name: 'David M.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  },
  {
    name: 'Elena R.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
  },
  {
    name: 'James L.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  },
  {
    name: 'Nina P.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
  },
];

export function CommunityHighlight() {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-semibold text-paper">Our Tribe</h2>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        className="flex flex-wrap justify-center gap-2"
      >
        {members.map((member) => (
          <Avatar
            key={member.name}
            src={member.avatar}
            alt={member.name}
            size="md"
            className="border-2 border-teal/20"
          />
        ))}
      </motion.div>

      <p className="text-paper/80">
        Join our growing tribe of cultural enthusiasts
      </p>
    </div>
  );
}