
import React from 'react';
import { Users, MapPin, CreditCard, UserCheck, TrendingUp, Calendar } from 'lucide-react';
import StatsCard from '../components/ui/StatsCard';
import DataTable from '../components/ui/DataTable';
import { Ground, User } from '../types';

// Mock data
const mockStats = {
  totalUsers: 1248,
  totalGrounds: 89,
  activeGrounds: 67,
  pendingRequests: 12,
  totalSubscriptions: 145,
  monthlyRevenue: 24650,
};

const recentGrounds: Ground[] = [
  {
    id: '1',
    name: 'City Sports Complex',
    description: 'Modern sports facility',
    ownerId: '1',
    ownerName: 'John Smith',
    location: 'Downtown',
    status: 'active',
    createdAt: '2024-01-15',
    slots: [],
  },
  {
    id: '2',
    name: 'Riverside Football Ground',
    description: 'Outdoor football field',
    ownerId: '2',
    ownerName: 'Sarah Johnson',
    location: 'Riverside',
    status: 'active',
    createdAt: '2024-01-14',
    slots: [],
  },
];

const recentUsers: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Smith',
    role: 'ground_owner',
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    email: 'sarah@example.com',
    name: 'Sarah Johnson',
    role: 'user',
    status: 'pending',
    createdAt: '2024-01-14',
  },
];

const Dashboard: React.FC = () => {
  const groundColumns = [
    { key: 'name', header: 'Ground Name' },
    { key: 'ownerName', header: 'Owner' },
    { key: 'location', header: 'Location' },
    {
      key: 'status',
      header: 'Status',
      render: (ground: Ground) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            ground.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {ground.status}
        </span>
      ),
    },
  ];

  const userColumns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    {
      key: 'role',
      header: 'Role',
      render: (user: User) => (
        <span className="capitalize">{user.role.replace('_', ' ')}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (user: User) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            user.status === 'active'
              ? 'bg-green-100 text-green-800'
              : user.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {user.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your sports ground management system.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatsCard
          title="Total Users"
          value={mockStats.totalUsers}
          change="+12% from last month"
          changeType="increase"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Total Grounds"
          value={mockStats.totalGrounds}
          change="+8% from last month"
          changeType="increase"
          icon={MapPin}
          color="green"
        />
        <StatsCard
          title="Active Grounds"
          value={mockStats.activeGrounds}
          change="75% of total"
          changeType="neutral"
          icon={TrendingUp}
          color="purple"
        />
        <StatsCard
          title="Pending Requests"
          value={mockStats.pendingRequests}
          change="Requires attention"
          changeType="decrease"
          icon={UserCheck}
          color="yellow"
        />
        <StatsCard
          title="Subscriptions"
          value={mockStats.totalSubscriptions}
          change="+15% from last month"
          changeType="increase"
          icon={CreditCard}
          color="blue"
        />
        <StatsCard
          title="Monthly Revenue"
          value={`$${mockStats.monthlyRevenue.toLocaleString()}`}
          change="+22% from last month"
          changeType="increase"
          icon={Calendar}
          color="green"
        />
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Grounds */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Grounds</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
          <DataTable data={recentGrounds} columns={groundColumns} />
        </div>

        {/* Recent Users */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Users</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
          <DataTable data={recentUsers} columns={userColumns} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
