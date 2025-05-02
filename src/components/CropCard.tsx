import React from 'react';

export interface Crop {
  id: string;
  name: string;
  image: string;
  soil: string;
  climate: string;
  water: string;
  duration: string;
}

interface CropCardProps {
  crop: Crop;
}

const CropCard: React.FC<CropCardProps> = ({ crop }) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-slideIn hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={crop.image} 
          alt={crop.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{crop.name}</h3>
        
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <div>
            <span className="font-medium text-green-600 dark:text-green-400">Soil & Climate: </span>
            {crop.soil}, {crop.climate}
          </div>
          
          <div>
            <span className="font-medium text-green-600 dark:text-green-400">Water Needs: </span>
            {crop.water}
          </div>
          
          <div>
            <span className="font-medium text-green-600 dark:text-green-400">Growth Duration: </span>
            {crop.duration}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropCard; 