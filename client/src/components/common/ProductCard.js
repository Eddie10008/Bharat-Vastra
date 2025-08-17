import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Sparkles } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrency } from '../../config/australia';
import { calculateDiscount } from '../../utils/numerologyCalculator';
import DecorativePattern from './DecorativePattern';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const finalPrice = product.price;
  const originalPrice = product.originalPrice;
  
  // Calculate numerology discount
  const numerologyDiscount = user?.numerology?.lifePathNumber 
    ? calculateDiscount(user.numerology.lifePathNumber, finalPrice)
    : null;

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-soft spiritual-border overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="relative md:w-64 md:h-64 w-full h-48 overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Decorative corner pattern */}
            <div className="absolute top-2 right-2 opacity-20">
              <DecorativePattern variant="minimal" size="sm" opacity={0.3} />
            </div>
            
            {/* Wishlist button */}
            <button
              onClick={handleWishlistToggle}
              className="absolute top-2 left-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <Heart 
                size={16} 
                className={`${
                  isInWishlist(product.id) 
                    ? 'fill-red-500 text-red-500' 
                    : 'text-gray-600'
                } transition-colors`}
              />
            </button>

            {/* Sale badge */}
            {originalPrice && finalPrice < originalPrice && (
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-divine-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                SALE
              </div>
            )}

            {/* New badge */}
            {product.isNew && (
              <div className="absolute bottom-2 left-2 bg-divine-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                NEW
              </div>
            )}

            {/* Wholesale badge */}
            {product.isWholesale && (
              <div className="absolute bottom-2 right-2 bg-divine-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                WHOLESALE
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 p-6">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                </div>
                <div className="flex items-center space-x-1 ml-4">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  {formatCurrency(finalPrice)}
                </span>
                {originalPrice && finalPrice < originalPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {formatCurrency(originalPrice)}
                    </span>
                    <span className="text-sm text-green-600 font-medium">
                      {Math.round(((originalPrice - finalPrice) / originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
                {/* Numerology Discount */}
                {numerologyDiscount && numerologyDiscount.percentage > 0 && (
                  <div className="flex items-center space-x-1">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-purple-600 font-medium">
                      -{numerologyDiscount.percentage}%
                    </span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div>
                  <span className="text-sm font-medium text-gray-700">Category:</span>
                  <span className="text-sm text-gray-600 ml-2 capitalize">{product.category}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Colors:</span>
                  <span className="text-sm text-gray-600 ml-2">{product.colors.join(', ')}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Sizes:</span>
                  <span className="text-sm text-gray-600 ml-2">{product.sizes.join(', ')}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4 mt-auto">
                <button
                  onClick={handleAddToCart}
                  className="btn-primary flex items-center space-x-2"
                >
                  <ShoppingCart size={16} />
                  <span>Add to Cart</span>
                </button>
                <Link
                  to={`/product/${product.id}`}
                  className="btn-outline"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <Link 
      to={`/product/${product.id}`}
      className="group card-hover ganesha-border rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover product-image group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Decorative corner pattern */}
        <div className="absolute top-2 right-2 opacity-20">
          <DecorativePattern variant="minimal" size="sm" opacity={0.3} />
        </div>
        
        {/* Wishlist button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 left-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Heart 
            size={16} 
            className={`${
              isInWishlist(product.id) 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-600'
            } transition-colors`}
          />
        </button>

        {/* Quick add to cart */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors opacity-0 group-hover:opacity-100"
        >
          <ShoppingCart size={16} />
        </button>

        {/* Sale badge */}
        {originalPrice && finalPrice < originalPrice && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            SALE
          </div>
        )}

        {/* New badge */}
        {product.isNew && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            NEW
          </div>
        )}

        {/* Wholesale badge */}
        {product.isWholesale && (
          <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            WHOLESALE
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
          <span className="text-xs text-gray-500 capitalize">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            {formatCurrency(finalPrice)}
          </span>
          {originalPrice && finalPrice < originalPrice && (
            <>
              <span className="text-sm text-gray-500 line-through">
                {formatCurrency(originalPrice)}
              </span>
              <span className="text-xs text-green-600 font-medium">
                {Math.round(((originalPrice - finalPrice) / originalPrice) * 100)}% OFF
              </span>
            </>
          )}
          {/* Numerology Discount */}
          {numerologyDiscount && numerologyDiscount.percentage > 0 && (
            <div className="flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-purple-500" />
              <span className="text-xs text-purple-600 font-medium">
                -{numerologyDiscount.percentage}%
              </span>
            </div>
          )}
        </div>

        {/* Colors */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <span className="text-xs text-gray-500">Colors:</span>
            <div className="flex space-x-1">
              {product.colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                ></div>
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-gray-400">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
