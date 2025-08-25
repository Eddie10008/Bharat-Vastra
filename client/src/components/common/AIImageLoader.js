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
      // Try to get accurate AI-generated image based on category
      let aiImageUrl = null;

      if (fallbackType === 'product' && category) {
        // Try to get accurate category-specific AI image
        const categoryLower = category.toLowerCase();
        aiImageUrl = `/uploads/ai-generated/products/accurate-${categoryLower}-*.jpg`;
        
        // Set a specific accurate image based on category
        const accurateImages = {
          'sarees': '/uploads/ai-generated/products/accurate-sarees-329a5251-9751-4185-b6b0-23b3b3040f32.jpg',
          'lehengas': '/uploads/ai-generated/products/accurate-lehengas-c261943a-0f6d-4d62-af0b-09d4be4d090b.jpg',
          'kurtis': '/uploads/ai-generated/products/accurate-kurtis-c9181d20-27c0-4125-95f4-6d80673694a7.jpg',
          'jewelry': '/uploads/ai-generated/products/accurate-jewelry-15bceaaf-e562-4059-b4fd-481711f8451c.jpg',
          'anarkalis': '/uploads/ai-generated/products/accurate-lehengas-18842218-517f-4591-9508-f5a6ca7d4b0f.jpg'
        };
        
        const specificImage = accurateImages[categoryLower];
        if (specificImage) {
          setImageSrc(specificImage);
        } else {
          // Fallback to any accurate image for the category
          setImageSrc(`/uploads/ai-generated/products/accurate-${categoryLower}-*.jpg`);
        }
      } else if (fallbackType === 'pattern') {
        // Try to get a pattern image
        setImageSrc('/uploads/ai-generated/patterns/pattern-indian-mandala-pattern-c2623f76-2f76-434f-8989-34af48b9aff6.png');
      } else {
        // Default fallback to accurate product image
        setImageSrc('/uploads/ai-generated/products/accurate-sarees-329a5251-9751-4185-b6b0-23b3b3040f32.jpg');
      }
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
