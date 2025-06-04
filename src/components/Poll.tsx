
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { coinService } from '@/services/CoinService';
import { toast } from 'sonner';

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface PollProps {
  question: string;
  options: PollOption[];
  coinReward: number;
  onComplete?: () => void;
}

const Poll = ({ question, options, coinReward, onComplete }: PollProps) => {
  const { user, updateCoins } = useAuth();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [pollResults, setPollResults] = useState(options);

  const totalVotes = pollResults.reduce((sum, option) => sum + option.votes, 0);

  const handleVote = async (optionId: string) => {
    if (hasVoted || !user) return;

    setSelectedOption(optionId);
    setHasVoted(true);

    // Update poll results
    const updatedResults = pollResults.map(option =>
      option.id === optionId 
        ? { ...option, votes: option.votes + 1 }
        : option
    );
    setPollResults(updatedResults);

    // Award coins
    updateCoins(coinReward);
    
    // Track the poll participation
    await coinService.trackAdWatched(
      user.id,
      `Poll: ${question}`,
      coinReward
    );

    toast.success(`You earned ${coinReward} coins for participating in the poll!`);
    
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <Card className="p-6 bg-white/10 border border-white/20 backdrop-blur-lg">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white mb-2">{question}</h3>
        <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
          <span>Participate and earn {coinReward} coins</span>
          <span>{totalVotes} total votes</span>
        </div>
      </div>

      <div className="space-y-3">
        {pollResults.map((option) => {
          const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          const isSelected = selectedOption === option.id;

          return (
            <div key={option.id} className="relative">
              <Button
                variant={hasVoted ? "ghost" : "outline"}
                className={`w-full text-left justify-start p-4 h-auto relative overflow-hidden ${
                  hasVoted 
                    ? 'cursor-default border-white/30' 
                    : 'border-white/50 hover:border-white/80 hover:bg-white/5'
                } ${isSelected ? 'border-neon-purple bg-neon-purple/20' : ''}`}
                onClick={() => handleVote(option.id)}
                disabled={hasVoted}
              >
                {hasVoted && (
                  <div 
                    className="absolute inset-0 bg-neon-purple/20 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                )}
                
                <div className="relative flex items-center justify-between w-full">
                  <span className="text-white font-medium">{option.text}</span>
                  <div className="flex items-center space-x-2">
                    {hasVoted && (
                      <span className="text-sm text-gray-300">
                        {Math.round(percentage)}%
                      </span>
                    )}
                    {isSelected && hasVoted && (
                      <Check size={16} className="text-neon-purple" />
                    )}
                  </div>
                </div>
              </Button>
            </div>
          );
        })}
      </div>

      {!user && (
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">Login to participate in polls and earn coins</p>
        </div>
      )}
    </Card>
  );
};

export default Poll;
