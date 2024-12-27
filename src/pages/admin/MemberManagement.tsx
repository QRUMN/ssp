import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Filter,
  Shield,
  Settings,
  MoreVertical,
  Clock,
  Activity,
  Mail,
  UserPlus,
  ChevronDown,
  Eye,
  Edit,
  Trash,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Button } from '../../components/ui/Button';

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'member';
  status: 'active' | 'inactive';
  joinDate: string;
  lastActive: string;
  recentActivity: {
    type: string;
    description: string;
    date: string;
  }[];
}

const mockMembers: Member[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    joinDate: '2023-11-15',
    lastActive: '2023-12-26',
    recentActivity: [
      {
        type: 'event',
        description: 'Created new event: Cultural Workshop',
        date: '2023-12-26'
      },
      {
        type: 'member',
        description: 'Updated member permissions',
        date: '2023-12-25'
      }
    ]
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'moderator',
    status: 'active',
    joinDate: '2023-12-01',
    lastActive: '2023-12-25',
    recentActivity: [
      {
        type: 'event',
        description: 'Approved event registration',
        date: '2023-12-25'
      }
    ]
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'member',
    status: 'inactive',
    joinDate: '2023-12-10',
    lastActive: '2023-12-20',
    recentActivity: []
  }
];

const roles = [
  { label: 'Admin', value: 'admin', description: 'Full access to all features' },
  { label: 'Moderator', value: 'moderator', description: 'Can manage content and members' },
  { label: 'Member', value: 'member', description: 'Basic access to organization features' }
];

const filters = [
  { label: 'All Members', value: 'all' },
  { label: 'Admins', value: 'admin' },
  { label: 'Moderators', value: 'moderator' },
  { label: 'Members', value: 'member' }
];

export function MemberManagement() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const getRoleColor = (role: Member['role']) => {
    switch (role) {
      case 'admin':
        return 'text-purple-500 bg-purple-500/10';
      case 'moderator':
        return 'text-blue-500 bg-blue-500/10';
      case 'member':
        return 'text-teal bg-teal/10';
      default:
        return 'text-ink/60 bg-ink/10';
    }
  };

  const filteredMembers = mockMembers.filter(member => {
    if (selectedFilter !== 'all' && member.role !== selectedFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
            <input
              type="text"
              placeholder="Search members..."
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
              <UserPlus className="w-5 h-5 mr-2" />
              Add Member
            </Button>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-paper/5 border border-ink/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ink/10">
                  <th className="px-6 py-4 text-left text-sm font-medium text-ink/60">Member</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-ink/60">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-ink/60">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-ink/60">Joined</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-ink/60">Last Active</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-ink/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="border-b border-ink/10 hover:bg-ink/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center">
                          <Users className="w-4 h-4 text-teal" />
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-ink/60">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(
                          member.role
                        )}`}
                      >
                        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center ${
                          member.status === 'active'
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                      >
                        {member.status === 'active' ? (
                          <CheckCircle className="w-4 h-4 mr-1" />
                        ) : (
                          <XCircle className="w-4 h-4 mr-1" />
                        )}
                        {member.status.charAt(0).toUpperCase() +
                          member.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-ink/60">
                      {new Date(member.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-ink/60">
                      {new Date(member.lastActive).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedMember(member)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowRoleModal(true)}
                        >
                          <Shield className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-paper/5 border border-ink/10 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {selectedMember ? (
              selectedMember.recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-ink/5"
                >
                  <div className="p-2 rounded-lg bg-teal/10">
                    <Activity className="w-4 h-4 text-teal" />
                  </div>
                  <div>
                    <p className="text-sm">{activity.description}</p>
                    <span className="text-xs text-ink/60">
                      {new Date(activity.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-ink/60 text-sm">
                Select a member to view their activity
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Role Assignment Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-ink/50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-paper rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h2 className="text-lg font-medium mb-4">Assign Role</h2>
            <div className="space-y-4">
              {roles.map((role) => (
                <button
                  key={role.value}
                  className="w-full p-4 rounded-lg border border-ink/10 hover:border-teal text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{role.label}</span>
                    <Shield className="w-5 h-5 text-teal" />
                  </div>
                  <p className="text-sm text-ink/60 mt-1">{role.description}</p>
                </button>
              ))}
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowRoleModal(false)}
              >
                Cancel
              </Button>
              <Button>Save Changes</Button>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}
