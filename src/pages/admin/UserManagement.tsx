import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  User,
  MoreVertical,
  Shield,
  Edit,
  Trash,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Button } from '../../components/ui/Button';

interface UserData {
  id: string;
  name: string;
  email: string;
  type: 'nomad' | 'powwow' | 'tribe';
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
  lastActive: string;
}

const mockUsers: UserData[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    type: 'powwow',
    status: 'active',
    joinDate: '2023-12-01',
    lastActive: '2023-12-26'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    type: 'tribe',
    status: 'active',
    joinDate: '2023-11-15',
    lastActive: '2023-12-25'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    type: 'nomad',
    status: 'suspended',
    joinDate: '2023-12-10',
    lastActive: '2023-12-20'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    type: 'powwow',
    status: 'pending',
    joinDate: '2023-12-24',
    lastActive: '2023-12-24'
  }
];

const filters = [
  { label: 'All Users', value: 'all' },
  { label: 'Nomad', value: 'nomad' },
  { label: 'Pow Wow', value: 'powwow' },
  { label: 'Tribe', value: 'tribe' }
];

export function UserManagement() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status: UserData['status']) => {
    switch (status) {
      case 'active':
        return 'text-green-500';
      case 'suspended':
        return 'text-red-500';
      case 'pending':
        return 'text-yellow-500';
      default:
        return 'text-ink/60';
    }
  };

  const getStatusIcon = (status: UserData['status']) => {
    switch (status) {
      case 'active':
        return CheckCircle;
      case 'suspended':
        return XCircle;
      case 'pending':
        return AlertTriangle;
      default:
        return CheckCircle;
    }
  };

  const filteredUsers = mockUsers.filter(user => {
    if (selectedFilter !== 'all' && user.type !== selectedFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <AdminLayout>
      {/* Header Actions */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-ink/10 bg-paper/5 focus:outline-none focus:border-teal"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-ink/60" />
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  selectedFilter === filter.value
                    ? 'bg-teal text-paper'
                    : 'hover:bg-ink/5'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <Button>
            Add User
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-paper/5 border border-ink/10 rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink/10">
                <th className="px-6 py-4 text-left text-sm font-medium text-ink/60">User</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-ink/60">Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-ink/60">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-ink/60">Join Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-ink/60">Last Active</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-ink/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const StatusIcon = getStatusIcon(user.status);
                return (
                  <tr
                    key={user.id}
                    className="border-b border-ink/10 hover:bg-ink/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-teal" />
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-ink/60">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal/10 text-teal">
                        {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center ${getStatusColor(user.status)}`}>
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-ink/60">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-ink/60">
                      {new Date(user.lastActive).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Shield className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
