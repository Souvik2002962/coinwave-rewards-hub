import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Coins, Search, Heart, ShoppingCart, ChevronRight, Percent, Plus, ArrowLeft, Star, Minus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";
import useCoinConversion from '@/hooks/useCoinConversion';
import ProductService, { Product } from '@/services/ProductService';
import LoginModal from '@/components/LoginModal';

const Store = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [cartItems, setCartItems] = useState<Set<string>>(new Set());
  const [wishlistItems, setWishlistItems] = useState<Set<string>>(new Set());
  const [showProductDetail, setShowProductDetail] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('#8B5CF6');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { convert } = useCoinConversion();
  
  // Categories for the curved sidebar
  const categories = [
    { id: 'all', name: 'All', icon: '🛍️' },
    { id: 'dress', name: 'Dress', icon: '👗' },
    { id: 'shoes', name: 'Shoes', icon: '👠' },
    { id: 'jewelry', name: 'Jewelry', icon: '💎' },
    { id: 'shirt', name: 'Shirt', icon: '👔' },
    { id: 'bag', name: 'Bag', icon: '👜' },
    { id: 'accessories', name: 'Access', icon: '⌚' },
  ];

  // Fashion products with enhanced details
  const fashionProducts = [
    {
      id: 'dress-1',
      name: 'Summer Dress',
      description: 'Elegant summer dress perfect for warm days. Made with breathable cotton fabric and designed for comfort and style.',
      price: 2500,
      originalPrice: 2999,
      discountCoins: 125,
      imageUrl: 'https://images.unsplash.com/photo-1566479179817-c8c1d31e4e8e',
      category: 'Dress',
      isTrending: true,
      additionalImages: [],
      stock: 15,
      weight: '200g',
      material: 'Light Cotton',
      availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B'],
      rating: 4.8,
      reviews: 124,
      discount: 17
    },
    {
      id: 'shoes-1',
      name: 'Designer Heels',
      description: 'Stunning designer heels that combine comfort with style. Perfect for both casual and formal occasions.',
      price: 3500,
      originalPrice: 4200,
      discountCoins: 175,
      imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
      category: 'Shoes',
      additionalImages: [],
      stock: 20,
      weight: '400g',
      material: 'Genuine Leather',
      availableSizes: ['36', '37', '38', '39', '40', '41'],
      colors: ['#000000', '#8B4513', '#DC143C', '#4B0082'],
      rating: 4.6,
      reviews: 89,
      discount: 17
    },
    {
      id: 'jewelry-1',
      name: 'Diamond Ring',
      description: 'Exquisite diamond ring crafted with precision. A timeless piece that adds elegance to any outfit.',
      price: 15000,
      originalPrice: 18000,
      discountCoins: 750,
      imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e',
      category: 'Jewelry',
      additionalImages: [],
      stock: 8,
      weight: '15g',
      material: '18K Gold',
      availableSizes: ['6', '7', '8', '9', '10'],
      colors: ['#FFD700', '#C0C0C0', '#E6E6FA'],
      rating: 4.9,
      reviews: 45,
      discount: 17
    },
    {
      id: 'shirt-1',
      name: 'Casual Shirt',
      description: 'Comfortable casual shirt perfect for everyday wear. Made with premium cotton blend for durability.',
      price: 1800,
      originalPrice: 2200,
      discountCoins: 90,
      imageUrl: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d',
      category: 'Shirt',
      additionalImages: [],
      stock: 25,
      weight: '180g',
      material: 'Cotton Blend',
      availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['#FFFFFF', '#000000', '#4169E1', '#32CD32'],
      rating: 4.5,
      reviews: 156,
      discount: 18
    },
    {
      id: 'bag-1',
      name: 'Leather Handbag',
      description: 'Premium leather handbag with spacious compartments. Perfect for work and casual outings.',
      price: 4500,
      originalPrice: 5400,
      discountCoins: 225,
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
      category: 'Bag',
      additionalImages: [],
      stock: 12,
      weight: '600g',
      material: 'Premium Leather',
      availableSizes: ['One Size'],
      colors: ['#8B4513', '#000000', '#CD853F', '#A0522D'],
      rating: 4.7,
      reviews: 78,
      discount: 17
    }
  ];
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        setProducts(fashionProducts);
        setFeaturedProduct(fashionProducts[0]);
        if (fashionProducts[0]?.availableSizes) {
          setSelectedSize(fashionProducts[0].availableSizes[0]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const handleProductClick = (product: Product) => {
    setShowProductDetail(product);
    setSelectedSize(product.availableSizes?.[0] || '');
    setSelectedColor(product.colors?.[0] || '#8B5CF6');
    setQuantity(1);
    setIsWishlisted(wishlistItems.has(product.id));
  };

  const handleBuyNow = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    toast.success("Proceeding to checkout");
  };

  const handleAddToCart = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setCartItems(prev => new Set([...prev, showProductDetail?.id || '']));
    toast.success("Added to cart");
  };

  const handleWishlistToggle = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      setWishlistItems(prev => new Set([...prev, showProductDetail?.id || '']));
      toast.success("Added to wishlist");
    } else {
      setWishlistItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(showProductDetail?.id || '');
        return newSet;
      });
      toast.success("Removed from wishlist");
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || 
                           product.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Premium Product Detail View
  if (showProductDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 font-['Inter']">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => setShowProductDetail(null)}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="h-6 w-6 text-white" />
            </button>
            <h1 className="text-white font-medium">Product Details</h1>
            <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Main Product Section */}
          <div className="relative mb-8">
            <div className="w-80 h-80 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl relative">
              <img 
                src={showProductDetail.imageUrl} 
                alt={showProductDetail.name}
                className="w-64 h-64 object-contain"
              />
              {/* Floating Heart Icon */}
              <button 
                onClick={handleWishlistToggle}
                className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                  isWishlisted 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500'
                }`}
              >
                <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Product Info Card */}
          <div className="bg-white rounded-t-[2.5rem] px-6 py-8 mt-8">
            {/* Product Title & Rating */}
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{showProductDetail.name}</h1>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-gray-700 font-medium">{showProductDetail.rating}</span>
                  <span className="ml-1 text-gray-500">({showProductDetail.reviews} reviews)</span>
                </div>
              </div>
              
              {/* Material & Weight Tags */}
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  {showProductDetail.weight}
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  {showProductDetail.material}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Sweet & Stylish
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-gray-900">₹{showProductDetail.price}</span>
                <span className="text-lg text-gray-500 line-through">₹{showProductDetail.originalPrice}</span>
                <span className="px-2 py-1 bg-red-500 text-white rounded-md text-sm font-medium">
                  {showProductDetail.discount}% OFF
                </span>
              </div>
              <div className="flex items-center text-amber-600">
                <Coins className="h-5 w-5 mr-1" />
                <span className="font-medium">+{showProductDetail.discountCoins} coins reward</span>
              </div>
            </div>

            {/* Size Selection */}
            {showProductDetail.availableSizes && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Size</h3>
                <div className="flex gap-2 flex-wrap">
                  {showProductDetail.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl border-2 font-medium transition-all ${
                        selectedSize === size
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 text-gray-700 hover:border-purple-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {showProductDetail.colors && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Color</h3>
                <div className="flex gap-3">
                  {showProductDetail.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-4 transition-all ${
                        selectedColor === color
                          ? 'border-purple-500 scale-110'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="mx-4 text-xl font-semibold min-w-[3rem] text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {showProductDetail.description}
              </p>
            </div>

            {/* You May Also Like */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">You may also like</h3>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {filteredProducts.filter(p => p.id !== showProductDetail.id).slice(0, 3).map((product) => (
                  <div key={product.id} className="flex-shrink-0 w-32">
                    <div className="bg-gray-50 rounded-xl p-3 mb-2">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-20 object-contain"
                      />
                    </div>
                    <h4 className="font-medium text-sm text-gray-900 truncate">{product.name}</h4>
                    <p className="text-purple-600 font-semibold">₹{product.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1 h-14 text-lg font-semibold border-2 border-purple-500 text-purple-600 hover:bg-purple-50"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button 
                onClick={handleBuyNow}
                className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 flex">
      {/* Curved Vertical Sidebar - Fixed */}
      <div className="relative w-16 sm:w-20 flex-shrink-0">
        {/* Main sidebar background - Fixed */}
        <div className="fixed left-0 top-0 h-full w-16 sm:w-20 bg-gradient-to-b from-purple-700 to-purple-900 z-10">
          {/* Category items - Scrollable */}
          <div className="flex flex-col h-full py-4 sm:py-8">
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <div className="space-y-2 sm:space-y-4">
                {categories.map((category, index) => {
                  const isActive = activeCategory === category.id;
                  
                  return (
                    <div key={category.id} className="relative h-16 sm:h-20 flex items-center">
                      {/* Curved bump for active item */}
                      {isActive && (
                        <>
                          {/* SVG curved bump */}
                          <div className="absolute right-0 w-6 sm:w-8 h-full z-20">
                            <svg
                              viewBox="0 0 32 80"
                              className="w-full h-full"
                              style={{
                                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                              }}
                            >
                              <path
                                d="M0,0 Q32,20 32,40 Q32,60 0,80 L32,80 L32,0 Z"
                                fill="rgba(139, 69, 19, 0.1)"
                                className="drop-shadow-lg"
                              />
                            </svg>
                          </div>
                          
                          {/* White dot indicator */}
                          <div 
                            className="absolute right-2 sm:right-4 w-2 sm:w-3 h-2 sm:h-3 bg-white rounded-full z-30 shadow-lg"
                            style={{
                              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                          />
                        </>
                      )}
                      
                      {/* Category button */}
                      <button
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full h-full flex flex-col items-center justify-center transition-all duration-300 relative z-10 px-1 ${
                          isActive 
                            ? 'text-white' 
                            : 'text-purple-200 hover:text-white'
                        }`}
                      >
                        <span className="text-sm sm:text-lg mb-1">{category.icon}</span>
                        <span 
                          className="text-[8px] sm:text-xs font-medium transform -rotate-90 whitespace-nowrap"
                          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                        >
                          {category.name}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative min-w-0">
        {/* Header - Responsive with Back Button */}
        <div className="flex items-center justify-between p-3 sm:p-4 pt-8 sm:pt-12">
          <button 
            onClick={() => navigate('/')}
            className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </button>
          
          <div className="text-center flex-1 mx-2 sm:mx-4">
            <p className="text-white/70 text-xs sm:text-sm">Fashions</p>
            <p className="text-white font-medium text-sm sm:text-base">Hello, Wedel</p>
          </div>
          
          <div className="flex gap-1 sm:gap-2">
            <div className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-lg">
              <Search className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-lg">
              <ShoppingCart className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Main Content - Scrollable */}
        <div className="px-3 sm:px-4 py-4 sm:py-6 overflow-y-auto">
          <div className="bg-gradient-to-br from-orange-200 via-orange-100 to-pink-100 rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6">
            {featuredProduct && (
              <div 
                className="bg-gradient-to-br from-orange-300 to-orange-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 cursor-pointer relative overflow-hidden"
                onClick={() => handleProductClick(featuredProduct)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-xs sm:text-sm mb-1">{featuredProduct.weight}</p>
                    <h2 className="text-white text-lg sm:text-2xl font-bold mb-2">{featuredProduct.name}</h2>
                    <div className="bg-orange-400 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium inline-block">
                      ₹{featuredProduct.discountCoins}
                    </div>
                  </div>
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <img 
                      src={featuredProduct.imageUrl} 
                      alt={featuredProduct.name}
                      className="w-12 h-12 sm:w-20 sm:h-20 object-contain"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mb-4 sm:mb-6">
              <h3 className="text-gray-800 text-base sm:text-lg font-semibold mb-3 sm:mb-4">Popular</h3>
              <div className="space-y-2 sm:space-y-3">
                {filteredProducts.slice(1, 4).map((product) => (
                  <div 
                    key={product.id}
                    className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 cursor-pointer hover:bg-white/90 transition-all"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate">{product.name}</h4>
                      <span className="text-xs sm:text-sm text-gray-500">₹{product.discountCoins}</span>
                    </div>
                    <button 
                      className="p-1.5 sm:p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart();
                      }}
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        message="Please log in to continue shopping"
      />
    </div>
  );
};

export default Store;
