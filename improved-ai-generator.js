const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const Jimp = require('jimp');

class ImprovedAIGenerator {
  constructor() {
    this.productTemplates = {
      'Sarees': {
        colors: ['Red', 'Green', 'Blue', 'Purple', 'Gold', 'Pink', 'Orange'],
        patterns: ['Zari Work', 'Embroidery', 'Silk', 'Cotton', 'Designer'],
        styles: ['Traditional', 'Modern', 'Bridal', 'Casual', 'Party']
      },
      'Lehengas': {
        colors: ['Pink', 'Red', 'Purple', 'Gold', 'Silver', 'Blue', 'Green'],
        patterns: ['Heavy Embroidery', 'Mirror Work', 'Zari', 'Stone Work', 'Designer'],
        styles: ['Bridal', 'Party', 'Traditional', 'Modern', 'Fusion']
      },
      'Kurtis': {
        colors: ['White', 'Blue', 'Green', 'Yellow', 'Pink', 'Orange', 'Purple'],
        patterns: ['Embroidery', 'Print', 'Cotton', 'Silk', 'Designer'],
        styles: ['Casual', 'Party', 'Office', 'Traditional', 'Modern']
      },
      'Jewelry': {
        types: ['Necklace', 'Earrings', 'Bangles', 'Rings', 'Anklets'],
        materials: ['Gold', 'Silver', 'Kundan', 'Pearl', 'Diamond'],
        styles: ['Traditional', 'Modern', 'Bridal', 'Casual', 'Designer']
      }
    };
  }

  async generateAccurateProductImage(productName, category) {
    try {
      const template = this.productTemplates[category] || this.productTemplates['Sarees'];
      
      // Create a more realistic product image based on category
      const imageBuffer = await this.createRealisticProductImage(productName, category, template);
      
      if (imageBuffer) {
        const filename = `accurate-${category.toLowerCase()}-${uuidv4()}.jpg`;
        const filepath = path.join('uploads/ai-generated/products', filename);
        
        // Process and optimize image
        const processedBuffer = await this.processImage(imageBuffer, {
          width: 800,
          height: 800,
          quality: 90
        });
        
        await fs.writeFile(filepath, processedBuffer);
        return filename;
      }
    } catch (error) {
      console.error('Error generating accurate product image:', error);
      return null;
    }
  }

  async createRealisticProductImage(productName, category, template) {
    const width = 800;
    const height = 800;
    
    // Create base image with appropriate background
    const image = new Jimp(width, height, 0xFFFFFFFF);
    
    // Add category-specific styling
    switch (category) {
      case 'Sarees':
        return await this.createSareeImage(image, productName, template);
      case 'Lehengas':
        return await this.createLehengaImage(image, productName, template);
      case 'Kurtis':
        return await this.createKurtiImage(image, productName, template);
      case 'Jewelry':
        return await this.createJewelryImage(image, productName, template);
      default:
        return await this.createGenericProductImage(image, productName, category);
    }
  }

  async createSareeImage(image, productName, template) {
    // Create a realistic saree image
    const centerX = 400;
    const centerY = 400;
    
    // Background gradient
    for (let y = 0; y < 800; y++) {
      const color = Jimp.rgbaToInt(255, 248, 240, 255); // Cream background
      for (let x = 0; x < 800; x++) {
        image.setPixelColor(color, x, y);
      }
    }
    
    // Draw saree drape
    const sareeColor = this.getRandomColor(template.colors);
    const colorInt = this.colorNameToInt(sareeColor);
    
    // Main saree body
    for (let x = 200; x < 600; x++) {
      for (let y = 100; y < 700; y++) {
        if (Math.random() > 0.3) { // Add some texture
          image.setPixelColor(colorInt, x, y);
        }
      }
    }
    
    // Saree border
    const borderColor = this.colorNameToInt('Gold');
    for (let x = 200; x < 600; x++) {
      for (let y = 100; y < 120; y++) {
        image.setPixelColor(borderColor, x, y);
      }
      for (let y = 680; y < 700; y++) {
        image.setPixelColor(borderColor, x, y);
      }
    }
    
    // Add some decorative elements
    this.addDecorativeElements(image, template.patterns);
    
    return await image.getBufferAsync(Jimp.MIME_JPEG);
  }

  async createLehengaImage(image, productName, template) {
    // Create a realistic lehenga image
    const centerX = 400;
    const centerY = 400;
    
    // Background
    for (let y = 0; y < 800; y++) {
      const color = Jimp.rgbaToInt(250, 245, 255, 255); // Light purple background
      for (let x = 0; x < 800; x++) {
        image.setPixelColor(color, x, y);
      }
    }
    
    // Lehenga skirt
    const lehengaColor = this.getRandomColor(template.colors);
    const colorInt = this.colorNameToInt(lehengaColor);
    
    // Draw lehenga shape
    for (let x = 250; x < 550; x++) {
      for (let y = 300; y < 700; y++) {
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        if (distance < 200 && y > 300) {
          image.setPixelColor(colorInt, x, y);
        }
      }
    }
    
    // Add embroidery details
    this.addEmbroideryDetails(image, template.patterns);
    
    return await image.getBufferAsync(Jimp.MIME_JPEG);
  }

  async createKurtiImage(image, productName, template) {
    // Create a realistic kurti image
    const centerX = 400;
    const centerY = 400;
    
    // Background
    for (let y = 0; y < 800; y++) {
      const color = Jimp.rgbaToInt(255, 255, 255, 255); // White background
      for (let x = 0; x < 800; x++) {
        image.setPixelColor(color, x, y);
      }
    }
    
    // Kurti body
    const kurtiColor = this.getRandomColor(template.colors);
    const colorInt = this.colorNameToInt(kurtiColor);
    
    // Draw kurti shape
    for (let x = 300; x < 500; x++) {
      for (let y = 200; y < 600; y++) {
        if (y > 200 && y < 600 && x > 300 && x < 500) {
          image.setPixelColor(colorInt, x, y);
        }
      }
    }
    
    // Add collar
    for (let x = 320; x < 480; x++) {
      for (let y = 180; y < 220; y++) {
        image.setPixelColor(colorInt, x, y);
      }
    }
    
    // Add sleeves
    for (let x = 280; x < 320; x++) {
      for (let y = 220; y < 320; y++) {
        image.setPixelColor(colorInt, x, y);
      }
    }
    for (let x = 480; x < 520; x++) {
      for (let y = 220; y < 320; y++) {
        image.setPixelColor(colorInt, x, y);
      }
    }
    
    return await image.getBufferAsync(Jimp.MIME_JPEG);
  }

  async createJewelryImage(image, productName, template) {
    // Create a realistic jewelry image
    const centerX = 400;
    const centerY = 400;
    
    // Background
    for (let y = 0; y < 800; y++) {
      const color = Jimp.rgbaToInt(240, 240, 240, 255); // Light gray background
      for (let x = 0; x < 800; x++) {
        image.setPixelColor(color, x, y);
      }
    }
    
    // Jewelry color
    const jewelryColor = this.getRandomColor(['Gold', 'Silver']);
    const colorInt = this.colorNameToInt(jewelryColor);
    
    // Draw necklace
    for (let angle = 0; angle < 360; angle += 2) {
      const x = centerX + Math.cos(angle * Math.PI / 180) * 150;
      const y = centerY + Math.sin(angle * Math.PI / 180) * 150;
      if (x >= 0 && x < 800 && y >= 0 && y < 800) {
        image.setPixelColor(colorInt, Math.round(x), Math.round(y));
      }
    }
    
    // Add pendant
    for (let x = centerX - 20; x < centerX + 20; x++) {
      for (let y = centerY + 150; y < centerY + 190; y++) {
        if (x >= 0 && x < 800 && y >= 0 && y < 800) {
          image.setPixelColor(colorInt, x, y);
        }
      }
    }
    
    return await image.getBufferAsync(Jimp.MIME_JPEG);
  }

  async createGenericProductImage(image, productName, category) {
    // Create a generic product image
    const centerX = 400;
    const centerY = 400;
    
    // Background
    for (let y = 0; y < 800; y++) {
      const color = Jimp.rgbaToInt(255, 255, 255, 255); // White background
      for (let x = 0; x < 800; x++) {
        image.setPixelColor(color, x, y);
      }
    }
    
    // Product outline
    const productColor = Jimp.rgbaToInt(100, 100, 100, 255);
    for (let x = 300; x < 500; x++) {
      for (let y = 300; y < 500; y++) {
        image.setPixelColor(productColor, x, y);
      }
    }
    
    return await image.getBufferAsync(Jimp.MIME_JPEG);
  }

  addDecorativeElements(image, patterns) {
    // Add decorative elements based on patterns
    const pattern = this.getRandomElement(patterns);
    const color = Jimp.rgbaToInt(255, 215, 0, 255); // Gold
    
    // Add some decorative dots
    for (let i = 0; i < 50; i++) {
      const x = Math.floor(Math.random() * 800);
      const y = Math.floor(Math.random() * 800);
      image.setPixelColor(color, x, y);
    }
  }

  addEmbroideryDetails(image, patterns) {
    // Add embroidery details
    const color = Jimp.rgbaToInt(255, 255, 255, 255); // White
    
    // Add some embroidery lines
    for (let i = 0; i < 20; i++) {
      const startX = 250 + Math.floor(Math.random() * 300);
      const startY = 300 + Math.floor(Math.random() * 400);
      const endX = startX + Math.floor(Math.random() * 100) - 50;
      const endY = startY + Math.floor(Math.random() * 100) - 50;
      
      this.drawLine(image, startX, startY, endX, endY, color);
    }
  }

  drawLine(image, x1, y1, x2, y2, color) {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;
    
    while (true) {
      if (x1 >= 0 && x1 < 800 && y1 >= 0 && y1 < 800) {
        image.setPixelColor(color, x1, y1);
      }
      
      if (x1 === x2 && y1 === y2) break;
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x1 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y1 += sy;
      }
    }
  }

  getRandomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  colorNameToInt(colorName) {
    const colors = {
      'Red': Jimp.rgbaToInt(255, 0, 0, 255),
      'Green': Jimp.rgbaToInt(0, 255, 0, 255),
      'Blue': Jimp.rgbaToInt(0, 0, 255, 255),
      'Purple': Jimp.rgbaToInt(128, 0, 128, 255),
      'Gold': Jimp.rgbaToInt(255, 215, 0, 255),
      'Pink': Jimp.rgbaToInt(255, 192, 203, 255),
      'Orange': Jimp.rgbaToInt(255, 165, 0, 255),
      'White': Jimp.rgbaToInt(255, 255, 255, 255),
      'Yellow': Jimp.rgbaToInt(255, 255, 0, 255),
      'Silver': Jimp.rgbaToInt(192, 192, 192, 255)
    };
    return colors[colorName] || Jimp.rgbaToInt(100, 100, 100, 255);
  }

  async processImage(imageBuffer, options = {}) {
    const {
      width = 800,
      height = 800,
      quality = 90
    } = options;

    try {
      const processedBuffer = await sharp(imageBuffer)
        .resize(width, height, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .jpeg({ quality })
        .toBuffer();

      return processedBuffer;
    } catch (error) {
      console.error('Error processing image:', error);
      return imageBuffer;
    }
  }

  async generateAccurateCategoryImages() {
    const categories = ['Sarees', 'Lehengas', 'Kurtis', 'Jewelry'];
    
    for (const category of categories) {
      console.log(`🎨 Generating accurate ${category} images...`);
      
      for (let i = 0; i < 5; i++) {
        const productName = `${category} Product ${i + 1}`;
        const filename = await this.generateAccurateProductImage(productName, category);
        
        if (filename) {
          console.log(`✅ Generated: ${filename}`);
        }
        
        // Wait between generations
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
}

module.exports = ImprovedAIGenerator;
