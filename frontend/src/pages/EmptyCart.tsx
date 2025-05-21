import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const EmptyCart = () => {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
      <div className="bg-blue-100 p-6 rounded-full mb-6">
        <ShoppingCart className="h-12 w-12 text-blue-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Looks like you haven't added anything to your cart yet. Start shopping to discover amazing products!
      </p>
      <Link 
        to="/shop" 
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
      >
        Start Shopping <ShoppingCart className="ml-2 h-5 w-5" />
      </Link>
    </div>
  );
};

export default EmptyCart;