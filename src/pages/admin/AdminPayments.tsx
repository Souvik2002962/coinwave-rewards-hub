
import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Download } from 'lucide-react';

const mockPayments = [
  {
    id: "PAY-001",
    advertiser: "TechCorp Solutions",
    amount: 50000,
    paymentMode: "UPI",
    date: "2024-01-15",
    coinsBought: 10000
  },
  {
    id: "PAY-002",
    advertiser: "Fashion Brands",
    amount: 30000,
    paymentMode: "Bank Transfer",
    date: "2024-01-12",
    coinsBought: 6000
  },
  {
    id: "PAY-003",
    advertiser: "Local Restaurant",
    amount: 15000,
    paymentMode: "Credit Card",
    date: "2024-01-10",
    coinsBought: 3000
  },
];

export default function AdminPayments() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Payment Management</h1>
            <p className="text-muted-foreground">
              Track advertiser payments and coin purchases
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>
              All advertiser coin purchases and payments
            </CardDescription>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search payments..." className="pl-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Advertiser</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Mode</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Coins Bought</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.advertiser}</TableCell>
                    <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{payment.paymentMode}</Badge>
                    </TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{payment.coinsBought} coins</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
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
