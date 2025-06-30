
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import UsersManagement from './pages/UsersManagement';
import GroundsManagement from './pages/GroundsManagement';
import SubscriptionsManagement from './pages/SubscriptionsManagement';
import UserRequests from './pages/UserRequests';
import ModuleSettings from './pages/ModuleSettings';
import Settings from './pages/Settings';
import ProtectedRoute from './components/auth/ProtectedRoute';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<UsersManagement />} />
              <Route path="grounds" element={<GroundsManagement />} />
              <Route path="subscriptions" element={<SubscriptionsManagement />} />
              <Route path="requests" element={<UserRequests />} />
              <Route path="modules" element={<ModuleSettings />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
