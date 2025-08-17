import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Heart, ShoppingCart, Star, Grid, List, ChevronDown } from 'lucide-react';
import { AUSTRALIA_CONFIG, formatCurrency } from '../config/australia';
import GaneshaLogo from '../components/common/GaneshaLogo';
import DecorativePattern from '../components/common/DecorativePattern';
import ProductCard from '../components/common/ProductCard';

const ProductsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'indian-attire', name: 'Indian Attire', subcategories: [
      { id: 'all', name: 'All Attire' },
      { id: 'sari', name: 'Sarees' },
      { id: 'lehenga', name: 'Lehengas' },
      { id: 'kurta', name: 'Kurtas' },
      { id: 'salwar-kameez', name: 'Salwar Kameez' }
    ]},
    { id: 'jewelry', name: 'Jewelry', subcategories: [
      { id: 'all', name: 'All Jewelry' },
      { id: 'necklace', name: 'Necklaces' },
      { id: 'earrings', name: 'Earrings' },
      { id: 'bangles', name: 'Bangles' },
      { id: 'rings', name: 'Rings' }
    ]},
    { id: 'accessories', name: 'Accessories', subcategories: [
      { id: 'all', name: 'All Accessories' },
      { id: 'bags', name: 'Bags' },
      { id: 'shoes', name: 'Shoes' },
      { id: 'scarves', name: 'Scarves' }
    ]}
  ];

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
      images: [
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      ],
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
      images: [
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      ],
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
      images: [
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      ],
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
      images: [
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      ],
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
      images: [
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      ],
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
      images: [
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      ],
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
      images: [
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      ],
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
      images: [
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      ],
      description: 'Elegant silk dupatta with beautiful border work.',
      isNew: false,
      isWholesale: false,
      colors: ['Pink', 'Blue', 'Yellow'],
      sizes: ['Standard']
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSubcategory = selectedSubcategory === 'all' || product.subcategory === selectedSubcategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesSubcategory && matchesPrice;
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

  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-max px-4 py-8">
          <div className="flex items-center justify-center mb-6">
            <GaneshaLogo size="xl" showText={false} />
          </div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 text-center mb-4">
            Our Collection
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Discover our curated collection of premium Indian attire and jewelry, 
            each piece crafted with care to celebrate our rich cultural heritage.
          </p>
        </div>
      </div>

      {/* Filters and Search Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container-max px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubcategory('all');
                }}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>

              {currentCategory?.subcategories && (
                <select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                >
                  {currentCategory.subcategories.map(subcategory => (
                    <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                  ))}
                </select>
              )}

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-3 ${viewMode === 'grid' ? 'bg-gray-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-3 ${viewMode === 'list' ? 'bg-gray-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="flex-1"
              />
              <span className="text-sm text-gray-600">
                ${priceRange[0]} - ${formatCurrency(priceRange[1])}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container-max px-4 py-12">
        <div className="relative">
          {/* Decorative background patterns */}
          <div className="absolute top-0 left-0 opacity-5">
            <DecorativePattern variant="mandala" size="xl" opacity={0.3} />
          </div>
          <div className="absolute bottom-0 right-0 opacity-5">
            <DecorativePattern variant="mandala" size="xl" opacity={0.3} />
          </div>
          
          <div className="relative">
            {/* Results Count */}
            <div className="mb-8">
              <p className="text-gray-600">
                Showing {sortedProducts.length} of {products.length} products
              </p>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {sortedProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    viewMode={viewMode}
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
                    Try adjusting your search criteria or browse our full collection.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setSelectedSubcategory('all');
                      setPriceRange([0, 1000]);
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

      {/* CTA Section */}
      <section className="section-padding spiritual-gradient text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Contact us for custom orders, wholesale inquiries, or to request specific products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-black hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Contact Us
            </Link>
            <Link
              to="/products?isWholesale=true"
              className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Wholesale Inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
