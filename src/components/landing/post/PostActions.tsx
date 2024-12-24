import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface PostActionsProps {
  likes: number;
  comments: number;
  shares: number;
}

export function PostActions({ likes, comments, shares }: PostActionsProps) {
  return (
    <div className="flex items-center justify-end gap-6 text-paper/60">
      <button className="flex items-center gap-1.5 hover:text-sand transition-colors group">
        <Heart className="w-4 h-4 group-hover:fill-current" />
        <span className="text-xs">{likes}</span>
      </button>
      <button className="flex items-center gap-1.5 hover:text-sand transition-colors group">
        <MessageCircle className="w-4 h-4" />
        <span className="text-xs">{comments}</span>
      </button>
      <button className="flex items-center gap-1.5 hover:text-sand transition-colors group">
        <Share2 className="w-4 h-4" />
        <span className="text-xs">{shares}</span>
      </button>
    </div>
  );
}