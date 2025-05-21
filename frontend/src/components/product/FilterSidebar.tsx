import { useState } from 'react';

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
const colors = ['Red', 'Blue', 'Black', 'White', 'Green', 'Gray'];
const categories = ['T-Shirts', 'Shirts', 'Jeans', 'Activewear', 'Accessories'];

interface FilterSidebarProps {
  filters: {
    category: string;
    priceRange: [number, number];
    sizes: string[];
    colors: string[];
  };
  onFilterChange: (newFilters: any) => void;
}

const FilterSidebar = ({ filters, onFilterChange }: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState(filters.priceRange);

  const handleSizeToggle = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ sizes: newSizes });
  };

  const handleColorToggle = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    onFilterChange({ colors: newColors });
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    onFilterChange({ priceRange: [min, max] });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm sticky top-4">
      <h2 className="font-bold text-lg mb-4">Filters</h2>
      
      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center">
              <input
                type="radio"
                id={`cat-${category}`}
                name="category"
                checked={filters.category === category}
                onChange={() => onFilterChange({ category })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={`cat-${category}`} className="ml-2 text-sm text-gray-700">
                {category}
              </label>
            </div>
          ))}
          <div className="flex items-center">
            <input
              type="radio"
              id="cat-all"
              name="category"
              checked={!filters.category}
              onChange={() => onFilterChange({ category: '' })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="cat-all" className="ml-2 text-sm text-gray-700">
              All Categories
            </label>
          </div>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Price Range</h3>
        <div className="px-2">
          <input
            type="range"
            min="0"
            max="10000"
            step="500"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(Number(e.target.value), priceRange[1])}
            className="w-full mb-2"
          />
          <input
            type="range"
            min="0"
            max="10000"
            step="500"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(priceRange[0], Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Sizes</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map(size => (
            <button
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`px-3 py-1 rounded-md text-sm border ${
                filters.sizes.includes(size)
                  ? 'bg-blue-100 border-blue-500 text-blue-700'
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => handleColorToggle(color)}
              className={`w-8 h-8 rounded-full border-2 ${
                filters.colors.includes(color)
                  ? 'border-blue-500'
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => onFilterChange({
          category: '',
          priceRange: [0, 10000],
          sizes: [],
          colors: []
        })}
        className="text-blue-600 hover:text-blue-800 text-sm"
      >
        Clear all filters
      </button>
    </div>
  );
};

export default FilterSidebar;