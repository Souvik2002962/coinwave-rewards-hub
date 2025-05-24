
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Edit, Trash2, UserPlus, Shield, Users } from 'lucide-react';

const mockTeamMembers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@coincart.com",
    role: "Admin",
    department: "Management",
    status: "Active",
    joinDate: "2024-01-15",
    lastActive: "2024-01-20"
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@coincart.com",
    role: "Manager",
    department: "Operations",
    status: "Active",
    joinDate: "2024-01-10",
    lastActive: "2024-01-19"
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@coincart.com",
    role: "Support Agent",
    department: "Customer Support",
    status: "Inactive",
    joinDate: "2024-01-05",
    lastActive: "2024-01-18"
  },
];

const mockRoles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full system access",
    permissions: ["all"],
    membersCount: 1
  },
  {
    id: 2,
    name: "Admin",
    description: "Administrative access",
    permissions: ["users", "products", "orders", "ads"],
    membersCount: 2
  },
  {
    id: 3,
    name: "Manager",
    description: "Management level access",
    permissions: ["orders", "users", "support"],
    membersCount: 3
  },
  {
    id: 4,
    name: "Support Agent",
    description: "Customer support access",
    permissions: ["support", "users.view"],
    membersCount: 5
  }
];

export default function AdminTeamMembers() {
  const [activeTab, setActiveTab] = useState("all-members");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
            <p className="text-muted-foreground">
              Manage your team members, roles, and permissions
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all-members">All Members</TabsTrigger>
            <TabsTrigger value="add-member">Add Member</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
          </TabsList>

          <TabsContent value="all-members">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Manage all team members and their access levels
                </CardDescription>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search members..." className="pl-8" />
                  </div>
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTeamMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{member.role}</Badge>
                        </TableCell>
                        <TableCell>{member.department}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={member.status === "Active" ? "default" : "secondary"}
                          >
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{member.lastActive}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
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

          <TabsContent value="add-member">
            <Card>
              <CardHeader>
                <CardTitle>Add New Team Member</CardTitle>
                <CardDescription>
                  Invite a new team member to join your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="memberName">Full Name</Label>
                    <Input id="memberName" placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="memberEmail">Email</Label>
                    <Input id="memberEmail" type="email" placeholder="Enter email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="memberRole">Role</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="support">Support Agent</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="memberDepartment">Department</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="">Select Department</option>
                      <option value="management">Management</option>
                      <option value="operations">Operations</option>
                      <option value="support">Customer Support</option>
                      <option value="marketing">Marketing</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tempPassword">Temporary Password</Label>
                  <Input id="tempPassword" type="password" placeholder="Enter temporary password" />
                </div>
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Send Invitation
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles">
            <Card>
              <CardHeader>
                <CardTitle>Roles & Permissions</CardTitle>
                <CardDescription>
                  Manage roles and their permissions
                </CardDescription>
                <Button>
                  <Shield className="mr-2 h-4 w-4" />
                  Create Role
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRoles.map((role) => (
                    <div key={role.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{role.name}</h4>
                          <p className="text-sm text-muted-foreground">{role.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="secondary">{role.membersCount} members</Badge>
                            <div className="flex flex-wrap gap-1">
                              {role.permissions.map((permission, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {permission}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments">
            <Card>
              <CardHeader>
                <CardTitle>Departments</CardTitle>
                <CardDescription>
                  Organize team members by departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-5 w-5" />
                      <h3 className="font-semibold">Management</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Executive and administrative roles
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge>3 members</Badge>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-5 w-5" />
                      <h3 className="font-semibold">Operations</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Day-to-day operations management
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge>5 members</Badge>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-5 w-5" />
                      <h3 className="font-semibold">Customer Support</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Customer service and support
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge>8 members</Badge>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
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
