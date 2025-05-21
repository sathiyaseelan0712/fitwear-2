import { Check, AlertTriangle, Shield, ShoppingBag, Clipboard, Scale, Mail } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Page Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-10 text-center">
            <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        </div>

          {/* Content */}
          <div className="p-6 md:p-10">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <Check className="mr-3 text-blue-600" />
                <span>1. Acceptance of Terms</span>
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                <p className="text-gray-600 leading-relaxed">
                  By accessing or using the <span className="font-medium text-blue-600">FitWear</span> website and services, you agree to be bound by these Terms of Service. 
                  If you do not agree to all the terms, you may not access or use our services.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <Shield className="mr-3 text-blue-600" />
                <span>2. Account Registration</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                To access certain features, you may be required to create an account. You agree to:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-0.5">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="text-gray-600">Provide accurate and complete information</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-0.5">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="text-gray-600">Maintain the security of your password</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-0.5">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="text-gray-600">Accept all risks of unauthorized access</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-0.5">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="text-gray-600">Be responsible for all activities under your account</span>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <ShoppingBag className="mr-3 text-blue-600" />
                <span>3. Products and Pricing</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                All products are subject to availability. We reserve the right to:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-blue-600 mb-2">Quantity Limits</h3>
                  <p className="text-gray-600 text-sm">Limit quantities available for purchase</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-blue-600 mb-2">Product Changes</h3>
                  <p className="text-gray-600 text-sm">Discontinue products at any time</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-blue-600 mb-2">Pricing Accuracy</h3>
                  <p className="text-gray-600 text-sm">Correct pricing errors (even after order confirmation)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-blue-600 mb-2">Price Changes</h3>
                  <p className="text-gray-600 text-sm">Change product prices without notice</p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <Clipboard className="mr-3 text-blue-600" />
                <span>4. Order Acceptance</span>
              </h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-blue-700 leading-relaxed">
                  Your receipt of an order confirmation does not signify our acceptance of your order. 
                  We reserve the right to accept or decline your order for any reason after receipt.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <svg className="h-6 w-6 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
                <span>5. Returns and Refunds</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Please review our Return Policy for details about returning products and obtaining refunds. 
                We reserve the right to refuse returns that don't meet our policy requirements.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-yellow-700 leading-relaxed flex items-start">
                  <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Some items may be final sale and not eligible for return. Please check product details before purchasing.</span>
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <svg className="h-6 w-6 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span>6. Intellectual Property</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                All content on this site, including text, graphics, logos, and images, is our property or the property of our licensors and is protected by copyright laws.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <AlertTriangle className="mr-3 text-blue-600" />
                <span>7. Limitation of Liability</span>
              </h2>
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-700 leading-relaxed">
                  FitWear shall not be liable for any damages resulting from the use or inability to use our products or services, 
                  including but not limited to direct, indirect, incidental, punitive, and consequential damages.
                </p>
              </div>
            </section>

            <section className="bg-blue-50 rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <Scale className="mr-3 text-blue-600" />
                <span>8. Governing Law</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of New York, 
                without regard to its conflict of law provisions.
              </p>
              <div className="bg-white px-4 py-3 rounded-lg shadow-sm inline-flex items-center">
                <Mail className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-gray-600">Questions? Contact us at <a href="mailto:legal@fitwear.com" className="text-blue-600 hover:underline">legal@fitwear.com</a></span>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;