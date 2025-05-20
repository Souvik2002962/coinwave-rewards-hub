
import React, { useState } from 'react';
import { Coins, ArrowDown, ArrowUp, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface Transaction {
  id: string;
  type: 'earned' | 'spent';
  amount: number;
  description: string;
  date: Date;
}

const CoinWallet = () => {
  const [coinBalance, setCoinBalance] = useState(1250);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 't1',
      type: 'earned',
      amount: 50,
      description: 'Watched Nike advertisement',
      date: new Date(2025, 4, 18)
    },
    {
      id: 't2',
      type: 'earned',
      amount: 100,
      description: 'Daily login streak (5 days)',
      date: new Date(2025, 4, 18)
    },
    {
      id: 't3',
      type: 'spent',
      amount: 200,
      description: 'Discount on Wireless Headphones',
      date: new Date(2025, 4, 17)
    },
    {
      id: 't4',
      type: 'earned',
      amount: 25,
      description: 'Watched Samsung advertisement',
      date: new Date(2025, 4, 17)
    },
    {
      id: 't5',
      type: 'earned',
      amount: 500,
      description: 'Referral bonus: john@example.com',
      date: new Date(2025, 4, 16)
    }
  ]);
  
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
  
  const earnedCoins = transactions
    .filter(t => t.type === 'earned')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const spentCoins = transactions
    .filter(t => t.type === 'spent')
    .reduce((sum, t) => sum + t.amount, 0);

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
              {transactions.map((transaction) => (
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
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-3 text-neon-purple hover:text-neon-purple hover:bg-neon-purple/10">
              View All Transactions
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </TabsContent>
          
          <TabsContent value="stats">
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-cyber-dark p-4 rounded-md border border-green-500/30">
                  <p className="text-xs text-gray-400 mb-1">Total Earned</p>
                  <p className="text-xl font-bold text-green-500">+{earnedCoins}</p>
                </div>
                <div className="bg-cyber-dark p-4 rounded-md border border-red-500/30">
                  <p className="text-xs text-gray-400 mb-1">Total Spent</p>
                  <p className="text-xl font-bold text-red-500">-{spentCoins}</p>
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
              
              <Button className="w-full bg-neon-blue hover:bg-neon-blue/90">
                Spin & Win More Coins
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CoinWallet;
