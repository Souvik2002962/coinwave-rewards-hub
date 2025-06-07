
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import Store from '@/pages/Store';
import Earn from '@/pages/Earn';
import Reviews from '@/pages/Reviews';
import Referral from '@/pages/Referral';
import ProfilePage from '@/pages/ProfilePage';
import AdvertiserDashboard from '@/pages/AdvertiserDashboard';
import CreateCampaign from '@/pages/CreateCampaign';
import BecomeAdvertiser from '@/pages/BecomeAdvertiser';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminAdvertisers from '@/pages/admin/AdminAdvertisers';
import NotFound from '@/pages/NotFound';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Toaster } from 'sonner';
import AdminPolls from '@/pages/admin/AdminPolls';

const queryClient = new QueryClient();

function App() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<SignupPage />} />
              <Route path="/store" element={<Store />} />
              <Route path="/earn" element={<Earn />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/referral" element={<Referral />} />
              <Route path="/become-advertiser" element={<BecomeAdvertiser />} />
              
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
              <Route path="/admin/advertisers" element={<ProtectedRoute><AdminAdvertisers /></ProtectedRoute>} />
              <Route path="/admin/polls" element={<ProtectedRoute><AdminPolls /></ProtectedRoute>} />

              {/* Advertiser Routes */}
              <Route path="/advertiser-dashboard" element={<ProtectedRoute><AdvertiserDashboard /></ProtectedRoute>} />
              <Route path="/create-campaign" element={<ProtectedRoute><CreateCampaign /></ProtectedRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App;
