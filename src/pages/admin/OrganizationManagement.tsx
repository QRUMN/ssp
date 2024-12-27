import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Search,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  MoreVertical,
  Users,
  Settings,
  Calendar,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Button } from '../../components/ui/Button';

interface Organization {
  id: string;
  name: string;
  type: string;
  status: 'verified' | 'pending' | 'rejected';
  memberCount: number;
  eventCount: number;
  joinDate: string;
  lastActive: string;
  verificationProgress: number;
}

const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'Cultural Arts Center',
    type: 'Arts & Culture',
    status: 'verified',
    memberCount: 250,
    eventCount: 45,
    joinDate: '2023-11-15',
    lastActive: '2023-12-26',
    verificationProgress: 100
  },
  {
    id: '2',
    name: 'Heritage Foundation',
    type: 'Non-Profit',
    status: 'pending',
    memberCount: 120,
    eventCount: 12,
    joinDate: '2023-12-01',
    lastActive: '2023-12-25',
    verificationProgress: 75
  },
  {
    id: '3',
    name: 'Global Traditions Institute',
    type: 'Education',
    status: 'rejected',
    memberCount: 0,
    eventCount: 0,
    joinDate: '2023-12-20',
    lastActive: '2023-12-20',
    verificationProgress: 30
  }
];

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Verified', value: 'verified' },
  { label: 'Pending', value: 'pending' },
  { label: 'Rejected', value: 'rejected' }
];

export function OrganizationManagement() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

  const getStatusIcon = (status: Organization['status']) => {
    switch (status) {
      case 'verified':
        return CheckCircle;
      case 'pending':
        return Clock;
      case 'rejected':
        return XCircle;
      default:
        return AlertTriangle;
    }
  };

  const getStatusColor = (status: Organization['status']) => {
    switch (status) {
      case 'verified':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'rejected':
        return 'text-red-500';
      default:
        return 'text-ink/60';
    }
  };

  const filteredOrganizations = mockOrganizations.filter(org => {
    if (selectedFilter !== 'all' && org.status !== selectedFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return org.name.toLowerCase().includes(query);
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
            placeholder="Search organizations..."
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
            Add Organization
          </Button>
        </div>
      </div>

      {/* Organizations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrganizations.map((org) => {
          const StatusIcon = getStatusIcon(org.status);
          return (
            <motion.div
              key={org.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-paper/5 border border-ink/10 rounded-xl overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-lg">{org.name}</h3>
                    <p className="text-sm text-ink/60">{org.type}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`flex items-center ${getStatusColor(org.status)}`}>
                      <StatusIcon className="w-4 h-4 mr-1" />
                      {org.status.charAt(0).toUpperCase() + org.status.slice(1)}
                    </span>
                    {org.status === 'pending' && (
                      <span className="text-sm text-ink/60">
                        {org.verificationProgress}% complete
                      </span>
                    )}
                  </div>

                  {org.status === 'pending' && (
                    <div className="w-full bg-ink/10 rounded-full h-2">
                      <div
                        className="bg-teal h-2 rounded-full"
                        style={{ width: `${org.verificationProgress}%` }}
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-ink/60">
                        <Users className="w-4 h-4 mr-1" />
                        Members
                      </div>
                      <p className="font-medium">{org.memberCount}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-ink/60">
                        <Calendar className="w-4 h-4 mr-1" />
                        Events
                      </div>
                      <p className="font-medium">{org.eventCount}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-ink/10 p-4 bg-ink/5">
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="ghost" size="sm" className="w-full">
                    <Users className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full">
                    <Shield className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </AdminLayout>
  );
}
