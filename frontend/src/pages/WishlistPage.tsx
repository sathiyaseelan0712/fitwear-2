import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart,
  ShoppingCart,
  X,
  ChevronRight,
  Share2,
  ArrowLeft,
  Star
} from 'lucide-react';
import ProductCard from '../components/product/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  sizes: string[];
  isInStock: boolean;
  isNew?: boolean;
}

const WishlistPage = () => {
  // Mock data - replace with actual data from context/API
  const [wishlistItems, setWishlistItems] = useState<Product[]>([
    {
      id: '1',
      name: 'Classic Oxford Shirt',
      price: 59.99,
      originalPrice: 79.99,
      image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
      rating: 4.5,
      reviewCount: 24,
      sizes: ['S', 'M', 'L', 'XL'],
      isInStock: true,
      isNew: true
    },
    {
      id: '2',
      name: 'Slim Fit Jeans',
      price: 79.99,
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
      rating: 4.2,
      reviewCount: 18,
      sizes: ['S', 'M', 'L'],
      isInStock: true
    },
    {
      id: '3',
      name: 'Premium Cotton T-Shirt',
      price: 29.99,
      originalPrice: 39.99,
      image: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg',
      rating: 4.7,
      reviewCount: 42,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      isInStock: false
    }
  ]);

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const moveAllToCart = () => {
    // Implement move to cart functionality
    console.log('Moving all items to cart');
    setWishlistItems([]);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-md mx-auto py-12">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
            <Heart className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-6">
            You haven't added any items to your wishlist yet. Start shopping to add items you love!
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

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <button
            onClick={moveAllToCart}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Move All to Cart</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="hidden md:grid grid-cols-12 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
          <div className="col-span-5">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-3 text-center">Stock Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <div className="divide-y divide-gray-200">
          {wishlistItems.map((product) => (
            <div key={product.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-6">
              {/* Product Info */}
              <div className="md:col-span-5 flex items-center">
                <div className="flex-shrink-0 h-24 w-24 rounded-md overflow-hidden border border-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-medium text-gray-900">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </h3>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                  </div>
                  <div className="mt-1 md:hidden">
                    <span className={`text-sm ${product.originalPrice ? 'text-red-600' : 'text-gray-900'}`}>
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 md:hidden">
                    <span className={`text-sm ${product.isInStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.isInStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="md:col-span-2 flex items-center justify-center">
                <div className="text-center">
                  <span className={`${product.originalPrice ? 'text-red-600' : 'text-gray-900'}`}>
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through ml-2">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div className="md:col-span-3 flex items-center justify-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  product.isInStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.isInStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Actions */}
              <div className="md:col-span-2 flex items-center justify-end space-x-3">
                <button
                  onClick={() => console.log('Add to cart', product.id)}
                  disabled={!product.isInStock}
                  className={`p-2 rounded-md ${
                    product.isInStock
                      ? 'text-blue-600 hover:bg-blue-50'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                  title={product.isInStock ? 'Add to cart' : 'Out of stock'}
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md"
                  title="Remove"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Products */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">You might also like</h2>
          <Link to="/new-arrivals" className="flex items-center text-blue-600 hover:text-blue-800">
            View all <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* These would be fetched from API in a real app */}
          <ProductCard
            product={{
              id: '4',
              name: 'Tailored Wool Trousers',
              price: 89.99,
              image: 'https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg',
              rating: 4.3,
              reviewCount: 15,
              sizes: ['M', 'L', 'XL'],
              isInStock: true
            }}
          />
          <ProductCard
            product={{
              id: '5',
              name: 'Casual Linen Shirt',
              price: 49.99,
              image: 'https://images.pexels.com/photos/6776739/pexels-photo-6776739.jpeg',
              rating: 4.1,
              reviewCount: 8,
              sizes: ['S', 'M', 'L'],
              isInStock: true,
              isNew: true
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;