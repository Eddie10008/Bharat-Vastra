const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload'); // Added for file upload
const cloudinary = require('../utils/cloudinary'); // Added for cloudinary

const router = express.Router();

// Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'bharat-vastra-secret', {
    expiresIn: '7d'
  });
};

// Special offers for sellers and wholesalers
const getSpecialOffers = (role) => {
  const offers = {
    seller: [
      {
        id: 'SELLER_WELCOME',
        name: 'Welcome Seller Offer',
        description: 'Get 50% off on your first month commission',
        discountPercentage: 50,
        validDays: 30
      },
      {
        id: 'BULK_DISCOUNT',
        name: 'Bulk Order Discount',
        description: 'Special rates for bulk orders',
        discountPercentage: 15,
        validDays: 90
      }
    ],
    wholesaler: [
      {
        id: 'WHOLESALER_WELCOME',
        name: 'Welcome Wholesaler Offer',
        description: 'Get 60% off on your first month commission',
        discountPercentage: 60,
        validDays: 30
      },
      {
        id: 'PREMIUM_WHOLESALER',
        name: 'Premium Wholesaler Benefits',
        description: 'Exclusive access to premium products',
        discountPercentage: 25,
        validDays: 180
      }
    ]
  };
  
  return offers[role] || [];
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', [
  body('firstName').trim().isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
  body('lastName').trim().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').isMobilePhone().withMessage('Please enter a valid phone number'),
  body('role').optional().isIn(['customer', 'seller', 'wholesaler']).withMessage('Invalid role')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      phone, 
      role, 
      businessName, 
      businessType,
      businessDescription,
      businessWebsite,
      businessPhone,
      businessEmail,
      businessAddress
    } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    user = new User({
      firstName,
      lastName,
      email,
      password,
      phone,
      role: role || 'customer'
    });

    // Add business details for sellers/wholesalers
    if (role === 'seller' || role === 'wholesaler') {
      user.businessName = businessName;
      user.businessType = businessType;
      user.businessDescription = businessDescription;
      user.businessWebsite = businessWebsite;
      user.businessPhone = businessPhone;
      user.businessEmail = businessEmail;
      user.businessAddress = businessAddress;
      
      // Apply special offers
      user.specialOffers.isEligible = true;
      const offers = getSpecialOffers(role);
      user.specialOffers.offersApplied = offers.map(offer => ({
        offerId: offer.id,
        offerName: offer.name,
        discountPercentage: offer.discountPercentage,
        validUntil: new Date(Date.now() + offer.validDays * 24 * 60 * 60 * 1000)
      }));
    }

    // Calculate profile completion
    user.calculateProfileCompletion();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        businessName: user.businessName,
        profileCompleted: user.profileCompleted,
        profileCompletionPercentage: user.profileCompletionPercentage,
        specialOffers: user.specialOffers
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// @route   POST /api/auth/google
// @desc    Google OAuth login/register
// @access  Public
router.post('/google', [
  body('token').notEmpty().withMessage('Google token is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token } = req.body;

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, given_name, family_name, picture } = payload;

    // Check if user exists
    let user = await User.findOne({ 
      $or: [{ email }, { googleId }] 
    });

    if (user) {
      // Update Google info if not present
      if (!user.googleId) {
        user.googleId = googleId;
        user.googleEmail = email;
        user.googlePicture = picture;
        await user.save();
      }

      // Update last login
      user.lastLogin = new Date();
      user.loginAttempts = 0;
      user.lockUntil = undefined;
      await user.save();
    } else {
      // Create new user
      user = new User({
        firstName: given_name,
        lastName: family_name,
        email,
        googleId,
        googleEmail: email,
        googlePicture: picture,
        phone: '', // Will be required to complete profile
        role: 'customer',
        emailVerified: true
      });

      user.calculateProfileCompletion();
      await user.save();
    }

    // Generate token
    const jwtToken = generateToken(user._id);

    res.json({
      message: 'Google authentication successful',
      token: jwtToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        profileCompleted: user.profileCompleted,
        profileCompletionPercentage: user.profileCompletionPercentage,
        googlePicture: user.googlePicture
      }
    });

  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: 'Google authentication failed' });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').exists().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if account is locked
    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(423).json({ 
        message: 'Account is temporarily locked. Please try again later.' 
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      // Increment login attempts
      user.loginAttempts += 1;
      
      // Lock account after 5 failed attempts
      if (user.loginAttempts >= 5) {
        user.lockUntil = Date.now() + 15 * 60 * 1000; // 15 minutes
      }
      
      await user.save();
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Reset login attempts on successful login
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        businessName: user.businessName,
        profileCompleted: user.profileCompleted,
        profileCompletionPercentage: user.profileCompletionPercentage,
        specialOffers: user.specialOffers
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Calculate profile completion
    user.calculateProfileCompletion();
    await user.save();
    
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/auth/complete-profile
// @desc    Complete user profile with file upload
// @access  Private
router.put('/complete-profile', auth, upload.single('profileImage'), [
  body('phone').isMobilePhone().withMessage('Please enter a valid phone number'),
  body('addresses').isJSON().withMessage('Addresses must be valid JSON')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const {
      phone,
      addresses,
      role,
      businessName,
      businessType,
      businessDescription,
      businessWebsite,
      businessPhone,
      businessEmail,
      businessAddress,
      dateOfBirth,
      gender,
      bio
    } = req.body;

    // Handle profile image upload
    if (req.file) {
      try {
        // Upload to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'bharat-vastra/profiles',
          width: 300,
          height: 300,
          crop: 'fill'
        });
        user.profileImage = result.secure_url;
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return res.status(500).json({ message: 'Failed to upload profile image' });
      }
    }

    // Update basic info
    user.phone = phone;
    user.addresses = JSON.parse(addresses);
    user.dateOfBirth = dateOfBirth;
    user.gender = gender;
    user.bio = bio;

    // Update role and business info if changing to seller/wholesaler
    if (role && role !== user.role && (role === 'seller' || role === 'wholesaler')) {
      user.role = role;
      user.businessName = businessName;
      user.businessType = businessType;
      user.businessDescription = businessDescription;
      user.businessWebsite = businessWebsite;
      user.businessPhone = businessPhone;
      user.businessEmail = businessEmail;
      user.businessAddress = businessAddress;
      
      // Apply special offers for new sellers/wholesalers
      user.specialOffers.isEligible = true;
      const offers = getSpecialOffers(role);
      user.specialOffers.offersApplied = offers.map(offer => ({
        offerId: offer.id,
        offerName: offer.name,
        discountPercentage: offer.discountPercentage,
        validUntil: new Date(Date.now() + offer.validDays * 24 * 60 * 60 * 1000)
      }));
    }

    // Calculate profile completion
    user.calculateProfileCompletion();
    await user.save();

    res.json({
      message: 'Profile completed successfully',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        profileCompleted: user.profileCompleted,
        profileCompletionPercentage: user.profileCompletionPercentage,
        specialOffers: user.specialOffers
      }
    });

  } catch (error) {
    console.error('Complete profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/auth/special-offers
// @desc    Get special offers for user
// @access  Private
router.get('/special-offers', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const availableOffers = getSpecialOffers(user.role);
    const appliedOffers = user.specialOffers.offersApplied;

    res.json({
      isEligible: user.specialOffers.isEligible,
      availableOffers,
      appliedOffers,
      commissionRate: user.specialOffers.commissionRate
    });

  } catch (error) {
    console.error('Get special offers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found with this email' });
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'bharat-vastra-secret',
      { expiresIn: '1h' }
    );

    // In a real application, you would send this token via email
    // For now, we'll just return it (in production, use nodemailer)
    res.json({
      message: 'Password reset link sent to your email',
      resetToken // Remove this in production
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/reset-password
// @desc    Reset password with token
// @access  Public
router.post('/reset-password', [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token, password } = req.body;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'bharat-vastra-secret');
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({ message: 'Invalid reset token' });
    }

    // Update password
    user.password = password;
    await user.save();

    res.json({ message: 'Password reset successfully' });

  } catch (error) {
    console.error('Reset password error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Invalid reset token' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/auth/change-password
// @desc    Change password
// @access  Private
router.put('/change-password', auth, [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id).select('+password');

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', auth, (req, res) => {
  // In a real application, you might want to blacklist the token
  // For now, we'll just return a success message
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
