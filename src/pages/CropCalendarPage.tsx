import React, { useState } from 'react';

interface CropData {
  id: number;
  name: string;
  season: 'kharif' | 'rabi' | 'zaid';
  sowingMonth: string;
  harvestingMonth: string;
  waterRequirement: 'low' | 'medium' | 'high';
  soilTypes: string[];
  description: string;
}

const CropCalendarPage: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState<'all' | 'kharif' | 'rabi' | 'zaid'>('all');
  
  // Sample crop data
  const crops: CropData[] = [
    {
      id: 1,
      name: 'Rice',
      season: 'kharif',
      sowingMonth: 'June-July',
      harvestingMonth: 'November-December',
      waterRequirement: 'high',
      soilTypes: ['Alluvial', 'Clay', 'Loamy'],
      description: 'Rice is a staple food crop in India. It requires standing water in fields and warm temperatures for optimal growth.'
    },
    {
      id: 2,
      name: 'Wheat',
      season: 'rabi',
      sowingMonth: 'October-December',
      harvestingMonth: 'March-April',
      waterRequirement: 'medium',
      soilTypes: ['Loamy', 'Clay Loam'],
      description: 'Wheat is a winter crop that thrives in cool temperatures during growth and warm temperatures during maturity.'
    },
    {
      id: 3,
      name: 'Maize',
      season: 'kharif',
      sowingMonth: 'June-July',
      harvestingMonth: 'September-October',
      waterRequirement: 'medium',
      soilTypes: ['Sandy Loam', 'Loamy'],
      description: 'Maize is a versatile crop used for both human consumption and animal feed. It prefers well-drained soils.'
    },
    {
      id: 4,
      name: 'Chickpea',
      season: 'rabi',
      sowingMonth: 'October-November',
      harvestingMonth: 'February-March',
      waterRequirement: 'low',
      soilTypes: ['Sandy Loam', 'Black Soil'],
      description: 'Chickpea is a pulse crop that can fix nitrogen in soil. It requires minimal water and can handle moderate drought.'
    },
    {
      id: 5,
      name: 'Mung Bean',
      season: 'zaid',
      sowingMonth: 'March-April',
      harvestingMonth: 'May-June',
      waterRequirement: 'low',
      soilTypes: ['Sandy Loam', 'Loamy'],
      description: 'Mung bean is a short-duration crop suitable for the summer season. It has nitrogen-fixing properties.'
    },
    {
      id: 6,
      name: 'Sugarcane',
      season: 'kharif',
      sowingMonth: 'February-March',
      harvestingMonth: 'December-March',
      waterRequirement: 'high',
      soilTypes: ['Loamy', 'Clay', 'Alluvial'],
      description: 'Sugarcane is a long-duration crop taking 12-18 months to mature. It requires consistent moisture and warm weather.'
    },
    {
      id: 7,
      name: 'Mustard',
      season: 'rabi',
      sowingMonth: 'September-October',
      harvestingMonth: 'February-March',
      waterRequirement: 'low',
      soilTypes: ['Loamy', 'Sandy Loam'],
      description: 'Mustard is an oil seed crop that can thrive with minimal irrigation. It has good frost tolerance.'
    },
    {
      id: 8,
      name: 'Watermelon',
      season: 'zaid',
      sowingMonth: 'February-March',
      harvestingMonth: 'May-June',
      waterRequirement: 'medium',
      soilTypes: ['Sandy', 'Sandy Loam'],
      description: 'Watermelon is a summer fruit crop that grows well in hot and dry weather with well-drained soil.'
    }
  ];

  const filteredCrops = selectedSeason === 'all' 
    ? crops 
    : crops.filter(crop => crop.season === selectedSeason);

  const getSeasonIcon = (season: string) => {
    switch(season) {
      case 'kharif':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'rabi':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        );
      case 'zaid':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-4.9-6H8a4 4 0 00-5 3.9zm0 0a2 2 0 012-2h.5" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getWaterIcon = (level: string) => {
    const drops = level === 'low' ? 1 : level === 'medium' ? 2 : 3;
    return (
      <div className="flex">
        {Array(drops).fill(0).map((_, i) => (
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        ))}
      </div>
    );
  };

  const seasonDescriptions = {
    kharif: "Kharif crops are sown at the beginning of the monsoon season (June-July) and harvested after the monsoon (September-October). These crops require hot and humid conditions.",
    rabi: "Rabi crops are sown in winter (October-November) and harvested in spring (March-April). These crops require cool temperatures during growth and warm temperatures during maturity.",
    zaid: "Zaid crops are summer crops sown between Rabi and Kharif seasons (March-April) and harvested in early summer (May-June). These are short-duration crops."
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-cover bg-center rounded-xl p-8 text-white mb-8" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070")' }}>
        <h1 className="text-3xl font-bold mb-4">Crop Calendar</h1>
        <p className="mb-6">
          Plan your farming activities based on seasonal crop calendars and recommendations.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Filter by Growing Season
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSeason('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedSeason === 'all'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300'
              }`}
            >
              All Seasons
            </button>
            <button
              onClick={() => setSelectedSeason('kharif')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                selectedSeason === 'kharif'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300'
              }`}
            >
              <span className="mr-2">Kharif (Monsoon)</span>
              {getSeasonIcon('kharif')}
            </button>
            <button
              onClick={() => setSelectedSeason('rabi')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                selectedSeason === 'rabi'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300'
              }`}
            >
              <span className="mr-2">Rabi (Winter)</span>
              {getSeasonIcon('rabi')}
            </button>
            <button
              onClick={() => setSelectedSeason('zaid')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                selectedSeason === 'zaid'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300'
              }`}
            >
              <span className="mr-2">Zaid (Summer)</span>
              {getSeasonIcon('zaid')}
            </button>
          </div>
        </div>

        {selectedSeason !== 'all' && (
          <div className="mb-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
              About {selectedSeason.charAt(0).toUpperCase() + selectedSeason.slice(1)} Season
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {selectedSeason === 'kharif' 
                ? seasonDescriptions.kharif 
                : selectedSeason === 'rabi' 
                  ? seasonDescriptions.rabi 
                  : seasonDescriptions.zaid}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map(crop => (
            <div key={crop.id} className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg shadow border-l-4 border-green-500">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {crop.name}
                </h3>
                <div className={`px-2 py-1 rounded-full text-xs font-medium 
                  ${crop.season === 'kharif' 
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' 
                    : crop.season === 'rabi' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {crop.season.charAt(0).toUpperCase() + crop.season.slice(1)}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {crop.description}
              </p>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Sowing:</span>
                  <span className="ml-1 text-gray-800 dark:text-gray-200">{crop.sowingMonth}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Harvesting:</span>
                  <span className="ml-1 text-gray-800 dark:text-gray-200">{crop.harvestingMonth}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Water:</span>
                  <span className="ml-1 flex items-center">
                    {getWaterIcon(crop.waterRequirement)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Soil:</span>
                  <span className="ml-1 text-gray-800 dark:text-gray-200">{crop.soilTypes.join(', ')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Understanding Farming Seasons in India
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="mr-2 text-yellow-600 dark:text-yellow-400">
                {getSeasonIcon('kharif')}
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">Kharif Season</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              The Kharif season coincides with the southwest monsoon, with crops being sown in June-July and harvested in September-October.
            </p>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">Major crops:</span> Rice, Maize, Sorghum, Cotton, Soybean
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="mr-2 text-blue-600 dark:text-blue-400">
                {getSeasonIcon('rabi')}
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">Rabi Season</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              The Rabi season crops are sown in winter and harvested in spring, benefiting from winter rains and weather.
            </p>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">Major crops:</span> Wheat, Barley, Gram, Mustard, Peas
            </div>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="mr-2 text-red-600 dark:text-red-400">
                {getSeasonIcon('zaid')}
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">Zaid Season</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              The Zaid crops are grown between Rabi and Kharif seasons, primarily in the summer months.
            </p>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">Major crops:</span> Watermelon, Cucumber, Muskmelon, Mung Bean
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Tips for Seasonal Crop Planning
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Check soil moisture levels before planting, especially for kharif crops.</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Plan crop rotations to maintain soil health and prevent pest buildup.</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Consider climate forecasts when deciding planting dates.</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Use shorter duration varieties if planting is delayed due to weather conditions.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CropCalendarPage; 