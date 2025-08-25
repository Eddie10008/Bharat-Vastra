# AI Image Generator Bot for Bharat Vastra

A comprehensive, free AI image generation system that runs in the background of your Bharat Vastra platform, creating high-quality, copyright-free images for products, categories, and background patterns.

## 🚀 Features

### Core Functionality
- **Automatic Background Generation**: Runs continuously to generate images for products without images
- **Multiple AI Providers**: Uses HuggingFace and Replicate APIs for redundancy
- **Copyright-Free Images**: All generated images are original and free from copyright issues
- **Smart Fallback System**: Generates geometric patterns when AI services are unavailable
- **Image Optimization**: Automatically processes and optimizes generated images

### Image Types Generated
- **Product Images**: High-quality product photography for items without images
- **Category Images**: Beautiful category banners and thumbnails
- **Background Patterns**: Traditional Indian patterns and spiritual designs
- **Custom Images**: On-demand image generation with custom prompts

### Scheduling & Automation
- **Product Images**: Generated every 6 hours
- **Category Images**: Generated every 12 hours
- **Background Patterns**: Generated daily
- **Cleanup**: Automatic cleanup of old images weekly

## 🛠️ Installation

### 1. Install Dependencies
```bash
npm install
cd client && npm install
```

### 2. Environment Configuration
Copy the environment variables:
```bash
cp env.example .env
```

Configure the following AI-related variables:
```env
# AI Image Generation Configuration
HUGGINGFACE_API_KEY=your-huggingface-api-key
REPLICATE_API_KEY=your-replicate-api-key

# AI Bot Settings
AI_BOT_ENABLED=true
AI_BOT_AUTO_START=true
AI_BOT_RATE_LIMIT=2000
AI_BOT_MAX_RETRIES=3
```

### 3. Get Free API Keys

#### HuggingFace (Free Tier)
1. Visit [HuggingFace](https://huggingface.co/)
2. Create a free account
3. Go to Settings > Access Tokens
4. Create a new token
5. Add to your `.env` file

#### Replicate (Free Tier)
1. Visit [Replicate](https://replicate.com/)
2. Create a free account
3. Go to Account > API Tokens
4. Create a new token
5. Add to your `.env` file

## 🚀 Usage

### Starting the Bot

#### Development Mode
```bash
npm run dev
```
This starts the server, client, and AI bot simultaneously.

#### Production Mode
```bash
npm start
```
This starts the server and AI bot together.

#### Manual Bot Control
```bash
# Start only the AI bot
npm run ai-bot

# Start AI bot separately
npm run ai-bot-start
```

### Admin Dashboard

Access the AI Image Generator dashboard at:
```
http://localhost:3000/admin/ai-images
```

**Features:**
- Real-time bot status monitoring
- Manual image generation controls
- Bulk generation options
- Generated images gallery
- Download and delete functionality

### API Endpoints

#### Bot Control
```javascript
// Get bot status
GET /api/ai-images/status

// Start bot (admin only)
POST /api/ai-images/start

// Stop bot (admin only)
POST /api/ai-images/stop
```

#### Image Generation
```javascript
// Generate custom image
POST /api/ai-images/generate
{
  "prompt": "Elegant Indian saree",
  "options": {
    "width": 800,
    "height": 800,
    "quality": 85
  }
}

// Generate product image
POST /api/ai-images/generate-product/:productId

// Generate category image
POST /api/ai-images/generate-category
{
  "category": "Sarees"
}

// Generate pattern
POST /api/ai-images/generate-pattern
{
  "pattern": "indian-mandala-pattern"
}
```

#### Image Management
```javascript
// Get generated images
GET /api/ai-images/images?type=products&limit=20

// Delete image
DELETE /api/ai-images/images/:filename

// Bulk generation
POST /api/ai-images/bulk-generate
{
  "type": "products",
  "limit": 10
}
```

## 🎨 Image Types & Prompts

### Product Images
Automatically generates high-quality product photography with prompts like:
- "High-quality product photography of [product name], [category], professional studio lighting, white background"

### Category Images
Generates category-specific images:
- **Sarees**: "Elegant Indian saree collection, silk fabric, traditional designs, vibrant colors"
- **Lehengas**: "Bridal lehenga collection, heavy embroidery, mirror work, traditional patterns"
- **Jewelry**: "Traditional Indian jewelry, gold and silver pieces, intricate designs"

### Background Patterns
Creates traditional Indian patterns:
- **Mandala Patterns**: Sacred geometry with spiritual symbols
- **Floral Designs**: Traditional Indian floral patterns with paisley motifs
- **Geometric Patterns**: Mathematical precision with cultural symbols

## 🔧 Configuration

### Cron Jobs
The bot uses cron jobs for automated generation:

```javascript
// Product images every 6 hours
'0 */6 * * *'

// Category images every 12 hours  
'0 */12 * * *'

// Background patterns daily
'0 0 * * *'

// Cleanup weekly
'0 0 * * 0'
```

### Rate Limiting
- **Product Generation**: 2 seconds between requests
- **Category Generation**: 1.5 seconds between requests
- **Pattern Generation**: 1 second between requests

### Image Processing
- **Product Images**: 800x800px, 85% quality
- **Category Images**: 600x400px, 80% quality
- **Pattern Images**: 512x512px, 90% quality, PNG format

## 📁 File Structure

```
uploads/
├── ai-generated/
│   ├── products/          # Product images
│   ├── categories/        # Category images
│   ├── patterns/          # Background patterns
│   ├── backgrounds/       # Background images
│   └── logos/            # Logo variations
```

## 🔒 Security & Permissions

### Admin-Only Features
- Starting/stopping the bot
- Bulk generation
- Deleting images
- Configuration access

### User Permissions
- Viewing generated images
- Downloading images
- Generating custom images (if enabled)

## 🚨 Error Handling

### Fallback System
1. **Primary**: HuggingFace API
2. **Secondary**: Replicate API
3. **Fallback**: Geometric pattern generation using Sharp

### Error Recovery
- Automatic retry on API failures
- Rate limiting to prevent API abuse
- Graceful degradation to fallback generation

## 📊 Monitoring & Statistics

The bot tracks:
- Total images generated
- Successful generations
- Failed generations
- Last run time
- Queue length

## 🛠️ Troubleshooting

### Common Issues

#### Bot Not Starting
```bash
# Check if ports are available
lsof -ti:5001 | xargs kill -9

# Check environment variables
echo $HUGGINGFACE_API_KEY
echo $REPLICATE_API_KEY
```

#### API Rate Limits
- Increase `AI_BOT_RATE_LIMIT` in environment
- Check API provider quotas
- Use fallback generation

#### Image Quality Issues
- Adjust quality settings in image options
- Check prompt specificity
- Verify image dimensions

### Logs
Check console output for detailed error messages and generation status.

## 🔄 Updates & Maintenance

### Regular Maintenance
- Monitor API usage and quotas
- Clean up old generated images
- Update prompts for better results
- Review and optimize generation schedules

### Scaling
- Add more AI providers
- Implement image caching
- Optimize generation algorithms
- Add more image types

## 📈 Performance Optimization

### Tips for Better Results
1. **Specific Prompts**: Use detailed, specific prompts
2. **Category Matching**: Match prompts to product categories
3. **Quality Settings**: Balance quality vs. file size
4. **Scheduling**: Adjust generation frequency based on needs

### Resource Management
- Monitor disk space usage
- Implement image compression
- Use CDN for image delivery
- Cache frequently used images

## 🤝 Contributing

To contribute to the AI Image Generator:

1. Fork the repository
2. Create a feature branch
3. Add new AI providers or image types
4. Test thoroughly
5. Submit a pull request

## 📄 License

This AI Image Generator is part of the Bharat Vastra platform and follows the same licensing terms.

## 🆘 Support

For support with the AI Image Generator:
- Check the troubleshooting section
- Review API provider documentation
- Contact the development team
- Check GitHub issues

---

**Note**: This AI Image Generator is designed to be completely free and copyright-free. All generated images are original and safe for commercial use in your Bharat Vastra platform.
