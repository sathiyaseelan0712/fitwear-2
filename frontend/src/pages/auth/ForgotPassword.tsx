import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1 = Enter Email, 2 = Enter OTP, 3 = New Password

  // Password criteria state
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    upper: false,
    lower: false,
    digit: false,
    special: false,
  });

  const navigate = useNavigate();

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
    setNewPassword(value);

    setPasswordCriteria({
      length: value.length >= 6 && value.length <= 12,
      upper: /[A-Z]/.test(value),
      lower: /[a-z]/.test(value),
      digit: /\d/.test(value),
      special: /[@$!%*?&#]/.test(value),
    });
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
      setMessage({ 
        text: 'OTP sent to your email!', 
        type: 'success' 
      });
      setStep(2);
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'An error occurred';
      setMessage({ text: errorMsg, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      await axios.post(`${API_BASE_URL}/auth/verify-password-reset-otp`, { 
        email, 
        otp 
      });
      setMessage({ 
        text: 'OTP verified successfully!', 
        type: 'success' 
      });
      setStep(3);
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'An error occurred';
      setMessage({ text: errorMsg, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      await axios.post(`${API_BASE_URL}/auth/reset-password`, { 
        email,
        otp,
        newPassword 
      });
      setMessage({ 
        text: 'Password reset successfully! Redirecting to login...', 
        type: 'success' 
      });
      setTimeout(() => navigate('/authpage'), 2000);
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'An error occurred';
      setMessage({ text: errorMsg, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      <div className="flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              {step === 1 ? 'Reset Your Password' : 
               step === 2 ? 'Verify OTP' : 
               'Set New Password'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {step === 1 ? "Enter your email to receive an OTP" : 
               step === 2 ? "Enter the OTP sent to your email" : 
               "Create a strong new password"}
            </p>
          </div>

          {message.text && (
            <div className={`p-4 rounded-md ${
              message.type === 'error' ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
            }`}>
              {message.text}
            </div>
          )}

          {step === 1 && (
            <form className="mt-8 space-y-6" onSubmit={handleSendOTP}>
              <div className="rounded-md shadow-sm">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send OTP'
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form className="mt-8 space-y-6" onSubmit={handleVerifyOTP}>
              <div className="rounded-md shadow-sm">
                <div>
                  <label htmlFor="otp" className="sr-only">
                    OTP
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    required
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    'Verify OTP'
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="newPassword" className="sr-only">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={handlePasswordChange}
                  />
                  {/* Password Strength Indicator */}
                  <div className="mt-2">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
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
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading || !allCriteriaMet || newPassword !== confirmPassword}
                  className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                    allCriteriaMet && newPassword === confirmPassword 
                      ? 'bg-indigo-600 hover:bg-indigo-700' 
                      : 'bg-gray-400 cursor-not-allowed'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Resetting...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/authpage')}
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none text-sm"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;