import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { API_URL } from '../config/constants';
import { toast } from 'react-hot-toast';

interface CartItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, name: string, price: number, image: string, size: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();

  // Calculate total price
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Fetch cart items when authenticated
  useEffect(() => {
    const fetchCart = async () => {
      if (isAuthenticated) {
        setLoading(true);
        try {
          const response = await axios.get(`${API_URL}/cart`, {
            headers: { Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')}` }
          });
          setItems(response.data.items || []);
        } catch (error) {
          console.error('Error fetching cart:', error);
          toast.error('Failed to load your cart');
        } finally {
          setLoading(false);
        }
      } else {
        // Clear cart when logged out
        setItems([]);
      }
    };

    fetchCart();
  }, [isAuthenticated, user]);

  const addToCart = async (productId: string, name: string, price: number, image: string, size: string, quantity: number) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/cart`, {
        productId,
        size,
        quantity
      }, {
        headers: { Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')}` }
      });
      
      // Update local state with returned cart data
      setItems(response.data.items || []);
      toast.success('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/cart/item/${itemId}`, {
        headers: { Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')}` }
      });
      
      // Update local state
      setItems(items.filter(item => item._id !== itemId));
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setLoading(true);
    try {
      await axios.put(`${API_URL}/cart/item/${itemId}`, {
        quantity
      }, {
        headers: { Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')}` }
      });
      
      // Update local state
      setItems(items.map(item => 
        item._id === itemId ? { ...item, quantity } : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')}` }
      });
      
      // Clear local state
      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loading,
    total
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};