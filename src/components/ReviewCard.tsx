
import React, { useState } from 'react';
import { Heart, MessageSquare, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface ReviewCardProps {
  id: string;
  username: string;
  userAvatar?: string;
  title: string;
  content: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  productName: string;
  likes: number;
  comments: number;
  createdAt: string;
}

const ReviewCard = ({
  id,
  username,
  userAvatar,
  title,
  content,
  mediaType,
  mediaUrl,
  productName,
  likes: initialLikes,
  comments,
  createdAt
}: ReviewCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog
    toast.success("Share link copied to clipboard!", {
      position: "top-center",
    });
  };
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      toast.success("Comment posted!", {
        position: "bottom-center",
      });
      setCommentText('');
      setIsCommenting(false);
    }
  };

  return (
    <div className="neon-card p-4 md:p-6">
      <div className="flex items-center mb-4">
        <Avatar className="h-10 w-10 border-2 border-neon-purple">
          <AvatarImage src={userAvatar} />
          <AvatarFallback className="bg-neon-purple/20 text-neon-purple">
            {username.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="font-medium text-white">{username}</p>
          <p className="text-xs text-gray-400">{createdAt}</p>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{content}</p>
      
      <div className="mb-4">
        <div className="rounded-lg overflow-hidden mb-2">
          {mediaType === 'image' ? (
            <img
              src={mediaUrl}
              alt={title}
              className="w-full h-64 object-cover"
            />
          ) : (
            <video
              src={mediaUrl}
              controls
              className="w-full h-64 object-cover"
            />
          )}
        </div>
        <div className="inline-block bg-neon-purple/20 rounded-full px-3 py-1 text-sm text-neon-purple">
          {productName}
        </div>
      </div>
      
      <div className="flex items-center justify-between border-t border-gray-700 pt-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
            <span>{likes}</span>
          </button>
          
          <button 
            onClick={() => setIsCommenting(!isCommenting)}
            className="flex items-center space-x-1 text-gray-400 hover:text-neon-purple"
          >
            <MessageSquare className="h-5 w-5" />
            <span>{comments}</span>
          </button>
        </div>
        
        <button 
          onClick={handleShare} 
          className="text-gray-400 hover:text-neon-blue"
        >
          <Share className="h-5 w-5" />
        </button>
      </div>
      
      {isCommenting && (
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <div className="flex items-center">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-cyber-dark border border-gray-700 rounded-l-md px-3 py-2 text-white focus:outline-none focus:border-neon-purple"
            />
            <button
              type="submit"
              className="bg-neon-purple px-4 py-2 rounded-r-md text-white"
              disabled={!commentText.trim()}
            >
              Post
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReviewCard;
