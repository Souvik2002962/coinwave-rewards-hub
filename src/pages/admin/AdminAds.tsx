
import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Eye, Edit } from 'lucide-react';

const mockAds = [
  {
    id: 1,
    title: "Summer Sale Campaign",
    type: "Banner",
    budget: 50000,
    views: 125000,
    clicks: 2500,
    coinsGiven: 12500,
    status: "Active"
  },
  {
    id: 2,
    title: "New Product Launch",
    type: "Video",
    budget: 75000,
    views: 89000,
    clicks: 1780,
    coinsGiven: 8900,
    status: "Active"
  },
  {
    id: 3,
    title: "Holiday Special",
    type: "Banner",
    budget: 30000,
    views: 45000,
    clicks: 900,
    coinsGiven: 4500,
    status: "Completed"
  },
];

export default function AdminAds() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Ad Campaign Management</h1>
            <p className="text-muted-foreground">
              Monitor and manage all advertising campaigns
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Campaigns</CardTitle>
            <CardDescription>
              Overview of all advertising campaigns
            </CardDescription>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search campaigns..." className="pl-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Coins Given</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAds.map((ad) => (
                  <TableRow key={ad.id}>
                    <TableCell className="font-medium">{ad.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{ad.type}</Badge>
                    </TableCell>
                    <TableCell>₹{ad.budget.toLocaleString()}</TableCell>
                    <TableCell>{ad.views.toLocaleString()}</TableCell>
                    <TableCell>{ad.clicks.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{ad.coinsGiven} coins</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={ad.status === "Active" ? "default" : "secondary"}
                      >
                        {ad.status}
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
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
