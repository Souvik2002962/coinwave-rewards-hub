
import React, { useEffect, useState } from 'react';
import { Coins, ArrowDown, ArrowUp, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import coinService, { CoinTransaction } from '@/services/CoinService';
import { Link } from 'react-router-dom';

const CoinWallet = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<CoinTransaction[]>([]);
  const [earnedCoins, setEarnedCoins] = useState<number>(0);
  const [spentCoins, setSpentCoins] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    if (user) {
      // Get transactions for the current user
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const userTransactions = await coinService.getTransactions(user.id);
          setTransactions(userTransactions);
          
          const earned = await coinService.getTotalEarned(user.id);
          setEarnedCoins(earned);
          
          const spent = await coinService.getTotalSpent(user.id);
          setSpentCoins(spent);
        } catch (error) {
          console.error("Error fetching coin data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchData();
    }
  }, [user]);
  
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };
  
  const coinBalance = user ? user.coinBalance : 0;

  if (!user) {
    return (
      <Card className="neon-card w-full">
        <CardContent className="p-6 text-center">
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Coins className="h-12 w-12 text-yellow-400 opacity-50" />
            <div>
              <h3 className="text-lg font-medium text-white">Sign in to view your coin wallet</h3>
              <p className="text-sm text-gray-400 mt-1">Track your earnings and spending</p>
            </div>
            <Link to="/login">
              <Button className="bg-neon-purple hover:bg-neon-purple/90">
                Sign In
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="neon-card w-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center">
            <Coins className="h-6 w-6 text-yellow-400 mr-2" />
            <span className="text-white">Coin Wallet</span>
          </div>
          <div className="text-2xl font-bold text-white flex items-center">
            <span className="mr-1">{coinBalance}</span>
            <div className="coin w-6 h-6 text-sm">💰</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue="transactions">
          <TabsList className="w-full bg-cyber-dark">
            <TabsTrigger value="transactions" className="w-1/2">History</TabsTrigger>
            <TabsTrigger value="stats" className="w-1/2">Stats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions">
            <div className="space-y-3 mt-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {isLoading ? (
                <div className="text-center p-6">
                  <p className="text-gray-400">Loading transactions...</p>
                </div>
              ) : transactions.length === 0 ? (
                <div className="text-center p-6">
                  <p className="text-gray-400">No transactions yet</p>
                </div>
              ) : (
                transactions.map((transaction) => (
                  <div 
                    key={transaction.id} 
                    className="flex justify-between items-center p-3 bg-cyber-dark rounded-md border border-gray-800"
                  >
                    <div className="flex items-center">
                      <div className={`rounded-full p-2 mr-3 
                        ${transaction.type === 'earned' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                        {transaction.type === 'earned' ? 
                          <ArrowUp className="h-4 w-4 text-green-500" /> : 
                          <ArrowDown className="h-4 w-4 text-red-500" />
                        }
                      </div>
                      <div>
                        <p className="text-sm text-white">{transaction.description}</p>
                        <p className="text-xs text-gray-400">{formatDate(transaction.date)}</p>
                      </div>
                    </div>
                    <div className={`font-medium ${transaction.type === 'earned' ? 'text-green-500' : 'text-red-500'}`}>
                      {transaction.type === 'earned' ? '+' : '-'}{transaction.amount} 
                    </div>
                  </div>
                ))
              )}
            </div>
            <Button variant="ghost" className="w-full mt-3 text-neon-purple hover:text-neon-purple hover:bg-neon-purple/10">
              <Link to="/profile?tab=history" className="flex items-center w-full justify-center">
                View All Transactions
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </TabsContent>
          
          <TabsContent value="stats">
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-cyber-dark p-4 rounded-md border border-green-500/30">
                  <p className="text-xs text-gray-400 mb-1">Total Earned</p>
                  <p className="text-xl font-bold text-green-500">
                    {isLoading ? "Loading..." : `+${earnedCoins}`}
                  </p>
                </div>
                <div className="bg-cyber-dark p-4 rounded-md border border-red-500/30">
                  <p className="text-xs text-gray-400 mb-1">Total Spent</p>
                  <p className="text-xl font-bold text-red-500">
                    {isLoading ? "Loading..." : `-${spentCoins}`}
                  </p>
                </div>
              </div>
              
              <div className="bg-cyber-dark p-4 rounded-md border border-gray-800">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-400">Daily Streak</span>
                  <span className="text-xs font-medium text-white">5 days</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-neon-purple to-neon-blue h-2 rounded-full"
                    style={{ width: `${(5/7) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-1">2 more days for 200 bonus coins!</p>
              </div>
              
              <Link to="/earn">
                <Button className="w-full bg-neon-blue hover:bg-neon-blue/90">
                  Spin & Win More Coins
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CoinWallet;
