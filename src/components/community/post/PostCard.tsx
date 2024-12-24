import React from 'react';
import { format } from 'date-fns';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Post } from '../../../types/post';
import { Avatar } from '../../ui/Avatar';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-paper/5 rounded-lg border border-ink/10 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <Avatar 
            src={post.author.avatar} 
            alt={post.author.name}
            size="sm"
          />
          <div>
            <div className="font-medium">{post.author.name}</div>
            <div className="text-sm text-ink/60">{post.author.role}</div>
          </div>
        </div>

        <p className="mb-4">{post.content}</p>

        {post.image && (
          <img
            src={post.image}
            alt="Post content"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}

        <div className="flex items-center justify-between text-sm text-ink/60">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 hover:text-sand">
              <Heart className="w-4 h-4" />
              {post.likes}
            </button>
            <button className="flex items-center gap-1 hover:text-sand">
              <MessageCircle className="w-4 h-4" />
              {post.comments}
            </button>
            <button className="flex items-center gap-1 hover:text-sand">
              <Share2 className="w-4 h-4" />
              {post.shares}
            </button>
          </div>
          <time className="text-xs">
            {format(post.timestamp, 'MMM d')}
          </time>
        </div>
      </div>
    </div>
  );
}