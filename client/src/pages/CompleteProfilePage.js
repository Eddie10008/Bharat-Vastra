import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { Upload, MapPin, Building, User, Calendar, MessageSquare, Globe, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

const CompleteProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [addresses, setAddresses] = useState([{ type: 'home', street: '', city: '', state: '', zipCode: '', country: 'Australia', isDefault: true }]);
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm();

  const selectedRole = watch('role', user?.role || 'customer');

  useEffect(() => {
    if (user?.profileCompleted) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addAddress = () => {
    setAddresses([...addresses, { type: 'other', street: '', city: '', state: '', zipCode: '', country: 'Australia', isDefault: false }]);
  };

  const removeAddress = (index) => {
    if (addresses.length > 1) {
      const newAddresses = addresses.filter((_, i) => i !== index);
      setAddresses(newAddresses);
    }
  };

  const updateAddress = (index, field, value) => {
    const newAddresses = [...addresses];
    newAddresses[index][field] = value;
    
    // If setting as default, unset others
    if (field === 'isDefault' && value) {
      newAddresses.forEach((addr, i) => {
        if (i !== index) addr.isDefault = false;
      });
    }
    
    setAddresses(newAddresses);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      
      // Add profile image if selected
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }
      
      // Add form data
      Object.keys(data).forEach(key => {
        if (data[key] !== undefined && data[key] !== '') {
          formData.append(key, data[key]);
        }
      });
      
      // Add addresses
      formData.append('addresses', JSON.stringify(addresses));
      
      const result = await updateProfile(formData);
      if (result.success) {
        toast.success('Profile completed successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('Profile completion error:', error);
      toast.error('Failed to complete profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl text-white font-bold">BV</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
            Complete Your Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Help us personalize your experience
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Profile Image */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Picture</h2>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-orange-200">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full cursor-pointer hover:bg-orange-600 transition-colors">
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Upload a profile picture (max 5MB)</p>
            </div>

            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="dateOfBirth"
                      type="date"
                      {...register('dateOfBirth')}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    id="gender"
                    {...register('gender')}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="bio"
                      rows={3}
                      {...register('bio')}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Addresses</h2>
              <div className="space-y-6">
                {addresses.map((address, index) => (
                  <div key={index} className="p-6 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Address {index + 1}
                      </h3>
                      {addresses.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAddress(index)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address Type
                        </label>
                        <select
                          value={address.type}
                          onChange={(e) => updateAddress(index, 'type', e.target.value)}
                          className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="home">Home</option>
                          <option value="work">Work</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`default-${index}`}
                          checked={address.isDefault}
                          onChange={(e) => updateAddress(index, 'isDefault', e.target.checked)}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`default-${index}`} className="ml-2 block text-sm text-gray-700">
                          Set as default address
                        </label>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Street Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            value={address.street}
                            onChange={(e) => updateAddress(index, 'street', e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Enter street address"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          value={address.city}
                          onChange={(e) => updateAddress(index, 'city', e.target.value)}
                          className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Enter city"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          value={address.state}
                          onChange={(e) => updateAddress(index, 'state', e.target.value)}
                          className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Enter state"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          value={address.zipCode}
                          onChange={(e) => updateAddress(index, 'zipCode', e.target.value)}
                          className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Enter ZIP code"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <input
                          type="text"
                          value={address.country}
                          onChange={(e) => updateAddress(index, 'country', e.target.value)}
                          className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Enter country"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addAddress}
                  className="w-full py-3 px-4 border-2 border-dashed border-gray-300 text-sm font-medium rounded-lg text-gray-700 hover:border-orange-500 hover:text-orange-600 transition-colors"
                >
                  + Add Another Address
                </button>
              </div>
            </div>

            {/* Business Information for Sellers/Wholesalers */}
            {(selectedRole === 'seller' || selectedRole === 'wholesaler') && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="businessName"
                        type="text"
                        {...register('businessName')}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter business name"
                      />
                    </div>
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

                  <div>
                    <label htmlFor="businessWebsite" className="block text-sm font-medium text-gray-700 mb-2">
                      Business Website
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="businessWebsite"
                        type="url"
                        {...register('businessWebsite')}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="businessPhone" className="block text-sm font-medium text-gray-700 mb-2">
                      Business Phone
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="businessPhone"
                        type="tel"
                        {...register('businessPhone')}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter business phone"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="businessEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Business Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="businessEmail"
                        type="email"
                        {...register('businessEmail')}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter business email"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700 mb-2">
                      Business Description
                    </label>
                    <textarea
                      id="businessDescription"
                      rows={3}
                      {...register('businessDescription')}
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Describe your business..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="py-3 px-8 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Completing profile...
                  </div>
                ) : (
                  'Complete Profile'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfilePage;
