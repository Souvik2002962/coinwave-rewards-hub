
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  Megaphone,
  UserCheck,
  CreditCard,
  Coins,
  MessageSquare,
  Bell,
  UserPlus,
  HelpCircle,
  Settings,
  Heart
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: BarChart3,
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Products',
    href: '/admin/products',
    icon: Package,
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    icon: ShoppingCart,
  },
  {
    title: 'Ads',
    href: '/admin/ads',
    icon: Megaphone,
  },
  {
    title: 'Advertisers',
    href: '/admin/advertisers',
    icon: UserCheck,
  },
  {
    title: 'Payments',
    href: '/admin/payments',
    icon: CreditCard,
  },
  {
    title: 'Coins',
    href: '/admin/coins',
    icon: Coins,
  },
  {
    title: 'Reviews',
    href: '/admin/reviews',
    icon: MessageSquare,
  },
  {
    title: 'Notifications',
    href: '/admin/notifications',
    icon: Bell,
  },
  {
    title: 'Cart & Wishlist',
    href: '/admin/cart-wishlist',
    icon: Heart,
  },
  {
    title: 'Team Members',
    href: '/admin/team-members',
    icon: UserPlus,
  },
  {
    title: 'Support',
    href: '/admin/support',
    icon: HelpCircle,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

export const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col glass-sidebar border-r border-white/10">
      <div className="flex h-16 shrink-0 items-center border-b border-white/10 px-6">
        <h2 className="text-lg font-semibold text-white">Admin Panel</h2>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200',
                isActive
                  ? 'glass-button text-neon-purple bg-white/10 border border-neon-purple/30'
                  : 'text-gray-300 hover:glass-button hover:text-white hover:bg-white/5'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 shrink-0',
                  isActive ? 'text-neon-purple' : 'text-gray-400 group-hover:text-gray-200'
                )}
              />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
