
import React, { useState, useRef } from 'react';
import NavBar from '@/components/NavBar';
import AdCard from '@/components/AdCard';
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

const Earn = () => {
  const { user } = useAuth();
  
  // Sample ad data
  const videoAds = [
    {
      adId: 'ad1',
      title: 'New Nike Air Max',
      description: 'Experience the next generation of comfort with Nike Air Max.',
      coinReward: 20,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      type: 'video' as const,
    },
    {
      adId: 'ad2',
      title: 'Samsung Galaxy S25',
      description: 'Discover the future of mobile technology with the all-new Galaxy.',
      coinReward: 25,
      imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c',
      type: 'video' as const,
    },
    {
      adId: 'ad3',
      title: 'Spotify Premium',
      description: 'Unlimited music streaming with no ads and offline listening.',
      coinReward: 15,
      imageUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff',
      type: 'video' as const,
    },
    {
      adId: 'ad4',
      title: 'Tesla Model Y',
      description: 'The future of sustainable transport is here. Explore the Model Y.',
      coinReward: 30,
      imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89',
      type: 'video' as const,
    },
    {
      adId: 'ad5',
      title: 'Apple MacBook Pro',
      description: 'Unleash your creativity with the most powerful MacBook ever.',
      coinReward: 22,
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
      type: 'video' as const,
    },
    {
      adId: 'ad6',
      title: 'Amazon Prime',
      description: 'Fast delivery, exclusive deals, and premium entertainment.',
      coinReward: 18,
      imageUrl: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2',
      type: 'video' as const,
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
    },
    {
      adId: 'banner2',
      title: 'Disney+ Streaming',
      description: 'Endless entertainment for the whole family. Stream now!',
      coinReward: 8,
      imageUrl: 'https://images.unsplash.com/photo-1604326531970-fe6d2d7592b2',
      type: 'banner' as const,
    },
    {
      adId: 'banner3',
      title: 'Honda Electric Vehicles',
      description: 'The future of driving is electric. Explore the Honda EV lineup.',
      coinReward: 12,
      imageUrl: 'https://images.unsplash.com/photo-1630990179426-6a65d97eba76',
      type: 'banner' as const,
    },
    {
      adId: 'banner4',
      title: 'Mastercard Benefits',
      description: 'Discover exclusive rewards and benefits with Mastercard.',
      coinReward: 8,
      imageUrl: 'https://images.unsplash.com/photo-1574672280600-4accfa5b6f98',
      type: 'banner' as const,
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
    },
    {
      adId: 'carousel2',
      title: 'Ray-Ban Sunglasses',
      description: 'Iconic styles with cutting-edge lens technology.',
      coinReward: 12,
      imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
      type: 'carousel' as const,
    },
    {
      adId: 'carousel3',
      title: 'Whole Foods Market',
      description: 'Quality organic products for health-conscious consumers.',
      coinReward: 18,
      imageUrl: 'https://images.unsplash.com/photo-1534723452862-4c874018d8d9',
      type: 'carousel' as const,
    },
  ];
  
  return (
    <div className="min-h-screen bg-cyber-dark">
      <NavBar />
      
      <div className="container mx-auto px-4 pb-16 pt-28">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Earn Coins</h1>
            <p className="text-gray-400">Watch ads, complete tasks, and earn digital coins to spend on products</p>
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
            
            <TabsContent value="carousel" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {carouselAds.map((ad) => (
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
          </Tabs>
        </div>
        
        {/* Daily Bonus Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Bonus Opportunities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glossy-card backdrop-blur-lg bg-white/10 border border-white/20 p-6 rounded-lg">
              <div className="h-14 w-14 rounded-full bg-neon-purple/20 flex items-center justify-center mb-4">
                <div className="coin w-8 h-8 text-lg">🎯</div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Daily Check-in</h3>
              <p className="text-gray-400 mb-4">Login daily to build your streak and earn increasing rewards.</p>
              <Button className="w-full bg-neon-purple hover:bg-neon-purple/90">
                Claim 25 Coins
              </Button>
            </div>
            
            <div className="glossy-card backdrop-blur-lg bg-white/10 border border-white/20 p-6 rounded-lg">
              <div className="h-14 w-14 rounded-full bg-neon-purple/20 flex items-center justify-center mb-4">
                <div className="coin w-8 h-8 text-lg">🎮</div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Spin the Wheel</h3>
              <p className="text-gray-400 mb-4">Try your luck once daily for a chance to win up to 200 coins!</p>
              <Button className="w-full bg-neon-purple hover:bg-neon-purple/90">
                Spin & Win
              </Button>
            </div>
            
            <div className="glossy-card backdrop-blur-lg bg-white/10 border border-white/20 p-6 rounded-lg">
              <div className="h-14 w-14 rounded-full bg-neon-purple/20 flex items-center justify-center mb-4">
                <div className="coin w-8 h-8 text-lg">👥</div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Refer Friends</h3>
              <p className="text-gray-400 mb-4">Invite friends and earn 100 coins for each successful referral.</p>
              <Button className="w-full bg-neon-purple hover:bg-neon-purple/90">
                Get Referral Link
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earn;
