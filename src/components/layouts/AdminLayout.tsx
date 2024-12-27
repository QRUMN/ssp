import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { ThemeToggle } from '../ui/ThemeToggle';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  Bell,
  LogOut,
  Building2,
  MessageSquare,
  BarChart,
  Shield
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const NavItem = ({ to, icon: Icon, label, active }: NavItemProps) => (
  <Link
    to={to}
    className={`
      flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors
      ${active 
        ? 'bg-teal text-paper' 
        : 'text-ink/60 hover:bg-ink/5 hover:text-ink'
      }
    `}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </Link>
);

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const { signOut } = useAuth();

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/organizations', icon: Building2, label: 'Organizations' },
    { to: '/admin/events', icon: Calendar, label: 'Events' },
    { to: '/admin/messages', icon: MessageSquare, label: 'Messages' },
    { to: '/admin/analytics', icon: BarChart, label: 'Analytics' },
    { to: '/admin/security', icon: Shield, label: 'Security' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-paper">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 border-r border-ink/10 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-8 px-4">
            <Link to="/admin" className="flex items-center space-x-2">
              <Logo className="w-8 h-8" />
              <span className="font-bold text-lg">Admin</span>
            </Link>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                active={location.pathname === item.to}
              />
            ))}
          </nav>

          <div className="pt-4 border-t border-ink/10 space-y-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              onClick={signOut}
              className="w-full justify-start text-red-500 hover:text-red-600"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <header className="h-16 border-b border-ink/10 px-6 flex items-center justify-between sticky top-0 bg-paper/80 backdrop-blur-md">
            <h1 className="text-xl font-bold">
              {navItems.find(item => item.to === location.pathname)?.label || 'Admin'}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-ink/5">
                <Bell className="w-5 h-5" />
              </button>
              <div className="h-6 w-px bg-ink/10" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-teal" />
                </div>
                <div className="text-sm">
                  <div className="font-medium">Admin User</div>
                  <div className="text-ink/60">Super Admin</div>
                </div>
              </div>
            </div>
          </header>

          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
