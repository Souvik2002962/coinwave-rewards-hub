
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { coinService } from '@/services/CoinService';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";

interface CarouselAdViewProps {
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

const CarouselAdView = ({ ad, onClose }: CarouselAdViewProps) => {
  const { user, updateCoins } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewedAll, setViewedAll] = useState(false);
  const [abandoned, setAbandoned] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [api, setApi] = useState<CarouselApi>();

  // Create a set of 3-5 slides based on the ad
  const totalSlides = Math.floor(Math.random() * 3) + 3; // 3 to 5 slides
  
  // Generate slide content using the original ad as base
  const slides = Array.from({ length: totalSlides }, (_, i) => ({
    id: `slide-${i}`,
    title: i === 0 ? ad.title : `${ad.title} - Part ${i + 1}`,
    description: i === 0 ? ad.description : `Learn more about our ${ad.title} offering (${i + 1}/${totalSlides})`,
    imageUrl: ad.imageUrl, // In a real app, these would be different images
    viewed: i === 0, // First slide is viewed immediately
  }));

  const [slideStates, setSlideStates] = useState(slides);
  
  // Set up carousel API listener
  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      const current = api.selectedScrollSnap();
      setCurrentSlide(current);
      
      // Mark the current slide as viewed
      setSlideStates(prev => prev.map((slide, i) => 
        i === current ? { ...slide, viewed: true } : slide
      ));
    };

    api.on("select", onSelect);
    onSelect(); // Call once to set initial state

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  
  // Track when all slides are viewed
  useEffect(() => {
    const allViewed = slideStates.every(slide => slide.viewed);
    if (allViewed && !viewedAll) {
      setViewedAll(true);
    }
  }, [slideStates, viewedAll]);

  const handleCompletion = async () => {
    setCompleted(true);
    
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
    setSlideStates(slides);
    setCurrentSlide(0);
    setViewedAll(false);
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
      
      <div className="w-full h-full max-w-4xl max-h-screen flex flex-col items-center justify-center p-4">
        {!completed && !abandoned ? (
          <>
            <div className="mb-4 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                {slideStates[currentSlide]?.title}
              </h2>
              <p className="text-gray-300 mb-2">
                {slideStates[currentSlide]?.description}
              </p>
              <div className="flex items-center justify-center mb-4">
                <div className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">
                  Swipe through all slides to earn {ad.coinReward} coins
                </div>
              </div>
            </div>
            
            <Carousel
              className="w-full max-w-3xl"
              setApi={setApi}
            >
              <CarouselContent>
                {slideStates.map((slide, index) => (
                  <CarouselItem key={slide.id} className="flex justify-center">
                    <div className="relative w-full">
                      <img 
                        src={slide.imageUrl} 
                        alt={slide.title} 
                        className="w-full h-auto max-h-[50vh] object-contain rounded-lg shadow-2xl"
                      />
                      {slide.viewed && (
                        <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                          <Check size={18} />
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4 space-x-12">
                <CarouselPrevious className="relative inset-auto left-0 top-0 translate-y-0" />
                <CarouselNext className="relative inset-auto right-0 top-0 translate-y-0" />
              </div>
            </Carousel>
            
            <div className="w-full max-w-md mt-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-medium">
                  {currentSlide + 1} of {totalSlides} slides
                </span>
                <span className="text-white font-medium">
                  {slideStates.filter(s => s.viewed).length}/{totalSlides} viewed
                </span>
              </div>
              <Progress 
                value={(slideStates.filter(s => s.viewed).length / totalSlides) * 100} 
                className="h-2 bg-white/20" 
              />
              
              {viewedAll && (
                <div className="mt-6 flex justify-center">
                  <Button 
                    className="bg-neon-purple hover:bg-neon-purple/90 px-8"
                    onClick={handleCompletion}
                  >
                    Claim {ad.coinReward} Coins
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : completed ? (
          <div className="text-center">
            <div className="text-7xl mb-4">🎉</div>
            <div className="mb-4">
              <Badge className="bg-green-500 text-white px-4 py-2 text-lg font-bold mb-2">
                Coins Earned!
              </Badge>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              You earned {ad.coinReward} coins!
            </h2>
            <p className="text-gray-300 mb-8">
              Thank you for viewing all carousel ads for {ad.title}
            </p>
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
            <h2 className="text-3xl font-bold text-white mb-4">Incomplete Ad</h2>
            <p className="text-gray-300 mb-8">
              You need to view all carousel slides to earn coins
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

export default CarouselAdView;
