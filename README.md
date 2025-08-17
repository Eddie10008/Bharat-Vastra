# Bharat Vastra - Premium Indian Attire & Jewelry E-commerce Platform

A comprehensive e-commerce platform designed specifically for premium Indian attire and jewelry, catering to customers, sellers, and wholesalers. Built with modern technologies and a focus on Indian cultural aesthetics.

## 🌟 Features

### For Customers
- **Comprehensive Product Catalog**: Browse through extensive collections of Indian attire and jewelry
- **Advanced Search & Filtering**: Find products by category, price, brand, occasion, material, size, and color
- **Smart Recommendations**: Personalized product suggestions based on preferences
- **Wishlist Management**: Save favorite items for later purchase
- **Shopping Cart**: Add items with size/color variants and manage quantities
- **Secure Checkout**: Multiple payment options including UPI, cards, and COD
- **Order Tracking**: Real-time order status updates and tracking
- **Customer Reviews**: Read and write product reviews and ratings
- **Profile Management**: Manage personal information, addresses, and preferences

### For Sellers & Wholesalers
- **Seller Dashboard**: Comprehensive analytics and sales insights
- **Product Management**: Add, edit, and manage product listings with detailed specifications
- **Inventory Management**: Track stock levels and manage variants
- **Order Management**: Process orders, update status, and manage shipping
- **Business Verification**: Secure verification process for sellers
- **Wholesale Pricing**: Set different pricing for retail and wholesale customers
- **Analytics & Reports**: Detailed sales and performance analytics

### Platform Features
- **Multi-role System**: Support for customers, sellers, wholesalers, and admins
- **Responsive Design**: Mobile-first design that works on all devices
- **SEO Optimized**: Built-in SEO features for better search engine visibility
- **Performance Optimized**: Fast loading times and efficient data handling
- **Security**: JWT authentication, input validation, and secure payment processing

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Stripe** - Payment processing
- **Multer** - File uploads
- **Express Validator** - Input validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icon library

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bharat-vastra
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/bharat-vastra
   JWT_SECRET=your-super-secret-jwt-key
   STRIPE_SECRET_KEY=your-stripe-secret-key
   STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   CLIENT_URL=http://localhost:3000
   ```

4. **Start the server**
   ```bash
   npm run server
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

### Complete Setup (Both Backend & Frontend)

From the root directory:
```bash
npm run install-all
npm run dev
```

## 🗂️ Project Structure

```
bharat-vastra/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   └── package.json
├── models/                 # MongoDB models
├── routes/                 # API routes
├── middleware/             # Custom middleware
├── server.js              # Express server
└── package.json
```

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password

### Products
- `GET /api/products` - Get all products with filtering
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (seller only)
- `PUT /api/products/:id` - Update product (seller only)
- `DELETE /api/products/:id` - Delete product (seller only)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status (seller only)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category with products
- `GET /api/categories/:id/products` - Get products by category

### Search
- `GET /api/search` - Search products
- `GET /api/search/suggestions` - Get search suggestions
- `GET /api/search/filters` - Get available filters

### Payments
- `POST /api/payments/create-payment-intent` - Create Stripe payment intent
- `POST /api/payments/upi-payment` - Process UPI payment
- `GET /api/payments/methods` - Get available payment methods

## 🎨 Design System

### Color Palette
- **Primary**: Red (#ef4444) - Represents Indian culture and vibrancy
- **Secondary**: Purple (#d946ef) - Luxury and elegance
- **Accent**: Gold (#f59e0b) - Premium feel and Indian heritage
- **Indian Colors**: Traditional Indian color palette for special elements

### Typography
- **Sans**: Inter - Clean and modern for body text
- **Serif**: Playfair Display - Elegant for headings
- **Display**: Poppins - Bold and contemporary for CTAs

### Components
- **Buttons**: Primary, secondary, outline, and ghost variants
- **Cards**: Product cards with hover effects
- **Forms**: Consistent input styling with validation
- **Badges**: Status indicators and labels
- **Modals**: Overlay components for dialogs

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Comprehensive validation on all inputs
- **Rate Limiting**: Protection against brute force attacks
- **CORS Configuration**: Secure cross-origin requests
- **Helmet**: Security headers for protection
- **Input Sanitization**: Protection against XSS attacks

## 📱 Responsive Design

The platform is built with a mobile-first approach and includes:
- Responsive navigation with mobile menu
- Touch-friendly interface elements
- Optimized images and lazy loading
- Progressive Web App features
- Cross-browser compatibility

## 🚀 Deployment

### Backend Deployment (Heroku)
```bash
# Add Heroku remote
heroku git:remote -a your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Email: support@bharatvastra.com
- Documentation: [docs.bharatvastra.com](https://docs.bharatvastra.com)

## 🙏 Acknowledgments

- Indian fashion designers and artisans
- Open source community
- React and Node.js communities
- Tailwind CSS team

---

**Bharat Vastra** - Celebrating Indian Heritage Through Fashion 🪔✨
