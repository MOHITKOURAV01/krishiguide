import React from 'react';
import CropCard, { Crop } from './CropCard';
import { Season } from './SeasonSelector';

interface CropListProps {
  season: Season;
}

const CropList: React.FC<CropListProps> = ({ season }) => {
  // Crop data based on seasons
  const cropData: Record<Season, Crop[]> = {
    kharif: [
      {
        id: 'rice',
        name: 'Rice',
        image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=2070',
        soil: 'Clay or clay loam',
        climate: 'Hot and humid',
        water: 'High (standing water)',
        duration: '4-5 months'
      },
      {
        id: 'cotton',
        name: 'Cotton',
        image: 'https://images.unsplash.com/photo-1591034283943-ae3b3c06a6a7?q=80&w=1807',
        soil: 'Well-drained loam',
        climate: 'Warm temperatures',
        water: 'Medium',
        duration: '5-6 months'
      },
      {
        id: 'maize',
        name: 'Maize',
        image: 'https://images.unsplash.com/photo-1601593768799-76e4893961c7?q=80&w=2070',
        soil: 'Well-drained soils',
        climate: 'Warm, sunny',
        water: 'Medium-high',
        duration: '3-4 months'
      },
      {
        id: 'sugarcane',
        name: 'Sugarcane',
        image: 'https://images.unsplash.com/photo-1596241913242-b20752dd3d29?q=80&w=2070',
        soil: 'Deep, fertile soil',
        climate: 'Tropical/subtropical',
        water: 'High',
        duration: '11-12 months'
      }
    ],
    rabi: [
      {
        id: 'wheat',
        name: 'Wheat',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6962b3?q=80&w=2070',
        soil: 'Loamy or clay loam',
        climate: 'Cool',
        water: 'Medium',
        duration: '4-5 months'
      },
      {
        id: 'barley',
        name: 'Barley',
        image: 'https://images.unsplash.com/photo-1597163857029-71dbcfa2a473?q=80&w=2012',
        soil: 'Well-drained, fertile',
        climate: 'Cool, dry',
        water: 'Low-medium',
        duration: '3-4 months'
      },
      {
        id: 'mustard',
        name: 'Mustard',
        image: 'https://images.unsplash.com/photo-1594647210801-5124307561d8?q=80&w=1974',
        soil: 'Well-drained loamy',
        climate: 'Cool, dry',
        water: 'Low',
        duration: '3-4 months'
      },
      {
        id: 'chickpea',
        name: 'Chickpea',
        image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=2070',
        soil: 'Sandy loam',
        climate: 'Cool, dry',
        water: 'Low',
        duration: '3-4 months'
      }
    ],
    zaid: [
      {
        id: 'cucumber',
        name: 'Cucumber',
        image: 'https://images.unsplash.com/photo-1627843240167-b1f9309c5485?q=80&w=2070',
        soil: 'Well-drained sandy loam',
        climate: 'Warm, humid',
        water: 'Medium-high',
        duration: '6-8 weeks'
      },
      {
        id: 'watermelon',
        name: 'Watermelon',
        image: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?q=80&w=2070',
        soil: 'Sandy, well-drained',
        climate: 'Hot, dry',
        water: 'Medium',
        duration: '3-4 months'
      },
      {
        id: 'pumpkin',
        name: 'Pumpkin',
        image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?q=80&w=2070',
        soil: 'Loamy, well-drained',
        climate: 'Warm',
        water: 'Medium',
        duration: '3-4 months'
      },
      {
        id: 'muskmelon',
        name: 'Muskmelon',
        image: 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?q=80&w=2076',
        soil: 'Sandy loam',
        climate: 'Hot, dry',
        water: 'Medium',
        duration: '3-4 months'
      }
    ]
  };

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto">
      <h2 
        className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center animate-fadeIn"
      >
        Recommended Crops for {season.charAt(0).toUpperCase() + season.slice(1)} Season
      </h2>
      
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {cropData[season].map(crop => (
          <CropCard key={crop.id} crop={crop} />
        ))}
      </div>
    </div>
  );
};

export default CropList; 