import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  LogOut, 
  ShoppingCart, 
  Settings,
  ChevronDown,
  Search
} from 'lucide-react';

const Header = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
    setShowUserDropdown(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { 
      name: "Shop", 
      path: "/shop",
      subLinks: [
        { name: "T-Shirts", path: "/category/t-shirts" },
        { name: "Shirts", path: "/category/shirts" },
        { name: "Jeans", path: "/category/jeans" },
        { name: "Activewear", path: "/category/activewear" },
        { name: "Accessories", path: "/category/accessories" }
      ]
    },
    { name: "New Arrivals", path: "/new-arrivals", highlight: true },
    { name: "Sale", path: "/sale", highlight: true }
  ];

  return (
    <header 
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-3'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <ShoppingBag className="h-7 w-7 text-blue-600 transition-transform group-hover:rotate-12" />
          <span className="ml-2 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            FitWear
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link, index) => (
            <div key={index} className="relative group">
              <Link 
                to={link.path} 
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  link.highlight 
                    ? 'text-blue-600 hover:bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
                {link.subLinks && <ChevronDown className="ml-1 h-4 w-4" />}
              </Link>
              
              {link.subLinks && (
                <div className="absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-lg py-2 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {link.subLinks.map((subLink, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subLink.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                      {subLink.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        
        {/* Search Bar - Desktop */}
        <form 
          onSubmit={handleSearch}
          className="hidden md:flex items-center mx-4 flex-1 max-w-md"
        >
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>
        
        {/* Icons - Right Side */}
        <div className="flex items-center space-x-4">
          {/* Cart - Always visible */}
          <Link 
            to="/cart" 
            className="relative flex items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center bg-blue-600 text-white text-xs rounded-full">
                  {items.length}
                </span>
              )}
            </div>
            <span className="ml-1 hidden lg:inline">Cart</span>
          </Link>
          
          {/* User Auth Section */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center">
              <div className="relative">
                <button 
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                >
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-medium hidden lg:inline">{user?.name?.split(' ')[0]}</span>
                </button>
                
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-100">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link 
                      to="/account" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      My Account
                    </Link>
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Admin Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="hidden md:flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-1">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <span className="hidden lg:inline">Login</span>
            </Link>
          )}
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white absolute w-full shadow-xl border-t border-gray-100">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="p-4 border-b border-gray-100">
            <div className="flex">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
          
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navLinks.map((link, index) => (
              <div key={index}>
                <Link 
                  to={link.path} 
                  className={`block px-4 py-3 text-base font-medium rounded-lg mx-1 ${
                    link.highlight 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
                {link.subLinks && mobileMenuOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {link.subLinks.map((subLink, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subLink.path}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="border-t border-gray-100 mt-2 pt-2">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/account" 
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg mx-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg mx-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg mx-1"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg mx-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;