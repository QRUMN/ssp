import React, { useState } from 'react';
import { 
  User, Shield, MoreVertical, Filter, Download, 
  UserPlus, Mail, Ban, Flag, CheckCircle 
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
  membershipTier: 'Nomad' | 'POW WOW' | 'TRIBE';
}

const mockUsers: UserData[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    status: 'active',
    joinDate: '2023-12-01',
    membershipTier: 'POW WOW'
  },
  // Add more mock users...
];

export function UsersPage() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleUserAction = async (action: 'suspend' | 'delete' | 'verify' | 'email', userId: string) => {
    // TODO: Implement user actions
    console.log(`${action} user ${userId}`);
  };

  const handleBulkAction = async (action: string) => {
    // TODO: Implement bulk actions
    console.log(`Bulk ${action} for users:`, selectedUsers);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500 bg-green-50 dark:bg-green-900/10';
      case 'suspended': return 'text-red-500 bg-red-50 dark:bg-red-900/10';
      case 'pending': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/10';
      default: return 'text-gray-500 bg-gray-50 dark:bg-gray-900/10';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-ink/60">Manage and monitor user accounts</p>
        </div>
        <Button 
          className="bg-gradient-to-r from-teal to-sand text-paper"
          onClick={() => handleBulkAction('invite')}
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Invite Users
        </Button>
      </div>

      {/* Filters and Actions */}
      <div className="glass-card p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4">
          <div className="glass-input flex items-center px-3 py-2 rounded-lg">
            <Filter className="w-5 h-5 text-ink/40 mr-2" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-transparent outline-none"
            >
              <option value="all">All Users</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <Button 
            className="glass-card glass-card-hover"
            onClick={() => handleBulkAction('export')}
          >
            <Download className="w-5 h-5 mr-2" />
            Export
          </Button>
        </div>

        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-input w-full px-4 py-2"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ink/10">
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers(mockUsers.map(u => u.id));
                    } else {
                      setSelectedUsers([]);
                    }
                  }}
                />
              </th>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Membership</th>
              <th className="p-4 text-left">Join Date</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id} className="border-b border-ink/10 hover:bg-ink/5">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers([...selectedUsers, user.id]);
                      } else {
                        setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                      }
                    }}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-teal" />
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-ink/60">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-ink/40" />
                    {user.role}
                  </div>
                </td>
                <td className="p-4">{user.membershipTier}</td>
                <td className="p-4">{new Date(user.joinDate).toLocaleDateString()}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Button
                      className="p-2 hover:bg-ink/5 rounded-lg"
                      onClick={() => handleUserAction('email', user.id)}
                    >
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button
                      className="p-2 hover:bg-ink/5 rounded-lg"
                      onClick={() => handleUserAction('suspend', user.id)}
                    >
                      <Ban className="w-4 h-4" />
                    </Button>
                    <Button
                      className="p-2 hover:bg-ink/5 rounded-lg"
                      onClick={() => handleUserAction('verify', user.id)}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button
                      className="p-2 hover:bg-ink/5 rounded-lg"
                      onClick={() => handleUserAction('flag', user.id)}
                    >
                      <Flag className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
