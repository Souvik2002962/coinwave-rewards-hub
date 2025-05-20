
import React, { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
        
        <DialogContent className="bg-cyber-dark border border-neon-purple sm:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">{name}</DialogTitle>
            <DialogDescription className="text-gray-400">{category}</DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="overflow-hidden rounded-lg neon-border">
              <img src={imageUrl} alt={name} className="w-full h-auto object-cover" />
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-300">{description}</p>
              
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-white">${finalPrice.toFixed(2)}</div>
                <div className="text-gray-400 text-sm line-through">${price.toFixed(2)}</div>
              </div>
              
              {discountCoins > 0 && (
                <div className="inline-flex items-center bg-neon-purple/20 rounded-full px-3 py-1">
                  <span className="text-yellow-400 text-sm font-medium">Save {discountCoins} coins</span>
                  <div className="coin w-4 h-4 ml-1 text-xs">💰</div>
                </div>
              )}
              
              <Button 
                className="w-full bg-neon-purple hover:bg-neon-purple/90 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
              
              <Button
                variant="outline" 
                className="w-full border-neon-purple text-neon-purple hover:text-neon-purple hover:bg-neon-purple/10"
                onClick={toggleFavorite}
              >
                <Heart className="h-4 w-4 mr-2" fill={isFavorite ? "currentColor" : "none"} />
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            </div>
          </div>
          
          {additionalImages.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-white mb-2">More Images</h4>
              <div className="grid grid-cols-4 gap-2">
                {additionalImages.map((img, idx) => (
                  <div key={idx} className="overflow-hidden rounded-md border border-gray-700">
                    <img src={img} alt={`${name} view ${idx + 1}`} className="w-full h-auto object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
