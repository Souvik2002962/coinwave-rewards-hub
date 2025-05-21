
import { toast } from "sonner";

// Define the conversion rates as constants
const COIN_TO_INR = 0.010;  // 1 coin = 0.010 Indian Rupees
const COIN_TO_USD = 0.012;  // 1 coin = 0.012 USD

// Types
export interface CoinTransaction {
  id: string;
  userId: string;
  type: 'earned' | 'spent';
  amount: number;
  description: string;
  date: Date;
  source?: 'ad' | 'referral' | 'purchase' | 'mission' | 'other';
}

export interface CoinConversionOptions {
  targetCurrency?: 'INR' | 'USD';
  includeSymbol?: boolean;
}

class CoinService {
  // Mock in-memory store for transactions
  private transactions: CoinTransaction[] = [];

  // Get all transactions for a user
  getTransactions(userId: string): CoinTransaction[] {
    return this.transactions.filter(t => t.userId === userId)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  // Add a transaction
  addTransaction(transaction: Omit<CoinTransaction, 'id' | 'date'>): CoinTransaction {
    const newTransaction: CoinTransaction = {
      ...transaction,
      id: `txn_${Date.now()}${Math.random().toString(36).substring(2, 7)}`,
      date: new Date()
    };
    
    this.transactions.push(newTransaction);
    return newTransaction;
  }

  // Calculate total earned coins
  getTotalEarned(userId: string): number {
    return this.transactions
      .filter(t => t.userId === userId && t.type === 'earned')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  // Calculate total spent coins
  getTotalSpent(userId: string): number {
    return this.transactions
      .filter(t => t.userId === userId && t.type === 'spent')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  // Convert coins to currency value with formatting
  convertCoinsToValue(coins: number, options: CoinConversionOptions = {}): string {
    const { targetCurrency = 'INR', includeSymbol = true } = options;
    
    let value: number;
    let symbol: string;
    
    if (targetCurrency === 'USD') {
      value = coins * COIN_TO_USD;
      symbol = '$';
    } else {
      value = coins * COIN_TO_INR;
      symbol = '₹';
    }
    
    // Format the value to 2 decimal places
    const formattedValue = value.toFixed(2);
    
    return includeSymbol ? `${symbol}${formattedValue}` : formattedValue;
  }

  // Track watched ad
  trackAdWatched(userId: string, adName: string, coinsEarned: number): void {
    this.addTransaction({
      userId,
      type: 'earned',
      amount: coinsEarned,
      description: `Watched ${adName} advertisement`,
      source: 'ad'
    });
    
    toast.success(`Earned ${coinsEarned} coins for watching ${adName}!`);
  }

  // Track successful referral
  trackReferral(userId: string, referredEmail: string, coinsEarned: number): void {
    this.addTransaction({
      userId,
      type: 'earned',
      amount: coinsEarned,
      description: `Referral bonus: ${referredEmail}`,
      source: 'referral'
    });
    
    toast.success(`Earned ${coinsEarned} coins for referring ${referredEmail}!`);
  }

  // Track coin spend on purchase
  trackPurchase(userId: string, productName: string, coinsSpent: number): void {
    this.addTransaction({
      userId,
      type: 'spent',
      amount: coinsSpent,
      description: `Discount on ${productName}`,
      source: 'purchase'
    });
    
    toast.success(`Used ${coinsSpent} coins for discount on ${productName}`);
  }

  // Track mission completion
  trackMission(userId: string, missionName: string, coinsEarned: number): void {
    this.addTransaction({
      userId,
      type: 'earned',
      amount: coinsEarned,
      description: missionName,
      source: 'mission'
    });
    
    toast.success(`Earned ${coinsEarned} coins for completing: ${missionName}!`);
  }
}

// Create and export a singleton instance
export const coinService = new CoinService();

// Initialize with some sample transactions
const sampleTransactions: Omit<CoinTransaction, 'id' | 'date'>[] = [
  {
    userId: "user123",
    type: 'earned',
    amount: 50,
    description: 'Watched Nike advertisement',
    source: 'ad'
  },
  {
    userId: "user123",
    type: 'earned',
    amount: 100,
    description: 'Daily login streak (5 days)',
    source: 'mission'
  },
  {
    userId: "user123",
    type: 'spent',
    amount: 200,
    description: 'Discount on Wireless Headphones',
    source: 'purchase'
  },
  {
    userId: "user123",
    type: 'earned',
    amount: 25,
    description: 'Watched Samsung advertisement',
    source: 'ad'
  },
  {
    userId: "user123",
    type: 'earned',
    amount: 500,
    description: 'Referral bonus: john@example.com',
    source: 'referral'
  }
];

// Add sample transactions
sampleTransactions.forEach(transaction => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 10)); // Random date in the last 10 days
  
  coinService.addTransaction({
    ...transaction,
  });
});

export default coinService;
