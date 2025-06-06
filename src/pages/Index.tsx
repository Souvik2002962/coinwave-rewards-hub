import React from 'react';
import { ArrowRight, Play, Eye, Target, Zap, Globe, BarChart3, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import AdCard from '@/components/AdCard';
import ProductCard from '@/components/ProductCard';
import CoinWallet from '@/components/CoinWallet';
import ReferralCard from '@/components/ReferralCard';
import AdvertiserDashboardPreview from '@/components/AdvertiserDashboardPreview';
import TestimonialSection from '@/components/TestimonialSection';
import LiveStatsSection from '@/components/LiveStatsSection';
import VideoAd from '@/components/VideoAd';
import { Link } from 'react-router-dom';

const Index = () => {
  // Sample ad data
  const ads = [
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
      type: 'banner' as const,
    },
    {
      adId: 'ad3',
      title: 'Spotify Premium',
      description: 'Unlimited music streaming with no ads and offline listening.',
      coinReward: 15,
      imageUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff',
      type: 'video' as const,
    },
  ];
  
  // Sample product data
  const products = [
    {
      id: 'prod1',
      name: 'Wireless Headphones',
      description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and immersive sound quality.',
      price: 199.99,
      discountCoins: 100,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      category: 'Electronics',
      isTrending: true,
      additionalImages: [
        'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b',
        'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb',
      ]
    },
    {
      id: 'prod2',
      name: 'Smart Watch',
      description: 'Track your fitness, receive notifications, and more with this sleek smart watch.',
      price: 249.99,
      discountCoins: 150,
      imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1',
      category: 'Wearables',
      additionalImages: []
    },
    {
      id: 'prod3',
      name: 'Designer Sneakers',
      description: 'Premium designer sneakers made with sustainable materials and cutting-edge design.',
      price: 129.99,
      discountCoins: 50,
      imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
      category: 'Fashion',
      isTrending: true,
      additionalImages: []
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-dark">
      <NavBar />
      
      {/* Video Ad Hero Section - Added pt-24 to account for fixed navbar */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 pt-16 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Why We're Better Than <span className="text-red-500">Facebook</span>, <span className="text-purple-500">Instagram</span>, <span className="text-blue-500">Google</span> & <span className="text-red-600">YouTube</span> Ads
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Stop wasting money on ads that get skipped. Join the platform where users actually want to watch your ads and get rewarded for it.
            </p>
          </div>
          
          {/* Interactive Video Ad */}
          <VideoAd />
          
          {/* Why We're Different - Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 mb-8">
            <div className="neon-card p-6 text-center">
              <Eye className="w-12 h-12 text-neon-purple mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Users Actually Watch</h3>
              <p className="text-gray-300 text-sm">No skipping. No scrolling past. Users earn rewards for watching your ads.</p>
            </div>
            
            <div className="neon-card p-6 text-center">
              <Target className="w-12 h-12 text-neon-blue mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Real Engagement</h3>
              <p className="text-gray-300 text-sm">Higher attention rates than Facebook, Instagram, or YouTube ads.</p>
            </div>
            
            <div className="neon-card p-6 text-center">
              <Zap className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Simple & Affordable</h3>
              <p className="text-gray-300 text-sm">No complex dashboards. No hidden fees. Just results that matter.</p>
            </div>
            
            <div className="neon-card p-6 text-center">
              <BarChart3 className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Full Transparency</h3>
              <p className="text-gray-300 text-sm">Track every view, click, and conversion in real-time.</p>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/become-advertiser">
              <Button className="bg-neon-purple hover:bg-neon-purple/90 text-white px-8 py-6 text-lg">
                Start Advertising Smarter
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link to="/earn">
              <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10 hover:text-neon-blue px-8 py-6 text-lg">
                Watch Ads & Earn
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Traditional Hero Section - Simplified */}
      <section className="py-8 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Watch Ads. <span className="text-neon-purple">Earn Coins.</span> Shop Products.
          </h2>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            The only platform where advertising benefits everyone - advertisers get real engagement, users get real rewards.
          </p>
        </div>
      </section>
      
      {/* Live Stats Section */}
      <LiveStatsSection />
      
      {/* Featured Ads Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Watch & Earn</h2>
            <Link to="/earn">
              <Button variant="link" className="text-neon-purple">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map((ad) => (
              <AdCard key={ad.adId} {...ad} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Products Section */}
      <section className="py-12 px-4 bg-cyber-dark">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Featured Products</h2>
            <Link to="/store">
              <Button variant="link" className="text-neon-purple">
                Shop All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <TestimonialSection />
      
      {/* Wallet and Referral Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CoinWallet />
            <ReferralCard />
          </div>
        </div>
      </section>
      
      {/* Advertiser Dashboard Preview */}
      <section className="py-12 px-4 bg-gradient-to-b from-cyber-dark to-cyber-dark/90">
        <div className="container mx-auto text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">For Advertisers & Brands</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Self-serve ad platform with powerful targeting, analytics, and real-time performance tracking.
          </p>
        </div>
        
        <AdvertiserDashboardPreview />
        
        <div className="text-center mt-8">
          <Link to="/become-advertiser">
            <Button className="bg-neon-blue hover:bg-neon-blue/90 text-white px-8 py-6">
              Become an Advertiser
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-cyber-dark border-t border-gray-800 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue flex items-center justify-center">
                <span className="text-white font-bold">CC</span>
              </div>
              <span className="font-bold text-xl ml-2 text-white">
                Coin<span className="text-neon-purple">Cart</span>
              </span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-neon-purple transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-neon-purple transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-neon-purple transition-colors">Contact Us</a>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CoinCart Ecosystem. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
