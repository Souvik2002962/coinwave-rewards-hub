
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  Rocket, 
  PauseCircle, 
  PlayCircle, 
  Copy, 
  Trash2, 
  Video, 
  Image as ImageIcon, 
  BarChart as BarChartIcon, 
  PieChart as PieChartIcon,
  Eye,
  Coins,
  Users,
  Zap,
  Activity,
  Heart,
  BadgeDollarSign,
  Filter,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';

// Mock data for campaigns
const mockCampaigns = [
  {
    id: 1,
    name: "Summer Sale 2025",
    status: "active",
    type: "video",
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    budget: 15000,
    spent: 4250,
    views: 2136,
    coinsUsed: 21360,
    clicks: 485,
    ctr: 22.7,
    engagement: 18.2
  },
  {
    id: 2,
    name: "New Product Launch",
    status: "paused",
    type: "image",
    startDate: "2025-05-15",
    endDate: "2025-06-15",
    budget: 10000,
    spent: 7800,
    views: 4250,
    coinsUsed: 42500,
    clicks: 842,
    ctr: 19.8,
    engagement: 15.6
  },
  {
    id: 3,
    name: "Brand Awareness",
    status: "completed",
    type: "video",
    startDate: "2025-04-01",
    endDate: "2025-05-01",
    budget: 20000,
    spent: 20000,
    views: 9864,
    coinsUsed: 98640,
    clicks: 2153,
    ctr: 21.8,
    engagement: 24.5
  },
  {
    id: 4,
    name: "App Install Campaign",
    status: "draft",
    type: "image",
    startDate: "",
    endDate: "",
    budget: 5000,
    spent: 0,
    views: 0,
    coinsUsed: 0,
    clicks: 0,
    ctr: 0,
    engagement: 0
  }
];

// Mock data for performance chart
const performanceData = [
  { name: 'Mon', views: 1200, clicks: 240 },
  { name: 'Tue', views: 1350, clicks: 300 },
  { name: 'Wed', views: 1800, clicks: 380 },
  { name: 'Thu', views: 1600, clicks: 350 },
  { name: 'Fri', views: 2100, clicks: 480 },
  { name: 'Sat', views: 1800, clicks: 390 },
  { name: 'Sun', views: 1500, clicks: 320 },
];

// Mock data for engagement chart
const engagementData = [
  { name: 'Video Completion', value: 72 },
  { name: 'Partial Views', value: 28 },
];

// Mock data for audience demographics
const audienceData = [
  { name: '18-24', value: 30 },
  { name: '25-34', value: 40 },
  { name: '35-44', value: 15 },
  { name: '45+', value: 15 },
];

const COLORS = ['#8B5CF6', '#7E69AB', '#6E59A5', '#D6BCFA'];

const AdvertiserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'text-green-500';
      case 'paused': return 'text-yellow-500';
      case 'completed': return 'text-blue-500';
      case 'draft': return 'text-gray-400';
      default: return '';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'active': return <PlayCircle className="h-4 w-4" />;
      case 'paused': return <PauseCircle className="h-4 w-4" />;
      case 'completed': return <BadgeDollarSign className="h-4 w-4" />;
      case 'draft': return <Rocket className="h-4 w-4" />;
      default: return null;
    }
  };

  const handleDuplicateCampaign = (id: number) => {
    toast.success("Campaign duplicated successfully!");
    console.log("Duplicating campaign ID:", id);
  };

  const handleDeleteCampaign = (id: number) => {
    toast.success("Campaign deleted successfully!");
    console.log("Deleting campaign ID:", id);
  };

  const handleToggleCampaignStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    toast.success(`Campaign ${newStatus === 'active' ? 'activated' : 'paused'} successfully!`);
    console.log(`Changing campaign ${id} status from ${currentStatus} to ${newStatus}`);
  };

  const totalCampaigns = mockCampaigns.length;
  const activeCampaigns = mockCampaigns.filter(c => c.status === 'active').length;
  const totalViews = mockCampaigns.reduce((sum, campaign) => sum + campaign.views, 0);
  const totalCoinsUsed = mockCampaigns.reduce((sum, campaign) => sum + campaign.coinsUsed, 0);
  const totalSpent = mockCampaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
  const totalBudget = mockCampaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <NavBar />
      <div className="pt-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Advertiser Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage your campaigns and track performance metrics
            </p>
          </div>
          <Link to="/create-campaign">
            <Button className="glossy-button">
              <Rocket className="mr-2 h-5 w-5" />
              Create New Campaign
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="neon-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    Total Campaigns
                    <BarChartIcon className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-1">{totalCampaigns}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-neon-purple">{activeCampaigns} active</span> campaigns
                  </p>
                </CardContent>
              </Card>

              <Card className="neon-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    Total Ad Views
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-1">{totalViews.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-neon-purple">+{Math.floor(totalViews * 0.04).toLocaleString()}</span> in last 7 days
                  </p>
                </CardContent>
              </Card>

              <Card className="neon-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    Coins Used
                    <Coins className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-1">{totalCoinsUsed.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    ~₹{Math.floor(totalCoinsUsed * 0.1).toLocaleString()} value
                  </p>
                </CardContent>
              </Card>

              <Card className="neon-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    Budget Used
                    <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-1">₹{totalSpent.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className={totalSpent > 0 ? "text-neon-purple" : ""}>
                      {totalSpent > 0 ? Math.floor((totalSpent / totalBudget) * 100) : 0}%
                    </span> of total budget
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Performance Chart */}
            <Card className="neon-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Campaign Performance
                </CardTitle>
                <CardDescription>Last 7 days of views and clicks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#323232" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1A1F2C', border: '1px solid #323232', borderRadius: '8px' }} 
                        itemStyle={{ color: '#fff' }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="views" stroke="#7E69AB" strokeWidth={3} activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="clicks" stroke="#9b87f5" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Campaigns */}
            <Card className="neon-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5" />
                  Recent Campaigns
                </CardTitle>
                <CardDescription>Your latest advertising campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-secondary">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Campaign</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Views</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">CTR</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Spent</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockCampaigns.slice(0, 3).map((campaign) => (
                        <tr key={campaign.id} className="border-b border-secondary">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              {campaign.type === 'video' ? (
                                <Video className="h-5 w-5 text-neon-purple" />
                              ) : (
                                <ImageIcon className="h-5 w-5 text-neon-purple" />
                              )}
                              <div>
                                <p className="font-medium text-white">{campaign.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {campaign.status !== 'draft' && (
                                    `${campaign.startDate} - ${campaign.endDate}`
                                  )}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`flex items-center gap-1 ${getStatusColor(campaign.status)} capitalize`}>
                              {getStatusIcon(campaign.status)}
                              {campaign.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">{campaign.views.toLocaleString()}</td>
                          <td className="py-4 px-4">{campaign.ctr}%</td>
                          <td className="py-4 px-4">₹{campaign.spent.toLocaleString()}</td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              {campaign.status !== 'completed' && campaign.status !== 'draft' && (
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => handleToggleCampaignStatus(campaign.id, campaign.status)}
                                >
                                  {campaign.status === 'active' ? <PauseCircle className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleDuplicateCampaign(campaign.id)}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" onClick={() => setActiveTab("campaigns")}>
                    View All Campaigns
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search campaigns" 
                  className="pl-10" 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
              <div className="w-full md:w-48">
                <Select defaultValue="all" onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="md:w-auto" onClick={() => window.location.href = "/create-campaign"}>
                <Rocket className="mr-2 h-4 w-4" />
                New Campaign
              </Button>
            </div>

            {/* Campaigns List */}
            <Card className="neon-card">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-secondary">
                        <th className="text-left py-4 px-6 font-medium text-muted-foreground">Campaign</th>
                        <th className="text-left py-4 px-6 font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-4 px-6 font-medium text-muted-foreground">Views</th>
                        <th className="text-left py-4 px-6 font-medium text-muted-foreground hidden lg:table-cell">Engagement</th>
                        <th className="text-left py-4 px-6 font-medium text-muted-foreground">Budget</th>
                        <th className="text-right py-4 px-6 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCampaigns.length > 0 ? (
                        filteredCampaigns.map((campaign) => (
                          <tr key={campaign.id} className="border-b border-secondary">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                {campaign.type === 'video' ? (
                                  <Video className="h-5 w-5 text-neon-purple" />
                                ) : (
                                  <ImageIcon className="h-5 w-5 text-neon-purple" />
                                )}
                                <div>
                                  <p className="font-medium text-white">{campaign.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {campaign.status !== 'draft' && (
                                      `${campaign.startDate} - ${campaign.endDate}`
                                    )}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className={`flex items-center gap-1 ${getStatusColor(campaign.status)} capitalize`}>
                                {getStatusIcon(campaign.status)}
                                {campaign.status}
                              </span>
                            </td>
                            <td className="py-4 px-6">{campaign.views.toLocaleString()}</td>
                            <td className="py-4 px-6 hidden lg:table-cell">{campaign.engagement}%</td>
                            <td className="py-4 px-6">
                              <div>
                                <p>₹{campaign.spent.toLocaleString()} / ₹{campaign.budget.toLocaleString()}</p>
                                <div className="w-full bg-secondary rounded-full h-2 mt-2">
                                  <div 
                                    className="bg-neon-purple h-2 rounded-full" 
                                    style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <div className="flex justify-end gap-2">
                                {campaign.status !== 'completed' && campaign.status !== 'draft' && (
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => handleToggleCampaignStatus(campaign.id, campaign.status)}
                                    title={campaign.status === 'active' ? "Pause Campaign" : "Activate Campaign"}
                                  >
                                    {campaign.status === 'active' ? <PauseCircle className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
                                  </Button>
                                )}
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => handleDuplicateCampaign(campaign.id)}
                                  title="Duplicate Campaign"
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => handleDeleteCampaign(campaign.id)}
                                  title="Delete Campaign"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-muted-foreground">
                            No campaigns found matching your filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="neon-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Ad Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{totalViews.toLocaleString()}</div>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <Activity className="h-3 w-3" />
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card className="neon-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average CTR</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">21.3%</div>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <Activity className="h-3 w-3" />
                    +3.2% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card className="neon-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">18.7%</div>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <Activity className="h-3 w-3" />
                    +5.4% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card className="neon-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Cost per View</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">₹1.24</div>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <Activity className="h-3 w-3" />
                    -0.15 from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="neon-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChartIcon className="h-5 w-5" />
                    Performance by Campaign
                  </CardTitle>
                  <CardDescription>Views comparison across campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={mockCampaigns.filter(c => c.status !== 'draft')}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#323232" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1A1F2C', border: '1px solid #323232', borderRadius: '8px' }} 
                          itemStyle={{ color: '#fff' }}
                        />
                        <Legend />
                        <Bar dataKey="views" name="Views" fill="#9b87f5" />
                        <Bar dataKey="clicks" name="Clicks" fill="#7E69AB" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="neon-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Engagement Analytics
                  </CardTitle>
                  <CardDescription>How users interact with your ads</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={engagementData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {engagementData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1A1F2C', border: '1px solid #323232', borderRadius: '8px' }} 
                          itemStyle={{ color: '#fff' }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      Video completion rates are strong at 72%, indicating good content engagement.
                      Consider optimizing the first 5 seconds of videos to reduce the 28% partial view rate.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audience" className="space-y-8">
            {/* Audience Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="neon-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">125.4K</div>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <Users className="h-3 w-3" />
                    +18% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card className="neon-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">New Viewers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">42.8K</div>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <Users className="h-3 w-3" />
                    +24% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card className="neon-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Returning Viewers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">31.5%</div>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <Heart className="h-3 w-3" />
                    +7.2% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card className="neon-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average View Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">18.2s</div>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <Activity className="h-3 w-3" />
                    +2.1s from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Audience Demographics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="neon-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5" />
                    Age Demographics
                  </CardTitle>
                  <CardDescription>Age distribution of your audience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={audienceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {audienceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1A1F2C', border: '1px solid #323232', borderRadius: '8px' }} 
                          itemStyle={{ color: '#fff' }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="neon-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Audience Regions
                  </CardTitle>
                  <CardDescription>Geographic distribution of viewers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-neon-purple"></div>
                        <span>India</span>
                      </div>
                      <span>64%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-neon-purple h-2 rounded-full" style={{ width: '64%' }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#7E69AB]"></div>
                        <span>USA</span>
                      </div>
                      <span>18%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-[#7E69AB] h-2 rounded-full" style={{ width: '18%' }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#6E59A5]"></div>
                        <span>Europe</span>
                      </div>
                      <span>12%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-[#6E59A5] h-2 rounded-full" style={{ width: '12%' }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#D6BCFA]"></div>
                        <span>Other</span>
                      </div>
                      <span>6%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-[#D6BCFA] h-2 rounded-full" style={{ width: '6%' }}></div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Top Cities</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Mumbai</span>
                        <span>18%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Delhi</span>
                        <span>16%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Bangalore</span>
                        <span>14%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>New York</span>
                        <span>7%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Interest Categories */}
            <Card className="neon-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Interest Categories
                </CardTitle>
                <CardDescription>What your audience is interested in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-neon-purple"></div>
                          <span>Technology</span>
                        </div>
                        <span>38%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-neon-purple h-2 rounded-full" style={{ width: '38%' }}></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#7E69AB]"></div>
                          <span>Gaming</span>
                        </div>
                        <span>27%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-[#7E69AB] h-2 rounded-full" style={{ width: '27%' }}></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#6E59A5]"></div>
                          <span>Fashion</span>
                        </div>
                        <span>24%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-[#6E59A5] h-2 rounded-full" style={{ width: '24%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#D6BCFA]"></div>
                          <span>Food</span>
                        </div>
                        <span>22%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-[#D6BCFA] h-2 rounded-full" style={{ width: '22%' }}></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#FEC6A1]"></div>
                          <span>Travel</span>
                        </div>
                        <span>18%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-[#FEC6A1] h-2 rounded-full" style={{ width: '18%' }}></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#E5DEFF]"></div>
                          <span>Sports</span>
                        </div>
                        <span>16%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-[#E5DEFF] h-2 rounded-full" style={{ width: '16%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-3">Audience Insights</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your audience is primarily interested in technology and gaming, with a growing interest in fashion and food. 
                    Consider focusing your campaigns on these categories for better engagement.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-secondary rounded-full text-xs flex items-center gap-1">
                      <Tag className="h-3 w-3" /> Tech Enthusiasts
                    </span>
                    <span className="px-3 py-1 bg-secondary rounded-full text-xs flex items-center gap-1">
                      <Tag className="h-3 w-3" /> Gamers
                    </span>
                    <span className="px-3 py-1 bg-secondary rounded-full text-xs flex items-center gap-1">
                      <Tag className="h-3 w-3" /> Fashion Forward
                    </span>
                    <span className="px-3 py-1 bg-secondary rounded-full text-xs flex items-center gap-1">
                      <Tag className="h-3 w-3" /> Foodies
                    </span>
                    <span className="px-3 py-1 bg-secondary rounded-full text-xs flex items-center gap-1">
                      <Tag className="h-3 w-3" /> Urban Millennials
                    </span>
                    <span className="px-3 py-1 bg-secondary rounded-full text-xs flex items-center gap-1">
                      <Tag className="h-3 w-3" /> Digital Natives
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvertiserDashboard;
