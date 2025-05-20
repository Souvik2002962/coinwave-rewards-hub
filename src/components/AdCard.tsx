
import React, { useState } from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AdCardProps {
  adId: string;
  title: string;
  description: string;
  coinReward: number;
  imageUrl: string;
  videoUrl?: string;
  type: 'video' | 'banner' | 'carousel';
}

const AdCard = ({
  adId,
  title,
  description,
  coinReward,
  imageUrl,
  videoUrl,
  type
}: AdCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [watchedState, setWatchedState] = useState<'unwatched' | 'watching' | 'watched'>('unwatched');
  const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 });
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Calculate rotation values based on mouse position
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 10; // -5 to 5 degrees
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -10; // -5 to 5 degrees
    
    setCardRotation({ x, y });
  };
  
  const resetRotation = () => {
    setCardRotation({ x: 0, y: 0 });
    setIsHovering(false);
  };

  const watchAd = () => {
    // In a real implementation, this would trigger video ad viewing
    setWatchedState('watching');
    
    // Simulate ad completion after 3 seconds
    setTimeout(() => {
      setWatchedState('watched');
      
      // Show reward animation and toast notification
      toast(
        <div className="flex items-center gap-2">
          <div className="coin w-8 h-8 animate-coin-bounce">💰</div>
          <span>You earned <span className="font-bold text-yellow-400">{coinReward} coins!</span></span>
        </div>,
        {
          position: 'top-center',
          duration: 3000,
        }
      );
    }, 3000);
  };

  return (
    <div 
      className="neon-card tilting-card w-full max-w-xs mx-auto"
      style={{ 
        transform: `perspective(1000px) rotateX(${cardRotation.x}deg) rotateY(${cardRotation.y}deg)`,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={resetRotation}
    >
      <div className="relative overflow-hidden rounded-t-lg h-48">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ transform: isHovering ? 'scale(1.05)' : 'scale(1)' }}
        />
        {type === 'video' && watchedState === 'unwatched' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-neon-purple/80 flex items-center justify-center animate-pulse">
              <Play className="h-8 w-8 text-white" fill="white" />
            </div>
          </div>
        )}
        {watchedState === 'watching' && (
          <div className="absolute inset-0 bg-black/90 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="animate-spin h-12 w-12 border-4 border-neon-purple border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Watching ad...</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 relative z-10">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-white">{title}</h3>
          <div className="flex items-center bg-neon-purple/20 rounded-full px-2 py-1">
            <span className="text-yellow-400 text-sm font-medium">+{coinReward}</span>
            <div className="coin w-4 h-4 ml-1 text-xs">💰</div>
          </div>
        </div>
        <p className="text-gray-300 text-sm mb-4">{description}</p>
        
        {watchedState === 'unwatched' && (
          <Button 
            className="w-full bg-neon-purple hover:bg-neon-purple/90"
            onClick={watchAd}
          >
            Watch & Earn
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
        
        {watchedState === 'watching' && (
          <Button 
            className="w-full bg-muted text-muted-foreground" 
            disabled
          >
            Watching...
          </Button>
        )}
        
        {watchedState === 'watched' && (
          <Button 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled
          >
            Coins Earned!
          </Button>
        )}
      </div>
    </div>
  );
};

export default AdCard;
