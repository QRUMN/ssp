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
          <Link to="/" className="flex items-center space-x-2 hover-lift">
            <span className="text-xl font-bold text-gradient">Sondae</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <Link
                to="/profile"
                className="glass-effect-strong hover-lift hover-glow rounded-full px-4 py-2 flex items-center"
              >
                {user.user_metadata?.avatar_url && (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata?.full_name || 'User'}
                    className="h-8 w-8 rounded-full"
                  />
                )}
                <span className="ml-2 font-medium">
                  {user.user_metadata?.full_name || 'User'}
                </span>
              </Link>
            ) : (
              <Link
                to="/join"
                className="glass-effect-strong hover-lift hover-glow rounded-full px-6 py-2"
              >
                Join Now
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-ink/5 dark:hover:bg-paper/5"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass-dropdown p-4">
          <NavLinks />
        </div>
      )}
    </nav>
  );
}