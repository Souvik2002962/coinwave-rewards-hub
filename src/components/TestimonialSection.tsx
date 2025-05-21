
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  content: string;
  product: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Vikram S.',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d',
    content: 'I got a brand new pair of Nike Air Max just by watching ads during my commute! Couldn\'t believe how easy it was.',
    product: 'Nike Air Max',
    rating: 5,
  },
  {
    id: '2',
    name: 'Priya M.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    content: 'The wireless headphones I got with my coins have amazing sound quality. All from watching ads during my lunch breaks!',
    product: 'Wireless Headphones',
    rating: 5,
  },
  {
    id: '3',
    name: 'Rahul K.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    content: 'Used my coins to get 70% off a smartwatch. Best decision ever! The app made earning coins super simple.',
    product: 'Smart Watch',
    rating: 4,
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-cyber-dark to-cyber-dark/95">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">What Our Users Are Saying</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Real people earning real rewards just by watching ads in their spare time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-cyber-dark/70 p-6 rounded-xl border border-neon-purple/30 hover:border-neon-purple/50 transition-all"
            >
              <div className="flex items-center mb-4">
                <Avatar className="h-12 w-12 border border-neon-purple/50">
                  <AvatarImage src={testimonial.avatar} />
                  <AvatarFallback className="bg-neon-purple/20 text-neon-purple">
                    {testimonial.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative">
                <Quote className="absolute -top-2 -left-1 h-6 w-6 text-neon-purple/30" />
                <p className="text-gray-300 mb-3 pl-5 italic">"{testimonial.content}"</p>
              </div>
              <div className="mt-4">
                <span className="inline-block bg-neon-purple/20 px-3 py-1 rounded-full text-sm text-neon-purple">
                  {testimonial.product}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 flex justify-center">
          <a href="/reviews" className="text-neon-purple hover:text-neon-purple/80 flex items-center">
            View all user reviews and stories
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
