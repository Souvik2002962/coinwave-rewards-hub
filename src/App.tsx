import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Pricing from '@/pages/Pricing';
import Contact from '@/pages/Contact';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminAdvertisers from '@/pages/admin/AdminAdvertisers';
import AdminCampaigns from '@/pages/admin/AdminCampaigns';
import NotFound from '@/pages/NotFound';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdvertiserDashboard from '@/pages/AdvertiserDashboard';
import CreateCampaign from '@/pages/CreateCampaign';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Toaster } from 'sonner';
import AdminPolls from '@/pages/admin/AdminPolls';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
              <Route path="/admin/advertisers" element={<ProtectedRoute><AdminAdvertisers /></ProtectedRoute>} />
              <Route path="/admin/campaigns" element={<ProtectedRoute><AdminCampaigns /></ProtectedRoute>} />

              {/* Advertiser Routes */}
              <Route path="/advertiser-dashboard" element={<ProtectedRoute><AdvertiserDashboard /></ProtectedRoute>} />
              <Route path="/create-campaign" element={<ProtectedRoute><CreateCampaign /></ProtectedRoute>} />
              
              <Route path="*" element={<NotFound />} />
              <Route path="/admin/polls" element={<ProtectedRoute><AdminPolls /></ProtectedRoute>} />
            </Routes>
            <Toaster />
          </BrowserRouter>
        </QueryClientProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
