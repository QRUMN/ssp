import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NavLinks } from './NavLinks';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useAuth } from '../../hooks/useAuth';

export function Navigation() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-navbar' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="glass-card px-4 py-2 flex items-center space-x-3 hover:scale-105 transition-transform"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal to-sand flex items-center justify-center">
              <span className="text-paper font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-teal to-sand bg-clip-text text-transparent">
              Sondae
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <NavLinks />
            <div className="h-6 w-px bg-ink bg-opacity-10 dark:bg-ink-dark dark:bg-opacity-10" />
            <ThemeToggle />
            {user ? (
              <Link
                to="/profile"
                className="glass-card flex items-center space-x-3 px-4 py-2 hover:scale-105 transition-transform"
              >
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata?.full_name || 'User'}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-teal bg-opacity-10 flex items-center justify-center">
                    <span className="text-teal font-medium">
                      {(user.user_metadata?.full_name || 'User').charAt(0)}
                    </span>
                  </div>
                )}
                <span className="font-medium">
                  {user.user_metadata?.full_name || 'User'}
                </span>
              </Link>
            ) : (
              <Link
                to="/join"
                className="glass-card px-6 py-2 font-medium hover:scale-105 transition-transform"
              >
                Join Now
              </Link>
            )}
          </div>

          <button
            className="md:hidden glass-card p-2 hover:scale-105 transition-transform"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass-card m-4 p-4 space-y-4">
          <NavLinks />
          <div className="flex items-center justify-between pt-4 border-t border-ink border-opacity-5 dark:border-ink-dark">
            <ThemeToggle />
            {!user && (
              <Link
                to="/join"
                className="glass-card px-6 py-2 font-medium hover:scale-105 transition-transform"
              >
                Join Now
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}