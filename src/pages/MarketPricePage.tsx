import React, { useState } from 'react';

interface CropPrice {
  id: number;
  name: string;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  marketLocation: string;
  lastUpdated: string;
  category: 'grain' | 'vegetable' | 'fruit' | 'oilseed' | 'spice';
}

const MarketPricePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Sample market price data
  const cropPrices: CropPrice[] = [
    {
      id: 1,
      name: 'Rice (Basmati)',
      currentPrice: 3500,
      previousPrice: 3300,
      unit: 'quintal',
      marketLocation: 'Delhi',
      lastUpdated: '2023-04-25',
      category: 'grain'
    },
    {
      id: 2,
      name: 'Wheat',
      currentPrice: 2200,
      previousPrice: 2100,
      unit: 'quintal',
      marketLocation: 'Ludhiana',
      lastUpdated: '2023-04-24',
      category: 'grain'
    },
    {
      id: 3,
      name: 'Tomato',
      currentPrice: 20,
      previousPrice: 25,
      unit: 'kg',
      marketLocation: 'Bangalore',
      lastUpdated: '2023-04-26',
      category: 'vegetable'
    },
    {
      id: 4,
      name: 'Onion',
      currentPrice: 15,
      previousPrice: 18,
      unit: 'kg',
      marketLocation: 'Nashik',
      lastUpdated: '2023-04-25',
      category: 'vegetable'
    },
    {
      id: 5,
      name: 'Apple (Shimla)',
      currentPrice: 120,
      previousPrice: 110,
      unit: 'kg',
      marketLocation: 'Shimla',
      lastUpdated: '2023-04-23',
      category: 'fruit'
    },
    {
      id: 6,
      name: 'Banana',
      currentPrice: 60,
      previousPrice: 55,
      unit: 'dozen',
      marketLocation: 'Chennai',
      lastUpdated: '2023-04-26',
      category: 'fruit'
    },
    {
      id: 7,
      name: 'Mustard Seeds',
      currentPrice: 5200,
      previousPrice: 5000,
      unit: 'quintal',
      marketLocation: 'Jaipur',
      lastUpdated: '2023-04-24',
      category: 'oilseed'
    },
    {
      id: 8,
      name: 'Soybean',
      currentPrice: 4800,
      previousPrice: 5100,
      unit: 'quintal',
      marketLocation: 'Indore',
      lastUpdated: '2023-04-25',
      category: 'oilseed'
    },
    {
      id: 9,
      name: 'Cardamom',
      currentPrice: 1200,
      previousPrice: 1050,
      unit: 'kg',
      marketLocation: 'Cochin',
      lastUpdated: '2023-04-22',
      category: 'spice'
    },
    {
      id: 10,
      name: 'Turmeric',
      currentPrice: 7500,
      previousPrice: 7200,
      unit: 'quintal',
      marketLocation: 'Erode',
      lastUpdated: '2023-04-23',
      category: 'spice'
    },
    {
      id: 11,
      name: 'Potato',
      currentPrice: 18,
      previousPrice: 20,
      unit: 'kg',
      marketLocation: 'Agra',
      lastUpdated: '2023-04-26',
      category: 'vegetable'
    },
    {
      id: 12,
      name: 'Maize',
      currentPrice: 1900,
      previousPrice: 1850,
      unit: 'quintal',
      marketLocation: 'Patna',
      lastUpdated: '2023-04-25',
      category: 'grain'
    }
  ];

  // Filter based on search term and category
  const filteredCrops = cropPrices.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          crop.marketLocation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || crop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'grain', label: 'Grains' },
    { value: 'vegetable', label: 'Vegetables' },
    { value: 'fruit', label: 'Fruits' },
    { value: 'oilseed', label: 'Oilseeds' },
    { value: 'spice', label: 'Spices' }
  ];

  // Calculate price change and return appropriate styling
  const getPriceChangeClass = (current: number, previous: number) => {
    const changePercent = ((current - previous) / previous) * 100;
    if (changePercent > 0) {
      return {
        text: `+${changePercent.toFixed(1)}%`,
        class: 'text-green-600 dark:text-green-400'
      };
    } else if (changePercent < 0) {
      return {
        text: `${changePercent.toFixed(1)}%`,
        class: 'text-red-600 dark:text-red-400'
      };
    } else {
      return {
        text: '0%',
        class: 'text-gray-600 dark:text-gray-400'
      };
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-cover bg-center rounded-xl p-8 text-white mb-8" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1532372576444-dda954194ad0?q=80&w=2072")' }}>
        <h1 className="text-3xl font-bold mb-4">Market Prices</h1>
        <p className="mb-6">
          Get the latest agricultural commodity prices to make informed selling decisions.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-grow">
            <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Search crops or markets</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by crop name or market..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Filter by category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredCrops.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Crop
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Market
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Current Price (₹)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Change
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredCrops.map((crop) => {
                  const priceChange = getPriceChangeClass(crop.currentPrice, crop.previousPrice);
                  return (
                    <tr key={crop.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        <div className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            crop.category === 'grain' ? 'bg-yellow-400' :
                            crop.category === 'vegetable' ? 'bg-green-400' :
                            crop.category === 'fruit' ? 'bg-red-400' :
                            crop.category === 'oilseed' ? 'bg-brown-400' :
                            'bg-orange-400'
                          }`}></span>
                          {crop.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {crop.marketLocation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        ₹{crop.currentPrice}/{crop.unit}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${priceChange.class}`}>
                        {priceChange.text}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {crop.lastUpdated}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-300">
              No crops match your search criteria. Please try a different search term or category.
            </p>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Market Price Trends
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The current market trends show fluctuations in various agricultural commodities. Specifically:
          </p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>Spices like Cardamom and Turmeric are showing an upward trend due to export demand.</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span>Vegetable prices are slightly down due to increased domestic production.</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>Grains like Rice and Wheat are showing moderate price increases due to procurement season.</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span>Oilseeds like Soybean have seen a slight decrease due to international market pressures.</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Tips for Farmers
          </h2>
          <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg">
              <h3 className="font-medium text-green-800 dark:text-green-200 mb-1">When to Sell</h3>
              <p className="text-green-700 dark:text-green-300">
                Monitor price trends and consider holding crops if prices are expected to rise in the near future.
              </p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Market Selection</h3>
              <p className="text-blue-700 dark:text-blue-300">
                Compare prices across different markets in your region to find the best selling opportunities.
              </p>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
              <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">Quality Grading</h3>
              <p className="text-yellow-700 dark:text-yellow-300">
                Higher quality produce generally commands better prices. Invest in proper sorting and grading.
              </p>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900 rounded-lg">
              <h3 className="font-medium text-purple-800 dark:text-purple-200 mb-1">Collective Selling</h3>
              <p className="text-purple-700 dark:text-purple-300">
                Consider forming farmer collectives for better negotiation power and reduced transportation costs.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Disclaimer
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          The market prices displayed on this page are for informational purposes only and may vary from actual market rates.
          Prices are updated periodically but may not reflect real-time changes. Always confirm current prices at your local
          agricultural market or with authorized dealers before making buying or selling decisions.
        </p>
      </div>
    </div>
  );
};

export default MarketPricePage; 