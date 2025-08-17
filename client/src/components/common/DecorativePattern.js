import React from 'react';

const DecorativePattern = ({ 
  className = '', 
  variant = 'default',
  opacity = 0.1,
  size = 'md'
}) => {
  const patterns = {
    default: (
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Concentric circles */}
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" fill="none" opacity={opacity}/>
        <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" fill="none" opacity={opacity * 0.8}/>
        <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" fill="none" opacity={opacity * 0.6}/>
        
        {/* Connecting lines */}
        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" opacity={opacity * 0.4}/>
        <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" opacity={opacity * 0.4}/>
        
        {/* Diagonal lines */}
        <line x1="15" y1="15" x2="85" y2="85" stroke="currentColor" strokeWidth="0.5" opacity={opacity * 0.3}/>
        <line x1="85" y1="15" x2="15" y2="85" stroke="currentColor" strokeWidth="0.5" opacity={opacity * 0.3}/>
        
        {/* Nodes */}
        <circle cx="15" cy="15" r="1" fill="currentColor" opacity={opacity * 0.8}/>
        <circle cx="85" cy="15" r="1" fill="currentColor" opacity={opacity * 0.8}/>
        <circle cx="15" cy="85" r="1" fill="currentColor" opacity={opacity * 0.8}/>
        <circle cx="85" cy="85" r="1" fill="currentColor" opacity={opacity * 0.8}/>
      </svg>
    ),
    
    border: (
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Border pattern with geometric elements */}
        <rect x="5" y="5" width="90" height="90" stroke="currentColor" strokeWidth="0.5" fill="none" opacity={opacity}/>
        <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" fill="none" opacity={opacity * 0.6}/>
        <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" fill="none" opacity={opacity * 0.4}/>
        
        {/* Corner decorations */}
        <circle cx="15" cy="15" r="2" fill="currentColor" opacity={opacity * 0.8}/>
        <circle cx="85" cy="15" r="2" fill="currentColor" opacity={opacity * 0.8}/>
        <circle cx="15" cy="85" r="2" fill="currentColor" opacity={opacity * 0.8}/>
        <circle cx="85" cy="85" r="2" fill="currentColor" opacity={opacity * 0.8}/>
        
        {/* Connecting lines */}
        <line x1="15" y1="15" x2="85" y2="15" stroke="currentColor" strokeWidth="0.5" opacity={opacity * 0.3}/>
        <line x1="15" y1="85" x2="85" y2="85" stroke="currentColor" strokeWidth="0.5" opacity={opacity * 0.3}/>
        <line x1="15" y1="15" x2="15" y2="85" stroke="currentColor" strokeWidth="0.5" opacity={opacity * 0.3}/>
        <line x1="85" y1="15" x2="85" y2="85" stroke="currentColor" strokeWidth="0.5" opacity={opacity * 0.3}/>
      </svg>
    ),
    
    mandala: (
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Mandala pattern */}
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" fill="none" opacity={opacity}/>
        <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" fill="none" opacity={opacity * 0.8}/>
        <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" fill="none" opacity={opacity * 0.6}/>
        <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="0.5" fill="none" opacity={opacity * 0.4}/>
        
        {/* Radial lines */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45) * (Math.PI / 180);
          const x1 = 50 + Math.cos(angle) * 15;
          const y1 = 50 + Math.sin(angle) * 15;
          const x2 = 50 + Math.cos(angle) * 45;
          const y2 = 50 + Math.sin(angle) * 45;
          return (
            <line 
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2} 
              stroke="currentColor" 
              strokeWidth="0.5" 
              opacity={opacity * 0.5}
            />
          );
        })}
        
        {/* Outer nodes */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45) * (Math.PI / 180);
          const x = 50 + Math.cos(angle) * 45;
          const y = 50 + Math.sin(angle) * 45;
          return (
            <circle 
              key={i}
              cx={x} cy={y} r="1.5" 
              fill="currentColor" 
              opacity={opacity * 0.8}
            />
          );
        })}
      </svg>
    ),
    
    minimal: (
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Minimal geometric pattern */}
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" opacity={opacity}/>
        <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" fill="none" opacity={opacity * 0.6}/>
        
        {/* Simple nodes */}
        <circle cx="20" cy="20" r="1" fill="currentColor" opacity={opacity * 0.8}/>
        <circle cx="80" cy="20" r="1" fill="currentColor" opacity={opacity * 0.8}/>
        <circle cx="20" cy="80" r="1" fill="currentColor" opacity={opacity * 0.8}/>
        <circle cx="80" cy="80" r="1" fill="currentColor" opacity={opacity * 0.8}/>
      </svg>
    )
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
    full: 'w-full h-full'
  };

  return (
    <div className={`${sizeClasses[size]} text-gray-600 ${className}`}>
      {patterns[variant]}
    </div>
  );
};

export default DecorativePattern;
