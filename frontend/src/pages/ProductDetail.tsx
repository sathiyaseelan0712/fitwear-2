import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Truck, RotateCcw, Heart } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { SIZES } from '../config/constants';
import { API_URL } from '../config/constants';
import Spinner from '../components/ui/Spinner';
import Button from '../components/ui/Button';
import { toast } from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  sizes: string[];
  material: string;
  description?: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // For development, using mock data
        // In production, this would be a real API call:
        // const response = await axios.get(`${API_URL}/products/${id}`);
        // setProduct(response.data);
        
        // Mock data for development
        setTimeout(() => {
          const mockProduct = {
            _id: id,
            name: id === '1' ? 'Classic Oxford Shirt' : 'Premium Slim Fit Jeans',
            image: id === '1' 
              ? 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              : 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            price: id === '1' ? 59.99 : 79.99,
            sizes: ['S', 'M', 'L', 'XL'],
            material: id === '1' ? 'Cotton' : 'Denim',
            description: id === '1' 
              ? 'This classic Oxford shirt is crafted from premium cotton fabric for ultimate comfort and durability. Perfect for both casual and formal occasions, it features a timeless design with a button-down collar and standard fit that will never go out of style.'
              : 'Our premium slim fit jeans combine style with comfort. Made from high-quality denim with just the right amount of stretch, these jeans offer a modern slim silhouette while allowing for easy movement. The classic five-pocket design and versatile wash make them a wardrobe essential.'
          };
          setProduct(mockProduct);
          setError('');
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product details. Please try again later.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate('/login', { state: { from: `/products/${id}` } });
      return;
    }
    
    if (product) {
      try {
        await addToCart(
          product._id,
          product.name,
          product.price,
          product.image,
          selectedSize,
          quantity
        );
        // Success toast message is handled in the addToCart function
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-red-600 mb-4">{error || 'Product not found'}</p>
        <Button 
          variant="primary"
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
        
        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <span className="ml-2 text-gray-600">129 reviews</span>
          </div>
          
          {/* Price */}
          <p className="text-2xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
          
          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600">
              {product.description || `Premium quality ${product.name.toLowerCase()} made with the finest ${product.material.toLowerCase()}.`}
            </p>
          </div>
          
          {/* Material */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Material</h2>
            <p className="text-gray-600">{product.material}</p>
          </div>
          
          {/* Size Selection */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Size</h2>
            <div className="flex flex-wrap gap-2">
              {SIZES.map(size => (
                <button
                  key={size}
                  className={`px-4 py-2 rounded-md border transition-colors ${
                    selectedSize === size 
                      ? 'border-blue-800 bg-blue-800 text-white' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSize ? (
              <p className="text-sm text-gray-500 mt-2">Selected: {selectedSize}</p>
            ) : (
              <p className="text-sm text-red-500 mt-2">Please select a size</p>
            )}
          </div>
          
          {/* Quantity */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Quantity</h2>
            <div className="flex items-center">
              <button 
                onClick={handleDecrement}
                className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b border-gray-300 min-w-[40px] text-center">
                {quantity}
              </span>
              <button 
                onClick={handleIncrement}
                className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              variant="primary"
              fullWidth
              leftIcon={<ShoppingCart className="h-5 w-5" />}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            
            <Button
              variant="outline"
              fullWidth
              leftIcon={<Heart className="h-5 w-5" />}
            >
              Add to Wishlist
            </Button>
          </div>
          
          {/* Shipping & Returns */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h3 className="font-medium">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $100. Delivery in 3-5 business days.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <RotateCcw className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h3 className="font-medium">Easy Returns</h3>
                <p className="text-sm text-gray-600">30-day return policy. See details.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;