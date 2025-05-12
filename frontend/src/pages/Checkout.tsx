import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CreditCard, Truck, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import axios from 'axios';
import { API_URL } from '../config/constants';
import { toast } from 'react-hot-toast';

interface CheckoutFormData {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

const Checkout = () => {
  const { user } = useAuth();
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<CheckoutFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    }
  });
  
  const onSubmit = async (data: CheckoutFormData) => {
    setLoading(true);
    try {
      // In a real app, this would process payment and create an order
      // const response = await axios.post(`${API_URL}/orders`, {
      //   shippingAddress: {
      //     address: data.address,
      //     city: data.city,
      //     state: data.state,
      //     zipCode: data.zipCode
      //   },
      //   items: items.map(item => ({
      //     productId: item.productId,
      //     size: item.size,
      //     quantity: item.quantity
      //   })),
      //   payment: {
      //     cardNumber: data.cardNumber.replace(/\s+/g, '').slice(-4), // Only store last 4 digits
      //   }
      // }, {
      //   headers: { Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')}` }
      // });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear cart after successful order
      await clearCart();
      
      // Navigate to order confirmation page
      navigate('/order-confirmation/123'); // In reality, use the actual order ID
      
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">You need to add items to your cart before checkout.</p>
        <Button 
          variant="primary" 
          onClick={() => navigate('/')}
        >
          Shop Now
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <Truck className="h-5 w-5 text-blue-800 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Shipping Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  id="name"
                  error={errors.name?.message}
                  {...register('name', { required: 'Name is required' })}
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  id="email"
                  error={errors.email?.message}
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                
                <div className="md:col-span-2">
                  <Input
                    label="Street Address"
                    type="text"
                    id="address"
                    error={errors.address?.message}
                    {...register('address', { required: 'Address is required' })}
                  />
                </div>
                
                <Input
                  label="City"
                  type="text"
                  id="city"
                  error={errors.city?.message}
                  {...register('city', { required: 'City is required' })}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="State"
                    type="text"
                    id="state"
                    error={errors.state?.message}
                    {...register('state', { required: 'State is required' })}
                  />
                  
                  <Input
                    label="ZIP Code"
                    type="text"
                    id="zipCode"
                    error={errors.zipCode?.message}
                    {...register('zipCode', { 
                      required: 'ZIP code is required',
                      pattern: {
                        value: /^\d{5}(?:[-\s]\d{4})?$/,
                        message: 'Invalid ZIP code'
                      }
                    })}
                  />
                </div>
              </div>
            </div>
            
            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <CreditCard className="h-5 w-5 text-blue-800 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Payment Information</h2>
              </div>
              
              <div className="space-y-4">
                <Input
                  label="Card Number"
                  type="text"
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  error={errors.cardNumber?.message}
                  {...register('cardNumber', { 
                    required: 'Card number is required',
                    pattern: {
                      value: /^[\d\s]{16,19}$/,
                      message: 'Invalid card number'
                    }
                  })}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    type="text"
                    id="cardExpiry"
                    placeholder="MM/YY"
                    error={errors.cardExpiry?.message}
                    {...register('cardExpiry', { 
                      required: 'Expiry date is required',
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                        message: 'Invalid expiry date (MM/YY)'
                      }
                    })}
                  />
                  
                  <Input
                    label="CVC"
                    type="text"
                    id="cardCvc"
                    placeholder="123"
                    error={errors.cardCvc?.message}
                    {...register('cardCvc', { 
                      required: 'CVC is required',
                      pattern: {
                        value: /^[0-9]{3,4}$/,
                        message: 'Invalid CVC'
                      }
                    })}
                  />
                </div>
              </div>
              
              <div className="mt-6 bg-gray-50 p-4 rounded-md text-sm text-gray-600">
                <p>For demonstration purposes only. No real payments will be processed.</p>
                <p className="mt-1">Use any valid-looking credit card number format.</p>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline"
                type="button"
                onClick={() => navigate('/cart')}
              >
                Return to Cart
              </Button>
              
              <Button 
                variant="primary"
                type="submit"
                isLoading={loading}
              >
                Place Order
              </Button>
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="max-h-80 overflow-y-auto mb-4">
              {items.map((item) => (
                <div key={item._id} className="flex py-3 border-b border-gray-200 last:border-0">
                  <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">Size: {item.size}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">$5.99</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="text-base font-semibold text-gray-900">Total</span>
                <span className="text-base font-semibold text-gray-900">
                  ${(total + 5.99 + (total * 0.08)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;