import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Default static cart items
const DEFAULT_CART_ITEMS: Omit<CartItem, 'id'>[] = [
  {
    productId: 'prod_1001',
    name: 'Classic Fit T-Shirt',
    price: 799,
    quantity: 2,
    image: '/images/products/tshirt-1.jpg',
    size: 'M',
    color: 'Black'
  },
  {
    productId: 'prod_2002',
    name: 'Slim Fit Jeans',
    price: 1499,
    quantity: 1,
    image: '/images/products/jeans-1.jpg',
    size: '32',
    color: 'Blue'
  },
  {
    productId: 'prod_3003',
    name: 'Sports Shorts',
    price: 599,
    quantity: 1,
    image: '/images/products/shorts-1.jpg',
    size: 'L',
    color: 'Gray'
  }
];

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Initialize with default items only if localStorage is empty
    const savedCart = localStorage.getItem('fitwear_cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (error) {
        console.error('Failed to parse cart data', error);
        localStorage.removeItem('fitwear_cart');
      }
    }
    // Add default items with generated IDs
    return DEFAULT_CART_ITEMS.map(item => ({
      ...item,
      id: generateId()
    }));
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fitwear_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        i => i.productId === item.productId && 
             i.size === item.size && 
             i.color === item.color
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + item.quantity
        };
        return updatedItems;
      }
      return [...prevItems, { ...item, id: generateId() }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = items.reduce(
    (sum, item) => sum + (item.price * item.quantity), 
    0
  );

  const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};