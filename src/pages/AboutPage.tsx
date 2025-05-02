import React from 'react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const AboutPage: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: 'Mohit',
      role: 'Developer',
      bio: 'Full-stack developer specialized in creating innovative agricultural technology solutions with expertise in modern web development frameworks.',
      image: '/images/mohit.jpg'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-green-50 dark:bg-gray-900">
      {/* Enhanced Hero Section with Bold Colors */}
      <div className="relative rounded-xl overflow-hidden mb-12 border-4 border-green-500 shadow-2xl">
        <div className="bg-cover bg-center h-80" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070")' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-blue-800"></div>
        </div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="flex flex-col md:flex-row items-center justify-between w-full px-8">
            {/* Text container with bold background */}
            <div className="bg-green-700 p-6 rounded-xl border-4 border-white text-white z-10 md:max-w-xl animate-fadeIn shadow-lg">
              <h1 className="text-5xl md:text-6xl font-black mb-4 text-white" style={{textShadow: '2px 2px 0 #000'}}>
                About <span className="text-yellow-300">KrishiGuide</span>
              </h1>
              <p className="text-xl mb-6 text-white font-bold" style={{textShadow: '1px 1px 0 #000'}}>
                Learn about our mission, team, and the technology behind our crop recommendation system.
              </p>
              <div className="bg-yellow-500 px-6 py-3 rounded-full inline-block shadow-lg">
                <span className="text-xl font-extrabold text-green-900 flex items-center">
                  <span className="text-3xl mr-2">🌱</span> 
                  Empowering Farmers with Smart Technology
                </span>
              </div>
            </div>
            
            <div className="w-56 h-56 flex-shrink-0 mt-6 md:mt-0 z-10 animate-fadeIn" style={{animationDelay: '600ms'}}>
              <div className="p-3 bg-white rounded-full shadow-xl border-4 border-green-500">
                <img 
                  src="/images/pngggg.jpg" 
                  alt="KrishiGuide Farmer Logo" 
                  className="w-full h-full object-contain rounded-full shadow-lg border-2 border-green-600"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/images/mohit.jpg';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-12 border-4 border-blue-500 dark:border-blue-600 transform transition-all hover:shadow-2xl">
        <div className="flex items-center mb-6 bg-blue-600 p-4 rounded-lg shadow-lg -mx-4">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-blue-600 mr-4 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-4xl font-black text-white">
            Our Mission
          </h2>
        </div>
        
        <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 lg:text-xl space-y-6 font-medium">
          <p className="relative pl-6 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-r-lg shadow-md">
            <span className="text-blue-600 dark:text-blue-400 text-2xl absolute left-4 top-0 transform -translate-x-full font-bold">"</span>
            KrishiGuide was founded with a clear mission: to empower farmers with data-driven insights for better agricultural decision-making. We believe that by combining traditional farming knowledge with modern technology, we can help improve crop yields, reduce resource waste, and promote sustainable farming practices.
          </p>
          <p className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md">
            In many parts of India, farmers still rely on traditional knowledge and intuition when deciding which crops to plant. While this ancestral wisdom is invaluable, it can be enhanced with scientific data about soil conditions, climate patterns, and market trends. KrishiGuide bridges this gap by providing accessible, easy-to-understand recommendations tailored to each farmer's unique circumstances.
          </p>
          <p className="bg-green-100 dark:bg-green-900/40 p-4 rounded-lg shadow-md font-bold text-green-800 dark:text-green-200">
            Our goal is to make advanced agricultural science accessible to every farmer, regardless of their technical expertise or farm size. By democratizing access to crop recommendation technology, we hope to contribute to a more sustainable and productive agricultural future for India.
          </p>
        </div>
      </div>

      {/* What Sets Us Apart and Technology Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border-4 border-yellow-500 dark:border-yellow-600 transform transition-all hover:shadow-2xl">
          <div className="flex items-center mb-6 bg-yellow-500 p-4 rounded-lg shadow-lg -mx-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-yellow-600 mr-3 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-white">
              What Sets Us Apart
            </h2>
          </div>
          
          <ul className="space-y-6 text-gray-800 dark:text-gray-200 font-medium">
            <li className="flex items-start transform transition-all hover:translate-x-2 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg shadow-md">
              <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 mr-4 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl text-green-800 dark:text-green-400 mb-1">Locally Relevant</h3>
                <p className="text-gray-700 dark:text-gray-300">Our recommendations are tailored to Indian agricultural conditions and farming practices.</p>
              </div>
            </li>
            <li className="flex items-start transform transition-all hover:translate-x-2 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg shadow-md">
              <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl text-blue-800 dark:text-blue-400 mb-1">Data-Driven</h3>
                <p className="text-gray-700 dark:text-gray-300">We combine soil science, meteorology, and agronomics to provide accurate recommendations.</p>
              </div>
            </li>
            <li className="flex items-start transform transition-all hover:translate-x-2 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg shadow-md">
              <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-4 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl text-purple-800 dark:text-purple-400 mb-1">User-Friendly</h3>
                <p className="text-gray-700 dark:text-gray-300">Our interface is designed to be accessible to users with varying levels of technical knowledge.</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border-4 border-green-500 dark:border-green-600 transform transition-all hover:shadow-2xl">
          <div className="flex items-center mb-6 bg-green-600 p-4 rounded-lg shadow-lg -mx-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-green-600 mr-3 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-white">
              Our Technology
            </h2>
          </div>
          
          <p className="text-gray-800 dark:text-gray-200 mb-6 font-medium text-lg bg-green-50 dark:bg-green-900/20 p-4 rounded-lg shadow-md">
            KrishiGuide leverages several technologies to provide accurate and useful crop recommendations:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 p-5 rounded-xl border-2 border-green-500 dark:border-green-700 transform transition-all hover:scale-105 shadow-lg">
              <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center text-white mb-3 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-green-800 dark:text-green-300">Data Analysis</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2 font-medium">
                We process soil data, weather patterns, and historical crop performance to generate recommendations.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 p-5 rounded-xl border-2 border-blue-500 dark:border-blue-700 transform transition-all hover:scale-105 shadow-lg">
              <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white mb-3 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-blue-800 dark:text-blue-300">Weather Integration</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2 font-medium">
                Real-time and historical weather data inform our seasonal crop suggestions.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 p-5 rounded-xl border-2 border-amber-500 dark:border-amber-700 transform transition-all hover:scale-105 shadow-lg">
              <div className="w-14 h-14 rounded-full bg-amber-600 flex items-center justify-center text-white mb-3 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-amber-800 dark:text-amber-300">Interactive Mapping</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2 font-medium">
                Geospatial technology helps provide region-specific recommendations.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-5 rounded-xl border-2 border-purple-500 dark:border-purple-700 transform transition-all hover:scale-105 shadow-lg">
              <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center text-white mb-3 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-purple-800 dark:text-purple-300">Mobile Accessibility</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2 font-medium">
                Responsive design ensures farmers can access KrishiGuide from any device.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Mohit Section - Bold Colors */}
      <div className="bg-gradient-to-r from-blue-700 to-green-700 dark:from-blue-900 dark:to-green-900 rounded-xl shadow-2xl overflow-hidden relative border-4 border-white">
        <div className="p-8">
          <h2 className="text-3xl font-black text-center relative mb-8 animate-fadeIn text-white">
            <div className="w-24 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
          </h2>
        </div>
        
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col md:flex-row animate-fadeInUp">
            {/* Left side - Full height photo with better visibility */}
            <div className="md:w-1/2 h-[500px] relative overflow-hidden border-t-4 md:border-t-0 md:border-r-4 border-white">
              <img 
                src={member.image} 
                alt={member.name} 
                className="absolute inset-0 w-full h-full object-cover object-center"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/images/mohit.jpg';
                }}
              />
            </div>
            
            {/* Right side - Developer info with improved contrast */}
            <div className="md:w-1/2 p-8 bg-white dark:bg-gray-800 flex flex-col justify-center relative z-10">
              <div className="max-w-lg">
                <h3 className="text-4xl font-black text-gray-800 dark:text-gray-100 mb-2">{member.name}</h3>
                <div className="w-32 h-2 bg-gradient-to-r from-green-500 to-blue-500 mb-6 rounded-full"></div>
                
                <div className="inline-block bg-green-500 px-6 py-3 rounded-full text-white font-bold mb-6 shadow-lg">
                  {member.role}
                </div>
                
                <p className="text-gray-800 dark:text-gray-200 text-xl mb-8 leading-relaxed border-l-4 border-green-500 pl-4 font-medium bg-gray-50 dark:bg-gray-700 p-4 rounded-r-lg shadow-md">
                  {member.bio}
                </p>
                
                <div className="flex space-x-6">
                  {/* LinkedIn */}
                  <a href="https://www.linkedin.com/in/mohit-kourav-a03215338/" target="_blank" rel="noopener noreferrer" 
                     className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 border-2 border-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  
                  {/* Instagram */}
                  <a href="https://www.instagram.com/_._.mohit__/" target="_blank" rel="noopener noreferrer" 
                     className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-xl hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 border-2 border-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  
                  {/* GitHub */}
                  <a href="https://github.com/MOHITKOURAV01" target="_blank" rel="noopener noreferrer" 
                     className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-900 text-white shadow-xl hover:bg-black transition-all duration-300 transform hover:scale-110 border-2 border-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage; 