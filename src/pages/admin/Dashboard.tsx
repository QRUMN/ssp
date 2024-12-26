import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import {
  Users,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
  Filter,
} from 'lucide-react';

interface MenuItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

const menuItems: MenuItem[] = [
  { name: 'Users', icon: Users, path: '/admin/users' },
  { name: 'Events', icon: Calendar, path: '/admin/events' },
  { name: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
  { name: 'Settings', icon: Settings, path: '/admin/settings' },
];

export function AdminDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Mock data for the dashboard
  const stats = [
    { label: 'Total Users', value: '2,451' },
    { label: 'Active Events', value: '186' },
    { label: 'New Members', value: '+123' },
    { label: 'Revenue', value: '$12.4k' },
  ];

  return (
    <div className="min-h-screen bg-paper flex">
      {/* Sidebar */}
      <aside className="w-64 bg-paper border-r border-ink/10 p-4">
        <div className="flex items-center gap-2 mb-8">
          <Logo className="w-8 h-8" />
          <span className="font-bold text-lg">Admin</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg mt-8 w-full"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="glass-navbar sticky top-0 z-10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-input w-full pl-10 pr-4 py-2"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button className="glass-card glass-card-hover">
              <Filter className="w-5 h-5" />
            </Button>
            <Button className="glass-card glass-card-hover">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card p-6">
                <div className="text-ink/60 text-sm">{stat.label}</div>
                <div className="text-2xl font-bold mt-2">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Recent Activity</h2>
              <Button className="bg-gradient-to-r from-teal to-sand text-paper">
                <Plus className="w-5 h-5" />
                Add New
              </Button>
            </div>

            <div className="space-y-4">
              {/* Activity items would go here */}
              <div className="glass-card p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-teal" />
                  </div>
                  <div>
                    <div className="font-medium">New User Registration</div>
                    <div className="text-sm text-ink/60">John Doe joined the platform</div>
                  </div>
                  <div className="ml-auto text-sm text-ink/60">2 min ago</div>
                </div>
              </div>

              <div className="glass-card p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-sand/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-sand" />
                  </div>
                  <div>
                    <div className="font-medium">New Event Created</div>
                    <div className="text-sm text-ink/60">Cultural Festival 2024 was created</div>
                  </div>
                  <div className="ml-auto text-sm text-ink/60">1 hour ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
