const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'bharat-vastra-secret');
    
    // Get user from database
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is deactivated' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to check if user is a seller or wholesaler
const isSeller = (req, res, next) => {
  if (req.user.role !== 'seller' && req.user.role !== 'wholesaler') {
    return res.status(403).json({ message: 'Access denied. Seller/Wholesaler role required' });
  }
  next();
};

// Middleware to check if user is a wholesaler
const isWholesaler = (req, res, next) => {
  if (req.user.role !== 'wholesaler') {
    return res.status(403).json({ message: 'Access denied. Wholesaler role required' });
  }
  next();
};

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin role required' });
  }
  next();
};

// Middleware to check if user is verified (for sellers/wholesalers)
const isVerified = (req, res, next) => {
  if (req.user.role === 'seller' || req.user.role === 'wholesaler') {
    if (!req.user.isVerified) {
      return res.status(403).json({ 
        message: 'Account not verified. Please complete verification process.' 
      });
    }
  }
  next();
};

module.exports = { auth, isSeller, isWholesaler, isAdmin, isVerified };
