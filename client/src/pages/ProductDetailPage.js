import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Share2, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { AUSTRALIA_CONFIG, formatCurrency } from '../config/australia';
import GaneshaLogo from '../components/common/GaneshaLogo';
import DecorativePattern from '../components/common/DecorativePattern';
import ProductCard from '../components/common/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in a real app, this would come from an API
  const product = {
    id: parseInt(id) || 1,
    name: 'Elegant Silk Saree with Zari Work',
    category: 'indian-attire',
    subcategory: 'sari',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 24,
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Beautiful silk saree with intricate zari work, perfect for special occasions. This elegant piece features traditional craftsmanship with modern design elements, making it suitable for weddings, festivals, and other important celebrations.',
    longDescription: `This exquisite silk saree showcases the finest craftsmanship with intricate zari work that tells a story of tradition and elegance. The fabric is sourced from the finest silk weavers, ensuring both comfort and durability.

The design features traditional motifs that have been passed down through generations, combined with contemporary elements that make it perfect for modern celebrations. The zari work adds a touch of luxury while maintaining the authentic Indian aesthetic.

Perfect for:
- Wedding ceremonies
- Festival celebrations
- Cultural events
- Special occasions

Care Instructions:
- Dry clean only
- Store in a cool, dry place
- Avoid direct sunlight
- Use a padded hanger for storage`,
    isNew: true,
    isWholesale: false,
    colors: ['Red', 'Green', 'Blue', 'Purple'],
    sizes: ['Free Size'],
    stock: 15,
    sku: 'SAR-001',
    brand: 'Bharat Vastra',
    material: 'Pure Silk',
    care: 'Dry Clean Only',
    weight: '500g',
    dimensions: '5.5m x 1.2m',
    features: [
      'Handcrafted zari work',
      'Pure silk fabric',
      'Traditional motifs',
      'Modern design elements',
      'Comfortable drape',
      'Durable construction'
    ]
  };

  const reviews = [
    {
      id: 1,
      user: 'Priya S.',
      rating: 5,
      date: '2024-01-15',
      title: 'Absolutely Beautiful!',
      comment: 'This saree is absolutely stunning! The zari work is exquisite and the fabric quality is outstanding. Perfect for my sister\'s wedding.'
    },
    {
      id: 2,
      user: 'Rajesh K.',
      rating: 4,
      date: '2024-01-10',
      title: 'Great Quality',
      comment: 'Bought this for my wife\'s birthday. She loved it! The color is vibrant and the workmanship is excellent. Highly recommended.'
    },
    {
      id: 3,
      user: 'Anjali M.',
      rating: 5,
      date: '2024-01-05',
      title: 'Perfect for Special Occasions',
      comment: 'Wore this to a family function and received so many compliments! The saree drapes beautifully and the embroidery is flawless.'
    }
  ];

  const relatedProducts = [
    {
      id: 2,
      name: 'Bridal Lehenga Set with Dupatta',
      category: 'indian-attire',
      subcategory: 'lehenga',
      price: 599,
      originalPrice: 799,
      rating: 4.9,
      reviews: 18,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Stunning bridal lehenga with heavy embroidery and matching dupatta.',
      isNew: true,
      isWholesale: true,
      colors: ['Pink', 'Red', 'Purple'],
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      id: 3,
      name: 'Traditional Kundan Necklace Set',
      category: 'jewelry',
      subcategory: 'necklace',
      price: 199,
      originalPrice: 249,
      rating: 4.7,
      reviews: 32,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Elegant kundan necklace set with matching earrings.',
      isNew: false,
      isWholesale: false,
      colors: ['Gold', 'Silver'],
      sizes: ['Adjustable']
    },
    {
      id: 4,
      name: 'Cotton Kurta with Embroidery',
      category: 'indian-attire',
      subcategory: 'kurta',
      price: 89,
      originalPrice: 119,
      rating: 4.6,
      reviews: 15,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Comfortable cotton kurta with beautiful embroidery work.',
      isNew: false,
      isWholesale: true,
      colors: ['White', 'Blue', 'Green'],
      sizes: ['S', 'M', 'L', 'XL']
    }
  ];

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', { product, selectedColor, selectedSize, quantity });
  };

  const handleWishlist = () => {
    // Add to wishlist logic here
    console.log('Added to wishlist:', product);
  };

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-max px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-gray-900">Products</Link>
            <span>/</span>
            <Link to={`/category/${product.category}`} className="hover:text-gray-900 capitalize">{product.category}</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="container-max px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative spiritual-border rounded-2xl overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                  <Heart size={20} className="text-gray-600" />
                </button>
                <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                  <Share2 size={20} className="text-gray-600" />
                </button>
              </div>
              {product.isNew && (
                <div className="absolute top-4 left-4 bg-green-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                  NEW
                </div>
              )}
              {discountPercentage > 0 && (
                <div className="absolute bottom-4 left-4 bg-red-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                  {discountPercentage}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative spiritual-border rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-gray-500' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star size={20} className="text-yellow-400 fill-current" />
                  <span className="text-lg font-semibold">{product.rating}</span>
                  <span className="text-gray-600">({product.reviews} reviews)</span>
                </div>
                <span className="text-gray-500">|</span>
                <span className="text-gray-600">SKU: {product.sku}</span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <p className="text-lg text-gray-700 mb-6">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                    <span className="text-lg text-green-600 font-medium">
                      Save {formatCurrency(product.originalPrice - product.price)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Color Selection */}
            {product.colors.length > 1 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-2 transition-colors ${
                        selectedColor === color ? 'border-gray-500' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    ></button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 1 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border-2 rounded-lg transition-colors ${
                        selectedSize === size
                          ? 'border-gray-500 bg-gray-500 text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
                <span className="text-gray-600">
                  {product.stock} items available
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>
              
              <button
                onClick={handleWishlist}
                className="w-full btn-outline text-lg py-4 flex items-center justify-center space-x-2"
              >
                <Heart size={20} />
                <span>Add to Wishlist</span>
              </button>
            </div>

            {/* Features */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping & Returns</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Truck size={20} className="text-gray-600" />
                  <span className="text-gray-700">Free shipping on orders above {formatCurrency(AUSTRALIA_CONFIG.shipping.freeThreshold)}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield size={20} className="text-gray-600" />
                  <span className="text-gray-700">30-day return policy</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw size={20} className="text-gray-600" />
                  <span className="text-gray-700">Easy exchanges</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Product Description</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {product.longDescription}
                  </p>
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Brand</span>
                      <span className="font-medium">{product.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Material</span>
                      <span className="font-medium">{product.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Care Instructions</span>
                      <span className="font-medium">{product.care}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight</span>
                      <span className="font-medium">{product.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dimensions</span>
                      <span className="font-medium">{product.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">SKU</span>
                      <span className="font-medium">{product.sku}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Customer Reviews</h2>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.title}</h4>
                          <p className="text-gray-600">{review.user}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={`${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                      <p className="text-sm text-gray-500 mt-2">{review.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-black mb-4">
              You Might Also Like
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Discover more beautiful pieces from our collection.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {relatedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                viewMode="grid"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding spiritual-gradient text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
            Need Help with Your Purchase?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Our team is here to help you find the perfect fit and answer any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-black hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Contact Us
            </Link>
            <Link
              to="/products"
              className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
