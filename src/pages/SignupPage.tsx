import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Pill, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (signupError) setSignupError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSignupError(null);

    if (formData.password !== formData.confirmPassword) {
      setSignupError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-olive-50/50">
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-3 group mb-8">
              <div className="relative p-1.5 bg-olive-600 rounded-lg shadow-xl shadow-olive-200">
                <Pill className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-3xl font-extrabold text-olive-700">MediScan</span>
              </div>
            </Link>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account 📝</h2>
            <p className="text-lg text-gray-600">Join MediScan for safer, smarter medicine management.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-olive-100">

            {signupError && (
                <div className="mb-6 flex items-center p-4 text-sm text-red-800 rounded-xl bg-red-50 border border-red-200" role="alert">
                    <AlertTriangle className="flex-shrink-0 inline w-4 h-4 mr-3" />
                    <span className="font-medium">{signupError}</span>
                </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-olive-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-olive-100 focus:border-olive-500 transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-olive-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-olive-100 focus:border-olive-500 transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-olive-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-olive-100 focus:border-olive-500 transition-all duration-200"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-olive-400 hover:text-olive-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-olive-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-olive-100 focus:border-olive-500 transition-all duration-200"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-olive-400 hover:text-olive-600 transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-olive-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-olive-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-olive-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Sign Up</span>
                    <ArrowRight className="h-5 w-5 ml-1" />
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-olive-600 hover:text-olive-700 font-bold hover:underline transition-all duration-200">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
          <div className="bg-olive-50 rounded-xl p-4 border border-olive-200">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-700">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-olive-600" />
                <span className="font-semibold">Quick Setup</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-olive-600" />
                <span className="font-semibold">User Data Secured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;