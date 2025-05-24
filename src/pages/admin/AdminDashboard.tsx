
import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Coins, ShoppingCart, Eye, Building2, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const statsCards = [
  {
    title: "Total Users",
    value: "12,534",
    change: "+12%",
    changeType: "positive",
    icon: Users,
  },
  {
    title: "Coins Distributed",
    value: "2.5M",
    change: "+8%",
    changeType: "positive",
    icon: Coins,
  },
  {
    title: "Orders This Week",
    value: "1,248",
    change: "+23%",
    changeType: "positive",
    icon: ShoppingCart,
  },
  {
    title: "Ad Views Today",
    value: "45,678",
    change: "+5%",
    changeType: "positive",
    icon: Eye,
  },
  {
    title: "Active Advertisers",
    value: "156",
    change: "+3%",
    changeType: "positive",
    icon: Building2,
  },
  {
    title: "Revenue",
    value: "₹2,34,567",
    change: "+15%",
    changeType: "positive",
    icon: TrendingUp,
  },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {statsCards.map((card) => (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-green-600 bg-green-100">
                    {card.change}
                  </Badge>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>
                Monthly active users over the past year
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                Chart placeholder - Connect to Recharts later
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest platform activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      New user registered
                    </p>
                    <p className="text-sm text-muted-foreground">
                      2 minutes ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Order completed
                    </p>
                    <p className="text-sm text-muted-foreground">
                      5 minutes ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Ad campaign approved
                    </p>
                    <p className="text-sm text-muted-foreground">
                      10 minutes ago
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
