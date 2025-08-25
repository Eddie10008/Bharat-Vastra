import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Play, 
  Square, 
  Image, 
  Settings, 
  Trash2, 
  Download, 
  RefreshCw,
  Plus,
  Eye,
  BarChart3,
  Zap
} from 'lucide-react';
import toast from 'react-hot-toast';

const AIImageGenerator = () => {
  const [botStatus, setBotStatus] = useState(null);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPattern, setSelectedPattern] = useState('');
  const [imageOptions, setImageOptions] = useState({
    width: 800,
    height: 800,
    quality: 85
  });

  const categories = [
    'Sarees', 'Lehengas', 'Anarkalis', 'Salwar Kameez', 'Kurtis',
    'Jewelry', 'Bangles', 'Necklaces', 'Earrings', 'Rings',
    'Accessories', 'Bags', 'Footwear', 'Dupattas', 'Blouses'
  ];

  const patterns = [
    'indian-mandala-pattern',
    'traditional-floral-design',
    'geometric-indian-pattern',
    'spiritual-symbols',
    'ethnic-border-design',
    'divine-geometric-pattern',
    'sacred-geometry',
    'chakra-inspired-pattern'
  ];

  useEffect(() => {
    fetchBotStatus();
    fetchGeneratedImages();
  }, []);

  const fetchBotStatus = async () => {
    try {
      const response = await axios.get('/api/ai-images/status');
      setBotStatus(response.data.data);
    } catch (error) {
      console.error('Error fetching bot status:', error);
    }
  };

  const fetchGeneratedImages = async () => {
    try {
      const response = await axios.get('/api/ai-images/images?limit=20');
      setGeneratedImages(response.data.data);
    } catch (error) {
      console.error('Error fetching generated images:', error);
    }
  };

  const startBot = async () => {
    try {
      setLoading(true);
      await axios.post('/api/ai-images/start');
      toast.success('AI Image Bot started successfully');
      fetchBotStatus();
    } catch (error) {
      toast.error('Error starting AI bot');
    } finally {
      setLoading(false);
    }
  };

  const stopBot = async () => {
    try {
      setLoading(true);
      await axios.post('/api/ai-images/stop');
      toast.success('AI Image Bot stopped successfully');
      fetchBotStatus();
    } catch (error) {
      toast.error('Error stopping AI bot');
    } finally {
      setLoading(false);
    }
  };

  const generateCustomImage = async () => {
    if (!customPrompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    try {
      setLoading(true);
      await axios.post('/api/ai-images/generate', {
        prompt: customPrompt,
        options: imageOptions
      });
      toast.success('Custom image generated successfully');
      setCustomPrompt('');
      fetchGeneratedImages();
    } catch (error) {
      toast.error('Error generating custom image');
    } finally {
      setLoading(false);
    }
  };

  const generateCategoryImage = async () => {
    if (!selectedCategory) {
      toast.error('Please select a category');
      return;
    }

    try {
      setLoading(true);
      await axios.post('/api/ai-images/generate-category', {
        category: selectedCategory
      });
      toast.success('Category image generated successfully');
      setSelectedCategory('');
      fetchGeneratedImages();
    } catch (error) {
      toast.error('Error generating category image');
    } finally {
      setLoading(false);
    }
  };

  const generatePatternImage = async () => {
    if (!selectedPattern) {
      toast.error('Please select a pattern');
      return;
    }

    try {
      setLoading(true);
      await axios.post('/api/ai-images/generate-pattern', {
        pattern: selectedPattern
      });
      toast.success('Pattern image generated successfully');
      setSelectedPattern('');
      fetchGeneratedImages();
    } catch (error) {
      toast.error('Error generating pattern image');
    } finally {
      setLoading(false);
    }
  };

  const bulkGenerate = async (type) => {
    try {
      setLoading(true);
      await axios.post('/api/ai-images/bulk-generate', {
        type,
        limit: 5
      });
      toast.success(`Bulk ${type} generation started`);
      fetchGeneratedImages();
    } catch (error) {
      toast.error('Error starting bulk generation');
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (filename) => {
    try {
      await axios.delete(`/api/ai-images/images/${filename}`);
      toast.success('Image deleted successfully');
      fetchGeneratedImages();
    } catch (error) {
      toast.error('Error deleting image');
    }
  };

  const downloadImage = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-divine-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Image Generator
          </h1>
          <p className="text-gray-600">
            Generate high-quality, copyright-free images for your Bharat Vastra platform
          </p>
        </div>

        {/* Bot Status Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
              <Zap className="w-6 h-6 mr-2 text-divine-orange-500" />
              Bot Status
            </h2>
            <div className="flex space-x-3">
              <button
                onClick={startBot}
                disabled={loading || botStatus?.isRunning}
                className="btn-primary flex items-center disabled:opacity-50"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Bot
              </button>
              <button
                onClick={stopBot}
                disabled={loading || !botStatus?.isRunning}
                className="btn-secondary flex items-center disabled:opacity-50"
              >
                <Square className="w-4 h-4 mr-2" />
                Stop Bot
              </button>
            </div>
          </div>

          {botStatus && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl">
                <div className="text-2xl font-bold text-green-600">
                  {botStatus.successful}
                </div>
                <div className="text-sm text-green-700">Successful</div>
              </div>
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl">
                <div className="text-2xl font-bold text-red-600">
                  {botStatus.failed}
                </div>
                <div className="text-sm text-red-700">Failed</div>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">
                  {botStatus.totalGenerated}
                </div>
                <div className="text-sm text-blue-700">Total Generated</div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">
                  {botStatus.isRunning ? 'Running' : 'Stopped'}
                </div>
                <div className="text-sm text-purple-700">Status</div>
              </div>
            </div>
          )}
        </div>

        {/* Generation Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Custom Image Generation */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Plus className="w-5 h-5 mr-2 text-divine-orange-500" />
              Custom Image
            </h3>
            <div className="space-y-4">
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Describe the image you want to generate..."
                className="input-field h-24 resize-none"
              />
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  placeholder="Width"
                  value={imageOptions.width}
                  onChange={(e) => setImageOptions({...imageOptions, width: parseInt(e.target.value)})}
                  className="input-field text-center"
                />
                <input
                  type="number"
                  placeholder="Height"
                  value={imageOptions.height}
                  onChange={(e) => setImageOptions({...imageOptions, height: parseInt(e.target.value)})}
                  className="input-field text-center"
                />
                <input
                  type="number"
                  placeholder="Quality"
                  value={imageOptions.quality}
                  onChange={(e) => setImageOptions({...imageOptions, quality: parseInt(e.target.value)})}
                  className="input-field text-center"
                />
              </div>
              <button
                onClick={generateCustomImage}
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Image className="w-4 h-4 mr-2" />
                )}
                Generate Custom Image
              </button>
            </div>
          </div>

          {/* Category Image Generation */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-divine-orange-500" />
              Category Images
            </h3>
            <div className="space-y-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <button
                onClick={generateCategoryImage}
                disabled={loading || !selectedCategory}
                className="btn-primary w-full flex items-center justify-center"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Image className="w-4 h-4 mr-2" />
                )}
                Generate Category Image
              </button>
            </div>
          </div>

          {/* Pattern Generation */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-divine-orange-500" />
              Background Patterns
            </h3>
            <div className="space-y-4">
              <select
                value={selectedPattern}
                onChange={(e) => setSelectedPattern(e.target.value)}
                className="input-field"
              >
                <option value="">Select Pattern</option>
                {patterns.map(pattern => (
                  <option key={pattern} value={pattern}>
                    {pattern.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
              <button
                onClick={generatePatternImage}
                disabled={loading || !selectedPattern}
                className="btn-primary w-full flex items-center justify-center"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Image className="w-4 h-4 mr-2" />
                )}
                Generate Pattern
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Generation */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Bulk Generation</h3>
          <div className="flex space-x-4">
            <button
              onClick={() => bulkGenerate('products')}
              disabled={loading}
              className="btn-secondary flex items-center"
            >
              <Image className="w-4 h-4 mr-2" />
              Generate Product Images
            </button>
            <button
              onClick={() => bulkGenerate('categories')}
              disabled={loading}
              className="btn-secondary flex items-center"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Category Images
            </button>
            <button
              onClick={() => bulkGenerate('patterns')}
              disabled={loading}
              className="btn-secondary flex items-center"
            >
              <Settings className="w-4 h-4 mr-2" />
              Generate Patterns
            </button>
          </div>
        </div>

        {/* Generated Images Gallery */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Generated Images</h3>
            <button
              onClick={fetchGeneratedImages}
              className="btn-ghost flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {generatedImages.map((image) => (
              <div key={image.filename} className="bg-gray-50 rounded-xl overflow-hidden group">
                <div className="relative aspect-square">
                  <img
                    src={image.url}
                    alt={image.filename}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                      <button
                        onClick={() => downloadImage(image.url, image.filename)}
                        className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4 text-gray-700" />
                      </button>
                      <button
                        onClick={() => window.open(image.url, '_blank')}
                        className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors"
                        title="View Full Size"
                      >
                        <Eye className="w-4 h-4 text-gray-700" />
                      </button>
                      <button
                        onClick={() => deleteImage(image.filename)}
                        className="bg-red-500 p-2 rounded-full hover:bg-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {image.filename}
                  </div>
                  <div className="text-xs text-gray-500 capitalize">
                    {image.type} • {new Date(image.created).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-400">
                    {(image.size / 1024).toFixed(1)} KB
                  </div>
                </div>
              </div>
            ))}
          </div>

          {generatedImages.length === 0 && (
            <div className="text-center py-12">
              <Image className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No generated images yet</p>
              <p className="text-sm text-gray-400">Start generating images using the controls above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIImageGenerator;
