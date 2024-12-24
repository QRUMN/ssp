import React from 'react';
import { motion } from 'framer-motion';
import { PostCard } from './post/PostCard';
import { UpgradePrompt } from './UpgradePrompt';
import { useUser } from '../../hooks/useUser';
import { usePosts } from '../../hooks/usePosts';

export function CommunityFeed() {
  const { user } = useUser();
  const { posts, isLoading } = usePosts();
  const isFreeJawn = !user || user.membership_tier === 'free-jawn';
  const displayPosts = isFreeJawn ? posts?.slice(0, 2) : posts;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayPosts?.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>

      {isFreeJawn && <UpgradePrompt />}
    </div>
  );
}