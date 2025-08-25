import React, { useState, useEffect } from 'react';
import { Image } from 'lucide-react';

const AIImageLoader = ({ 
  src, 
  alt, 
  fallbackType = 'product', 
  category = null,
  className = '',
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setImageSrc(src);
    setLoading(true);
    setError(false);
  }, [src]);

  const handleImageError = async () => {
    if (error) return; // Prevent infinite loop
    
    setError(true);
    setLoading(true);

    try {
      // Try to get AI-generated image based on fallback type
      let aiImageUrl = null;

      if (fallbackType === 'product' && category) {
        // Try to get category-specific AI image
        aiImageUrl = `/uploads/ai-generated/categories/category-${category.toLowerCase().replace(/\s+/g, '-')}*.jpg`;
      } else if (fallbackType === 'pattern') {
        // Try to get a pattern image
        aiImageUrl = `/uploads/ai-generated/patterns/pattern-indian-mandala-pattern*.png`;
      } else {
        // Default fallback
        aiImageUrl = `/uploads/ai-generated/products/product-*.jpg`;
      }

      // For now, we'll use a placeholder with AI-generated styling
      // In a real implementation, you'd fetch the actual AI image from your server
      setImageSrc(`/uploads/ai-generated/placeholder-${fallbackType}.jpg`);
    } catch (err) {
      // Final fallback to a simple placeholder
      setImageSrc(`data:image/svg+xml;base64,${btoa(`
        <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
          <circle cx="200" cy="200" r="80" fill="none" stroke="#333" stroke-width="2"/>
          <circle cx="200" cy="200" r="40" fill="#666"/>
          <text x="200" y="220" text-anchor="middle" font-family="Arial" font-size="12" fill="#666">AI Generated</text>
        </svg>
      `)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleImageLoad = () => {
    setLoading(false);
    setError(false);
  };

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <Image className="w-8 h-8 text-gray-400 animate-pulse" />
        </div>
      )}
      
      <img
        src={imageSrc}
        alt={alt}
        onError={handleImageError}
        onLoad={handleImageLoad}
        className={`w-full h-full object-cover ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        {...props}
      />
      
      {error && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <div className="text-center">
            <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-xs text-gray-500">AI Generated</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIImageLoader;
