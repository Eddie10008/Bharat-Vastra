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
        <img
          src="/assets/bharat-vastra-logo.jpeg"
          alt="Bharat Vastra Logo"
          className="w-full h-full object-contain"
          onError={(e) => {
            // Fallback to SVG if image fails to load
            e.target.style.display = 'none';
            const svgFallback = e.target.nextSibling;
            if (svgFallback) {
              svgFallback.style.display = 'block';
            }
          }}
        />
        {/* SVG fallback - hidden by default, shown if image fails to load */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full hidden"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'none' }}
        >
          {/* Main concentric circles - mandala structure */}
          <circle cx="100" cy="100" r="95" stroke="#000" strokeWidth="0.5" fill="none"/>
          <circle cx="100" cy="100" r="85" stroke="#000" strokeWidth="0.5" fill="none"/>
          <circle cx="100" cy="100" r="75" stroke="#000" strokeWidth="0.5" fill="none"/>
          <circle cx="100" cy="100" r="65" stroke="#000" strokeWidth="0.5" fill="none" strokeDasharray="2,2"/>
          <circle cx="100" cy="100" r="55" stroke="#000" strokeWidth="0.5" fill="none"/>
          
          {/* Connecting lines - cosmic grid */}
          <line x1="25" y1="100" x2="175" y2="100" stroke="#000" strokeWidth="0.5"/>
          <line x1="100" y1="25" x2="100" y2="175" stroke="#000" strokeWidth="0.5"/>
          <line x1="35" y1="35" x2="165" y2="165" stroke="#000" strokeWidth="0.5"/>
          <line x1="165" y1="35" x2="35" y2="165" stroke="#000" strokeWidth="0.5"/>
          
          {/* Curved orbital paths */}
          <path d="M 30 70 Q 100 50 170 70" stroke="#000" strokeWidth="0.5" fill="none"/>
          <path d="M 30 130 Q 100 150 170 130" stroke="#000" strokeWidth="0.5" fill="none"/>
          <path d="M 70 30 Q 50 100 70 170" stroke="#000" strokeWidth="0.5" fill="none"/>
          <path d="M 130 30 Q 150 100 130 170" stroke="#000" strokeWidth="0.5" fill="none"/>
          
          {/* India map silhouette - more detailed and accurate */}
          <path
            d="M 60 140 Q 65 135 70 140 Q 75 145 80 140 Q 85 135 90 140 Q 95 145 100 140 Q 105 135 110 140 Q 115 145 120 140 Q 125 135 130 140 Q 135 145 140 140 Q 145 135 150 140 Q 155 145 160 140 L 160 150 Q 155 155 150 150 Q 145 145 140 150 Q 135 155 130 150 Q 125 145 120 150 Q 115 155 110 150 Q 105 145 100 150 Q 95 155 90 150 Q 85 145 80 150 Q 75 155 70 150 Q 65 145 60 150 Z"
            fill="#000"
          />
          
          {/* State boundaries within India map */}
          <line x1="70" y1="145" x2="75" y2="145" stroke="#fff" strokeWidth="0.3"/>
          <line x1="85" y1="145" x2="90" y2="145" stroke="#fff" strokeWidth="0.3"/>
          <line x1="100" y1="145" x2="105" y2="145" stroke="#fff" strokeWidth="0.3"/>
          <line x1="115" y1="145" x2="120" y2="145" stroke="#fff" strokeWidth="0.3"/>
          <line x1="130" y1="145" x2="135" y2="145" stroke="#fff" strokeWidth="0.3"/>
          <line x1="80" y1="142" x2="85" y2="142" stroke="#fff" strokeWidth="0.3"/>
          <line x1="110" y1="142" x2="115" y2="142" stroke="#fff" strokeWidth="0.3"/>
          
          {/* Ganesha figure - more detailed and accurate to the real logo */}
          <g transform="translate(100, 125)">
            {/* Body - pot belly, seated in Padmasana */}
            <ellipse cx="0" cy="0" rx="12" ry="15" fill="#000"/>
            
            {/* Head - elephant head with more detail */}
            <circle cx="0" cy="-20" r="10" fill="#000"/>
            
            {/* Trunk - curled to left as in the real logo */}
            <path
              d="M -2 -18 Q -8 -15 -10 -10 Q -8 -5 -2 -8"
              stroke="#000"
              strokeWidth="1.5"
              fill="none"
            />
            
            {/* Ears - large elephant ears */}
            <ellipse cx="-6" cy="-22" rx="3" ry="5" fill="#000"/>
            <ellipse cx="6" cy="-22" rx="3" ry="5" fill="#000"/>
            
            {/* Four arms with traditional attributes */}
            {/* Upper right - axe (parashu) */}
            <line x1="8" y1="-5" x2="15" y2="-10" stroke="#000" strokeWidth="2"/>
            <path d="M 15 -10 L 18 -8 L 17 -6 L 14 -8 Z" fill="#000"/>
            
            {/* Upper left - noose (pasha) */}
            <line x1="-8" y1="-5" x2="-15" y2="-10" stroke="#000" strokeWidth="2"/>
            <ellipse cx="-15" cy="-10" rx="2" ry="1" fill="#000"/>
            
            {/* Lower right - blessing gesture (Abhaya Mudra) */}
            <line x1="8" y1="0" x2="15" y2="5" stroke="#000" strokeWidth="2"/>
            <path d="M 15 5 L 18 5 L 17 7 L 14 7 Z" fill="#000"/>
            
            {/* Lower left - modak (sweet dumpling) */}
            <line x1="-8" y1="0" x2="-15" y2="5" stroke="#000" strokeWidth="2"/>
            <circle cx="-15" cy="5" r="1.5" fill="#000"/>
            
            {/* Crown with multi-tiered design and radiating halo */}
            <path
              d="M -8 -28 L -4 -32 L 0 -30 L 4 -32 L 8 -28"
              stroke="#000"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M -6 -30 L -2 -34 L 2 -32 L 6 -34"
              stroke="#000"
              strokeWidth="0.5"
              fill="none"
            />
            {/* Radiating halo/sun rays */}
            <path d="M -12 -25 L -8 -28" stroke="#000" strokeWidth="0.5"/>
            <path d="M 12 -25 L 8 -28" stroke="#000" strokeWidth="0.5"/>
            <path d="M -10 -20 L -6 -22" stroke="#000" strokeWidth="0.5"/>
            <path d="M 10 -20 L 6 -22" stroke="#000" strokeWidth="0.5"/>
            
            {/* Tilak - third eye with three horizontal lines */}
            <line x1="-1" y1="-18" x2="1" y2="-18" stroke="#000" strokeWidth="0.5"/>
            <line x1="-1" y1="-17" x2="1" y2="-17" stroke="#000" strokeWidth="0.5"/>
            <line x1="-1" y1="-16" x2="1" y2="-16" stroke="#000" strokeWidth="0.5"/>
            
            {/* Sacred thread (yajnopavita) */}
            <line x1="-8" y1="-5" x2="8" y2="-5" stroke="#000" strokeWidth="0.5"/>
            
            {/* Necklaces and adornments */}
            <ellipse cx="0" cy="-8" rx="8" ry="1" fill="none" stroke="#000" strokeWidth="0.3"/>
            <ellipse cx="0" cy="-6" rx="6" ry="0.5" fill="none" stroke="#000" strokeWidth="0.3"/>
            
            {/* Armlets and anklets */}
            <ellipse cx="8" cy="-2" rx="1" ry="0.5" fill="none" stroke="#000" strokeWidth="0.3"/>
            <ellipse cx="-8" cy="-2" rx="1" ry="0.5" fill="none" stroke="#000" strokeWidth="0.3"/>
          </g>
          
          {/* Geometric nodes and cosmic elements */}
          <circle cx="25" cy="25" r="2" fill="#000"/>
          <circle cx="175" cy="25" r="1.5" fill="#000"/>
          <circle cx="25" cy="175" r="1.5" fill="#000"/>
          <circle cx="175" cy="175" r="2" fill="#000"/>
          <circle cx="100" cy="25" r="1" fill="#000"/>
          <circle cx="100" cy="175" r="1" fill="#000"/>
          <circle cx="25" cy="100" r="1" fill="#000"/>
          <circle cx="175" cy="100" r="1" fill="#000"/>
          
          {/* Compass-like symbols with arrows */}
          <g transform="translate(25, 25)">
            <circle cx="0" cy="0" r="3" fill="none" stroke="#000" strokeWidth="0.5"/>
            <line x1="-3" y1="0" x2="3" y2="0" stroke="#000" strokeWidth="0.5"/>
            <line x1="0" y1="-3" x2="0" y2="3" stroke="#000" strokeWidth="0.5"/>
            <path d="M 3 0 L 2 -0.5 L 2 0.5 Z" fill="#000"/>
            <path d="M -3 0 L -2 -0.5 L -2 0.5 Z" fill="#000"/>
            <path d="M 0 -3 L -0.5 -2 L 0.5 -2 Z" fill="#000"/>
            <path d="M 0 3 L -0.5 2 L 0.5 2 Z" fill="#000"/>
          </g>
          
          <g transform="translate(175, 25)">
            <circle cx="0" cy="0" r="3" fill="none" stroke="#000" strokeWidth="0.5"/>
            <line x1="-3" y1="0" x2="3" y2="0" stroke="#000" strokeWidth="0.5"/>
            <line x1="0" y1="-3" x2="0" y2="3" stroke="#000" strokeWidth="0.5"/>
            <path d="M 3 0 L 2 -0.5 L 2 0.5 Z" fill="#000"/>
            <path d="M -3 0 L -2 -0.5 L -2 0.5 Z" fill="#000"/>
            <path d="M 0 -3 L -0.5 -2 L 0.5 -2 Z" fill="#000"/>
            <path d="M 0 3 L -0.5 2 L 0.5 2 Z" fill="#000"/>
          </g>
          
          {/* Additional crosshair symbols */}
          <g transform="translate(100, 25)">
            <circle cx="0" cy="0" r="2" fill="none" stroke="#000" strokeWidth="0.5"/>
            <line x1="-2" y1="0" x2="2" y2="0" stroke="#000" strokeWidth="0.5"/>
            <line x1="0" y1="-2" x2="0" y2="2" stroke="#000" strokeWidth="0.5"/>
          </g>
          
          <g transform="translate(100, 175)">
            <circle cx="0" cy="0" r="2" fill="none" stroke="#000" strokeWidth="0.5"/>
            <line x1="-2" y1="0" x2="2" y2="0" stroke="#000" strokeWidth="0.5"/>
            <line x1="0" y1="-2" x2="0" y2="2" stroke="#000" strokeWidth="0.5"/>
          </g>
          
          {/* Starburst energy points */}
          <g transform="translate(25, 175)">
            <circle cx="0" cy="0" r="1" fill="#000"/>
            <line x1="-2" y1="0" x2="2" y2="0" stroke="#000" strokeWidth="0.3"/>
            <line x1="0" y1="-2" x2="0" y2="2" stroke="#000" strokeWidth="0.3"/>
            <line x1="-1.4" y1="-1.4" x2="1.4" y2="1.4" stroke="#000" strokeWidth="0.3"/>
            <line x1="-1.4" y1="1.4" x2="1.4" y2="-1.4" stroke="#000" strokeWidth="0.3"/>
          </g>
          
          <g transform="translate(175, 175)">
            <circle cx="0" cy="0" r="1" fill="#000"/>
            <line x1="-2" y1="0" x2="2" y2="0" stroke="#000" strokeWidth="0.3"/>
            <line x1="0" y1="-2" x2="0" y2="2" stroke="#000" strokeWidth="0.3"/>
            <line x1="-1.4" y1="-1.4" x2="1.4" y2="1.4" stroke="#000" strokeWidth="0.3"/>
            <line x1="-1.4" y1="1.4" x2="1.4" y2="-1.4" stroke="#000" strokeWidth="0.3"/>
          </g>
          
          {/* Crescent moon phase */}
          <g transform="translate(25, 100)">
            <path d="M 0 -2 A 2 2 0 0 1 0 2 A 1 1 0 0 0 0 -2 Z" fill="#000"/>
          </g>
          
          {/* Additional cosmic dots */}
          <circle cx="45" cy="45" r="0.5" fill="#000"/>
          <circle cx="155" cy="45" r="0.5" fill="#000"/>
          <circle cx="45" cy="155" r="0.5" fill="#000"/>
          <circle cx="155" cy="155" r="0.5" fill="#000"/>
          <circle cx="70" cy="70" r="0.5" fill="#000"/>
          <circle cx="130" cy="70" r="0.5" fill="#000"/>
          <circle cx="70" cy="130" r="0.5" fill="#000"/>
          <circle cx="130" cy="130" r="0.5" fill="#000"/>
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <h1 className="text-2xl font-serif font-bold text-gray-900">BHARAT VASTRA</h1>
          <p className="text-xs text-gray-500 -mt-1">Premium Indian Fashion</p>
        </div>
      )}
    </div>
  );
};

export default GaneshaLogo;
