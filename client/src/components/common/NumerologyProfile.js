import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  calculateLifePathNumber, 
  getNumerologyProfile, 
  getPersonalizedColors,
  getPersonalizedGemstones,
  getPersonalizedThemes,
  getPersonalizedRecommendations,
  generatePersonalizedCSS
} from '../../utils/numerologyCalculator';
import { Sparkles, Gem, Palette, Heart, Star, Zap } from 'lucide-react';

const NumerologyProfile = () => {
  const { user } = useAuth();
  const [lifePathNumber, setLifePathNumber] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (user?.dateOfBirth) {
      const calculatedNumber = calculateLifePathNumber(user.dateOfBirth);
      setLifePathNumber(calculatedNumber);
      
      if (calculatedNumber) {
        const numerologyProfile = getNumerologyProfile(calculatedNumber);
        setProfile(numerologyProfile);
        
        // Apply personalized CSS
        const personalizedCSS = generatePersonalizedCSS(calculatedNumber);
        if (personalizedCSS) {
          const styleElement = document.createElement('style');
          styleElement.id = 'numerology-css';
          styleElement.textContent = personalizedCSS;
          document.head.appendChild(styleElement);
        }
      }
    }
  }, [user]);

  if (!user?.dateOfBirth || !lifePathNumber || !profile) {
    return null;
  }

  const colors = getPersonalizedColors(lifePathNumber);
  const gemstones = getPersonalizedGemstones(lifePathNumber);
  const themes = getPersonalizedThemes(lifePathNumber);
  const recommendations = getPersonalizedRecommendations(lifePathNumber);

  const isMasterNumber = [11, 22, 33].includes(lifePathNumber);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
               style={{ backgroundColor: colors.primary }}>
            {lifePathNumber}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
            <p className="text-sm text-gray-600">Life Path Number {lifePathNumber}</p>
          </div>
        </div>
        {isMasterNumber && (
          <div className="flex items-center text-purple-600">
            <Sparkles className="w-5 h-5 mr-1" />
            <span className="text-sm font-semibold">Master Number</span>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="mb-6 p-4 rounded-lg"
           style={{ backgroundColor: `${colors.primary}10` }}>
        <p className="text-gray-700">{profile.description}</p>
        <p className="text-sm text-gray-600 mt-2">
          <strong>Personality:</strong> {profile.personality}
        </p>
      </div>

      {/* Discount Badge */}
      <div className="mb-6 p-4 rounded-lg border-2 border-dashed"
           style={{ borderColor: colors.primary }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Your Numerology Discount</h3>
            <p className="text-sm text-gray-600">Exclusive to your life path number</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold"
                 style={{ color: colors.primary }}>
              {profile.discount}%
            </div>
            <div className="text-xs text-gray-500">OFF</div>
          </div>
        </div>
      </div>

      {/* Toggle Details */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full mb-4 p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors flex items-center justify-center space-x-2"
        style={{ color: colors.primary }}
      >
        <span>{showDetails ? 'Hide' : 'Show'} Numerology Details</span>
        <Zap className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
      </button>

      {/* Detailed Information */}
      {showDetails && (
        <div className="space-y-6">
          {/* Colors */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Palette className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
              Your Lucky Colors
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-gray-200"
                     style={{ backgroundColor: colors.primary }}></div>
                <p className="text-xs text-gray-600">Primary</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-gray-200"
                     style={{ backgroundColor: colors.secondary }}></div>
                <p className="text-xs text-gray-600">Secondary</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-gray-200"
                     style={{ backgroundColor: colors.accent }}></div>
                <p className="text-xs text-gray-600">Accent</p>
              </div>
            </div>
          </div>

          {/* Gemstones */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Gem className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
              Your Lucky Gemstones
            </h3>
            <div className="flex flex-wrap gap-2">
              {gemstones.map((gemstone, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: `${colors.primary}20`,
                    color: colors.primary
                  }}
                >
                  {gemstone}
                </span>
              ))}
            </div>
          </div>

          {/* Themes */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Star className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
              Your Life Themes
            </h3>
            <div className="flex flex-wrap gap-2">
              {themes.map((theme, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: `${colors.secondary}20`,
                    color: colors.secondary
                  }}
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>

          {/* Product Recommendations */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Heart className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
              Recommended for You
            </h3>
            <div className="space-y-2">
              {recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg text-sm"
                  style={{ backgroundColor: `${colors.accent}10` }}
                >
                  {recommendation}
                </div>
              ))}
            </div>
          </div>

          {/* Numerology Insight */}
          <div className="p-4 rounded-lg border-l-4"
               style={{ 
                 backgroundColor: `${colors.primary}05`,
                 borderLeftColor: colors.primary
               }}>
            <h4 className="font-semibold text-gray-900 mb-2">Numerology Insight</h4>
            <p className="text-sm text-gray-700">
              Your life path number {lifePathNumber} reveals your unique journey and purpose. 
              {isMasterNumber && ' As a Master Number, you carry special spiritual significance and enhanced intuitive abilities.'}
              Embrace your natural gifts and let them guide your choices in life and style.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NumerologyProfile;
