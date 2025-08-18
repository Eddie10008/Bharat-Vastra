import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import GaneshaLogo from '../common/GaneshaLogo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const categories = [
    { name: 'Sarees', path: '/category/indian-attire?subcategory=sari' },
    { name: 'Lehengas', path: '/category/indian-attire?subcategory=lehenga' },
    { name: 'Kurtas', path: '/category/indian-attire?subcategory=kurta' },
    { name: 'Jewelry', path: '/category/jewelry' },
  ];

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-divine-purple-600 to-divine-orange-500 text-white py-3">
        <div className="container-max px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <span className="font-medium">🪔 Premium Indian Attire & Jewelry</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">Free Shipping on Orders Above $150</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="tel:+91-XXXXXXXXXX" className="hover:text-divine-yellow-200 transition-colors duration-300">
                📞 +91-XXXXXXXXXX
              </a>
              <a href="mailto:support@bharatvastra.com" className="hover:text-divine-yellow-200 transition-colors duration-300">
                ✉️ support@bharatvastra.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container-max px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <GaneshaLogo size="lg" showText={true} />
          </Link>

          {/* Search bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for sarees, lehengas, jewelry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-divine-purple-600 transition-colors duration-300"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-6">
            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-3 text-gray-600 hover:text-divine-purple-600 transition-all duration-300 hover:bg-divine-purple-50 rounded-xl">
              <Heart size={24} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-divine-purple-600 to-divine-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold shadow-lg">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-3 text-gray-600 hover:text-divine-purple-600 transition-all duration-300 hover:bg-divine-purple-50 rounded-xl">
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-divine-purple-600 to-divine-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold shadow-lg">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-3 p-3 text-gray-600 hover:text-divine-purple-600 transition-all duration-300 hover:bg-divine-purple-50 rounded-xl"
                >
                  <User size={24} />
                  <span className="hidden md:block text-sm font-semibold">
                    {user?.firstName || 'User'}
                  </span>
                </button>

                {/* Dropdown menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 animate-fade-in">
                    <Link
                      to="/profile"
                      className="block px-6 py-3 text-sm text-gray-700 hover:bg-divine-purple-50 transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-6 py-3 text-sm text-gray-700 hover:bg-divine-purple-50 transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    {user?.role === 'seller' && (
                      <Link
                        to="/seller/dashboard"
                        className="block px-6 py-3 text-sm text-gray-700 hover:bg-divine-purple-50 transition-colors duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Seller Dashboard
                      </Link>
                    )}
                    <hr className="my-3 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-6 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-300 flex items-center space-x-3"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="btn-ghost"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 text-gray-600 hover:text-divine-purple-600 transition-all duration-300 hover:bg-divine-purple-50 rounded-xl"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="lg:hidden mt-6">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for sarees, lehengas, jewelry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-divine-purple-600 transition-colors duration-300"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-gray-200">
        <div className="container-max px-4">
          <div className="flex items-center justify-between">
            <div className="hidden lg:flex items-center space-x-8">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="py-4 text-gray-700 hover:text-black font-medium transition-colors"
                >
                  {category.name}
                </Link>
              ))}
              <Link
                to="/products"
                className="py-4 text-gray-700 hover:text-black font-medium transition-colors"
              >
                All Products
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/products?isWholesale=true"
                className="py-4 text-gray-600 hover:text-black font-medium transition-colors"
              >
                Wholesale
              </Link>
              {(user?.role === 'seller' || user?.role === 'wholesaler') && (
                <Link
                  to="/seller/dashboard"
                  className="py-4 text-orange-600 hover:text-orange-700 font-medium transition-colors flex items-center space-x-1"
                >
                  <span>🏪</span>
                  <span>Seller Portal</span>
                </Link>
              )}
              <Link
                to="/about"
                className="py-4 text-gray-700 hover:text-black font-medium transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="py-4 text-gray-700 hover:text-black font-medium transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="block py-2 text-gray-700 hover:text-black transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <Link
              to="/products"
              className="block py-2 text-gray-700 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
            <hr className="my-2" />
            <Link
              to="/products?isWholesale=true"
              className="block py-2 text-gray-600 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Wholesale
            </Link>
            <Link
              to="/about"
              className="block py-2 text-gray-700 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-gray-700 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
