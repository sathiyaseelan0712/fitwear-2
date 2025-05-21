import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Circle,
  CreditCard,
  Truck,
  Home,
  ArrowLeft,
} from 'lucide-react';

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState<'order' | 'payment' | 'confirmation'>('order');
  const [paymentMethod, setPaymentMethod] = useState<string>('credit-card');
  const [shippingMethod, setShippingMethod] = useState<string>('standard');

  // Mock cart data
  const cartItems = [
    {
      id: '1',
      name: 'Classic Oxford Shirt',
      price: 59.99,
      image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
      size: 'M',
      quantity: 1
    },
    {
      id: '2',
      name: 'Slim Fit Jeans',
      price: 79.99,
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
      size: 'L',
      quantity: 2
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = shippingMethod === 'standard' ? 9.99 : 19.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingCost + tax;

  const handlePlaceOrder = () => {
    setActiveStep('confirmation');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Progress Steps */}
      <div className="mb-12">
        <nav className="flex items-center justify-center">
          <ol className="flex items-center w-full max-w-md">
            {/* Order Step */}
            <li className={`relative w-full ${activeStep === 'order' ? 'text-blue-600' : activeStep === 'payment' || activeStep === 'confirmation' ? 'text-green-600' : 'text-gray-500'}`}>
              <div className="flex flex-col items-center">
                {activeStep === 'order' ? (
                  <Circle className="w-6 h-6" />
                ) : (
                  <CheckCircle2 className="w-6 h-6" />
                )}
                <span className="mt-2 text-sm font-medium">Order</span>
              </div>
              <div className={`absolute top-3 left-1/2 w-full h-0.5 ${activeStep !== 'order' ? 'bg-green-600' : 'bg-gray-200'}`}></div>
            </li>

            {/* Payment Step */}
            <li className={`relative w-full ${activeStep === 'payment' ? 'text-blue-600' : activeStep === 'confirmation' ? 'text-green-600' : 'text-gray-500'}`}>
              <div className="flex flex-col items-center">
                {activeStep === 'confirmation' ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : activeStep === 'payment' ? (
                  <Circle className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
                <span className="mt-2 text-sm font-medium">Payment</span>
              </div>
              <div className={`absolute top-3 left-0 w-full h-0.5 ${activeStep === 'confirmation' ? 'bg-green-600' : 'bg-gray-200'}`}></div>
            </li>

            {/* Confirmation Step */}
            <li className={`relative w-full ${activeStep === 'confirmation' ? 'text-blue-600' : 'text-gray-500'}`}>
              <div className="flex flex-col items-center">
                {activeStep === 'confirmation' ? (
                  <Circle className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
                <span className="mt-2 text-sm font-medium">Confirmation</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {activeStep === 'order' && (
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Shipping Information */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Home className="w-5 h-5 mr-2" />
                Shipping Address
              </h2>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                      First name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State/Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP/Postal code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </form>
            </div>

            {/* Shipping Method */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                Shipping Method
              </h2>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="standard-shipping"
                    name="shipping-method"
                    type="radio"
                    checked={shippingMethod === 'standard'}
                    onChange={() => setShippingMethod('standard')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="standard-shipping" className="ml-3 block text-sm font-medium text-gray-700">
                    Standard Shipping (3-5 business days) - $9.99
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="express-shipping"
                    name="shipping-method"
                    type="radio"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="express-shipping" className="ml-3 block text-sm font-medium text-gray-700">
                    Express Shipping (1-2 business days) - $19.99
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Shipping</span>
                  <span className="text-sm">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tax</span>
                  <span className="text-sm">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <span className="text-base font-medium text-gray-900">Total</span>
                  <span className="text-base font-medium text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveStep('payment')}
                className="mt-6 w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Continue to Payment
              </button>

              <div className="mt-4 flex justify-center text-sm text-gray-500">
                <Link to="/cart" className="flex items-center text-blue-600 hover:text-blue-500">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeStep === 'payment' && (
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Payment Information */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Payment Method
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <input
                    id="credit-card"
                    name="payment-method"
                    type="radio"
                    checked={paymentMethod === 'credit-card'}
                    onChange={() => setPaymentMethod('credit-card')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                    Credit Card
                  </label>
                </div>

                {paymentMethod === 'credit-card' && (
                  <div className="ml-7 space-y-4">
                    <div>
                      <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                        Card number
                      </label>
                      <input
                        type="text"
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry date
                        </label>
                        <input
                          type="text"
                          id="expiry-date"
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          id="cvc"
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on card
                      </label>
                      <input
                        type="text"
                        id="card-name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <input
                    id="paypal"
                    name="payment-method"
                    type="radio"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                    PayPal
                  </label>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-200">
                <button
                  onClick={() => setActiveStep('order')}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Shipping</span>
                  <span className="text-sm">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tax</span>
                  <span className="text-sm">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <span className="text-base font-medium text-gray-900">Total</span>
                  <span className="text-base font-medium text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeStep === 'confirmation' && (
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8 text-left max-w-md mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number</span>
                <span className="font-medium">#123456</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span>{paymentMethod === 'credit-card' ? 'Credit Card' : 'PayPal'}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/"
              className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
            <Link
              to="/orders"
              className="px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              View Orders
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;