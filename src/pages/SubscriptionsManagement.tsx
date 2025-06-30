
import React, { useState } from 'react';
import { CreditCard, Users, TrendingUp, Calendar } from 'lucide-react';
import StatsCard from '../components/ui/StatsCard';
import DataTable from '../components/ui/DataTable';
import StatusBadge from '../components/ui/StatusBadge';
import { UserSubscription } from '../types';

// Mock data for user subscriptions
const mockUserSubscriptions: UserSubscription[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Smith',
    subscriptionId: '1',
    planName: 'Premium',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    price: 99.99,
    features: ['Multiple Grounds', 'Priority Support', 'Analytics'],
    autoRenew: true,
  },
  {
    id: '2',
    userId: '2',
    userName: 'Sarah Johnson',
    subscriptionId: '2',
    planName: 'Basic',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-07-15',
    price: 29.99,
    features: ['Single Ground', 'Basic Support'],
    autoRenew: false,
  },
  {
    id: '3',
    userId: '3',
    userName: 'Mike Davis',
    subscriptionId: '1',
    planName: 'Premium',
    status: 'expired',
    startDate: '2023-06-01',
    endDate: '2023-12-01',
    price: 99.99,
    features: ['Multiple Grounds', 'Priority Support', 'Analytics'],
    autoRenew: false,
  },
];

const SubscriptionsManagement: React.FC = () => {
  const [subscriptions] = useState<UserSubscription[]>(mockUserSubscriptions);

  const columns = [
    { key: 'userName', header: 'User' },
    { key: 'planName', header: 'Plan' },
    {
      key: 'price',
      header: 'Price',
      render: (sub: UserSubscription) => `$${sub.price}`,
    },
    {
      key: 'status',
      header: 'Status',
      render: (sub: UserSubscription) => <StatusBadge status={sub.status} />,
    },
    {
      key: 'startDate',
      header: 'Start Date',
      render: (sub: UserSubscription) => new Date(sub.startDate).toLocaleDateString(),
    },
    {
      key: 'endDate',
      header: 'End Date',
      render: (sub: UserSubscription) => new Date(sub.endDate).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (sub: UserSubscription) => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800 text-sm">
            View
          </button>
          <button className="text-green-600 hover:text-green-800 text-sm">
            Renew
          </button>
          <button className="text-red-600 hover:text-red-800 text-sm">
            Cancel
          </button>
        </div>
      ),
    },
  ];

  const stats = {
    totalSubscriptions: subscriptions.length,
    activeSubscriptions: subscriptions.filter(s => s.status === 'active').length,
    monthlyRevenue: subscriptions
      .filter(s => s.status === 'active')
      .reduce((sum, s) => sum + s.price, 0),
    avgSubscriptionValue: 76.66,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subscriptions Management</h1>
        <p className="text-gray-600">Manage subscription plans and user subscriptions</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Subscriptions"
          value={stats.totalSubscriptions}
          change="+15% from last month"
          changeType="increase"
          icon={CreditCard}
          color="blue"
        />
        <StatsCard
          title="Active Subscriptions"
          value={stats.activeSubscriptions}
          change="67% of total"
          changeType="neutral"
          icon={Users}
          color="green"
        />
        <StatsCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toFixed(2)}`}
          change="+22% from last month"
          changeType="increase"
          icon={TrendingUp}
          color="purple"
        />
        <StatsCard
          title="Avg. Value"
          value={`$${stats.avgSubscriptionValue}`}
          change="Per subscription"
          changeType="neutral"
          icon={Calendar}
          color="yellow"
        />
      </div>

      {/* Subscription Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-2">Basic Plan</h3>
          <p className="text-3xl font-bold text-blue-600 mb-4">$29.99</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Single Ground</li>
            <li>• Basic Support</li>
            <li>• Standard Features</li>
          </ul>
          <button className="w-full mt-4 bg-gray-100 text-gray-800 py-2 rounded hover:bg-gray-200 transition-colors">
            Edit Plan
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Premium Plan</h3>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Popular</span>
          </div>
          <p className="text-3xl font-bold text-blue-600 mb-4">$99.99</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Multiple Grounds</li>
            <li>• Priority Support</li>
            <li>• Advanced Analytics</li>
            <li>• Custom Branding</li>
          </ul>
          <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
            Edit Plan
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-2">Enterprise</h3>
          <p className="text-3xl font-bold text-blue-600 mb-4">Custom</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Unlimited Grounds</li>
            <li>• Dedicated Support</li>
            <li>• White-label Solution</li>
            <li>• API Access</li>
          </ul>
          <button className="w-full mt-4 bg-gray-100 text-gray-800 py-2 rounded hover:bg-gray-200 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Active Subscriptions</h2>
        </div>
        <div className="p-6">
          <DataTable data={subscriptions} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsManagement;
