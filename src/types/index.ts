
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'ground_owner' | 'user';
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  groupRequests?: GroupRequest[];
}

export interface GroupRequest {
  id: string;
  userId: string;
  groupName: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface Ground {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  ownerName: string;
  location: string;
  status: 'active' | 'inactive';
  createdAt: string;
  slots: GroundSlot[];
}

export interface GroundSlot {
  id: string;
  groundId: string;
  startTime: string;
  endTime: string;
  price: number;
  status: 'active' | 'inactive';
  availableDays: string[];
}

export interface Subscription {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in days
  features: string[];
  status: 'active' | 'inactive';
  maxGrounds: number;
  maxSlots: number;
}

export interface UserSubscription {
  id: string;
  userId: string;
  subscriptionId: string;
  status: 'active' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
}

export interface ModuleSettings {
  id: string;
  moduleName: string;
  isGloballyActive: boolean;
  userSpecificSettings: {
    userId: string;
    isActive: boolean;
  }[];
}

export interface DashboardStats {
  totalUsers: number;
  totalGrounds: number;
  activeGrounds: number;
  pendingRequests: number;
  totalSubscriptions: number;
  monthlyRevenue: number;
}
