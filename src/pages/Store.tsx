import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Coins, Search, Heart, ShoppingCart, ChevronRight, Percent } from 'lucide-react';
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
  const { user } = useAuth();
  const navigate = useNavigate();
  const { convert } = useCoinConversion();
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const allProducts = await ProductService.getAllProducts();
        setProducts(allProducts);
        
        // Set featured product (first trending product or first product)
        const trending = allProducts.find(p => p.isTrending);
        setFeaturedProduct(trending || allProducts[0]);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/shop/product/${productId}`);
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

  const handleAddToWishlist = (productId: string) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setWishlistItems(prev => new Set([...prev, productId]));
    toast.success("Added to wishlist");
  };

  // Display featured product banner
  const FeaturedProductBanner = () => {
    if (!featuredProduct) return null;
    
    return (
      <div className="relative w-full bg-gradient-to-r from-teal-50 to-teal-100 rounded-2xl overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row">
          <div className="p-6 md:p-8 flex flex-col justify-center md:w-1/2">
            <div className="mb-2 text-sm text-gray-500">New Release</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{featuredProduct.name}</h2>
            <p className="text-sm text-gray-600 mb-4">{featuredProduct.description}</p>
            <Button 
              className="bg-black hover:bg-gray-800 text-white rounded-full w-32"
              onClick={() => handleBuyNow(featuredProduct.id)}
            >
              Shop Now
            </Button>
          </div>
          <div className="md:w-1/2 relative">
            <img 
              src={featuredProduct.imageUrl} 
              alt={featuredProduct.name} 
              className="w-full h-64 md:h-80 object-contain"
            />
          </div>
        </div>
      </div>
    );
  };

  // Category pill buttons
  const CategoryPills = () => (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-6 hide-scrollbar">
      <button 
        className={`px-4 py-2 rounded-full text-sm font-medium ${
          activeCategory === 'all' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'
        }`}
        onClick={() => handleCategorySelect('all')}
      >
        Popular
      </button>
      <button 
        className={`px-4 py-2 rounded-full text-sm font-medium ${
          activeCategory === 'men' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'
        }`}
        onClick={() => handleCategorySelect('men')}
      >
        Men
      </button>
      <button 
        className={`px-4 py-2 rounded-full text-sm font-medium ${
          activeCategory === 'women' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'
        }`}
        onClick={() => handleCategorySelect('women')}
      >
        Women
      </button>
      <button 
        className={`px-4 py-2 rounded-full text-sm font-medium ${
          activeCategory === 'kids' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'
        }`}
        onClick={() => handleCategorySelect('kids')}
      >
        Kids
      </button>
      <button 
        className={`px-4 py-2 rounded-full text-sm font-medium ${
          activeCategory === 'collection' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'
        }`}
        onClick={() => handleCategorySelect('collection')}
      >
        Collection
      </button>
      <button 
        className={`px-4 py-2 rounded-full text-sm font-medium ${
          activeCategory === 'offers' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'
        }`}
        onClick={() => handleCategorySelect('offers')}
      >
        <Percent className="w-4 h-4 mr-1" />
        Special Offers
      </button>
    </div>
  );
  
  // Product card component
  const ProductCard = ({ product }: { product: Product }) => {
    const isInCart = cartItems.has(product.id);
    const isInWishlist = wishlistItems.has(product.id);
    const hasOffer = product.offerPercentage && product.offerPercentage > 0;
    const offerPrice = hasOffer ? product.price - (product.price * product.offerPercentage / 100) : product.price;
    
    return (
      <Card 
        className={`group relative bg-white/90 backdrop-blur-sm border-none rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${
          isInCart || isInWishlist ? 'ring-2 ring-neon-purple shadow-neon' : ''
        }`}
        onClick={() => handleProductClick(product.id)}
      >
        <div className="absolute top-2 right-2 z-10">
          <button 
            className={`p-2 rounded-full transition-all ${
              isInWishlist 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-white/80 hover:bg-white text-gray-800'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToWishlist(product.id);
            }}
          >
            <Heart className="h-4 w-4" fill={isInWishlist ? "currentColor" : "none"} />
          </button>
        </div>
        
        {hasOffer && (
          <div className="absolute top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {product.offerPercentage}% OFF
          </div>
        )}
        
        <CardContent className="p-0">
          <div className={`bg-gray-50 rounded-t-2xl p-4 ${
            isInCart || isInWishlist ? 'ring-2 ring-neon-purple' : ''
          }`}>
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-48 object-contain mx-auto transition-transform group-hover:scale-105 duration-300 rounded-lg"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-gray-900">{product.name}</h3>
            <p className="text-xs text-gray-500">{product.category}</p>
            <div className="mt-2 flex justify-between items-center">
              <div className="font-semibold text-gray-900 flex items-center flex-col">
                {hasOffer ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-lg line-through text-gray-400">₹{product.price}</span>
                      <span className="text-lg text-green-600">₹{Math.round(offerPrice)}</span>
                    </div>
                    {product.discountCoins > 0 && (
                      <span className="text-xs text-gray-500">+ {product.discountCoins} coins</span>
                    )}
                  </>
                ) : (
                  <>
                    <span className="text-lg">₹{product.price}</span>
                    {product.discountCoins > 0 && (
                      <span className="text-xs text-gray-500">+ {product.discountCoins} coins</span>
                    )}
                  </>
                )}
              </div>
              {(hasOffer || product.discountCoins > 0) && (
                <div className="flex items-center text-xs bg-yellow-100 rounded-full px-2 py-1">
                  <span className="text-yellow-800">
                    {hasOffer ? `Save ₹${Math.round(product.price - offerPrice)}` : `Save ₹${product.discountCoins / 100}`}
                  </span>
                  <div className="coin w-3 h-3 ml-0.5">💰</div>
                </div>
              )}
            </div>
            <div className="mt-3 flex gap-2">
              <Button 
                size="sm"
                className="bg-black hover:bg-gray-800 text-white flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBuyNow(product.id);
                }}
              >
                Buy Now
              </Button>
              <Button 
                size="sm"
                variant={isInCart ? "default" : "outline"}
                className={`flex-1 ${
                  isInCart 
                    ? 'bg-neon-purple text-white border-neon-purple' 
                    : 'border-gray-300'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product.id);
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                {isInCart ? 'In Cart' : 'Add to Cart'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || 
                           activeCategory === 'offers' && (product.offerPercentage || product.discountCoins > 0) ||
                           product.category.toLowerCase().includes(activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      
      <div className="container mx-auto px-4 pb-16 pt-28">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Store</h1>
            <p className="text-gray-500">Redeem your coins for amazing products with exclusive discounts</p>
          </div>
          {user && (
            <div className="bg-yellow-100 px-4 py-2 rounded-lg mt-4 sm:mt-0 flex items-center">
              <Coins className="h-5 w-5 text-yellow-600 mr-2" />
              <div className="font-bold text-yellow-800">{user.coinBalance} Available</div>
            </div>
          )}
        </div>
        
        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input 
            placeholder="Search products..." 
            className="pl-10 bg-gray-100/80 backdrop-blur-sm border-none rounded-full text-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Featured Product Banner */}
        <FeaturedProductBanner />
        
        {/* Category Pills */}
        <CategoryPills />
        
        {/* Special Offers Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Percent className="w-5 h-5 mr-2 text-red-500" />
            Special Offers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.filter(p => p.offerPercentage && p.offerPercentage > 0).slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        
        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="bg-white/90 backdrop-blur-sm border-none rounded-2xl shadow-sm">
                <CardContent className="p-0">
                  <div className="bg-gray-100 rounded-t-2xl h-56 animate-pulse"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        {filteredProducts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found matching your criteria.</p>
          </div>
        )}
        
        {/* Featured Categories Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-orange-50 rounded-full aspect-square p-6 text-center cursor-pointer hover:bg-orange-100 transition-colors flex flex-col items-center justify-center"
                 onClick={() => handleCategorySelect('shoes')}>
              <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="https://images.unsplash.com/photo-1560769629-975ec94e6a86" alt="Shoes" className="h-8 w-8 object-contain" />
              </div>
              <h3 className="font-medium text-gray-900">Shoes</h3>
              <p className="text-xs text-gray-500 mt-1">124 Products</p>
            </div>
            <div className="bg-blue-50 rounded-full aspect-square p-6 text-center cursor-pointer hover:bg-blue-100 transition-colors flex flex-col items-center justify-center"
                 onClick={() => handleCategorySelect('clothing')}>
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f" alt="Clothing" className="h-8 w-8 object-contain" />
              </div>
              <h3 className="font-medium text-gray-900">Clothing</h3>
              <p className="text-xs text-gray-500 mt-1">86 Products</p>
            </div>
            <div className="bg-green-50 rounded-full aspect-square p-6 text-center cursor-pointer hover:bg-green-100 transition-colors flex flex-col items-center justify-center"
                 onClick={() => handleCategorySelect('electronics')}>
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="https://images.unsplash.com/photo-1600003263516-530da009e46d" alt="Electronics" className="h-8 w-8 object-contain" />
              </div>
              <h3 className="font-medium text-gray-900">Electronics</h3>
              <p className="text-xs text-gray-500 mt-1">92 Products</p>
            </div>
            <div className="bg-purple-50 rounded-full aspect-square p-6 text-center cursor-pointer hover:bg-purple-100 transition-colors flex flex-col items-center justify-center"
                 onClick={() => handleCategorySelect('accessories')}>
              <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="https://images.unsplash.com/photo-1619532550501-933caec7df7a" alt="Accessories" className="h-8 w-8 object-contain" />
              </div>
              <h3 className="font-medium text-gray-900">Accessories</h3>
              <p className="text-xs text-gray-500 mt-1">76 Products</p>
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
