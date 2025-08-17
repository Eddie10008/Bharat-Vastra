const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password not required if using Google OAuth
    },
    minlength: 6
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['customer', 'seller', 'wholesaler', 'admin'],
    default: 'customer'
  },
  profileImage: {
    type: String,
    default: ''
  },
  // Google OAuth fields
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  googleEmail: String,
  googlePicture: String,
  // Profile completion tracking
  profileCompleted: {
    type: Boolean,
    default: false
  },
  profileCompletionPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  addresses: [{
    type: {
      type: String,
      enum: ['home', 'work', 'other'],
      default: 'home'
    },
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: {
      type: String,
      default: 'Australia'
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  cart: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      default: 1
    },
    size: String,
    color: String
  }],
  // Enhanced Seller/Wholesaler specific fields
  businessName: String,
  businessType: {
    type: String,
    enum: ['individual', 'partnership', 'corporation', 'llc', 'proprietorship']
  },
  businessDescription: String,
  businessWebsite: String,
  businessLogo: String,
  gstNumber: String,
  panNumber: String,
  businessAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  businessPhone: String,
  businessEmail: String,
  businessHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  // Special offers for sellers/wholesalers
  specialOffers: {
    isEligible: {
      type: Boolean,
      default: false
    },
    offersApplied: [{
      offerId: String,
      offerName: String,
      discountPercentage: Number,
      validUntil: Date,
      appliedAt: {
        type: Date,
        default: Date.now
      }
    }],
    commissionRate: {
      type: Number,
      default: 10, // Default 10% commission
      min: 0,
      max: 50
    },
    bulkDiscountEligible: {
      type: Boolean,
      default: true
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationDocuments: [{
    type: String,
    url: String,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  // Customer specific fields
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  // Numerology fields
  numerology: {
    lifePathNumber: {
      type: Number,
      min: 1,
      max: 33
    },
    calculatedAt: {
      type: Date,
      default: Date.now
    },
    profile: {
      name: String,
      description: String,
      personality: String,
      discount: {
        type: Number,
        default: 0
      }
    },
    colors: {
      primary: String,
      secondary: String,
      accent: String
    },
    gemstones: [String],
    themes: [String],
    productRecommendations: [String]
  },
  preferences: {
    categories: [String],
    sizes: [String],
    colors: [String],
    priceRange: {
      min: Number,
      max: Number
    }
  },
  // Account status
  isActive: {
    type: Boolean,
    default: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  phoneVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date,
  // Additional profile fields
  bio: String,
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String
  },
  notificationPreferences: {
    email: {
      type: Boolean,
      default: true
    },
    sms: {
      type: Boolean,
      default: true
    },
    push: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Calculate profile completion percentage
userSchema.methods.calculateProfileCompletion = function() {
  let completed = 0;
  let total = 0;

  // Basic info (20%)
  total += 20;
  if (this.firstName && this.lastName) completed += 10;
  if (this.email) completed += 5;
  if (this.phone) completed += 5;

  // Profile image (10%)
  total += 10;
  if (this.profileImage) completed += 10;

  // Address (15%)
  total += 15;
  if (this.addresses && this.addresses.length > 0) completed += 15;

  // Business profile for sellers/wholesalers (30%)
  if (this.role === 'seller' || this.role === 'wholesaler') {
    total += 30;
    if (this.businessName) completed += 10;
    if (this.businessType) completed += 5;
    if (this.businessAddress && this.businessAddress.street) completed += 10;
    if (this.businessPhone) completed += 5;
  }

  // Additional info (25%)
  total += 25;
  if (this.dateOfBirth) completed += 10;
  if (this.gender) completed += 5;
  if (this.bio) completed += 10;

  this.profileCompletionPercentage = Math.round((completed / total) * 100);
  this.profileCompleted = this.profileCompletionPercentage >= 80;
  
  return this.profileCompletionPercentage;
};

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtual fields are serialized
userSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);
