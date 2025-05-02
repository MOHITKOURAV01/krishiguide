import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const history = useHistory();

  const handleNavigation = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    try {
      history.push(path);
    } catch (error) {
      // Fallback if history.push fails
      window.location.href = path;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Parallax Effect */}
      <div 
        className="relative h-[90vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4))'
        }}
      >
        <div 
          className="absolute inset-0 bg-hero-pattern bg-cover bg-center w-full h-full"
          style={{
            transform: `translateY(${scrollY * 0.4}px)`,
            backgroundImage: `url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
            filter: 'brightness(0.8)'
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />

        <div className="relative z-10 text-center px-6 py-12 bg-black bg-opacity-40 backdrop-blur-sm rounded-2xl max-w-3xl mx-4 transform transition-all duration-700 shadow-2xl border border-white/10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fadeInDown">
            Welcome to KrishiGuide
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 animate-fadeInUp max-w-xl mx-auto">
            Your Smart Crop Recommendation System for Modern Agriculture
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 animate-fadeIn">
            <Link
              to="/crop-recommendation"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-green-500/30 hover:translate-y-[-2px] transform-gpu font-medium"
            >
              <span>Get Started</span>
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/weather"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-blue-500/30 hover:translate-y-[-2px] transform-gpu font-medium"
            >
              <span>Weather Info</span>
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-4.9-6H8a4 4 0 00-5 3.9zm0 0a2 2 0 012-2h.5" />
              </svg>
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 flex justify-center">
            <a 
              href="#features" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 hover:scale-110 animate-bounce"
              aria-label="Scroll down"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div id="features" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16 animate-fadeIn transform-gpu">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
            Make Smarter Farming Decisions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-10 text-center max-w-3xl mx-auto text-lg">
            KrishiGuide helps farmers select the best crops based on growing seasons. Our recommendations 
            consider soil requirements, climate conditions, water needs, and growth duration to maximize 
            your agricultural productivity.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <InfoCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
              title="Seasonal Planning"
              text="Get crop recommendations based on Kharif, Rabi, and Zaid growing seasons."
            />
            
            <InfoCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-4.9-6H8a4 4 0 00-5 3.9zm0 0a2 2 0 012-2h.5" />
                </svg>
              }
              title="Climate Insights"
              text="Understand climate and water requirements for optimal crop selection."
            />
            
            <InfoCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              }
              title="Detailed Information"
              text="Access comprehensive details about soil types, growth duration, and more."
            />
          </div>

          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
            Explore Our Advanced Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              to="/crop-recommendation"
              image="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2532"
              title="Crop Recommendation"
              description="Enter your soil and climate details to receive personalized crop recommendations."
              onClick={(e) => handleNavigation('/crop-recommendation', e)}
            />
            
            <FeatureCard
              to="/weather"
              image="https://images.unsplash.com/photo-1504253163759-c23fccaebb55?q=80&w=2070"
              title="Weather-Based Recommendations"
              description="Get real-time weather data and crop suggestions based on current and forecasted conditions."
              onClick={(e) => handleNavigation('/weather', e)}
            />
            
            <FeatureCard
              to="/soil-analysis"
              image="https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=2070"
              title="Soil Health Analysis"
              description="Analyze your soil composition and receive fertilizer and treatment recommendations."
              onClick={(e) => handleNavigation('/soil-analysis', e)}
            />
            
            <FeatureCard
              to="/maps"
              image="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2031"
              title="Region-Based Mapping"
              description="Explore region-specific crop recommendations using interactive maps."
              onClick={(e) => handleNavigation('/maps', e)}
            />
            
            <FeatureCard
              to="/prediction"
              image="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071"
              title="Yield Prediction"
              description="Use our ML model to predict crop yields based on historical data and current conditions."
              onClick={(e) => handleNavigation('/prediction', e)}
            />
            
            <FeatureCard
              to="/tasks"
              image="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070"
              title="Farming Tasks"
              description="Keep track of your agricultural tasks with our easy-to-use task management tool."
              onClick={(e) => handleNavigation('/tasks', e)}
            />
            
            <FeatureCard
              to="/crop-calendar"
              image="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070"
              title="Crop Calendar"
              description="Plan your farming activities based on seasonal crop calendars and recommendations."
              onClick={(e) => handleNavigation('/crop-calendar', e)}
            />
            
            <FeatureCard
              to="/market-prices"
              image="https://images.unsplash.com/photo-1532372576444-dda954194ad0?q=80&w=2072"
              title="Market Prices"
              description="Get the latest agricultural commodity prices to make informed selling decisions."
              onClick={(e) => handleNavigation('/market-prices', e)}
            />
            
            <FeatureCard
              to="/farming-tips"
              image="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2532"
              title="Farming Tips"
              description="Discover practical advice to improve your farming techniques and boost productivity."
              onClick={(e) => handleNavigation('/farming-tips', e)}
            />
          </div>

          <div className="mt-12 text-center">
            <Link 
              to="/dashboard"
              className="inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-green-500/30 transition-all duration-300 font-medium"
            >
              View All Features
            </Link>
          </div>
        </div>
        
        <div className="text-center py-8 animate-fadeIn">
          <blockquote className="p-8 italic text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            "Choose the right crop at the right time for better yields and sustainability."
          </blockquote>
        </div>
      </div>
    </div>
  );
};

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, text }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl text-center transition-all hover:-translate-y-2 hover:shadow-xl duration-300 group border border-gray-100 dark:border-gray-600">
      <div className="text-green-500 dark:text-green-400 mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{text}</p>
    </div>
  );
};

interface FeatureCardProps {
  to: string;
  image: string;
  title: string;
  description: string;
  onClick?: (e: React.MouseEvent) => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ to, image, title, description, onClick }) => {
  return (
    <Link 
      to={to} 
      className="block group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-full border border-gray-100 dark:border-gray-600">
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
          <div className="mt-4 text-green-600 dark:text-green-400 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="mr-2 font-medium">Learn more</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Home; 