import { Post } from '../types/post';

export const tribePosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Sarah',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      role: 'Event Host',
    },
    content: "Tea ceremony workshop was amazing! 🍵",
    image: 'https://github.com/OpalBridgeAi/Uploads/blob/main/Image%2012%20(24).jpg?raw=true',
    timestamp: new Date('2024-02-15T14:30:00'),
    likes: 42,
    comments: 12,
    shares: 5,
  },
  {
    id: '2',
    author: {
      name: 'David',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      role: 'Tribe Member',
    },
    content: 'Calligraphy meetup vibes 🖌️',
    image: 'https://github.com/OpalBridgeAi/Uploads/blob/main/Image%2012%20(25).jpg?raw=true',
    timestamp: new Date('2024-02-14T18:15:00'),
    likes: 38,
    comments: 8,
    shares: 3,
  },
  {
    id: '3',
    author: {
      name: 'Elena',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      role: 'Cultural Guide',
    },
    content: "Historic district tour highlights! 🏛️",
    image: 'https://github.com/OpalBridgeAi/Uploads/blob/main/Image%2012%20(8).jpg?raw=true',
    timestamp: new Date('2024-02-14T12:45:00'),
    likes: 56,
    comments: 15,
    shares: 7,
  },
];