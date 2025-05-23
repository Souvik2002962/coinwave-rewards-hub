
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight,
  Package,
  ShoppingBag,
  TruckIcon,
  CheckCircle,
  Search,
  Calendar,
  Filter
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import OrderService, { Order, OrderStatus } from '@/services/OrderService';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const userOrders = await OrderService.getUserOrders(user.id);
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, [user]);
  
  // If not logged in, redirect to login
  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);
  
  // Filter orders based on status and search query
  const getFilteredOrders = () => {
    if (!orders.length) return [];
    
    return orders.filter(order => {
      const matchesStatus = filterStatus === "all" || order.status === filterStatus;
      
      const matchesSearch = searchQuery === "" || 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some(item => 
          item.productName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      return matchesStatus && matchesSearch;
    });
  };
  
  const filteredOrders = getFilteredOrders();
  
  // Format date to readable string
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }).format(new Date(date));
  };
  
  // Get status badge color and icon
  const getStatusDetails = (status: OrderStatus) => {
    switch (status) {
      case "processing":
        return { 
          color: "bg-blue-100 text-blue-800",
          icon: <Package className="h-4 w-4 mr-1" />
        };
      case "shipped":
        return { 
          color: "bg-amber-100 text-amber-800",
          icon: <TruckIcon className="h-4 w-4 mr-1" />
        };
      case "delivered":
        return { 
          color: "bg-green-100 text-green-800",
          icon: <CheckCircle className="h-4 w-4 mr-1" />
        };
      case "cancelled":
        return { 
          color: "bg-red-100 text-red-800",
          icon: <ChevronRight className="h-4 w-4 mr-1" />
        };
      default:
        return { 
          color: "bg-gray-100 text-gray-800",
          icon: <ChevronRight className="h-4 w-4 mr-1" />
        };
    }
  };
  
  const OrderCard = ({ order }: { order: Order }) => {
    const { color, icon } = getStatusDetails(order.status);
    
    return (
      <Card className="mb-4 hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-base">Order #{order.id.substring(order.id.length - 8)}</CardTitle>
              <CardDescription className="flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                {formatDate(order.createdAt)}
              </CardDescription>
            </div>
            <Badge className={`${color} capitalize whitespace-nowrap flex items-center`}>
              {icon}
              {order.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center">
                <div className="h-16 w-16 bg-gray-100 rounded mr-4 flex-shrink-0">
                  <img 
                    src={item.productImage} 
                    alt={item.productName} 
                    className="h-full w-full object-contain" 
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-sm">{item.productName}</h3>
                  <div className="flex gap-2 text-xs text-gray-500">
                    <span>Qty: {item.quantity}</span>
                    {item.size && <span>Size: {item.size}</span>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">₹{item.price}</div>
                  <div className="text-xs text-amber-600">{item.coinsUsed} Coins used</div>
                </div>
              </div>
            ))}
            
            <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
              <div>
                <div className="text-xs text-gray-500">Total Amount</div>
                <div className="font-medium">₹{order.totalAmount}</div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-300"
                onClick={() => {
                  // In a real app, navigate to order details page
                  toast.info("Order details view coming soon");
                }}
              >
                View Details
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={() => navigate('/store')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Store
          </button>
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
            <Button 
              variant="outline" 
              className="border-gray-300"
              onClick={() => navigate('/store')}
            >
              <ShoppingBag className="h-4 w-4 mr-1" />
              Continue Shopping
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search orders..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="w-full sm:w-40">
                <Select 
                  value={filterStatus}
                  onValueChange={setFilterStatus}
                >
                  <SelectTrigger className="w-full">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      <span>Status</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="processing" className="flex-1">Processing</TabsTrigger>
              <TabsTrigger value="shipped" className="flex-1">Shipped</TabsTrigger>
              <TabsTrigger value="delivered" className="flex-1">Delivered</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <OrdersList 
                orders={filteredOrders} 
                isLoading={isLoading} 
                OrderCard={OrderCard}
              />
            </TabsContent>
            
            <TabsContent value="processing">
              <OrdersList 
                orders={orders.filter(o => o.status === 'processing')} 
                isLoading={isLoading} 
                OrderCard={OrderCard}
              />
            </TabsContent>
            
            <TabsContent value="shipped">
              <OrdersList 
                orders={orders.filter(o => o.status === 'shipped')} 
                isLoading={isLoading} 
                OrderCard={OrderCard}
              />
            </TabsContent>
            
            <TabsContent value="delivered">
              <OrdersList 
                orders={orders.filter(o => o.status === 'delivered')} 
                isLoading={isLoading} 
                OrderCard={OrderCard}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

interface OrdersListProps {
  orders: Order[];
  isLoading: boolean;
  OrderCard: React.FC<{ order: Order }>;
}

const OrdersList: React.FC<OrdersListProps> = ({ orders, isLoading, OrderCard }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-6 w-24" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Skeleton className="h-16 w-16 rounded mr-4" />
                  <div className="flex-grow">
                    <Skeleton className="h-4 w-40 mb-2" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-4 w-16 mb-2" />
                    <Skeleton className="h-3 w-10" />
                  </div>
                </div>
                <div className="pt-3 flex justify-between items-center">
                  <div>
                    <Skeleton className="h-3 w-20 mb-1" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-9 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
          <ShoppingBag className="h-6 w-6 text-gray-500" />
        </div>
        <h3 className="font-medium text-gray-900 mb-1">No orders found</h3>
        <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
        <Button onClick={() => window.location.href = '/store'}>
          Start Shopping
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default Orders;
