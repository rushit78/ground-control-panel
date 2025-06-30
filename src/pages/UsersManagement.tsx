
import React, { useState } from 'react';
import { Users, UserPlus, Shield, Ban } from 'lucide-react';
import StatsCard from '../components/ui/StatsCard';
import DataTable from '../components/ui/DataTable';
import StatusBadge from '../components/ui/StatusBadge';
import { User } from '../types';

// Mock data
const mockUsers: User[] = [
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
  {
    id: '3',
    email: 'mike@example.com',
    name: 'Mike Davis',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-13',
  },
  {
    id: '4',
    email: 'emma@example.com',
    name: 'Emma Wilson',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-01-12',
  },
];

const UsersManagement: React.FC = () => {
  const [users] = useState<User[]>(mockUsers);

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    {
      key: 'role',
      header: 'Role',
      render: (user: User) => (
        <span className="capitalize font-medium">
          {user.role.replace('_', ' ')}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (user: User) => <StatusBadge status={user.status} />,
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (user: User) => new Date(user.createdAt).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (user: User) => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800 text-sm">
            Edit
          </button>
          <button className="text-red-600 hover:text-red-800 text-sm">
            {user.status === 'active' ? 'Suspend' : 'Activate'}
          </button>
        </div>
      ),
    },
  ];

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    pendingUsers: users.filter(u => u.status === 'pending').length,
    admins: users.filter(u => u.role === 'admin').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Users & Groups Management</h1>
        <p className="text-gray-600">Manage user accounts, roles, and permissions</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          change="+5% from last month"
          changeType="increase"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Active Users"
          value={stats.activeUsers}
          change="85% of total"
          changeType="neutral"
          icon={Shield}
          color="green"
        />
        <StatsCard
          title="Pending Approval"
          value={stats.pendingUsers}
          change="Requires attention"
          changeType="decrease"
          icon={UserPlus}
          color="yellow"
        />
        <StatsCard
          title="Administrators"
          value={stats.admins}
          change="System roles"
          changeType="neutral"
          icon={Ban}
          color="purple"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Add New User
            </button>
          </div>
        </div>
        <div className="p-6">
          <DataTable data={users} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
