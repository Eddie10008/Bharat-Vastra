import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Package, 
  Truck,
  MoreVertical,
  Download,
  Upload,
  Copy,
  Star,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Globe,
  Phone,
  Mail,
  MapPin,
  Settings,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const SellerDropshippingPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [dropshipProducts, setDropshipProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('suppliers');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetchDropshippingData();
  }, []);

  const fetchDropshippingData = async () => {
    try {
      // Fetch suppliers and dropship products
      const [suppliersResponse, productsResponse] = await Promise.all([
        fetch('/api/sellers/dropshipping/suppliers', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }),
        fetch('/api/sellers/dropshipping/products', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
      ]);

      if (suppliersResponse.ok) {
        const suppliersData = await suppliersResponse.json();
        setSuppliers(suppliersData.suppliers || []);
      }

      if (productsResponse.ok) {
        const productsData = await productsResponse.json();
        setDropshipProducts(productsData.products || []);
      }
    } catch (error) {
      console.error('Error fetching dropshipping data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncSupplier = async (supplierId) => {
    try {
      const response = await fetch(`/api/sellers/dropshipping/suppliers/${supplierId}/sync`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        fetchDropshippingData();
      }
    } catch (error) {
      console.error('Error syncing supplier:', error);
    }
  };

  const handleImportProduct = async (productId) => {
    try {
      const response = await fetch(`/api/sellers/dropshipping/products/${productId}/import`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        fetchDropshippingData();
      }
    } catch (error) {
      console.error('Error importing product:', error);
    }
  };

  const getSupplierStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Active' },
      inactive: { color: 'bg-red-100 text-red-800', icon: AlertCircle, label: 'Inactive' },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
      syncing: { color: 'bg-blue-100 text-blue-800', icon: RefreshCw, label: 'Syncing' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const getProductStatusBadge = (status) => {
    const statusConfig = {
      available: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Available' },
      'out-of-stock': { color: 'bg-red-100 text-red-800', icon: AlertCircle, label: 'Out of Stock' },
      imported: { color: 'bg-blue-100 text-blue-800', icon: Package, label: 'Imported' },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </span>
    );
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
              <h1 className="text-3xl font-serif font-bold text-gray-900">Dropshipping Management</h1>
              <p className="text-gray-600 mt-1">
                Manage your dropshipping suppliers and import products automatically
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="btn-secondary flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Import CSV</span>
              </button>
              <Link
                to="/seller/dropshipping/suppliers/new"
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Supplier</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-max px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'suppliers', label: 'Suppliers', icon: Users },
              { id: 'products', label: 'Dropship Products', icon: Package },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
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

      {/* Main Content */}
      <div className="container-max px-4 py-8">
        {activeTab === 'suppliers' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search suppliers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Suppliers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suppliers.map((supplier) => (
                <div key={supplier._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Globe className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{supplier.name}</h3>
                          <p className="text-sm text-gray-500">{supplier.type}</p>
                        </div>
                      </div>
                      {getSupplierStatusBadge(supplier.status)}
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        {supplier.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        {supplier.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {supplier.location}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-gray-500">Products</p>
                        <p className="font-semibold text-gray-900">{supplier.productCount || 0}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Sync Status</p>
                        <p className="font-semibold text-gray-900">
                          {supplier.lastSync ? new Date(supplier.lastSync).toLocaleDateString() : 'Never'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleSyncSupplier(supplier._id)}
                        className="flex-1 px-3 py-2 text-sm bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors flex items-center justify-center"
                      >
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Sync
                      </button>
                      <Link
                        to={`/seller/dropshipping/suppliers/${supplier._id}`}
                        className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {suppliers.length === 0 && (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No suppliers found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by adding your first dropshipping supplier
                </p>
                <div className="mt-6">
                  <Link
                    to="/seller/dropshipping/suppliers/new"
                    className="btn-primary"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Supplier
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search dropship products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="all">All Status</option>
                    <option value="available">Available</option>
                    <option value="out-of-stock">Out of Stock</option>
                    <option value="imported">Imported</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dropshipProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-100">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    
                    {/* Status Overlay */}
                    <div className="absolute top-2 left-2">
                      {getProductStatusBadge(product.status)}
                    </div>

                    {/* Supplier Badge */}
                    <div className="absolute top-2 right-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {product.supplier?.name}
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                    
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-900">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        {product.stock} in stock
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex items-center space-x-2">
                      <button
                        onClick={() => handleImportProduct(product._id)}
                        className="flex-1 px-3 py-2 text-sm bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
                      >
                        Import
                      </button>
                      <button className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {dropshipProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No dropship products found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Sync your suppliers to see available dropship products
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Dropshipping Analytics</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600">Analytics dashboard coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Dropshipping Settings</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600">Settings interface coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDropshippingPage;
