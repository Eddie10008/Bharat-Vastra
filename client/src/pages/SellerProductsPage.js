import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Package, 
  Truck,
  MoreVertical,
  Download,
  Upload,
  Copy,
  Star,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const SellerProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/sellers/products', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-high':
        return b.price.retail - a.price.retail;
      case 'price-low':
        return a.price.retail - b.price.retail;
      case 'stock':
        return b.stock.available - a.stock.available;
      default:
        return 0;
    }
  });

  const handleProductSelection = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleBulkAction = async (action) => {
    if (selectedProducts.length === 0) return;

    try {
      const response = await fetch('/api/sellers/products/bulk-action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          productIds: selectedProducts,
          action
        })
      });

      if (response.ok) {
        fetchProducts();
        setSelectedProducts([]);
        setShowBulkActions(false);
      }
    } catch (error) {
      console.error('Error performing bulk action:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: { color: 'bg-gray-100 text-gray-800', label: 'Draft' },
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      inactive: { color: 'bg-red-100 text-red-800', label: 'Inactive' },
      'out-of-stock': { color: 'bg-orange-100 text-orange-800', label: 'Out of Stock' },
      discontinued: { color: 'bg-red-100 text-red-800', label: 'Discontinued' }
    };

    const config = statusConfig[status] || statusConfig.draft;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getStockStatus = (stock) => {
    if (stock.available <= 0) {
      return { color: 'text-red-600', label: 'Out of Stock' };
    } else if (stock.available <= 10) {
      return { color: 'text-orange-600', label: 'Low Stock' };
    } else {
      return { color: 'text-green-600', label: 'In Stock' };
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
              <h1 className="text-3xl font-serif font-bold text-gray-900">Product Management</h1>
              <p className="text-gray-600 mt-1">
                Manage your product catalog, inventory, and dropshipping suppliers
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                to="/seller/products/new"
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Product</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-max px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="out-of-stock">Out of Stock</option>
                <option value="discontinued">Discontinued</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="all">All Categories</option>
                <option value="sari">Sarees</option>
                <option value="lehenga">Lehengas</option>
                <option value="kurta">Kurtas</option>
                <option value="bangles">Bangles</option>
                <option value="necklaces">Necklaces</option>
                <option value="earrings">Earrings</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
                <option value="price-high">Price High to Low</option>
                <option value="price-low">Price Low to High</option>
                <option value="stock">Stock Level</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="bg-orange-50 border-b border-orange-200">
          <div className="container-max px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-orange-800">
                {selectedProducts.length} product{selectedProducts.length !== 1 ? 's' : ''} selected
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkAction('activate')}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  Activate
                </button>
                <button
                  onClick={() => handleBulkAction('deactivate')}
                  className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                >
                  Deactivate
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedProducts([])}
                  className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="container-max px-4 py-8">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first product'}
            </p>
            <div className="mt-6">
              <Link
                to="/seller/products/new"
                className="btn-primary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0].url}
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
                    {getStatusBadge(product.status)}
                  </div>

                  {/* Selection Checkbox */}
                  <div className="absolute top-2 right-2">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product._id)}
                      onChange={() => handleProductSelection(product._id)}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-1">
                      <button className="p-1 bg-white rounded shadow-sm hover:bg-gray-50">
                        <Eye className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-1 bg-white rounded shadow-sm hover:bg-gray-50">
                        <Edit className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      ${product.price?.retail}
                    </span>
                    <span className={`text-sm font-medium ${getStockStatus(product.stock).color}`}>
                      {product.stock.available} in stock
                    </span>
                  </div>

                  {/* Product Stats */}
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Star className="h-3 w-3" />
                      <span>{product.ratings?.average || 0}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-3 w-3" />
                      <span>{product.ratings?.count || 0} reviews</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      to={`/seller/products/${product._id}/edit`}
                      className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Edit
                    </Link>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {sortedProducts.length > 0 && (
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing {sortedProducts.length} of {products.length} products
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                Previous
              </button>
              <span className="px-3 py-2 text-sm text-gray-700">Page 1 of 1</span>
              <button className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerProductsPage;
