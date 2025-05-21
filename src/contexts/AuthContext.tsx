
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

// Define user type
export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  profileImage?: string;
  coinBalance: number;
  level: number;
  xpProgress: number;
  referralCode: string;
  joinDate: string;
}

// Define AuthContext type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string, fullName: string) => Promise<void>;
  logout: () => void;
  updateUser: (userUpdates: Partial<User>) => void;
  updateCoins: (amount: number) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample user data - this would come from a backend in a real app
const sampleUser: User = {
  id: "user123",
  username: "JohnDoe123",
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+91 98765 43210",
  profileImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
  coinBalance: 5400,
  level: 7,
  xpProgress: 75,
  referralCode: "JOHND21",
  joinDate: "March 2023",
};

// Create the provider component
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for existing session on initial load
  useEffect(() => {
    const checkSession = async () => {
      try {
        // In a real app, we'd check local storage or cookies for session tokens
        const savedSession = localStorage.getItem('user');
        if (savedSession) {
          setUser(JSON.parse(savedSession));
        }
      } catch (error) {
        console.error("Session check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to your backend
      // For now, we'll simulate a successful login with the sample user
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      
      if (email.toLowerCase() === sampleUser.email.toLowerCase() && password === "password123") {
        setUser(sampleUser);
        localStorage.setItem('user', JSON.stringify(sampleUser));
        toast.success("Login successful!");
        navigate('/');
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (email: string, password: string, username: string, fullName: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      
      // Create a new user based on the sample user but with the provided details
      const newUser: User = {
        ...sampleUser,
        id: `user_${Date.now()}`,
        username,
        fullName,
        email,
        coinBalance: 100, // Start with 100 coins
        level: 1,
        xpProgress: 0,
        referralCode: username.substring(0, 5).toUpperCase() + Math.floor(Math.random() * 100),
        joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success("Account created successfully!");
      navigate('/');
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.info("You have been logged out");
    navigate('/login');
  };

  // Update user function
  const updateUser = (userUpdates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userUpdates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Update coins function
  const updateCoins = (amount: number) => {
    if (user) {
      const newBalance = user.coinBalance + amount;
      updateUser({ coinBalance: newBalance });
      
      // Show appropriate toast notification
      if (amount > 0) {
        toast.success(`Earned ${amount} coins!`);
      } else if (amount < 0) {
        toast.info(`Spent ${Math.abs(amount)} coins`);
      }
    }
  };

  // Create the context value
  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
    updateCoins
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
