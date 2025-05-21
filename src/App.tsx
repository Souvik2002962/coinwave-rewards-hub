
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Earn from "./pages/Earn";
import Store from "./pages/Store";
import Referral from "./pages/Referral";
import Reviews from "./pages/Reviews";
import BecomeAdvertiser from "./pages/BecomeAdvertiser";
import CreateCampaign from "./pages/CreateCampaign";
import AdvertiserDashboard from "./pages/AdvertiserDashboard";
import { MapPin, Tag, Coins } from "lucide-react"; // Added this import for the missing icons

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/earn" element={<Earn />} />
          <Route path="/store" element={<Store />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/become-advertiser" element={<BecomeAdvertiser />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/advertiser-dashboard" element={<AdvertiserDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
