// Australian market configuration
export const AUSTRALIA_CONFIG = {
  // Timezone settings
  timezone: 'Australia/Sydney',
  timezoneOptions: [
    { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)' },
    { value: 'Australia/Melbourne', label: 'Melbourne (AEST/AEDT)' },
    { value: 'Australia/Brisbane', label: 'Brisbane (AEST)' },
    { value: 'Australia/Perth', label: 'Perth (AWST)' },
    { value: 'Australia/Adelaide', label: 'Adelaide (ACST/ACDT)' },
    { value: 'Australia/Darwin', label: 'Darwin (ACST)' }
  ],

  // Currency settings
  currency: {
    code: 'AUD',
    symbol: '$',
    name: 'Australian Dollar',
    position: 'before', // $100 vs 100$
    decimalPlaces: 2
  },

  // Tax settings (GST - Goods and Services Tax)
  tax: {
    rate: 0.10, // 10% GST
    name: 'GST',
    description: 'Goods and Services Tax'
  },

  // Shipping settings
  shipping: {
    freeThreshold: 150, // Free shipping for orders above $150 AUD
    standardCost: 15, // Standard shipping cost in AUD
    expressCost: 25, // Express shipping cost in AUD
    methods: [
      { id: 'standard', name: 'Standard Delivery', cost: 15, days: '5-7 business days' },
      { id: 'express', name: 'Express Delivery', cost: 25, days: '2-3 business days' },
      { id: 'overnight', name: 'Overnight Delivery', cost: 35, days: 'Next business day' }
    ]
  },

  // Address settings
  address: {
    defaultCountry: 'Australia',
    states: [
      'Australian Capital Territory',
      'New South Wales',
      'Northern Territory',
      'Queensland',
      'South Australia',
      'Tasmania',
      'Victoria',
      'Western Australia'
    ],
    stateAbbreviations: {
      'Australian Capital Territory': 'ACT',
      'New South Wales': 'NSW',
      'Northern Territory': 'NT',
      'Queensland': 'QLD',
      'South Australia': 'SA',
      'Tasmania': 'TAS',
      'Victoria': 'VIC',
      'Western Australia': 'WA'
    },
    postcodeFormat: 'XXXX', // 4-digit postcodes
    postcodeValidation: /^\d{4}$/
  },

  // Contact information
  contact: {
    phone: '+61-2-XXXX-XXXX', // Sydney area code
    email: 'support@bharatvastra.com.au',
    address: {
      street: 'Bharat Vastra House',
      suburb: 'Surry Hills',
      city: 'Sydney',
      state: 'New South Wales',
      postcode: '2010',
      country: 'Australia'
    },
    businessHours: {
      weekdays: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed'
    }
  },

  // Payment methods
  paymentMethods: [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'paypal', name: 'PayPal', icon: '📱' },
    { id: 'bank-transfer', name: 'Bank Transfer', icon: '🏦' },
    { id: 'afterpay', name: 'Afterpay', icon: '📅' },
    { id: 'zip-pay', name: 'Zip Pay', icon: '💳' }
  ],

  // Date and time formatting
  dateFormat: 'DD/MM/YYYY', // Australian date format
  timeFormat: 'HH:mm', // 24-hour format
  dateTimeFormat: 'DD/MM/YYYY HH:mm',

  // Localization
  locale: 'en-AU',
  language: 'English (Australia)',

  // Legal and compliance
  legal: {
    abn: 'XX XXX XXX XXX', // Australian Business Number
    acn: 'XXX XXX XXX', // Australian Company Number
    gstNumber: 'XX XXX XXX XXX', // GST registration number
    termsOfService: '/terms-au',
    privacyPolicy: '/privacy-au',
    returnsPolicy: '/returns-au'
  }
};

// Helper functions
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-AU', {
    timeZone: AUSTRALIA_CONFIG.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date(date));
};

export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('en-AU', {
    timeZone: AUSTRALIA_CONFIG.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

export const getCurrentTime = () => {
  return new Date().toLocaleString('en-AU', {
    timeZone: AUSTRALIA_CONFIG.timezone
  });
};

export default AUSTRALIA_CONFIG;
