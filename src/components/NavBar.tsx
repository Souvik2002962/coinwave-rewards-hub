
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coins, ShoppingCart, User, Bell, Menu, X, BriefcaseBusiness } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const [coinBalance, setCoinBalance] = useState(1250);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-cyber-dark shadow-md py-3 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue flex items-center justify-center">
            <Coins className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-xl md:text-2xl text-white">
            Coin<span className="text-neon-purple">Cart</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-neon-purple transition-colors">Home</Link>
          <Link to="/earn" className="text-white hover:text-neon-purple transition-colors">Earn Coins</Link>
          <Link to="/store" className="text-white hover:text-neon-purple transition-colors">Shop</Link>
          <Link to="/reviews" className="text-white hover:text-neon-purple transition-colors">Reviews</Link>
          <Link to="/referral" className="text-white hover:text-neon-purple transition-colors">Refer & Earn</Link>
          <Link to="/become-advertiser" className="text-white hover:text-neon-purple transition-colors flex items-center">
            <BriefcaseBusiness className="h-4 w-4 mr-1" />
            For Advertisers
          </Link>
        </div>

        {/* User Controls - Always Visible */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="neon-border px-3 py-1 rounded-full flex items-center">
            <Coins className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-white font-medium">{coinBalance}</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-white hover:text-neon-purple relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Button>
            
            <Button variant="ghost" size="icon" className="text-white hover:text-neon-purple">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-neon-purple">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-cyber-dark border-neon-purple">
                <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-neon-purple/30" />
                <DropdownMenuItem className="text-white hover:text-neon-purple hover:bg-secondary focus:bg-secondary">
                  <Link to="/profile" className="w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:text-neon-purple hover:bg-secondary focus:bg-secondary">
                  <Link to="/profile?tab=orders" className="w-full">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:text-neon-purple hover:bg-secondary focus:bg-secondary">
                  <Link to="/profile?tab=wallet" className="w-full">Wallet History</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:text-neon-purple hover:bg-secondary focus:bg-secondary">
                  <Link to="/profile?tab=settings" className="w-full">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-neon-purple/30" />
                <DropdownMenuItem className="text-white hover:text-neon-purple hover:bg-secondary focus:bg-secondary">
                  <Link to="/advertiser-dashboard" className="w-full">Advertiser Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-neon-purple/30" />
                <DropdownMenuItem className="text-destructive hover:text-destructive hover:bg-secondary focus:bg-secondary">Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-white hover:text-neon-purple"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cyber-dark border-t border-neon-purple/30 mt-3 py-3 px-4 space-y-3">
          <Link to="/" className="block text-white hover:text-neon-purple py-2 transition-colors" onClick={toggleMobileMenu}>Home</Link>
          <Link to="/earn" className="block text-white hover:text-neon-purple py-2 transition-colors" onClick={toggleMobileMenu}>Earn Coins</Link>
          <Link to="/store" className="block text-white hover:text-neon-purple py-2 transition-colors" onClick={toggleMobileMenu}>Shop</Link>
          <Link to="/reviews" className="block text-white hover:text-neon-purple py-2 transition-colors" onClick={toggleMobileMenu}>Reviews</Link>
          <Link to="/referral" className="block text-white hover:text-neon-purple py-2 transition-colors" onClick={toggleMobileMenu}>Refer & Earn</Link>
          <Link to="/become-advertiser" className="block text-white hover:text-neon-purple py-2 transition-colors flex items-center" onClick={toggleMobileMenu}>
            <BriefcaseBusiness className="h-4 w-4 mr-1" />
            For Advertisers
          </Link>
          <Link to="/profile" className="block text-white hover:text-neon-purple py-2 transition-colors flex items-center" onClick={toggleMobileMenu}>
            <User className="h-4 w-4 mr-1" />
            My Account
          </Link>
          
          <div className="flex items-center space-x-4 pt-2 border-t border-neon-purple/30">
            <Button variant="ghost" size="icon" className="text-white hover:text-neon-purple relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-neon-purple">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
