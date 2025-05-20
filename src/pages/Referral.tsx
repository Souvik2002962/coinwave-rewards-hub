
import React, { useState } from 'react';
import { Share, Copy, CheckCheck, Trophy, ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import ReferralCard from '@/components/ReferralCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  referrals: number;
}

const Referral = () => {
  const [copied, setCopied] = useState(false);
  
  const leaderboard: LeaderboardUser[] = [
    { id: 'user1', name: 'JohnDoe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', referrals: 28 },
    { id: 'user2', name: 'CryptoQueen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', referrals: 24 },
    { id: 'user3', name: 'TechGuru', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', referrals: 21 },
    { id: 'user4', name: 'CosmicCoder', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa', referrals: 19 },
    { id: 'user5', name: 'PixelPioneer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', referrals: 17 },
    { id: 'user6', name: 'DigitalNomad', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dave', referrals: 15 },
    { id: 'user7', name: 'MetaExplorer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', referrals: 13 },
    { id: 'user8', name: 'BlockchainBaron', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan', referrals: 11 },
    { id: 'user9', name: 'VirtualVoyager', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kate', referrals: 9 },
    { id: 'user10', name: 'WebWizard', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom', referrals: 7 },
  ];
  
  const referralCode = "COINUSER123";
  const referralLink = `https://coincart.com/ref/${referralCode}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-cyber-dark">
      <NavBar />
      
      <div className="container mx-auto px-4 pb-16 pt-28">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Refer & Earn</h1>
            <p className="text-gray-400">Share CoinCart with friends and earn coins for every successful referral</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {/* Main Referral Card */}
            <Card className="neon-card p-6 relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-gradient-to-br from-neon-purple/30 to-neon-blue/30 blur-xl"></div>
              <div className="relative z-10">
                <CardTitle className="text-2xl text-white mb-4">Your Referral Program</CardTitle>
                <div className="space-y-6">
                  <div className="bg-cyber-dark border border-gray-800 rounded-md p-5">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Your Referral Link</span>
                      <span className="text-xs text-neon-blue">Share anywhere</span>
                    </div>
                    <div className="flex">
                      <div className="bg-gray-800 rounded-l-md py-3 px-4 w-full overflow-x-auto">
                        <p className="font-mono tracking-wide text-white whitespace-nowrap">{referralLink}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="bg-gray-900 hover:bg-gray-800 rounded-l-none rounded-r-md border-l border-gray-700"
                        onClick={handleCopyLink}
                      >
                        {copied ? <CheckCheck className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-gray-400" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-cyber-dark border border-gray-800 rounded-md p-5">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Your Referral Code</span>
                      <span className="text-xs text-neon-blue">Easy to share verbally</span>
                    </div>
                    <div className="flex">
                      <div className="bg-gray-800 rounded-l-md py-3 px-4 w-full">
                        <p className="font-mono tracking-wide text-white text-xl text-center">{referralCode}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="bg-gray-900 hover:bg-gray-800 rounded-l-none rounded-r-md border-l border-gray-700"
                        onClick={() => {
                          navigator.clipboard.writeText(referralCode);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                      >
                        {copied ? <CheckCheck className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-gray-400" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button 
                      className="w-full bg-neon-purple hover:bg-neon-purple/90 flex-1"
                      onClick={handleCopyLink}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Link
                    </Button>
                    <Button 
                      className="w-full bg-neon-blue hover:bg-neon-blue/90 flex-1"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: 'Join CoinCart and earn rewards!',
                            text: 'Sign up with my referral code and earn 100 bonus coins instantly!',
                            url: referralLink,
                          }).catch(console.error);
                        }
                      }}
                    >
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="neon-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Referral Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Your Rank</span>
                      <span className="text-sm font-medium text-white">#6</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Total Referrals</span>
                      <span className="text-sm font-medium text-white">15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Coins Earned</span>
                      <span className="text-sm font-medium text-white">1,500</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="neon-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Special Challenge</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Challenge Progress</span>
                      <span className="text-sm font-medium text-white">1 of 3</span>
                    </div>
                    <Progress value={33} className="h-2 bg-gray-800" />
                    <p className="text-xs text-neon-purple mt-2">
                      🔥 Refer 3 friends in 24h for 100 bonus coins!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Leaderboard */}
          <Card className="neon-card overflow-hidden">
            <CardHeader className="pb-3 pt-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-white flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
                  Referral Leaderboard
                </CardTitle>
                <span className="text-xs text-neon-blue">Weekly Contest</span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4 bg-gradient-to-r from-neon-purple/30 to-neon-blue/20">
                <div className="text-center">
                  <p className="text-white font-medium">Top referrer wins:</p>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="text-2xl font-bold text-white">1,000</span>
                    <div className="coin w-6 h-6">💰</div>
                    <span className="text-white">+ Premium Product</span>
                  </div>
                </div>
              </div>
              
              <div className="divide-y divide-gray-800">
                {leaderboard.map((user, index) => (
                  <div 
                    key={user.id} 
                    className={`flex items-center justify-between p-4 ${index < 3 ? 'bg-gradient-to-r from-cyber-dark to-neon-purple/5' : ''}`}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 text-center font-bold text-lg mr-3">
                        {index === 0 && <span className="text-yellow-400">🥇</span>}
                        {index === 1 && <span className="text-gray-300">🥈</span>}
                        {index === 2 && <span className="text-amber-700">🥉</span>}
                        {index > 2 && <span className="text-gray-400">{index + 1}</span>}
                      </div>
                      
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-700 mr-3">
                          <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                        </div>
                        <span className={`font-medium ${index < 3 ? 'text-white' : 'text-gray-300'}`}>{user.name}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="font-bold text-white">{user.referrals}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-800">
                <Button variant="link" className="w-full text-neon-purple">
                  View Full Leaderboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Referral;
