import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, Phone, Building, CheckCircle, AlertCircle, Shirt, Crown, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('customer');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { register: registerUser, error, clearError } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue
  } = useForm();

  const password = watch('password');

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await registerUser(data);
      if (result.success) {
        navigate('/complete-profile');
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setValue('role', role);
  };

  const specialOffers = {
    seller: [
      {
        title: 'Welcome Seller Offer',
        description: 'Get 50% off on your first month commission',
        icon: '🎁',
        indianContext: 'Perfect for traditional wear sellers'
      },
      {
        title: 'Bulk Order Discount',
        description: 'Special rates for bulk orders',
        icon: '📦',
        indianContext: 'Ideal for wedding season orders'
      },
      {
        title: 'Premium Support',
        description: 'Dedicated account manager',
        icon: '👨‍💼',
        indianContext: 'Expert guidance for Indian fashion'
      }
    ],
    wholesaler: [
      {
        title: 'Welcome Wholesaler Offer',
        description: 'Get 60% off on your first month commission',
        icon: '🎁',
        indianContext: 'Exclusive rates for bulk Indian attire'
      },
      {
        title: 'Premium Wholesaler Benefits',
        description: 'Exclusive access to premium products',
        icon: '⭐',
        indianContext: 'Access to designer collections'
      },
      {
        title: 'Priority Support',
        description: '24/7 dedicated support line',
        icon: '📞',
        indianContext: 'Support in Hindi and English'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-20 w-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-4 relative">
            <Shirt className="text-2xl text-white" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-orange-600" />
            </div>
          </div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
            Join Bharat Vastra
          </h1>
          <p className="text-gray-600 text-lg">
            Discover the finest Indian attire and jewelry collection
          </p>
          <div className="mt-4 flex justify-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
              Authentic Indian Fashion
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
              Free Shipping on $150+
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
              Secure Payments
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Registration Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
                    <p className="text-gray-600">Tell us about yourself</p>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="firstName"
                          type="text"
                          {...register('firstName', {
                            required: 'First name is required',
                            minLength: {
                              value: 2,
                              message: 'First name must be at least 2 characters'
                            }
                          })}
                          className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                            errors.firstName ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Enter your first name"
                        />
                      </div>
                      {errors.firstName && (
                        <div className="flex items-center mt-2 text-sm text-red-600">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.firstName.message}
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="lastName"
                          type="text"
                          {...register('lastName', {
                            required: 'Last name is required',
                            minLength: {
                              value: 2,
                              message: 'Last name must be at least 2 characters'
                            }
                          })}
                          className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                            errors.lastName ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Enter your last name"
                        />
                      </div>
                      {errors.lastName && (
                        <div className="flex items-center mt-2 text-sm text-red-600">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.lastName.message}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                          errors.email ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.email && (
                      <div className="flex items-center mt-2 text-sm text-red-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.email.message}
                      </div>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="phone"
                        type="tel"
                        {...register('phone', {
                          required: 'Phone number is required',
                          pattern: {
                            value: /^[+]?[1-9][\d]{0,15}$/,
                            message: 'Please enter a valid phone number'
                          }
                        })}
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                          errors.phone ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {errors.phone && (
                      <div className="flex items-center mt-2 text-sm text-red-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.phone.message}
                      </div>
                    )}
                  </div>

                  {/* Password Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          {...register('password', {
                            required: 'Password is required',
                            minLength: {
                              value: 6,
                              message: 'Password must be at least 6 characters'
                            }
                          })}
                          className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                            errors.password ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Create a password"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <div className="flex items-center mt-2 text-sm text-red-600">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.password.message}
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: value => value === password || 'Passwords do not match'
                          })}
                          className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                            errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <div className="flex items-center mt-2 text-sm text-red-600">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.confirmPassword.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
                  >
                    Next: Choose Your Role
                  </button>
                </>
              )}

              {/* Step 2: Role Selection */}
              {step === 2 && (
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Role</h2>
                    <p className="text-gray-600">Select how you want to experience Bharat Vastra</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Customer Role */}
                    <div
                      className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedRole === 'customer'
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleRoleChange('customer')}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="customer"
                        checked={selectedRole === 'customer'}
                        onChange={() => handleRoleChange('customer')}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                          <Shirt className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Shop for beautiful Indian attire and jewelry
                        </p>
                        <ul className="text-xs text-gray-500 space-y-1">
                          <li>• Browse sarees, lehengas, kurtas</li>
                          <li>• Shop traditional jewelry</li>
                          <li>• Get personalized recommendations</li>
                          <li>• Track orders and wishlist</li>
                        </ul>
                      </div>
                    </div>

                    {/* Seller Role */}
                    <div
                      className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedRole === 'seller'
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleRoleChange('seller')}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="seller"
                        checked={selectedRole === 'seller'}
                        onChange={() => handleRoleChange('seller')}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                          <Building className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Seller</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Sell your Indian fashion products worldwide
                        </p>
                        <ul className="text-xs text-gray-500 space-y-1">
                          <li>• List traditional wear & jewelry</li>
                          <li>• Reach global customers</li>
                          <li>• Special commission rates</li>
                          <li>• Track sales and analytics</li>
                        </ul>
                      </div>
                    </div>

                    {/* Wholesaler Role */}
                    <div
                      className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedRole === 'wholesaler'
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleRoleChange('wholesaler')}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="wholesaler"
                        checked={selectedRole === 'wholesaler'}
                        onChange={() => handleRoleChange('wholesaler')}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="mx-auto h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                          <Crown className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Wholesaler</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Access bulk orders and premium benefits
                        </p>
                        <ul className="text-xs text-gray-500 space-y-1">
                          <li>• Bulk order management</li>
                          <li>• Premium product access</li>
                          <li>• Exclusive wholesale rates</li>
                          <li>• Priority support</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Business Profile Fields for Sellers/Wholesalers */}
                  {(selectedRole === 'seller' || selectedRole === 'wholesaler') && (
                    <div className="mt-6 p-6 bg-gray-50 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                            Business Name
                          </label>
                          <input
                            id="businessName"
                            type="text"
                            {...register('businessName')}
                            className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Enter business name"
                          />
                        </div>
                        <div>
                          <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
                            Business Type
                          </label>
                          <select
                            id="businessType"
                            {...register('businessType')}
                            className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            <option value="">Select business type</option>
                            <option value="individual">Individual</option>
                            <option value="partnership">Partnership</option>
                            <option value="corporation">Corporation</option>
                            <option value="llc">LLC</option>
                            <option value="proprietorship">Proprietorship</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating account...
                        </div>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-orange-600 hover:text-orange-500 transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Special Offers Sidebar */}
          {(selectedRole === 'seller' || selectedRole === 'wholesaler') && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Special Offers</h2>
                <p className="text-gray-600">Exclusive benefits for {selectedRole}s</p>
              </div>

              <div className="space-y-4">
                {specialOffers[selectedRole]?.map((offer, index) => (
                  <div key={index} className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{offer.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{offer.title}</h3>
                        <p className="text-sm text-gray-600">{offer.description}</p>
                        <p className="text-xs text-orange-600 mt-1 italic">{offer.indianContext}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white">
                <h3 className="font-semibold mb-2">Why choose Bharat Vastra?</h3>
                <ul className="text-sm space-y-1">
                  <li>• Authentic Indian fashion marketplace</li>
                  <li>• Global reach for your products</li>
                  <li>• Secure payment processing</li>
                  <li>• 24/7 customer support</li>
                  <li>• Fast shipping worldwide</li>
                </ul>
              </div>
            </div>
          )}

          {/* Indian Fashion Features */}
          {selectedRole === 'customer' && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Discover Indian Fashion</h2>
                <p className="text-gray-600">Experience the beauty of traditional Indian attire</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                  <div className="flex items-start space-x-3">
                                            <Shirt className="w-6 h-6 text-orange-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Traditional Sarees</h3>
                      <p className="text-sm text-gray-600">Elegant silk, cotton, and designer sarees</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                  <div className="flex items-start space-x-3">
                    <Crown className="w-6 h-6 text-purple-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Bridal Lehengas</h3>
                      <p className="text-sm text-gray-600">Stunning bridal wear for special occasions</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                  <div className="flex items-start space-x-3">
                    <Sparkles className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Traditional Jewelry</h3>
                      <p className="text-sm text-gray-600">Authentic Indian jewelry and accessories</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white">
                <h3 className="font-semibold mb-2">Customer Benefits</h3>
                <ul className="text-sm space-y-1">
                  <li>• Free shipping on orders above $150</li>
                  <li>• Authentic Indian fashion</li>
                  <li>• Secure payment options</li>
                  <li>• Easy returns and exchanges</li>
                  <li>• Expert customer support</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
