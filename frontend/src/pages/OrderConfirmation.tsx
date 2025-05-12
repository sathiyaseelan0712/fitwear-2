import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';

interface OrderDetails {
  _id: string;
  items: {
    _id: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
    image: string;
  }[];
  totalPrice: number;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt: string;
}

const OrderConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, fetch order details from API
    // For demo, we're using mock data
    const fetchOrder = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock order data
        const mockOrder: OrderDetails = {
          _id: id || '123',
          items: [
            {
              _id: '1',
              name: 'Classic Oxford Shirt',
              price: 59.99,
              size: 'M',
              quantity: 1,
              image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            },
            {
              _id: '2',
              name: 'Slim Fit Jeans',
              price: 79.99,
              size: 'L',
              quantity: 1,
              image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            }
          ],
          totalPrice: 145.97,
          shippingAddress: {
            address: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001'
          },
          createdAt: new Date().toISOString()
        };
        
        setOrder(mockOrder);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [id]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Spinner size="large" />
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
        <p className="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
        <Link to="/">
          <Button variant="primary">Return to Home</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your order has been received.
          </p>
          <p className="text-gray-500 mt-1">
            Order #{order._id}
          </p>
          <p className="text-gray-500 mt-1">
            Date: {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        <div className="border-t border-gray-200 pt-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
          
          <div className="mb-6">
            {order.items.map((item) => (
              <div key={item._id} className="flex py-4 border-b border-gray-200 last:border-0">
                <div className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-base font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">${(order.totalPrice - 5.99 - (order.totalPrice * 0.08)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-900">$5.99</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Tax</span>
              <span className="text-gray-900">${(order.totalPrice * 0.08).toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-300 my-2 pt-2 flex justify-between">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-lg font-semibold text-gray-900">${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h2>
          
          <div className="bg-blue-50 p-4 rounded-md flex items-start">
            <Package className="h-5 w-5 text-blue-700 mt-0.5 mr-3" />
            <div>
              <p className="text-gray-800">
                Your order will be shipped to:
              </p>
              <p className="text-gray-800 mt-2">
                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Estimated delivery: 3-5 business days
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-600 mb-4 md:mb-0">
            A confirmation email has been sent to your email address.
          </p>
          
          <Link to="/">
            <Button 
              variant="primary"
              rightIcon={<ArrowRight className="h-5 w-5" />}
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;