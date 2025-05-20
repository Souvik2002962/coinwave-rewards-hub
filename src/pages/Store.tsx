
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Coins, Sliders, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Store = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample product data
  const electronics = [
    {
      id: 'elec1',
      name: 'Wireless Headphones',
      description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and immersive sound quality.',
      price: 199.99,
      discountCoins: 100,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      category: 'Electronics',
      isTrending: true,
      additionalImages: [
        'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b',
        'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb',
      ]
    },
    {
      id: 'elec2',
      name: 'Smart Watch',
      description: 'Track your fitness, receive notifications, and more with this sleek smart watch.',
      price: 249.99,
      discountCoins: 150,
      imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1',
      category: 'Electronics',
      additionalImages: []
    },
    {
      id: 'elec3',
      name: 'Bluetooth Speaker',
      description: 'Portable speaker with 360° sound and 20-hour battery life.',
      price: 79.99,
      discountCoins: 40,
      imageUrl: 'https://images.unsplash.com/photo-1589003077984-894e133dabab',
      category: 'Electronics',
      additionalImages: []
    },
    {
      id: 'elec4',
      name: 'Wireless Earbuds',
      description: 'True wireless earbuds with active noise cancellation and touch controls.',
      price: 129.99,
      discountCoins: 65,
      imageUrl: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37',
      category: 'Electronics',
      isTrending: true,
      additionalImages: []
    },
    {
      id: 'elec5',
      name: 'Smart Home Hub',
      description: 'Control your entire home with voice commands and automated routines.',
      price: 119.99,
      discountCoins: 60,
      imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd',
      category: 'Electronics',
      additionalImages: []
    },
    {
      id: 'elec6',
      name: 'Portable Power Bank',
      description: '20,000mAh capacity with fast charging and dual USB ports.',
      price: 49.99,
      discountCoins: 25,
      imageUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5',
      category: 'Electronics',
      additionalImages: []
    },
  ];
  
  const fashion = [
    {
      id: 'fash1',
      name: 'Designer Sneakers',
      description: 'Premium designer sneakers made with sustainable materials and cutting-edge design.',
      price: 129.99,
      discountCoins: 50,
      imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
      category: 'Fashion',
      isTrending: true,
      additionalImages: []
    },
    {
      id: 'fash2',
      name: 'Denim Jacket',
      description: 'Classic denim jacket with modern details and perfect fit.',
      price: 89.99,
      discountCoins: 45,
      imageUrl: 'https://images.unsplash.com/photo-1601333144130-8cbb312386b6',
      category: 'Fashion',
      additionalImages: []
    },
    {
      id: 'fash3',
      name: 'Aviator Sunglasses',
      description: 'Timeless aviator design with polarized lenses and UV protection.',
      price: 149.99,
      discountCoins: 75,
      imageUrl: 'https://images.unsplash.com/photo-1565345871554-28904fca0231',
      category: 'Fashion',
      isTrending: true,
      additionalImages: []
    },
    {
      id: 'fash4',
      name: 'Leather Wallet',
      description: 'Handcrafted genuine leather wallet with RFID protection.',
      price: 59.99,
      discountCoins: 30,
      imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93',
      category: 'Fashion',
      additionalImages: []
    },
  ];
  
  const jewelry = [
    {
      id: 'jewel1',
      name: 'Silver Pendant Necklace',
      description: 'Elegant sterling silver pendant with minimalist design.',
      price: 79.99,
      discountCoins: 40,
      imageUrl: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e',
      category: 'Jewelry',
      additionalImages: []
    },
    {
      id: 'jewel2',
      name: 'Gold Hoop Earrings',
      description: '14K gold-plated hoops with hypoallergenic posts.',
      price: 59.99,
      discountCoins: 30,
      imageUrl: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52',
      category: 'Jewelry',
      isTrending: true,
      additionalImages: []
    },
    {
      id: 'jewel3',
      name: 'Beaded Bracelet Set',
      description: 'Set of 3 stackable bracelets with natural stone beads.',
      price: 49.99,
      discountCoins: 25,
      imageUrl: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d',
      category: 'Jewelry',
      additionalImages: []
    },
  ];
  
  return (
    <div className="min-h-screen bg-cyber-dark">
      <NavBar />
      
      <div className="container mx-auto px-4 pb-16 pt-28">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Product Store</h1>
            <p className="text-gray-400">Redeem your coins for amazing products with exclusive discounts</p>
          </div>
          <div className="neon-border px-4 py-2 rounded-lg mt-4 sm:mt-0 flex items-center">
            <Coins className="h-5 w-5 text-yellow-400 mr-2" />
            <div className="text-lg font-bold text-white">1,250 Available</div>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search products..." 
              className="pl-10 bg-cyber-dark border-gray-700 text-white placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <Select>
              <SelectTrigger className="w-[180px] bg-cyber-dark border-gray-700 text-white">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="bg-cyber-dark border-neon-purple">
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="discount">Highest Coin Discount</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-700">
              <Sliders className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
        
        {/* Products Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full max-w-3xl mx-auto mb-8 bg-cyber-dark">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="electronics">Electronics</TabsTrigger>
            <TabsTrigger value="fashion">Fashion</TabsTrigger>
            <TabsTrigger value="jewelry">Jewelry</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="deals">Best Deals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...electronics, ...fashion, ...jewelry].map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="electronics">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {electronics.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="fashion">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {fashion.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="jewelry">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {jewelry.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="trending">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...electronics, ...fashion, ...jewelry]
                .filter(product => product.isTrending)
                .map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="deals">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...electronics, ...fashion, ...jewelry]
                .sort((a, b) => b.discountCoins - a.discountCoins)
                .slice(0, 8)
                .map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Store;
