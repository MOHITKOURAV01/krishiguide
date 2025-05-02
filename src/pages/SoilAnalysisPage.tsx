import React, { useState } from 'react';

interface SoilData {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  moisture: number;
  soilType: string;
}

interface SoilRecommendation {
  crop: string;
  fertilizer: string;
  reason: string;
  image?: string;
}

const SoilAnalysisPage: React.FC = () => {
  const initialSoilData: SoilData = {
    ph: 7.0,
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
    moisture: 50,
    soilType: 'loam',
  };

  const [soilData, setSoilData] = useState<SoilData>(initialSoilData);
  const [recommendations, setRecommendations] = useState<SoilRecommendation[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const soilTypes = [
    { value: 'clay', label: 'Clay', image: 'https://images.unsplash.com/photo-1635521384642-8da6422d4c55?auto=format&q=80' },
    { value: 'sandy', label: 'Sandy', image: 'https://images.unsplash.com/photo-1560396381-04747bde3de5?auto=format&q=80' },
    { value: 'loam', label: 'Loam', image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&q=80' },
    { value: 'silt', label: 'Silt', image: 'https://images.unsplash.com/photo-1610398752800-146f269dfcc8?auto=format&q=80' },
    { value: 'chalk', label: 'Chalk', image: 'https://images.unsplash.com/photo-1613977512484-552cc38edad4?auto=format&q=80' },
    { value: 'peat', label: 'Peat', image: 'https://images.unsplash.com/photo-1627379489413-651a273d5aae?auto=format&q=80' },
  ];

  const parameterIcons = {
    ph: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.168 1.168a4 4 0 01-8.092-.09L8.12 8.28A3 3 0 009 6.172z" clipRule="evenodd" /></svg>,
    nitrogen: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" /></svg>,
    phosphorus: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" /></svg>,
    potassium: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" /></svg>,
    moisture: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-500" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>,
    soilType: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-soil-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" /></svg>,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSoilData({
      ...soilData,
      [name]: name === 'soilType' ? value : Number(value),
    });
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    const recommendedCrops = generateRecommendations(soilData);
    setRecommendations(recommendedCrops);
    setShowResults(true);
  };

  const handleReset = () => {
    setSoilData(initialSoilData);
    setRecommendations([]);
    setShowResults(false);
  };

  const generateRecommendations = (soil: SoilData): SoilRecommendation[] => {
    const recommendations: SoilRecommendation[] = [];

    if (soil.ph >= 6.0 && soil.ph <= 7.0) {
      recommendations.push({
        crop: 'Potato',
        fertilizer: 'Potassium sulfate',
        reason: 'Potatoes thrive in slightly acidic soil (pH 6.0-7.0). Adding potassium sulfate can improve tuber quality.',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&q=80'
      });
    }

    if (soil.ph >= 5.5 && soil.ph <= 7.0) {
      recommendations.push({
        crop: 'Tomato',
        fertilizer: 'Balanced NPK with calcium',
        reason: 'Tomatoes prefer slightly acidic to neutral pH. Calcium supplementation prevents blossom end rot.',
        image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&q=80'
      });
    }

    if (soil.ph >= 6.5 && soil.ph <= 7.5) {
      recommendations.push({
        crop: 'Cabbage',
        fertilizer: 'Nitrogen-rich compost',
        reason: 'Cabbage grows best in neutral soil and benefits from nitrogen for leafy growth.',
        image: 'https://images.unsplash.com/photo-1594282486552-05a9a018a578?auto=format&q=80'
      });
    }

    if (soil.soilType === 'loam') {
      recommendations.push({
        crop: 'Wheat',
        fertilizer: 'Balanced NPK (10-10-10)',
        reason: 'Wheat grows excellently in loamy soil with good drainage and nutrient retention.',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6962b3?auto=format&q=80'
      });
      recommendations.push({
        crop: 'Maize',
        fertilizer: 'Nitrogen-focused fertilizer',
        reason: 'Maize/corn performs well in loamy soil and benefits from nitrogen during growth phases.',
        image: 'https://images.unsplash.com/photo-1601329980844-9eeb0c10a003?auto=format&q=80'
      });
    }

    if (soil.soilType === 'clay') {
      recommendations.push({
        crop: 'Rice',
        fertilizer: 'Nitrogen and phosphorus',
        reason: 'Clay soils retain water well, making them ideal for rice cultivation.',
        image: 'https://images.unsplash.com/photo-1536617621572-2138758bf798?auto=format&q=80'
      });
      recommendations.push({
        crop: 'Lentil',
        fertilizer: 'Phosphorus and potassium',
        reason: 'Lentils can adapt to clay soils and help improve soil structure through nitrogen fixation.',
        image: 'https://images.unsplash.com/photo-1611575309648-1aa97da614cc?auto=format&q=80'
      });
    }

    if (soil.soilType === 'sandy') {
      recommendations.push({
        crop: 'Groundnut',
        fertilizer: 'Organic matter and calcium',
        reason: 'Groundnuts (peanuts) perform well in sandy soil which facilitates harvesting.',
        image: 'https://images.unsplash.com/photo-1567164472491-42553e7e1a30?auto=format&q=80'
      });
      recommendations.push({
        crop: 'Carrot',
        fertilizer: 'Balanced low-nitrogen fertilizer',
        reason: 'Sandy soil allows for straight root growth in carrots without obstruction.',
        image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&q=80'
      });
    }

    if (soil.nitrogen < 40) {
      recommendations.push({
        crop: 'Legumes (Beans, Peas)',
        fertilizer: 'Rhizobium inoculant',
        reason: 'Legumes can fix atmospheric nitrogen in low-nitrogen soils with the help of rhizobium bacteria.',
        image: 'https://images.unsplash.com/photo-1657542903421-607ec2e71b5a?auto=format&q=80'
      });
    }

    if (soil.phosphorus < 40) {
      recommendations.push({
        crop: 'Mustard',
        fertilizer: 'Rock phosphate or bone meal',
        reason: 'Mustard can grow in phosphorus-deficient soils. Add rock phosphate for better yields.',
        image: 'https://images.unsplash.com/photo-1625944525533-473d1ae3897d?auto=format&q=80'
      });
    }

    if (soil.potassium < 40) {
      recommendations.push({
        crop: 'Sweet Potato',
        fertilizer: 'Wood ash or potassium sulfate',
        reason: 'Sweet potatoes can grow in low-potassium soils but benefit from potassium supplements for tuber development.',
        image: 'https://images.unsplash.com/photo-1596123068083-d799f0925e46?auto=format&q=80'
      });
    }

    if (soil.ph > 7.5) {
      recommendations.push({
        crop: 'Barley',
        fertilizer: 'Sulfur amendments to lower pH gradually',
        reason: 'Barley is tolerant of alkaline soils. Gradually lower pH with sulfur for more options in the future.',
        image: 'https://images.unsplash.com/photo-1588282322673-c31965a75c3e?auto=format&q=80'
      });
    }

    if (soil.ph < 5.5) {
      recommendations.push({
        crop: 'Blueberry',
        fertilizer: 'Ammonium sulfate',
        reason: 'Blueberries thrive in acidic soils and benefit from ammonium-based fertilizers.',
        image: 'https://images.unsplash.com/photo-1606757389667-45446f4e9a0f?auto=format&q=80'
      });
    }

    if (soil.moisture > 70) {
      recommendations.push({
        crop: 'Taro',
        fertilizer: 'Balanced NPK with micronutrients',
        reason: 'Taro thrives in high-moisture environments and water-logged conditions.',
        image: 'https://images.unsplash.com/photo-1591768842253-a5ae2748a123?auto=format&q=80'
      });
    }

    return recommendations;
  };

  const getSoilTypeImage = () => {
    const soilType = soilTypes.find(type => type.value === soilData.soilType);
    return soilType?.image || 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&q=80';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-r from-soil-700 to-soil-900 rounded-xl p-8 text-white mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-soil-pattern mix-blend-overlay"></div>
        <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h1 className="text-3xl font-bold mb-2 fancy-title">Soil Health Analysis</h1>
            <p className="mb-4 text-soil-100 max-w-xl">
              Input your soil parameters to receive customized crop and fertilizer recommendations 
              based on scientific data and agricultural best practices.
            </p>
            <div className="flex space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                Soil Analysis
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                Crop Recommendations
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                Fertilizer Guide
              </span>
            </div>
          </div>
          <div className="w-40 h-40 overflow-hidden rounded-full border-4 border-white border-opacity-30 shadow-xl bg-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&q=80" 
              alt="Soil health" 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = 'https://via.placeholder.com/400x400?text=Soil+Health';
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
        <form onSubmit={handleAnalyze} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-2">
                {parameterIcons.ph}
                <label className="block text-gray-700 dark:text-gray-300 ml-2">Soil pH Level (0-14)</label>
              </div>
              <input
                type="range"
                name="ph"
                min="3"
                max="10"
                step="0.1"
                value={soilData.ph}
                onChange={handleInputChange}
                className="w-full accent-primary-500"
              />
              <div className="flex justify-between text-sm mt-1">
                <span className="text-red-500">Acidic (3)</span>
                <span className="font-medium text-primary-600 dark:text-primary-400">{soilData.ph}</span>
                <span className="text-blue-500">Alkaline (10)</span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-2">
                {parameterIcons.nitrogen}
                <label className="block text-gray-700 dark:text-gray-300 ml-2">Nitrogen (ppm)</label>
              </div>
              <input
                type="range"
                name="nitrogen"
                min="0"
                max="100"
                value={soilData.nitrogen}
                onChange={handleInputChange}
                className="w-full accent-blue-500"
              />
              <div className="flex justify-between text-sm mt-1">
                <span className="text-red-500">Low (0)</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">{soilData.nitrogen}</span>
                <span className="text-green-500">High (100)</span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-2">
                {parameterIcons.phosphorus}
                <label className="block text-gray-700 dark:text-gray-300 ml-2">Phosphorus (ppm)</label>
              </div>
              <input
                type="range"
                name="phosphorus"
                min="0"
                max="100"
                value={soilData.phosphorus}
                onChange={handleInputChange}
                className="w-full accent-yellow-500"
              />
              <div className="flex justify-between text-sm mt-1">
                <span className="text-red-500">Low (0)</span>
                <span className="font-medium text-yellow-600 dark:text-yellow-400">{soilData.phosphorus}</span>
                <span className="text-green-500">High (100)</span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-2">
                {parameterIcons.potassium}
                <label className="block text-gray-700 dark:text-gray-300 ml-2">Potassium (ppm)</label>
              </div>
              <input
                type="range"
                name="potassium"
                min="0"
                max="100"
                value={soilData.potassium}
                onChange={handleInputChange}
                className="w-full accent-purple-500"
              />
              <div className="flex justify-between text-sm mt-1">
                <span className="text-red-500">Low (0)</span>
                <span className="font-medium text-purple-600 dark:text-purple-400">{soilData.potassium}</span>
                <span className="text-green-500">High (100)</span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-2">
                {parameterIcons.moisture}
                <label className="block text-gray-700 dark:text-gray-300 ml-2">Soil Moisture (%)</label>
              </div>
              <input
                type="range"
                name="moisture"
                min="0"
                max="100"
                value={soilData.moisture}
                onChange={handleInputChange}
                className="w-full accent-sky-500"
              />
              <div className="flex justify-between text-sm mt-1">
                <span className="text-red-500">Dry (0%)</span>
                <span className="font-medium text-sky-600 dark:text-sky-400">{soilData.moisture}%</span>
                <span className="text-blue-500">Wet (100%)</span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-2">
                {parameterIcons.soilType}
                <label className="block text-gray-700 dark:text-gray-300 ml-2">Soil Type</label>
              </div>
              <select
                name="soilType"
                value={soilData.soilType}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                {soilTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <div className="mt-3 h-16 overflow-hidden rounded-lg bg-gray-100">
                <img 
                  src={getSoilTypeImage()} 
                  alt={soilData.soilType} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&q=80';
                  }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <button
              type="submit"
              className="bg-gradient-primary hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-sm hover:shadow-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Analyze Soil
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
          </div>
        </form>

        {showResults && (
          <div className="mt-8 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 fancy-title">
              Your Soil Analysis Results
            </h2>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-750 dark:to-gray-700 p-5 rounded-xl mb-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
                Soil Parameters Summary
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm flex items-center space-x-3">
                  {parameterIcons.ph}
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">pH Level:</span>
                    <div className="text-gray-800 dark:text-gray-100 font-medium">{soilData.ph}</div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm flex items-center space-x-3">
                  {parameterIcons.nitrogen}
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">Nitrogen:</span>
                    <div className="text-gray-800 dark:text-gray-100 font-medium">{soilData.nitrogen} ppm</div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm flex items-center space-x-3">
                  {parameterIcons.phosphorus}
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">Phosphorus:</span>
                    <div className="text-gray-800 dark:text-gray-100 font-medium">{soilData.phosphorus} ppm</div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm flex items-center space-x-3">
                  {parameterIcons.potassium}
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">Potassium:</span>
                    <div className="text-gray-800 dark:text-gray-100 font-medium">{soilData.potassium} ppm</div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm flex items-center space-x-3">
                  {parameterIcons.moisture}
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">Moisture:</span>
                    <div className="text-gray-800 dark:text-gray-100 font-medium">{soilData.moisture}%</div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm flex items-center space-x-3">
                  {parameterIcons.soilType}
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">Soil Type:</span>
                    <div className="text-gray-800 dark:text-gray-100 font-medium">
                      {soilTypes.find((type) => type.value === soilData.soilType)?.label}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              Recommended Crops & Fertilizers
            </h3>

            {recommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-750 p-5 rounded-xl shadow-sm border-l-4 border-primary-500 transition-all duration-300 hover:shadow-md card-hover"
                  >
                    <div className="flex">
                      <div className="w-20 h-20 rounded-lg overflow-hidden mr-4 flex-shrink-0 bg-gray-100">
                        <img
                          src={rec.image || 'https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&q=80'}
                          alt={rec.crop}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&q=80';
                          }}
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100">{rec.crop}</h4>
                          <span className="text-sm text-white px-2 py-1 rounded-full bg-gradient-primary">
                            {rec.fertilizer}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{rec.reason}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-750 p-5 rounded-xl shadow text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-600 dark:text-gray-300">
                  No specific crop recommendations for the current soil parameters.
                </p>
              </div>
            )}
            
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/30 p-5 rounded-xl text-blue-800 dark:text-blue-200 flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 flex-shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium mb-1">Important Note</p>
                <p className="text-sm">
                  These recommendations are based on the soil parameters you provided.
                  For the most accurate results, consider getting your soil professionally tested at a local
                  agricultural extension office or laboratory.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoilAnalysisPage; 