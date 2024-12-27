import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  Download,
  Share,
  Filter,
  Clock,
  Target,
  BarChart2,
  PieChart,
  LineChart,
  Map,
  Globe,
  Smartphone,
  Laptop,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Button } from '../../components/ui/Button';

interface AnalyticsData {
  totalRevenue: number;
  totalAttendees: number;
  averageTicketPrice: number;
  soldOutEvents: number;
  revenueByTicketType: {
    type: string;
    revenue: number;
    percentage: number;
  }[];
  attendanceByTime: {
    time: string;
    count: number;
  }[];
  salesByChannel: {
    channel: string;
    sales: number;
    percentage: number;
  }[];
  deviceBreakdown: {
    device: string;
    percentage: number;
  }[];
  socialMediaStats: {
    platform: string;
    shares: number;
    clicks: number;
    conversions: number;
  }[];
  topEvents: {
    name: string;
    revenue: number;
    attendees: number;
    status: string;
  }[];
}

const mockAnalytics: AnalyticsData = {
  totalRevenue: 150000,
  totalAttendees: 2500,
  averageTicketPrice: 60,
  soldOutEvents: 5,
  revenueByTicketType: [
    { type: 'VIP', revenue: 75000, percentage: 50 },
    { type: 'Premium', revenue: 45000, percentage: 30 },
    { type: 'General', revenue: 30000, percentage: 20 }
  ],
  attendanceByTime: [
    { time: '18:00', count: 100 },
    { time: '19:00', count: 300 },
    { time: '20:00', count: 500 },
    { time: '21:00', count: 400 },
    { time: '22:00', count: 200 }
  ],
  salesByChannel: [
    { channel: 'Website', sales: 1500, percentage: 60 },
    { channel: 'Mobile App', sales: 750, percentage: 30 },
    { channel: 'Partners', sales: 250, percentage: 10 }
  ],
  deviceBreakdown: [
    { device: 'Mobile', percentage: 65 },
    { device: 'Desktop', percentage: 30 },
    { device: 'Tablet', percentage: 5 }
  ],
  socialMediaStats: [
    {
      platform: 'Instagram',
      shares: 1200,
      clicks: 800,
      conversions: 150
    },
    {
      platform: 'Facebook',
      shares: 800,
      clicks: 600,
      conversions: 100
    },
    {
      platform: 'Twitter',
      shares: 400,
      clicks: 300,
      conversions: 50
    }
  ],
  topEvents: [
    {
      name: "New Year's Eve Gala",
      revenue: 50000,
      attendees: 500,
      status: 'Upcoming'
    },
    {
      name: 'Summer Music Festival',
      revenue: 35000,
      attendees: 700,
      status: 'Completed'
    },
    {
      name: 'Tech Conference 2024',
      revenue: 25000,
      attendees: 300,
      status: 'Upcoming'
    }
  ]
};

const timeRanges = [
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Last 3 Months', value: '3m' },
  { label: 'Last Year', value: '1y' },
  { label: 'All Time', value: 'all' }
];

export function EventAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const getMetricChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      trend: change >= 0 ? 'up' : 'down'
    };
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Event Analytics</h1>
            <p className="text-ink/60">
              Track your event performance and insights
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 rounded-lg border border-ink/10 bg-paper/5 focus:outline-none focus:border-teal"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: 'Total Revenue',
              value: `$${mockAnalytics.totalRevenue.toLocaleString()}`,
              change: getMetricChange(150000, 120000),
              icon: DollarSign,
              color: 'text-green-500'
            },
            {
              label: 'Total Attendees',
              value: mockAnalytics.totalAttendees.toLocaleString(),
              change: getMetricChange(2500, 2000),
              icon: Users,
              color: 'text-teal'
            },
            {
              label: 'Average Ticket Price',
              value: `$${mockAnalytics.averageTicketPrice}`,
              change: getMetricChange(60, 55),
              icon: TrendingUp,
              color: 'text-blue-500'
            },
            {
              label: 'Sold Out Events',
              value: mockAnalytics.soldOutEvents.toString(),
              change: getMetricChange(5, 3),
              icon: Calendar,
              color: 'text-purple-500'
            }
          ].map((metric, index) => (
            <div
              key={index}
              className="bg-paper/5 border border-ink/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-paper/10 ${metric.color}`}>
                  <metric.icon className="w-6 h-6" />
                </div>
                <div
                  className={`flex items-center text-sm ${
                    metric.change.trend === 'up'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {metric.change.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDown className="w-4 h-4 mr-1" />
                  )}
                  {metric.change.value}%
                </div>
              </div>
              <p className="text-sm text-ink/60">{metric.label}</p>
              <p className="text-2xl font-semibold mt-1">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Revenue Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue by Ticket Type */}
          <div className="bg-paper/5 border border-ink/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-medium">Revenue by Ticket Type</h2>
              <Button variant="ghost" size="sm">
                <PieChart className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
            <div className="space-y-4">
              {mockAnalytics.revenueByTicketType.map((type, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>{type.type}</span>
                    <span className="font-medium">
                      ${type.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-ink/10 rounded-full h-2">
                    <div
                      className="bg-teal h-2 rounded-full"
                      style={{ width: `${type.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sales by Channel */}
          <div className="bg-paper/5 border border-ink/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-medium">Sales by Channel</h2>
              <Button variant="ghost" size="sm">
                <BarChart2 className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
            <div className="space-y-4">
              {mockAnalytics.salesByChannel.map((channel, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>{channel.channel}</span>
                    <span className="font-medium">
                      {channel.sales.toLocaleString()} sales
                    </span>
                  </div>
                  <div className="w-full bg-ink/10 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${channel.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Attendance Trends */}
        <div className="bg-paper/5 border border-ink/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-medium">Attendance Trends</h2>
            <div className="flex items-center space-x-4">
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-1 rounded-lg border border-ink/10 bg-paper/5 text-sm"
              >
                <option value="revenue">Revenue</option>
                <option value="attendees">Attendees</option>
                <option value="tickets">Tickets</option>
              </select>
              <Button variant="ghost" size="sm">
                <LineChart className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
          </div>
          <div className="h-64 relative">
            {/* Chart would go here */}
            <div className="absolute inset-0 flex items-center justify-center text-ink/60">
              Attendance trend chart placeholder
            </div>
          </div>
        </div>

        {/* Marketing Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Device Breakdown */}
          <div className="bg-paper/5 border border-ink/10 rounded-xl p-6">
            <h2 className="font-medium mb-6">Device Breakdown</h2>
            <div className="space-y-4">
              {mockAnalytics.deviceBreakdown.map((device, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <div className="flex items-center">
                      {device.device === 'Mobile' ? (
                        <Smartphone className="w-4 h-4 mr-2" />
                      ) : device.device === 'Desktop' ? (
                        <Laptop className="w-4 h-4 mr-2" />
                      ) : (
                        <Globe className="w-4 h-4 mr-2" />
                      )}
                      {device.device}
                    </div>
                    <span>{device.percentage}%</span>
                  </div>
                  <div className="w-full bg-ink/10 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${device.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media Performance */}
          <div className="bg-paper/5 border border-ink/10 rounded-xl p-6">
            <h2 className="font-medium mb-6">Social Media Performance</h2>
            <div className="space-y-6">
              {mockAnalytics.socialMediaStats.map((platform, index) => (
                <div key={index}>
                  <div className="flex items-center mb-4">
                    {platform.platform === 'Instagram' ? (
                      <Instagram className="w-5 h-5 text-pink-500 mr-2" />
                    ) : platform.platform === 'Facebook' ? (
                      <Facebook className="w-5 h-5 text-blue-500 mr-2" />
                    ) : (
                      <Twitter className="w-5 h-5 text-sky-500 mr-2" />
                    )}
                    <span className="font-medium">{platform.platform}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Shares', value: platform.shares },
                      { label: 'Clicks', value: platform.clicks },
                      {
                        label: 'Conversions',
                        value: platform.conversions
                      }
                    ].map((stat, statIndex) => (
                      <div key={statIndex} className="text-center">
                        <div className="text-lg font-medium">
                          {stat.value.toLocaleString()}
                        </div>
                        <div className="text-sm text-ink/60">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Events */}
        <div className="bg-paper/5 border border-ink/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-medium">Top Performing Events</h2>
            <Button variant="ghost" size="sm">
              View All Events
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ink/10">
                  <th className="px-6 py-3 text-left text-sm font-medium text-ink/60">
                    Event Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-ink/60">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-ink/60">
                    Attendees
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-ink/60">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockAnalytics.topEvents.map((event, index) => (
                  <tr key={index} className="border-b border-ink/10">
                    <td className="px-6 py-4">
                      <div className="font-medium">{event.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      ${event.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {event.attendees.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          event.status === 'Upcoming'
                            ? 'bg-teal/10 text-teal'
                            : 'bg-ink/10 text-ink/60'
                        }`}
                      >
                        {event.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
