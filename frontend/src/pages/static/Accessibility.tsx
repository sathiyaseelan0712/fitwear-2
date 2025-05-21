import {AccessibilityIcon, Gauge, CheckCircle, Mail, Phone, MapPin, Code, Users } from 'lucide-react';

const Accessibility = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Page Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-10 text-center">
            <div className="flex justify-center mb-3">
              <AccessibilityIcon className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Accessibility Statement</h1>
            </div>

          {/* Content */}
          <div className="p-6 md:p-10">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <AccessibilityIcon className="mr-3 text-purple-600" />
                <span>Our Commitment</span>
              </h2>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-medium text-purple-700">FitWear</span> is committed to ensuring digital accessibility for people with disabilities. 
                  We are continually improving the user experience for everyone and applying the relevant accessibility standards.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <Gauge className="mr-3 text-purple-600" />
                <span>Conformance Status</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility. 
                We aim to conform to <span className="font-medium">WCAG 2.1 Level AA</span> standards.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-medium text-purple-600 mb-1">Perceivable</h3>
                    <p className="text-gray-600 text-sm">Text alternatives, adaptable content</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-medium text-purple-600 mb-1">Operable</h3>
                    <p className="text-gray-600 text-sm">Keyboard accessible, enough time</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-medium text-purple-600 mb-1">Understandable</h3>
                    <p className="text-gray-600 text-sm">Readable, predictable</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <CheckCircle className="mr-3 text-purple-600" />
                <span>Accessibility Features</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our website includes the following accessibility features:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <h3 className="font-medium text-purple-700 mb-2 flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Navigation
                  </h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>Full keyboard navigation support</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>Clear and consistent navigation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>Skip to content links</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <h3 className="font-medium text-purple-700 mb-2 flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Content
                  </h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>Alternative text for images</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>Resizable text (browser controls)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>Sufficient color contrast</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <svg className="h-6 w-6 mr-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Feedback</span>
              </h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                <p className="text-blue-700 leading-relaxed">
                  We welcome your feedback on the accessibility of our website. Please let us know if you encounter accessibility barriers.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center mb-2">
                    <Mail className="h-5 w-5 text-purple-600 mr-2" />
                    <h3 className="font-medium text-gray-800">Email</h3>
                  </div>
                  <a href="mailto:accessibility@fitwear.com" className="text-purple-600 hover:underline text-sm">
                    accessibility@fitwear.com
                  </a>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center mb-2">
                    <Phone className="h-5 w-5 text-purple-600 mr-2" />
                    <h3 className="font-medium text-gray-800">Phone</h3>
                  </div>
                  <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-5 w-5 text-purple-600 mr-2" />
                    <h3 className="font-medium text-gray-800">Address</h3>
                  </div>
                  <p className="text-gray-600 text-sm">1234 Fashion Street, New York, NY 10001</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                We try to respond to feedback within 5 business days.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <Code className="mr-3 text-purple-600" />
                <span>Technical Specifications</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Accessibility of our website relies on the following technologies:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex flex-wrap gap-3">
                  <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-200">HTML5</span>
                  <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-200">WAI-ARIA</span>
                  <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-200">CSS3</span>
                  <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-200">JavaScript</span>
                  <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-200">React</span>
                </div>
              </div>
            </section>

            <section className="bg-purple-50 rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <Users className="mr-3 text-purple-600" />
                <span>Ongoing Efforts</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our team conducts regular accessibility audits and user testing to identify and address accessibility issues. 
                We provide ongoing accessibility training for our staff and consider accessibility in all phases of website development.
              </p>
              <div className="bg-white px-4 py-3 rounded-lg shadow-sm inline-flex items-center">
                <svg className="h-5 w-5 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-600">Next scheduled audit: June 15, 2023</span>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Accessibility;