import { Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  ShoppingCart,
  X,
  ChevronRight,
  ArrowLeft,
  Plus,
  Minus
} from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  inStock: boolean;
}

const CartPage = () => {
  // Mock cart data - replace with your actual cart context/state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Classic Oxford Shirt',
      price: 59.99,
      image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
      size: 'M',
      quantity: 1,
      inStock: true
    },
    {
      id: '2',
      name: 'Slim Fit Jeans',
      price: 79.99,
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
      size: 'L',
      quantity: 2,
      inStock: true
    }
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 9.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-md mx-auto py-12">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything to your cart yet
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex mb-6">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Shopping
            </Link>
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Cart</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="hidden md:grid grid-cols-12 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-6">
                  {/* Product Info */}
                  <div className="md:col-span-5 flex items-center">
                    <div className="flex-shrink-0 h-24 w-24 rounded-md overflow-hidden border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                      <div className="mt-2 md:hidden">
                        <span className="text-gray-900">${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price - Desktop */}
                  <div className="hidden md:flex items-center justify-center">
                    <span className="text-gray-900">${item.price.toFixed(2)}</span>
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-3 flex items-center justify-center">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 py-1 text-center w-12">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between md:justify-end">
                    <div className="md:hidden">
                      <span className="font-medium">Total:</span>
                      <span className="ml-2">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="hidden md:block">
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md"
                      title="Remove"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between">
                <span className="font-medium text-gray-900">Total</span>
                <span className="font-medium text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-6 w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Proceed to Checkout
            </Link>

            <div className="mt-4 flex justify-center text-sm text-gray-500">
              <p>
                or{' '}
                <Link to="/" className="text-blue-600 hover:text-blue-500">
                  Continue Shopping
                  <ChevronRight className="inline w-4 h-4 ml-1" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;