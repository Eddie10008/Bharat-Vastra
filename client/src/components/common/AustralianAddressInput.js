import React, { useState } from 'react';
import { AUSTRALIA_CONFIG, validatePostcode } from '../../config/australia';

const AustralianAddressInput = ({ 
  value = {}, 
  onChange, 
  errors = {}, 
  required = true,
  label = 'Address',
  className = ''
}) => {
  const [postcodeError, setPostcodeError] = useState('');

  const handleChange = (field, val) => {
    const newValue = { ...value, [field]: val };
    
    // Validate postcode
    if (field === 'postcode' && val) {
      if (!validatePostcode(val)) {
        setPostcodeError('Please enter a valid 4-digit Australian postcode');
      } else {
        setPostcodeError('');
      }
    }
    
    onChange(newValue);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
      
      {/* Street Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Street Address {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          value={value.street || ''}
          onChange={(e) => handleChange('street', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.street ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="123 Main Street"
          required={required}
        />
        {errors.street && (
          <p className="mt-1 text-sm text-red-600">{errors.street}</p>
        )}
      </div>

      {/* Suburb */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Suburb {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          value={value.suburb || ''}
          onChange={(e) => handleChange('suburb', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.suburb ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Surry Hills"
          required={required}
        />
        {errors.suburb && (
          <p className="mt-1 text-sm text-red-600">{errors.suburb}</p>
        )}
      </div>

      {/* City and State */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City {required && <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            value={value.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Sydney"
            required={required}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State {required && <span className="text-red-500">*</span>}
          </label>
          <select
            value={value.state || ''}
            onChange={(e) => handleChange('state', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.state ? 'border-red-500' : 'border-gray-300'
            }`}
            required={required}
          >
            <option value="">Select State</option>
            {AUSTRALIA_CONFIG.address.states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state}</p>
          )}
        </div>
      </div>

      {/* Postcode */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Postcode {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          value={value.postcode || ''}
          onChange={(e) => handleChange('postcode', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.postcode || postcodeError ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="2000"
          maxLength="4"
          required={required}
        />
        {(errors.postcode || postcodeError) && (
          <p className="mt-1 text-sm text-red-600">{errors.postcode || postcodeError}</p>
        )}
      </div>

      {/* Country (hidden, always Australia) */}
      <input
        type="hidden"
        value="Australia"
        onChange={() => {}} // No-op since it's always Australia
      />
    </div>
  );
};

export default AustralianAddressInput;
