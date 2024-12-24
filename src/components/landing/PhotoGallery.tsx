import React from 'react';
import { motion } from 'framer-motion';

const photos = [
  {
    url: 'https://github.com/OpalBridgeAi/Uploads/blob/main/Image%2012%20(17).jpg?raw=true',
    alt: 'Traditional tea ceremony',
  },
  {
    url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186',
    alt: 'Cultural festival',
  },
  {
    url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b',
    alt: 'Traditional dance performance',
  },
  {
    url: 'https://images.unsplash.com/photo-1545048702-79362596cdc9',
    alt: 'Community gathering',
  },
];

export function PhotoGallery() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-paper">Moments</h2>

      <div className="grid grid-cols-2 gap-4">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.url}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative group aspect-square overflow-hidden rounded-lg"
          >
            <img
              src={photo.url}
              alt={photo.alt}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}