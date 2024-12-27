import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Mail,
  Phone,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Upload,
  MessageCircle,
  Send,
  QrCode,
  Crown,
  AlertTriangle,
  Settings,
  MoreVertical,
  ChevronDown
} from 'lucide-react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Button } from '../../components/ui/Button';

interface Attendee {
  id: string;
  name: string;
  email: string;
  phone: string;
  ticketType: string;
  status: 'checked-in' | 'not-checked-in' | 'cancelled';
  checkInTime?: string;
  vipStatus: boolean;
  tableNumber?: string;
  specialRequests?: string;
  notes?: string;
  tags: string[];
}

const mockAttendees: Attendee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    ticketType: 'VIP',
    status: 'checked-in',
    checkInTime: '2023-12-26T19:30:00',
    vipStatus: true,
    tableNumber: 'A1',
    specialRequests: 'Vegetarian meal',
    notes: 'Frequent guest',
    tags: ['VIP', 'Regular']
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 (555) 234-5678',
    ticketType: 'General',
    status: 'not-checked-in',
    vipStatus: false,
    tags: ['First-time']
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1 (555) 345-6789',
    ticketType: 'Premium',
    status: 'cancelled',
    vipStatus: false,
    notes: 'Refund processed',
    tags: ['Cancelled']
  }
];

const filters = [
  { label: 'All Attendees', value: 'all' },
  { label: 'Checked In', value: 'checked-in' },
  { label: 'Not Checked In', value: 'not-checked-in' },
  { label: 'VIP', value: 'vip' },
  { label: 'Cancelled', value: 'cancelled' }
];

export function AttendeeManagement() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const getStatusColor = (status: Attendee['status']) => {
    switch (status) {
      case 'checked-in':
        return 'text-green-500 bg-green-500/10';
      case 'not-checked-in':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'cancelled':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-ink/60 bg-ink/10';
    }
  };

  const getStatusIcon = (status: Attendee['status']) => {
    switch (status) {
      case 'checked-in':
        return CheckCircle;
      case 'not-checked-in':
        return Clock;
      case 'cancelled':
        return XCircle;
      default:
        return AlertTriangle;
    }
  };

  const filteredAttendees = mockAttendees.filter(attendee => {
    if (selectedFilter === 'vip' && !attendee.vipStatus) return false;
    if (selectedFilter !== 'all' && selectedFilter !== 'vip' && attendee.status !== selectedFilter)
      return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        attendee.name.toLowerCase().includes(query) ||
        attendee.email.toLowerCase().includes(query) ||
        attendee.phone.includes(query)
      );
    }
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Attendee Management</h1>
            <p className="text-ink/60">
              Manage guest list and check-in process
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setShowQRScanner(true)}>
              <QrCode className="w-5 h-5 mr-2" />
              QR Scanner
            </Button>
            <Button>
              <UserPlus className="w-5 h-5 mr-2" />
              Add Attendee
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: 'Total Attendees',
              value: mockAttendees.length,
              icon: Users,
              color: 'text-teal'
            },
            {
              label: 'Checked In',
              value: mockAttendees.filter(a => a.status === 'checked-in').length,
              icon: CheckCircle,
              color: 'text-green-500'
            },
            {
              label: 'VIP Guests',
              value: mockAttendees.filter(a => a.vipStatus).length,
              icon: Crown,
              color: 'text-purple-500'
            },
            {
              label: 'Cancellations',
              value: mockAttendees.filter(a => a.status === 'cancelled').length,
              icon: XCircle,
              color: 'text-red-500'
            }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-paper/5 border border-ink/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ink/60">{stat.label}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-paper/10 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
            <input
              type="text"
              placeholder="Search attendees..."
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
            <div className="flex items-center space-x-2 border-l border-ink/10 pl-4">
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Attendee List */}
        <div className="bg-paper/5 border border-ink/10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink/10">
                <th className="px-6 py-4 text-left text-sm font-medium text-ink/60">
                  Attendee
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-ink/60">
                  Ticket
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-ink/60">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-ink/60">
                  Check-in Time
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-ink/60">
                  Table
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-ink/60">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendees.map((attendee) => {
                const StatusIcon = getStatusIcon(attendee.status);
                return (
                  <tr
                    key={attendee.id}
                    className="border-b border-ink/10 hover:bg-ink/5"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
                            {attendee.vipStatus ? (
                              <Crown className="w-5 h-5 text-purple-500" />
                            ) : (
                              <Users className="w-5 h-5 text-teal" />
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium flex items-center">
                            {attendee.name}
                            {attendee.vipStatus && (
                              <Star className="w-4 h-4 text-yellow-500 ml-1" />
                            )}
                          </div>
                          <div className="text-sm text-ink/60">
                            {attendee.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          attendee.ticketType === 'VIP'
                            ? 'bg-purple-500/10 text-purple-500'
                            : attendee.ticketType === 'Premium'
                            ? 'bg-teal/10 text-teal'
                            : 'bg-ink/10 text-ink/60'
                        }`}
                      >
                        {attendee.ticketType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          attendee.status
                        )}`}
                      >
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {attendee.status
                          .split('-')
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-ink/60">
                      {attendee.checkInTime
                        ? new Date(attendee.checkInTime).toLocaleTimeString()
                        : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {attendee.tableNumber || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedAttendee(attendee);
                            setShowMessageModal(true);
                          }}
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-ink/50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-paper rounded-xl p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">QR Code Scanner</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowQRScanner(false)}
              >
                <XCircle className="w-5 h-5" />
              </Button>
            </div>
            <div className="aspect-square bg-paper/10 rounded-lg mb-4">
              {/* QR Scanner Component would go here */}
              <div className="flex items-center justify-center h-full text-ink/60">
                Camera feed placeholder
              </div>
            </div>
            <p className="text-sm text-ink/60 text-center">
              Point the camera at the attendee's QR code to check them in
            </p>
          </motion.div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedAttendee && (
        <div className="fixed inset-0 bg-ink/50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-paper rounded-xl p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">
                Message {selectedAttendee.name}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMessageModal(false)}
              >
                <XCircle className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-ink/10 focus:border-teal focus:outline-none bg-paper/5"
                  placeholder="Type your message..."
                />
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded text-teal" />
                  <span className="text-sm">Send as SMS</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded text-teal" />
                  <span className="text-sm">Send as Email</span>
                </label>
              </div>
              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setShowMessageModal(false)}
                >
                  Cancel
                </Button>
                <Button>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}
