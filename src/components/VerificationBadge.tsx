
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface VerificationBadgeProps {
  isVerified: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const VerificationBadge = ({ isVerified, size = 'md' }: VerificationBadgeProps) => {
  if (!isVerified) return null;

  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const badgeClasses = {
    sm: 'text-xs px-1 py-0',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-2 py-1'
  };

  return (
    <Badge className={`bg-neon-purple text-white ${badgeClasses[size]} inline-flex items-center space-x-1`}>
      <CheckCircle className={`${sizeClasses[size]} text-white`} />
      <span>Verified</span>
    </Badge>
  );
};

export default VerificationBadge;
