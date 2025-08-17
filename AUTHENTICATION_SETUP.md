# Bharat Vastra Authentication System Setup

This document provides comprehensive setup instructions for the enhanced authentication system with Google OAuth integration, special offers for sellers/wholesalers, and complete profile management.

## Features Implemented

### 🔐 Authentication Features
- **User Registration & Login**: Multi-step registration with role selection
- **Google OAuth Integration**: Seamless login with Google accounts
- **Password Management**: Forgot password, reset password, change password
- **Profile Completion**: Comprehensive profile setup with image upload
- **Role-based Access**: Customer, Seller, and Wholesaler roles

### 🎁 Special Offers System
- **Welcome Offers**: Discounted commission rates for new sellers/wholesalers
- **Bulk Order Discounts**: Special rates for bulk purchases
- **Premium Benefits**: Exclusive access and priority support
- **Commission Tracking**: Real-time commission rate management

### 👤 Profile Management
- **Profile Pictures**: Image upload with Cloudinary integration
- **Multiple Addresses**: Home, work, and other address types
- **Business Profiles**: Complete business information for sellers/wholesalers
- **Profile Completion Tracking**: Progress indicators and completion status

## Prerequisites

### Required Software
- Node.js (v14 or higher)
- MongoDB
- Google Cloud Console account
- Cloudinary account

### Environment Variables

Create the following environment files:

#### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/bharat-vastra

# JWT Secret
JWT_SECRET=your_jwt_secret_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server
PORT=5001
NODE_ENV=development
```

#### Frontend (.env)
```env
# Google OAuth
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id

# API Configuration
REACT_APP_API_URL=http://localhost:5001

# App Configuration
REACT_APP_APP_NAME=Bharat Vastra
REACT_APP_APP_VERSION=1.0.0
```

## Setup Instructions

### 1. Google OAuth Setup

1. **Create Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API

2. **Configure OAuth Consent Screen**:
   - Go to "APIs & Services" > "OAuth consent screen"
   - Choose "External" user type
   - Fill in app information:
     - App name: Bharat Vastra
     - User support email: your-email@domain.com
     - Developer contact information: your-email@domain.com

3. **Create OAuth Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized JavaScript origins:
     - `http://localhost:3000` (development)
     - `https://yourdomain.com` (production)
   - Add authorized redirect URIs:
     - `http://localhost:3000` (development)
     - `https://yourdomain.com` (production)
   - Copy the Client ID and Client Secret

### 2. Cloudinary Setup

1. **Create Cloudinary Account**:
   - Sign up at [Cloudinary](https://cloudinary.com/)
   - Go to Dashboard to get your credentials

2. **Configure Cloudinary**:
   - Copy Cloud Name, API Key, and API Secret
   - Add them to your backend .env file

### 3. Backend Setup

1. **Install Dependencies**:
   ```bash
   cd "/Users/eddieprasad/Bharat Vastra"
   npm install
   ```

2. **Create Uploads Directory**:
   ```bash
   mkdir uploads
   ```

3. **Start the Server**:
   ```bash
   npm start
   ```

### 4. Frontend Setup

1. **Install Dependencies**:
   ```bash
   cd client
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/register
Register a new user with role selection and business information.

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "role": "seller",
  "businessName": "John's Fashion Store",
  "businessType": "individual"
}
```

#### POST /api/auth/login
Login with email and password.

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST /api/auth/google
Google OAuth login/registration.

**Request Body**:
```json
{
  "token": "google_id_token"
}
```

#### PUT /api/auth/complete-profile
Complete user profile with file upload.

**Request Body** (multipart/form-data):
```json
{
  "phone": "+1234567890",
  "addresses": "[{\"type\":\"home\",\"street\":\"123 Main St\",\"city\":\"Sydney\",\"state\":\"NSW\",\"zipCode\":\"2000\",\"country\":\"Australia\",\"isDefault\":true}]",
  "dateOfBirth": "1990-01-01",
  "gender": "male",
  "bio": "About me...",
  "profileImage": "file_upload",
  "businessName": "Business Name",
  "businessType": "individual",
  "businessDescription": "Business description",
  "businessWebsite": "https://example.com",
  "businessPhone": "+1234567890",
  "businessEmail": "business@example.com"
}
```

#### GET /api/auth/special-offers
Get special offers for the authenticated user.

#### GET /api/auth/me
Get current user information.

### Special Offers

The system automatically applies special offers based on user roles:

#### Seller Offers
- **Welcome Seller Offer**: 50% off first month commission (30 days)
- **Bulk Order Discount**: 15% discount on bulk orders (90 days)

#### Wholesaler Offers
- **Welcome Wholesaler Offer**: 60% off first month commission (30 days)
- **Premium Wholesaler Benefits**: 25% discount on premium products (180 days)

## User Roles and Permissions

### Customer
- Browse and purchase products
- Manage wishlist and cart
- Track orders
- Complete profile with personal information

### Seller
- All customer permissions
- List and manage products
- Track sales and analytics
- Special commission rates
- Business profile management

### Wholesaler
- All seller permissions
- Bulk order management
- Premium product access
- Exclusive wholesale rates
- Priority support

## Profile Completion System

The profile completion system tracks user progress across multiple categories:

### Basic Information (20%)
- First name and last name
- Email address
- Phone number

### Profile Image (10%)
- Profile picture upload

### Address Information (15%)
- At least one complete address

### Business Profile (30% - Sellers/Wholesalers only)
- Business name
- Business type
- Business address
- Business phone

### Additional Information (25%)
- Date of birth
- Gender
- Bio

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt password encryption
- **Account Locking**: Temporary lock after failed login attempts
- **Input Validation**: Comprehensive form validation
- **File Upload Security**: Image type and size validation
- **CORS Protection**: Cross-origin request protection

## File Structure

```
client/src/
├── components/
│   ├── auth/
│   │   ├── GoogleLogin.js          # Google OAuth component
│   │   ├── ProtectedRoute.js       # Route protection
│   │   └── SellerRoute.js          # Seller-specific routes
│   └── common/
│       └── SpecialOffers.js        # Special offers display
├── contexts/
│   └── AuthContext.js              # Authentication context
├── pages/
│   ├── LoginPage.js                # Login page
│   ├── RegisterPage.js             # Registration page
│   └── CompleteProfilePage.js      # Profile completion
└── App.js                          # Main app with routes

server/
├── middleware/
│   ├── auth.js                     # JWT authentication
│   └── upload.js                   # File upload handling
├── models/
│   └── User.js                     # User model with enhanced fields
├── routes/
│   └── auth.js                     # Authentication routes
├── utils/
│   └── cloudinary.js               # Cloudinary configuration
└── server.js                       # Main server file
```

## Testing the System

### 1. Registration Flow
1. Visit `/register`
2. Fill in basic information
3. Select role (Customer/Seller/Wholesaler)
4. Complete registration
5. Redirect to profile completion

### 2. Login Flow
1. Visit `/login`
2. Use email/password or Google OAuth
3. Redirect to dashboard or profile completion

### 3. Profile Completion
1. Upload profile picture
2. Add personal information
3. Add addresses
4. Add business information (if seller/wholesaler)
5. Complete profile

### 4. Special Offers
1. Login as seller/wholesaler
2. Check special offers in dashboard
3. Verify commission rates and discounts

## Troubleshooting

### Common Issues

1. **Google OAuth Not Working**:
   - Verify Google Client ID in both frontend and backend
   - Check authorized origins and redirect URIs
   - Ensure Google+ API is enabled

2. **Image Upload Fails**:
   - Verify Cloudinary credentials
   - Check file size limits (5MB)
   - Ensure uploads directory exists

3. **Profile Completion Not Working**:
   - Check form validation
   - Verify all required fields
   - Check network requests in browser dev tools

4. **Special Offers Not Showing**:
   - Verify user role is seller or wholesaler
   - Check authentication status
   - Verify API endpoints are working

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
DEBUG=app:*
```

## Production Deployment

### Environment Variables
- Use strong JWT secrets
- Configure production database
- Set up production Google OAuth credentials
- Configure production Cloudinary settings

### Security Considerations
- Enable HTTPS
- Set up proper CORS configuration
- Implement rate limiting
- Use environment variables for all secrets
- Regular security updates

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Check server logs for backend issues
4. Verify all environment variables are set correctly

## Future Enhancements

- Email verification system
- Two-factor authentication
- Social media login (Facebook, Twitter)
- Advanced business analytics
- Automated offer generation
- Multi-language support
