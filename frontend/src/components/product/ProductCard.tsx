import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  sizes: string[];
  material: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Wishlist Icon */}
      <button 
        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Add to wishlist"
      >
        <Heart className="h-5 w-5" />
      </button>
      
      {/* Image with Link */}
      <Link to={`/products/${product._id}`} className="block relative h-64 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      
      {/* Product Info */}
      <div className="p-4">
        <Link to={`/products/${product._id}`} className="block">
          <h3 className="text-lg font-medium text-gray-900 mb-1 hover:text-blue-800 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-lg font-semibold text-gray-900 mb-2">
          ${product.price.toFixed(2)}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {product.sizes.join(', ')}
          </div>
          
          <div className="text-sm text-gray-600">
            {product.material}
          </div>
        </div>
        
        {/* Quick Add Button - Animated on Hover */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link 
            to={`/products/${product._id}`}
            className="block w-full text-center py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-colors"
          >
            Quick View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;