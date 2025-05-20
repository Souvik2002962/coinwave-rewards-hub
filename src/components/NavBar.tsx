
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coins, ShoppingCart, User, Bell, Image } from 'lucide-react';
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

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-neon-purple transition-colors">Home</Link>
          <Link to="/earn" className="text-white hover:text-neon-purple transition-colors">Earn Coins</Link>
          <Link to="/store" className="text-white hover:text-neon-purple transition-colors">Shop</Link>
          <Link to="/reviews" className="text-white hover:text-neon-purple transition-colors">Reviews</Link>
          <Link to="/referral" className="text-white hover:text-neon-purple transition-colors">Refer & Earn</Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="neon-border px-3 py-1 rounded-full flex items-center">
            <Coins className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-white font-medium">{coinBalance}</span>
          </div>
          
          <Button variant="ghost" size="icon" className="text-white hover:text-neon-purple">
            <Bell className="h-5 w-5" />
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
              <DropdownMenuItem className="text-white hover:text-neon-purple hover:bg-secondary focus:bg-secondary">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:text-neon-purple hover:bg-secondary focus:bg-secondary">My Orders</DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:text-neon-purple hover:bg-secondary focus:bg-secondary">Wallet History</DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:text-neon-purple hover:bg-secondary focus:bg-secondary">Settings</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-neon-purple/30" />
              <DropdownMenuItem className="text-destructive hover:text-destructive hover:bg-secondary focus:bg-secondary">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
