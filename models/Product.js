const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      // Indian Attire Categories
      'sari', 'salwar-kameez', 'anarkali-salwar-kameez', 'lehenga', 'ghagra-choli',
      'sharara-suit', 'kurta', 'sherwani', 'dhoti-kurta', 'angarkha', 'dhoti',
      'dupatta', 'men-pajamas', 'patiala-sets', 'achkan', 'blouse', 'co-ord-sets',
      'gharara', 'kurta-sets', 'lungi', 'pakistani-dresses', 'palazzo-pants', 'bandhgala',
      // Jewelry Categories
      'bangles', 'necklaces', 'earrings', 'maang-tikka', 'mangalsutra',
      'kundan', 'meenakari', 'polki'
    ]
  },
  subCategory: {
    type: String,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    retail: {
      type: Number,
      required: true
    },
    wholesale: {
      type: Number,
      required: false
    },
    discounted: {
      type: Number,
      default: null
    }
  },
  currency: {
    type: String,
    default: 'AUD'
  },
  images: [{
    url: String,
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  videos: [{
    url: String,
    thumbnail: String
  }],
  // Product specifications
  specifications: {
    material: [String],
    fabric: String,
    work: [String], // Embroidery, Zari, etc.
    occasion: [String], // Wedding, Party, Casual, etc.
    season: [String], // Summer, Winter, All-season
    care: [String], // Wash care instructions
    weight: Number, // in grams
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    }
  },
  // Size and color variants
  variants: [{
    size: String,
    color: String,
    stock: {
      type: Number,
      default: 0
    },
    sku: String,
    barcode: String,
    images: [String]
  }],
  // For jewelry
  jewelryDetails: {
    metal: String, // Gold, Silver, Platinum, etc.
    purity: String, // 22K, 18K, 925, etc.
    weight: Number, // in grams
    stones: [{
      type: String,
      weight: Number,
      quality: String
    }],
    certification: {
      type: String,
      url: String
    }
  },
  // For clothing
  clothingDetails: {
    sizes: [String], // XS, S, M, L, XL, XXL, Free Size
    colors: [String],
    pattern: String, // Solid, Printed, Embroidered, etc.
    neckline: String, // For tops/blouses
    sleeve: String, // Sleeveless, Short, Long, etc.
    length: String, // Short, Medium, Long, etc.
    fit: String, // Regular, Slim, Loose, etc.
    closure: String, // Zipper, Button, Hook, etc.
  },
  // Inventory and availability
  stock: {
    total: {
      type: Number,
      default: 0
    },
    reserved: {
      type: Number,
      default: 0
    },
    available: {
      type: Number,
      default: 0
    }
  },
  // Pricing and discounts
  discount: {
    percentage: {
      type: Number,
      default: 0
    },
    validFrom: Date,
    validTo: Date,
    isActive: {
      type: Boolean,
      default: false
    }
  },
  // Shipping and handling
  shipping: {
    weight: Number, // in kg
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    freeShipping: {
      type: Boolean,
      default: false
    },
    shippingCost: {
      type: Number,
      default: 0
    },
    estimatedDelivery: {
      min: Number, // in days
      max: Number // in days
    }
  },
  // Product status and visibility
  status: {
    type: String,
    enum: ['draft', 'active', 'inactive', 'out-of-stock', 'discontinued'],
    default: 'draft'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isWholesale: {
    type: Boolean,
    default: false
  },
  minimumOrderQuantity: {
    type: Number,
    default: 1
  },
  // SEO and marketing
  seo: {
    title: String,
    description: String,
    keywords: [String],
    slug: String
  },
  // Ratings and reviews
  ratings: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  // Tags and attributes
  tags: [String],
  attributes: {
    handmade: {
      type: Boolean,
      default: false
    },
    ecoFriendly: {
      type: Boolean,
      default: false
    },
    sustainable: {
      type: Boolean,
      default: false
    },
    vintage: {
      type: Boolean,
      default: false
    },
    designer: {
      type: Boolean,
      default: false
    }
  },
  // Return and warranty
  returnPolicy: {
    allowed: {
      type: Boolean,
      default: true
    },
    days: {
      type: Number,
      default: 7
    },
    conditions: [String]
  },
  warranty: {
    provided: {
      type: Boolean,
      default: false
    },
    duration: String,
    terms: [String]
  }
}, {
  timestamps: true
});

// Indexes for better search performance
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, status: 1 });
productSchema.index({ seller: 1, status: 1 });
productSchema.index({ 'price.retail': 1 });
productSchema.index({ isFeatured: 1, status: 1 });
productSchema.index({ 'ratings.average': -1 });

// Virtual for discounted price
productSchema.virtual('finalPrice').get(function() {
  if (this.discount.isActive && this.discount.percentage > 0) {
    return this.price.retail * (1 - this.discount.percentage / 100);
  }
  return this.price.retail;
});

// Virtual for stock status
productSchema.virtual('stockStatus').get(function() {
  if (this.stock.available <= 0) return 'out-of-stock';
  if (this.stock.available <= 10) return 'low-stock';
  return 'in-stock';
});

// Ensure virtual fields are serialized
productSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Product', productSchema);
