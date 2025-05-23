
import { Product } from './ProductService';

export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type PaymentMethod = 'upi' | 'razorpay' | 'cash';

export interface DeliveryAddress {
  name: string;
  phone: string;
  pincode: string;
  address: string;
  city: string;
  state: string;
  landmark?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  coinsUsed: number;
  quantity: number;
  size?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  totalCoinsUsed: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  deliveryAddress: DeliveryAddress;
  createdAt: Date;
  updatedAt: Date;
}

class OrderService {
  private orders: Order[] = [];

  // Create a new order
  public async createOrder(
    userId: string,
    items: OrderItem[],
    totalAmount: number,
    totalCoinsUsed: number,
    paymentMethod: PaymentMethod,
    deliveryAddress: DeliveryAddress
  ): Promise<Order> {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      userId,
      items,
      totalAmount,
      totalCoinsUsed,
      status: 'processing',
      paymentMethod,
      deliveryAddress,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.orders.push(newOrder);
    return newOrder;
  }
  
  // Get all orders for a user
  public async getUserOrders(userId: string): Promise<Order[]> {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return this.orders
      .filter(order => order.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  // Get order by ID
  public async getOrderById(orderId: string): Promise<Order | null> {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const order = this.orders.find(order => order.id === orderId);
    return order || null;
  }
  
  // Update order status
  public async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order | null> {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const orderIndex = this.orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) return null;
    
    this.orders[orderIndex].status = status;
    this.orders[orderIndex].updatedAt = new Date();
    
    return this.orders[orderIndex];
  }
}

export default new OrderService();
