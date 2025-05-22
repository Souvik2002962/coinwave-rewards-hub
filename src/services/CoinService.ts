import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

// Define the conversion rates as constants
const COIN_TO_INR = 0.010;  // 1 coin = 0.010 Indian Rupees (1 paisa)
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
  // Local cache for transactions
  private transactions: CoinTransaction[] = [];

  // Get all transactions for a user
  async getTransactions(userId: string): Promise<CoinTransaction[]> {
    try {
      // First check if we have a user session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Use local transactions if no session
        return this.transactions.filter(t => t.userId === userId)
          .sort((a, b) => b.date.getTime() - a.date.getTime());
      }
      
      // Try to get transactions from Supabase
      const { data, error } = await supabase
        .from('user_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching transactions:", error);
        throw error;
      }
      
      // Transform the data to match our local format
      return data.map(t => ({
        id: t.id,
        userId: t.user_id,
        type: t.type,
        amount: t.amount,
        description: t.description,
        date: new Date(t.created_at),
        source: t.source
      }));
    } catch (error) {
      console.error("Error in getTransactions:", error);
      // Fallback to local transactions
      return this.transactions.filter(t => t.userId === userId)
        .sort((a, b) => b.date.getTime() - a.date.getTime());
    }
  }

  // Add a transaction
  async addTransaction(transaction: Omit<CoinTransaction, 'id' | 'date'>): Promise<CoinTransaction> {
    try {
      const newTransaction: CoinTransaction = {
        ...transaction,
        id: `txn_${Date.now()}${Math.random().toString(36).substring(2, 7)}`,
        date: new Date()
      };
      
      // First check if we have a user session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Try to insert into Supabase
        const { data, error } = await supabase
          .from('user_transactions')
          .insert([{
            user_id: transaction.userId,
            type: transaction.type,
            amount: transaction.amount,
            description: transaction.description,
            source: transaction.source
          }])
          .select();
          
        if (error) {
          console.error("Error adding transaction to Supabase:", error);
          // If Supabase fails, store locally
          this.transactions.push(newTransaction);
        } else {
          // Update user_rewards table to reflect current coins balance
          await this.updateUserRewards(transaction.userId);
        }
      } else {
        // Store locally if no session
        this.transactions.push(newTransaction);
      }
      
      return newTransaction;
    } catch (error) {
      console.error("Error in addTransaction:", error);
      // Fallback to local storage
      const newTransaction: CoinTransaction = {
        ...transaction,
        id: `txn_${Date.now()}${Math.random().toString(36).substring(2, 7)}`,
        date: new Date()
      };
      this.transactions.push(newTransaction);
      return newTransaction;
    }
  }
  
  // Update user rewards in Supabase
  private async updateUserRewards(userId: string): Promise<void> {
    try {
      // Calculate total coins from transactions
      const earned = await this.getTotalEarned(userId);
      const spent = await this.getTotalSpent(userId);
      const totalCoins = earned - spent;
      
      // Check if user rewards record exists
      const { data, error } = await supabase
        .from('user_rewards')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error("Error checking user_rewards:", error);
        return;
      }
      
      if (data) {
        // Update existing record
        await supabase
          .from('user_rewards')
          .update({ coins: totalCoins, last_updated: new Date() })
          .eq('user_id', userId);
      } else {
        // Insert new record
        await supabase
          .from('user_rewards')
          .insert([{ user_id: userId, coins: totalCoins }]);
      }
    } catch (error) {
      console.error("Error updating user rewards:", error);
    }
  }

  // Calculate total earned coins
  async getTotalEarned(userId: string): Promise<number> {
    try {
      // First check if we have a user session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Try to calculate from Supabase
        const { data, error } = await supabase
          .from('user_transactions')
          .select('amount')
          .eq('user_id', userId)
          .eq('type', 'earned');
          
        if (error) {
          console.error("Error calculating total earned:", error);
          throw error;
        }
        
        return data.reduce((sum, t) => sum + t.amount, 0);
      } else {
        // Use local transactions
        return this.transactions
          .filter(t => t.userId === userId && t.type === 'earned')
          .reduce((sum, t) => sum + t.amount, 0);
      }
    } catch (error) {
      console.error("Error in getTotalEarned:", error);
      // Fallback to local calculation
      return this.transactions
        .filter(t => t.userId === userId && t.type === 'earned')
        .reduce((sum, t) => sum + t.amount, 0);
    }
  }

  // Calculate total spent coins
  async getTotalSpent(userId: string): Promise<number> {
    try {
      // First check if we have a user session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Try to calculate from Supabase
        const { data, error } = await supabase
          .from('user_transactions')
          .select('amount')
          .eq('user_id', userId)
          .eq('type', 'spent');
          
        if (error) {
          console.error("Error calculating total spent:", error);
          throw error;
        }
        
        return data.reduce((sum, t) => sum + t.amount, 0);
      } else {
        // Use local transactions
        return this.transactions
          .filter(t => t.userId === userId && t.type === 'spent')
          .reduce((sum, t) => sum + t.amount, 0);
      }
    } catch (error) {
      console.error("Error in getTotalSpent:", error);
      // Fallback to local calculation
      return this.transactions
        .filter(t => t.userId === userId && t.type === 'spent')
        .reduce((sum, t) => sum + t.amount, 0);
    }
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

  // Track watched ad and earn coins
  async trackAdWatched(userId: string, adName: string, coinsEarned: number): Promise<void> {
    await this.addTransaction({
      userId,
      type: 'earned',
      amount: coinsEarned,
      description: `Watched ${adName} advertisement`,
      source: 'ad'
    });
    
    toast.success(`Earned ${coinsEarned} coins for watching ${adName}!`);
    
    // Update campaign metrics in Supabase (simplified version)
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Find campaign by name (simplified, real implementation would use campaign_id)
        const { data: campaign } = await supabase
          .from('campaigns')
          .select('id, views')
          .ilike('name', `%${adName}%`)
          .limit(1)
          .single();
          
        if (campaign) {
          // Update campaign views
          await supabase
            .from('campaigns')
            .update({ views: (campaign.views || 0) + 1 })
            .eq('id', campaign.id);
            
          // Record in metrics table
          const today = new Date().toISOString().split('T')[0];
          await supabase.from('metrics').insert([{
            campaign_id: campaign.id,
            date: today,
            views: 1,
            clicks: 0,
            conversions: 0
          }]);
        }
      }
    } catch (error) {
      console.error("Error updating campaign metrics:", error);
    }
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

  // Get current coin balance
  async getCurrentBalance(userId: string): Promise<number> {
    try {
      // First check if we have a user session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Try to get from Supabase
        const { data, error } = await supabase
          .from('user_rewards')
          .select('coins')
          .eq('user_id', userId)
          .single();
          
        if (error) {
          if (error.code === 'PGRST116') { // No rows found
            return 0;
          }
          console.error("Error getting coin balance:", error);
          throw error;
        }
        
        return data?.coins || 0;
      } else {
        // Calculate from local transactions
        const earned = await this.getTotalEarned(userId);
        const spent = await this.getTotalSpent(userId);
        return earned - spent;
      }
    } catch (error) {
      console.error("Error in getCurrentBalance:", error);
      // Fallback to local calculation
      const earned = this.transactions
        .filter(t => t.userId === userId && t.type === 'earned')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const spent = this.transactions
        .filter(t => t.userId === userId && t.type === 'spent')
        .reduce((sum, t) => sum + t.amount, 0);
        
      return earned - spent;
    }
  }
}

// Create and export a singleton instance
export const coinService = new CoinService();

// Initialize with some sample transactions if not connected to Supabase
const initializeWithSampleData = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    // Only initialize sample data if not connected to Supabase
    if (!session) {
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
      for (const transaction of sampleTransactions) {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 10)); // Random date in the last 10 days
        
        await coinService.addTransaction({
          ...transaction,
        });
      }
    }
  } catch (error) {
    console.error("Error initializing sample data:", error);
  }
};

// Initialize sample data
initializeWithSampleData();

export default coinService;
