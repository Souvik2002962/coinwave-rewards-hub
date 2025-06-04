import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import AdCard from '@/components/AdCard';
import BannerAdView from '@/components/BannerAdView';
import CarouselAdView from '@/components/CarouselAdView';
import LoginModal from '@/components/LoginModal';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Earn = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeAdView, setActiveAdView] = useState<{
    type: 'banner' | 'carousel' | null;
    ad: any | null;
  }>({
    type: null,
    ad: null,
  });
  
  // Sample ad data
  const videoAds = [
    {
      adId: 'ad1',
      title: 'New Nike Air Max',
      description: 'Experience the next generation of comfort with Nike Air Max.',
      coinReward: 20,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      type: 'video' as const,
      websiteUrl: 'https://nike.com',
      ctaText: 'Shop Now',
    },
    {
      adId: 'ad2',
      title: 'Samsung Galaxy S25',
      description: 'Discover the future of mobile technology with the all-new Galaxy.',
      coinReward: 25,
      imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c',
      type: 'video' as const,
      websiteUrl: 'https://samsung.com',
      ctaText: 'Buy Now',
    },
    {
      adId: 'ad3',
      title: 'Spotify Premium',
      description: 'Unlimited music streaming with no ads and offline listening.',
      coinReward: 15,
      imageUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff',
      type: 'video' as const,
      websiteUrl: 'https://spotify.com',
      ctaText: 'Subscribe',
    },
    {
      adId: 'ad4',
      title: 'Tesla Model Y',
      description: 'The future of sustainable transport is here. Explore the Model Y.',
      coinReward: 30,
      imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89',
      type: 'video' as const,
      websiteUrl: 'https://tesla.com',
      ctaText: 'Order Now',
    },
    {
      adId: 'ad5',
      title: 'Apple MacBook Pro',
      description: 'Unleash your creativity with the most powerful MacBook ever.',
      coinReward: 22,
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
      type: 'video' as const,
      websiteUrl: 'https://apple.com',
      ctaText: 'Buy',
    },
    {
      adId: 'ad6',
      title: 'Amazon Prime',
      description: 'Fast delivery, exclusive deals, and premium entertainment.',
      coinReward: 18,
      imageUrl: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2',
      type: 'video' as const,
      websiteUrl: 'https://amazon.com',
      ctaText: 'Sign Up',
    },
  ];
  
  const bannerAds = [
    {
      adId: 'banner1',
      title: 'Adidas Summer Collection',
      description: 'Step into summer with the latest Adidas gear and apparel.',
      coinReward: 10,
      imageUrl: 'https://images.unsplash.com/photo-1556906781-9a412961c28c',
      type: 'banner' as const,
      websiteUrl: 'https://adidas.com',
      ctaText: 'Shop Collection',
    },
    {
      adId: 'banner2',
      title: 'Disney+ Streaming',
      description: 'Endless entertainment for the whole family. Stream now!',
      coinReward: 8,
      imageUrl: 'https://images.unsplash.com/photo-1604326531970-fe6d2d7592b2',
      type: 'banner' as const,
      websiteUrl: 'https://disneyplus.com',
      ctaText: 'Start Streaming',
    },
    {
      adId: 'banner3',
      title: 'Honda Electric Vehicles',
      description: 'The future of driving is electric. Explore the Honda EV lineup.',
      coinReward: 12,
      imageUrl: 'https://images.unsplash.com/photo-1630990179426-6a65d97eba76',
      type: 'banner' as const,
      websiteUrl: 'https://honda.com',
      ctaText: 'Explore EVs',
    },
    {
      adId: 'banner4',
      title: 'Mastercard Benefits',
      description: 'Discover exclusive rewards and benefits with Mastercard.',
      coinReward: 8,
      imageUrl: 'https://images.unsplash.com/photo-1574672280600-4accfa5b6f98',
      type: 'banner' as const,
      websiteUrl: 'https://mastercard.com',
      ctaText: 'Learn More',
    },
  ];
  
  const carouselAds = [
    {
      adId: 'carousel1',
      title: 'New Balance Collection',
      description: 'Athletic footwear designed for performance and style.',
      coinReward: 15,
      imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570',
      type: 'carousel' as const,
      websiteUrl: 'https://newbalance.com',
      ctaText: 'Shop Shoes',
    },
    {
      adId: 'carousel2',
      title: 'Ray-Ban Sunglasses',
      description: 'Iconic styles with cutting-edge lens technology.',
      coinReward: 12,
      imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
      type: 'carousel' as const,
      websiteUrl: 'https://ray-ban.com',
      ctaText: 'Shop Eyewear',
    },
    {
      adId: 'carousel3',
      title: 'Whole Foods Market',
      description: 'Quality organic products for health-conscious consumers.',
      coinReward: 18,
      imageUrl: 'https://images.unsplash.com/photo-1534723452862-4c874018d8d9',
      type: 'carousel' as const,
      websiteUrl: 'https://wholefoodsmarket.com',
      ctaText: 'Shop Organic',
    },
  ];
  
  const handleAdClick = (adType: 'banner' | 'carousel', ad: any) => {
    setActiveAdView({
      type: adType,
      ad,
    });
  };

  const closeAdView = () => {
    setActiveAdView({
      type: null,
      ad: null,
    });
  };

  const handleDailyCheckIn = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    // Handle daily check-in logic here
  };

  const handleSpinWheel = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    navigate('/spin-wheel');
  };
  
  return (
    <div className="min-h-screen bg-cyber-dark">
      <NavBar />
      
      <div className="container mx-auto px-4 pb-16 pt-28">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{t('earn.title')}</h1>
            <p className="text-gray-400">{t('earn.description')}</p>
          </div>
          <div className="glossy-card px-4 py-2 rounded-lg mt-4 sm:mt-0 backdrop-blur-lg bg-white/10 border border-white/20">
            <div className="flex items-center">
              <div className="mr-3">
                <div className="text-xs text-gray-400">Available Balance</div>
                <div className="text-xl font-bold text-white">{user ? user.coinBalance : 0} Coins</div>
              </div>
              <div className="coin w-10 h-10 text-xl flex-shrink-0">💰</div>
            </div>
          </div>
        </div>
        
        <div className="w-full">
          <Tabs defaultValue="video" className="w-full">
            <div className="flex justify-center mb-8">
              <div className="glossy-card backdrop-blur-lg bg-white/10 border border-white/20 rounded-lg p-1 w-full max-w-4xl">
                <ScrollArea className="w-full">
                  <TabsList className="bg-transparent flex w-max min-w-full gap-1 p-0">
                    <TabsTrigger 
                      value="video" 
                      className="whitespace-nowrap px-6 py-3 text-sm font-medium data-[state=active]:bg-neon-purple data-[state=active]:text-white text-gray-300 hover:text-white transition-colors rounded-md flex-shrink-0"
                    >
                      Video Ads (20-30 coins)
                    </TabsTrigger>
                    <TabsTrigger 
                      value="banner" 
                      className="whitespace-nowrap px-6 py-3 text-sm font-medium data-[state=active]:bg-neon-purple data-[state=active]:text-white text-gray-300 hover:text-white transition-colors rounded-md flex-shrink-0"
                    >
                      Banner Ads (8-15 coins)
                    </TabsTrigger>
                    <TabsTrigger 
                      value="carousel" 
                      className="whitespace-nowrap px-6 py-3 text-sm font-medium data-[state=active]:bg-neon-purple data-[state=active]:text-white text-gray-300 hover:text-white transition-colors rounded-md flex-shrink-0"
                    >
                      Carousel (12-18 coins)
                    </TabsTrigger>
                  </TabsList>
                  <ScrollBar orientation="horizontal" className="mt-2" />
                </ScrollArea>
              </div>
            </div>
            
            <TabsContent value="video" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {videoAds.map((ad) => (
                  <AdCard key={ad.adId} {...ad} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button variant="outline" className="border-neon-purple text-neon-purple hover:bg-neon-purple/10 glossy-card backdrop-blur-lg bg-white/10">
                  Load More Ads
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="banner" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {bannerAds.map((ad) => (
                  <div key={ad.adId} className="glossy-card backdrop-blur-lg bg-white/10 border border-white/20 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={ad.imageUrl} 
                        alt={ad.title}
                        className="w-full h-48 object-cover" 
                      />
                      <div className="absolute top-2 right-2 bg-neon-purple rounded-full px-2 py-1 text-xs text-white font-medium">
                        +{ad.coinReward} coins
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-white mb-1">{ad.title}</h3>
                      <p className="text-gray-300 text-sm mb-4">{ad.description}</p>
                      <Button 
                        onClick={() => handleAdClick('banner', ad)}
                        className="w-full bg-neon-purple hover:bg-neon-purple/90"
                      >
                        Watch & Earn
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button variant="outline" className="border-neon-purple text-neon-purple hover:bg-neon-purple/10 glossy-card backdrop-blur-lg bg-white/10">
                  Load More Ads
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="carousel" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {carouselAds.map((ad) => (
                  <div key={ad.adId} className="glossy-card backdrop-blur-lg bg-white/10 border border-white/20 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={ad.imageUrl} 
                        alt={ad.title}
                        className="w-full h-48 object-cover" 
                      />
                      <div className="absolute top-2 right-2 bg-neon-purple rounded-full px-2 py-1 text-xs text-white font-medium">
                        +{ad.coinReward} coins
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-white mb-1">{ad.title}</h3>
                      <p className="text-gray-300 text-sm mb-4">{ad.description}</p>
                      <Button 
                        onClick={() => handleAdClick('carousel', ad)} 
                        className="w-full bg-neon-purple hover:bg-neon-purple/90"
                      >
                        Swipe & Earn
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button variant="outline" className="border-neon-purple text-neon-purple hover:bg-neon-purple/10 glossy-card backdrop-blur-lg bg-white/10">
                  Load More Ads
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Bonus Opportunities Section - Updated without Refer Friends */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Bonus Opportunities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glossy-card backdrop-blur-lg bg-white/10 border border-white/20 p-6 rounded-lg">
              <div className="h-14 w-14 rounded-full bg-neon-purple/20 flex items-center justify-center mb-4">
                <div className="coin w-8 h-8 text-lg">🎯</div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{t('earn.dailyCheckIn')}</h3>
              <p className="text-gray-400 mb-4">Login daily to build your streak and earn increasing rewards.</p>
              <Button 
                onClick={handleDailyCheckIn}
                className="w-full bg-neon-purple hover:bg-neon-purple/90"
              >
                {t('earn.claimCoins')}
              </Button>
            </div>
            
            <div className="glossy-card backdrop-blur-lg bg-white/10 border border-white/20 p-6 rounded-lg">
              <div className="h-14 w-14 rounded-full bg-neon-purple/20 flex items-center justify-center mb-4">
                <div className="coin w-8 h-8 text-lg">🎮</div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{t('earn.spinWheel')}</h3>
              <p className="text-gray-400 mb-4">Try your luck once daily for a chance to win up to 800 coins!</p>
              <Button 
                onClick={handleSpinWheel}
                className="w-full bg-neon-purple hover:bg-neon-purple/90"
              >
                {t('earn.spinWin')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Ad View Modal */}
      {activeAdView.type === 'banner' && activeAdView.ad && (
        <BannerAdView ad={activeAdView.ad} onClose={closeAdView} />
      )}

      {/* Carousel Ad View Modal */}
      {activeAdView.type === 'carousel' && activeAdView.ad && (
        <CarouselAdView ad={activeAdView.ad} onClose={closeAdView} />
      )}

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        message="Please log in to claim your daily bonus and start earning coins!"
      />
    </div>
  );
};

export default Earn;
