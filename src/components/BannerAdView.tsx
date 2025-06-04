
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { coinService } from '@/services/CoinService';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Poll from '@/components/Poll';

interface BannerAdViewProps {
  ad: {
    adId: string;
    title: string;
    description: string;
    imageUrl: string;
    coinReward: number;
    websiteUrl?: string;
    ctaText?: string;
  };
  onClose: () => void;
}

const BannerAdView = ({ ad, onClose }: BannerAdViewProps) => {
  const { user, updateCoins } = useAuth();
  const [timeRemaining, setTimeRemaining] = useState(8); // 8 seconds to view
  const [completed, setCompleted] = useState(false);
  const [abandoned, setAbandoned] = useState(false);
  const [showPoll, setShowPoll] = useState(false);
  const progressValue = ((8 - timeRemaining) / 8) * 100;

  // Sample poll data for the ad
  const pollData = {
    question: `What interests you most about ${ad.title}?`,
    options: [
      { id: '1', text: 'Design & Style', votes: 45 },
      { id: '2', text: 'Price & Value', votes: 32 },
      { id: '3', text: 'Quality & Durability', votes: 28 },
      { id: '4', text: 'Brand Reputation', votes: 19 }
    ],
    coinReward: 5
  };

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !completed && !abandoned) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !completed) {
      handleCompletion();
    }
  }, [timeRemaining, completed]);

  const handleCompletion = async () => {
    setCompleted(true);
    setShowPoll(true);
    
    if (user) {
      // Add reward to user's account
      updateCoins(ad.coinReward);
      
      // Track the ad view in the service
      await coinService.trackAdWatched(
        user.id,
        ad.title,
        ad.coinReward
      );
    } else {
      toast.error("You need to be logged in to earn coins");
    }
  };

  const handleAbandon = () => {
    setAbandoned(true);
  };

  const handleRetry = () => {
    setTimeRemaining(8);
    setAbandoned(false);
  };

  const handleCtaClick = () => {
    if (ad.websiteUrl) {
      window.open(ad.websiteUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      <div className="absolute top-4 right-4 z-10">
        {!completed && !abandoned ? (
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:text-red-400" 
            onClick={handleAbandon}
          >
            <X size={24} />
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:text-white/80" 
            onClick={onClose}
          >
            <X size={24} />
          </Button>
        )}
      </div>

      {/* Coin Badge */}
      {!completed && !abandoned && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-neon-purple text-white px-3 py-1 text-sm font-medium">
            +{ad.coinReward} 💰
          </Badge>
        </div>
      )}
      
      <div className="w-full h-full max-w-3xl max-h-screen flex flex-col items-center justify-center p-4">
        {!completed && !abandoned ? (
          <>
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">{ad.title}</h2>
              <p className="text-gray-300">{ad.description}</p>
            </div>
            
            <div className="relative w-full mb-8">
              <img 
                src={ad.imageUrl} 
                alt={ad.title} 
                className="w-full h-auto max-h-[50vh] object-contain rounded-lg shadow-2xl"
              />
            </div>
            
            <div className="w-full max-w-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">
                  Please wait {timeRemaining} seconds
                </span>
                <span className="text-white font-medium">
                  +{ad.coinReward} coins
                </span>
              </div>
              <Progress value={progressValue} className="h-2 bg-white/20" />
            </div>
          </>
        ) : completed ? (
          <div className="text-center max-w-2xl">
            <div className="text-7xl mb-4">✅</div>
            <div className="mb-4">
              <Badge className="bg-green-500 text-white px-4 py-2 text-lg font-bold mb-2">
                Coins Earned!
              </Badge>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              +{ad.coinReward} Coins Added!
            </h2>
            <p className="text-gray-300 mb-8">
              Thank you for viewing {ad.title}
            </p>
            
            {showPoll && (
              <div className="mb-8">
                <Poll 
                  question={pollData.question}
                  options={pollData.options}
                  coinReward={pollData.coinReward}
                />
              </div>
            )}
            
            <div className="flex flex-col space-y-4">
              {ad.websiteUrl && (
                <Button 
                  onClick={handleCtaClick} 
                  className="bg-white text-black hover:bg-gray-200"
                >
                  {ad.ctaText || 'Buy Now'}
                </Button>
              )}
              <Button onClick={onClose} className="bg-neon-purple hover:bg-neon-purple/90">
                Continue Earning
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-7xl mb-4">⚠️</div>
            <h2 className="text-3xl font-bold text-white mb-4">Ad Abandoned</h2>
            <p className="text-gray-300 mb-8">
              You need to watch the full ad to earn coins
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={onClose} className="border-gray-500 text-gray-300">
                Exit
              </Button>
              <Button onClick={handleRetry} className="bg-neon-purple hover:bg-neon-purple/90">
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerAdView;
