import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Filter, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  ShoppingCart,
  Heart
} from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import Spinner from '../components/ui/Spinner';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  sizes: string[];
  colors: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
}

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortOption, setSortOption] = useState('featured');

  // Available options
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Blue', 'Green', 'Red', 'Gray'];
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  // Mock data - replace with your API call
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockProducts: Product[] = [
          {
            id: '1',
            name: 'Classic Oxford Shirt',
            price: 59.99,
            originalPrice: 79.99,
            image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
            rating: 4.5,
            reviewCount: 24,
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['White', 'Blue'],
            isBestSeller: true
          },
          {
            id: '2',
            name: 'Slim Fit Jeans',
            price: 79.99,
            image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
            rating: 4.2,
            reviewCount: 18,
            sizes: ['S', 'M', 'L'],
            colors: ['Black', 'Blue'],
            isNew: true
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
            colors: ['Black', 'White', 'Gray'],
            isBestSeller: true
          },
          {
            id: '4',
            name: 'Tailored Wool Trousers',
            price: 89.99,
            image: 'https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg',
            rating: 4.3,
            reviewCount: 15,
            sizes: ['M', 'L', 'XL'],
            colors: ['Black', 'Gray']
          },
          {
            id: '5',
            name: 'Casual Linen Shirt',
            price: 49.99,
            image: 'https://images.pexels.com/photos/6776739/pexels-photo-6776739.jpeg',
            rating: 4.1,
            reviewCount: 8,
            sizes: ['S', 'M', 'L'],
            colors: ['Blue', 'Green'],
            isNew: true
          },
          {
            id: '6',
            name: 'Performance Active Tee',
            price: 34.99,
            originalPrice: 44.99,
            image: 'https://images.pexels.com/photos/7679656/pexels-photo-7679656.jpeg',
            rating: 4.4,
            reviewCount: 31,
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Black', 'Red', 'Blue']
          },
          {
            id: '7',
            name: 'Formal Dress Shirt',
            price: 69.99,
            image: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg',
            rating: 4.6,
            reviewCount: 27,
            sizes: ['S', 'M', 'L'],
            colors: ['White', 'Blue']
          },
          {
            id: '8',
            name: 'Chino Pants',
            price: 59.99,
            originalPrice: 69.99,
            image: 'https://images.pexels.com/photos/3782794/pexels-photo-3782794.jpeg',
            rating: 4.0,
            reviewCount: 12,
            sizes: ['M', 'L', 'XL'],
            colors: ['Black', 'Gray', 'Green']
          }
        ];

        setProducts(mockProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters
  const filteredProducts = products.filter(product => {
    // Size filter
    if (selectedSizes.length > 0 && !product.sizes.some(size => selectedSizes.includes(size))) {
      return false;
    }
    
    // Color filter
    if (selectedColors.length > 0 && !product.colors.some(color => selectedColors.includes(color))) {
      return false;
    }
    
    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    return true;
  });

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default: // 'featured'
        return (a.isBestSeller === b.isBestSeller) ? 0 : a.isBestSeller ? -1 : 1;
    }
  });

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 500]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
              Home
            </Link>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronDown className="w-4 h-4 text-gray-400 transform -rotate-90" />
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">All Products</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 sticky top-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Filters</h3>
              <button 
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear all
              </button>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Price range</h4>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">${priceRange[0]}</span>
                <span className="text-sm text-gray-600">${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Sizes</h4>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1 border rounded-md text-sm ${
                      selectedSizes.includes(size)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Colors</h4>
              <div className="flex flex-wrap gap-3">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => toggleColor(color)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      selectedColors.includes(color)
                        ? 'border-blue-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    aria-label={color}
                  >
                    {selectedColors.includes(color) && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Mobile Filters Button */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              {selectedSizes.length + selectedColors.length > 0 && (
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {selectedSizes.length + selectedColors.length}
                </span>
              )}
            </button>

            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none pl-4 pr-8 py-2 border border-gray-300 rounded-lg shadow-sm bg-white"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Mobile Filters Panel */}
          {showFilters && (
            <div className="md:hidden bg-white p-4 rounded-lg shadow-lg border border-gray-200 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Filters</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-3">Price range</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">${priceRange[0]}</span>
                    <span className="text-sm text-gray-600">${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Sizes */}
                <div>
                  <h4 className="font-medium mb-3">Sizes</h4>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-3 py-1 border rounded-md text-sm ${
                          selectedSizes.includes(size)
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h4 className="font-medium mb-3">Colors</h4>
                  <div className="flex flex-wrap gap-3">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => toggleColor(color)}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                          selectedColors.includes(color)
                            ? 'border-blue-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        aria-label={color}
                      >
                        {selectedColors.includes(color) && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg"
                >
                  Clear all
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Apply filters
                </button>
              </div>
            </div>
          )}

          {/* Desktop Sort Options */}
          <div className="hidden md:flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredProducts.length}</span> products
              {(selectedSizes.length > 0 || selectedColors.length > 0) && (
                <span>
                  {' '}filtered by{' '}
                  {selectedSizes.length > 0 && (
                    <span className="font-medium">
                      sizes: {selectedSizes.join(', ')}
                      {selectedColors.length > 0 && ' and '}
                    </span>
                  )}
                  {selectedColors.length > 0 && (
                    <span className="font-medium">colors: {selectedColors.join(', ')}</span>
                  )}
                </span>
              )}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <Spinner size="large" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;