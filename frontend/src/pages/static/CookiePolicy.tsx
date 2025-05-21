
import { Cookie, Settings, Shield, BarChart2, Share2, RefreshCw, Mail } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Page Header */}
          <div className="bg-gradient-to-r from-green-600 to-teal-500 text-white px-6 py-10 text-center">
            <div className="flex justify-center mb-3">
              <Cookie className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Cookie Policy</h1>
            </div>

          {/* Content */}
          <div className="p-6 md:p-10">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <Cookie className="mr-3 text-green-600" />
                <span>1. What Are Cookies</span>
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500">
                <p className="text-gray-600 leading-relaxed">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                  They are widely used to make websites work more efficiently and to provide information to site owners.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <Settings className="mr-3 text-green-600" />
                <span>2. How We Use Cookies</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We use cookies for several purposes:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h3 className="font-medium text-green-700 mb-2 flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Essential Cookies
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Necessary for the website to function (e.g., shopping cart functionality, secure login)
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h3 className="font-medium text-green-700 mb-2 flex items-center">
                    <BarChart2 className="h-5 w-5 mr-2" />
                    Performance Cookies
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Help us understand how visitors interact with our website (analytics)
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h3 className="font-medium text-green-700 mb-2 flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Functionality Cookies
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Remember your preferences (e.g., language, region, font size)
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h3 className="font-medium text-green-700 mb-2 flex items-center">
                    <Share2 className="h-5 w-5 mr-2" />
                    Targeting Cookies
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Used to deliver ads relevant to your interests
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <svg className="h-6 w-6 mr-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                <span>3. Third-Party Cookies</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We may also use various third-party cookies for additional functionality:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="grid md:grid-cols-2 gap-3">
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-600 rounded-full p-1 mr-2 mt-0.5 flex-shrink-0">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </span>
                    <span className="text-gray-600"><span className="font-medium">Analytics:</span> Google Analytics, Hotjar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-600 rounded-full p-1 mr-2 mt-0.5 flex-shrink-0">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </span>
                    <span className="text-gray-600"><span className="font-medium">Advertising:</span> Google Ads, Facebook Pixel</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-600 rounded-full p-1 mr-2 mt-0.5 flex-shrink-0">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </span>
                    <span className="text-gray-600"><span className="font-medium">Social Media:</span> Facebook, Twitter, Instagram</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-600 rounded-full p-1 mr-2 mt-0.5 flex-shrink-0">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </span>
                    <span className="text-gray-600"><span className="font-medium">Payments:</span> Stripe, PayPal</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <RefreshCw className="mr-3 text-green-600" />
                <span>4. Managing Cookies</span>
              </h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                <p className="text-yellow-700 leading-relaxed">
                  You can control and/or delete cookies as you wish. You can delete all cookies already on your computer and 
                  set most browsers to prevent them from being placed.
                </p>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                However, if you do this, you may have to manually adjust some preferences every time you visit a site and some services may not work.
              </p>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-700 leading-relaxed">
                  To learn more about how to manage cookies, visit{' '}
                  <a 
                    href="https://www.aboutcookies.org" 
                    className="font-medium underline hover:text-blue-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    aboutcookies.org
                  </a>.
                </p>
              </div>
            </section>

            <section className="bg-green-50 rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <svg className="h-6 w-6 mr-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>5. Changes to This Policy</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new policy 
                on this page and updating the "Last updated" date.
              </p>
              <div className="bg-white px-4 py-3 rounded-lg shadow-sm inline-flex items-center">
                <Mail className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-gray-600">Questions? <a href="mailto:privacy@fitwear.com" className="text-green-600 hover:underline">privacy@fitwear.com</a></span>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CookiePolicy;