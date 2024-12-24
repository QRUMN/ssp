import React from 'react';
import { motion } from 'framer-motion';
import { tribePosts } from '../../types/post';
import { PostCard } from './post/PostCard';

export function TribeFeed() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-paper">Tribe Activity</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tribePosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="w-full"
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}