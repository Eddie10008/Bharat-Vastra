import React from 'react';
import { formatCurrency } from '../../config/australia';

const AustralianCurrency = ({ 
  amount, 
  className = '', 
  showSymbol = true, 
  showDecimals = true,
  size = 'base' // 'sm', 'base', 'lg', 'xl'
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const formattedAmount = formatCurrency(amount);
  
  return (
    <span className={`font-semibold ${sizeClasses[size]} ${className}`}>
      {formattedAmount}
    </span>
  );
};

export default AustralianCurrency;
