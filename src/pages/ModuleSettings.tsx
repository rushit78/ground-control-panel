import React, { useState } from 'react';
import { Settings, ToggleLeft, ToggleRight, Users, MapPin, CreditCard, Search, Filter, MoreVertical, Eye, EyeOff, Palette, Check } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

// Color themes
const colorThemes = [
  { name: 'Blue', primary: '#3B82F6', secondary: '#EFF6FF', accent: '#1E40AF' },
  { name: 'Green', primary: '#10B981', secondary: '#ECFDF5', accent: '#047857' },
  { name: 'Purple', primary: '#8B5CF6', secondary: '#F3E8FF', accent: '#6D28D9' },
  { name: 'Orange', primary: '#F97316', secondary: '#FFF7ED', accent: '#C2410C' },
  { name: 'Pink', primary: '#EC4899', secondary: '#FDF2F8', accent: '#BE185D' },
  { name: 'Teal', primary: '#14B8A6', secondary: '#F0FDFA', accent: '#0F766E' },
  { name: 'Red', primary: '#EF4444', secondary: '#FEF2F2', accent: '#DC2626' },
  { name: 'Indigo', primary: '#6366F1', secondary: '#EEF2FF', accent: '#4338CA' },
];

const ModuleSettings: React.FC = () => {
  const [modules, setModules] = useState([
    {
      id: 'users',
      name: 'Users Management',
      description: 'Manage users and their permissions',
      icon: Users,
      isEnabled: true,
      userSettings: [
        { userId: 'user1', userName: 'John Doe', isActive: true, isEnabled: true },
        { userId: 'user2', userName: 'Jane Smith', isActive: false, isEnabled: true },
      ]
    },
    {
      id: 'grounds',
      name: 'Grounds Management',
      description: 'Manage grounds and facilities',
      icon: MapPin,
      isEnabled: true,
      userSettings: [
        { userId: 'user1', userName: 'John Doe', isActive: true, isEnabled: false },
        { userId: 'user3', userName: 'Mike Johnson', isActive: true, isEnabled: true },
      ]
    },
    {
      id: 'subscriptions',
      name: 'Subscriptions',
      description: 'Handle subscription management',
      icon: CreditCard,
      isEnabled: false,
      userSettings: [
        { userId: 'user2', userName: 'Jane Smith', isActive: true, isEnabled: true },
      ]
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  
  // Color management state
  const [selectedTheme, setSelectedTheme] = useState(colorThemes[0]);
  const [customColors, setCustomColors] = useState({
    primary: '#3B82F6',
    secondary: '#EFF6FF',
    accent: '#1E40AF',
    background: '#FFFFFF',
    text: '#1F2937',
    border: '#E5E7EB'
  });
  const [activeColorTab, setActiveColorTab] = useState('themes');

  const toggleModule = (moduleId: string) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId ? { ...module, isEnabled: !module.isEnabled } : module
    ));
  };

  const toggleUserStatus = (moduleId: string, userId: string) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? {
            ...module,
            userSettings: module.userSettings.map(user =>
              user.userId === userId ? { ...user, isActive: !user.isActive } : user
            )
          }
        : module
    ));
  };

  const toggleUserModule = (moduleId: string, userId: string) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? {
            ...module,
            userSettings: module.userSettings.map(user =>
              user.userId === userId ? { ...user, isEnabled: !user.isEnabled } : user
            )
          }
        : module
    ));
  };

  const handleBulkAction = (action: 'enable' | 'disable') => {
    if (selectedUsers.length === 0) return;
    
    setModules(prev => prev.map(module => ({
      ...module,
      userSettings: module.userSettings.map(user =>
        selectedUsers.includes(user.userId) 
          ? { ...user, isEnabled: action === 'enable' } 
          : user
      )
    })));
    setSelectedUsers([]);
  };

  // Color management functions
  const applyTheme = (theme: typeof colorThemes[0]) => {
    setSelectedTheme(theme);
    setCustomColors({
      ...customColors,
      primary: theme.primary,
      secondary: theme.secondary,
      accent: theme.accent
    });
    
    // Apply to CSS variables
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--secondary-color', theme.secondary);
    document.documentElement.style.setProperty('--accent-color', theme.accent);
  };

  const applyCustomColor = (colorType: string, color: string) => {
    setCustomColors(prev => ({ ...prev, [colorType]: color }));
    document.documentElement.style.setProperty(`--${colorType}-color`, color);
  };

  const resetToDefault = () => {
    const defaultTheme = colorThemes[0];
    applyTheme(defaultTheme);
  };

  const filteredModules = modules.filter(module =>
    module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Module Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure modules and manage user permissions
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={maintenanceMode ? "destructive" : "secondary"}>
            {maintenanceMode ? "Maintenance Mode" : "Live"}
          </Badge>
          <Switch
            checked={maintenanceMode}
            onCheckedChange={setMaintenanceMode}
          />
        </div>
      </div>

      <Tabs defaultValue="modules" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="modules">Module Management</TabsTrigger>
          <TabsTrigger value="colors">Color Settings</TabsTrigger>
          <TabsTrigger value="users">User Controls</TabsTrigger>
        </TabsList>

        {/* Color Settings Tab */}
        <TabsContent value="colors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Color Management
              </CardTitle>
              <CardDescription>
                Customize the application's color scheme and theme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeColorTab} onValueChange={setActiveColorTab}>
                <TabsList>
                  <TabsTrigger value="themes">Preset Themes</TabsTrigger>
                  <TabsTrigger value="custom">Custom Colors</TabsTrigger>
                </TabsList>

                <TabsContent value="themes" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {colorThemes.map((theme) => (
                      <div
                        key={theme.name}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedTheme.name === theme.name
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => applyTheme(theme)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium text-sm">{theme.name}</span>
                          {selectedTheme.name === theme.name && (
                            <Check className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <div className="flex gap-2">
                          <div
                            className="w-6 h-6 rounded-full border"
                            style={{ backgroundColor: theme.primary }}
                          />
                          <div
                            className="w-6 h-6 rounded-full border"
                            style={{ backgroundColor: theme.secondary }}
                          />
                          <div
                            className="w-6 h-6 rounded-full border"
                            style={{ backgroundColor: theme.accent }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="custom" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(customColors).map(([colorType, colorValue]) => (
                      <div key={colorType} className="space-y-2">
                        <Label className="text-sm font-medium capitalize">
                          {colorType.replace(/([A-Z])/g, ' $1').trim()}
                        </Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={colorValue}
                            onChange={(e) => applyCustomColor(colorType, e.target.value)}
                            className="w-12 h-10 rounded border cursor-pointer"
                          />
                          <Input
                            value={colorValue}
                            onChange={(e) => applyCustomColor(colorType, e.target.value)}
                            placeholder="#000000"
                            className="flex-1"
                          />
                        </div>
                        <div
                          className="w-full h-8 rounded border"
                          style={{ backgroundColor: colorValue }}
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Button onClick={resetToDefault} variant="outline">
                      Reset to Default
                    </Button>
                    <Button 
                      onClick={() => {
                        // Save colors to localStorage or API
                        localStorage.setItem('customColors', JSON.stringify(customColors));
                      }}
                      style={{ backgroundColor: customColors.primary, color: 'white' }}
                    >
                      Save Color Scheme
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Color Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>See how your colors look in practice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  style={{ backgroundColor: customColors.primary, color: 'white' }}
                  className="mr-2"
                >
                  Primary Button
                </Button>
                <Button 
                  variant="outline" 
                  style={{ borderColor: customColors.accent, color: customColors.accent }}
                >
                  Secondary Button
                </Button>
                
                <div 
                  className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: customColors.secondary,
                    borderColor: customColors.border,
                    color: customColors.text
                  }}
                >
                  <h3 className="font-semibold mb-2">Sample Card</h3>
                  <p>This is how your content will look with the selected colors.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Module Management Tab */}
        <TabsContent value="modules" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search modules..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Module Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Modules</p>
                    <p className="text-2xl font-bold">{modules.length}</p>
                  </div>
                  <Settings className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Modules</p>
                    <p className="text-2xl font-bold text-green-600">
                      {modules.filter(m => m.isEnabled).length}
                    </p>
                  </div>
                  <ToggleRight className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Inactive Modules</p>
                    <p className="text-2xl font-bold text-red-600">
                      {modules.filter(m => !m.isEnabled).length}
                    </p>
                  </div>
                  <ToggleLeft className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Ground Owners</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {modules.reduce((acc, m) => acc + m.userSettings.length, 0)}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Modules List */}
          <div className="space-y-4">
            {filteredModules.map((module) => {
              const IconComponent = module.icon;
              const activeUsers = module.userSettings.filter(u => u.isActive).length;
              const enabledUsers = module.userSettings.filter(u => u.isEnabled).length;
              
              return (
                <Card key={module.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: customColors.secondary }}
                        >
                          <IconComponent 
                            className="h-6 w-6" 
                            style={{ color: customColors.primary }}
                          />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{module.name}</CardTitle>
                          <CardDescription>{module.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right text-sm text-gray-600">
                          <div>{activeUsers}/{module.userSettings.length} active users</div>
                          <div>{enabledUsers}/{module.userSettings.length} enabled</div>
                        </div>
                        <Switch
                          checked={module.isEnabled}
                          onCheckedChange={() => toggleModule(module.id)}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  
                  {module.isEnabled && (
                    <CardContent className="pt-0">
                      <Separator className="mb-4" />
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-700">Ground Owner Access</h4>
                          <Badge variant="outline" className="text-xs">
                            {module.userSettings.length} users
                          </Badge>
                        </div>
                        
                        <div className="grid gap-3">
                          {module.userSettings.map((userSetting) => (
                            <div 
                              key={userSetting.userId} 
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                  <div 
                                    className={`w-3 h-3 rounded-full ${
                                      userSetting.isActive ? 'bg-green-500' : 'bg-red-500'
                                    }`}
                                  />
                                  <span className="font-medium text-sm">{userSetting.userName}</span>
                                </div>
                                <Badge 
                                  variant={userSetting.isActive ? "default" : "secondary"}
                                  className="text-xs"
                                >
                                  {userSetting.isActive ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <Switch
                                    checked={userSetting.isActive}
                                    onCheckedChange={() => toggleUserStatus(module.id, userSetting.userId)}
                                  />
                                  <span className="text-xs text-gray-600">Status</span>
                                </div>
                                
                                <Separator orientation="vertical" className="h-6" />
                                
                                <div className="flex items-center gap-2">
                                  <Switch
                                    checked={userSetting.isEnabled}
                                    onCheckedChange={() => toggleUserModule(module.id, userSetting.userId)}
                                  />
                                  <span className="text-xs text-gray-600">Access</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* User Controls Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bulk User Management</CardTitle>
              <CardDescription>Manage multiple users at once</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleBulkAction('enable')}
                    disabled={selectedUsers.length === 0}
                    size="sm"
                    style={{ backgroundColor: customColors.primary, color: 'white' }}
                  >
                    Enable Selected ({selectedUsers.length})
                  </Button>
                  <Button 
                    onClick={() => handleBulkAction('disable')}
                    disabled={selectedUsers.length === 0}
                    variant="outline"
                    size="sm"
                  >
                    Disable Selected ({selectedUsers.length})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModuleSettings;
