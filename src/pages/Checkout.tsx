
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Coins, CreditCard, MapPin, Truck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductService, { Product } from '@/services/ProductService';
import OrderService, { PaymentMethod } from '@/services/OrderService';
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Enter a valid phone number"),
  pincode: z.string().min(6, "Enter a valid pincode"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  landmark: z.string().optional(),
  paymentMethod: z.enum(["upi", "razorpay", "cash"])
});

const Checkout = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, updateCoins } = useAuth();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get the product data from location state or fetch it
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (location.state?.product) {
          setProduct(location.state.product);
          setQuantity(location.state.quantity || 1);
          setSize(location.state.size || "");
        } else if (id) {
          const productData = await ProductService.getProductById(id);
          if (productData) {
            setProduct(productData);
            if (productData.availableSizes && productData.availableSizes.length > 0) {
              setSize(productData.availableSizes[0]);
            }
          } else {
            toast.error("Product not found");
            navigate('/store');
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load checkout information");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id, location.state, navigate]);
  
  // Check if user is logged in
  useEffect(() => {
    if (!user && !isLoading) {
      toast.error("Please log in to continue");
      navigate('/login');
    }
  }, [user, isLoading, navigate]);
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.fullName || "",
      phone: "",
      pincode: "",
      address: "",
      city: "",
      state: "Maharashtra",
      landmark: "",
      paymentMethod: "razorpay"
    }
  });
  
  // Calculate prices
  const calculatePrice = () => {
    if (!product) return { original: 0, final: 0, discount: 0, coinsUsed: 0 };
    
    const original = product.price * quantity;
    const coinsUsed = product.discountCoins * quantity;
    const discount = (product.discountCoins / 100) * quantity;
    const final = original - discount;
    
    return {
      original,
      final,
      discount,
      coinsUsed
    };
  };
  
  const { original, final, discount, coinsUsed } = calculatePrice();
  
  const hasEnoughCoins = user && product 
    ? user.coinBalance >= coinsUsed 
    : false;
    
  // Form submission handler
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!user || !product) return;
    
    if (!hasEnoughCoins) {
      toast.error(`You need ${coinsUsed} coins but only have ${user.coinBalance}`);
      navigate('/earn');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create order
      const order = await OrderService.createOrder(
        user.id,
        [{
          productId: product.id,
          productName: product.name,
          productImage: product.imageUrl,
          price: product.price,
          coinsUsed: product.discountCoins,
          quantity,
          size: size || undefined
        }],
        final,
        coinsUsed,
        data.paymentMethod as PaymentMethod,
        {
          name: data.name,
          phone: data.phone,
          pincode: data.pincode,
          address: data.address,
          city: data.city,
          state: data.state,
          landmark: data.landmark
        }
      );
      
      // Deduct coins from user
      updateCoins(-coinsUsed);
      
      // Navigate to success page
      navigate('/shop/order-success', { 
        state: { 
          order, 
          product,
          coinsUsed
        } 
      });
      
    } catch (error) {
      console.error("Error processing order:", error);
      toast.error("Failed to process your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading || !product) {
    return (
      <div className="min-h-screen bg-white">
        <NavBar />
        <div className="container mx-auto px-4 pt-28 pb-16">
          <div className="flex justify-center">
            <div className="w-full max-w-3xl">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                <div className="h-80 bg-gray-200 rounded"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                <div className="h-40 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="container mx-auto px-4 pt-28 pb-16">
        <button 
          onClick={() => navigate(`/shop/product/${product.id}`)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Product
        </button>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Delivery and Payment Form */}
          <div className="lg:w-2/3">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Delivery Details</h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Details */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-medium mb-4 flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                    Contact Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="9876543210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Address */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-medium mb-4 flex items-center">
                    <Truck className="mr-2 h-5 w-5 text-gray-500" />
                    Delivery Address
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PIN Code</FormLabel>
                          <FormControl>
                            <Input placeholder="400001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main Street, Apartment 4B" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Mumbai" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                              <SelectItem value="Delhi">Delhi</SelectItem>
                              <SelectItem value="Karnataka">Karnataka</SelectItem>
                              <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                              <SelectItem value="Gujarat">Gujarat</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="landmark"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Landmark (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Near Post Office" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Payment */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-medium mb-4 flex items-center">
                    <CreditCard className="mr-2 h-5 w-5 text-gray-500" />
                    Payment Method
                  </h2>
                  
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0 bg-white border rounded-lg p-4 cursor-pointer data-[state=checked]:border-black data-[state=checked]:bg-gray-50">
                              <FormControl>
                                <RadioGroupItem value="upi" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">UPI Payment</FormLabel>
                            </FormItem>
                            
                            <FormItem className="flex items-center space-x-3 space-y-0 bg-white border rounded-lg p-4 cursor-pointer data-[state=checked]:border-black data-[state=checked]:bg-gray-50">
                              <FormControl>
                                <RadioGroupItem value="razorpay" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">Credit / Debit Card</FormLabel>
                            </FormItem>
                            
                            <FormItem className="flex items-center space-x-3 space-y-0 bg-white border rounded-lg p-4 cursor-pointer data-[state=checked]:border-black data-[state=checked]:bg-gray-50">
                              <FormControl>
                                <RadioGroupItem value="cash" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">Cash on Delivery</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="md:hidden">
                  {/* Order Summary for mobile */}
                  <OrderSummary 
                    product={product}
                    quantity={quantity}
                    size={size}
                    originalPrice={original}
                    finalPrice={final}
                    discount={discount}
                    coinsUsed={coinsUsed}
                    hasEnoughCoins={hasEnoughCoins}
                    userCoins={user?.coinBalance || 0}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-black hover:bg-gray-800"
                  disabled={isSubmitting || !hasEnoughCoins}
                >
                  {isSubmitting ? "Processing..." : `Pay & Confirm ₹${final}`}
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3 hidden md:block">
            <OrderSummary 
              product={product}
              quantity={quantity}
              size={size}
              originalPrice={original}
              finalPrice={final}
              discount={discount}
              coinsUsed={coinsUsed}
              hasEnoughCoins={hasEnoughCoins}
              userCoins={user?.coinBalance || 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface OrderSummaryProps {
  product: Product;
  quantity: number;
  size?: string;
  originalPrice: number;
  finalPrice: number;
  discount: number;
  coinsUsed: number;
  hasEnoughCoins: boolean;
  userCoins: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  product,
  quantity,
  size,
  originalPrice,
  finalPrice,
  discount,
  coinsUsed,
  hasEnoughCoins,
  userCoins
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm sticky top-28">
      <h2 className="text-lg font-medium mb-4">Order Summary</h2>
      
      <div className="flex items-start mb-4">
        <div className="h-20 w-20 bg-gray-100 rounded mr-4 flex-shrink-0">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="h-full w-full object-contain" 
          />
        </div>
        <div>
          <h3 className="font-medium">{product.name}</h3>
          {size && <p className="text-sm text-gray-500">Size: {size}</p>}
          <p className="text-sm text-gray-500">Quantity: {quantity}</p>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Price ({quantity} item{quantity > 1 ? 's' : ''})</span>
          <span>₹{originalPrice}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-500">Coin Discount</span>
          <span className="text-green-600">- ₹{discount}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-500">Delivery</span>
          <span className="text-green-600">Free</span>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex justify-between font-medium text-lg">
        <span>Total to Pay</span>
        <span>₹{finalPrice}</span>
      </div>
      
      <div className="bg-yellow-50 p-3 mt-4 rounded-md">
        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center">
            <Coins className="h-4 w-4 text-yellow-600 mr-1" />
            <span className="text-gray-700">Coins to be used</span>
          </span>
          <span className="font-medium text-yellow-800">{coinsUsed}</span>
        </div>
        
        <div className="flex justify-between items-center mt-2 text-sm">
          <span className="text-gray-700">Your Coin Balance</span>
          <span className="font-medium">{userCoins}</span>
        </div>
        
        {!hasEnoughCoins && (
          <div className="mt-2 text-sm text-red-600">
            You need {coinsUsed} Coins, but you only have {userCoins}.
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
