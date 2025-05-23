
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountCoins: number;
  imageUrl: string;
  category: string;
  isTrending?: boolean;
  additionalImages: string[];
  availableSizes?: string[];
  stock?: number;
}

class ProductService {
  // Sample product data - in a real app, this would be fetched from an API/database
  private products: Product[] = [
    {
      id: 'nike-airmax-270',
      name: 'Nike Air Max 270',
      description: 'Nike\'s first lifestyle Air Max brings you style, comfort and big attitude in the Nike Air Max 270.',
      price: 9999,
      discountCoins: 400,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      category: 'Shoes',
      isTrending: true,
      additionalImages: [
        'https://images.unsplash.com/photo-1600269452121-4f2416e55c28',
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
        'https://images.unsplash.com/photo-1605348532760-6753d2c43329'
      ],
      availableSizes: ['7', '8', '9', '10', '11'],
      stock: 25
    },
    {
      id: 'nike-airforce-1',
      name: 'Nike Air Force 1',
      description: 'The iconic Air Force 1 with premium materials and classic style.',
      price: 6999,
      discountCoins: 300,
      imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
      category: 'Shoes',
      additionalImages: [],
      availableSizes: ['7', '8', '9', '10'],
      stock: 15
    },
    {
      id: 'adidas-ultraboost',
      name: 'Adidas Ultraboost',
      description: 'Energy-returning cushioning and a sock-like fit for all-day comfort.',
      price: 12999,
      discountCoins: 600,
      imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570',
      category: 'Shoes',
      isTrending: true,
      additionalImages: [],
      availableSizes: ['7', '8', '9', '10', '11'],
      stock: 10
    },
    {
      id: 'puma-rsx',
      name: 'Puma RS-X',
      description: 'Retro-inspired design with bold colors and comfortable cushioning.',
      price: 7999,
      discountCoins: 400,
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
      category: 'Shoes',
      additionalImages: [],
      availableSizes: ['8', '9', '10'],
      stock: 20
    },
    {
      id: 'leather-jacket',
      name: 'Leather Jacket',
      description: 'Classic leather jacket with a modern fit and stylish details.',
      price: 4999,
      discountCoins: 200,
      imageUrl: 'https://images.unsplash.com/photo-1585470117024-1c4434b1413c',
      category: 'Clothing',
      isTrending: true,
      additionalImages: [],
      availableSizes: ['S', 'M', 'L', 'XL'],
      stock: 8
    },
    {
      id: 'denim-jeans',
      name: 'Denim Jeans',
      description: 'Comfortable denim jeans with a classic fit and durable construction.',
      price: 1999,
      discountCoins: 100,
      imageUrl: 'https://images.unsplash.com/photo-1562157873-64b5b2266ef7',
      category: 'Clothing',
      additionalImages: [],
      availableSizes: ['30', '32', '34', '36'],
      stock: 30
    },
    {
      id: 'cotton-tshirt',
      name: 'Premium Cotton T-Shirt',
      description: 'Soft premium cotton t-shirt with a comfortable fit and versatile style.',
      price: 999,
      discountCoins: 50,
      imageUrl: 'https://images.unsplash.com/photo-1576566526864-8ebc8039704b',
      category: 'Clothing',
      additionalImages: [],
      availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
      stock: 50
    },
    {
      id: 'silver-necklace',
      name: 'Silver Necklace',
      description: 'Elegant silver necklace with a delicate design and timeless style.',
      price: 2999,
      discountCoins: 150,
      imageUrl: 'https://images.unsplash.com/photo-1585351317493-a1b60b44c11a',
      category: 'Accessories',
      additionalImages: [],
      stock: 12
    }
  ];

  public async getAllProducts(): Promise<Product[]> {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return [...this.products];
  }

  public async getProductById(id: string): Promise<Product | null> {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const product = this.products.find(p => p.id === id);
    return product || null;
  }

  public async getProductsByCategory(category: string): Promise<Product[]> {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return this.products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  public async searchProducts(query: string): Promise<Product[]> {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    const lowercaseQuery = query.toLowerCase();
    return this.products.filter(
      p => p.name.toLowerCase().includes(lowercaseQuery) || 
           p.description.toLowerCase().includes(lowercaseQuery) ||
           p.category.toLowerCase().includes(lowercaseQuery)
    );
  }
}

export default new ProductService();
