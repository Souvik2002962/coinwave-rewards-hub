
import React, { useState } from 'react';
import { Share, Copy, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ReferralCard = () => {
  const [copied, setCopied] = useState(false);
  const [referrals, setReferrals] = useState(3);
  const [pendingInvites, setPendingInvites] = useState(2);
  
  const referralCode = "COINUSER123";
  const referralLink = `https://coincart.com/ref/${referralCode}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join CoinCart and earn rewards!',
        text: 'Sign up with my referral code and earn 100 bonus coins instantly!',
        url: referralLink,
      })
      .catch(console.error);
    }
  };

  return (
    <Card className="neon-card w-full overflow-hidden">
      <CardHeader className="pb-2 relative">
        <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br from-neon-purple/30 to-neon-blue/30 blur-xl"></div>
        <CardTitle className="text-white z-10 relative">Refer & Earn</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="bg-cyber-dark border border-gray-800 rounded-md p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">Your Referral Code</span>
              <span className="text-xs text-neon-blue">100 coins per referral</span>
            </div>
            <div className="flex">
              <div className="bg-gray-800 rounded-l-md py-2 px-4 w-full">
                <p className="font-mono tracking-wide text-white">{referralCode}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="bg-gray-900 hover:bg-gray-800 rounded-l-none rounded-r-md border-l border-gray-700"
                onClick={handleCopyLink}
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
              onClick={handleShare}
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="bg-cyber-dark p-3 rounded-md border border-gray-800 text-center">
              <p className="text-2xl font-bold text-white">{referrals}</p>
              <p className="text-xs text-gray-400">Successful Referrals</p>
            </div>
            <div className="bg-cyber-dark p-3 rounded-md border border-gray-800 text-center">
              <p className="text-2xl font-bold text-white">{pendingInvites}</p>
              <p className="text-xs text-gray-400">Pending Invites</p>
            </div>
          </div>
          
          <div className="bg-cyber-dark border border-cyber-orange/50 rounded-md p-3">
            <p className="text-sm text-white">
              <span className="text-cyber-orange font-bold">🔥 Special Offer:</span> Invite 3 friends in 24 hours and get 100 bonus coins!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralCard;
