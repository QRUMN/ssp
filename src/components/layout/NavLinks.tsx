import React from 'react';
import { Link } from 'react-router-dom';

export function NavLinks() {
  return (
    <div className="flex items-center space-x-8">
      <Link 
        to="/events" 
        className="text-ink text-opacity-80 hover:text-opacity-100 dark:text-paper dark:text-opacity-80 dark:hover:text-opacity-100 transition-colors relative group"
      >
        <span>Events</span>
        <span className="absolute inset-x-0 -bottom-1 h-px bg-teal dark:bg-sand scale-x-0 group-hover:scale-x-100 transition-transform" />
      </Link>
      <Link 
        to="/community" 
        className="text-ink text-opacity-80 hover:text-opacity-100 dark:text-paper dark:text-opacity-80 dark:hover:text-opacity-100 transition-colors relative group"
      >
        <span>Community</span>
        <span className="absolute inset-x-0 -bottom-1 h-px bg-teal dark:bg-sand scale-x-0 group-hover:scale-x-100 transition-transform" />
      </Link>
    </div>
  );
}