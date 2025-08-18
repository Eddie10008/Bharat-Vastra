import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Eye, 
  Plus,
  Settings,
  Truck,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const SellerDashboardPage = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/sellers/dashboard', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const stats = dashboardData?.stats || {
    totalProducts: 0,
    activeProducts: 0,
    totalOrders: 0,
    pendingOrders: 0
  };

  const recentOrders = dashboardData?.recentOrders || [];
  const topProducts = dashboardData?.topProducts || [];

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  const QuickActionCard = ({ title, description, icon: Icon, link, color }) => (
    <Link to={link} className="block">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );

  const OrderStatusBadge = ({ status }) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      confirmed: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
      processing: { color: 'bg-purple-100 text-purple-800', icon: Settings },
      shipped: { color: 'bg-green-100 text-green-800', icon: Truck },
      delivered: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      cancelled: { color: 'bg-red-100 text-red-800', icon: AlertCircle }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container-max px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-900">Seller Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {user?.businessName || user?.firstName}! Manage your products and orders
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

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-max px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'orders', label: 'Orders', icon: ShoppingCart },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'dropshipping', label: 'Dropshipping', icon: Truck },
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
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Products"
                value={stats.totalProducts}
                icon={Package}
                color="bg-blue-500"
                change={12}
              />
              <StatCard
                title="Active Products"
                value={stats.activeProducts}
                icon={CheckCircle}
                color="bg-green-500"
                change={8}
              />
              <StatCard
                title="Total Orders"
                value={stats.totalOrders}
                icon={ShoppingCart}
                color="bg-purple-500"
                change={15}
              />
              <StatCard
                title="Pending Orders"
                value={stats.pendingOrders}
                icon={Clock}
                color="bg-orange-500"
                change={-5}
              />
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <QuickActionCard
                  title="Add New Product"
                  description="List a new product in your catalog"
                  icon={Plus}
                  link="/seller/products/new"
                  color="bg-blue-500"
                />
                <QuickActionCard
                  title="Manage Orders"
                  description="View and process customer orders"
                  icon={ShoppingCart}
                  link="/seller/orders"
                  color="bg-green-500"
                />
                <QuickActionCard
                  title="Dropshipping Setup"
                  description="Configure dropshipping suppliers"
                  icon={Truck}
                  link="/seller/dropshipping"
                  color="bg-purple-500"
                />
                <QuickActionCard
                  title="Analytics"
                  description="View detailed sales analytics"
                  icon={TrendingUp}
                  link="/seller/analytics"
                  color="bg-orange-500"
                />
                <QuickActionCard
                  title="Business Settings"
                  description="Update business information"
                  icon={Settings}
                  link="/seller/settings"
                  color="bg-gray-500"
                />
                <QuickActionCard
                  title="Calendar"
                  description="View upcoming deliveries"
                  icon={Calendar}
                  link="/seller/calendar"
                  color="bg-indigo-500"
                />
              </div>
            </div>

            {/* Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                </div>
                <div className="p-6">
                  {recentOrders.length > 0 ? (
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">#{order.orderNumber}</p>
                            <p className="text-sm text-gray-600">
                              {order.customer?.firstName} {order.customer?.lastName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.orderDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">${order.total}</p>
                            <OrderStatusBadge status={order.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No recent orders</p>
                  )}
                  <div className="mt-4">
                    <Link to="/seller/orders" className="text-orange-600 hover:text-orange-700 font-medium">
                      View all orders →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Top Selling Products</h3>
                </div>
                <div className="p-6">
                  {topProducts.length > 0 ? (
                    <div className="space-y-4">
                      {topProducts.map((product, index) => (
                        <div key={product._id} className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-lg font-bold text-gray-600">#{index + 1}</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-600">${product.price?.retail}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">{product.totalSold || 0}</p>
                            <p className="text-sm text-gray-500">sold</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No products yet</p>
                  )}
                  <div className="mt-4">
                    <Link to="/seller/products" className="text-orange-600 hover:text-orange-700 font-medium">
                      View all products →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Product Management</h2>
                <Link to="/seller/products/new" className="btn-primary">
                  Add New Product
                </Link>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600">Product management interface coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Order Management</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600">Order management interface coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Analytics & Reports</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600">Analytics dashboard coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'dropshipping' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Dropshipping Management</h2>
                <button className="btn-primary">Add Supplier</button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600">Dropshipping interface coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Business Settings</h2>
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

export default SellerDashboardPage;
