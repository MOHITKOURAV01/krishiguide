import React, { useState } from 'react';
import Todo from '../components/Todo';

interface TaskCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const TodoPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const taskCategories: TaskCategory[] = [
    {
      id: 'all',
      name: 'All Tasks',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      description: 'View and manage all your farming tasks in one place',
      color: 'bg-gray-600'
    },
    {
      id: 'planting',
      name: 'Planting',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      description: 'Manage seed selection, planting schedules, and crop rotation',
      color: 'bg-green-600'
    },
    {
      id: 'irrigation',
      name: 'Irrigation',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      description: 'Track watering schedules and irrigation system maintenance',
      color: 'bg-blue-600'
    },
    {
      id: 'fertilizing',
      name: 'Fertilizing',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      description: 'Organize fertilization timing, application rates, and types',
      color: 'bg-yellow-600'
    },
    {
      id: 'harvest',
      name: 'Harvest',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Plan harvest timing, equipment preparation, and storage solutions',
      color: 'bg-orange-600'
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      description: 'Schedule equipment maintenance, facility repairs, and land management',
      color: 'bg-red-600'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-r from-earth-700 to-soil-900 rounded-xl p-8 text-white mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070")' }}></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 fancy-title">Farming Tasks Manager</h1>
            <p className="mb-4 max-w-2xl text-soil-100">
              Organize, prioritize, and track your agricultural activities. Plan your farm work efficiently and never miss important seasonal tasks.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              New Task
            </button>
          </div>
        </div>
        
        <div className="mt-6 relative z-10">
          <div className="flex flex-wrap gap-2">
            {taskCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center transition-all ${
                  activeCategory === category.id
                    ? 'bg-white text-gray-800 shadow-md'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <span className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center ${category.color}`}>
                  {category.icon}
                </span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {taskCategories.find(cat => cat.id === activeCategory)?.name || 'All Tasks'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {taskCategories.find(cat => cat.id === activeCategory)?.description || ''}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 w-full"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              
              <select className="py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              
              <select className="py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="priority">Priority</option>
                <option value="due-date">Due Date</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <Todo category={activeCategory} />
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border-l-4 border-green-500">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Seasonal Task Tips
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Plan tasks according to seasons. Spring for planting, summer for maintenance, fall for harvest, winter for planning.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border-l-4 border-blue-500">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            Task Reminders
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Set up notifications for critical tasks. Weather alerts can be linked to irrigation tasks automatically.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border-l-4 border-yellow-500">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Productivity Boost
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Group similar tasks together. Consider factors like location, equipment needed, and physical demand to optimize your day.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodoPage; 