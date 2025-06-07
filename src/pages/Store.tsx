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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
          <div className="w-6 h-6 grid grid-cols-2 gap-1">
            <div className="bg-white rounded-sm"></div>
            <div className="bg-white rounded-sm"></div>
            <div className="bg-white rounded-sm"></div>
            <div className="bg-white rounded-sm"></div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-white/70 text-sm">Fashions</p>
          <p className="text-white font-medium">Hello, Wedel</p>
        </div>
        
        <div className="flex gap-2">
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
            <Search className="h-6 w-6 text-white" />
          </div>
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
            <ShoppingCart className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        <div className="flex gap-6">
          <div className="w-16 flex flex-col gap-6">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                activeCategory === 'all' ? 'bg-white text-purple-600' : 'bg-white/20 text-white'
              }`}
            >
              <div className="w-6 h-6 grid grid-cols-2 gap-0.5">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            
            <button 
              onClick={() => setActiveCategory('dress')}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                activeCategory === 'dress' ? 'bg-white text-purple-600' : 'bg-white/20 text-white'
              }`}
            >
              <span className="text-sm font-bold">D</span>
            </button>
            
            <button 
              onClick={() => setActiveCategory('shoes')}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                activeCategory === 'shoes' ? 'bg-white text-purple-600' : 'bg-white/20 text-white'
              }`}
            >
              <span className="text-sm font-bold">S</span>
            </button>
            
            <button 
              onClick={() => setActiveCategory('jewelry')}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                activeCategory === 'jewelry' ? 'bg-white text-purple-600' : 'bg-white/20 text-white'
              }`}
            >
              <span className="text-sm font-bold">J</span>
            </button>
          </div>

          <div className="flex-1 bg-gradient-to-br from-orange-200 via-orange-100 to-pink-100 rounded-[2rem] p-6">
            {featuredProduct && (
              <div 
                className="bg-gradient-to-br from-orange-300 to-orange-200 rounded-2xl p-6 mb-6 cursor-pointer relative overflow-hidden"
                onClick={() => handleProductClick(featuredProduct)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm mb-1">{featuredProduct.weight}</p>
                    <h2 className="text-white text-2xl font-bold mb-2">{featuredProduct.name}</h2>
                    <div className="bg-orange-400 text-white px-3 py-1 rounded-full text-sm font-medium inline-block">
                      ₹{featuredProduct.discountCoins}
                    </div>
                  </div>
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <img 
                      src={featuredProduct.imageUrl} 
                      alt={featuredProduct.name}
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-gray-800 text-lg font-semibold mb-4">Popular</h3>
              <div className="space-y-3">
                {filteredProducts.slice(1, 4).map((product) => (
                  <div 
                    key={product.id}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-white/90 transition-all"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <span className="text-sm text-gray-500">₹{product.discountCoins}</span>
                    </div>
                    <button 
                      className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart();
                      }}
                    >
                      <Plus className="h-4 w-4" />
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
