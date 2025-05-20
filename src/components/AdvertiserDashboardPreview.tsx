
import React from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, TrendingUp, Users, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const data = [
  { name: 'Ad Views', value: 5200 },
  { name: 'Clicks', value: 720 },
  { name: 'Purchases', value: 120 },
];

const barData = [
  {
    name: 'Mon',
    views: 100,
    clicks: 20,
    purchases: 5,
  },
  {
    name: 'Tue',
    views: 150,
    clicks: 30,
    purchases: 7,
  },
  {
    name: 'Wed',
    views: 200,
    clicks: 45,
    purchases: 10,
  },
  {
    name: 'Thu',
    views: 180,
    clicks: 38,
    purchases: 8,
  },
  {
    name: 'Fri',
    views: 250,
    clicks: 52,
    purchases: 15,
  },
  {
    name: 'Sat',
    views: 300,
    clicks: 65,
    purchases: 22,
  },
  {
    name: 'Sun',
    views: 270,
    clicks: 58,
    purchases: 18,
  },
];

const COLORS = ['#9b87f5', '#1EAEDB', '#F97316'];

const AdvertiserDashboardPreview = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-cyber-dark neon-border rounded-lg p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">Advertiser Dashboard</h2>
          <Button className="bg-neon-purple hover:bg-neon-purple/90">
            Create Campaign
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-cyber-dark border border-neon-purple/50">
            <CardHeader className="pb-2">
              <CardDescription>Total Views</CardDescription>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">5,200</CardTitle>
                <TrendingUp className="text-green-500 h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-green-500">+12.5% from last week</p>
            </CardContent>
          </Card>
          
          <Card className="bg-cyber-dark border border-neon-purple/50">
            <CardHeader className="pb-2">
              <CardDescription>Click-through Rate</CardDescription>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">13.8%</CardTitle>
                <Users className="text-neon-blue h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-green-500">+2.3% from last week</p>
            </CardContent>
          </Card>
          
          <Card className="bg-cyber-dark border border-neon-purple/50">
            <CardHeader className="pb-2">
              <CardDescription>Conversion Rate</CardDescription>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">16.6%</CardTitle>
                <ShoppingCart className="text-cyber-orange h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-green-500">+5.2% from last week</p>
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
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#9b87f5', color: 'white' }}
                      itemStyle={{ color: 'white' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="flex justify-center space-x-4 mt-2">
                  {data.map((entry, index) => (
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
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdvertiserDashboardPreview;
