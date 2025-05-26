
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VideoAd = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30); // 30 second video
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scenes = [
    {
      time: 0,
      title: "Facebook, Instagram, Google, YouTube",
      description: "Expensive. Complex. Users skip your ads.",
      visual: "Traditional platforms logos with X marks"
    },
    {
      time: 8,
      title: "Meet CoinCart - The Smart Alternative",
      description: "Users actually WANT to watch your ads",
      visual: "CoinCart logo with happy users"
    },
    {
      time: 16,
      title: "Real Engagement. Real Results.",
      description: "95% engagement • 50% lower costs • 3x better ROI",
      visual: "Stats and analytics"
    },
    {
      time: 24,
      title: "Start Advertising Smarter Today",
      description: "Join the future of advertising",
      visual: "CTA and success"
    }
  ];

  const currentScene = scenes.reduce((prev, scene) => 
    currentTime >= scene.time ? scene : prev
  , scenes[0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration || 30);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time: number) => {
    const seconds = Math.floor(time % 60);
    return `0:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      ref={containerRef}
      className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'w-full max-w-4xl mx-auto'}`}
    >
      {/* Video Container */}
      <div className="relative aspect-video bg-gradient-to-br from-cyber-dark to-gray-900 rounded-lg overflow-hidden border border-neon-purple/30">
        {/* Background Video */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-clouds-in-blue-sky-28111-large.mp4"
          poster="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop"
          playsInline
          muted={isMuted}
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-center p-6">
          {/* Scene Content */}
          <div className="mb-6">
            <h2 className="text-xl md:text-3xl font-bold text-white mb-3 animate-fade-in">
              {currentScene.title}
            </h2>
            <p className="text-base md:text-lg text-gray-200 max-w-xl animate-fade-in">
              {currentScene.description}
            </p>
          </div>

          {/* Traditional Platforms with X marks */}
          {currentTime < 8 && (
            <div className="flex space-x-6 mb-6 animate-scale-in">
              <div className="relative">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">FB</span>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <X className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">IG</span>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <X className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">YT</span>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <X className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">G</span>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <X className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          )}

          {/* CoinCart Logo */}
          {currentTime >= 8 && currentTime < 16 && (
            <div className="mb-6 animate-scale-in">
              <div className="h-20 w-20 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue flex items-center justify-center mx-auto mb-4 animate-pulse">
                <span className="text-white font-bold text-2xl">CC</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Coin<span className="text-neon-purple">Cart</span>
              </h3>
              <div className="flex items-center justify-center mt-2 space-x-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                <span className="text-yellow-400 text-sm">Users Love Us!</span>
              </div>
            </div>
          )}

          {/* Key Stats */}
          {currentTime >= 16 && currentTime < 24 && (
            <div className="grid grid-cols-3 gap-4 mb-6 animate-fade-in">
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-purple animate-pulse">95%</div>
                <div className="text-xs text-gray-200">Engagement</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-blue animate-pulse">50%</div>
                <div className="text-xs text-gray-200">Lower Costs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 animate-pulse">3x</div>
                <div className="text-xs text-gray-200">Better ROI</div>
              </div>
            </div>
          )}

          {/* Final CTA */}
          {currentTime >= 24 && (
            <div className="animate-scale-in">
              <Button className="bg-neon-purple hover:bg-neon-purple/90 text-white px-8 py-4 text-lg animate-pulse">
                Start Now - It's Free!
              </Button>
            </div>
          )}
        </div>

        {/* Play/Pause Button */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              onClick={togglePlay}
              className="w-20 h-20 rounded-full bg-neon-purple/80 hover:bg-neon-purple text-white"
            >
              <Play className="w-8 h-8" fill="white" />
            </Button>
          </div>
        )}

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress Bar */}
          <div className="w-full bg-gray-600 rounded-full h-1 mb-4">
            <div 
              className="bg-neon-purple h-1 rounded-full transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePlay}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>

              <span className="text-white text-sm">
                {formatTime(currentTime)} / 0:30
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20"
              >
                {isFullscreen ? <X className="w-5 h-5" /> : <span className="w-5 h-5 text-xs">⛶</span>}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Description */}
      <div className="mt-6 text-center">
        <h3 className="text-xl font-bold text-white mb-2">
          30 Seconds That Will Change How You Think About Advertising
        </h3>
        <p className="text-gray-300 mb-4">
          See why smart advertisers are switching from Facebook, Instagram, Google & YouTube to our platform.
        </p>
        <div className="flex justify-center space-x-4">
          <Button className="bg-neon-purple hover:bg-neon-purple/90">
            Start Advertising Today
          </Button>
          <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoAd;
