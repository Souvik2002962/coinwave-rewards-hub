
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface Campaign {
  id?: string;
  name: string;
  description?: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  type: 'image' | 'video';
  budget: number;
  start_date?: string;
  end_date?: string;
  views?: number;
  clicks?: number;
  conversions?: number;
  spent?: number;
}

export interface CampaignMetric {
  campaign_id: string;
  date: string;
  views: number;
  clicks: number;
  conversions: number;
}

class CampaignService {
  // Create a new campaign
  async createCampaign(campaign: Omit<Campaign, 'id' | 'views' | 'clicks' | 'conversions' | 'spent'>): Promise<Campaign | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("You need to be logged in to create a campaign");
        return null;
      }
      
      const { data, error } = await supabase
        .from('campaigns')
        .insert([{
          ...campaign,
          user_id: session.user.id,
          views: 0,
          clicks: 0,
          conversions: 0,
          spent: 0
        }])
        .select()
        .single();
      
      if (error) {
        console.error("Error creating campaign:", error);
        toast.error("Failed to create campaign");
        return null;
      }
      
      toast.success("Campaign created successfully!");
      return data;
    } catch (error) {
      console.error("Error in createCampaign:", error);
      toast.error("An error occurred while creating the campaign");
      return null;
    }
  }
  
  // Get all campaigns for the current user
  async getUserCampaigns(): Promise<Campaign[]> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        return [];
      }
      
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching campaigns:", error);
        return [];
      }
      
      return data;
    } catch (error) {
      console.error("Error in getUserCampaigns:", error);
      return [];
    }
  }
  
  // Get campaign stats for a specific timeframe
  async getCampaignStats(campaignId: string, startDate: string, endDate: string): Promise<CampaignMetric[]> {
    try {
      const { data, error } = await supabase
        .from('metrics')
        .select('*')
        .eq('campaign_id', campaignId)
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: true });
      
      if (error) {
        console.error("Error fetching campaign stats:", error);
        return [];
      }
      
      return data;
    } catch (error) {
      console.error("Error in getCampaignStats:", error);
      return [];
    }
  }
  
  // Update campaign status
  async updateCampaignStatus(campaignId: string, status: Campaign['status']): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('campaigns')
        .update({ status, updated_at: new Date() })
        .eq('id', campaignId);
      
      if (error) {
        console.error("Error updating campaign status:", error);
        toast.error("Failed to update campaign status");
        return false;
      }
      
      toast.success(`Campaign ${status === 'active' ? 'activated' : status}`);
      return true;
    } catch (error) {
      console.error("Error in updateCampaignStatus:", error);
      toast.error("An error occurred while updating the campaign");
      return false;
    }
  }
  
  // Delete a campaign
  async deleteCampaign(campaignId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', campaignId);
      
      if (error) {
        console.error("Error deleting campaign:", error);
        toast.error("Failed to delete campaign");
        return false;
      }
      
      toast.success("Campaign deleted successfully");
      return true;
    } catch (error) {
      console.error("Error in deleteCampaign:", error);
      toast.error("An error occurred while deleting the campaign");
      return false;
    }
  }
  
  // Track a campaign click
  async trackClick(campaignId: string): Promise<void> {
    try {
      // First update the campaign
      const { data, error } = await supabase
        .from('campaigns')
        .select('clicks')
        .eq('id', campaignId)
        .single();
      
      if (error) {
        console.error("Error fetching campaign for click tracking:", error);
        return;
      }
      
      await supabase
        .from('campaigns')
        .update({ clicks: (data.clicks || 0) + 1 })
        .eq('id', campaignId);
      
      // Then record in metrics for today
      const today = new Date().toISOString().split('T')[0];
      
      // Check if a metric for today already exists
      const { data: existingMetric, error: metricError } = await supabase
        .from('metrics')
        .select('id, clicks')
        .eq('campaign_id', campaignId)
        .eq('date', today)
        .single();
      
      if (metricError && metricError.code !== 'PGRST116') {
        console.error("Error checking for existing metric:", metricError);
        return;
      }
      
      if (existingMetric) {
        // Update existing metric
        await supabase
          .from('metrics')
          .update({ clicks: (existingMetric.clicks || 0) + 1 })
          .eq('id', existingMetric.id);
      } else {
        // Create new metric for today
        await supabase.from('metrics').insert([{
          campaign_id: campaignId,
          date: today,
          views: 0,
          clicks: 1,
          conversions: 0
        }]);
      }
    } catch (error) {
      console.error("Error tracking campaign click:", error);
    }
  }
  
  // Track a conversion (purchase after clicking an ad)
  async trackConversion(campaignId: string): Promise<void> {
    try {
      // First update the campaign
      const { data, error } = await supabase
        .from('campaigns')
        .select('conversions')
        .eq('id', campaignId)
        .single();
      
      if (error) {
        console.error("Error fetching campaign for conversion tracking:", error);
        return;
      }
      
      await supabase
        .from('campaigns')
        .update({ conversions: (data.conversions || 0) + 1 })
        .eq('id', campaignId);
      
      // Then record in metrics for today
      const today = new Date().toISOString().split('T')[0];
      
      // Check if a metric for today already exists
      const { data: existingMetric, error: metricError } = await supabase
        .from('metrics')
        .select('id, conversions')
        .eq('campaign_id', campaignId)
        .eq('date', today)
        .single();
      
      if (metricError && metricError.code !== 'PGRST116') {
        console.error("Error checking for existing metric:", metricError);
        return;
      }
      
      if (existingMetric) {
        // Update existing metric
        await supabase
          .from('metrics')
          .update({ conversions: (existingMetric.conversions || 0) + 1 })
          .eq('id', existingMetric.id);
      } else {
        // Create new metric for today
        await supabase.from('metrics').insert([{
          campaign_id: campaignId,
          date: today,
          views: 0,
          clicks: 0,
          conversions: 1
        }]);
      }
    } catch (error) {
      console.error("Error tracking campaign conversion:", error);
    }
  }
}

export const campaignService = new CampaignService();
export default campaignService;
