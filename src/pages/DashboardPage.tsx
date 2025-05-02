import React, { useState } from 'react';

interface SavedRecommendation {
  id: number;
  date: string;
  cropName: string;
  status: 'planned' | 'in-progress' | 'harvested';
}

interface SoilRecord {
  id: number;
  date: string;
  location: string;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recommendations' | 'soil-records' | 'profile'>('recommendations');
  
  const savedRecommendations: SavedRecommendation[] = [
    {
      id: 1,
      date: '2023-04-15',
      cropName: 'Rice',
      status: 'in-progress'
    },
    {
      id: 2,
      date: '2023-04-10',
      cropName: 'Wheat',
      status: 'planned'
    },
    {
      id: 3,
      date: '2023-03-20',
      cropName: 'Maize',
      status: 'harvested'
    }
  ];
  
  const soilRecords: SoilRecord[] = [
    {
      id: 1,
      date: '2023-04-15',
      location: 'North Field',
      ph: 6.5,
      nitrogen: 75,
      phosphorus: 45,
      potassium: 60
    },
    {
      id: 2,
      date: '2023-03-20',
      location: 'South Field',
      ph: 7.2,
      nitrogen: 60,
      phosphorus: 30,
      potassium: 50
    }
  ];
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'planned':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Planned</span>;
      case 'in-progress':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">In Progress</span>;
      case 'harvested':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Harvested</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-cover bg-center rounded-xl p-8 text-white mb-8" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1560693225-b8507d6f3aa9?q=80&w=2070")' }}>
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Farmer's Dashboard</h1>
            <p className="text-white text-opacity-80">Welcome back, Farmer ji</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'recommendations'
                  ? 'border-b-2 border-green-500 text-green-600 dark:text-green-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Crop Recommendations
            </button>
            <button
              onClick={() => setActiveTab('soil-records')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'soil-records'
                  ? 'border-b-2 border-green-500 text-green-600 dark:text-green-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Soil Records
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'profile'
                  ? 'border-b-2 border-green-500 text-green-600 dark:text-green-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Profile
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'recommendations' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Your Crop Recommendations
                </h2>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  New Recommendation
                </button>
              </div>
              
              {savedRecommendations.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Crop
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {savedRecommendations.map((rec) => (
                        <tr key={rec.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            {new Date(rec.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                            {rec.cropName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(rec.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                              View
                            </button>
                            <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    You don't have any saved crop recommendations yet.
                  </p>
                  <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    Get Your First Recommendation
                  </button>
                </div>
              )}
              
              <div className="mt-8 bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">Crop Calendar</h3>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  Keep track of your planting and harvesting schedules with our crop calendar feature.
                </p>
                <button className="mt-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium">
                  View Crop Calendar →
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'soil-records' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Soil Test Records
                </h2>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Add New Record
                </button>
              </div>
              
              {soilRecords.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Location
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          pH
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          N-P-K
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {soilRecords.map((record) => (
                        <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            {new Date(record.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                            {record.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            {record.ph}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            {record.nitrogen}-{record.phosphorus}-{record.potassium}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                              View
                            </button>
                            <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    You haven't added any soil test records yet.
                  </p>
                  <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    Add Your First Record
                  </button>
                </div>
              )}
              
              <div className="mt-8 bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Soil Health Tips</h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  Regular soil testing helps you monitor soil health and make informed decisions about fertilizers and amendments.
                </p>
                <button className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                  Learn More →
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
                Farm Profile
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-750 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-4">Personal Information</h3>
                  
                  <form className="space-y-4">
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Full Name</label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Email Address</label>
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                      Update Profile
                    </button>
                  </form>
                </div>
                
                <div className="bg-white dark:bg-gray-750 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-4">Farm Details</h3>
                  
                  <form className="space-y-4">
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Farm Name</label>
                      <input
                        type="text"
                        placeholder="Enter your farm name"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Location</label>
                      <input
                        type="text"
                        placeholder="Enter your farm location"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Farm Size (Acres)</label>
                      <input
                        type="number"
                        placeholder="Enter farm size"
                        min="0"
                        step="0.1"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                      Update Farm Details
                    </button>
                  </form>
                </div>
              </div>
              
              <div className="mt-8 bg-orange-50 dark:bg-orange-900 p-4 rounded-lg">
                <h3 className="font-medium text-orange-800 dark:text-orange-200 mb-2">Account Settings</h3>
                <p className="text-orange-700 dark:text-orange-300 text-sm">
                  Update your password, notification preferences, and other account settings.
                </p>
                <button className="mt-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 text-sm font-medium">
                  Manage Settings →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 