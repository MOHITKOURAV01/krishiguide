import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import WeatherPage from './pages/WeatherPage';
import SoilAnalysisPage from './pages/SoilAnalysisPage';
import MapsPage from './pages/MapsPage';
import PredictionPage from './pages/PredictionPage';
import TodoPage from './pages/TodoPage';
import CropCalendarPage from './pages/CropCalendarPage';
import MarketPricePage from './pages/MarketPricePage';
import FarmingTipsPage from './pages/FarmingTipsPage';
import CropRecommendationPage from './pages/CropRecommendationPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FarmerStoriesPage from './pages/FarmerStoriesPage';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage or default to false
    const savedMode = localStorage.getItem('krishiGuide-darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Save darkMode preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('krishiGuide-darkMode', JSON.stringify(darkMode));
    
    // Also update the document class for immediate effect
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 dark:text-white transition-colors duration-500 ease-in-out">
          {/* Background pattern overlay */}
          <div className="absolute inset-0 bg-soil-texture opacity-5 pointer-events-none"></div>
          
          <Navbar isDarkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          
          <main className="container mx-auto py-4 pt-24 px-4 relative z-10">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/weather" component={WeatherPage} />
              <Route path="/soil-analysis" component={SoilAnalysisPage} />
              <Route path="/maps" component={MapsPage} />
              <Route path="/todo" component={TodoPage} />
              <Route path="/crop-calendar" component={CropCalendarPage} />
              <Route path="/market-prices" component={MarketPricePage} />
              <Route path="/farming-tips" component={FarmingTipsPage} />
              <Route path="/crop-recommendation" component={CropRecommendationPage} />
              <Route path="/dashboard" component={DashboardPage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/contact" component={ContactPage} />
              <Route path="/farmer-stories" component={FarmerStoriesPage} />
              <Route path="/privacy-policy" component={() => (
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-soft animate-fadeIn">
                  <h1 className="text-3xl font-bold mb-6 fancy-title text-primary-600 dark:text-primary-400">Privacy Policy</h1>
                  <p className="text-gray-600 dark:text-gray-300">Privacy Policy content will go here</p>
                </div>
              )} />
              <Route path="/terms-of-service" component={() => (
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-soft animate-fadeIn">
                  <h1 className="text-3xl font-bold mb-6 fancy-title text-primary-600 dark:text-primary-400">Terms of Service</h1>
                  <p className="text-gray-600 dark:text-gray-300">Terms of Service content will go here</p>
                </div>
              )} />
              <Route path="/cookie-policy" component={() => (
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-soft animate-fadeIn">
                  <h1 className="text-3xl font-bold mb-6 fancy-title text-primary-600 dark:text-primary-400">Cookie Policy</h1>
                  <p className="text-gray-600 dark:text-gray-300">Cookie Policy content will go here</p>
                </div>
              )} />
            </Switch>
          </main>
          
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
