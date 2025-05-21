import { Link } from 'react-router-dom';
import { ShoppingBag, Instagram, Twitter, Facebook, Mail, MapPin, Clock, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Updated links for men's wear only
  const shopLinks = [
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Best Sellers", path: "/best-sellers" },
    { name: "T-Shirts", path: "/category/t-shirts" },
    { name: "Shirts", path: "/category/shirts" },
    { name: "Jeans", path: "/category/jeans" },
    { name: "Activewear", path: "/category/activewear" },
    { name: "Accessories", path: "/category/accessories" },
    { name: "Sale", path: "/sale" }
  ];

  const helpLinks = [
    { name: "Customer Service", path: "/customer-service" },
    { name: "Shipping Policy", path: "/shipping" },
    { name: "Returns & Exchanges", path: "/returns" },
    { name: "Size Guide", path: "/size-guide" },
    { name: "FAQs", path: "/faqs" },
    { name: "Track Order", path: "/track-order" }
  ];

  const aboutLinks = [
    { name: "About Us", path: "/about" },
    { name: "Our Story", path: "/our-story" },
    { name: "Quality Promise", path: "/quality" },
    { name: "Careers", path: "/careers" },
    { name: "Blog", path: "/blog" }
  ];

  const socialLinks = [
    { icon: <Instagram className="h-5 w-5" />, name: "Instagram", url: "#" },
    { icon: <Twitter className="h-5 w-5" />, name: "Twitter", url: "#" },
    { icon: <Facebook className="h-5 w-5" />, name: "Facebook", url: "#" },
    { icon: <Mail className="h-5 w-5" />, name: "Email", url: "mailto:contact@fitwear.com" }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-2xl font-bold">FitWear</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium men's clothing and accessories designed for style and comfort. We deliver high-quality apparel that fits your lifestyle.
            </p>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Get Style Updates</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-2 w-full text-sm bg-gray-800 border border-gray-700 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium rounded-r transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-blue-500">
              Shop Men's
            </h3>
            <ul className="space-y-3">
              {shopLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-white transition-colors text-sm hover:pl-1 duration-200 flex items-center"
                  >
                    <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Help Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-blue-500">
              Customer Care
            </h3>
            <ul className="space-y-3">
              {helpLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-white transition-colors text-sm hover:pl-1 duration-200 flex items-center"
                  >
                    <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* About + Contact */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-blue-500">
                About FitWear
              </h3>
              <ul className="space-y-3">
                {aboutLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path} 
                      className="text-gray-400 hover:text-white transition-colors text-sm hover:pl-1 duration-200 flex items-center"
                    >
                      <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-blue-500">
                Contact
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">+1 (555) 123-4567<br />support@fitwear.com</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Mon-Fri: 9am-6pm EST<br />Sat: 10am-4pm EST</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} FitWear - Men's Fashion. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-5 mt-4 md:mt-0">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center space-x-4 md:space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-500 hover:text-white text-xs md:text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-white text-xs md:text-sm transition-colors">
                Terms
              </Link>
              <Link to="/shipping" className="text-gray-500 hover:text-white text-xs md:text-sm transition-colors">
                Shipping
              </Link>
              <Link to="/returns" className="text-gray-500 hover:text-white text-xs md:text-sm transition-colors">
                Returns
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;