
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
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const NavBar = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 glass-nav shadow-lg py-2 px-3 md:px-4" style={{ position: 'fixed' }}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue flex items-center justify-center">
            <Coins className="h-4 w-4 md:h-6 md:w-6 text-white" />
          </div>
          <span className="font-bold text-lg md:text-2xl text-white">
            Coin<span className="text-neon-purple">Cart</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center space-x-3">
          <Link to="/" className="text-white hover:text-neon-purple transition-colors text-xs font-medium px-2 py-1">{t('nav.home')}</Link>
          <Link to="/earn" className="text-white hover:text-neon-purple transition-colors text-xs font-medium px-2 py-1">{t('nav.earnCoins')}</Link>
          <Link to="/store" className="text-white hover:text-neon-purple transition-colors text-xs font-medium px-2 py-1">{t('nav.shop')}</Link>
          <Link to="/reviews" className="text-white hover:text-neon-purple transition-colors text-xs font-medium px-2 py-1">{t('nav.reviews')}</Link>
          <Link to="/referral" className="text-white hover:text-neon-purple transition-colors text-xs font-medium px-2 py-1">{t('nav.referral')}</Link>
          <Link to="/become-advertiser" className="text-white hover:text-neon-purple transition-colors flex items-center text-xs font-medium px-2 py-1">
            <BriefcaseBusiness className="h-3 w-3 mr-1" />
            {t('nav.forAdvertisers')}
          </Link>
        </div>

        <div className="flex items-center space-x-1 md:space-x-2">
          {user && (
            <div className="neon-border px-2 py-1 rounded-full flex items-center">
              <Coins className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 mr-1" />
              <span className="text-white font-medium text-xs md:text-sm">{user.coinBalance}</span>
            </div>
          )}
          
          <div className="hidden md:flex items-center space-x-1">
            <div className="scale-50">
              <LanguageSelector />
            </div>
            
            <Button variant="ghost" size="icon" className="text-white hover:text-neon-purple relative h-6 w-6">
              <Bell className="h-3 w-3" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Button>
            
            <Button variant="ghost" size="icon" className="text-white hover:text-neon-purple h-6 w-6">
              <ShoppingCart className="h-3 w-3" />
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:text-neon-purple h-6 w-6">
                    <Avatar className="h-5 w-5">
                      {user.profileImage ? (
                        <AvatarImage src={user.profileImage} />
                      ) : (
                        <AvatarFallback className="bg-neon-purple/20 text-neon-purple text-xs">
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
                <Button className="bg-neon-purple hover:bg-neon-purple/90 text-xs px-2 py-1 h-6">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="xl:hidden text-white hover:text-neon-purple h-8 w-8"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="xl:hidden glass-nav border-t border-neon-purple/30 mt-3 py-3 px-4 space-y-3">
          <Link to="/" className="block text-white hover:text-neon-purple py-2 transition-colors" onClick={toggleMobileMenu}>{t('nav.home')}</Link>
          <Link to="/earn" className="block text-white hover:text-neon-purple py-2 transition-colors" onClick={toggleMobileMenu}>{t('nav.earnCoins')}</Link>
          <Link to="/store" className="block text-white hover:text-neon-purple py-2 transition-colors" onClick={toggleMobileMenu}>{t('nav.shop')}</Link>
          <Link to="/reviews" className="block text-white hover:text-neon-purple py-2 transition-colors" onClick={toggleMobileMenu}>{t('nav.reviews')}</Link>
          <Link to="/referral" className="block text-white hover:text-neon-purple py-2 transition-colors" onClick={toggleMobileMenu}>{t('nav.referral')}</Link>
          <Link to="/become-advertiser" className="block text-white hover:text-neon-purple py-2 transition-colors flex items-center" onClick={toggleMobileMenu}>
            <BriefcaseBusiness className="h-4 w-4 mr-1" />
            {t('nav.forAdvertisers')}
          </Link>
          
          <div className="py-2">
            <LanguageSelector />
          </div>
          
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
