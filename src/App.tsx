
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Earn from "./pages/Earn";
import Store from "./pages/Store";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import Referral from "./pages/Referral";
import Reviews from "./pages/Reviews";
import BecomeAdvertiser from "./pages/BecomeAdvertiser";
import CreateCampaign from "./pages/CreateCampaign";
import AdvertiserDashboard from "./pages/AdvertiserDashboard";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminAds from "./pages/admin/AdminAds";
import AdminAdvertisers from "./pages/admin/AdminAdvertisers";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminCoins from "./pages/admin/AdminCoins";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminTeamMembers from "./pages/admin/AdminTeamMembers";
import AdminSupport from "./pages/admin/AdminSupport";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={
              <ProtectedRoute requireAuth={false}>
                <LoginPage />
              </ProtectedRoute>
            } />
            <Route path="/signup" element={
              <ProtectedRoute requireAuth={false}>
                <SignupPage />
              </ProtectedRoute>
            } />
            <Route path="/earn" element={<Earn />} />
            <Route path="/store" element={<Store />} />
            <Route path="/shop" element={<Store />} />
            <Route path="/shop/product/:id" element={<ProductDetail />} />
            <Route path="/shop/checkout/:id" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/shop/order-success" element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            } />
            <Route path="/shop/orders" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } />
            <Route path="/referral" element={<Referral />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/become-advertiser" element={<BecomeAdvertiser />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/advertiser-dashboard" element={<AdvertiserDashboard />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/ads" element={<AdminAds />} />
            <Route path="/admin/advertisers" element={<AdminAdvertisers />} />
            <Route path="/admin/payments" element={<AdminPayments />} />
            <Route path="/admin/coins" element={<AdminCoins />} />
            <Route path="/admin/reviews" element={<AdminReviews />} />
            <Route path="/admin/notifications" element={<AdminNotifications />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
