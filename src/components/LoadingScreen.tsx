
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-cyber-dark flex flex-col items-center justify-center">
      <div className="flex items-center space-x-4">
        <Loader2 className="h-12 w-12 text-neon-purple animate-spin" />
        <div>
          <h1 className="text-2xl font-bold text-white">Loading...</h1>
          <p className="text-gray-400">Please wait while we prepare your experience</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
