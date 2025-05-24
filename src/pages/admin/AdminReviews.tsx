
import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Check, X, Star } from 'lucide-react';

const mockReviews = [
  {
    id: 1,
    product: "Nike Air Max 270",
    user: "John Doe",
    rating: 5,
    comment: "Amazing product! Very comfortable and great quality.",
    date: "2024-01-15",
    status: "Pending"
  },
  {
    id: 2,
    product: "Samsung Galaxy Buds",
    user: "Jane Smith", 
    rating: 4,
    comment: "Good sound quality, battery life could be better.",
    date: "2024-01-14",
    status: "Approved"
  },
  {
    id: 3,
    product: "Coffee Mug Set",
    user: "Mike Johnson",
    rating: 2,
    comment: "Poor quality, broke after first use.",
    date: "2024-01-13",
    status: "Rejected"
  },
];

export default function AdminReviews() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Review Management</h1>
          <p className="text-muted-foreground">
            Moderate and manage product reviews from customers
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product Reviews</CardTitle>
            <CardDescription>
              All customer reviews awaiting moderation
            </CardDescription>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search reviews..." className="pl-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.product}</TableCell>
                    <TableCell>{review.user}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{review.comment}</TableCell>
                    <TableCell>{review.date}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          review.status === "Approved" ? "default" :
                          review.status === "Rejected" ? "destructive" : "secondary"
                        }
                      >
                        {review.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {review.status === "Pending" && (
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-green-600">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
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
