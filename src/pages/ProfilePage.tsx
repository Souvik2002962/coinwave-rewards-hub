
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import NavBar from '@/components/NavBar';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  User, Package, Wallet, History, Settings, Edit, Copy, QrCode, 
  Download, ExternalLink, Star, Bell, LogOut, Trash2, Coins 
} from 'lucide-react';
import { toast } from "sonner";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    username: "JohnDoe123",
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    level: 7,
    coins: 5400,
    referralCode: "JOHND21",
    joinDate: "March 2023",
    xpProgress: 75
  });

  // Mock data
  const badges = [
    { id: 1, name: "Coin Collector I", icon: "🪙", unlocked: true, date: "Apr 10, 2025" },
    { id: 2, name: "Ad Rookie", icon: "🎥", unlocked: true, date: "Apr 5, 2025" },
    { id: 3, name: "First Redemption", icon: "🛍️", unlocked: true, date: "Apr 15, 2025" },
    { id: 4, name: "Login Streak x7", icon: "🔥", unlocked: true, date: "Apr 20, 2025" },
    { id: 5, name: "Referral Magnet", icon: "🧲", unlocked: false, requirement: "Refer 5 users" },
    { id: 6, name: "Big Spender", icon: "💸", unlocked: false, requirement: "Spend over 5,000 coins" },
  ];
  
  const orders = [
    { 
      id: "ORD12345", 
      name: "Nike Air Max", 
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", 
      date: "Apr 15, 2025", 
      payment: "₹149 + 500 Coins", 
      status: "Delivered",
      tracking: "FEDEX12345" 
    },
    { 
      id: "ORD12346", 
      name: "Wireless Headphones", 
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", 
      date: "Apr 20, 2025", 
      payment: "₹0 + 1200 Coins", 
      status: "Shipped",
      tracking: "DELHIV5678" 
    },
    { 
      id: "ORD12347", 
      name: "Smart Watch", 
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", 
      date: "May 1, 2025", 
      payment: "₹299 + 700 Coins", 
      status: "Processing",
      tracking: null 
    },
  ];
  
  const historyItems = [
    { type: "ad", name: "Nike Campaign", date: "May 1, 2025", time: "14:30", coins: 25 },
    { type: "ad", name: "Samsung Ad", date: "May 1, 2025", time: "15:45", coins: 30 },
    { type: "referral", name: "priya@example.com", date: "Apr 29, 2025", time: "09:15", coins: 200 },
    { type: "purchase", name: "Wireless Headphones", date: "Apr 20, 2025", time: "17:20", coins: -1200 },
    { type: "mission", name: "Daily Login Streak (7 days)", date: "Apr 20, 2025", time: "08:00", coins: 100 },
  ];
  
  const copyReferralCode = () => {
    navigator.clipboard.writeText(userData.referralCode);
    toast.success("Referral code copied to clipboard");
  };

  const handleEditProfile = () => {
    if (editMode) {
      // Save changes logic would go here
      toast.success("Profile updated successfully");
    }
    setEditMode(!editMode);
  };
  
  const toggleNotification = (type) => {
    toast.success(`${type} notifications ${type === "Email" ? "disabled" : "enabled"}`);
  };
  
  const handleLogout = () => {
    toast.info("Logging out...");
    // Logout logic would go here
  };
  
  const handleDeleteAccount = () => {
    toast.error("Account deletion initiated", {
      description: "Please check your email to confirm deletion",
      action: {
        label: "Undo",
        onClick: () => toast.success("Account deletion cancelled"),
      },
    });
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-white">
      <NavBar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">My Account</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 bg-cyber-dark mb-8">
            <TabsTrigger value="profile" className="data-[state=active]:text-neon-purple">
              <User className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:text-neon-purple">
              <Package className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">My Orders</span>
            </TabsTrigger>
            <TabsTrigger value="wallet" className="data-[state=active]:text-neon-purple">
              <Wallet className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Wallet</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:text-neon-purple">
              <History className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:text-neon-purple">
              <Settings className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Settings</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Card */}
              <Card className="neon-card col-span-1 md:col-span-2">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24 border-2 border-neon-purple">
                        <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d" />
                        <AvatarFallback className="bg-neon-purple/20 text-neon-purple text-xl">
                          {userData.fullName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {editMode && (
                        <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-neon-purple">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-4 text-center md:text-left">
                      {editMode ? (
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input 
                              id="fullName" 
                              value={userData.fullName} 
                              onChange={(e) => setUserData({...userData, fullName: e.target.value})}
                              className="bg-cyber-dark border-neon-purple/50"
                            />
                          </div>
                          <div>
                            <Label htmlFor="username">Username</Label>
                            <Input 
                              id="username" 
                              value={userData.username} 
                              onChange={(e) => setUserData({...userData, username: e.target.value})}
                              className="bg-cyber-dark border-neon-purple/50"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input 
                              id="phone" 
                              value={userData.phone} 
                              onChange={(e) => setUserData({...userData, phone: e.target.value})}
                              className="bg-cyber-dark border-neon-purple/50"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div>
                            <h2 className="text-xl font-bold">{userData.fullName}</h2>
                            <p className="text-gray-400">@{userData.username}</p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="text-sm">
                              <p className="text-gray-400">Email</p>
                              <p>{userData.email}</p>
                            </div>
                            <div className="text-sm">
                              <p className="text-gray-400">Phone</p>
                              <p>{userData.phone}</p>
                            </div>
                            <div className="text-sm">
                              <p className="text-gray-400">Member since</p>
                              <p>{userData.joinDate}</p>
                            </div>
                            <div className="text-sm">
                              <p className="text-gray-400">Referral Code</p>
                              <div className="flex items-center">
                                <p className="font-mono">{userData.referralCode}</p>
                                <Button variant="ghost" size="icon" onClick={copyReferralCode} className="ml-1">
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      
                      <div className="flex justify-center md:justify-start space-x-4">
                        <Button 
                          onClick={handleEditProfile} 
                          variant={editMode ? "default" : "outline"}
                          className={editMode ? "bg-neon-purple hover:bg-neon-purple/90" : ""}
                        >
                          {editMode ? "Save Changes" : "Edit Profile"}
                        </Button>
                        {!editMode && (
                          <Button variant="outline">
                            <QrCode className="h-4 w-4 mr-2" />
                            Profile QR
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Level Card */}
              <Card className="neon-card">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">User Level</h3>
                    <Badge className="bg-neon-purple hover:bg-neon-purple">Level {userData.level}</Badge>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>XP Progress</span>
                      <span>{userData.xpProgress}%</span>
                    </div>
                    <Progress value={userData.xpProgress} className="h-2" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-2">Current Balance</p>
                    <div className="flex justify-center items-center space-x-2">
                      <Coins className="h-5 w-5 text-yellow-400" />
                      <span className="text-xl font-bold">{userData.coins}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Badges Section */}
            <Card className="neon-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Badges Earned</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {badges.map(badge => (
                    <div 
                      key={badge.id} 
                      className={`p-3 rounded-lg text-center ${
                        badge.unlocked 
                          ? 'bg-neon-purple/20 border border-neon-purple/50' 
                          : 'bg-gray-800/50 border border-gray-700 opacity-60'
                      }`}
                    >
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <p className="text-sm font-medium truncate">{badge.name}</p>
                      <p className="text-xs text-gray-400">
                        {badge.unlocked ? `Unlocked ${badge.date}` : badge.requirement}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-4">
                  <Button variant="link" className="text-neon-purple hover:text-neon-purple/80">
                    View All Badges
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">My Orders</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-neon-purple/50">All</Button>
                <Button variant="outline" size="sm" className="border-neon-purple/50">Processing</Button>
                <Button variant="outline" size="sm" className="border-neon-purple/50">Delivered</Button>
              </div>
            </div>
            
            <div className="space-y-4">
              {orders.map(order => (
                <Card key={order.id} className="neon-card overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/4 h-32">
                        <img 
                          src={order.image} 
                          alt={order.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex flex-col md:flex-row justify-between mb-2">
                          <h4 className="font-semibold text-lg">{order.name}</h4>
                          <Badge className={`self-start md:self-auto mt-1 md:mt-0 ${
                            order.status === 'Delivered' ? 'bg-green-600' : 
                            order.status === 'Shipped' ? 'bg-blue-600' : 
                            'bg-yellow-600'
                          }`}>
                            {order.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm mb-3">
                          <div>
                            <p className="text-gray-400">Order ID</p>
                            <p>{order.id}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Order Date</p>
                            <p>{order.date}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Payment</p>
                            <p>{order.payment}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                          {order.status !== 'Processing' && (
                            <Button variant="outline" size="sm" className="border-neon-purple/50">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Track Package
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="border-neon-purple/50">
                            <Download className="h-4 w-4 mr-2" />
                            Invoice
                          </Button>
                          {order.status === 'Delivered' && (
                            <Button variant="outline" size="sm" className="border-neon-purple/50">
                              <Star className="h-4 w-4 mr-2" />
                              Review
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {orders.length > 3 && (
              <div className="text-center mt-6">
                <Button variant="outline" className="border-neon-purple/50">
                  Load More Orders
                </Button>
              </div>
            )}
          </TabsContent>
          
          {/* Wallet Tab */}
          <TabsContent value="wallet" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="neon-card">
                <CardContent className="p-6 text-center">
                  <h3 className="text-gray-400 text-sm mb-1">Current Balance</h3>
                  <div className="flex justify-center items-center space-x-2">
                    <Coins className="h-5 w-5 text-yellow-400" />
                    <span className="text-2xl font-bold">{userData.coins}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Value: ₹{(userData.coins * 0.1).toFixed(2)}</p>
                </CardContent>
              </Card>
              
              <Card className="neon-card">
                <CardContent className="p-6 text-center">
                  <h3 className="text-gray-400 text-sm mb-1">Total Earned</h3>
                  <p className="text-2xl font-bold text-green-500">7,840</p>
                  <p className="text-sm text-gray-400 mt-1">All-time</p>
                </CardContent>
              </Card>
              
              <Card className="neon-card">
                <CardContent className="p-6 text-center">
                  <h3 className="text-gray-400 text-sm mb-1">Total Spent</h3>
                  <p className="text-2xl font-bold text-red-500">2,440</p>
                  <p className="text-sm text-gray-400 mt-1">All-time</p>
                </CardContent>
              </Card>
              
              <Card className="neon-card">
                <CardContent className="p-6 text-center">
                  <h3 className="text-gray-400 text-sm mb-1">Conversion Rate</h3>
                  <p className="text-2xl font-bold">₹0.10</p>
                  <p className="text-sm text-gray-400 mt-1">Per coin</p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="neon-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="w-full bg-neon-blue hover:bg-neon-blue/90">
                    <Coins className="h-4 w-4 mr-2" />
                    Earn More Coins
                  </Button>
                  <Button className="w-full bg-neon-purple hover:bg-neon-purple/90">
                    Convert to Coupons
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Invite & Earn
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="neon-card">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Recent Transactions</h3>
                  <Button variant="link" className="text-neon-purple p-0 h-auto">View All</Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {historyItems.slice(0, 5).map((item, index) => (
                      <TableRow key={index} className="border-gray-700">
                        <TableCell className="capitalize">{item.type}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{`${item.date}, ${item.time}`}</TableCell>
                        <TableCell className={`text-right ${item.coins > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {item.coins > 0 ? `+${item.coins}` : item.coins}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-neon-purple/50 data-[state=active]:bg-neon-purple">All</Button>
                <Button variant="outline" size="sm" className="border-neon-purple/50">Ads Watched</Button>
                <Button variant="outline" size="sm" className="border-neon-purple/50">Purchases</Button>
                <Button variant="outline" size="sm" className="border-neon-purple/50">Referrals</Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-neon-purple/50">Last 7 days</Button>
                <Button variant="outline" size="sm" className="border-neon-purple/50">Last 30 days</Button>
              </div>
            </div>
            
            <Card className="neon-card">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead className="text-right">Coins</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {historyItems.map((item, index) => (
                      <TableRow key={index} className="border-gray-700">
                        <TableCell>
                          <Badge className={
                            item.type === "ad" ? "bg-blue-600" :
                            item.type === "referral" ? "bg-green-600" :
                            item.type === "purchase" ? "bg-yellow-600" :
                            "bg-neon-purple"
                          }>
                            {item.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{`${item.date}, ${item.time}`}</TableCell>
                        <TableCell className={`text-right ${item.coins > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {item.coins > 0 ? `+${item.coins}` : item.coins}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="text-center mt-6">
                  <Button variant="outline" className="border-neon-purple/50">
                    Load More History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="neon-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="change-password">Change Password</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input 
                        id="change-password" 
                        type="password" 
                        placeholder="New password"
                        className="bg-cyber-dark border-neon-purple/50"
                      />
                      <Button>Update</Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="update-email">Update Email</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input 
                        id="update-email" 
                        type="email" 
                        value={userData.email}
                        className="bg-cyber-dark border-neon-purple/50"
                      />
                      <Button>Verify</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="neon-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-400">Receive alerts for new coins, orders, etc.</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-neon-purple/50" 
                      onClick={() => toggleNotification("Push")}
                    >
                      Enabled
                    </Button>
                  </div>
                  
                  <Separator className="bg-gray-700" />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-400">Get updates via email</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-neon-purple/50" 
                      onClick={() => toggleNotification("Email")}
                    >
                      Disabled
                    </Button>
                  </div>
                  
                  <Separator className="bg-gray-700" />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Coin Summary</p>
                      <p className="text-sm text-gray-400">Get a weekly report of your coin activity</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-neon-purple/50" 
                      onClick={() => toggleNotification("Weekly")}
                    >
                      Enabled
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="neon-card">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-yellow-500 mb-4">Privacy Settings</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Profile Visibility</p>
                      <p className="text-sm text-gray-400">Show your profile in leaderboards</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-yellow-500/50" 
                      onClick={() => toast.success("Privacy setting updated")}
                    >
                      Public
                    </Button>
                  </div>
                </div>
                
                <Separator className="bg-gray-700" />
                
                <div>
                  <h3 className="text-lg font-semibold text-red-500 mb-4">Danger Zone</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Logout from all devices</p>
                        <p className="text-sm text-gray-400">Sign out from all active sessions</p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="border-red-500/50 hover:bg-red-500/10" 
                        onClick={() => toast.info("Logged out from all devices")}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout All
                      </Button>
                    </div>
                    
                    <Separator className="bg-gray-700" />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Delete Account</p>
                        <p className="text-sm text-gray-400">Permanently remove your account and data</p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="border-red-500/50 hover:bg-red-500/10 text-red-500" 
                        onClick={handleDeleteAccount}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
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

export default ProfilePage;
