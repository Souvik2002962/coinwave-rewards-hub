
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Eye, Edit, Trash2, Coins } from 'lucide-react';

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    coins: 1250,
    orders: 5,
    status: "Active",
    joinDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+91 9876543211",
    coins: 850,
    orders: 3,
    status: "Active",
    joinDate: "2024-01-10"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+91 9876543212",
    coins: 0,
    orders: 0,
    status: "Suspended",
    joinDate: "2024-01-05"
  },
];

export default function AdminUsers() {
  const [activeTab, setActiveTab] = useState("all-users");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">
              Manage all registered users on your platform
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all-users">All Users</TabsTrigger>
            <TabsTrigger value="add-user">Add User</TabsTrigger>
            <TabsTrigger value="coin-management">Coin Management</TabsTrigger>
            <TabsTrigger value="user-analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="all-users">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>
                  A list of all users registered on your platform
                </CardDescription>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search users..." className="pl-8" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Coins</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{user.coins} coins</Badge>
                        </TableCell>
                        <TableCell>{user.orders}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.status === "Active" ? "default" : "destructive"}
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add-user">
            <Card>
              <CardHeader>
                <CardTitle>Add New User</CardTitle>
                <CardDescription>
                  Manually create a new user account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="userName">Full Name</Label>
                    <Input id="userName" placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userEmail">Email</Label>
                    <Input id="userEmail" type="email" placeholder="Enter email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userPhone">Phone</Label>
                    <Input id="userPhone" placeholder="+91 9876543210" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="initialCoins">Initial Coins</Label>
                    <Input id="initialCoins" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Temporary Password</Label>
                  <Input id="password" type="password" placeholder="Enter temporary password" />
                </div>
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create User
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coin-management">
            <Card>
              <CardHeader>
                <CardTitle>Coin Management</CardTitle>
                <CardDescription>
                  Add or subtract coins from user accounts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="targetUser">User Email</Label>
                    <Input id="targetUser" type="email" placeholder="user@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coinAmount">Coin Amount</Label>
                    <Input id="coinAmount" type="number" placeholder="100" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Input id="reason" placeholder="Reason for coin adjustment" />
                </div>
                <div className="flex space-x-4">
                  <Button className="flex-1">
                    <Coins className="mr-2 h-4 w-4" />
                    Add Coins
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Coins className="mr-2 h-4 w-4" />
                    Subtract Coins
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="user-analytics">
            <Card>
              <CardHeader>
                <CardTitle>User Analytics</CardTitle>
                <CardDescription>
                  Overview of user statistics and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">Total Users</h3>
                    <p className="text-2xl font-bold">12,534</p>
                    <p className="text-sm text-green-600">+12% this month</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">Active Users</h3>
                    <p className="text-2xl font-bold">8,234</p>
                    <p className="text-sm text-green-600">+8% this month</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">Suspended Users</h3>
                    <p className="text-2xl font-bold">156</p>
                    <p className="text-sm text-red-600">+2% this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
