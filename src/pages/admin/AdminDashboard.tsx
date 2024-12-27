import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Building2,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  User,
  MessageSquare
} from 'lucide-react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Button } from '../../components/ui/Button';

const stats = [
  {
    title: 'Total Users',
    value: '2,543',
    change: '+12%',
    icon: Users,
    color: 'teal'
  },
  {
    title: 'Organizations',
    value: '128',
    change: '+8%',
    icon: Building2,
    color: 'sand'
  },
  {
    title: 'Active Events',
    value: '86',
    change: '+24%',
    icon: Calendar,
    color: 'teal'
  },
  {
    title: 'Revenue',
    value: '$45,678',
    change: '+18%',
    icon: TrendingUp,
    color: 'sand'
  }
];

const recentActivity = [
  {
    id: 1,
    type: 'user',
    message: 'New user registration: John Doe',
    time: '5 minutes ago',
    icon: User
  },
  {
    id: 2,
    type: 'security',
    message: 'Failed login attempt detected',
    time: '15 minutes ago',
    icon: AlertTriangle
  },
  {
    id: 3,
    type: 'event',
    message: 'New event created: Cultural Night Market',
    time: '1 hour ago',
    icon: Calendar
  },
  {
    id: 4,
    type: 'organization',
    message: 'New organization verified: Art Gallery XYZ',
    time: '2 hours ago',
    icon: CheckCircle2
  }
];

const pendingActions = [
  {
    id: 1,
    type: 'organization',
    title: 'Organization Verification',
    count: 12,
    icon: Building2
  },
  {
    id: 2,
    type: 'event',
    title: 'Event Approvals',
    count: 8,
    icon: Calendar
  },
  {
    id: 3,
    type: 'support',
    title: 'Support Tickets',
    count: 15,
    icon: MessageSquare
  },
  {
    id: 4,
    type: 'security',
    title: 'Security Alerts',
    count: 3,
    icon: Shield
  }
];

export function AdminDashboard() {
  return (
    <AdminLayout>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-xl bg-paper/5 border border-ink/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-${stat.color}/10`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}`} />
              </div>
              <span className="text-sm text-teal">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-sm text-ink/60">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 p-6 rounded-xl bg-paper/5 border border-ink/10"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Recent Activity</h2>
            <Button variant="ghost" size="sm">
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-ink/5 transition-colors"
              >
                <div className="p-2 rounded-lg bg-paper/10">
                  <activity.icon className="w-5 h-5 text-teal" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <span className="text-xs text-ink/60 flex items-center mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pending Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-paper/5 border border-ink/10"
        >
          <h2 className="text-lg font-bold mb-6">Pending Actions</h2>
          <div className="space-y-4">
            {pendingActions.map((action) => (
              <div
                key={action.id}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-ink/5 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-paper/10">
                    <action.icon className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <h3 className="font-medium">{action.title}</h3>
                    <p className="text-sm text-ink/60">{action.count} pending</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Review
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Button
          className="w-full justify-center py-6 bg-gradient-to-r from-teal to-sand text-paper"
        >
          <Shield className="w-5 h-5 mr-2" />
          Security Overview
        </Button>
        <Button
          className="w-full justify-center py-6 bg-gradient-to-r from-sand to-teal text-paper"
        >
          <Users className="w-5 h-5 mr-2" />
          Manage Users
        </Button>
        <Button
          className="w-full justify-center py-6 bg-gradient-to-r from-teal via-sand to-teal text-paper"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Event Management
        </Button>
      </motion.div>
    </AdminLayout>
  );
}
