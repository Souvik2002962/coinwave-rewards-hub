
import React, { useState } from 'react';
import { ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  discountCoins: number;
  imageUrl: string;
  category: string;
  isTrending?: boolean;
  additionalImages?: string[];
}

const ProductCard = ({
  id,
  name,
  description,
  price,
  discountCoins,
  imageUrl,
  category,
  isTrending = false,
  additionalImages = []
}: ProductCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 });
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  
  // Available colors (for demo)
  const colors = [
    { name: 'Black', class: 'bg-black' },
    { name: 'White', class: 'bg-white border border-gray-300' },
    { name: 'Red', class: 'bg-red-500' },
    { name: 'Blue', class: 'bg-blue-400' },
  ];
  
  // Available sizes (for demo)
  const sizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8'];
  
  // Calculate the final price after coin discount
  const finalPrice = Math.max(0, price - discountCoins);
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Calculate rotation values based on mouse position
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 10; // -5 to 5 degrees
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -10; // -5 to 5 degrees
    
    setCardRotation({ x, y });
  };
  
  const resetRotation = () => {
    setCardRotation({ x: 0, y: 0 });
    setIsHovering(false);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div 
            className="neon-card tilting-card w-full max-w-xs mx-auto cursor-pointer"
            style={{ 
              transform: `perspective(1000px) rotateX(${cardRotation.x}deg) rotateY(${cardRotation.y}deg)`,
              transformStyle: 'preserve-3d'
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={resetRotation}
          >
            <div className="relative overflow-hidden rounded-t-lg h-56">
              <img 
                src={imageUrl} 
                alt={name} 
                className="w-full h-full object-cover transition-transform duration-300"
                style={{ transform: isHovering ? 'scale(1.05)' : 'scale(1)' }}
              />
              
              {isTrending && (
                <div className="absolute top-2 left-0 bg-cyber-orange px-3 py-1 text-xs font-bold text-white shadow-lg rounded-r-full">
                  TRENDING
                </div>
              )}
              
              <button 
                className={`absolute top-2 right-2 p-1.5 rounded-full
                  ${isFavorite 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/40'}`}
                onClick={toggleFavorite}
                aria-label="Add to favorites"
              >
                <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
            
            <div className="p-4 relative z-10">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-white">{name}</h3>
                <span className="text-xs text-gray-400">{category}</span>
              </div>
              
              <div className="flex items-center mt-2">
                <div className="text-xl font-bold text-white">
                  ${finalPrice.toFixed(2)}
                </div>
                {discountCoins > 0 && (
                  <div className="ml-2 flex items-center bg-neon-purple/20 rounded-full px-2 py-0.5">
                    <span className="text-yellow-400 text-xs font-medium">-{discountCoins}</span>
                    <div className="coin w-3 h-3 ml-0.5 text-xs">💰</div>
                  </div>
                )}
                <div className="ml-auto">
                  <div className="text-gray-400 text-sm line-through">
                    ${price.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
        
        <DialogContent className="bg-white border-none rounded-2xl p-0 sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left side - Product Images */}
            <div className="bg-gray-100 p-6 rounded-l-2xl">
              <div className="relative mb-4">
                <img 
                  src={imageUrl} 
                  alt={name} 
                  className="w-full h-64 object-contain rounded-lg"
                />
                <button 
                  onClick={toggleFavorite}
                  className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                    isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
                </button>
              </div>
              
              {additionalImages.length > 0 && (
                <Carousel className="w-full">
                  <CarouselContent>
                    {additionalImages.map((img, idx) => (
                      <CarouselItem key={idx} className="basis-1/3">
                        <div className="p-1">
                          <div className="bg-white rounded-md overflow-hidden">
                            <img 
                              src={img} 
                              alt={`${name} view ${idx + 1}`}
                              className="w-full h-20 object-cover"
                            />
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="h-8 w-8 -left-4" />
                  <CarouselNext className="h-8 w-8 -right-4" />
                </Carousel>
              )}
            </div>
            
            {/* Right side - Product Details */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
              <p className="text-sm text-gray-500 mb-4">{category}</p>
              
              <div className="flex items-baseline mb-6">
                <span className="text-2xl font-bold text-gray-900">${finalPrice.toFixed(2)}</span>
                {discountCoins > 0 && (
                  <>
                    <span className="ml-2 text-gray-500 line-through">${price.toFixed(2)}</span>
                    <div className="ml-2 bg-yellow-100 px-2 py-1 rounded-full flex items-center">
                      <span className="text-yellow-800 text-xs font-semibold">Save {discountCoins} coins</span>
                      <span className="ml-1 text-xs">💰</span>
                    </div>
                  </>
                )}
              </div>
              
              <p className="text-gray-700 mb-6">{description}</p>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Select color</h3>
                <div className="flex gap-2">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      className={`w-8 h-8 rounded-full ${color.class} ${
                        selectedColor === index ? 'ring-2 ring-black ring-offset-2' : ''
                      }`}
                      onClick={() => setSelectedColor(index)}
                      aria-label={`Select ${color.name}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-3 py-2 rounded-md text-sm ${
                        selectedSize === size 
                          ? 'bg-black text-white' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <Button className="w-full bg-black hover:bg-gray-800 text-white rounded-full mb-3 h-12">
                Add to cart
              </Button>
              
              <Button variant="outline" className="w-full border-gray-300 text-gray-800 hover:bg-gray-50 rounded-full h-12">
                Buy now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
