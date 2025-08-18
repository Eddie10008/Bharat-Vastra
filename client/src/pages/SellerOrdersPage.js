import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Eye, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Download,
  Printer,
  MessageSquare,
  Calendar,
  DollarSign,
  Package,
  User,
  MapPin,
  Phone,
  Mail,
  MoreVertical,
  ArrowRight,
  Star
} from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const SellerOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalOrders: 0
  });

  useEffect(() => {
    fetchOrders();
  }, [pagination.currentPage, statusFilter, dateFilter, sortBy]);

  const fetchOrders = async () => {
    try {
      const params = new URLSearchParams({
        page: pagination.currentPage,
        limit: 10,
        status: statusFilter !== 'all' ? statusFilter : '',
        sortBy
      });

      if (dateFilter !== 'all') {
        const today = new Date();
        let startDate;
        
        switch (dateFilter) {
          case 'today':
            startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            break;
          case 'week':
            startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
          case 'month':
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            break;
          default:
            break;
        }
        
        if (startDate) {
          params.append('startDate', startDate.toISOString());
        }
      }

      const response = await fetch(`/api/sellers/orders?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
        setPagination(data.pagination || pagination);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer?.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/sellers/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleBulkStatusUpdate = async (newStatus) => {
    if (selectedOrders.length === 0) return;

    try {
      const response = await fetch('/api/sellers/orders/bulk-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          orderIds: selectedOrders,
          status: newStatus
        })
      });

      if (response.ok) {
        fetchOrders();
        setSelectedOrders([]);
      }
    } catch (error) {
      console.error('Error updating bulk order status:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
      confirmed: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle, label: 'Confirmed' },
      processing: { color: 'bg-purple-100 text-purple-800', icon: Package, label: 'Processing' },
      shipped: { color: 'bg-green-100 text-green-800', icon: Truck, label: 'Shipped' },
      delivered: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Delivered' },
      cancelled: { color: 'bg-red-100 text-red-800', icon: AlertCircle, label: 'Cancelled' },
      returned: { color: 'bg-orange-100 text-orange-800', icon: AlertCircle, label: 'Returned' },
      refunded: { color: 'bg-gray-100 text-gray-800', icon: DollarSign, label: 'Refunded' }
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

  const getStatusActions = (order) => {
    const actions = [];
    
    switch (order.status) {
      case 'pending':
        actions.push(
          { label: 'Confirm', action: 'confirmed', color: 'bg-blue-600 hover:bg-blue-700' },
          { label: 'Cancel', action: 'cancelled', color: 'bg-red-600 hover:bg-red-700' }
        );
        break;
      case 'confirmed':
        actions.push(
          { label: 'Process', action: 'processing', color: 'bg-purple-600 hover:bg-purple-700' },
          { label: 'Cancel', action: 'cancelled', color: 'bg-red-600 hover:bg-red-700' }
        );
        break;
      case 'processing':
        actions.push(
          { label: 'Ship', action: 'shipped', color: 'bg-green-600 hover:bg-green-700' }
        );
        break;
      case 'shipped':
        actions.push(
          { label: 'Mark Delivered', action: 'delivered', color: 'bg-green-600 hover:bg-green-700' }
        );
        break;
    }
    
    return actions;
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
              <h1 className="text-3xl font-serif font-bold text-gray-900">Order Management</h1>
              <p className="text-gray-600 mt-1">
                Process orders, manage deliveries, and handle customer inquiries
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="btn-secondary flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
              <button className="btn-secondary flex items-center space-x-2">
                <Printer className="h-4 w-4" />
                <span>Print</span>
              </button>
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
                  placeholder="Search orders by number, customer name, or email..."
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
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
                <option value="returned">Returned</option>
              </select>

              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount-high">Amount High to Low</option>
                <option value="amount-low">Amount Low to High</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <div className="bg-orange-50 border-b border-orange-200">
          <div className="container-max px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-orange-800">
                {selectedOrders.length} order{selectedOrders.length !== 1 ? 's' : ''} selected
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkStatusUpdate('confirmed')}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  Confirm All
                </button>
                <button
                  onClick={() => handleBulkStatusUpdate('processing')}
                  className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                >
                  Process All
                </button>
                <button
                  onClick={() => handleBulkStatusUpdate('shipped')}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  Ship All
                </button>
                <button
                  onClick={() => setSelectedOrders([])}
                  className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders List */}
      <div className="container-max px-4 py-8">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery || statusFilter !== 'all' || dateFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'No orders have been placed yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedOrders([...selectedOrders, order._id]);
                          } else {
                            setSelectedOrders(selectedOrders.filter(id => id !== order._id));
                          }
                        }}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          #{order.orderNumber}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(order.orderDate).toLocaleDateString()} at {new Date(order.orderDate).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {getStatusBadge(order.status)}
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">${order.total}</p>
                        <p className="text-sm text-gray-500">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Customer Information */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Customer Information
                      </h4>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">{order.customer?.firstName} {order.customer?.lastName}</span>
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {order.customer?.email}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {order.customer?.phone}
                        </p>
                      </div>
                    </div>

                    {/* Shipping Information */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        Shipping Address
                      </h4>
                      <div className="text-sm text-gray-600">
                        <p>{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
                        <p>{order.shippingAddress?.street}</p>
                        <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}</p>
                        <p>{order.shippingAddress?.country}</p>
                      </div>
                    </div>

                    {/* Order Actions */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Actions</h4>
                      <div className="space-y-2">
                        {getStatusActions(order).map((action) => (
                          <button
                            key={action.action}
                            onClick={() => handleStatusUpdate(order._id, action.action)}
                            className={`w-full px-3 py-2 text-sm text-white rounded ${action.color} transition-colors`}
                          >
                            {action.label}
                          </button>
                        ))}
                        <Link
                          to={`/seller/orders/${order._id}`}
                          className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors flex items-center justify-center"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                            {item.product?.images?.[0] ? (
                              <img
                                src={item.product.images[0].url}
                                alt={item.product.name}
                                className="w-full h-full object-cover rounded"
                              />
                            ) : (
                              <Package className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.product?.name}</p>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity} | ${item.finalPrice}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">${item.totalPrice}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalOrders} total orders)
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPagination({...pagination, currentPage: pagination.currentPage - 1})}
                disabled={pagination.currentPage === 1}
                className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-3 py-2 text-sm text-gray-700">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => setPagination({...pagination, currentPage: pagination.currentPage + 1})}
                disabled={pagination.currentPage === pagination.totalPages}
                className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerOrdersPage;
