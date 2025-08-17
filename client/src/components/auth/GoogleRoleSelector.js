import React, { useState } from 'react';
import { X, Shirt, Building, Crown } from 'lucide-react';

const GoogleRoleSelector = ({ isOpen, onClose, onRoleSelect, userInfo }) => {
  const [selectedRole, setSelectedRole] = useState('customer');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');

  const handleSubmit = () => {
    const businessInfo = selectedRole === 'customer' ? null : {
      businessName,
      businessType
    };
    onRoleSelect(selectedRole, businessInfo);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Welcome to Bharat Vastra!</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {userInfo && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              {userInfo.googlePicture && (
                <img
                  src={userInfo.googlePicture}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <p className="font-semibold text-gray-900">
                  {userInfo.firstName} {userInfo.lastName}
                </p>
                <p className="text-sm text-gray-600">{userInfo.email}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Role</h3>
          <div className="space-y-3">
            {/* Customer Role */}
            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedRole === 'customer'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedRole('customer')}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shirt className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Customer</h4>
                  <p className="text-sm text-gray-600">Shop for Indian fashion</p>
                </div>
              </div>
            </div>

            {/* Seller Role */}
            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedRole === 'seller'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedRole('seller')}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Building className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Seller</h4>
                  <p className="text-sm text-gray-600">Sell Indian fashion products</p>
                </div>
              </div>
            </div>

            {/* Wholesaler Role */}
            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedRole === 'wholesaler'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedRole('wholesaler')}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Crown className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Wholesaler</h4>
                  <p className="text-sm text-gray-600">Bulk orders and premium access</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Information for Sellers/Wholesalers */}
        {(selectedRole === 'seller' || selectedRole === 'wholesaler') && (
          <div className="mb-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter business name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type
              </label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
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
        )}

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedRole !== 'customer' && (!businessName || !businessType)}
            className="flex-1 py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleRoleSelector;
