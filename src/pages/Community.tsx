import React from 'react';
import { CommunityFeed } from '../components/community/CommunityFeed';
import { Button } from '../components/ui/Button';
import { Crown } from 'lucide-react';

export function Community() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink dark:text-paper">Community</h1>
          <p className="text-ink/60 dark:text-paper/60 mt-1">
            Connect with fellow cultural enthusiasts
          </p>
        </div>

        <Button variant="accent">
          <Crown className="w-4 h-4 mr-2" />
          Upgrade to Tribe
        </Button>
      </div>

      <CommunityFeed />
    </div>
  );
}