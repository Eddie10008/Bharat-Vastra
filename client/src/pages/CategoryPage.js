import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Star, Heart, ShoppingCart, ArrowRight } from 'lucide-react';
import { AUSTRALIA_CONFIG, formatCurrency } from '../config/australia';
import GaneshaLogo from '../components/common/GaneshaLogo';
import DecorativePattern from '../components/common/DecorativePattern';
import ProductCard from '../components/common/ProductCard';

const CategoryPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const subcategory = searchParams.get('subcategory');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const categories = {
    'indian-attire': {
      name: 'Indian Attire',
      description: 'Discover our stunning collection of traditional and contemporary Indian clothing, from elegant sarees to modern fusion wear.',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      subcategories: {
        'sari': {
          name: 'Sarees',
          description: 'Elegant traditional sarees with modern touches',
          image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        'lehenga': {
          name: 'Lehengas',
          description: 'Bridal and party lehengas for special occasions',
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        'kurta': {
          name: 'Kurtas',
          description: 'Modern and traditional kurtas for everyday wear',
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        'salwar-kameez': {
          name: 'Salwar Kameez',
          description: 'Comfortable and stylish salwar kameez sets',
          image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
      }
    },
    'jewelry': {
      name: 'Jewelry',
      description: 'Exquisite Indian jewelry that complements your traditional and contemporary looks.',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      subcategories: {
        'necklace': {
          name: 'Necklaces',
          description: 'Stunning necklaces and chokers',
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        'earrings': {
          name: 'Earrings',
          description: 'Beautiful earrings for every occasion',
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        'bangles': {
          name: 'Bangles',
          description: 'Traditional and modern bangles',
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        'rings': {
          name: 'Rings',
          description: 'Elegant rings and finger jewelry',
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
      }
    },
    'accessories': {
      name: 'Accessories',
      description: 'Complete your look with our beautiful accessories and footwear.',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      subcategories: {
        'bags': {
          name: 'Bags',
          description: 'Stylish bags and clutches',
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        'shoes': {
          name: 'Shoes',
          description: 'Traditional and modern footwear',
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        'scarves': {
          name: 'Scarves & Dupattas',
          description: 'Beautiful scarves and dupattas',
          image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
      }
    }
  };

  const products = [
    {
      id: 1,
      name: 'Elegant Silk Saree with Zari Work',
      category: 'indian-attire',
      subcategory: 'sari',
      price: 299,
      originalPrice: 399,
      rating: 4.8,
      reviews: 24,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Beautiful silk saree with intricate zari work, perfect for special occasions.',
      isNew: true,
      isWholesale: false,
      colors: ['Red', 'Green', 'Blue'],
      sizes: ['Free Size']
    },
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
    },
    {
      id: 5,
      name: 'Designer Salwar Kameez Set',
      category: 'indian-attire',
      subcategory: 'salwar-kameez',
      price: 159,
      originalPrice: 199,
      rating: 4.5,
      reviews: 28,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Elegant salwar kameez set with matching dupatta.',
      isNew: false,
      isWholesale: false,
      colors: ['Pink', 'Yellow', 'Orange'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 6,
      name: 'Pearl Drop Earrings',
      category: 'jewelry',
      subcategory: 'earrings',
      price: 79,
      originalPrice: 99,
      rating: 4.4,
      reviews: 21,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Beautiful pearl drop earrings perfect for any occasion.',
      isNew: false,
      isWholesale: false,
      colors: ['White', 'Pink'],
      sizes: ['One Size']
    },
    {
      id: 7,
      name: 'Embroidered Jutti Shoes',
      category: 'accessories',
      subcategory: 'shoes',
      price: 69,
      originalPrice: 89,
      rating: 4.3,
      reviews: 12,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Traditional embroidered jutti shoes with modern comfort.',
      isNew: true,
      isWholesale: true,
      colors: ['Red', 'Green', 'Gold'],
      sizes: ['5', '6', '7', '8', '9']
    },
    {
      id: 8,
      name: 'Silk Dupatta with Border',
      category: 'accessories',
      subcategory: 'scarves',
      price: 49,
      originalPrice: 69,
      rating: 4.2,
      reviews: 19,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Elegant silk dupatta with beautiful border work.',
      isNew: false,
      isWholesale: false,
      colors: ['Pink', 'Blue', 'Yellow'],
      sizes: ['Standard']
    }
  ];

  const currentCategory = categories[category];
  const currentSubcategory = subcategory ? currentCategory?.subcategories[subcategory] : null;

  const filteredProducts = products.filter(product => {
    const matchesCategory = product.category === category;
    const matchesSubcategory = !subcategory || product.subcategory === subcategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesColors = selectedColors.length === 0 || 
                         selectedColors.some(color => product.colors.includes(color));
    const matchesSizes = selectedSizes.length === 0 || 
                        selectedSizes.some(size => product.sizes.includes(size));
    
    return matchesCategory && matchesSubcategory && matchesSearch && matchesPrice && matchesColors && matchesSizes;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.isNew - a.isNew;
      default:
        return 0;
    }
  });

  const availableColors = [...new Set(products.flatMap(p => p.colors))];
  const availableSizes = [...new Set(products.flatMap(p => p.sizes))];

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
          <Link to="/products" className="btn-primary">Browse All Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
        <div className="absolute inset-0 ganesha-pattern opacity-30"></div>
        <div className="absolute top-10 left-10 opacity-10">
          <DecorativePattern variant="mandala" size="xl" opacity={0.3} />
        </div>
        <div className="relative container-max px-4 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-8">
                <GaneshaLogo size="2xl" showText={true} />
              </div>
              <h1 className="text-4xl lg:text-6xl font-serif font-bold text-black mb-6">
                {currentCategory.name}
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                {currentCategory.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2 ganesha-border"
                >
                  <span>View All Products</span>
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/contact"
                  className="btn-outline text-lg px-8 py-4 ganesha-border"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 spiritual-border rounded-2xl overflow-hidden">
                <img
                  src={currentCategory.image}
                  alt={currentCategory.name}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gray-200 rounded-full animate-float cosmic-dots">
                <DecorativePattern variant="minimal" size="full" opacity={0.2} />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gray-300 rounded-full animate-float-delayed geometric-grid">
                <DecorativePattern variant="minimal" size="full" opacity={0.2} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategories Section */}
      {!subcategory && (
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-black mb-4">
                Explore {currentCategory.name}
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Discover our diverse collection within this category.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(currentCategory.subcategories).map(([key, subcat]) => (
                <Link
                  key={key}
                  to={`/category/${category}?subcategory=${key}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-xl shadow-soft group-hover:shadow-medium transition-all duration-300 spiritual-border">
                    <img
                      src={subcat.image}
                      alt={subcat.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-semibold mb-2">{subcat.name}</h3>
                      <p className="text-sm text-gray-200">{subcat.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Subcategory Header */}
      {subcategory && currentSubcategory && (
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-black mb-4">
                {currentSubcategory.name}
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                {currentSubcategory.description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Filters and Products Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-soft p-6 spiritual-border sticky top-4">
                <h3 className="text-lg font-semibold text-black mb-6">Filters</h3>
                
                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${formatCurrency(priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Colors */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
                  <div className="space-y-2">
                    {availableColors.map(color => (
                      <label key={color} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(color)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedColors([...selectedColors, color]);
                            } else {
                              setSelectedColors(selectedColors.filter(c => c !== color));
                            }
                          }}
                          className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{color}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
                  <div className="space-y-2">
                    {availableSizes.map(size => (
                      <label key={size} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedSizes.includes(size)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSizes([...selectedSizes, size]);
                            } else {
                              setSelectedSizes(selectedSizes.filter(s => s !== size));
                            }
                          }}
                          className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setPriceRange([0, 1000]);
                    setSelectedColors([]);
                    setSelectedSizes([]);
                    setSortBy('featured');
                  }}
                  className="w-full btn-outline"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Results Count */}
              <div className="mb-8">
                <p className="text-gray-600">
                  Showing {sortedProducts.length} of {products.filter(p => p.category === category).length} products
                </p>
              </div>

              {/* Products Grid */}
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {sortedProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      viewMode="grid"
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="ganesha-border rounded-2xl p-8 bg-white shadow-soft">
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                      No Products Found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your filters or browse our full collection.
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setPriceRange([0, 1000]);
                        setSelectedColors([]);
                        setSelectedSizes([]);
                        setSortBy('featured');
                      }}
                      className="btn-primary px-6 py-3"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding spiritual-gradient text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
            Need Help Finding the Perfect Piece?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Our team is here to help you find exactly what you're looking for.
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
              Browse All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
