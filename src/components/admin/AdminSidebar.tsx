
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
    <div className="flex h-full w-64 flex-col bg-gray-50 border-r">
      <div className="flex h-16 shrink-0 items-center border-b px-6">
        <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 shrink-0',
                  isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
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
