# Australian Market Setup for Bharat Vastra

This document outlines the changes made to adapt the Bharat Vastra e-commerce platform for the Australian market.

## Overview

The website has been updated to use Australian time zones, currency (AUD), tax rates (GST), shipping costs, and geographical locations. All Indian-specific references have been replaced with Australian equivalents while maintaining the focus on Indian attire and jewelry.

## Key Changes Made

### 1. Currency and Pricing
- **Currency**: Changed from INR (₹) to AUD ($)
- **Tax Rate**: Updated from 18% GST (India) to 10% GST (Australia)
- **Shipping Threshold**: Free shipping threshold changed from ₹999 to $150 AUD
- **Shipping Costs**: Updated to Australian market rates
  - Standard: $15 AUD
  - Express: $25 AUD
  - Overnight: $35 AUD

### 2. Time Zone and Date Formatting
- **Default Timezone**: Australia/Sydney
- **Date Format**: Changed to DD/MM/YYYY (Australian format)
- **Time Format**: 24-hour format (HH:mm)
- **Supported Timezones**:
  - Sydney (AEST/AEDT)
  - Melbourne (AEST/AEDT)
  - Brisbane (AEST)
  - Perth (AWST)
  - Adelaide (ACST/ACDT)
  - Darwin (ACST)

### 3. Address and Location
- **Default Country**: Australia
- **States**: All Australian states and territories
- **Postcode Format**: 4-digit Australian postcodes
- **Address Structure**: Street, Suburb, City, State, Postcode
- **Contact Information**:
  - Phone: +61-2-XXXX-XXXX (Sydney area code)
  - Email: support@bharatvastra.com.au
  - Address: Bharat Vastra House, Surry Hills, Sydney, NSW 2010

### 4. Payment Methods
Updated to include Australian payment options:
- Credit/Debit Cards
- PayPal
- Bank Transfer
- Afterpay
- Zip Pay

### 5. Legal and Compliance
- **ABN**: Australian Business Number
- **ACN**: Australian Company Number
- **GST Number**: GST registration number
- **Terms**: Updated for Australian law
- **Privacy Policy**: Australian privacy law compliant
- **Returns Policy**: Australian consumer law compliant

## Configuration Files

### Client-Side Configuration
- **File**: `client/src/config/australia.js`
- **Purpose**: Centralized Australian market settings for frontend
- **Features**:
  - Currency formatting
  - Date/time formatting
  - Address validation
  - Tax calculations
  - Shipping calculations

### Server-Side Configuration
- **File**: `config/australia.js`
- **Purpose**: Backend Australian market settings
- **Features**:
  - Tax calculations
  - Shipping calculations
  - Postcode validation
  - State abbreviations

## Updated Components

### 1. CartContext (`client/src/contexts/CartContext.js`)
- Updated shipping cost calculation
- Updated tax calculation (10% GST)
- Imported Australian configuration

### 2. HomePage (`client/src/pages/HomePage.js`)
- Updated currency display
- Updated shipping information
- Updated payment method descriptions

### 3. Footer (`client/src/components/layout/Footer.js`)
- Updated contact information
- Updated address
- Updated shipping threshold display

### 4. New Components Created
- **AustralianCurrency**: Reusable currency display component
- **AustralianAddressInput**: Address input with Australian validation

## Updated Models

### 1. Product Model (`models/Product.js`)
- Default currency changed to AUD

### 2. Order Model (`models/Order.js`)
- Default country changed to Australia
- Default currency changed to AUD
- Tax percentage updated to 10%

### 3. User Model (`models/User.js`)
- Default country changed to Australia

## Updated Routes

### 1. Orders Route (`routes/orders.js`)
- Updated tax calculation to use Australian helper functions
- Updated shipping cost calculation
- Imported Australian configuration

### 2. Payments Route (`routes/payments.js`)
- Updated supported currencies to AUD and USD
- Default currency changed to AUD

## Environment Variables

New environment variables added to `env.example`:
```bash
# Australian Market Configuration
TIMEZONE=Australia/Sydney
CURRENCY=AUD
GST_RATE=0.10
SHIPPING_FREE_THRESHOLD=150
SHIPPING_STANDARD_COST=15
SHIPPING_EXPRESS_COST=25

# Australian Business Information
ABN=XX XXX XXX XXX
ACN=XXX XXX XXX
GST_NUMBER=XX XXX XXX XXX
CONTACT_PHONE=+61-2-XXXX-XXXX
CONTACT_EMAIL=support@bharatvastra.com.au
```

## Helper Functions

### Currency Formatting
```javascript
import { formatCurrency } from '../config/australia';
formatCurrency(299); // Returns "$299.00"
```

### Date Formatting
```javascript
import { formatDate, formatDateTime } from '../config/australia';
formatDate(new Date()); // Returns "25/12/2024"
formatDateTime(new Date()); // Returns "25/12/2024 14:30"
```

### Address Validation
```javascript
import { validatePostcode } from '../config/australia';
validatePostcode('2000'); // Returns true
validatePostcode('123'); // Returns false
```

## Usage Examples

### Using Australian Currency Component
```jsx
import AustralianCurrency from '../components/common/AustralianCurrency';

<AustralianCurrency amount={299} size="lg" />
// Displays: $299.00
```

### Using Australian Address Input
```jsx
import AustralianAddressInput from '../components/common/AustralianAddressInput';

<AustralianAddressInput
  value={address}
  onChange={setAddress}
  errors={errors}
  label="Shipping Address"
/>
```

## Testing

To test the Australian market setup:

1. **Currency Display**: Check that all prices show in AUD format
2. **Tax Calculation**: Verify 10% GST is applied correctly
3. **Shipping**: Test free shipping threshold at $150
4. **Address Input**: Test Australian postcode validation
5. **Timezone**: Verify dates and times display in Australian timezone
6. **Contact Info**: Check footer shows Australian contact details

## Deployment Notes

1. Update environment variables with actual Australian business information
2. Configure Stripe for AUD currency
3. Set up Australian business registration (ABN, ACN, GST)
4. Update DNS to point to Australian domain if applicable
5. Configure Australian payment gateways (Afterpay, Zip Pay)

## Future Enhancements

1. **Multi-language Support**: Add support for other languages common in Australia
2. **Regional Shipping**: Implement different shipping rates for different Australian regions
3. **Local Payment Methods**: Add more Australian payment options
4. **Tax Exemptions**: Handle GST exemptions for certain products
5. **Local SEO**: Optimize for Australian search terms and locations

## Support

For questions or issues related to the Australian market setup, please refer to the configuration files or contact the development team.
