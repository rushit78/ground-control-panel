
import React, { useState } from 'react';
import { UserCheck, Clock, CheckCircle, XCircle } from 'lucide-react';
import StatsCard from '../components/ui/StatsCard';
import DataTable from '../components/ui/DataTable';
import StatusBadge from '../components/ui/StatusBadge';

interface UserRequest {
  id: string;
  userId: string;
  userName: string;
  email: string;
  requestType: 'ground_owner' | 'group_creation' | 'subscription_upgrade';
  status: 'pending' | 'approved' | 'rejected';
  requestData: any;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

// Mock data
const mockRequests: UserRequest[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Smith',
    email: 'john@example.com',
    requestType: 'ground_owner',
    status: 'pending',
    requestData: {
      groundName: 'City Sports Complex',
      location: 'Downtown',
      description: 'Modern sports facility',
    },
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    userId: '2',
    userName: 'Sarah Johnson',
    email: 'sarah@example.com',
    requestType: 'group_creation',
    status: 'approved',
    requestData: {
      groupName: 'Football Enthusiasts',
      description: 'Local football group',
    },
    createdAt: '2024-01-14',
    reviewedAt: '2024-01-15',
    reviewedBy: 'Admin',
  },
  {
    id: '3',
    userId: '3',
    userName: 'Mike Davis',
    email: 'mike@example.com',
    requestType: 'subscription_upgrade',
    status: 'rejected',
    requestData: {
      currentPlan: 'Basic',
      requestedPlan: 'Premium',
      reason: 'Need multiple ground management',
    },
    createdAt: '2024-01-13',
    reviewedAt: '2024-01-14',
    reviewedBy: 'Admin',
  },
];

const UserRequests: React.FC = () => {
  const [requests, setRequests] = useState<UserRequest[]>(mockRequests);

  const handleApprove = (requestId: string) => {
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { ...req, status: 'approved' as const, reviewedAt: new Date().toISOString(), reviewedBy: 'Admin' }
        : req
    ));
  };

  const handleReject = (requestId: string) => {
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { ...req, status: 'rejected' as const, reviewedAt: new Date().toISOString(), reviewedBy: 'Admin' }
        : req
    ));
  };

  const columns = [
    { key: 'userName', header: 'User' },
    { key: 'email', header: 'Email' },
    {
      key: 'requestType',
      header: 'Request Type',
      render: (req: UserRequest) => (
        <span className="capitalize font-medium">
          {req.requestType.replace('_', ' ')}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (req: UserRequest) => <StatusBadge status={req.status} />,
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (req: UserRequest) => new Date(req.createdAt).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (req: UserRequest) => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800 text-sm">
            View Details
          </button>
          {req.status === 'pending' && (
            <>
              <button 
                onClick={() => handleApprove(req.id)}
                className="text-green-600 hover:text-green-800 text-sm"
              >
                Approve
              </button>
              <button 
                onClick={() => handleReject(req.id)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Reject
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  const stats = {
    totalRequests: requests.length,
    pendingRequests: requests.filter(r => r.status === 'pending').length,
    approvedRequests: requests.filter(r => r.status === 'approved').length,
    rejectedRequests: requests.filter(r => r.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Requests</h1>
        <p className="text-gray-600">Review and manage user requests for ground ownership and group creation</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Requests"
          value={stats.totalRequests}
          change="+8 this week"
          changeType="increase"
          icon={UserCheck}
          color="blue"
        />
        <StatsCard
          title="Pending Review"
          value={stats.pendingRequests}
          change="Requires attention"
          changeType="decrease"
          icon={Clock}
          color="yellow"
        />
        <StatsCard
          title="Approved"
          value={stats.approvedRequests}
          change="This month"
          changeType="increase"
          icon={CheckCircle}
          color="green"
        />
        <StatsCard
          title="Rejected"
          value={stats.rejectedRequests}
          change="This month"
          changeType="neutral"
          icon={XCircle}
          color="red"
        />
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Requests</h2>
        </div>
        <div className="p-6">
          <DataTable data={requests} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default UserRequests;
