import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`${sizeClasses[size]} relative`}>
        {/* Outer rotating circle */}
        <div className="absolute inset-0 border-2 border-spiritual-purple-200 border-t-spiritual-gold-500 rounded-full animate-spin"></div>
        
        {/* Inner geometric pattern */}
        <div className="absolute inset-2 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Concentric circles */}
            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1" fill="none" className="text-spiritual-red-300"/>
            <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" fill="none" className="text-spiritual-orange-400"/>
            <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" fill="none" className="text-spiritual-yellow-500"/>
            
            {/* Central dot */}
            <circle cx="50" cy="50" r="3" fill="currentColor" className="text-spiritual-purple-600"/>
            
            {/* Connecting lines */}
            <line x1="15" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-spiritual-green-200"/>
            <line x1="50" y1="15" x2="50" y2="85" stroke="currentColor" strokeWidth="0.5" className="text-spiritual-blue-200"/>
          </svg>
        </div>
      </div>
      
      {text && (
        <p className="text-sm text-gray-600 font-medium">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
