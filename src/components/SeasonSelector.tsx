import React from 'react';

export type Season = 'kharif' | 'rabi' | 'zaid';

interface SeasonSelectorProps {
  currentSeason: Season;
  onSeasonChange: (season: Season) => void;
}

const SeasonSelector: React.FC<SeasonSelectorProps> = ({ currentSeason, onSeasonChange }) => {
  const seasons: { id: Season; name: string; period: string }[] = [
    { id: 'kharif', name: 'Kharif', period: 'June–October' },
    { id: 'rabi', name: 'Rabi', period: 'October–March' },
    { id: 'zaid', name: 'Zaid', period: 'March–June' },
  ];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Select Growing Season</h2>
      
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        {seasons.map((season) => (
          <button
            key={season.id}
            onClick={() => onSeasonChange(season.id)}
            className={`flex-1 py-3 px-4 rounded-lg transition-all hover:-translate-y-1 active:scale-95 ${
              currentSeason === season.id
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
            }`}
          >
            <div className="font-medium text-lg">{season.name}</div>
            <div className="text-sm opacity-80">{season.period}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeasonSelector; 