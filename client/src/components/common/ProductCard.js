import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import DecorativePattern from './DecorativePattern';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const finalPrice = product.finalPrice || product.price?.retail || product.price;
  const originalPrice = product.price?.mrp || product.price;

  return (
    <Link 
      to={`/product/${product._id}`}
      className="group card-hover ganesha-border rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
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
              isInWishlist(product._id) 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-600'
            } transition-colors`}
          />
        </button>

        {/* Quick add to cart */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 p-2 bg-spiritual-purple-600 text-white rounded-full hover:bg-spiritual-purple-700 transition-colors opacity-0 group-hover:opacity-100"
        >
          <ShoppingCart size={16} />
        </button>

        {/* Sale badge */}
        {product.finalPrice && product.finalPrice < originalPrice && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-spiritual-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            SALE
          </div>
        )}

        {/* Wholesale badge */}
        {product.isWholesale && (
          <div className="absolute bottom-2 left-2 bg-spiritual-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            WHOLESALE
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">{product.brand}</span>
          {product.rating && (
            <div className="flex items-center space-x-1">
              <Star size={12} className="text-yellow-400 fill-current" />
              <span className="text-xs text-gray-600">{product.rating}</span>
            </div>
          )}
        </div>

        {/* Product Name */}
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(finalPrice)}
          </span>
          {product.finalPrice && product.finalPrice < originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* Category */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 capitalize">
            {product.category}
          </span>
          
          {/* Stock status */}
          <span className={`text-xs px-2 py-1 rounded-full ${
            product.stock > 0 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
