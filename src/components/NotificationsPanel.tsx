
import React from 'react';
import { X, CheckCircle, Gift, Star, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'reward' | 'order';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'reward',
    title: 'Coins Earned!',
    message: 'You earned 50 coins for completing a survey',
    time: '2 minutes ago',
    read: false
  },
  {
    id: '2',
    type: 'success',
    title: 'Profile Verified',
    message: 'Your profile has been successfully verified',
    time: '1 hour ago',
    read: false
  },
  {
    id: '3',
    type: 'order',
    title: 'Order Shipped',
    message: 'Your order #12345 has been shipped',
    time: '2 hours ago',
    read: true
  }
];

const NotificationsPanel = ({ isOpen, onClose }: NotificationsPanelProps) => {
  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'reward':
        return <Gift className="h-5 w-5 text-yellow-400" />;
      case 'order':
        return <ShoppingBag className="h-5 w-5 text-blue-400" />;
      default:
        return <Star className="h-5 w-5 text-purple-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div 
        className="absolute top-16 right-4 w-80 max-h-96 bg-cyber-dark border border-neon-purple rounded-lg shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-neon-purple/30">
          <h3 className="text-white font-semibold">Notifications</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-neon-purple/10 hover:bg-neon-purple/5 transition-colors ${
                !notification.read ? 'bg-neon-purple/10' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                {getIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-medium text-sm">{notification.title}</p>
                    {!notification.read && (
                      <Badge className="bg-neon-purple text-white text-xs">New</Badge>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mt-1">{notification.message}</p>
                  <p className="text-gray-500 text-xs mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-3 border-t border-neon-purple/30">
          <Button className="w-full bg-neon-purple hover:bg-neon-purple/90 text-white text-sm">
            Mark All as Read
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanel;
