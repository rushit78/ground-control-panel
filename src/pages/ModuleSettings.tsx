
import React, { useState } from 'react';
import { Settings, ToggleLeft, ToggleRight, Users, MapPin, CreditCard, Search, Filter, MoreVertical, Eye, EyeOff } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import StatusBadge from '@/components/ui/StatusBadge';

interface ModuleSetting {
  id: string;
  name: string;
  description: string;
  isGloballyEnabled: boolean;
  icon: React.ComponentType<any>;
  usage?: {
    totalUsers: number;
    activeUsers: number;
    enabledUsers: number;
  };
  userSpecificSettings?: {
    userId: string;
    userName: string;
    userType: 'ground_owner' | 'user' | 'admin';
    isActive: boolean;
    isEnabled: boolean;
    lastActivity?: string;
  }[];
}

const ModuleSettings: React.FC = () => {
  const [modules, setModules] = useState<ModuleSetting[]>([
    {
      id: 'ground_management',
      name: 'Ground Management',
      description: 'Allow users to create and manage sports grounds',
      isGloballyEnabled: true,
      icon: MapPin,
      usage: { totalUsers: 4, activeUsers: 3, enabledUsers: 2 },
      userSpecificSettings: [
        { userId: '1', userName: 'John Smith', userType: 'ground_owner', isActive: true, isEnabled: true, lastActivity: '2 hours ago' },
        { userId: '2', userName: 'Sarah Johnson', userType: 'ground_owner', isActive: true, isEnabled: false, lastActivity: '1 day ago' },
        { userId: '3', userName: 'Mike Wilson', userType: 'ground_owner', isActive: false, isEnabled: true, lastActivity: '3 days ago' },
        { userId: '4', userName: 'Emma Davis', userType: 'ground_owner', isActive: true, isEnabled: true, lastActivity: '5 minutes ago' },
      ],
    },
    {
      id: 'subscription_module',
      name: 'Subscription Module',
      description: 'Enable subscription plans and premium features',
      isGloballyEnabled: true,
      icon: CreditCard,
      usage: { totalUsers: 3, activeUsers: 2, enabledUsers: 2 },
      userSpecificSettings: [
        { userId: '1', userName: 'John Smith', userType: 'ground_owner', isActive: true, isEnabled: true, lastActivity: '1 hour ago' },
        { userId: '2', userName: 'Sarah Johnson', userType: 'ground_owner', isActive: true, isEnabled: true, lastActivity: '2 hours ago' },
        { userId: '3', userName: 'Mike Wilson', userType: 'ground_owner', isActive: false, isEnabled: false, lastActivity: '1 week ago' },
      ],
    },
    {
      id: 'group_creation',
      name: 'Group Creation',
      description: 'Allow users to create and join groups',
      isGloballyEnabled: false,
      icon: Users,
      usage: { totalUsers: 0, activeUsers: 0, enabledUsers: 0 },
      userSpecificSettings: [],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showInactiveUsers, setShowInactiveUsers] = useState(true);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  const toggleGlobalModule = (moduleId: string) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, isGloballyEnabled: !module.isGloballyEnabled }
        : module
    ));
  };

  const toggleUserModule = (moduleId: string, userId: string) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? {
            ...module,
            userSpecificSettings: module.userSpecificSettings?.map(user =>
              user.userId === userId ? { ...user, isEnabled: !user.isEnabled } : user
            ) || []
          }
        : module
    ));
  };

  const toggleUserStatus = (moduleId: string, userId: string) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? {
            ...module,
            userSpecificSettings: module.userSpecificSettings?.map(user =>
              user.userId === userId ? { ...user, isActive: !user.isActive } : user
            ) || []
          }
        : module
    ));
  };

  const handleBulkAction = (action: 'enable' | 'disable' | 'activate' | 'deactivate', moduleId: string) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? {
            ...module,
            userSpecificSettings: module.userSpecificSettings?.map(user =>
              selectedUsers.includes(user.userId) 
                ? { 
                    ...user, 
                    isEnabled: action === 'enable' ? true : action === 'disable' ? false : user.isEnabled,
                    isActive: action === 'activate' ? true : action === 'deactivate' ? false : user.isActive
                  } 
                : user
            ) || []
          }
        : module
    ));
    setSelectedUsers([]);
  };

  const filteredUsers = (users: ModuleSetting['userSpecificSettings']) => {
    if (!users) return [];
    
    return users.filter(user => {
      const matchesSearch = user.userName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = showInactiveUsers || user.isActive;
      return matchesSearch && matchesFilter && user.userType === 'ground_owner';
    });
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = (moduleUsers: ModuleSetting['userSpecificSettings']) => {
    const filteredUserIds = filteredUsers(moduleUsers).map(user => user.userId);
    const allSelected = filteredUserIds.every(id => selectedUsers.includes(id));
    
    if (allSelected) {
      setSelectedUsers(prev => prev.filter(id => !filteredUserIds.includes(id)));
    } else {
      setSelectedUsers(prev => [...new Set([...prev, ...filteredUserIds])]);
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Module Settings</h1>
            <p className="text-gray-600">Control which modules are active globally and for specific users</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isMaintenanceMode ? "destructive" : "outline"}
                  onClick={() => setIsMaintenanceMode(!isMaintenanceMode)}
                  className="flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>{isMaintenanceMode ? 'Exit Maintenance' : 'Maintenance Mode'}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle system-wide maintenance mode</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {isMaintenanceMode && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-yellow-600" />
              <span className="text-yellow-800 font-medium">Maintenance Mode Active</span>
            </div>
            <p className="text-yellow-700 text-sm mt-1">All modules are temporarily disabled for system maintenance.</p>
          </div>
        )}

        {/* Global Module Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Global Module Controls</h2>
            <p className="text-sm text-gray-600 mt-1">
              These settings affect all users. Disabled modules cannot be used by anyone.
            </p>
          </div>
          <div className="p-6 space-y-4">
            {modules.map((module) => {
              const IconComponent = module.icon;
              const isDisabled = isMaintenanceMode;
              
              return (
                <div key={module.id} className={`p-4 border rounded-lg transition-all ${isDisabled ? 'opacity-60 bg-gray-50' : 'hover:shadow-sm'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <IconComponent className="w-6 h-6 text-gray-600" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900">{module.name}</h3>
                          {module.usage && (
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary" className="text-xs">
                                {module.usage.activeUsers}/{module.usage.totalUsers} active
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {module.usage.enabledUsers} enabled
                              </Badge>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={module.isGloballyEnabled && !isDisabled}
                              onCheckedChange={() => !isDisabled && toggleGlobalModule(module.id)}
                              disabled={isDisabled}
                            />
                            <span className={`text-sm font-medium ${
                              module.isGloballyEnabled && !isDisabled
                                ? 'text-green-600'
                                : 'text-gray-500'
                            }`}>
                              {module.isGloballyEnabled && !isDisabled ? 'Enabled' : 'Disabled'}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{module.isGloballyEnabled ? 'Click to disable globally' : 'Click to enable globally'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* User-Specific Settings - Ground Owners Only */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Ground Owner Module Controls</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Control module access for ground owners. Only applies to globally enabled modules.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowInactiveUsers(!showInactiveUsers)}
                      className="flex items-center space-x-2"
                    >
                      {showInactiveUsers ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      <span>{showInactiveUsers ? 'Hide' : 'Show'} Inactive</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{showInactiveUsers ? 'Hide inactive users' : 'Show inactive users'}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {modules
              .filter(module => module.isGloballyEnabled && !isMaintenanceMode && module.userSpecificSettings?.length)
              .map((module) => {
                const IconComponent = module.icon;
                const moduleUsers = filteredUsers(module.userSpecificSettings);
                
                if (moduleUsers.length === 0) {
                  return (
                    <div key={module.id} className="mb-6 last:mb-0">
                      <div className="flex items-center space-x-2 mb-3">
                        <IconComponent className="w-5 h-5 text-gray-600" />
                        <h3 className="font-medium text-gray-900">{module.name}</h3>
                      </div>
                      <div className="text-center py-8 text-gray-500">
                        <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No ground owners found matching your criteria</p>
                      </div>
                    </div>
                  );
                }

                const allFilteredSelected = moduleUsers.every(user => selectedUsers.includes(user.userId));
                const someFilteredSelected = moduleUsers.some(user => selectedUsers.includes(user.userId));

                return (
                  <div key={module.id} className="mb-6 last:mb-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <IconComponent className="w-5 h-5 text-gray-600" />
                        <h3 className="font-medium text-gray-900">{module.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {moduleUsers.length} users
                        </Badge>
                      </div>
                      
                      {selectedUsers.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{selectedUsers.length} selected</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleBulkAction('enable', module.id)}
                          >
                            Enable Selected
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleBulkAction('disable', module.id)}
                          >
                            Disable Selected
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleBulkAction('activate', module.id)}
                          >
                            Activate Selected
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                        <Checkbox
                          checked={allFilteredSelected}
                          onCheckedChange={() => handleSelectAll(module.userSpecificSettings)}
                          className="data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground"
                          {...(someFilteredSelected && !allFilteredSelected ? { 'data-state': 'indeterminate' } : {})}
                        />
                        <span className="text-sm font-medium text-gray-600">Select All</span>
                      </div>

                      {moduleUsers.map((userSetting) => (
                        <div
                          key={userSetting.userId}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              checked={selectedUsers.includes(userSetting.userId)}
                              onCheckedChange={() => handleSelectUser(userSetting.userId)}
                            />
                            
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-900">
                                  {userSetting.userName}
                                </span>
                                <StatusBadge 
                                  status={userSetting.isActive ? 'active' : 'inactive'} 
                                  size="sm"
                                />
                                {userSetting.isEnabled && (
                                  <Badge variant="secondary" className="text-xs">
                                    Module Enabled
                                  </Badge>
                                )}
                              </div>
                              {userSetting.lastActivity && (
                                <p className="text-xs text-gray-500">
                                  Last active: {userSetting.lastActivity}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    checked={userSetting.isActive}
                                    onCheckedChange={() => toggleUserStatus(module.id, userSetting.userId)}
                                    size="sm"
                                  />
                                  <span className="text-xs text-gray-600">Status</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Toggle user account status</p>
                              </TooltipContent>
                            </Tooltip>
                            
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    checked={userSetting.isEnabled}
                                    onCheckedChange={() => toggleUserModule(module.id, userSetting.userId)}
                                    size="sm"
                                  />
                                  <span className="text-xs text-gray-600">Access</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Toggle module access for this user</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            
            {modules.every(module => !module.isGloballyEnabled || isMaintenanceMode || !module.userSpecificSettings?.length) && (
              <div className="text-center py-12">
                <Settings className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Modules</h3>
                <p className="text-gray-600">
                  {isMaintenanceMode 
                    ? 'System is in maintenance mode. All modules are temporarily disabled.'
                    : 'Enable modules globally to manage user-specific settings.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ModuleSettings;
