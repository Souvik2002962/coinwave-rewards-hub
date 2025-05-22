
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

// Function to fetch campaign data
const fetchCampaignData = async () => {
  const { data: funnelData, error: funnelError } = await supabase
    .from('campaign_funnel')
    .select('*')
    .order('id', { ascending: true });

  if (funnelError) throw new Error(funnelError.message);

  const { data: weeklyData, error: weeklyError } = await supabase
    .from('weekly_performance')
    .select('*')
    .order('day_order', { ascending: true });

  if (weeklyError) throw new Error(weeklyError.message);

  const { data: metrics, error: metricsError } = await supabase
    .from('campaign_metrics')
    .select('*')
    .single();

  if (metricsError) throw new Error(metricsError.message);

  return {
    funnelData: funnelData || defaultData,
    weeklyData: weeklyData || defaultBarData,
    metrics: metrics || {
      total_views: 0,
      ctr: 0,
      ctr_change: 0,
      conversion_rate: 0,
      conversion_change: 0,
      views_change: 0
    }
  };
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
