
import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronRight, PackageCheck, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Order } from '@/services/OrderService';
import { Product } from '@/services/ProductService';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Get data from location state
  const order: Order | undefined = location.state?.order;
  const product: Product | undefined = location.state?.product;
  const coinsUsed: number | undefined = location.state?.coinsUsed;
  
  // If no order data, redirect to home
  useEffect(() => {
    if (!order) {
      navigate('/store');
    }
  }, [order, navigate]);
  
  // If not logged in, redirect to login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  if (!order || !product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Thank you! Your order has been placed.</h1>
            <p className="text-gray-600 mt-1">
              Order confirmation has been sent to your email.
            </p>
          </div>
          
          {/* Order Summary Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Order Summary</h2>
                <span className="text-sm text-gray-500">Order ID: {order.id}</span>
              </div>
              
              {order.items.map((item, index) => (
                <div key={index} className="flex items-start py-4">
                  <div className="h-16 w-16 bg-gray-100 rounded mr-4 flex-shrink-0">
                    <img 
                      src={item.productImage} 
                      alt={item.productName} 
                      className="h-full w-full object-contain" 
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.productName}</h3>
                    {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">₹{item.price * item.quantity}</div>
                    <div className="text-xs text-gray-500">{item.coinsUsed * item.quantity} Coins used</div>
                  </div>
                </div>
              ))}
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>₹{order.totalAmount + (coinsUsed / 100)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Coin Discount</span>
                  <span className="text-green-600">- ₹{coinsUsed / 100}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between font-medium">
                  <span>Total Paid</span>
                  <span>₹{order.totalAmount}</span>
                </div>
                
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Coins Used</span>
                  <span>{order.totalCoinsUsed}</span>
                </div>
                
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Payment Method</span>
                  <span className="capitalize">{order.paymentMethod}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Delivery Address */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-2 flex items-center">
                <PackageCheck className="h-5 w-5 mr-2 text-gray-500" />
                Delivery Information
              </h2>
              
              <div className="space-y-2 text-gray-700">
                <p><span className="font-medium">Name:</span> {order.deliveryAddress.name}</p>
                <p><span className="font-medium">Phone:</span> {order.deliveryAddress.phone}</p>
                <p><span className="font-medium">Address:</span> {order.deliveryAddress.address}</p>
                <p>
                  {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
                </p>
                {order.deliveryAddress.landmark && (
                  <p><span className="font-medium">Landmark:</span> {order.deliveryAddress.landmark}</p>
                )}
              </div>
              
              <div className="mt-6 bg-blue-50 p-4 rounded-md">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800">Estimated Delivery</h3>
                    <p className="text-sm text-gray-600">Your order is expected to arrive in 3-5 business days.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-black hover:bg-gray-800 flex-1"
              onClick={() => navigate('/shop/orders')}
            >
              View My Orders
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            
            <Button 
              variant="outline" 
              className="border-gray-300 flex-1"
              onClick={() => navigate('/store')}
            >
              <ShoppingBag className="h-4 w-4 mr-1" />
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
