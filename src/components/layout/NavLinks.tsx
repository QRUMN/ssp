import React from 'react';
import { Link } from 'react-router-dom';

export function NavLinks() {
  return (
    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
      <Link 
        to="/events" 
        className="glass-card px-4 py-2 font-medium hover:scale-105 transition-transform"
      >
        Events
      </Link>
      <Link 
        to="/community" 
        className="glass-card px-4 py-2 font-medium hover:scale-105 transition-transform"
      >
        Community
      </Link>
    </div>
  );
}