import React from 'react';
import GaneshaLogo from '../components/common/GaneshaLogo';
import DecorativePattern from '../components/common/DecorativePattern';

const ProductsPage = () => {
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

      {/* Main Content */}
      <div className="container-max px-4 py-12">
        <div className="relative">
          {/* Decorative background patterns */}
          <div className="absolute top-0 left-0 opacity-5">
            <DecorativePattern variant="mandala" size="xl" opacity={0.3} />
          </div>
          <div className="absolute bottom-0 right-0 opacity-5">
            <DecorativePattern variant="mandala" size="xl" opacity={0.3} />
          </div>
          
          <div className="relative text-center">
            <div className="ganesha-border rounded-2xl p-8 bg-white shadow-soft">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-600 mb-6">
                We're preparing something special for you. Our product catalog will be available soon!
              </p>
              <div className="flex justify-center">
                <DecorativePattern variant="default" size="lg" opacity={0.2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
