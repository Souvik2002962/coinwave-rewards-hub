
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Coins } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

interface WheelSegment {
  value: number;
  color: string;
  textColor: string;
}

const SpinWheel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [hasSpunToday, setHasSpunToday] = useState(false);

  const segments: WheelSegment[] = [
    { value: 10, color: '#3B82F6', textColor: '#FFFFFF' },
    { value: 50, color: '#10B981', textColor: '#FFFFFF' },
    { value: 0, color: '#6B7280', textColor: '#FFFFFF' },
    { value: 150, color: '#F59E0B', textColor: '#000000' },
    { value: 200, color: '#EF4444', textColor: '#FFFFFF' },
    { value: 800, color: '#8B5CF6', textColor: '#FFFFFF' }
  ];

  const spinWheel = () => {
    if (isSpinning || hasSpunToday) return;

    setIsSpinning(true);
    
    // Random rotation between 1440 and 2880 degrees (4-8 full rotations)
    const randomRotation = Math.floor(Math.random() * 1440) + 1440;
    const newRotation = rotation + randomRotation;
    
    setRotation(newRotation);

    // Calculate which segment the wheel stopped on
    const normalizedRotation = newRotation % 360;
    const segmentAngle = 360 / segments.length;
    const winningIndex = Math.floor((360 - normalizedRotation + segmentAngle / 2) / segmentAngle) % segments.length;
    const wonCoins = segments[winningIndex].value;

    setTimeout(() => {
      setIsSpinning(false);
      setHasSpunToday(true);
      
      if (wonCoins > 0) {
        toast({
          title: "Congratulations!",
          description: `You won ${wonCoins} coins!`,
        });
      } else {
        toast({
          title: "Better luck next time!",
          description: "You didn't win any coins this time.",
        });
      }
    }, 3000);
  };

  const createSegmentPath = (index: number) => {
    const segmentAngle = 360 / segments.length;
    const startAngle = index * segmentAngle;
    const endAngle = (index + 1) * segmentAngle;
    
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    
    const largeArcFlag = segmentAngle > 180 ? 1 : 0;
    
    const x1 = 150 + 140 * Math.cos(startAngleRad);
    const y1 = 150 + 140 * Math.sin(startAngleRad);
    const x2 = 150 + 140 * Math.cos(endAngleRad);
    const y2 = 150 + 140 * Math.sin(endAngleRad);
    
    return `M 150 150 L ${x1} ${y1} A 140 140 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  const getTextPosition = (index: number) => {
    const segmentAngle = 360 / segments.length;
    const angle = (index * segmentAngle + segmentAngle / 2) * Math.PI / 180;
    const x = 150 + 100 * Math.cos(angle);
    const y = 150 + 100 * Math.sin(angle);
    return { x, y, angle: angle * 180 / Math.PI };
  };

  return (
    <div className="min-h-screen bg-cyber-dark">
      <NavBar />
      
      <div className="container mx-auto px-4 pb-16 pt-28">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/earn')}
            className="text-white hover:text-neon-purple mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Earn
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{t('earn.spinWheel')}</h1>
          <p className="text-gray-400">Try your luck once daily for a chance to win up to 800 coins!</p>
        </div>

        <div className="flex flex-col items-center">
          {/* Wheel Container */}
          <div className="relative mb-8">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
              <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[30px] border-l-transparent border-r-transparent border-b-neon-blue"></div>
            </div>
            
            {/* Wheel */}
            <div className="relative">
              <svg
                width="300"
                height="300"
                className="drop-shadow-2xl"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
                }}
              >
                {/* Outer glow circle */}
                <circle
                  cx="150"
                  cy="150"
                  r="145"
                  fill="none"
                  stroke="url(#neonGlow)"
                  strokeWidth="4"
                />
                
                {/* Segments */}
                {segments.map((segment, index) => (
                  <g key={index}>
                    <path
                      d={createSegmentPath(index)}
                      fill={segment.color}
                      stroke="#1a1a1a"
                      strokeWidth="2"
                    />
                    <text
                      x={getTextPosition(index).x}
                      y={getTextPosition(index).y}
                      fill={segment.textColor}
                      fontSize="14"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${getTextPosition(index).angle}, ${getTextPosition(index).x}, ${getTextPosition(index).y})`}
                    >
                      {segment.value === 0 ? '0' : segment.value}
                    </text>
                    <text
                      x={getTextPosition(index).x}
                      y={getTextPosition(index).y + 15}
                      fill={segment.textColor}
                      fontSize="10"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${getTextPosition(index).angle}, ${getTextPosition(index).x}, ${getTextPosition(index).y + 15})`}
                    >
                      Coins
                    </text>
                  </g>
                ))}
                
                {/* Center circle */}
                <circle
                  cx="150"
                  cy="150"
                  r="25"
                  fill="#1a1a1a"
                  stroke="url(#neonGlow)"
                  strokeWidth="2"
                />
                
                {/* Gradient definitions */}
                <defs>
                  <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Decorative coins around the wheel */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-8 h-8 coin text-sm animate-pulse"
                  style={{
                    top: `${50 + 45 * Math.sin((i * Math.PI) / 4)}%`,
                    left: `${50 + 45 * Math.cos((i * Math.PI) / 4)}%`,
                    transform: 'translate(-50%, -50%)',
                    animationDelay: `${i * 0.2}s`
                  }}
                >
                  💰
                </div>
              ))}
            </div>
          </div>

          {/* Spin Button */}
          <Button
            onClick={spinWheel}
            disabled={isSpinning || hasSpunToday}
            className={`px-12 py-6 text-xl font-bold rounded-full transition-all ${
              hasSpunToday
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-purple'
            }`}
          >
            {isSpinning ? 'SPINNING...' : hasSpunToday ? 'USED TODAY' : 'SPIN'}
          </Button>

          {hasSpunToday && (
            <p className="text-gray-400 mt-4">Come back tomorrow for another spin!</p>
          )}

          {/* User's current balance */}
          {user && (
            <div className="mt-8 neon-border px-6 py-3 rounded-full flex items-center">
              <Coins className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-white font-medium text-lg">{user.coinBalance} Coins</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpinWheel;
