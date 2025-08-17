import React from 'react';

const GaneshaLogo = ({ className = '', size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    '2xl': 'w-24 h-24'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circles and geometric elements */}
          <circle cx="100" cy="100" r="95" stroke="#000" strokeWidth="0.5" fill="none" opacity="0.3"/>
          <circle cx="100" cy="100" r="85" stroke="#000" strokeWidth="0.5" fill="none" opacity="0.2"/>
          <circle cx="100" cy="100" r="75" stroke="#000" strokeWidth="0.5" fill="none" opacity="0.1"/>
          
          {/* Connecting lines */}
          <line x1="25" y1="100" x2="175" y2="100" stroke="#000" strokeWidth="0.5" opacity="0.2"/>
          <line x1="100" y1="25" x2="100" y2="175" stroke="#000" strokeWidth="0.5" opacity="0.2"/>
          
          {/* Diagonal lines */}
          <line x1="35" y1="35" x2="165" y2="165" stroke="#000" strokeWidth="0.5" opacity="0.1"/>
          <line x1="165" y1="35" x2="35" y2="165" stroke="#000" strokeWidth="0.5" opacity="0.1"/>
          
          {/* India map silhouette */}
          <path
            d="M 60 140 Q 65 135 70 140 Q 75 145 80 140 Q 85 135 90 140 Q 95 145 100 140 Q 105 135 110 140 Q 115 145 120 140 Q 125 135 130 140 Q 135 145 140 140 Q 145 135 150 140 Q 155 145 160 140 L 160 150 Q 155 155 150 150 Q 145 145 140 150 Q 135 155 130 150 Q 125 145 120 150 Q 115 155 110 150 Q 105 145 100 150 Q 95 155 90 150 Q 85 145 80 150 Q 75 155 70 150 Q 65 145 60 150 Z"
            fill="#000"
            opacity="0.8"
          />
          
          {/* Ganesha figure */}
          <g transform="translate(100, 120)">
            {/* Body */}
            <ellipse cx="0" cy="0" rx="12" ry="15" fill="#000" opacity="0.9"/>
            
            {/* Head */}
            <circle cx="0" cy="-20" r="10" fill="#000" opacity="0.9"/>
            
            {/* Trunk */}
            <path
              d="M -2 -18 Q -8 -15 -10 -10 Q -8 -5 -2 -8"
              stroke="#000"
              strokeWidth="1.5"
              fill="none"
              opacity="0.9"
            />
            
            {/* Ears */}
            <ellipse cx="-6" cy="-22" rx="3" ry="5" fill="#000" opacity="0.9"/>
            <ellipse cx="6" cy="-22" rx="3" ry="5" fill="#000" opacity="0.9"/>
            
            {/* Arms */}
            <line x1="-8" y1="-5" x2="-15" y2="-10" stroke="#000" strokeWidth="2" opacity="0.9"/>
            <line x1="8" y1="-5" x2="15" y2="-10" stroke="#000" strokeWidth="2" opacity="0.9"/>
            <line x1="-8" y1="0" x2="-15" y2="5" stroke="#000" strokeWidth="2" opacity="0.9"/>
            <line x1="8" y1="0" x2="15" y2="5" stroke="#000" strokeWidth="2" opacity="0.9"/>
            
            {/* Crown */}
            <path
              d="M -8 -28 L -4 -32 L 0 -30 L 4 -32 L 8 -28"
              stroke="#000"
              strokeWidth="1"
              fill="none"
              opacity="0.9"
            />
            
            {/* Tilak */}
            <circle cx="0" cy="-18" r="1" fill="#000" opacity="0.9"/>
          </g>
          
          {/* Geometric nodes */}
          <circle cx="25" cy="25" r="2" fill="#000" opacity="0.6"/>
          <circle cx="175" cy="25" r="2" fill="#000" opacity="0.6"/>
          <circle cx="25" cy="175" r="2" fill="#000" opacity="0.6"/>
          <circle cx="175" cy="175" r="2" fill="#000" opacity="0.6"/>
          
          {/* Compass-like symbols */}
          <g transform="translate(25, 25)">
            <circle cx="0" cy="0" r="3" fill="none" stroke="#000" strokeWidth="0.5" opacity="0.4"/>
            <line x1="-3" y1="0" x2="3" y2="0" stroke="#000" strokeWidth="0.5" opacity="0.4"/>
            <line x1="0" y1="-3" x2="0" y2="3" stroke="#000" strokeWidth="0.5" opacity="0.4"/>
          </g>
          
          <g transform="translate(175, 25)">
            <circle cx="0" cy="0" r="3" fill="none" stroke="#000" strokeWidth="0.5" opacity="0.4"/>
            <line x1="-3" y1="0" x2="3" y2="0" stroke="#000" strokeWidth="0.5" opacity="0.4"/>
            <line x1="0" y1="-3" x2="0" y2="3" stroke="#000" strokeWidth="0.5" opacity="0.4"/>
          </g>
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <h1 className="text-2xl font-serif font-bold text-gray-900">Bharat Vastra</h1>
          <p className="text-xs text-gray-500 -mt-1">Premium Indian Fashion</p>
        </div>
      )}
    </div>
  );
};

export default GaneshaLogo;
