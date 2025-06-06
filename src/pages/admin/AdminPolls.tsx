
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, BarChart3, TrendingUp, Users, Eye } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const mockPollData = [
  {
    id: 1,
    campaignName: "Summer Fashion Collection",
    question: "What interests you most about our Summer Collection?",
    totalVotes: 1247,
    responses: [
      { option: "Design & Style", votes: 456, percentage: 36.6 },
      { option: "Price & Value", votes: 398, percentage: 31.9 },
      { option: "Quality & Materials", votes: 248, percentage: 19.9 },
      { option: "Brand Reputation", votes: 145, percentage: 11.6 }
    ],
    status: "Active",
    createdAt: "2024-01-15",
    coinsPaid: 6235
  },
  {
    id: 2,
    campaignName: "Tech Gadgets Launch",
    question: "Which feature is most important to you?",
    totalVotes: 892,
    responses: [
      { option: "Performance", votes: 356, percentage: 39.9 },
      { option: "Battery Life", votes: 267, percentage: 29.9 },
      { option: "Design", votes: 178, percentage: 20.0 },
      { option: "Price", votes: 91, percentage: 10.2 }
    ],
    status: "Active",
    createdAt: "2024-01-20",
    coinsPaid: 4460
  },
  {
    id: 3,
    campaignName: "Food Delivery App",
    question: "What would make you order more frequently?",
    totalVotes: 2156,
    responses: [
      { option: "Faster Delivery", votes: 648, percentage: 30.1 },
      { option: "Lower Prices", votes: 561, percentage: 26.0 },
      { option: "More Restaurants", votes: 517, percentage: 24.0 },
      { option: "Better Quality", votes: 430, percentage: 19.9 }
    ],
    status: "Completed",
    createdAt: "2024-01-10",
    coinsPaid: 10780
  }
];

export default function AdminPolls() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPoll, setSelectedPoll] = useState<number | null>(null);

  const filteredPolls = mockPollData.filter(poll => {
    const matchesSearch = poll.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         poll.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || poll.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalVotes = mockPollData.reduce((sum, poll) => sum + poll.totalVotes, 0);
  const totalCoinsSpent = mockPollData.reduce((sum, poll) => sum + poll.coinsPaid, 0);
  const activePolls = mockPollData.filter(poll => poll.status === "Active").length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Poll Analytics</h1>
            <p className="text-muted-foreground">
              Track and analyze poll responses from your ad campaigns
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Polls</CardDescription>
              <CardTitle className="text-2xl">{mockPollData.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{activePolls} active</span>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Responses</CardDescription>
              <CardTitle className="text-2xl">{totalVotes.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-green-600">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +23% this month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Coins Spent</CardDescription>
              <CardTitle className="text-2xl">{totalCoinsSpent.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                On poll rewards
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Avg Response Rate</CardDescription>
              <CardTitle className="text-2xl">68.4%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-green-600">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +5.2% vs last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Poll Results</CardTitle>
            <CardDescription>
              View detailed results from all your campaign polls
            </CardDescription>
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search polls..." 
                  className="pl-8" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead>Total Votes</TableHead>
                  <TableHead>Coins Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPolls.map((poll) => (
                  <TableRow key={poll.id}>
                    <TableCell className="font-medium">{poll.campaignName}</TableCell>
                    <TableCell className="max-w-xs truncate">{poll.question}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        {poll.totalVotes.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>{poll.coinsPaid.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={poll.status === "Active" ? "default" : poll.status === "Completed" ? "secondary" : "destructive"}
                      >
                        {poll.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedPoll(selectedPoll === poll.id ? null : poll.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Detailed Poll Results */}
        {selectedPoll && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Poll Results - {mockPollData.find(p => p.id === selectedPoll)?.campaignName}
              </CardTitle>
              <CardDescription>
                {mockPollData.find(p => p.id === selectedPoll)?.question}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mockPollData.find(p => p.id === selectedPoll)?.responses.map((response, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{response.option}</span>
                    <div className="text-sm text-muted-foreground">
                      {response.votes} votes ({response.percentage}%)
                    </div>
                  </div>
                  <Progress value={response.percentage} className="h-2" />
                </div>
              ))}
              
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {mockPollData.find(p => p.id === selectedPoll)?.totalVotes}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Votes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {mockPollData.find(p => p.id === selectedPoll)?.coinsPaid}
                    </div>
                    <div className="text-sm text-muted-foreground">Coins Spent</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {mockPollData.find(p => p.id === selectedPoll)?.responses.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Options</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {((mockPollData.find(p => p.id === selectedPoll)?.coinsPaid || 0) / (mockPollData.find(p => p.id === selectedPoll)?.totalVotes || 1)).toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">Coins/Vote</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
