import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Coins, Search, Heart, ShoppingCart, ChevronRight, Percent, Plus, ArrowLeft } from 'lucide-react';
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
  const { user } = useAuth();
  const navigate = useNavigate();
  const { convert } = useCoinConversion();
  
  // Sample fashion products matching the design
  const fashionProducts = [
    {
      id: 'dress-1',
      name: 'Elegant Dress',
      description: 'Beautiful elegant dress perfect for special occasions. Made with premium fabric and attention to detail.',
      price: 2500,
      discountCoins: 125,
      imageUrl: 'https://images.unsplash.com/photo-1566479179817-c8c1d31e4e8e',
      category: 'Dress',
      isTrending: true,
      additionalImages: [],
      stock: 15,
      weight: '250g',
      material: 'Premium Cotton'
    },
    {
      id: 'shoes-1',
      name: 'Designer Heels',
      description: 'Stunning designer heels that combine comfort with style. Perfect for both casual and formal wear.',
      price: 3500,
      discountCoins: 175,
      imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
      category: 'Shoes',
      additionalImages: [],
      stock: 20,
      weight: '400g',
      material: 'Genuine Leather'
    },
    {
      id: 'jewelry-1',
      name: 'Diamond Ring',
      description: 'Exquisite diamond ring crafted with precision. A timeless piece that adds elegance to any outfit.',
      price: 15000,
      discountCoins: 750,
      imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e',
      category: 'Jewelry',
      additionalImages: [],
      stock: 8,
      weight: '15g',
      material: '18K Gold'
    },
    {
      id: 'dress-2',
      name: 'Summer Dress',
      description: 'Light and breezy summer dress perfect for warm weather. Comfortable fabric with beautiful patterns.',
      price: 1800,
      discountCoins: 90,
      imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1',
      category: 'Dress',
      additionalImages: [],
      stock: 25,
      weight: '200g',
      material: 'Light Cotton'
    },
    {
      id: 'shoes-2',
      name: 'Casual Sneakers',
      description: 'Comfortable casual sneakers for everyday wear. Durable construction with modern design.',
      price: 2200,
      discountCoins: 110,
      imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
      category: 'Shoes',
      additionalImages: [],
      stock: 30,
      weight: '350g',
      material: 'Canvas & Rubber'
    }
  ];
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Use fashion products instead of API products
        setProducts(fashionProducts);
        setFeaturedProduct(fashionProducts[0]);
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
  };

  const handleBuyNow = (productId: string) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    navigate(`/shop/product/${productId}`);
  };

  const handleAddToCart = (productId: string) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setCartItems(prev => new Set([...prev, productId]));
    toast.success("Added to cart");
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || 
                           product.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Product Detail View
  if (showProductDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => setShowProductDetail(null)}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full mr-4"
            >
              <ArrowLeft className="h-6 w-6 text-white" />
            </button>
            <div className="flex-1" />
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="w-64 h-64 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-2xl">
              <img 
                src={showProductDetail.imageUrl} 
                alt={showProductDetail.name}
                className="w-48 h-48 object-contain"
              />
            </div>
          </div>

          <div className="bg-white rounded-t-[2rem] px-6 py-8 mt-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{showProductDetail.name}</h1>
              <div className="p-2 bg-orange-100 rounded-full">
                <Heart className="h-6 w-6 text-orange-500" />
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-500">{showProductDetail.weight}</span>
              <span className="text-sm text-orange-500 font-medium">{showProductDetail.material}</span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {showProductDetail.description}
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Recommended</h3>
              <div className="space-y-3">
                {filteredProducts.filter(p => p.id !== showProductDetail.id).slice(0, 2).map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <span className="text-sm text-gray-500">₹{product.discountCoins}</span>
                    </div>
                    <button className="p-2 bg-orange-500 text-white rounded-full">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button 
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-14 text-lg font-medium"
                onClick={() => handleAddToCart(showProductDetail.id)}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
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
        {/* Categories Sidebar */}
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

          {/* Products Area */}
          <div className="flex-1 bg-gradient-to-br from-orange-200 via-orange-100 to-pink-100 rounded-[2rem] p-6">
            {/* Featured Product */}
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

            {/* Popular Section */}
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
                        handleAddToCart(product.id);
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

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        message="Please log in to continue shopping"
      />
    </div>
  );
};

export default Store;
