import React from 'react';
import type { Post } from '../../../types/post';
import { PostHeader } from './PostHeader';
import { PostContent } from './PostContent';
import { PostActions } from './PostActions';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white dark:bg-paper/5 rounded-xl border border-ink/10 dark:border-paper/10 overflow-hidden hover:border-teal/20 dark:hover:border-sand/20 transition-colors h-full flex flex-col">
      <div className="p-4 flex flex-col flex-grow">
        <PostHeader author={post.author} timestamp={post.timestamp} />
        <PostContent content={post.content} image={post.image} />
        <div className="mt-auto pt-4">
          <PostActions likes={post.likes} comments={post.comments} shares={post.shares} />
        </div>
      </div>
    </div>
  );
}