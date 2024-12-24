import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { usePermissions } from '../../hooks/usePermissions';

export function EventHeader() {
  const { hasPermission } = usePermissions();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-paper/90">Upcoming Events</h1>
        <p className="text-paper/70 mt-1">
          Discover and join upcoming cultural experiences
        </p>
      </div>

      {hasPermission('create:events') && (
        <Button variant="accent">
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      )}
    </div>
  );
}