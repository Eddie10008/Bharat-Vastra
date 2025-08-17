import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, Heart, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { AUSTRALIA_CONFIG, formatCurrency } from '../config/australia';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import GaneshaLogo from '../components/common/GaneshaLogo';
import DecorativePattern from '../components/common/DecorativePattern';

const CartPage = () => {
  const { 
    items: cartItems, 
    total, 
    itemCount, 
    numerologyDiscount, 
    numerologyDiscountAmount,
    updateQuantity, 
    removeFromCart, 
    clearCart,
    getShippingCost,
    getTotalWithShipping,
    getTax,
    getFinalTotal
  } = useCart();
  
  const { user } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const removeItem = (itemId) => {
    removeFromCart(itemId);
  };

  const moveToWishlist = (itemId) => {
    // Move item to wishlist logic here
    console.log('Moving item to wishlist:', itemId);
    removeItem(itemId);
  };

  const applyCoupon = () => {
    // Mock coupon logic
    if (couponCode.toLowerCase() === 'welcome10') {
      setAppliedCoupon({
        code: 'WELCOME10',
        discount: 10,
        type: 'percentage'
      });
    } else if (couponCode.toLowerCase() === 'save20') {
      setAppliedCoupon({
        code: 'SAVE20',
        discount: 20,
        type: 'fixed'
      });
    } else {
      alert('Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  // Calculate subtotal for display purposes
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      couponDiscount = (subtotal * appliedCoupon.discount) / 100;
    } else {
      couponDiscount = appliedCoupon.discount;
    }
  }

  const recommendedProducts = [
    {
      id: 4,
      name: 'Bridal Lehenga Set with Dupatta',
      price: 599,
      originalPrice: 799,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.9,
      reviews: 18
    },
    {
      id: 5,
      name: 'Pearl Drop Earrings',
      price: 79,
      originalPrice: 99,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.4,
      reviews: 21
    },
    {
      id: 6,
      name: 'Embroidered Jutti Shoes',
      price: 69,
      originalPrice: 89,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.3,
      reviews: 12
    }
  ];

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-max px-4 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <GaneshaLogo size="2xl" showText={true} />
            </div>
            <div className="ganesha-border rounded-2xl p-12 bg-white shadow-soft max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={40} className="text-gray-400" />
              </div>
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. Start shopping to discover our beautiful collection of Indian attire and jewelry.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/products"
                  className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2"
                >
                  <span>Start Shopping</span>
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/category/indian-attire"
                  className="btn-outline text-lg px-8 py-4"
                >
                  Browse Sarees
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-max px-4 py-8">
          <div className="flex items-center justify-center mb-6">
            <GaneshaLogo size="xl" showText={false} />
          </div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 text-center mb-4">
            Shopping Cart
          </h1>
          <p className="text-gray-600 text-center">
            Review your items and proceed to checkout
          </p>
        </div>
      </div>

      <div className="container-max px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-soft spiritual-border overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Cart Items ({cartItems.length})
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="spiritual-border rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover"
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {item.name}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                              {item.color && (
                                <div className="flex items-center space-x-2">
                                  <span>Color:</span>
                                  <div
                                    className="w-4 h-4 rounded-full border border-gray-300"
                                    style={{ backgroundColor: item.color.toLowerCase() }}
                                  ></div>
                                  <span>{item.color}</span>
                                </div>
                              )}
                              {item.size && (
                                <div>
                                  <span>Size: {item.size}</span>
                                </div>
                              )}
                            </div>
                            
                            {/* Price */}
                            <div className="flex items-center space-x-3">
                              <span className="text-lg font-bold text-gray-900">
                                {formatCurrency(item.price)}
                              </span>
                              {item.originalPrice > item.price && (
                                <>
                                  <span className="text-sm text-gray-500 line-through">
                                    {formatCurrency(item.originalPrice)}
                                  </span>
                                  <span className="text-sm text-green-600 font-medium">
                                    Save {formatCurrency(item.originalPrice - item.price)}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col items-end space-y-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-3 py-1 hover:bg-gray-100"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-4 py-1 border-x border-gray-300">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-1 hover:bg-gray-100"
                                disabled={item.quantity >= item.stock}
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-2">
                              <button
                                onClick={() => moveToWishlist(item.id)}
                                className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                                title="Move to Wishlist"
                              >
                                <Heart size={16} />
                              </button>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                                title="Remove Item"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Stock Warning */}
                        {item.quantity >= item.stock && (
                          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm text-yellow-800">
                              Only {item.stock} items left in stock
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft spiritual-border p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Coupon Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coupon Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                    <span className="text-sm text-green-800">
                      Coupon {appliedCoupon.code} applied
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-sm text-green-600 hover:text-green-800"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                
                {/* Numerology Discount */}
                {numerologyDiscount > 0 && (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      <span className="text-gray-600">Numerology Discount</span>
                    </div>
                    <span className="text-purple-600 font-medium">-{formatCurrency(numerologyDiscountAmount)}</span>
                  </div>
                )}
                
                {couponDiscount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coupon Discount</span>
                    <span className="text-green-600 font-medium">-{formatCurrency(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {getShippingCost() === 0 ? 'Free' : formatCurrency(getShippingCost())}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={20} />
              </Link>

              {/* Continue Shopping */}
              <Link
                to="/products"
                className="w-full btn-outline text-lg py-4 mt-4 flex items-center justify-center"
              >
                Continue Shopping
              </Link>

              {/* Numerology Info */}
              {user?.numerology?.lifePathNumber && (
                <div className="mt-6 p-4 rounded-lg border-2 border-dashed"
                     style={{ borderColor: user.numerology.colors?.primary || '#FF6B35' }}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <h3 className="text-sm font-medium text-gray-900">Your Numerology Discount</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Life Path Number {user.numerology.lifePathNumber} - {user.numerology.profile?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    You're receiving a {numerologyDiscount}% discount based on your life path number!
                  </p>
                </div>
              )}

              {/* Shipping Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Shipping Information</h3>
                <p className="text-sm text-gray-600">
                  Free shipping on orders above {formatCurrency(AUSTRALIA_CONFIG.shipping.freeThreshold)}
                </p>
                {getShippingCost() > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    Add {formatCurrency(AUSTRALIA_CONFIG.shipping.freeThreshold - subtotal)} more for free shipping
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              You Might Also Like
            </h2>
            <p className="text-gray-600">
              Complete your look with these beautiful pieces
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendedProducts.map((product) => (
              <div key={product.id} className="group card-hover ganesha-border rounded-xl overflow-hidden transition-all duration-300 hover:scale-105">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <button className="w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors">
                      <Heart size={16} className="text-gray-600" />
                    </button>
                    <button className="w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors">
                      <ShoppingBag size={16} className="text-gray-600" />
                    </button>
                  </div>
                  {product.originalPrice > product.price && (
                    <div className="absolute top-4 left-4">
                      <span className="badge-primary">Sale</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">{formatCurrency(product.price)}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          {formatCurrency(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CartPage;
