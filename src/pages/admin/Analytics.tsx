import React, { useState } from 'react';
import {
  BarChart3, TrendingUp, Users, Calendar,
  DollarSign, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock data for charts
const userGrowthData = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1900 },
  { month: 'Mar', users: 2400 },
  { month: 'Apr', users: 2800 },
  { month: 'May', users: 3500 },
  { month: 'Jun', users: 4100 },
];

const eventMetricsData = [
  { name: 'Cultural', value: 45 },
  { name: 'Educational', value: 25 },
  { name: 'Social', value: 20 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#005A71', '#FEF0AD', '#1E1D16', '#FFE980'];

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    {
      label: 'Total Revenue',
      value: '$24,320',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign
    },
    {
      label: 'Active Users',
      value: '3,240',
      change: '+8.2%',
      trend: 'up',
      icon: Users
    },
    {
      label: 'Events Created',
      value: '182',
      change: '-2.4%',
      trend: 'down',
      icon: Calendar
    },
    {
      label: 'Engagement Rate',
      value: '64.8%',
      change: '+5.3%',
      trend: 'up',
      icon: TrendingUp
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-ink/60">Monitor platform performance and trends</p>
        </div>
        <div className="flex gap-2">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <Button
              key={range}
              className={`px-4 py-2 rounded-lg ${
                timeRange === range
                  ? 'bg-gradient-to-r from-teal to-sand text-paper'
                  : 'glass-card glass-card-hover'
              }`}
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-teal" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-ink/60">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6">User Growth</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(30, 29, 22, 0.1)" />
                <XAxis dataKey="month" stroke="rgba(30, 29, 22, 0.5)" />
                <YAxis stroke="rgba(30, 29, 22, 0.5)" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(247, 247, 247, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#005A71"
                  strokeWidth={2}
                  dot={{ fill: '#005A71' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Event Distribution Chart */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6">Event Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={eventMetricsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {eventMetricsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'rgba(247, 247, 247, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6">Engagement Metrics</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(30, 29, 22, 0.1)" />
                <XAxis dataKey="month" stroke="rgba(30, 29, 22, 0.5)" />
                <YAxis stroke="rgba(30, 29, 22, 0.5)" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(247, 247, 247, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="users" fill="#FEF0AD" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Analytics */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6">Revenue Analytics</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(30, 29, 22, 0.1)" />
                <XAxis dataKey="month" stroke="rgba(30, 29, 22, 0.5)" />
                <YAxis stroke="rgba(30, 29, 22, 0.5)" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(247, 247, 247, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#1E1D16"
                  strokeWidth={2}
                  dot={{ fill: '#1E1D16' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
