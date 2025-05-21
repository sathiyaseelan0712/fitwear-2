import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/common/Product/ProductCard';
import FilterSidebar from '../components/products/FilterSidebar';
import { Product } from '../../types/product';

const ShopPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 10000],
    sizes: [] as string[],
    colors: [] as string[],
    sort: 'featured'
  });

  // Extract category from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category') || '';
    setFilters(prev => ({ ...prev, category }));
  }, [location.search]);

  // Fetch products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // In a real app, you would call your API here
        const mockProducts: Product[] = [
          // Your product data here
        ];
        
        // Filter products based on current filters
        const filtered = mockProducts.filter(product => {
          return (
            (!filters.category || product.category === filters.category) &&
            (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]) &&
            (filters.sizes.length === 0 || filters.sizes.some(size => product.sizes.includes(size))) &&
            (filters.colors.length === 0 || filters.colors.some(color => product.colors.includes(color)))
          );
        });

        // Sort products
        const sorted = [...filtered].sort((a, b) => {
          if (filters.sort === 'price-low') return a.price - b.price;
          if (filters.sort === 'price-high') return b.price - a.price;
          if (filters.sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          return a.featured ? -1 : 1; // Default: featured first
        });

        setProducts(sorted);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <FilterSidebar 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {filters.category ? `${filters.category}` : 'All Products'}
            </h1>
            
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange({ sort: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  onClick={() => navigate(`/product/${product.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters</p>
              <button 
                onClick={() => setFilters({
                  category: '',
                  priceRange: [0, 10000],
                  sizes: [],
                  colors: [],
                  sort: 'featured'
                })}
                className="mt-4 text-blue-600 hover:text-blue-800"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;