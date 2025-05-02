import React, { useState } from 'react';

// Crop icon mapping for visual enhancement
const cropIcons: {[key: string]: string} = {
  'Rice': '🍚',
  'Wheat': '🌾',
  'Maize': '🌽',
  'Chickpea': '🌱',
  'Potato': '🥔',
  'Cotton': '🧵',
  'Sugarcane': '🎋',
  'Blueberries': '🫐',
  'Sweet Potatoes': '🍠',
  'Cabbage': '🥬',
  'Cauliflower': '🥦',
  'Asparagus': '🥬',
  'Beans': '🫘',
  'Carrots': '🥕'
};

interface CropFormValues {
  soilPH: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  temperature: string;
  rainfall: string;
}

const CropRecommendationPage: React.FC = () => {
  const [formValues, setFormValues] = useState<CropFormValues>({
    soilPH: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    rainfall: ''
  });
  
  const [showResults, setShowResults] = useState(false);
  const [recommendedCrops, setRecommendedCrops] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with a short delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Simple logic for crop recommendation based on inputs
    const crops: string[] = [];
    
    const ph = parseFloat(formValues.soilPH);
    const n = parseFloat(formValues.nitrogen);
    const p = parseFloat(formValues.phosphorus);
    const k = parseFloat(formValues.potassium);
    const temp = parseFloat(formValues.temperature);
    const rain = parseFloat(formValues.rainfall);
    
    if (rain > 100 && temp > 20 && ph >= 5.5 && ph <= 6.5) {
      crops.push('Rice');
    }
    
    if (rain > 40 && rain < 100 && temp > 15 && temp < 25 && ph >= 6.0 && ph <= 7.5) {
      crops.push('Wheat');
    }
    
    if (n > 50 && p > 40 && k > 30 && temp > 18 && temp < 30 && ph >= 5.5 && ph <= 7.0) {
      crops.push('Maize');
    }
    
    if (rain < 60 && temp > 15 && temp < 30 && ph >= 6.0 && ph <= 8.0) {
      crops.push('Chickpea');
    }
    
    if (k > 80 && temp > 15 && temp < 24 && ph >= 5.0 && ph <= 6.5) {
      crops.push('Potato');
    }
    
    if (temp > 22 && rain > 70 && ph >= 5.5 && ph <= 8.0) {
      crops.push('Cotton');
    }
    
    if (rain > 120 && n > 80 && p > 60 && k > 80 && temp > 20 && ph >= 6.0 && ph <= 7.5) {
      crops.push('Sugarcane');
    }
    
    if (crops.length === 0) {
      if (ph < 5.5) {
        crops.push('The soil is too acidic. Consider crops like Blueberries, Potatoes, or Sweet Potatoes.');
      } else if (ph > 7.5) {
        crops.push('The soil is too alkaline. Consider crops like Cabbage, Cauliflower, or Asparagus.');
      } else {
        crops.push('Based on your inputs, consider improving soil with organic matter and try crops like Beans or Carrots.');
      }
    }
    
    setRecommendedCrops(crops);
    setShowResults(true);
    setIsLoading(false);
  };
  
  const resetForm = () => {
    setFormValues({
      soilPH: '',
      nitrogen: '',
      phosphorus: '',
      potassium: '',
      temperature: '',
      rainfall: ''
    });
    setShowResults(false);
  };

  // Helper function to get icon for crop name
  const getCropIcon = (cropName: string): string => {
    // Extract crop name from a recommendation string if needed
    const cropWords = Object.keys(cropIcons);
    for (const crop of cropWords) {
      if (cropName.includes(crop)) {
        return cropIcons[crop];
      }
    }
    return '🌱'; // Default icon
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section with image background (reverted) */}
      <div className="bg-cover bg-center rounded-xl p-8 text-white mb-8" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2532")' }}>
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-5xl">🌱</div>
          <h1 className="text-3xl md:text-4xl font-bold">Crop Recommendation</h1>
        </div>
        <p className="mb-6 max-w-2xl text-white/90 text-lg">
          Enter your soil and climate details to receive personalized crop recommendations 
          based on scientific analysis.
        </p>
        <div className="flex flex-wrap gap-3">
          <div className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
            <span className="text-lg mr-2">🧪</span>
            <span className="text-sm">Soil Analysis</span>
          </div>
          <div className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
            <span className="text-lg mr-2">☀️</span>
            <span className="text-sm">Climate Data</span>
          </div>
          <div className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
            <span className="text-lg mr-2">🌾</span>
            <span className="text-sm">Smart Recommendations</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Enter Your Farm Details
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="group">
              <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">Soil pH (0-14)</label>
              <div className="relative">
                <input
                  type="number"
                  name="soilPH"
                  value={formValues.soilPH}
                  onChange={handleInputChange}
                  placeholder="e.g. 6.5"
                  step="0.1"
                  min="0"
                  max="14"
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🧪</div>
              </div>
              <div className="mt-1 flex items-center">
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500"></div>
                </div>
                <div className="flex justify-between w-full px-1 text-xs text-gray-500 dark:text-gray-400">
                  <span>Acidic</span>
                  <span>Neutral</span>
                  <span>Alkaline</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Neutral pH is 7. Below 7 is acidic, above 7 is alkaline.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="group">
                <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">Nitrogen (N) kg/ha</label>
                <div className="relative">
                  <input
                    type="number"
                    name="nitrogen"
                    value={formValues.nitrogen}
                    onChange={handleInputChange}
                    placeholder="e.g. 80"
                    min="0"
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">N</div>
                </div>
              </div>
              
              <div className="group">
                <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">Phosphorus (P) kg/ha</label>
                <div className="relative">
                  <input
                    type="number"
                    name="phosphorus"
                    value={formValues.phosphorus}
                    onChange={handleInputChange}
                    placeholder="e.g. 45"
                    min="0"
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">P</div>
                </div>
              </div>
              
              <div className="group">
                <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">Potassium (K) kg/ha</label>
                <div className="relative">
                  <input
                    type="number"
                    name="potassium"
                    value={formValues.potassium}
                    onChange={handleInputChange}
                    placeholder="e.g. 60"
                    min="0"
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">K</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group">
                <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">Temperature (°C)</label>
                <div className="relative">
                  <input
                    type="number"
                    name="temperature"
                    value={formValues.temperature}
                    onChange={handleInputChange}
                    placeholder="e.g. 25"
                    step="0.1"
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🌡️</div>
                </div>
              </div>
              
              <div className="group">
                <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">Rainfall (mm)</label>
                <div className="relative">
                  <input
                    type="number"
                    name="rainfall"
                    value={formValues.rainfall}
                    onChange={handleInputChange}
                    placeholder="e.g. 100"
                    min="0"
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🌧️</div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <span className="mr-2">🔍</span>
                    Get Recommendations
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2.5 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:shadow-xl">
          {showResults ? (
            <>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Recommended Crops
                </h2>
              </div>
              
              {recommendedCrops.length > 0 ? (
                <div className="space-y-4">
                  {recommendedCrops.map((crop, index) => {
                    // Check if this is a special message about soil
                    const isSpecialMessage = crop.includes('soil is too') || crop.includes('Based on your inputs');
                    
                    if (isSpecialMessage) {
                      return (
                        <div key={index} className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg border-l-4 border-amber-500">
                          <p className="text-amber-800 dark:text-amber-200">{crop}</p>
                        </div>
                      );
                    }
                    
                    // Regular crop recommendation
                    return (
                      <div 
                        key={index} 
                        className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-5 rounded-lg border border-green-100 dark:border-green-900/30 shadow-sm animate-fadeIn"
                        style={{animationDelay: `${index * 150}ms`}}
                      >
                        <div className="flex items-center">
                          <div className="text-4xl mr-4">{cropIcons[crop] || '🌱'}</div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">{crop}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Highly suitable for your conditions</p>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          <div className="bg-white dark:bg-gray-800 rounded p-2 text-center">
                            <span className="text-xs text-gray-500 dark:text-gray-400 block">Soil pH</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">Optimal</span>
                          </div>
                          <div className="bg-white dark:bg-gray-800 rounded p-2 text-center">
                            <span className="text-xs text-gray-500 dark:text-gray-400 block">Nutrients</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">Sufficient</span>
                          </div>
                          <div className="bg-white dark:bg-gray-800 rounded p-2 text-center">
                            <span className="text-xs text-gray-500 dark:text-gray-400 block">Climate</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">Suitable</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mt-6 border-l-4 border-blue-500">
                    <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Important Note
                    </h3>
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      These recommendations are based on general guidelines. For the most accurate results, consider 
                      consulting with a local agricultural expert or conducting a professional soil test.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center">
                  <p className="text-gray-600 dark:text-gray-300">
                    No specific crop recommendations available for the provided parameters.
                    Please adjust your inputs and try again.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-24 h-24 mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl">🌱</span>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-3">
                Smart Crop Recommendations
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base max-w-sm mx-auto">
                Fill in the form to get personalized crop suggestions based on your soil and climate conditions.
              </p>
              <div className="mt-6 bg-gray-50 dark:bg-gray-750 p-4 rounded-lg max-w-sm mx-auto">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Benefits:</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Increased yield potential
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Optimized resource usage
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Better crop quality & resilience
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden mt-8">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            How It Works
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
          <div className="p-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
            <div className="w-14 h-14 rounded-full mb-4 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white text-lg">1</div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">Input Data</h3>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              Enter your soil parameters (pH, NPK), temperature, and rainfall data to help our system analyze your growing conditions.
            </p>
            <div className="mt-4 text-center">
              <div className="text-2xl mb-1">🧪 📊 🌡️</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Soil & Climate Analysis</p>
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
            <div className="w-14 h-14 rounded-full mb-4 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-lg">2</div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">Intelligent Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              Our system analyzes your data using agricultural models that match crops to their ideal growing environments.
            </p>
            <div className="mt-4 text-center">
              <div className="text-2xl mb-1">🔍 💻 📈</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Advanced Processing</p>
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
            <div className="w-14 h-14 rounded-full mb-4 bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white text-lg">3</div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">Smart Recommendations</h3>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              Receive a list of crops best suited for your specific conditions, helping you make informed planting decisions.
            </p>
            <div className="mt-4 text-center">
              <div className="text-2xl mb-1">🌾 🥔 🫘</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Optimal Crop Selection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropRecommendationPage; 