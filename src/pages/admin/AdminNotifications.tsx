
import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Send, Bell } from 'lucide-react';

const recentNotifications = [
  {
    id: 1,
    title: "Welcome to CoinCart!",
    message: "Start earning coins by watching ads and shopping.",
    type: "Announcement",
    date: "2024-01-15",
    recipients: "All Users"
  },
  {
    id: 2,
    title: "Order Delivered",
    message: "Your Nike Air Max 270 has been delivered.",
    type: "System",
    date: "2024-01-14",
    recipients: "John Doe"
  },
  {
    id: 3,
    title: "New Products Added",
    message: "Check out our latest collection!",
    type: "Announcement",
    date: "2024-01-13",
    recipients: "All Users"
  },
];

export default function AdminNotifications() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notification Center</h1>
          <p className="text-muted-foreground">
            Send announcements and manage system notifications
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Send Announcement</CardTitle>
              <CardDescription>
                Send a message to all users or specific groups
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Notification Title</Label>
                <Input
                  id="title"
                  placeholder="Enter notification title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message here..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipients">Recipients</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                  <option value="all">All Users</option>
                  <option value="active">Active Users Only</option>
                  <option value="advertisers">Advertisers Only</option>
                </select>
              </div>
              <Button className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Notification
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>
                Real-time platform notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">New user registration</p>
                      <p className="text-xs text-muted-foreground">5 minutes ago</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Order completed</p>
                      <p className="text-xs text-muted-foreground">12 minutes ago</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Campaign budget depleted</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>
              History of sent notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline">{notification.type}</Badge>
                        <span className="text-xs text-muted-foreground">{notification.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{notification.recipients}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
