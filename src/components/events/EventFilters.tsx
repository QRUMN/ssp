import React from 'react';
import { Search, Calendar, MapPin } from 'lucide-react';
import { Input } from '../ui/Input';

interface EventFiltersProps {
  onFilterChange: (filters: EventFilters) => void;
}

export interface EventFilters {
  search: string;
  date: string;
  location: string;
}

export function EventFilters({ onFilterChange }: EventFiltersProps) {
  const handleChange = (key: keyof EventFilters, value: string) => {
    onFilterChange({ search: '', date: '', location: '', [key]: value });
  };

  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
        <Input
          placeholder="Search events..."
          className="pl-10"
          onChange={(e) => handleChange('search', e.target.value)}
        />
      </div>
      
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
        <Input
          type="date"
          className="pl-10"
          onChange={(e) => handleChange('date', e.target.value)}
        />
      </div>
      
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
        <Input
          placeholder="Location..."
          className="pl-10"
          onChange={(e) => handleChange('location', e.target.value)}
        />
      </div>
    </div>
  );
}