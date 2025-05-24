
import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, Edit, Users } from 'lucide-react';

const mockAdvertisers = [
  {
    id: 1,
    name: "TechCorp Solutions",
    email: "contact@techcorp.com",
    company: "TechCorp Inc.",
    campaigns: 5,
    paid: 125000,
    coinsUsed: 25000,
    status: "Active"
  },
  {
    id: 2,
    name: "Fashion Brands",
    email: "ads@fashionbrands.com", 
    company: "Fashion Brands Ltd.",
    campaigns: 3,
    paid: 85000,
    coinsUsed: 17000,
    status: "Active"
  },
  {
    id: 3,
    name: "Local Restaurant",
    email: "marketing@localrest.com",
    company: "Local Restaurant Chain",
    campaigns: 1,
    paid: 15000,
    coinsUsed: 3000,
    status: "Suspended"
  },
];

export default function AdminAdvertisers() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Advertiser Management</h1>
            <p className="text-muted-foreground">
              Manage all advertisers and their campaigns
            </p>
          </div>
          <Button>
            <Users className="mr-2 h-4 w-4" />
            Add Advertiser
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Advertisers</CardTitle>
            <CardDescription>
              Complete list of registered advertisers
            </CardDescription>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search advertisers..." className="pl-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Campaigns</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Coins Used</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAdvertisers.map((advertiser) => (
                  <TableRow key={advertiser.id}>
                    <TableCell className="font-medium">{advertiser.name}</TableCell>
                    <TableCell>{advertiser.email}</TableCell>
                    <TableCell>{advertiser.company}</TableCell>
                    <TableCell>{advertiser.campaigns}</TableCell>
                    <TableCell>₹{advertiser.paid.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{advertiser.coinsUsed} coins</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={advertiser.status === "Active" ? "default" : "destructive"}
                      >
                        {advertiser.status}
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
