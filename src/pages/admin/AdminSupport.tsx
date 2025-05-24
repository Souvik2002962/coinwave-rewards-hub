
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Search, MessageSquare, Clock, CheckCircle, AlertCircle, Eye, MessageCircle } from 'lucide-react';

const mockTickets = [
  {
    id: "TKT-001",
    user: "John Doe",
    email: "john@example.com",
    subject: "Cannot redeem coins for product",
    category: "Payment Issue",
    priority: "High",
    status: "Open",
    createdDate: "2024-01-20",
    lastReply: "2024-01-20",
    replies: 3
  },
  {
    id: "TKT-002",
    user: "Jane Smith",
    email: "jane@example.com",
    subject: "Ad video not loading properly",
    category: "Technical Issue",
    priority: "Medium",
    status: "In Progress",
    createdDate: "2024-01-19",
    lastReply: "2024-01-19",
    replies: 1
  },
  {
    id: "TKT-003",
    user: "Mike Johnson",
    email: "mike@example.com",
    subject: "Account suspended without reason",
    category: "Account Issue",
    priority: "High",
    status: "Resolved",
    createdDate: "2024-01-18",
    lastReply: "2024-01-18",
    replies: 5
  },
];

const mockCategories = [
  { name: "Technical Issue", count: 25, color: "bg-blue-500" },
  { name: "Payment Issue", count: 18, color: "bg-red-500" },
  { name: "Account Issue", count: 12, color: "bg-yellow-500" },
  { name: "Product Inquiry", count: 8, color: "bg-green-500" },
  { name: "General", count: 15, color: "bg-gray-500" }
];

export default function AdminSupport() {
  const [activeTab, setActiveTab] = useState("all-tickets");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
            <p className="text-muted-foreground">
              Manage customer support tickets and inquiries
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all-tickets">All Tickets</TabsTrigger>
            <TabsTrigger value="open-tickets">Open Tickets</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="all-tickets">
            <Card>
              <CardHeader>
                <CardTitle>Support Tickets</CardTitle>
                <CardDescription>
                  Manage all customer support requests
                </CardDescription>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search tickets..." className="pl-8" />
                  </div>
                  <select className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="">All Status</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{ticket.user}</div>
                            <div className="text-sm text-muted-foreground">{ticket.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">{ticket.subject}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{ticket.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={ticket.priority === "High" ? "destructive" : 
                                    ticket.priority === "Medium" ? "default" : "secondary"}
                          >
                            {ticket.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={ticket.status === "Open" ? "destructive" : 
                                    ticket.status === "In Progress" ? "default" : "secondary"}
                          >
                            {ticket.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{ticket.createdDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageCircle className="h-4 w-4" />
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

          <TabsContent value="open-tickets">
            <Card>
              <CardHeader>
                <CardTitle>Open Tickets</CardTitle>
                <CardDescription>
                  Tickets that require immediate attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTickets.filter(ticket => ticket.status === "Open").map((ticket) => (
                    <div key={ticket.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="destructive">{ticket.id}</Badge>
                          <Badge variant="outline">{ticket.priority} Priority</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{ticket.createdDate}</span>
                        </div>
                      </div>
                      <h4 className="font-semibold mb-1">{ticket.subject}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        From: {ticket.user} ({ticket.email})
                      </p>
                      <div className="flex space-x-2">
                        <Button size="sm">Reply</Button>
                        <Button variant="outline" size="sm">Assign</Button>
                        <Button variant="outline" size="sm">Close</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Support Categories</CardTitle>
                <CardDescription>
                  Manage ticket categories and their distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded ${category.color}`}></div>
                        <div>
                          <h4 className="font-medium">{category.name}</h4>
                          <p className="text-sm text-muted-foreground">{category.count} active tickets</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View Tickets</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button>Add New Category</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Support Analytics</CardTitle>
                <CardDescription>
                  Overview of support performance and metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <MessageSquare className="h-5 w-5 text-blue-500" />
                      <h3 className="font-semibold">Total Tickets</h3>
                    </div>
                    <p className="text-2xl font-bold">156</p>
                    <p className="text-sm text-green-600">+12% this week</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-5 w-5 text-yellow-500" />
                      <h3 className="font-semibold">Avg Response Time</h3>
                    </div>
                    <p className="text-2xl font-bold">2.5h</p>
                    <p className="text-sm text-green-600">-15% faster</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <h3 className="font-semibold">Resolution Rate</h3>
                    </div>
                    <p className="text-2xl font-bold">94%</p>
                    <p className="text-sm text-green-600">+3% improvement</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <h3 className="font-semibold">Open Tickets</h3>
                    </div>
                    <p className="text-2xl font-bold">23</p>
                    <p className="text-sm text-red-600">+5 from yesterday</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Support Settings</CardTitle>
                <CardDescription>
                  Configure support system preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Auto-Response Settings</h3>
                  <div className="space-y-2">
                    <Label htmlFor="autoResponse">Auto-response message for new tickets</Label>
                    <Textarea 
                      id="autoResponse" 
                      placeholder="Enter automatic response message..."
                      defaultValue="Thank you for contacting CoinCart support. We've received your request and will respond within 24 hours."
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="enableAutoResponse" defaultChecked />
                    <Label htmlFor="enableAutoResponse">Enable auto-response for new tickets</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Escalation Rules</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="highPriorityEscalation">High priority escalation (hours)</Label>
                      <Input id="highPriorityEscalation" type="number" defaultValue="2" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="normalEscalation">Normal escalation (hours)</Label>
                      <Input id="normalEscalation" type="number" defaultValue="24" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Notification Settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="emailNotifications" defaultChecked />
                      <Label htmlFor="emailNotifications">Email notifications for new tickets</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="slackNotifications" />
                      <Label htmlFor="slackNotifications">Slack notifications for urgent tickets</Label>
                    </div>
                  </div>
                </div>

                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
