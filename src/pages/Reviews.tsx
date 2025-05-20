
import React, { useState } from 'react';
import { ArrowRight, Image, Video, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import ReviewCard from '@/components/ReviewCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Reviews = () => {
  const [reviewsData] = useState([
    {
      id: 'review1',
      username: 'MegaShopper',
      userAvatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d',
      title: 'Best Running Shoes Ever!',
      content: 'I earned 200 coins watching ads and got these amazing running shoes. Super comfortable and stylish!',
      mediaType: 'image' as const,
      mediaUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      productName: 'Nike Air Max',
      likes: 24,
      comments: 5,
      createdAt: '2 days ago'
    },
    {
      id: 'review2',
      username: 'TechGeek',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      title: 'Impressed with my new headphones',
      content: 'After watching ads for a week, I saved enough coins to get these noise-canceling headphones at 50% off! Sound quality is amazing!',
      mediaType: 'video' as const,
      mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4',
      productName: 'Wireless Headphones',
      likes: 42,
      comments: 8,
      createdAt: '1 week ago'
    },
    {
      id: 'review3',
      username: 'FashionGuru',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      title: 'My new favorite accessory',
      content: 'These sunglasses are perfect for summer! Used my coins and only paid half price. Totally worth it!',
      mediaType: 'image' as const,
      mediaUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
      productName: 'Ray-Ban Sunglasses',
      likes: 36,
      comments: 11,
      createdAt: '3 days ago'
    },
    {
      id: 'review4',
      username: 'GadgetLover',
      userAvatar: '',
      title: 'Unboxing my new smart watch',
      content: 'Check out this amazing smart watch I got with my CoinCart coins! The fitness tracking features are incredible.',
      mediaType: 'video' as const,
      mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-opening-a-gift-box-843-large.mp4',
      productName: 'Smart Watch',
      likes: 19,
      comments: 7,
      createdAt: '5 days ago'
    },
  ]);

  return (
    <div className="min-h-screen bg-cyber-dark">
      <NavBar />
      
      <div className="container mx-auto px-4 pb-16 pt-28">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">User Reviews</h1>
            <p className="text-gray-400">See what others are buying with their earned coins</p>
          </div>
          
          <Button className="mt-4 sm:mt-0 bg-neon-purple hover:bg-neon-purple/90 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Share Your Purchase
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList className="w-full max-w-md mx-auto bg-cyber-dark">
            <TabsTrigger value="all" className="flex-1">All Reviews</TabsTrigger>
            <TabsTrigger value="images" className="flex-1">Images <Image className="ml-1 h-4 w-4" /></TabsTrigger>
            <TabsTrigger value="videos" className="flex-1">Videos <Video className="ml-1 h-4 w-4" /></TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviewsData.map(review => (
                <ReviewCard key={review.id} {...review} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="images" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviewsData.filter(review => review.mediaType === 'image').map(review => (
                <ReviewCard key={review.id} {...review} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviewsData.filter(review => review.mediaType === 'video').map(review => (
                <ReviewCard key={review.id} {...review} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 text-center">
          <Button variant="outline" className="border-neon-purple text-neon-purple hover:bg-neon-purple/10">
            Load More Reviews
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
