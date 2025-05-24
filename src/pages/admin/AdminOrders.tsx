
import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Eye } from 'lucide-react';

const mockOrders = [
  {
    id: "ORD-001",
    product: "Nike Air Max 270",
    user: "John Doe",
    address: "Mumbai, Maharashtra",
    paymentStatus: "Paid",
    coinsUsed: 400,
    deliveryStatus: "Delivered",
    amount: 396
  },
  {
    id: "ORD-002", 
    product: "Samsung Galaxy Buds",
    user: "Jane Smith",
    address: "Delhi, Delhi",
    paymentStatus: "Paid",
    coinsUsed: 300,
    deliveryStatus: "Shipped",
    amount: 297
  },
  {
    id: "ORD-003",
    product: "Coffee Mug Set",
    user: "Mike Johnson",
    address: "Bangalore, Karnataka",
    paymentStatus: "Pending",
    coinsUsed: 150,
    deliveryStatus: "Processing",
    amount: 148.5
  },
];

export default function AdminOrders() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
            <p className="text-muted-foreground">
              Track and manage all customer orders
            </p>
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
            <CardDescription>
              Complete list of customer orders
            </CardDescription>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search orders..." className="pl-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Coins Used</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.user}</TableCell>
                    <TableCell>{order.address}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <Badge 
                          variant={order.paymentStatus === "Paid" ? "default" : "destructive"}
                        >
                          {order.paymentStatus}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          ₹{order.amount}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{order.coinsUsed} coins</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          order.deliveryStatus === "Delivered" ? "default" :
                          order.deliveryStatus === "Shipped" ? "secondary" : "outline"
                        }
                      >
                        {order.deliveryStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
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
