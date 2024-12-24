import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Home, Calendar, Users, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggle } from './ui/ThemeToggle';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const NavItem = ({ to, icon, label, active }: NavItemProps) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
      active
        ? 'bg-teal text-paper'
        : 'text-ink/60 hover:bg-ink/5 hover:text-ink'
    }`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export function Layout() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="flex h-screen">
        {/* Sidebar */}
        <nav className="w-64 bg-paper border-r border-ink/10 p-4 space-y-4">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-xl font-bold text-teal">Sondae Service</span>
            <ThemeToggle />
          </div>
          
          <div className="space-y-2">
            <NavItem
              to="/home"
              icon={<Home size={20} />}
              label="Home"
              active={location.pathname === '/home'}
            />
            <NavItem
              to="/events"
              icon={<Calendar size={20} />}
              label="Events"
              active={location.pathname === '/events'}
            />
            <NavItem
              to="/community"
              icon={<Users size={20} />}
              label="Community"
              active={location.pathname === '/community'}
            />
            <NavItem
              to="/profile"
              icon={<User size={20} />}
              label="Profile"
              active={location.pathname === '/profile'}
            />
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-paper">
          <div className="p-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}