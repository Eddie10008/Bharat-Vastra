// Numerology Life Path Calculator for Backend
// Based on the methodology from numerology.com

const calculateLifePathNumber = (dateOfBirth) => {
  if (!dateOfBirth) return null;
  
  const date = new Date(dateOfBirth);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  // Convert each component to string and sum all digits
  const dayDigits = day.toString().split('').map(d => parseInt(d));
  const monthDigits = month.toString().split('').map(d => parseInt(d));
  const yearDigits = year.toString().split('').map(d => parseInt(d));
  
  const daySum = dayDigits.reduce((sum, digit) => sum + digit, 0);
  const monthSum = monthDigits.reduce((sum, digit) => sum + digit, 0);
  const yearSum = yearDigits.reduce((sum, digit) => sum + digit, 0);
  
  // Add all sums
  const total = daySum + monthSum + yearSum;
  
  // Check for Master Numbers (11, 22, 33)
  if (total === 11 || total === 22 || total === 33) {
    return total; // Master numbers are not reduced
  }
  
  // Reduce to single digit
  return reduceToSingleDigit(total);
};

const reduceToSingleDigit = (number) => {
  if (number < 10) return number;
  
  const sum = number.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  
  // Check for Master Numbers in the sum
  if (sum === 11 || sum === 22 || sum === 33) {
    return sum; // Master numbers are not reduced
  }
  
  return sum < 10 ? sum : reduceToSingleDigit(sum);
};

// Numerology profiles for each life path number
const numerologyProfiles = {
  1: {
    name: "The Pioneer",
    description: "Natural leaders with strong individuality and determination",
    colors: {
      primary: "#FF6B35", // Orange
      secondary: "#F7931E", // Gold
      accent: "#E63946" // Red
    },
    gemstones: ["Ruby", "Carnelian", "Red Jasper"],
    themes: ["Leadership", "Innovation", "Independence"],
    personality: "Ambitious, confident, and pioneering",
    discount: 10,
    productRecommendations: ["Bold traditional sarees", "Red and orange color schemes", "Statement jewelry"]
  },
  2: {
    name: "The Diplomat",
    description: "Peaceful mediators with strong intuition and sensitivity",
    colors: {
      primary: "#6B73FF", // Soft Blue
      secondary: "#A8E6CF", // Mint Green
      accent: "#FFB3BA" // Soft Pink
    },
    gemstones: ["Pearl", "Moonstone", "Aquamarine"],
    themes: ["Harmony", "Partnership", "Intuition"],
    personality: "Cooperative, diplomatic, and intuitive",
    discount: 12,
    productRecommendations: ["Soft pastel sarees", "Pearl jewelry", "Floral patterns"]
  },
  3: {
    name: "The Communicator",
    description: "Creative and expressive individuals with natural charm",
    colors: {
      primary: "#FFD93D", // Yellow
      secondary: "#6BCF7F", // Green
      accent: "#4D96FF" // Blue
    },
    gemstones: ["Citrine", "Yellow Sapphire", "Amber"],
    themes: ["Creativity", "Expression", "Joy"],
    personality: "Optimistic, creative, and sociable",
    discount: 14,
    productRecommendations: ["Bright colorful sarees", "Artistic designs", "Bold jewelry"]
  },
  4: {
    name: "The Builder",
    description: "Practical and reliable individuals with strong work ethic",
    colors: {
      primary: "#4A90E2", // Blue
      secondary: "#7ED321", // Green
      accent: "#9013FE" // Purple
    },
    gemstones: ["Sapphire", "Emerald", "Amethyst"],
    themes: ["Stability", "Organization", "Dedication"],
    personality: "Reliable, practical, and disciplined",
    discount: 16,
    productRecommendations: ["Classic silk sarees", "Traditional designs", "Elegant jewelry"]
  },
  5: {
    name: "The Adventurer",
    description: "Freedom-loving individuals with a thirst for new experiences",
    colors: {
      primary: "#FF6B6B", // Coral
      secondary: "#4ECDC4", // Turquoise
      accent: "#45B7D1" // Sky Blue
    },
    gemstones: ["Aquamarine", "Turquoise", "Blue Topaz"],
    themes: ["Freedom", "Adventure", "Change"],
    personality: "Adventurous, versatile, and progressive",
    discount: 18,
    productRecommendations: ["Modern fusion sarees", "Bold patterns", "Contemporary jewelry"]
  },
  6: {
    name: "The Nurturer",
    description: "Caring and responsible individuals with strong family values",
    colors: {
      primary: "#FF8A80", // Pink
      secondary: "#81C784", // Green
      accent: "#FFB74D" // Orange
    },
    gemstones: ["Rose Quartz", "Pink Sapphire", "Rhodochrosite"],
    themes: ["Love", "Responsibility", "Harmony"],
    personality: "Caring, responsible, and nurturing",
    discount: 20,
    productRecommendations: ["Soft silk sarees", "Romantic designs", "Rose gold jewelry"]
  },
  7: {
    name: "The Seeker",
    description: "Spiritual and analytical individuals with deep inner wisdom",
    colors: {
      primary: "#9C27B0", // Purple
      secondary: "#3F51B5", // Indigo
      accent: "#00BCD4" // Cyan
    },
    gemstones: ["Amethyst", "Lapis Lazuli", "Clear Quartz"],
    themes: ["Spirituality", "Wisdom", "Analysis"],
    personality: "Spiritual, analytical, and introspective",
    discount: 18,
    productRecommendations: ["Mystical sarees", "Spiritual symbols", "Crystal jewelry"]
  },
  8: {
    name: "The Achiever",
    description: "Ambitious and powerful individuals with strong material focus",
    colors: {
      primary: "#FFC107", // Gold
      secondary: "#795548", // Brown
      accent: "#607D8B" // Blue Grey
    },
    gemstones: ["Diamond", "Yellow Sapphire", "Tiger's Eye"],
    themes: ["Success", "Power", "Material Achievement"],
    personality: "Ambitious, powerful, and materialistic",
    discount: 16,
    productRecommendations: ["Luxury silk sarees", "Gold embroidery", "Precious jewelry"]
  },
  9: {
    name: "The Humanitarian",
    description: "Compassionate and idealistic individuals with universal love",
    colors: {
      primary: "#E91E63", // Pink
      secondary: "#9C27B0", // Purple
      accent: "#FF5722" // Deep Orange
    },
    gemstones: ["Opal", "Pink Tourmaline", "Rose Quartz"],
    themes: ["Compassion", "Universal Love", "Completion"],
    personality: "Compassionate, idealistic, and humanitarian",
    discount: 14,
    productRecommendations: ["Artistic sarees", "Unique designs", "Charitable collections"]
  },
  11: {
    name: "The Master Intuitive",
    description: "Highly intuitive individuals with spiritual insight and inspiration",
    colors: {
      primary: "#673AB7", // Deep Purple
      secondary: "#3F51B5", // Indigo
      accent: "#00BCD4" // Cyan
    },
    gemstones: ["Lapis Lazuli", "Sodalite", "Azurite"],
    themes: ["Intuition", "Inspiration", "Spiritual Insight"],
    personality: "Intuitive, inspirational, and spiritually aware",
    discount: 35,
    productRecommendations: ["Mystical sarees", "Spiritual designs", "Healing jewelry"]
  },
  22: {
    name: "The Master Builder",
    description: "Visionary individuals with the ability to manifest dreams into reality",
    colors: {
      primary: "#FF9800", // Orange
      secondary: "#4CAF50", // Green
      accent: "#2196F3" // Blue
    },
    gemstones: ["Clear Quartz", "Diamond", "White Sapphire"],
    themes: ["Manifestation", "Vision", "Master Building"],
    personality: "Visionary, practical, and masterful",
    discount: 40,
    productRecommendations: ["Masterpiece sarees", "Exclusive designs", "Premium jewelry"]
  },
  33: {
    name: "The Master Teacher",
    description: "Enlightened individuals with the highest level of spiritual service",
    colors: {
      primary: "#FFD700", // Gold
      secondary: "#FF69B4", // Hot Pink
      accent: "#00CED1" // Dark Turquoise
    },
    gemstones: ["Diamond", "Clear Quartz", "White Pearl"],
    themes: ["Enlightenment", "Spiritual Service", "Master Teaching"],
    personality: "Enlightened, compassionate, and spiritually evolved",
    discount: 50,
    productRecommendations: ["Divine sarees", "Sacred designs", "Enlightened collections"]
  }
};

const getNumerologyProfile = (lifePathNumber) => {
  return numerologyProfiles[lifePathNumber] || null;
};

const calculateDiscount = (lifePathNumber, basePrice) => {
  const profile = getNumerologyProfile(lifePathNumber);
  if (!profile) return 0;
  
  const discountPercentage = profile.discount;
  const discountAmount = (basePrice * discountPercentage) / 100;
  
  return {
    percentage: discountPercentage,
    amount: discountAmount,
    finalPrice: basePrice - discountAmount
  };
};

module.exports = {
  calculateLifePathNumber,
  getNumerologyProfile,
  calculateDiscount
};
