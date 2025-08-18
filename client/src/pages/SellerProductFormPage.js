import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, 
  X, 
  Upload, 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff,
  Package,
  Truck,
  Settings,
  DollarSign,
  Tag,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const SellerProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    price: {
      retail: 0,
      wholesale: 0
    },
    stock: {
      total: 0,
      available: 0
    },
    status: 'draft',
    isWholesale: false,
    dropshipping: {
      enabled: false,
      supplierId: '',
      markupPercentage: 0
    }
  });

  const [activeTab, setActiveTab] = useState('basic');

  const categories = [
    { value: 'sari', label: 'Sarees' },
    { value: 'lehenga', label: 'Lehengas' },
    { value: 'kurta', label: 'Kurtas' },
    { value: 'bangles', label: 'Bangles' },
    { value: 'necklaces', label: 'Necklaces' },
    { value: 'earrings', label: 'Earrings' }
  ];

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/sellers/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProduct(data.product);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setProduct(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProduct(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = async (status = 'draft') => {
    setSaving(true);
    try {
      const productData = {
        ...product,
        status
      };

      const url = id ? `/api/sellers/products/${id}` : '/api/sellers/products';
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        const data = await response.json();
        navigate(`/seller/products/${data.product._id}/edit`);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container-max px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-900">
                {id ? 'Edit Product' : 'Add New Product'}
              </h1>
              <p className="text-gray-600 mt-1">
                {id ? 'Update your product information' : 'Create a new product listing'}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/seller/products')}
                className="btn-secondary flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={() => handleSave('draft')}
                disabled={saving}
                className="btn-secondary flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Draft</span>
              </button>
              <button
                onClick={() => handleSave('active')}
                disabled={saving}
                className="btn-primary flex items-center space-x-2"
              >
                <CheckCircle className="h-4 w-4" />
                <span>{saving ? 'Saving...' : 'Publish Product'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-max px-4">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'basic', label: 'Basic Info', icon: Package },
              { id: 'pricing', label: 'Pricing & Stock', icon: DollarSign },
              { id: 'dropshipping', label: 'Dropshipping', icon: Truck }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Form Content */}
      <div className="container-max px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'basic' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand *
                  </label>
                  <input
                    type="text"
                    value={product.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter brand name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={product.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={product.isWholesale}
                      onChange={(e) => handleInputChange('isWholesale', e.target.checked)}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Wholesale Product</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={product.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter detailed product description"
                />
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Pricing & Stock</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Retail Price (AUD) *
                  </label>
                  <input
                    type="number"
                    value={product.price.retail}
                    onChange={(e) => handleInputChange('price.retail', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wholesale Price (AUD)
                  </label>
                  <input
                    type="number"
                    value={product.price.wholesale}
                    onChange={(e) => handleInputChange('price.wholesale', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Stock *
                  </label>
                  <input
                    type="number"
                    value={product.stock.total}
                    onChange={(e) => handleInputChange('stock.total', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Stock
                  </label>
                  <input
                    type="number"
                    value={product.stock.available}
                    onChange={(e) => handleInputChange('stock.available', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dropshipping' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Dropshipping Settings</h2>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={product.dropshipping.enabled}
                    onChange={(e) => handleInputChange('dropshipping.enabled', e.target.checked)}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Enable Dropshipping</span>
                </label>
              </div>

              {product.dropshipping.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supplier
                    </label>
                    <select
                      value={product.dropshipping.supplierId}
                      onChange={(e) => handleInputChange('dropshipping.supplierId', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">Select supplier</option>
                      {/* This would be populated with actual suppliers */}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Markup Percentage
                    </label>
                    <input
                      type="number"
                      value={product.dropshipping.markupPercentage}
                      onChange={(e) => handleInputChange('dropshipping.markupPercentage', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="0"
                      step="0.01"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerProductFormPage;
