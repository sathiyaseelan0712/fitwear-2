import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../../images/background.png'; // Adjust path as needed

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Password criteria state
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    upper: false,
    lower: false,
    digit: false,
    special: false,
  });

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setMessage({ text: '', type: '' });
    setShowOtpField(false);
    setPassword('');
    setConfirmPassword('');
  };

  // Password strength calculation
  const getOverallStrength = () => {
    const { length, upper, lower, digit, special } = passwordCriteria;
    const score = [length, upper, lower, digit, special].filter(Boolean).length;

    if (score <= 2) return { text: "Weak", color: "red" };
    if (score === 3) return { text: "Moderate", color: "orange" };
    if (score >= 4) return { text: "Strong", color: "green" };
    return { text: "", color: "" };
  };

  const allCriteriaMet = Object.values(passwordCriteria).every(Boolean);
  const strength = getOverallStrength();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    setPasswordCriteria({
      length: value.length >= 6 && value.length <= 12,
      upper: /[A-Z]/.test(value),
      lower: /[a-z]/.test(value),
      digit: /\d/.test(value),
      special: /[@$!%*?&#]/.test(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      if (isLogin) {
        // Handle login
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
        localStorage.setItem('token', response.data.token);
        setMessage({ text: 'Login successful!', type: 'success' });
        navigate('/privacy');
      } else if (showOtpField) {
        // Handle OTP verification
        const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, { userId, otp });
        localStorage.setItem('token', response.data.token);
        setMessage({ text: 'Account verified successfully!', type: 'success' });
        navigate('/privacy');
      } else {
        // Handle registration - check if passwords match
        if (password !== confirmPassword) {
          setMessage({ text: 'Passwords do not match', type: 'error' });
          return;
        }
        
        const response = await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password });
        setUserId(response.data.userId);
        setShowOtpField(true);
        setMessage({ text: 'OTP sent to your email!', type: 'success' });
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'An error occurred';
      setMessage({ text: errorMsg, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          opacity: 0.8
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/70 via-purple-50/70 to-blue-50/70 z-0"></div>

      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-100/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-20 w-64 h-64 bg-purple-100/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-100/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-white/20">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              {isLogin ? 'Sign in to your account' : 'Create a new account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={toggleAuthMode}
                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {message.text && (
            <div
              className={`p-4 rounded-md ${
                message.type === 'error' ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
              }`}
            >
              {message.text}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              {!isLogin && !showOtpField && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}

              {showOtpField && (
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                    Verification OTP
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    We've sent a verification code to your email
                  </p>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {(!showOtpField || isLogin) && (
                <>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete={isLogin ? "current-password" : "new-password"}
                      required
                      className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder={isLogin ? "Enter your password" : "Create a password"}
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    {/* Password Strength Indicator - Only show during registration */}
                    {!isLogin && !showOtpField && (
                      <div className="mt-2">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                strength.color === 'red' ? 'bg-red-500' : 
                                strength.color === 'orange' ? 'bg-orange-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${([...Object.values(passwordCriteria)].filter(Boolean).length * 20)}%` }}
                            ></div>
                          </div>
                          <span className={`ml-2 text-xs font-medium ${
                            strength.color === 'red' ? 'text-red-500' : 
                            strength.color === 'orange' ? 'text-orange-500' : 'text-green-500'
                          }`}>
                            {strength.text}
                          </span>
                        </div>
                        <ul className="mt-2 text-xs text-gray-600 grid grid-cols-2 gap-1">
                          <li className={`flex items-center ${passwordCriteria.length ? 'text-green-500' : 'text-gray-500'}`}>
                            {passwordCriteria.length ? '✓' : '•'} 6-12 characters
                          </li>
                          <li className={`flex items-center ${passwordCriteria.upper ? 'text-green-500' : 'text-gray-500'}`}>
                            {passwordCriteria.upper ? '✓' : '•'} Uppercase letter
                          </li>
                          <li className={`flex items-center ${passwordCriteria.lower ? 'text-green-500' : 'text-gray-500'}`}>
                            {passwordCriteria.lower ? '✓' : '•'} Lowercase letter
                          </li>
                          <li className={`flex items-center ${passwordCriteria.digit ? 'text-green-500' : 'text-gray-500'}`}>
                            {passwordCriteria.digit ? '✓' : '•'} Number
                          </li>
                          <li className={`flex items-center ${passwordCriteria.special ? 'text-green-500' : 'text-gray-500'}`}>
                            {passwordCriteria.special ? '✓' : '•'} Special character
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {/* Confirm Password Field - Only show during registration */}
                  {!isLogin && !showOtpField && (
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading || (!isLogin && !showOtpField && (!allCriteriaMet || password !== confirmPassword))}
                className={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  (isLogin || showOtpField || (allCriteriaMet && password === confirmPassword)) 
                    ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500' 
                    : 'bg-gray-400 cursor-not-allowed'
                } focus:outline-none focus:ring-offset-2 transition-colors`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : isLogin ? (
                  'Sign in'
                ) : showOtpField ? (
                  'Verify OTP'
                ) : (
                  'Sign up'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;