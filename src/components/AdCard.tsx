
import React, { useState, useRef, useEffect } from 'react';
import { Play, ArrowRight, CheckCircle, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AdCardProps {
  adId: string;
  title: string;
  description: string;
  coinReward: number;
  imageUrl: string;
  videoUrl?: string;
  videoDuration?: number; // in seconds
  type: 'video' | 'banner' | 'carousel';
}

const AdCard = ({
  adId,
  title,
  description,
  coinReward,
  imageUrl,
  videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-spinning-around-the-earth-29351-large.mp4', // Default video if none provided
  videoDuration = 30, // default duration for demo purposes
  type
}: AdCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [watchedState, setWatchedState] = useState<'unwatched' | 'watching' | 'watched' | 'abandoned'>('unwatched');
  const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);
  const [adCompleted, setAdCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  
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

  useEffect(() => {
    return () => {
      // Clean up any timers when component unmounts
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const abandonAd = () => {
    if (watchedState === 'watching') {
      // User left before completion
      setWatchedState('abandoned');
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      // Stop video if it's playing
      if (videoRef.current) {
        videoRef.current.pause();
      }
      
      toast.error('Ad viewing abandoned. No coins earned.', {
        position: 'top-center',
        duration: 3000,
      });
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const watchAd = () => {
    // In a real implementation, this would trigger video ad viewing
    setWatchedState('watching');
    setProgress(0);
    
    // Play video if it exists
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.muted = isMuted;
        videoRef.current.play().catch(err => {
          console.error("Error playing video:", err);
          // Fallback if autoplay is blocked
          toast.error("Couldn't autoplay video. Please click the video to play.", {
            position: 'top-center',
            duration: 3000,
          });
        });
      }
    }, 100);
    
    // Set up progress tracking
    const intervalTime = 100; // Update progress every 100ms
    const totalIntervals = (videoDuration * 1000) / intervalTime;
    let currentInterval = 0;
    
    progressIntervalRef.current = window.setInterval(() => {
      currentInterval++;
      const newProgress = Math.min(100, (currentInterval / totalIntervals) * 100);
      setProgress(newProgress);
      
      // If we reach 100%, clear the interval
      if (newProgress >= 100) {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      }
    }, intervalTime) as unknown as number;
    
    // Simulate ad completion after videoDuration seconds
    timerRef.current = window.setTimeout(() => {
      setAdCompleted(true);
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
    }, videoDuration * 1000) as unknown as number;
  };

  const restartAd = () => {
    setWatchedState('unwatched');
    setProgress(0);
    setAdCompleted(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
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
        {type === 'video' && watchedState === 'watching' && (
          <video 
            ref={videoRef}
            src={videoUrl} 
            className="w-full h-full object-cover" 
            playsInline
            onClick={toggleMute}
          />
        )}
        
        {(type !== 'video' || watchedState !== 'watching') && (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: isHovering ? 'scale(1.05)' : 'scale(1)' }}
          />
        )}
        
        {type === 'video' && watchedState === 'unwatched' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-neon-purple/80 flex items-center justify-center animate-pulse">
              <Play className="h-8 w-8 text-white" fill="white" />
            </div>
          </div>
        )}
        
        {type === 'video' && watchedState === 'watching' && (
          <>
            <div className="absolute top-2 right-2 z-20">
              <Button 
                variant="ghost" 
                size="sm" 
                className="bg-black/40 hover:bg-black/60 p-1 rounded-full"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="h-4 w-4 text-white" /> : <Volume2 className="h-4 w-4 text-white" />}
              </Button>
            </div>
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
              <div className="text-white text-center absolute bottom-2 left-2 right-2">
                <div className="w-full bg-gray-700/80 rounded-full h-2">
                  <div 
                    className="bg-neon-purple h-2 rounded-full transition-all duration-100 ease-linear" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs mt-1 text-white/90">
                  {Math.floor(progress)}% complete
                </p>
              </div>
            </div>
          </>
        )}
        
        {watchedState === 'abandoned' && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="text-white text-center p-4">
              <p className="text-red-400 font-medium mb-2">Ad abandoned</p>
              <p className="text-sm mb-4">You need to watch the full ad to earn coins</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={restartAd}
                className="border-neon-purple text-neon-purple hover:bg-neon-purple/10"
              >
                Try Again
              </Button>
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
            className="w-full bg-red-600 hover:bg-red-700" 
            onClick={abandonAd}
          >
            Skip (No Coins)
          </Button>
        )}
        
        {watchedState === 'watched' && (
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
            disabled
          >
            <CheckCircle className="h-4 w-4" />
            Coins Earned!
          </Button>
        )}
        
        {watchedState === 'abandoned' && (
          <Button 
            className="w-full bg-neon-purple hover:bg-neon-purple/90"
            onClick={watchAd}
          >
            Watch & Earn
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default AdCard;
