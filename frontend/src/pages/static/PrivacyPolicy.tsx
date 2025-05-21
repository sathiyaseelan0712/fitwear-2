import { FiLock, FiUser, FiCreditCard, FiDatabase, FiShield, FiMail } from 'react-icons/fi';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Page Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-10 text-center">
            <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
            </div>

          {/* Content */}
          <div className="p-6 md:p-10">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <FiLock className="mr-3 text-indigo-600" />
                <span>1. Introduction</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Welcome to <span className="font-medium text-indigo-600">FitWear</span>. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we look after your personal data when you visit our 
                website and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <FiDatabase className="mr-3 text-indigo-600" />
                <span>2. Data We Collect</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-600 rounded-full p-1 mr-3 mt-0.5">
                    <FiUser className="h-4 w-4" />
                  </span>
                  <span className="text-gray-600"><span className="font-medium">Identity Data:</span> name, username, date of birth, gender</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-600 rounded-full p-1 mr-3 mt-0.5">
                    <FiMail className="h-4 w-4" />
                  </span>
                  <span className="text-gray-600"><span className="font-medium">Contact Data:</span> billing/delivery address, email, phone numbers</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-600 rounded-full p-1 mr-3 mt-0.5">
                    <FiCreditCard className="h-4 w-4" />
                  </span>
                  <span className="text-gray-600"><span className="font-medium">Financial Data:</span> payment card details</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-600 rounded-full p-1 mr-3 mt-0.5">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </span>
                  <span className="text-gray-600"><span className="font-medium">Transaction Data:</span> purchase history</span>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <svg className="h-6 w-6 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>3. How We Use Your Data</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="font-medium text-indigo-600 mb-2">Order Processing</h3>
                  <p className="text-gray-600 text-sm">To process and deliver your orders efficiently</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="font-medium text-indigo-600 mb-2">Customer Service</h3>
                  <p className="text-gray-600 text-sm">To manage our relationship with you</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="font-medium text-indigo-600 mb-2">Promotions</h3>
                  <p className="text-gray-600 text-sm">To enable participation in promotions</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="font-medium text-indigo-600 mb-2">Business Protection</h3>
                  <p className="text-gray-600 text-sm">To administer and protect our business</p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <FiShield className="mr-3 text-indigo-600" />
                <span>4. Data Security</span>
              </h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                <p className="text-blue-700 leading-relaxed">
                  We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way. 
                  We limit access to your personal data to those employees and partners who have a business need to know.
                </p>
              </div>
              <p className="text-gray-600 leading-relaxed">
                All data is encrypted in transit and at rest. We regularly conduct security audits and penetration testing to ensure the highest level of protection for your information.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <svg className="h-6 w-6 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>5. Your Legal Rights</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="grid md:grid-cols-2 gap-3">
                  <li className="flex items-start">
                    <span className="bg-indigo-100 text-indigo-600 rounded-full p-1 mr-2 mt-0.5 flex-shrink-0">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </span>
                    <span className="text-gray-600">Request access to your personal data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-indigo-100 text-indigo-600 rounded-full p-1 mr-2 mt-0.5 flex-shrink-0">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </span>
                    <span className="text-gray-600">Request correction of your personal data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-indigo-100 text-indigo-600 rounded-full p-1 mr-2 mt-0.5 flex-shrink-0">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </span>
                    <span className="text-gray-600">Request erasure of your personal data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-indigo-100 text-indigo-600 rounded-full p-1 mr-2 mt-0.5 flex-shrink-0">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                    <span className="text-gray-600">Object to processing of your personal data</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="bg-indigo-50 rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <FiMail className="mr-3 text-indigo-600" />
                <span>6. Contact Us</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                If you have any questions about this privacy policy or our privacy practices, please contact our Data Protection Officer:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:privacy@fitwear.com" className="bg-white px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center">
                  <FiMail className="text-indigo-600 mr-2" />
                  <span className="text-indigo-600 font-medium">privacy@fitwear.com</span>
                </a>
                <div className="bg-white px-4 py-3 rounded-lg shadow-sm flex items-center">
                  <svg className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-600">+1 (555) 123-4567</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                We typically respond to inquiries within 24-48 hours.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;