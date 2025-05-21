import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { CATEGORIES, API_URL } from '../config/constants';
import ProductCard from '../components/product/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import Spinner from '../components/ui/Spinner';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  category: string;
  sizes: string[];
  colors?: string[];
  stock: number;
  images: Array<{
    data: string;
    contentType: string;
  }>;
  brand: string;
  ratings?: {
    average: number;
    count: number;
  };
}

// Fallback data while API is unavailable
const PLACEHOLDER_PRODUCTS: Product[] = [
  {
    _id: '1',
    name: 'Classic Oxford Shirt',
    description: 'Premium cotton shirt for formal occasions',
    price: 59.99,
    discount: 10,
    category: 'Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Blue'],
    stock: 50,
    images: [{
      data: '',
      contentType: 'image/png'
    }],
    brand: 'Premium Apparel',
    ratings: {
      average: 4.5,
      count: 120
    }
  },
  {
    _id: '2',
    name: 'Slim Fit Jeans',
    description: 'Modern slim fit jeans with stretch technology',
    price: 79.99,
    category: 'Jeans',
    sizes: ['S', 'M', 'L'],
    colors: ['Blue', 'Black'],
    stock: 30,
    images: [{
      data: '',
      contentType: 'image/png'
    }],
    brand: 'Denim Co',
    ratings: {
      average: 4.2,
      count: 85
    }
  },
  {
    _id: '3',
    name: 'Premium T-Shirt',
    description: 'Soft cotton t-shirt for everyday wear',
    price: 29.99,
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Gray'],
    stock: 100,
    images: [{
      data: '',
      contentType: 'image/png'
    }],
    brand: 'Basic Wear',
    ratings: {
      average: 4.0,
      count: 200
    }
  },
  {
    _id: '4',
    name: 'Wool Blend Trousers',
    description: 'Elegant trousers for business casual looks',
    price: 89.99,
    discount: 15,
    category: 'Trousers',
    sizes: ['M', 'L', 'XL'],
    colors: ['Black', 'Gray'],
    stock: 25,
    images: [{
      data: '',
      contentType: 'image/png'
    }],
    brand: 'Formal Styles',
    ratings: {
      average: 4.7,
      count: 45
    }
  },
  {
    _id: '5',
    name: 'Casual Linen Shirt',
    description: 'Breathable linen shirt for summer',
    price: 49.99,
    category: 'Shirts',
    sizes: ['S', 'M', 'L'],
    colors: ['Beige', 'Blue'],
    stock: 40,
    images: [{
      data: '',
      contentType: 'image/png'
    }],
    brand: 'Summer Comfort',
    ratings: {
      average: 4.3,
      count: 75
    }
  },
  {
    _id: '6',
    name: 'Performance T-Shirt',
    description: 'Moisture-wicking fabric for active wear',
    price: 34.99,
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Red', 'Navy'],
    stock: 60,
    images: [{
      data: '',
      contentType: 'image/png'
    }],
    brand: 'Active Life',
    ratings: {
      average: 4.6,
      count: 90
    }
  },
  {
    _id: '7',
    name: 'Formal Dress Shirt',
    description: 'Classic dress shirt for business occasions',
    price: 69.99,
    category: 'Shirts',
    sizes: ['S', 'M', 'L'],
    colors: ['White', 'Blue'],
    stock: 35,
    images: [{
      data: '',
      contentType: 'image/png'
    }],
    brand: 'Executive Wear',
    ratings: {
      average: 4.4,
      count: 65
    }
  },
  {
    _id: '8',
    name: 'Tailored Trousers',
    description: 'Perfectly tailored trousers for a sharp look',
    price: 99.99,
    discount: 20,
    category: 'Trousers',
    sizes: ['M', 'L', 'XL'],
    colors: ['Black', 'Charcoal'],
    stock: 20,
    images: [{
      data: '',
      contentType: 'image/png'
    }],
    brand: 'Tailored Fit',
    ratings: {
      average: 4.8,
      count: 50
    }
  }
];

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const category = searchParams.get('category') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (category) {
          params.append('category', category);
        }
        
        const response = await axios.get(`${API_URL}/products?${params.toString()}`);
        setProducts(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching products:', error);
        // Use placeholder data when API is unavailable
        const filteredPlaceholders = PLACEHOLDER_PRODUCTS.filter(p => 
          !category || p.category.toLowerCase() === category.toLowerCase()
        );
        setProducts(filteredPlaceholders);
        setError('Unable to connect to the server. Showing placeholder data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter products by search term (client-side for demo)
    // In a real app, this would hit the backend API with search params
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Filter products by search term locally
  const filteredProducts = searchTerm 
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative h-96 mb-12 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent z-10"></div>
        <img 
          src="https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Fashion model" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Style That <span className="text-blue-300">Defines</span> You
          </h1>
          <p className="text-white text-lg md:text-xl max-w-md mb-8">
            Discover the latest fashion trends with premium quality and perfect fit.
          </p>
          <a href="#products" className="bg-white text-blue-900 hover:bg-gray-100 transition-colors px-6 py-3 rounded-md font-semibold w-fit">
            Shop Now
          </a>
        </div>
      </section>

      {/* Category Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <a 
          href="/"
          className={`px-4 py-2 rounded-full transition-colors ${!category ? 'bg-blue-800 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
        >
          All
        </a>
        {CATEGORIES.map(cat => (
          <a 
            key={cat.id}
            href={`/?category=${cat.id}`}
            className={`px-4 py-2 rounded-full transition-colors ${category === cat.id ? 'bg-blue-800 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
          >
            {cat.name}
          </a>
        ))}
      </div>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 id="products" className="text-2xl font-bold text-gray-900">
          {category ? CATEGORIES.find(cat => cat.id === category)?.name : 'All Products'}
        </h2>
        
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </form>
          
          <button 
            onClick={toggleFilters}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span className="hidden md:inline">Filters</span>
          </button>
        </div>
      </div>
      
      {/* Filters - Mobile-friendly collapsible */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-md mb-8 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            {/* Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option value="">All Sizes</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
            
            {/* Material */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Material
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option value="">All Materials</option>
                <option value="Cotton">Cotton</option>
                <option value="Polyester">Polyester</option>
                <option value="Linen">Linen</option>
                <option value="Denim">Denim</option>
                <option value="Wool">Wool</option>
                <option value="Silk">Silk</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <button className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      )}
      
      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-32">
          <Spinner size="large" />
        </div>
      ) : error ? (
        <div className="text-center py-4">
          <p className="text-amber-600">{error}</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found.</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              window.location.href = '/';
            }}
            className="mt-4 text-blue-600 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      
      {/* Features Section */}
      <section className="mt-16 mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">Why Choose FitWear?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 h-16 w-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-800">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
            <p className="text-gray-600">
              Crafted with the finest materials for comfort and durability that lasts.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 h-16 w-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-800">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Fast Shipping</h3>
            <p className="text-gray-600">
              Free shipping for orders over $100 with quick delivery nationwide.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 h-16 w-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-800">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
            <p className="text-gray-600">
              30-day hassle-free return policy with full refund guarantee.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;