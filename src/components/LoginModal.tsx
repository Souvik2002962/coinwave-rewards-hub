
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ 
  isOpen, 
  onClose, 
  message = "Please log in to continue shopping" 
}) => {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/login');
    onClose();
  };
  
  const handleSignup = () => {
    navigate('/signup');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <DialogTitle className="text-center text-xl">Sign in to your account</DialogTitle>
          <DialogDescription className="text-center">
            {message}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button 
            onClick={handleLogin} 
            className="bg-black hover:bg-gray-800"
          >
            Sign In
          </Button>
          <div className="text-center text-sm text-gray-500">
            Don't have an account?
          </div>
          <Button 
            variant="outline" 
            onClick={handleSignup}
            className="border-gray-300"
          >
            Create Account
          </Button>
        </div>
        <DialogFooter className="flex-col sm:flex-col gap-2">
          <div className="text-xs text-gray-500 text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
