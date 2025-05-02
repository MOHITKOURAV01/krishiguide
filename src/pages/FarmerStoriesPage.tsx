import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface FarmerStory {
  id: number;
  title: string;
  farmer: string;
  location: string;
  summary: string;
  content: string;
  date: string;
  image: string;
  category: 'success' | 'innovation' | 'community' | 'sustainable';
}

const FarmerStoriesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', name: 'All Stories' },
    { id: 'success', name: 'Success Stories' },
    { id: 'innovation', name: 'Innovation' },
    { id: 'community', name: 'Community Impact' },
    { id: 'sustainable', name: 'Sustainable Farming' },
  ];
  
  const stories: FarmerStory[] = [
    {
      id: 1,
      title: 'From Drought to Abundance: How Data-Driven Farming Changed My Life',
      farmer: 'Rajendra Patil',
      location: 'Nashik, Maharashtra',
      summary: 'Facing severe drought conditions, a farmer uses KrishiGuide to select drought-resistant crops and implement water conservation techniques.',
      content: `For generations, my family has been farming in the Nashik region. We've always grown traditional crops like wheat and rice, but in recent years, the changing climate has made this increasingly difficult. Erratic rainfall and extended dry periods were severely affecting our yields.

When I first heard about KrishiGuide from a local agricultural extension officer, I was skeptical. How could a mobile app help my farming practices that had been passed down for generations? But with little to lose, I decided to give it a try.

The soil analysis revealed that my land had been depleted of key nutrients due to continuous cultivation of the same crops. The app recommended I try growing jowar (sorghum) and bajra (pearl millet), which are more drought-resistant and require less water.

It also suggested a crop rotation plan to help restore soil health. I implemented these recommendations along with water conservation techniques like drip irrigation that the app suggested.

The results were remarkable. Despite receiving 30% less rainfall than average that year, my yields were better than they had been in the previous five years. The drought-resistant crops thrived, and the improved soil management practices helped retain moisture better.

Now, I regularly use KrishiGuide to plan my seasonal crops, monitor soil health, and stay updated on weather patterns. Technology and traditional farming knowledge can indeed work hand in hand to create a more sustainable and profitable farming practice.`,
      date: '2023-03-15',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2532',
      category: 'success'
    },
    {
      id: 2,
      title: 'Community Crop Planning: How Our Village Transformed Agriculture Together',
      farmer: 'Sunita Devi',
      location: 'Karauli, Rajasthan',
      summary: 'A community leader mobilizes her village to adopt cooperative farming practices with the help of agricultural technology.',
      content: `In our small village in Rajasthan, farming has always been a communal activity. However, declining groundwater levels and increasingly unpredictable weather patterns were threatening our livelihoods. As the head of our local women's farming collective, I was determined to find a solution.

A government outreach program introduced us to KrishiGuide. Initially, only a few of us had smartphones, so we would gather together to analyze our collective farming data and make decisions as a group.

The app helped us understand which crops were best suited for our arid climate and poor soil conditions. It suggested drought-resistant varieties of pulses and millets that our grandparents used to grow but had been abandoned in favor of more commercial crops.

What made the biggest difference was the ability to plan as a community. Using the data from KrishiGuide, we created a village-wide crop rotation system. Some fields would grow nitrogen-fixing legumes while others focused on cash crops. The app helped us calculate optimal planting times based on weather forecasts.

Within two growing seasons, we noticed significant improvements. Our soil health began to recover, and our collective yields increased by approximately 40%. More importantly, we were able to make more informed decisions about water usage, a critical resource in our region.

Today, our village serves as a model for neighboring communities. We've shown that combining traditional knowledge with modern agricultural technology can create resilient farming systems even in challenging conditions. The women in our collective now train others on using agricultural apps like KrishiGuide to improve their farming practices.`,
      date: '2023-02-10',
      image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070',
      category: 'community'
    },
    {
      id: 3,
      title: 'Organic Transition: A Journey to Chemical-Free Farming',
      farmer: 'Manoj Kumar',
      location: 'Coimbatore, Tamil Nadu',
      summary: 'An innovative farmer uses technology to transition from conventional to organic farming methods, improving soil health and produce quality.',
      content: `After fifteen years of conventional farming with heavy chemical inputs, I began noticing the soil on my farm becoming increasingly lifeless. Yields were declining despite applying more fertilizers each year, and input costs were skyrocketing. I knew something needed to change, but transitioning to organic farming seemed daunting.

KrishiGuide provided me with a structured approach to this transition. The soil analysis feature helped me understand the current state of my soil and what amendments would be needed to restore its health. The crop recommendation system suggested cover crops and green manures specific to my region that would help rebuild organic matter.

What I appreciated most was the phase-wise transition plan. Rather than switching all at once, the app helped me designate portions of my land for organic conversion while maintaining conventional practices on others, ensuring I didn't lose all my income during the transition period.

The weather forecasting feature was invaluable in timing the application of organic inputs and managing pests naturally. By knowing when rain was coming, I could apply neem-based pesticides at optimal times for effectiveness.

Three years into my transition, 70% of my 10-acre farm is now certified organic. Soil tests show significant improvements in microbial activity and organic matter content. While yields initially dropped, they've now stabilized and even increased in some crops. More importantly, my input costs have decreased by nearly 60%.

The most unexpected benefit has been the premium my organic produce commands in local markets. I've established direct relationships with health-conscious consumers in nearby Coimbatore city, who appreciate the quality and flavor of chemical-free vegetables.

Technology played a crucial role in my journey to sustainable agriculture. It provided the data-backed confidence I needed to take the leap into organic farming – a decision that has improved not just my land and livelihood, but also my health and pride in my profession.`,
      date: '2023-01-25',
      image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=2670',
      category: 'sustainable'
    },
    {
      id: 4,
      title: 'Small Farm, Big Innovation: Implementing Precision Agriculture on a Budget',
      farmer: 'Pradeep Singh',
      location: 'Ludhiana, Punjab',
      summary: 'A young, tech-savvy farmer demonstrates how affordable technology can help small-scale farmers implement precision agriculture techniques.',
      content: `When people think of precision agriculture, they often imagine large commercial farms with expensive machinery and elaborate technology. As a young farmer with just 5 acres inherited from my father, I wanted to prove that small-scale farmers could also benefit from precision farming approaches.

KrishiGuide became my entry point into data-driven agriculture. The soil analysis recommendations helped me understand that different parts of my small farm had varying soil conditions – something I hadn't realized before. Instead of treating my entire farm uniformly, I began to manage it as three distinct zones with different needs.

What truly revolutionized my approach was combining the app's recommendations with simple, low-cost innovations. For example, I created a DIY drip irrigation system using locally available materials, and controlled it with an inexpensive timer. This allowed me to apply water precisely where and when it was needed, as recommended by the app based on soil conditions and weather forecasts.

I also used the crop recommendation system to identify high-value crops suited to each zone of my farm. In one area with sandier soil, I planted vegetables that thrived in those conditions and fetched premium prices at local markets.

The results speak for themselves. My water usage decreased by approximately 30%, while my overall farm productivity increased by 25%. Input costs for fertilizers dropped significantly as I was able to apply them more precisely where needed.

Fellow farmers were skeptical at first, but seeing my results has sparked interest in my community. I now host monthly knowledge-sharing sessions where I demonstrate how accessible technology like KrishiGuide can be combined with simple innovations to implement precision farming principles on small holdings.

My experience shows that precision agriculture isn't just for wealthy, large-scale operations. With the right information and a bit of creativity, small farmers can also leverage technology to farm more efficiently and sustainably.`,
      date: '2022-12-05',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070',
      category: 'innovation'
    }
  ];
  
  const filteredStories = selectedCategory === 'all' 
    ? stories 
    : stories.filter(story => story.category === selectedCategory);
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-cover bg-center rounded-xl p-8 text-white mb-8" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070")' }}>
        <h1 className="text-3xl font-bold mb-4">Farmer Success Stories</h1>
        <p className="mb-6">
          Real stories from farmers who have transformed their practices and livelihoods.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Browse Stories
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Discover how farmers across India are innovating and succeeding
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredStories.map((story) => (
            <div key={story.id} className="bg-gray-50 dark:bg-gray-750 rounded-lg overflow-hidden shadow">
              <div className="h-60 overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {story.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    story.category === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    story.category === 'innovation' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    story.category === 'community' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {categories.find(c => c.id === story.category)?.name}
                  </span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span>{story.farmer}</span>
                  <span className="mx-2">•</span>
                  <span>{story.location}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(story.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short',
                    day: 'numeric'
                  })}</span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {story.summary}
                </p>
                
                <button 
                  onClick={() => alert('Full story view would be implemented here')}
                  className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                >
                  <span>Read Full Story</span>
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Share Your KrishiGuide Success Story
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have you used KrishiGuide to improve your farming practices? We'd love to hear about your experience and share it with the farming community.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Link to="/contact" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center">
            <span>Submit Your Story</span>
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FarmerStoriesPage; 