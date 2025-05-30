
import React, { useState, useEffect } from 'react';
import { Coins, ShoppingBag, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const LiveStatsSection = () => {
  // Initial stats values
  const [coinsRedeemed, setCoinsRedeemed] = useState(23480);
  const [productsDelivered, setProductsDelivered] = useState(1820);
  const [activeUsers, setActiveUsers] = useState(324);
  const [animating, setAnimating] = useState(false);
  
  // Fetch initial stats from Supabase
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total coins redeemed
        const { data: coinData, error: coinError } = await supabase
          .from('user_transactions')
          .select('amount')
          .eq('type', 'spent');
          
        if (!coinError && coinData) {
          const total = coinData.reduce((sum, item) => sum + (item.amount || 0), 0);
          if (total > 0) setCoinsRedeemed(total);
        }
        
        // Fetch products delivered (simplified, real implementation would be more complex)
        const { data: productData, error: productError } = await supabase
          .from('user_transactions')
          .select('count')
          .eq('source', 'purchase');
          
        if (!productError && productData) {
          const count = productData[0]?.count || 0;
          if (count > 0) setProductsDelivered(count);
        }
        
        // Fetch active users
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('count');
          
        if (!userError && userData && userData[0]?.count) {
          const baseCount = userData[0].count;
          // Add some randomness to simulate real-time users
          setActiveUsers(Math.floor(baseCount * 0.3) + Math.floor(Math.random() * 50));
        }
      } catch (error) {
        console.error("Error fetching live stats:", error);
      }
    };
    
    fetchStats();
  }, []);

  // Simulate live updates with small random increments
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      
      // Update with random increments
      setCoinsRedeemed(prev => prev + Math.floor(Math.random() * 15));
      setProductsDelivered(prev => prev + (Math.random() > 0.7 ? 1 : 0));
      setActiveUsers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return prev + change < 300 ? 300 : prev + change;
      });
      
      // Reset animation state
      setTimeout(() => setAnimating(false), 500);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Live Platform Activity</h2>
          <p className="text-gray-400">Watch our community grow in real-time</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="neon-card p-6 flex items-center">
            <div className="h-12 w-12 rounded-full bg-neon-purple/20 flex items-center justify-center mr-4">
              <Coins className={`h-6 w-6 text-neon-purple ${animating ? 'animate-ping opacity-75' : ''}`} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Coins Redeemed Today</p>
              <p className="text-2xl font-bold text-white transition-all">
                {coinsRedeemed.toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="neon-card p-6 flex items-center">
            <div className="h-12 w-12 rounded-full bg-neon-blue/20 flex items-center justify-center mr-4">
              <ShoppingBag className={`h-6 w-6 text-neon-blue ${animating ? 'animate-ping opacity-75' : ''}`} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Products Delivered</p>
              <p className="text-2xl font-bold text-white transition-all">
                {productsDelivered.toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="neon-card p-6 flex items-center">
            <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
              <User className={`h-6 w-6 text-green-500 ${animating ? 'animate-ping opacity-75' : ''}`} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Active Users Online</p>
              <p className="text-2xl font-bold text-white transition-all">
                {activeUsers.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStatsSection;
