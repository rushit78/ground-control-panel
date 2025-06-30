
import React, { useState } from 'react';
import { Settings, ToggleLeft, ToggleRight, Users, MapPin, CreditCard } from 'lucide-react';

interface ModuleSetting {
  id: string;
  name: string;
  description: string;
  isGloballyEnabled: boolean;
  icon: React.ComponentType<any>;
  userSpecificSettings?: {
    userId: string;
    userName: string;
    userType: 'ground_owner' | 'user' | 'admin';
    isActive: boolean;
    isEnabled: boolean;
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
      userSpecificSettings: [
        { userId: '1', userName: 'John Smith', userType: 'ground_owner', isActive: true, isEnabled: true },
        { userId: '2', userName: 'Sarah Johnson', userType: 'ground_owner', isActive: true, isEnabled: false },
        { userId: '3', userName: 'Mike Wilson', userType: 'ground_owner', isActive: false, isEnabled: true },
        { userId: '4', userName: 'Regular User', userType: 'user', isActive: true, isEnabled: false },
      ],
    },
    {
      id: 'subscription_module',
      name: 'Subscription Module',
      description: 'Enable subscription plans and premium features',
      isGloballyEnabled: true,
      icon: CreditCard,
      userSpecificSettings: [
        { userId: '1', userName: 'John Smith', userType: 'ground_owner', isActive: true, isEnabled: true },
        { userId: '2', userName: 'Sarah Johnson', userType: 'ground_owner', isActive: true, isEnabled: true },
        { userId: '3', userName: 'Mike Wilson', userType: 'ground_owner', isActive: false, isEnabled: false },
      ],
    },
    {
      id: 'group_creation',
      name: 'Group Creation',
      description: 'Allow users to create and join groups',
      isGloballyEnabled: false,
      icon: Users,
      userSpecificSettings: [],
    },
  ]);

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Module Settings</h1>
        <p className="text-gray-600">Control which modules are active globally and for specific users</p>
      </div>

      {/* Global Module Settings */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Global Module Controls</h2>
          <p className="text-sm text-gray-600 mt-1">
            These settings affect all users. Disabled modules cannot be used by anyone.
          </p>
        </div>
        <div className="p-6 space-y-4">
          {modules.map((module) => {
            const IconComponent = module.icon;
            return (
              <div key={module.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <IconComponent className="w-6 h-6 text-gray-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">{module.name}</h3>
                    <p className="text-sm text-gray-600">{module.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleGlobalModule(module.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    module.isGloballyEnabled
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {module.isGloballyEnabled ? (
                    <ToggleRight className="w-5 h-5" />
                  ) : (
                    <ToggleLeft className="w-5 h-5" />
                  )}
                  <span className="text-sm font-medium">
                    {module.isGloballyEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* User-Specific Settings - Ground Owners Only */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Ground Owner Module Controls</h2>
          <p className="text-sm text-gray-600 mt-1">
            Control module access for ground owners. Only applies to globally enabled modules.
          </p>
        </div>
        <div className="p-6">
          {modules
            .filter(module => module.isGloballyEnabled && module.userSpecificSettings?.length)
            .map((module) => {
              const IconComponent = module.icon;
              // Filter to show only ground owners
              const groundOwners = module.userSpecificSettings?.filter(user => user.userType === 'ground_owner') || [];
              
              if (groundOwners.length === 0) return null;

              return (
                <div key={module.id} className="mb-6 last:mb-0">
                  <div className="flex items-center space-x-2 mb-3">
                    <IconComponent className="w-5 h-5 text-gray-600" />
                    <h3 className="font-medium text-gray-900">{module.name}</h3>
                  </div>
                  <div className="space-y-2">
                    {groundOwners.map((userSetting) => (
                      <div
                        key={userSetting.userId}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-900">
                            {userSetting.userName}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            userSetting.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {userSetting.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {/* User Status Toggle */}
                          <button
                            onClick={() => toggleUserStatus(module.id, userSetting.userId)}
                            className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors ${
                              userSetting.isActive
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          >
                            {userSetting.isActive ? (
                              <ToggleRight className="w-3 h-3" />
                            ) : (
                              <ToggleLeft className="w-3 h-3" />
                            )}
                            <span>{userSetting.isActive ? 'Active' : 'Inactive'}</span>
                          </button>
                          
                          {/* Module Access Toggle */}
                          <button
                            onClick={() => toggleUserModule(module.id, userSetting.userId)}
                            className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors ${
                              userSetting.isEnabled
                                ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {userSetting.isEnabled ? (
                              <ToggleRight className="w-3 h-3" />
                            ) : (
                              <ToggleLeft className="w-3 h-3" />
                            )}
                            <span>{userSetting.isEnabled ? 'Enabled' : 'Disabled'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* System Maintenance */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">System Maintenance</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Settings className="w-6 h-6 text-yellow-600" />
              <div>
                <h3 className="font-medium text-yellow-900">Maintenance Mode</h3>
                <p className="text-sm text-yellow-700">
                  Disable all modules temporarily for system maintenance
                </p>
              </div>
            </div>
            <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
              Enable Maintenance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleSettings;
