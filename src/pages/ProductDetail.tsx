
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChevronLeft, 
  Coins, 
  Minus, 
  Plus, 
  Heart, 
  Share2, 
  ShoppingCart,
  Shield, 
  Truck, 
  RotateCcw 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";
import ProductService, { Product } from '@/services/ProductService';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import LoginModal from '@/components/LoginModal';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const productData = await ProductService.getProductById(id);
        if (productData) {
          setProduct(productData);
          setSelectedImage(productData.imageUrl);
          if (productData.availableSizes && productData.availableSizes.length > 0) {
            setSelectedSize(productData.availableSizes[0]);
          }
        } else {
          toast.error("Product not found");
          navigate('/store');
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product details");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, navigate]);
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && (!product?.stock || newQuantity <= product.stock)) {
      setQuantity(newQuantity);
    }
  };
  
  const handleBuyNow = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    
    if (!selectedSize && product?.availableSizes?.length) {
      toast.error("Please select a size");
      return;
    }
    
    navigate(`/shop/checkout/${product?.id}`, {
      state: {
        product,
        quantity,
        size: selectedSize
      }
    });
  };

  const handleAddToCart = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    
    if (!selectedSize && product?.availableSizes?.length) {
      toast.error("Please select a size");
      return;
    }
    
    toast.success("Added to cart");
  };
  
  const calculatePrice = () => {
    if (!product) return { original: 0, final: 0, discount: 0 };
    
    const original = product.price * quantity;
    const coinDiscount = (product.discountCoins / 100) * quantity;
    const final = original - coinDiscount;
    
    return {
      original,
      final,
      discount: coinDiscount
    };
  };
  
  const { original, final, discount } = calculatePrice();
  
  const hasEnoughCoins = user && product 
    ? user.coinBalance >= (product.discountCoins * quantity) 
    : false;
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <NavBar />
        <div className="container mx-auto px-4 pt-28 pb-16">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Image skeleton */}
            <div className="md:w-1/2">
              <Skeleton className="h-80 w-full rounded-lg" />
              <div className="flex gap-2 mt-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-20 w-20 rounded-md" />
                ))}
              </div>
            </div>
            
            {/* Content skeleton */}
            <div className="md:w-1/2">
              <Skeleton className="h-10 w-3/4 rounded-md mb-4" />
              <Skeleton className="h-6 w-1/2 rounded-md mb-6" />
              <Skeleton className="h-8 w-1/3 rounded-md mb-4" />
              <Skeleton className="h-24 w-full rounded-md mb-6" />
              <Skeleton className="h-12 w-full rounded-md mb-4" />
              <Skeleton className="h-12 w-full rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <NavBar />
        <div className="container mx-auto px-4 pt-28 pb-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/store')}>
            Return to Store
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      
      <div className="container mx-auto px-4 pt-28 pb-16">
        {/* Back button */}
        <button 
          onClick={() => navigate('/store')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Products
        </button>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product images */}
          <div className="md:w-1/2">
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-80 object-contain mx-auto"
              />
            </div>
            
            <div className="flex gap-3 overflow-x-auto hide-scrollbar">
              <div 
                className={`h-20 w-20 p-2 rounded-md cursor-pointer ${
                  selectedImage === product.imageUrl ? 'border-2 border-black' : 'border border-gray-200'
                }`}
                onClick={() => setSelectedImage(product.imageUrl)}
              >
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="h-full w-full object-contain"
                />
              </div>
              
              {product.additionalImages.map((img, index) => (
                <div 
                  key={index}
                  className={`h-20 w-20 p-2 rounded-md cursor-pointer ${
                    selectedImage === img ? 'border-2 border-black' : 'border border-gray-200'
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} ${index + 1}`} 
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product details */}
          <div className="md:w-1/2">
            <div className="flex justify-between">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
            <p className="text-gray-500 mb-4">{product.category}</p>
            
            {/* Price section */}
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-900 mr-2">₹{final}</span>
                {discount > 0 && (
                  <span className="text-sm text-gray-500 line-through">₹{original}</span>
                )}
              </div>
              
              {discount > 0 && (
                <div className="flex items-center mt-1 text-sm">
                  <span className="text-gray-700">You'll pay</span> 
                  <span className="font-bold mx-1 text-green-600">₹{final}</span>
                  <span className="text-gray-700">and use</span>
                  <span className="font-bold mx-1 text-amber-600">{product.discountCoins * quantity} Coins</span>
                </div>
              )}
              
              {user && (
                <div className="bg-yellow-50 px-3 py-2 rounded-md mt-2 flex items-center">
                  <Coins className="h-4 w-4 text-yellow-600 mr-1" />
                  <span className="text-sm text-gray-700">
                    You have <span className="font-bold">{user.coinBalance} Coins</span>
                  </span>
                </div>
              )}
              
              {!hasEnoughCoins && user && (
                <div className="bg-red-50 px-3 py-2 rounded-md mt-2 text-sm text-red-600">
                  You need {product.discountCoins * quantity} Coins, but you only have {user.coinBalance}.
                  <Button variant="link" size="sm" className="text-red-600 p-0 ml-1"
                    onClick={() => navigate('/earn')}>
                    Earn More Coins
                  </Button>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            {/* Size selection */}
            {product.availableSizes && product.availableSizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 rounded-md border ${
                        selectedSize === size 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center">
                <button 
                  className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 mx-2 border border-gray-300 rounded-md min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button 
                  className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
                  onClick={() => handleQuantityChange(1)}
                  disabled={product.stock !== undefined && quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </button>
                
                {product.stock !== undefined && (
                  <span className="ml-4 text-sm text-gray-500">
                    {product.stock} available
                  </span>
                )}
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col space-y-3">
              <Button 
                className="bg-black hover:bg-gray-800 text-white"
                size="lg"
                onClick={handleBuyNow}
                disabled={!hasEnoughCoins && !!user}
              >
                Continue to Buy
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
            
            {/* Features */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">Free Shipping</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">Authentic Products</span>
              </div>
              <div className="flex items-center">
                <RotateCcw className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full bg-white border-b border-gray-200">
              <TabsTrigger value="description" className="text-gray-800">Description</TabsTrigger>
              <TabsTrigger value="specifications" className="text-gray-800">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" className="text-gray-800">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="pt-6 pb-4">
              <div className="prose max-w-none">
                <p className="text-gray-700">{product.description}</p>
                <p className="text-gray-700 mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <ul className="list-disc pl-5 mt-4 text-gray-700">
                  <li>High-quality materials</li>
                  <li>Premium construction</li>
                  <li>Designed for comfort and style</li>
                  <li>Durable and long-lasting</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="pt-6 pb-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Product Details</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-500">Brand</span>
                        <span className="text-gray-900">{product.name.split(' ')[0]}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-500">Model</span>
                        <span className="text-gray-900">{product.name.split(' ').slice(1).join(' ')}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-500">Category</span>
                        <span className="text-gray-900">{product.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">Dimensions</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-500">Weight</span>
                        <span className="text-gray-900">300g</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-500">Height</span>
                        <span className="text-gray-900">10 cm</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-500">Width</span>
                        <span className="text-gray-900">20 cm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-6 pb-4">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-lg text-gray-900">Customer Reviews</h4>
                  <Button variant="outline" className="border-gray-300">Write a Review</Button>
                </div>
                
                <div className="flex items-center">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-700">4.8 out of 5</span>
                  <span className="ml-2 text-gray-500">(24 reviews)</span>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="py-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-2">
                            <span className="text-sm font-medium">{['JD', 'SM', 'AK'][i]}</span>
                          </div>
                          <span className="text-gray-800 font-medium">{['John D.', 'Sarah M.', 'Alex K.'][i]}</span>
                        </div>
                        <span className="text-sm text-gray-500">{['2 days ago', '1 week ago', '2 weeks ago'][i]}</span>
                      </div>
                      
                      <div className="flex items-center mb-2">
                        <div className="flex items-center space-x-1 text-amber-400">
                          {[...Array(5)].map((_, j) => (
                            <svg key={j} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={j < [5, 4, 5][i] ? "currentColor" : "#e5e7eb"} className="w-4 h-4">
                              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-gray-700">
                        {[
                          "Excellent quality and very comfortable. Worth every penny!",
                          "Good product but took longer than expected to be delivered.",
                          "Amazing design and great build quality. Highly recommend!"
                        ][i]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        message="Please log in to continue shopping"
      />
    </div>
  );
};

export default ProductDetail;
