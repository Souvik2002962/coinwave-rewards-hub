import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Coins, Search, Heart, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Store = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [featuredProduct, setFeaturedProduct] = useState({
    id: 'elec1',
    name: 'Nike Air Max 270',
    description: 'Nike\'s first lifestyle Air Max brings you style, comfort and big attitude in the Nike Air Max 270.',
    price: 160,
    discountCoins: 50,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    category: 'Shoes',
    isTrending: true,
    additionalImages: [
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329'
    ]
  });
  
  // Sample product data
  const electronics = [
    {
      id: 'elec1',
      name: 'Nike Air Max 270',
      description: 'Nike\'s first lifestyle Air Max brings you style, comfort and big attitude in the Nike Air Max 270.',
      price: 160,
      discountCoins: 50,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      category: 'Shoes',
      isTrending: true,
      additionalImages: [
        'https://images.unsplash.com/photo-1600269452121-4f2416e55c28',
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
        'https://images.unsplash.com/photo-1605348532760-6753d2c43329'
      ]
    },
    {
      id: 'elec2',
      name: 'Nike Air Force 1',
      description: 'The iconic Air Force 1 with premium materials and classic style.',
      price: 110,
      discountCoins: 30,
      imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
      category: 'Shoes',
      additionalImages: []
    },
    {
      id: 'elec3',
      name: 'Adidas Ultraboost',
      description: 'Energy-returning cushioning and a sock-like fit for all-day comfort.',
      price: 180,
      discountCoins: 60,
      imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570',
      category: 'Shoes',
      isTrending: true,
      additionalImages: []
    },
    {
      id: 'elec4',
      name: 'Puma RS-X',
      description: 'Retro-inspired design with bold colors and comfortable cushioning.',
      price: 120,
      discountCoins: 40,
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
      category: 'Shoes',
      additionalImages: []
    },
    {
      id: 'elec5',
      name: 'Reebok Classic Leather',
      description: 'Timeless style with a soft leather upper and comfortable fit.',
      price: 90,
      discountCoins: 25,
      imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86',
      category: 'Shoes',
      additionalImages: []
    },
    {
      id: 'elec6',
      name: 'New Balance 574',
      description: 'Iconic silhouette with a comfortable fit and versatile style.',
      price: 100,
      discountCoins: 35,
      imageUrl: 'https://images.unsplash.com/photo-1588361503371-84635c59a7ca',
      category: 'Shoes',
      additionalImages: []
    },
  ];
  
  const fashion = [
    {
      id: 'fash1',
      name: 'Leather Jacket',
      description: 'Classic leather jacket with a modern fit and stylish details.',
      price: 250,
      discountCoins: 80,
      imageUrl: 'https://images.unsplash.com/photo-1585470117024-1c4434b1413c',
      category: 'Clothing',
      isTrending: true,
      additionalImages: []
    },
    {
      id: 'fash2',
      name: 'Denim Jeans',
      description: 'Comfortable denim jeans with a classic fit and durable construction.',
      price: 80,
      discountCoins: 20,
      imageUrl: 'https://images.unsplash.com/photo-1562157873-64b5b2266ef7',
      category: 'Clothing',
      additionalImages: []
    },
    {
      id: 'fash3',
      name: 'Cotton T-Shirt',
      description: 'Soft cotton t-shirt with a comfortable fit and versatile style.',
      price: 30,
      discountCoins: 10,
      imageUrl: 'https://images.unsplash.com/photo-1576566526864-8ebc8039704b',
      category: 'Clothing',
      additionalImages: []
    },
    {
      id: 'fash4',
      name: 'Wool Sweater',
      description: 'Warm wool sweater with a comfortable fit and stylish design.',
      price: 120,
      discountCoins: 40,
      imageUrl: 'https://images.unsplash.com/photo-1547959245-ca2e9395153c',
      category: 'Clothing',
      additionalImages: []
    },
  ];
  
  const jewelry = [
    {
      id: 'jewel1',
      name: 'Silver Necklace',
      description: 'Elegant silver necklace with a delicate design and timeless style.',
      price: 150,
      discountCoins: 50,
      imageUrl: 'https://images.unsplash.com/photo-1585351317493-a1b60b44c11a',
      category: 'Accessories',
      additionalImages: []
    },
    {
      id: 'jewel2',
      name: 'Gold Earrings',
      description: 'Stylish gold earrings with a modern design and comfortable fit.',
      price: 200,
      discountCoins: 70,
      imageUrl: 'https://images.unsplash.com/photo-1572630247788-9947c41eb01c',
      category: 'Accessories',
      isTrending: true,
      additionalImages: []
    },
    {
      id: 'jewel3',
      name: 'Leather Belt',
      description: 'Durable leather belt with a classic design and stylish buckle.',
      price: 60,
      discountCoins: 20,
      imageUrl: 'https://images.unsplash.com/photo-1581235720704-01687552a84f',
      category: 'Accessories',
      additionalImages: []
    },
  ];
  
  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
  };

  // Display featured product banner
  const FeaturedProductBanner = () => (
    <div className="relative w-full bg-gradient-to-r from-teal-50 to-teal-100 rounded-2xl overflow-hidden mb-8">
      <div className="flex flex-col md:flex-row">
        <div className="p-6 md:p-8 flex flex-col justify-center md:w-1/2">
          <div className="mb-2 text-sm text-gray-500">New Release</div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{featuredProduct.name}</h2>
          <p className="text-sm text-gray-600 mb-4">{featuredProduct.description}</p>
          <Button className="bg-black hover:bg-gray-800 text-white rounded-full w-32">
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

  // Category pill buttons that look like the reference
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
    </div>
  );
  
  // New product card similar to reference design
  const ModernProductCard = ({ product }: { product: any }) => (
    <Card className="group relative bg-white border-none rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
      <div className="absolute top-2 right-2 z-10">
        <button className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-800">
          <Heart className="h-4 w-4" />
        </button>
      </div>
      <CardContent className="p-0">
        <div className="bg-gray-50 rounded-t-2xl p-4">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-48 object-contain mx-auto transition-transform group-hover:scale-105 duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900">{product.name}</h3>
          <p className="text-xs text-gray-500">{product.category}</p>
          <div className="mt-2 flex justify-between items-center">
            <div className="text-lg font-semibold text-gray-900">
              ${product.price}
            </div>
            {product.discountCoins > 0 && (
              <div className="flex items-center text-xs bg-yellow-100 rounded-full px-2 py-1">
                <span className="text-yellow-800">-{product.discountCoins}</span>
                <div className="coin w-3 h-3 ml-0.5">💰</div>
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 rounded-full bg-black text-white">
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      
      <div className="container mx-auto px-4 pb-16 pt-28">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Store</h1>
            <p className="text-gray-500">Redeem your coins for amazing products with exclusive discounts</p>
          </div>
          <div className="bg-yellow-100 px-4 py-2 rounded-lg mt-4 sm:mt-0 flex items-center">
            <Coins className="h-5 w-5 text-yellow-600 mr-2" />
            <div className="font-bold text-yellow-800">1,250 Available</div>
          </div>
        </div>
        
        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input 
            placeholder="Search products..." 
            className="pl-10 bg-gray-100 border-none rounded-full text-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Featured Product Banner */}
        <FeaturedProductBanner />
        
        {/* Category Pills */}
        <CategoryPills />
        
        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...electronics, ...fashion].slice(0, 8).map((product) => (
            <ModernProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="border-gray-300 text-gray-800 hover:bg-gray-100">
            Show More Products
          </Button>
        </div>
        
        {/* Featured Categories Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-orange-50 rounded-2xl p-6 text-center">
              <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="https://images.unsplash.com/photo-1560769629-975ec94e6a86" alt="Shoes" className="h-8 w-8 object-contain" />
              </div>
              <h3 className="font-medium text-gray-900">Shoes</h3>
              <p className="text-xs text-gray-500 mt-1">124 Products</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-6 text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f" alt="Clothing" className="h-8 w-8 object-contain" />
              </div>
              <h3 className="font-medium text-gray-900">Clothing</h3>
              <p className="text-xs text-gray-500 mt-1">86 Products</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-6 text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="https://images.unsplash.com/photo-1600003263516-530da009e46d" alt="Electronics" className="h-8 w-8 object-contain" />
              </div>
              <h3 className="font-medium text-gray-900">Electronics</h3>
              <p className="text-xs text-gray-500 mt-1">92 Products</p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-6 text-center">
              <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="https://images.unsplash.com/photo-1619532550501-933caec7df7a" alt="Accessories" className="h-8 w-8 object-contain" />
              </div>
              <h3 className="font-medium text-gray-900">Accessories</h3>
              <p className="text-xs text-gray-500 mt-1">76 Products</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
