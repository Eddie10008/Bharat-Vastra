# Bharat Vastra - Seller Portal

## Overview

The Bharat Vastra Seller Portal is a comprehensive platform designed for sellers and wholesalers to manage their products, orders, and business operations. The portal includes powerful features for product management, order processing, analytics, and dropshipping capabilities.

## Features

### 🏪 Seller Dashboard
- **Overview Dashboard**: Real-time statistics and key metrics
- **Quick Actions**: Easy access to common tasks
- **Recent Orders**: Latest order updates and status
- **Top Products**: Best-performing products analytics
- **Revenue Tracking**: Sales and revenue analytics

### 📦 Product Management
- **Product Catalog**: Complete product listing and management
- **Bulk Operations**: Mass actions on multiple products
- **Advanced Filtering**: Search and filter by status, category, etc.
- **Product Creation**: Comprehensive product creation form
- **Inventory Management**: Stock tracking and updates
- **Product Status**: Draft, Active, Inactive, Out of Stock management

### 🛒 Order Management
- **Order Processing**: Complete order lifecycle management
- **Status Updates**: Real-time order status tracking
- **Bulk Actions**: Mass order status updates
- **Customer Information**: Detailed customer and shipping details
- **Order History**: Complete order tracking and history
- **Export Capabilities**: Order data export functionality

### 🚚 Dropshipping System
- **Supplier Management**: Add and manage dropshipping suppliers
- **Product Import**: Import products from suppliers
- **Auto-sync**: Automatic inventory synchronization
- **Markup Management**: Configure profit margins
- **Supplier Analytics**: Performance tracking for suppliers
- **Inventory Sync**: Real-time stock level synchronization

### 📊 Analytics & Reporting
- **Sales Analytics**: Detailed sales performance metrics
- **Product Performance**: Individual product analytics
- **Category Analytics**: Category-wise performance tracking
- **Revenue Reports**: Comprehensive revenue analysis
- **Customer Insights**: Customer behavior analytics

### ⚙️ Business Settings
- **Profile Management**: Business information and settings
- **Document Upload**: Verification document management
- **Commission Settings**: Configure commission rates
- **Notification Preferences**: Customize notification settings

## Technical Architecture

### Frontend Components

#### Pages
- `SellerDashboardPage.js` - Main dashboard with overview and analytics
- `SellerProductsPage.js` - Product catalog and management
- `SellerOrdersPage.js` - Order processing and management
- `SellerDropshippingPage.js` - Dropshipping supplier and product management
- `SellerProductFormPage.js` - Product creation and editing form

#### Key Features
- **Responsive Design**: Mobile-first responsive layout
- **Real-time Updates**: Live data updates and notifications
- **Advanced Filtering**: Multi-criteria search and filtering
- **Bulk Operations**: Mass actions for efficiency
- **Status Management**: Comprehensive status tracking

### Backend API Endpoints

#### Dashboard & Analytics
```
GET /api/sellers/dashboard - Get dashboard statistics
GET /api/sellers/analytics - Get detailed analytics
```

#### Product Management
```
GET /api/sellers/products - Get seller's products
POST /api/sellers/products - Create new product
PUT /api/sellers/products/:id - Update product
GET /api/sellers/products/:id - Get specific product
POST /api/sellers/products/bulk-action - Bulk product actions
```

#### Order Management
```
GET /api/sellers/orders - Get seller's orders
PUT /api/sellers/orders/:id/status - Update order status
PUT /api/sellers/orders/bulk-status - Bulk order status updates
```

#### Dropshipping
```
GET /api/sellers/dropshipping/suppliers - Get suppliers
GET /api/sellers/dropshipping/products - Get dropship products
POST /api/sellers/dropshipping/suppliers/:id/sync - Sync supplier
POST /api/sellers/dropshipping/products/:id/import - Import product
```

#### Business Management
```
PUT /api/sellers/business-details - Update business information
POST /api/sellers/upload-documents - Upload verification documents
```

## User Roles & Permissions

### Seller
- Manage their own products and inventory
- Process orders for their products
- Access analytics for their business
- Manage dropshipping suppliers
- Update business information

### Wholesaler
- All seller permissions
- Access to wholesale pricing
- Bulk order management
- Advanced analytics

### Admin
- Access to all seller data
- Platform-wide analytics
- User management
- System configuration

## Dropshipping Features

### Supplier Management
- **Supplier Registration**: Add new dropshipping suppliers
- **API Integration**: Connect with supplier APIs
- **Product Catalog**: Browse supplier product catalogs
- **Pricing Sync**: Automatic price synchronization
- **Inventory Sync**: Real-time stock level updates

### Product Import
- **One-click Import**: Import products from suppliers
- **Customization**: Modify imported product details
- **Markup Configuration**: Set profit margins
- **Image Management**: Handle product images
- **SEO Optimization**: Optimize product listings

### Automation
- **Auto-sync**: Scheduled synchronization with suppliers
- **Stock Alerts**: Low stock notifications
- **Price Updates**: Automatic price adjustments
- **Status Updates**: Real-time availability updates

## Security Features

### Authentication
- JWT-based authentication
- Role-based access control
- Session management
- Secure API endpoints

### Data Protection
- Encrypted data transmission
- Secure file uploads
- Input validation and sanitization
- SQL injection prevention

## Performance Optimization

### Frontend
- Lazy loading of components
- Optimized image loading
- Efficient state management
- Caching strategies

### Backend
- Database indexing
- Query optimization
- Caching layers
- Rate limiting

## Integration Capabilities

### Payment Gateways
- Stripe integration
- PayPal support
- Bank transfer options
- Multiple currency support

### Shipping Providers
- Australia Post integration
- International shipping
- Tracking number generation
- Delivery estimates

### Third-party Services
- Cloudinary for image management
- Email service integration
- SMS notifications
- Analytics platforms

## Mobile Responsiveness

The seller portal is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Touch devices

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bharat-vastra
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install

   # Install frontend dependencies
   cd client
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment variables
   cp env.example .env
   
   # Configure your environment variables
   ```

4. **Database Setup**
   ```bash
   # Start MongoDB
   mongod
   
   # Run database migrations (if any)
   ```

5. **Start the application**
   ```bash
   # Start backend server
   npm run dev
   
   # Start frontend (in another terminal)
   cd client
   npm start
   ```

### Accessing the Seller Portal

1. Register as a seller/wholesaler
2. Complete business verification
3. Access the seller portal at `/seller/dashboard`
4. Start managing your products and orders

## API Documentation

### Authentication
All seller portal endpoints require authentication using JWT tokens.

```javascript
// Example API call
const response = await fetch('/api/sellers/dashboard', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

### Error Handling
The API returns standardized error responses:

```javascript
{
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Validation error message"
    }
  ]
}
```

## Support & Documentation

### Documentation
- API Documentation: `/api/docs`
- User Guide: Available in the portal
- Video Tutorials: Coming soon

### Support Channels
- Email: support@bharatvastra.com
- Phone: +91-XXXXXXXXXX
- Live Chat: Available in the portal

### Community
- Seller Forum: Community discussions
- Knowledge Base: FAQ and guides
- Training Webinars: Regular training sessions

## Roadmap

### Upcoming Features
- **Advanced Analytics**: AI-powered insights
- **Mobile App**: Native mobile application
- **Multi-language Support**: Internationalization
- **Advanced Dropshipping**: More supplier integrations
- **Automated Marketing**: Marketing automation tools

### Planned Integrations
- **Shopify Integration**: Connect with Shopify stores
- **WooCommerce**: WordPress integration
- **Social Media**: Social commerce features
- **Marketplace Integration**: Amazon, eBay integration

## Contributing

We welcome contributions to improve the seller portal. Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support regarding the seller portal:

- **Email**: sellers@bharatvastra.com
- **Phone**: +91-XXXXXXXXXX
- **Address**: [Business Address]

---

**Bharat Vastra Seller Portal** - Empowering sellers with powerful tools for success in the Indian fashion market.
