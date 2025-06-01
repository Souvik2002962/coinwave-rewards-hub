
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Search, Bell, ShoppingCart, Heart, Send, Clock, AlertTriangle } from 'lucide-react';
import { toast } from "sonner";

const mockCartWishlistData = [
  {
    id: 1,
    userId: "user-001",
    userName: "John Doe",
    email: "john@example.com",
    type: "cart",
    productName: "Nike Air Max 270",
    productPrice: 9999,
    addedDate: "2024-01-15",
    daysAgo: 3,
    notificationSent: false
  },
  {
    id: 2,
    userId: "user-002", 
    userName: "Jane Smith",
    email: "jane@example.com",
    type: "wishlist",
    productName: "Adidas Ultraboost",
    productPrice: 12999,
    addedDate: "2024-01-10",
    daysAgo: 8,
    notificationSent: true
  },
  {
    id: 3,
    userId: "user-001",
    userName: "John Doe", 
    email: "john@example.com",
    type: "cart",
    productName: "Leather Jacket",
    productPrice: 4999,
    addedDate: "2024-01-12",
    daysAgo: 6,
    notificationSent: false
  },
  {
    id: 4,
    userId: "user-003",
    userName: "Mike Johnson",
    email: "mike@example.com",
    type: "wishlist",
    productName: "Premium Cotton T-Shirt",
    productPrice: 999,
    addedDate: "2024-01-08",
    daysAgo: 10,
    notificationSent: true
  }
];

export default function AdminCartWishlist() {
  const [activeTab, setActiveTab] = useState("overview");
  const [autoNotifications, setAutoNotifications] = useState(true);
  const [reminderDays, setReminderDays] = useState(7);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendNotification = (itemId: number, itemType: string) => {
    toast.success(`Reminder notification sent for ${itemType} item`);
  };

  const handleBulkNotification = (type: string) => {
    toast.success(`Bulk notifications sent for all ${type} items`);
  };

  const filteredData = mockCartWishlistData.filter(item => 
    item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const urgentItems = filteredData.filter(item => item.daysAgo >= reminderDays && !item.notificationSent);
  const cartItems = filteredData.filter(item => item.type === "cart");
  const wishlistItems = filteredData.filter(item => item.type === "wishlist");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cart & Wishlist Management</h1>
            <p className="text-muted-foreground">
              Monitor user cart and wishlist items and send reminder notifications
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              {urgentItems.length} Urgent Items
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cart-items">Cart Items</TabsTrigger>
            <TabsTrigger value="wishlist-items">Wishlist Items</TabsTrigger>
            <TabsTrigger value="settings">Notification Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Cart Items</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{cartItems.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Active items in user carts
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Wishlist Items</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{wishlistItems.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Items in user wishlists
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Urgent Reminders</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{urgentItems.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Items requiring immediate attention
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Urgent Items Requiring Notifications</CardTitle>
                <CardDescription>
                  Items that have been in cart/wishlist for {reminderDays}+ days without purchase
                </CardDescription>
                <div className="flex items-center justify-between">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search items..." 
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleBulkNotification('cart')} size="sm">
                      <Send className="mr-2 h-4 w-4" />
                      Send Cart Reminders
                    </Button>
                    <Button onClick={() => handleBulkNotification('wishlist')} variant="outline" size="sm">
                      <Send className="mr-2 h-4 w-4" />
                      Send Wishlist Reminders
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Days Ago</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {urgentItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.userName}</div>
                            <div className="text-sm text-muted-foreground">{item.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{item.productName}</TableCell>
                        <TableCell>
                          <Badge variant={item.type === 'cart' ? 'default' : 'secondary'}>
                            {item.type === 'cart' ? (
                              <><ShoppingCart className="mr-1 h-3 w-3" /> Cart</>
                            ) : (
                              <><Heart className="mr-1 h-3 w-3" /> Wishlist</>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="destructive">{item.daysAgo} days</Badge>
                        </TableCell>
                        <TableCell>₹{item.productPrice}</TableCell>
                        <TableCell>
                          <Badge variant={item.notificationSent ? "default" : "outline"}>
                            {item.notificationSent ? "Notified" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            onClick={() => handleSendNotification(item.id, item.type)}
                            disabled={item.notificationSent}
                          >
                            <Bell className="mr-2 h-4 w-4" />
                            Send Reminder
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {urgentItems.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No urgent items found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cart-items">
            <Card>
              <CardHeader>
                <CardTitle>All Cart Items</CardTitle>
                <CardDescription>
                  Monitor all items currently in user carts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Added Date</TableHead>
                      <TableHead>Days Ago</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.userName}</div>
                            <div className="text-sm text-muted-foreground">{item.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{item.productName}</TableCell>
                        <TableCell>{item.addedDate}</TableCell>
                        <TableCell>
                          <Badge variant={item.daysAgo >= reminderDays ? "destructive" : "secondary"}>
                            {item.daysAgo} days
                          </Badge>
                        </TableCell>
                        <TableCell>₹{item.productPrice}</TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleSendNotification(item.id, 'cart')}
                          >
                            <Bell className="mr-2 h-4 w-4" />
                            Send Reminder
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist-items">
            <Card>
              <CardHeader>
                <CardTitle>All Wishlist Items</CardTitle>
                <CardDescription>
                  Monitor all items currently in user wishlists
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Added Date</TableHead>
                      <TableHead>Days Ago</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {wishlistItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.userName}</div>
                            <div className="text-sm text-muted-foreground">{item.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{item.productName}</TableCell>
                        <TableCell>{item.addedDate}</TableCell>
                        <TableCell>
                          <Badge variant={item.daysAgo >= reminderDays ? "destructive" : "secondary"}>
                            {item.daysAgo} days
                          </Badge>
                        </TableCell>
                        <TableCell>₹{item.productPrice}</TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleSendNotification(item.id, 'wishlist')}
                          >
                            <Bell className="mr-2 h-4 w-4" />
                            Send Reminder
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure automatic reminder notifications for cart and wishlist items
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                      Automatically send reminder notifications to users
                    </div>
                  </div>
                  <Switch 
                    checked={autoNotifications}
                    onCheckedChange={setAutoNotifications}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reminderDays">Reminder Days</Label>
                  <Input
                    id="reminderDays"
                    type="number"
                    value={reminderDays}
                    onChange={(e) => setReminderDays(Number(e.target.value))}
                    placeholder="Number of days"
                    className="max-w-xs"
                  />
                  <div className="text-sm text-muted-foreground">
                    Send reminder after items have been in cart/wishlist for this many days
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Templates</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Cart Reminder</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        "Don't forget your items! Complete your purchase now."
                      </p>
                      <Button size="sm" variant="outline">Edit Template</Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Wishlist Reminder</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        "Your wishlist items are still available. Buy now!"
                      </p>
                      <Button size="sm" variant="outline">Edit Template</Button>
                    </div>
                  </div>
                </div>

                <Button className="w-full">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
