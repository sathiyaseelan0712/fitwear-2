import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

const CATEGORY_DATA: Category[] = [
  {
    id: 'cotton',
    name: 'Cotton Collection',
    description: 'Breathable and comfortable cotton apparel for everyday wear',
    image: 'https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    productCount: 42
  },
  {
    id: 'denim',
    name: 'Denim Essentials',
    description: 'Classic and modern denim pieces for a timeless look',
    image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    productCount: 28
  },
  {
    id: 'linen',
    name: 'Linen Styles',
    description: 'Lightweight and elegant linen clothing for warm days',
    image: 'https://images.pexels.com/photos/6776739/pexels-photo-6776739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    productCount: 19
  },
  {
    id: 'wool',
    name: 'Wool Blends',
    description: 'Premium wool garments for warmth and sophistication',
    image: 'https://images.pexels.com/photos/3782789/pexels-photo-3782789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    productCount: 31
  },
  {
    id: 'polyester',
    name: 'Performance Wear',
    description: 'High-performance fabrics for active lifestyles',
    image: 'https://images.pexels.com/photos/7679656/pexels-photo-7679656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    productCount: 23
  },
  {
    id: 'silk',
    name: 'Silk Elegance',
    description: 'Luxurious silk pieces for special occasions',
    image: 'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    productCount: 15
  }
];

const Categories = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative h-64 mb-12 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent z-10"></div>
        <img 
          src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Clothing rack" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-blue-300">Collections</span>
          </h1>
          <p className="text-white text-lg md:text-xl max-w-md">
            Explore our carefully curated categories to find your perfect style.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORY_DATA.map(category => (
            <Link 
              key={category.id}
              to={`/?category=${category.id}`}
              className="group relative block overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-64 w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                <p className="text-sm mb-2">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm bg-blue-800 px-2 py-1 rounded">
                    {category.productCount} items
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium">
                    Shop now <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Collection */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Collection</h2>
        <div className="relative rounded-lg overflow-hidden h-96">
          <img
            src="https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Summer collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>
          <div className="absolute left-8 bottom-8 text-white max-w-md">
            <h3 className="text-3xl font-bold mb-2">Summer Essentials</h3>
            <p className="mb-4">
              Lightweight fabrics and breezy styles for the warm season. 
              Our curated selection keeps you cool and stylish all summer long.
            </p>
            <Link 
              to="/?category=linen"
              className="inline-flex items-center gap-2 bg-white text-blue-900 hover:bg-gray-100 transition-colors px-6 py-3 rounded-md font-semibold"
            >
              Explore Collection <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Why Shop by Category?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 h-12 w-12 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-800">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Focused Selection</h3>
            <p className="text-gray-600">
              Browse specific materials and styles that match your preferences without the clutter.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 h-12 w-12 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-800">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Quality Assurance</h3>
            <p className="text-gray-600">
              Each category maintains our high standards for material quality and craftsmanship.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 h-12 w-12 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-800">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Complete Outfits</h3>
            <p className="text-gray-600">
              Find everything you need within each category to create cohesive looks.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;