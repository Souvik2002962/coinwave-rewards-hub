
import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  coinPrice: number;
}

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 99.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    coinPrice: 500
  },
  {
    id: '2',
    name: 'Smartphone Case',
    price: 29.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8',
    coinPrice: 150
  }
];

const CartPanel = ({ isOpen, onClose }: CartPanelProps) => {
  if (!isOpen) return null;

  const totalItems = mockCartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCoins = mockCartItems.reduce((sum, item) => sum + (item.coinPrice * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div 
        className="absolute top-16 right-4 w-96 max-h-96 bg-cyber-dark border border-neon-purple rounded-lg shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-neon-purple/30">
          <h3 className="text-white font-semibold flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Cart ({totalItems})
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="max-h-64 overflow-y-auto">
          {mockCartItems.length === 0 ? (
            <div className="p-8 text-center">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-400">Your cart is empty</p>
            </div>
          ) : (
            mockCartItems.map((item) => (
              <div key={item.id} className="p-4 border-b border-neon-purple/10">
                <div className="flex items-center space-x-3">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-sm truncate">{item.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">
                        {item.coinPrice} coins
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="text-white h-6 w-6">
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                    <Button variant="ghost" size="icon" className="text-white h-6 w-6">
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-400 h-6 w-6">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {mockCartItems.length > 0 && (
          <div className="p-4 border-t border-neon-purple/30">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-medium">Total:</span>
              <span className="text-yellow-400 font-bold">{totalCoins} coins</span>
            </div>
            <Button className="w-full bg-neon-purple hover:bg-neon-purple/90 text-white">
              Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPanel;
