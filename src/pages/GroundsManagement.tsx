
import React, { useState } from 'react';
import { MapPin, Calendar, DollarSign, Clock } from 'lucide-react';
import StatsCard from '../components/ui/StatsCard';
import DataTable from '../components/ui/DataTable';
import StatusBadge from '../components/ui/StatusBadge';
import { Ground } from '../types';

// Mock data
const mockGrounds: Ground[] = [
  {
    id: '1',
    name: 'City Sports Complex',
    description: 'Modern sports facility with multiple courts',
    ownerId: '1',
    ownerName: 'John Smith',
    location: 'Downtown District',
    status: 'active',
    createdAt: '2024-01-15',
    slots: [
      {
        id: '1',
        groundId: '1',
        startTime: '09:00',
        endTime: '10:00',
        price: 50,
        status: 'active',
        isActive: true,
        availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        bookings: [],
      },
    ],
  },
  {
    id: '2',
    name: 'Riverside Football Ground',
    description: 'Outdoor football field with natural grass',
    ownerId: '2',
    ownerName: 'Sarah Johnson',
    location: 'Riverside Park',
    status: 'active',
    createdAt: '2024-01-14',
    slots: [],
  },
  {
    id: '3',
    name: 'Indoor Basketball Court',
    description: 'Professional indoor basketball facility',
    ownerId: '1',
    ownerName: 'John Smith',
    location: 'Sports Center Mall',
    status: 'inactive',
    createdAt: '2024-01-13',
    slots: [],
  },
];

const GroundsManagement: React.FC = () => {
  const [grounds] = useState<Ground[]>(mockGrounds);

  const columns = [
    { key: 'name', header: 'Ground Name' },
    { key: 'ownerName', header: 'Owner' },
    { key: 'location', header: 'Location' },
    {
      key: 'status',
      header: 'Status',
      render: (ground: Ground) => <StatusBadge status={ground.status} />,
    },
    {
      key: 'slots',
      header: 'Slots',
      render: (ground: Ground) => (
        <span className="text-sm font-medium">{ground.slots.length}</span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (ground: Ground) => new Date(ground.createdAt).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (ground: Ground) => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800 text-sm">
            View
          </button>
          <button className="text-green-600 hover:text-green-800 text-sm">
            Edit
          </button>
          <button className="text-red-600 hover:text-red-800 text-sm">
            {ground.status === 'active' ? 'Deactivate' : 'Activate'}
          </button>
        </div>
      ),
    },
  ];

  const stats = {
    totalGrounds: grounds.length,
    activeGrounds: grounds.filter(g => g.status === 'active').length,
    totalSlots: grounds.reduce((sum, g) => sum + g.slots.length, 0),
    avgPricePerHour: 45,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Grounds Management</h1>
        <p className="text-gray-600">Manage sports grounds, slots, and availability</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Grounds"
          value={stats.totalGrounds}
          change="+8% from last month"
          changeType="increase"
          icon={MapPin}
          color="green"
        />
        <StatsCard
          title="Active Grounds"
          value={stats.activeGrounds}
          change="67% of total"
          changeType="neutral"
          icon={Calendar}
          color="blue"
        />
        <StatsCard
          title="Total Slots"
          value={stats.totalSlots}
          change="Available slots"
          changeType="neutral"
          icon={Clock}
          color="purple"
        />
        <StatsCard
          title="Avg. Price/Hour"
          value={`$${stats.avgPricePerHour}`}
          change="+12% this month"
          changeType="increase"
          icon={DollarSign}
          color="yellow"
        />
      </div>

      {/* Grounds Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">All Grounds</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Add New Ground
            </button>
          </div>
        </div>
        <div className="p-6">
          <DataTable data={grounds} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default GroundsManagement;
