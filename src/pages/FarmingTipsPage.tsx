import React, { useState } from 'react';

interface TipCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface FarmingTip {
  id: number;
  title: string;
  content: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  image?: string;
}

const FarmingTipsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const tipCategories: TipCategory[] = [
    {
      id: 'all',
      name: 'All Tips',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      id: 'soil-health',
      name: 'Soil Health',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 'pest-management',
      name: 'Pest Management',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 'water-conservation',
      name: 'Water Conservation',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 'sustainable-farming',
      name: 'Sustainable Farming',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 'crop-management',
      name: 'Crop Management',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      )
    }
  ];
  
  const farmingTips: FarmingTip[] = [
    {
      id: 1,
      title: 'Soil Testing for Nutrient Management',
      content: 'Regular soil testing is essential to understand the nutrient composition of your soil. Test your soil at least once every 2-3 years to determine pH levels and nutrient deficiencies. Based on test results, apply appropriate amendments and fertilizers to ensure optimal crop growth. Remember that over-fertilization can be as harmful as nutrient deficiency.',
      category: 'soil-health',
      difficulty: 'beginner',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2532'
    },
    {
      id: 2,
      title: 'Integrated Pest Management (IPM)',
      content: 'IPM combines multiple pest control tactics to minimize environmental impact and economic damage. Start by monitoring crops regularly for pest presence. Introduce beneficial insects like ladybugs and praying mantises to control harmful pests naturally. Use physical barriers such as nets and row covers when appropriate. Apply chemical controls only as a last resort, selecting the least toxic options and following all label instructions carefully.',
      category: 'pest-management',
      difficulty: 'intermediate',
      image: 'https://images.unsplash.com/photo-1589928849212-26491524367a?q=80&w=2574'
    },
    {
      id: 3,
      title: 'Drip Irrigation Systems',
      content: 'Drip irrigation delivers water directly to plant roots, reducing water waste through evaporation and runoff. Install drip lines along crop rows, with emitters positioned near plant bases. Set up a timer to automate watering schedules, preferably during early morning or evening to minimize evaporation. Regularly check for clogged emitters and leaks in the system. This method can reduce water usage by up to 60% compared to conventional irrigation methods.',
      category: 'water-conservation',
      difficulty: 'intermediate',
      image: 'https://images.unsplash.com/photo-1458829549177-e9a8f3db5b14?q=80&w=2565'
    },
    {
      id: 4,
      title: 'Crop Rotation Planning',
      content: 'Crop rotation helps break pest cycles and improves soil health by alternating crops from different plant families in the same field across growing seasons. Create a 3-4 year rotation plan considering plant families (legumes, brassicas, nightshades, etc.). Follow heavy feeders (corn, tomatoes) with soil-builders (legumes). Include cover crops in your rotation to add organic matter and prevent soil erosion during off-seasons. Maintain detailed records of what was planted where for effective planning.',
      category: 'sustainable-farming',
      difficulty: 'intermediate',
      image: 'https://images.unsplash.com/photo-1595841594694-e7abce679be8?q=80&w=2148'
    },
    {
      id: 5,
      title: 'Composting Farm Waste',
      content: 'Convert agricultural waste into valuable compost to improve soil structure and fertility. Layer green materials (fresh plant waste, manure) with brown materials (dry leaves, straw) in a 1:3 ratio. Turn the pile regularly to accelerate decomposition. Maintain adequate moisture - the pile should feel like a wrung-out sponge. Finished compost should be dark, crumbly, and earthy-smelling, typically ready in 3-6 months depending on conditions.',
      category: 'soil-health',
      difficulty: 'beginner',
      image: 'https://images.unsplash.com/photo-1581911867902-9767712e9cf5?q=80&w=2532'
    },
    {
      id: 6,
      title: 'Rainwater Harvesting',
      content: 'Capture and store rainwater from rooftops and other surfaces for agricultural use during dry periods. Install gutters and downspouts leading to storage tanks. Filter collected water to remove debris. Size your storage system based on roof area, local rainfall patterns, and irrigation needs. For every inch of rain, approximately 0.6 gallons can be collected per square foot of roof area. Ensure tanks are covered to prevent mosquito breeding and algae growth.',
      category: 'water-conservation',
      difficulty: 'intermediate',
      image: 'https://images.unsplash.com/photo-1573236751298-0c8c242e1cc5?q=80&w=2574'
    },
    {
      id: 7,
      title: 'Organic Mulching Techniques',
      content: 'Apply organic mulch around plants to conserve moisture, suppress weeds, and gradually improve soil quality. Spread a 2-4 inch layer of material like straw, leaves, grass clippings, or wood chips around plants, keeping it a few inches away from stems to prevent rot. Apply mulch after soil has warmed in spring. Replenish as needed throughout the growing season. As organic mulches decompose, they contribute valuable nutrients to the soil.',
      category: 'sustainable-farming',
      difficulty: 'beginner',
      image: 'https://images.unsplash.com/photo-1592982568582-c22696152833?q=80&w=2532'
    },
    {
      id: 8,
      title: 'Early Disease Detection in Crops',
      content: 'Identifying plant diseases early can prevent widespread crop damage. Scout fields regularly, examining plants from top to bottom. Look for discoloration, spotting, wilting, or unusual growth patterns. Pay special attention to the undersides of leaves where many diseases first appear. Use a magnifying glass to inspect for signs of insect pests. Remove and destroy infected plants immediately to prevent disease spread. Consider sending samples to a laboratory for precise identification of unknown diseases.',
      category: 'crop-management',
      difficulty: 'advanced',
      image: 'https://images.unsplash.com/photo-1592455558720-b8e0cb6ee7c0?q=80&w=2574'
    },
    {
      id: 9,
      title: 'Natural Weed Management',
      content: 'Control weeds without chemicals using multi-faceted approaches. Shallow cultivation with hoes or cultivators disrupts weed seedlings. Apply organic mulch to smother weeds and prevent germination. Consider flame weeding for path areas and crop rows before crop emergence. Plant cover crops in off-seasons to outcompete weeds. Hand-pull persistent weeds before they set seed. Remember, the goal is to manage weeds to below damaging levels, not necessarily eliminate every weed.',
      category: 'sustainable-farming',
      difficulty: 'intermediate',
      image: 'https://images.unsplash.com/photo-1508026547094-42e9f9300c37?q=80&w=2532'
    },
    {
      id: 10,
      title: 'Cover Cropping for Soil Health',
      content: 'Plant cover crops during off-seasons to protect and improve soil. Legumes (clover, vetch) add nitrogen through biological fixation. Grasses (rye, oats) build organic matter and prevent erosion. Brassicas (radish, mustard) break up compacted soil with deep roots. Terminate cover crops 2-3 weeks before planting main crops by mowing, crimping, or incorporating into soil. Green manures (cover crops tilled into soil while still green) provide rapid nutrient release.',
      category: 'soil-health',
      difficulty: 'intermediate',
      image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=2070'
    },
    {
      id: 11,
      title: 'Biological Pest Control Methods',
      content: 'Use natural predators and ecological relationships to manage pest populations. Introduce beneficial insects like ladybugs, lacewings, and parasitic wasps that prey on common agricultural pests. Plant flowering strips and hedgerows to provide habitat for beneficial insects. Use microbial insecticides containing Bacillus thuringiensis (Bt) for caterpillar pests. Implement trap crops to draw pests away from main crops. These biological methods work best as part of an integrated pest management program.',
      category: 'pest-management',
      difficulty: 'advanced',
      image: 'https://images.unsplash.com/photo-1560806175-2e8dbd8a8e41?q=80&w=2532'
    },
    {
      id: 12,
      title: 'Precision Seeding Techniques',
      content: 'Optimize plant spacing and seed depth for improved germination and yield. Calibrate seeders properly before use. For small seeds, mix with sand for more even distribution. Ensure proper seed-to-soil contact by firming soil after seeding. Consider using seed tapes for tiny seeds or precise spacing requirements. For larger operations, GPS-guided precision seeders can optimize spacing and reduce seed waste. Proper spacing reduces competition between plants and maximizes light interception.',
      category: 'crop-management',
      difficulty: 'intermediate',
      image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070'
    }
  ];
  
  // Filter tips based on category and search query
  const filteredTips = farmingTips.filter(tip => {
    const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
    const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tip.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const getDifficultyBadge = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Beginner</span>;
      case 'intermediate':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Intermediate</span>;
      case 'advanced':
        return <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Advanced</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-cover bg-center rounded-xl p-8 text-white mb-8" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2532")' }}>
        <h1 className="text-3xl font-bold mb-4">Farming Tips & Best Practices</h1>
        <p className="mb-6">
          Discover practical advice to improve your farming techniques and boost productivity.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Browse Farming Tips
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Filter by category or search for specific topics
            </p>
          </div>
          <div className="w-full md:w-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tips..."
              className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {tipCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {filteredTips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTips.map(tip => (
              <div key={tip.id} className="bg-gray-50 dark:bg-gray-750 rounded-lg shadow overflow-hidden">
                {tip.image && (
                  <div className="h-48 overflow-hidden">
                    <img src={tip.image} alt={tip.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {tip.title}
                    </h3>
                    {getDifficultyBadge(tip.difficulty)}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                    {tip.content}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {tipCategories.find(c => c.id === tip.category)?.name}
                    </span>
                    <button
                      onClick={() => window.alert('Detailed view would open here')}
                      className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              No tips found matching your search criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="text-green-500 dark:text-green-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Educational Resources</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Access our library of farming guides, videos, and research papers to deepen your agricultural knowledge.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="text-green-500 dark:text-green-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Community Forum</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Connect with fellow farmers to share experiences, ask questions, and solve common agricultural challenges.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="text-green-500 dark:text-green-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Seasonal Reminders</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Get timely notifications for important farming activities based on your location and crop selections.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="text-green-500 dark:text-green-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Expert Consultation</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Book virtual sessions with agricultural experts to get personalized advice for your specific farming situation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FarmingTipsPage; 