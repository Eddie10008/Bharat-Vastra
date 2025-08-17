import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, ShoppingCart } from 'lucide-react';
import { AUSTRALIA_CONFIG, formatCurrency } from '../config/australia';
import GaneshaLogo from '../components/common/GaneshaLogo';
import DecorativePattern from '../components/common/DecorativePattern';

const HomePage = () => {
  const featuredCategories = [
    {
      name: 'Sarees',
      description: 'Elegant traditional sarees',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      path: '/category/indian-attire?subcategory=sari'
    },
    {
      name: 'Lehengas',
      description: 'Bridal and party lehengas',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      path: '/category/indian-attire?subcategory=lehenga'
    },
    {
      name: 'Jewelry',
      description: 'Traditional Indian jewelry',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      path: '/category/jewelry'
    },
    {
      name: 'Kurtas',
      description: 'Modern and traditional kurtas',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      path: '/category/indian-attire?subcategory=kurta'
    }
  ];

  const features = [
    {
      icon: '🪔',
      title: 'Spiritual Heritage',
      description: 'Curated collection of genuine Indian attire and jewelry with spiritual significance'
    },
    {
      icon: '🚚',
      title: 'Divine Delivery',
      description: `Free shipping on orders above ${formatCurrency(AUSTRALIA_CONFIG.shipping.freeThreshold)} across Australia`
    },
    {
      icon: '🔒',
      title: 'Sacred Security',
      description: 'Multiple secure payment options including Afterpay, PayPal and cards'
    },
    {
      icon: '✨',
      title: 'Blessed Quality',
      description: 'Handpicked premium materials and divine craftsmanship'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative divine-gradient overflow-hidden">
        <div className="absolute inset-0 chakra-pattern"></div>
        <div className="absolute top-10 left-10 opacity-10">
          <DecorativePattern variant="mandala" size="xl" opacity={0.4} />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10">
          <DecorativePattern variant="mandala" size="xl" opacity={0.4} />
        </div>
        <div className="relative container-max px-4 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-6">
                <GaneshaLogo size="xl" showText={false} />
              </div>
              <h1 className="text-4xl lg:text-6xl font-serif font-bold text-gray-900 mb-6">
                Discover the Essence of{' '}
                <span className="gradient-text">Spiritual Fashion</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                From traditional sarees to contemporary fusion wear, explore our curated collection 
                of premium Indian attire and jewelry that celebrates our rich spiritual heritage and cultural traditions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2 ganesha-border"
                >
                  <span>Shop Now</span>
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/products?isWholesale=true"
                  className="btn-outline text-lg px-8 py-4 ganesha-border"
                >
                  Wholesale
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 ganesha-border rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Indian Fashion"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-spiritual-orange-200 rounded-full animate-float">
                <DecorativePattern variant="minimal" size="full" opacity={0.3} />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-spiritual-purple-200 rounded-full animate-float-delayed">
                <DecorativePattern variant="minimal" size="full" opacity={0.3} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding earth-gradient">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
              Why Choose Bharat Vastra?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We bring you the finest Indian fashion with spiritual significance, divine craftsmanship, and exceptional service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-spiritual-orange-100 to-spiritual-yellow-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ganesha-border">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our diverse collection of Indian attire and jewelry for every occasion.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCategories.map((category, index) => (
              <Link
                key={index}
                to={category.path}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-xl shadow-soft group-hover:shadow-medium transition-shadow duration-300">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-200">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked collection of premium Indian fashion.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Sample Product Cards */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="card-hover group">
                <div className="relative overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80&v=${item}`}
                    alt="Product"
                    className="w-full h-64 object-cover product-image"
                  />
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <button className="w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors">
                      <Heart size={16} className="text-gray-600" />
                    </button>
                    <button className="w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors">
                      <ShoppingCart size={16} className="text-gray-600" />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="badge-primary">New</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Elegant Silk Saree</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">(24 reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">{formatCurrency(299)}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">{formatCurrency(399)}</span>
                    </div>
                    <span className="text-sm text-green-600 font-medium">25% OFF</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2 mx-auto w-fit"
            >
              <span>View All Products</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding spiritual-gradient text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
            Ready to Experience Divine Fashion?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of customers who trust Bharat Vastra for spiritual and authentic Indian attire and jewelry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-spiritual-gold-500 hover:bg-spiritual-gold-600 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Start Shopping
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white hover:bg-white hover:text-spiritual-purple-600 font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
