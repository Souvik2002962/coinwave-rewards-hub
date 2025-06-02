import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coins, ShoppingCart, User, Bell, Menu, X, BriefcaseBusiness, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const NavBar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 glass-nav shadow-lg py-3 px-4 md:px-6">
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
          <Link to="/become-advertiser" className="text-white hover:text-neon-purple transition-colors flex items-center">
            <BriefcaseBusiness className="h-4 w-4 mr-1" />
            For Advertisers
          </Link>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          {user && (
            <div className="neon-border px-3 py-1 rounded-full flex items-center">
              <Coins className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-white font-medium">{user.coinBalance}</span>
            </div>
          )}
          
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
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:text-neon-purple">
                    <Avatar className="h-8 w-8">
                      {user.profileImage ? (
                        <AvatarImage src={user.profileImage} />
                      ) : (
                        <AvatarFallback className="bg-neon-purple/20 text-neon-purple">
                          {user.fullName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-cyber-dark border-neon-purple">
                  <DropdownMenuLabel className="text-white">{user.fullName}</DropdownMenuLabel>
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
                  <DropdownMenuItem 
                    className="text-destructive hover:text-destructive hover:bg-secondary focus:bg-secondary"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button className="bg-neon-purple hover:bg-neon-purple/90">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
          
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

      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-t border-neon-purple/30 mt-3 py-3 px-4 space-y-3">
          <Link to="/" className="block text-white hover:text-neon-purple py-2 transition-colors" onClick={toggleMobileMenu}>Home</Link>
          <Link to="/earn" className="block text-white hover:text-neon-purple py-2 transition-colors" onClick={toggleMobileMenu}>Earn Coins</Link>
          <Link to="/store" className="block text-white hover:text-neon-purple py-2 transition-colors" onClick={toggleMobileMenu}>Shop</Link>
          <Link to="/reviews" className="block text-white hover:text-neon-purple py-2 transition-colors" onClick={toggleMobileMenu}>Reviews</Link>
          <Link to="/referral" className="block text-white hover:text-neon-purple py-2 transition-colors" onClick={toggleMobileMenu}>Refer & Earn</Link>
          <Link to="/become-advertiser" className="block text-white hover:text-neon-purple py-2 transition-colors flex items-center" onClick={toggleMobileMenu}>
            <BriefcaseBusiness className="h-4 w-4 mr-1" />
            For Advertisers
          </Link>
          
          {user ? (
            <>
              <Link to="/profile" className="block text-white hover:text-neon-purple py-2 transition-colors flex items-center" onClick={toggleMobileMenu}>
                <User className="h-4 w-4 mr-1" />
                My Account
              </Link>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-400 hover:text-red-500 p-2 h-auto"
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
              >
                <LogOut className="h-4 w-4 mr-1" />
                Log out
              </Button>
            </>
          ) : (
            <Link to="/login" className="block" onClick={toggleMobileMenu}>
              <Button className="w-full bg-neon-purple hover:bg-neon-purple/90">
                Sign In
              </Button>
            </Link>
          )}
          
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
