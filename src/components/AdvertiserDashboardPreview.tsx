
import React from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, TrendingUp, Users, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

// Default data to use while loading or if there's an error
const defaultData = [
  { name: 'Ad Views', value: 0 },
  { name: 'Clicks', value: 0 },
  { name: 'Purchases', value: 0 },
];

const defaultBarData = [
  { name: 'Mon', views: 0, clicks: 0, purchases: 0 },
  { name: 'Tue', views: 0, clicks: 0, purchases: 0 },
  { name: 'Wed', views: 0, clicks: 0, purchases: 0 },
  { name: 'Thu', views: 0, clicks: 0, purchases: 0 },
  { name: 'Fri', views: 0, clicks: 0, purchases: 0 },
  { name: 'Sat', views: 0, clicks: 0, purchases: 0 },
  { name: 'Sun', views: 0, clicks: 0, purchases: 0 },
];

const COLORS = ['#9b87f5', '#1EAEDB', '#F97316'];

// Function to get the date range for the last week
const getLastWeekDateRange = () => {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  
  // Format dates to YYYY-MM-DD for Supabase query
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  return {
    startDate: formatDate(lastWeek),
    endDate: formatDate(today)
  };
};

// Function to fetch campaign data from Supabase
const fetchCampaignData = async () => {
  try {
    // Get date range for last week
    const { startDate, endDate } = getLastWeekDateRange();
    
    // Fetch total campaign metrics
    const { data: campaignData, error: campaignError } = await supabase
      .from('campaigns')
      .select('id, name, views, clicks, conversions')
      .order('created_at', { ascending: false });
      
    if (campaignError) throw new Error(campaignError.message);

    // Calculate totals for funnel data
    let totalViews = 0;
    let totalClicks = 0;
    let totalConversions = 0;
    
    if (campaignData && campaignData.length > 0) {
      totalViews = campaignData.reduce((sum, campaign) => sum + (campaign.views || 0), 0);
      totalClicks = campaignData.reduce((sum, campaign) => sum + (campaign.clicks || 0), 0);
      totalConversions = campaignData.reduce((sum, campaign) => sum + (campaign.conversions || 0), 0);
    }
    
    // Prepare funnel data
    const funnelData = [
      { name: 'Ad Views', value: totalViews },
      { name: 'Clicks', value: totalClicks },
      { name: 'Purchases', value: totalConversions },
    ];
    
    // Fetch weekly metrics
    const { data: weeklyData, error: weeklyError } = await supabase
      .from('metrics')
      .select('date, views, clicks, conversions')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true });

    if (weeklyError) throw new Error(weeklyError.message);

    // Process weekly data into day-based format
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const processedWeeklyData = Array(7).fill(0).map((_, i) => ({
      name: days[i],
      views: 0,
      clicks: 0,
      purchases: 0,
    }));
    
    if (weeklyData && weeklyData.length > 0) {
      weeklyData.forEach(day => {
        const date = new Date(day.date);
        const dayIndex = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
        
        processedWeeklyData[dayIndex].views += day.views || 0;
        processedWeeklyData[dayIndex].clicks += day.clicks || 0;
        processedWeeklyData[dayIndex].purchases += day.conversions || 0;
      });
    }
    
    // Calculate metrics changes (compared to previous week)
    // For simplicity, we're using mock values for percentage changes
    // In a real app, you would fetch previous week's data for comparison
    const metrics = {
      total_views: totalViews,
      ctr: totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : 0,
      ctr_change: 2.3,
      conversion_rate: totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(1) : 0,
      conversion_change: 5.2,
      views_change: 12.5
    };
    
    return {
      funnelData,
      weeklyData: processedWeeklyData,
      metrics
    };
  } catch (error) {
    console.error("Error in fetchCampaignData:", error);
    throw error;
  }
};

const AdvertiserDashboardPreview = () => {
  const { toast } = useToast();
  
  // Query to fetch data from Supabase
  const { data, isLoading, error } = useQuery({
    queryKey: ['campaignData'],
    queryFn: fetchCampaignData,
    retry: 1,
    refetchOnWindowFocus: false
  });

  React.useEffect(() => {
    if (error) {
      console.error("Error fetching campaign data:", error);
      toast({
        title: "Error loading dashboard data",
        description: "Please try refreshing the page.",
        variant: "destructive"
      });
    }
  }, [error, toast]);

  // Use the fetched data or default data if loading/error
  const funnelData = data?.funnelData || defaultData;
  const barData = data?.weeklyData || defaultBarData;
  const metrics = data?.metrics || {
    total_views: 5200,
    ctr: 13.8,
    ctr_change: 2.3,
    conversion_rate: 16.6,
    conversion_change: 5.2,
    views_change: 12.5
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-cyber-dark neon-border rounded-lg p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">Advertiser Dashboard</h2>
          <Button className="bg-neon-purple hover:bg-neon-purple/90" onClick={() => window.location.href = '/create-campaign'}>
            Create Campaign
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-cyber-dark border border-neon-purple/50">
            <CardHeader className="pb-2">
              <CardDescription>Total Views</CardDescription>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{isLoading ? '...' : metrics.total_views.toLocaleString()}</CardTitle>
                <TrendingUp className="text-green-500 h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-green-500">+{metrics.views_change}% from last week</p>
            </CardContent>
          </Card>
          
          <Card className="bg-cyber-dark border border-neon-purple/50">
            <CardHeader className="pb-2">
              <CardDescription>Click-through Rate</CardDescription>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{isLoading ? '...' : metrics.ctr}%</CardTitle>
                <Users className="text-neon-blue h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-green-500">+{metrics.ctr_change}% from last week</p>
            </CardContent>
          </Card>
          
          <Card className="bg-cyber-dark border border-neon-purple/50">
            <CardHeader className="pb-2">
              <CardDescription>Conversion Rate</CardDescription>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{isLoading ? '...' : metrics.conversion_rate}%</CardTitle>
                <ShoppingCart className="text-cyber-orange h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-green-500">+{metrics.conversion_change}% from last week</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-cyber-dark border border-neon-purple/50">
            <CardHeader>
              <CardTitle className="text-white text-lg">Campaign Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-400">Loading data...</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={funnelData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {funnelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#9b87f5', color: 'white' }}
                        itemStyle={{ color: 'white' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
                
                <div className="flex justify-center space-x-4 mt-2">
                  {funnelData.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center">
                      <div className="w-3 h-3 mr-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <span className="text-xs text-gray-400">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-cyber-dark border border-neon-purple/50">
            <CardHeader>
              <CardTitle className="text-white text-lg">Weekly Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-400">Loading data...</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={barData}
                      margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" tick={{ fill: '#9b87f5' }} />
                      <YAxis tick={{ fill: '#9b87f5' }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#9b87f5', color: 'white' }}
                        itemStyle={{ color: 'white' }}
                      />
                      <Bar dataKey="views" fill="#9b87f5" name="Views" />
                      <Bar dataKey="clicks" fill="#1EAEDB" name="Clicks" />
                      <Bar dataKey="purchases" fill="#F97316" name="Purchases" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdvertiserDashboardPreview;
