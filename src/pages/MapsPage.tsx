import React, { useState, useEffect } from 'react';

interface MarkerData {
  id: number;
  position: { lat: number; lng: number };
  title: string;
  crops: string[];
  soilType: string;
  climate: string;
  color: string;
  gradient: string;
  icon: string;
}

const MapsPage: React.FC = () => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [mapRegion, setMapRegion] = useState<string>('All India');
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const markers: MarkerData[] = [
    {
      id: 1,
      position: { lat: 30.9010, lng: 75.8573 },
      title: 'Punjab Region',
      crops: ['Wheat', 'Rice', 'Cotton', 'Sugarcane'],
      soilType: 'Alluvial Soil',
      climate: 'Semi-arid, hot summers and cold winters',
      color: 'green',
      gradient: 'from-green-200 to-green-600',
      icon: '🌾'
    },
    {
      id: 2,
      position: { lat: 22.9868, lng: 87.8550 },
      title: 'West Bengal - Rice Belt',
      crops: ['Rice', 'Jute', 'Tea', 'Potato'],
      soilType: 'Alluvial and Red Soil',
      climate: 'Tropical wet',
      color: 'blue',
      gradient: 'from-blue-200 to-blue-600',
      icon: '🍚'
    },
    {
      id: 3,
      position: { lat: 16.5062, lng: 80.6480 },
      title: 'Andhra Pradesh - Cotton Region',
      crops: ['Cotton', 'Chili', 'Tobacco', 'Rice'],
      soilType: 'Black Cotton Soil',
      climate: 'Tropical hot and humid',
      color: 'yellow',
      gradient: 'from-yellow-200 to-yellow-600',
      icon: '🧵'
    },
    {
      id: 4,
      position: { lat: 25.0961, lng: 85.3131 },
      title: 'Bihar - Maize Belt',
      crops: ['Maize', 'Wheat', 'Rice', 'Pulses'],
      soilType: 'Alluvial Soil',
      climate: 'Subtropical',
      color: 'orange',
      gradient: 'from-orange-200 to-orange-600',
      icon: '🌽'
    },
    {
      id: 5,
      position: { lat: 15.3173, lng: 75.7139 },
      title: 'Karnataka - Coffee Region',
      crops: ['Coffee', 'Spices', 'Rubber', 'Tea'],
      soilType: 'Red and Laterite Soil',
      climate: 'Tropical wet and dry',
      color: 'brown',
      gradient: 'from-amber-300 to-amber-700',
      icon: '☕'
    },
    {
      id: 6,
      position: { lat: 27.0238, lng: 74.2179 },
      title: 'Rajasthan - Millets Region',
      crops: ['Millet', 'Barley', 'Pulses', 'Oilseeds'],
      soilType: 'Arid and Desert Soil',
      climate: 'Arid and semi-arid',
      color: 'red',
      gradient: 'from-red-200 to-red-600',
      icon: '🌿'
    },
    {
      id: 7,
      position: { lat: 19.7515, lng: 75.7139 },
      title: 'Maharashtra - Cotton and Sugarcane',
      crops: ['Cotton', 'Sugarcane', 'Jowar', 'Groundnut'],
      soilType: 'Black Soil',
      climate: 'Tropical wet and dry',
      color: 'purple',
      gradient: 'from-purple-200 to-purple-600',
      icon: '🧵'
    },
    {
      id: 8,
      position: { lat: 21.2514, lng: 81.6296 },
      title: 'Chhattisgarh - Rice Bowl',
      crops: ['Rice', 'Maize', 'Groundnut'],
      soilType: 'Red and Yellow Soil',
      climate: 'Tropical wet and dry',
      color: 'green',
      gradient: 'from-emerald-200 to-emerald-600',
      icon: '🍚'
    },
    {
      id: 9,
      position: { lat: 10.8505, lng: 76.2711 },
      title: 'Kerala - Spice Garden',
      crops: ['Coconut', 'Rubber', 'Spices', 'Rice'],
      soilType: 'Laterite Soil',
      climate: 'Tropical wet',
      color: 'teal',
      gradient: 'from-teal-200 to-teal-600',
      icon: '🥥'
    },
    {
      id: 10,
      position: { lat: 22.2587, lng: 71.1924 },
      title: 'Gujarat - Groundnut Belt',
      crops: ['Groundnut', 'Cotton', 'Jowar', 'Bajra'],
      soilType: 'Black and Alluvial Soil',
      climate: 'Semi-arid to dry',
      color: 'amber',
      gradient: 'from-amber-200 to-amber-600',
      icon: '🥜'
    }
  ];

  // Crop icons map
  const cropIcons: {[key: string]: string} = {
    'Wheat': '🌾',
    'Rice': '🍚',
    'Cotton': '🧵',
    'Sugarcane': '🎋',
    'Jute': '🧶',
    'Tea': '🍵',
    'Potato': '🥔',
    'Chili': '🌶️',
    'Tobacco': '🌿',
    'Maize': '🌽',
    'Pulses': '🌱',
    'Coffee': '☕',
    'Spices': '🌶️',
    'Rubber': '🌴',
    'Millet': '🌾',
    'Barley': '🌾',
    'Oilseeds': '🌻',
    'Jowar': '🌾',
    'Groundnut': '🥜',
    'Coconut': '🥥',
    'Bajra': '🌾'
  };

  const handleMarkerClick = (marker: MarkerData) => {
    setSelectedMarker(marker);
  };

  const filterMarkers = (region: string): MarkerData[] => {
    if (region === 'All India') {
      return markers;
    }
    
    switch (region) {
      case 'North India':
        return markers.filter(marker => 
          ['Punjab Region', 'Rajasthan - Millets Region'].includes(marker.title)
        );
      case 'South India':
        return markers.filter(marker => 
          ['Andhra Pradesh - Cotton Region', 'Karnataka - Coffee Region', 'Kerala - Spice Garden'].includes(marker.title)
        );
      case 'East India':
        return markers.filter(marker => 
          ['West Bengal - Rice Belt', 'Bihar - Maize Belt', 'Chhattisgarh - Rice Bowl'].includes(marker.title)
        );
      case 'West India':
        return markers.filter(marker => 
          ['Maharashtra - Cotton and Sugarcane', 'Gujarat - Groundnut Belt'].includes(marker.title)
        );
      default:
        return markers;
    }
  };

  const filteredMarkers = filterMarkers(mapRegion);

  const regions = [
    { id: 'All India', icon: '🇮🇳', color: 'bg-gradient-to-r from-primary-500 to-primary-600' },
    { id: 'North India', icon: '🌄', color: 'bg-gradient-to-r from-blue-500 to-purple-600' },
    { id: 'South India', icon: '🌴', color: 'bg-gradient-to-r from-green-500 to-emerald-600' },
    { id: 'East India', icon: '🌊', color: 'bg-gradient-to-r from-sky-500 to-cyan-600' },
    { id: 'West India', icon: '🏜️', color: 'bg-gradient-to-r from-amber-500 to-orange-600' }
  ];

  return (
    <div className="w-full mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-blue-900 mix-blend-multiply"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
        ></div>
        
        <div className="relative z-10 py-12 px-6 md:py-16 md:px-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight animate-fadeIn">
              Explore India's Agricultural Regions
            </h1>
            <p className="text-base md:text-xl mb-8 text-white/90 max-w-2xl mx-auto animate-fadeInUp">
              Discover the diversity of India's farming landscapes and learn about the crops that thrive in each unique region.
            </p>
          </div>
        </div>
      </div>

      {/* Region Selection Tabs */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => setMapRegion(region.id)}
            className={`px-4 py-2 md:px-5 md:py-3 rounded-full transition-all duration-300 shadow-lg flex items-center ${
              mapRegion === region.id
                ? `${region.color} text-white scale-105 shadow-lg`
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            <span className="mr-2 text-lg">{region.icon}</span>
            <span className="font-medium text-sm md:text-base">{region.id}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Main Map Section */}
        <div className="lg:col-span-2 xl:col-span-3 order-2 lg:order-1">
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-500 transform hover:shadow-xl"
          >
            <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 md:mb-0">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400">
                    {mapRegion}
                  </span> Agricultural Map
                </h2>
                <div className="flex items-center space-x-2">
                  <div className={`h-2.5 w-2.5 rounded-full ${isMapLoaded ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {isMapLoaded ? 'Map Loaded' : 'Loading Map...'}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm md:text-base">
                Interactive map showing major agricultural regions and their crop patterns
              </p>
            </div>
            
            <div className="relative rounded-b-lg overflow-hidden">
              {!isMapLoaded && (
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 flex items-center justify-center z-10">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 border-t-4 border-b-4 border-green-500 rounded-full animate-spin"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading agricultural data...</p>
                  </div>
                </div>
              )}
              
              <div className="map-container h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
                <iframe 
                  title="KrishiGuide Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7578183.602139128!2d76.78557818891009!3d22.343825438402572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sus!4v1702046276372!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  className={`transition-opacity duration-700 ${isMapLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setIsMapLoaded(true)}
                ></iframe>
              </div>
            </div>
            
            <div className="p-4 md:p-5 bg-blue-50 dark:bg-blue-900/30 border-t border-blue-100 dark:border-blue-800/50">
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-800/50 rounded-full p-2 mr-3 text-blue-600 dark:text-blue-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 text-sm">About this map</h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                    This map highlights key agricultural regions across India. The recommendations 
                    are based on generalized data, and local soil variations may support additional crops.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {selectedMarker && (
            <div 
              className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 animate-fadeIn"
            >
              <div className={`h-32 relative bg-gradient-to-r ${selectedMarker.gradient}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">{selectedMarker.icon}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-2xl font-bold">{selectedMarker.title}</h3>
                  <p className="text-white/80 text-sm">Coordinates: {selectedMarker.position.lat.toFixed(4)}, {selectedMarker.position.lng.toFixed(4)}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Soil Type</h4>
                    <p className="text-gray-800 dark:text-gray-200">{selectedMarker.soilType}</p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Climate</h4>
                    <p className="text-gray-800 dark:text-gray-200">{selectedMarker.climate}</p>
                  </div>
                </div>
                
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Recommended Crops</h4>
                
                {/* Crop icons grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {selectedMarker.crops.map((crop, i) => (
                    <div key={i} className={`rounded-lg overflow-hidden bg-gradient-to-br from-${selectedMarker.color}-100 to-${selectedMarker.color}-300 dark:from-${selectedMarker.color}-900/40 dark:to-${selectedMarker.color}-900/60`}>
                      <div className="aspect-square relative flex items-center justify-center">
                        <span className="text-5xl">{cropIcons[crop] || '🌱'}</span>
                        <div className="absolute inset-x-0 bottom-0 bg-black/30 py-1 px-2 text-center">
                          <span className="text-white font-medium text-sm">{crop}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Crop tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedMarker.crops.map((crop, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                    >
                      <span className="mr-1">{cropIcons[crop] || '🌱'}</span> {crop}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar with Region Cards */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <div className="sticky top-24">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-6">
              <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Agricultural Regions
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Click on a region to view details and crop recommendations
                </p>
              </div>
              
              <div className="p-4">
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                  {filteredMarkers.map((marker, i) => (
                    <div
                      key={marker.id}
                      className={`p-4 rounded-xl shadow-sm transition-all duration-300 cursor-pointer animate-fadeIn ${
                        selectedMarker?.id === marker.id
                          ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500'
                          : 'bg-gray-50 dark:bg-gray-750 hover:bg-gray-100 dark:hover:bg-gray-700 border-l-4 border-transparent'
                      }`}
                      style={{animationDelay: `${i * 100}ms`}}
                      onClick={() => {
                        handleMarkerClick(marker);
                        document.querySelector('.map-container')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                    >
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-lg overflow-hidden mr-4 flex-shrink-0 bg-gradient-to-br ${marker.gradient} flex items-center justify-center`}>
                          <span className="text-2xl">{marker.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1 line-clamp-1">
                            {marker.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                            {marker.soilType}
                          </p>
                        </div>
                      </div>
                      
                      {/* Crop icons mini gallery */}
                      <div className="mt-3 grid grid-cols-4 gap-1">
                        {marker.crops.slice(0, 4).map((crop, idx) => (
                          <div key={idx} className="aspect-square rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-xl">{cropIcons[crop] || '🌱'}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-1.5 mb-1">
                          {marker.crops.slice(0, 2).map((crop, idx) => (
                            <span key={idx} className="px-2 py-0.5 text-xs rounded bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 flex items-center">
                              <span className="mr-1">{cropIcons[crop] || '🌱'}</span> {crop}
                            </span>
                          ))}
                          {marker.crops.length > 2 && (
                            <span className="px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                              +{marker.crops.length - 2} more
                            </span>
                          )}
                        </div>
                        
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                          {marker.climate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Learn More
                </h3>
              </div>
              
              <div className="p-5">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-lg mr-3 text-green-700 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 text-sm">Explore All Regions</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                        Click "All India" to see the complete agricultural map of the country.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3 text-blue-700 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 text-sm">Filter by Region</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                        Use the region buttons above to filter agricultural areas by geographical zones.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-2 rounded-lg mr-3 text-amber-700 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 text-sm">Seasonal Trends</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                        Different regions have various cropping seasons and patterns based on local climate.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsPage; 