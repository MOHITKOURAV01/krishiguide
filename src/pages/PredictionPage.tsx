import React, { useState } from 'react';

interface PredictionParams {
  crop: string;
  area: number;
  rainfall: number;
  temperature: number;
  humidity: number;
  ph: number;
  fertilizer: string;
}

interface PredictionResult {
  predictedYield: number;
  expectedRevenue: number;
  probabilityOfSuccess: number;
  recommendations: string[];
  comparisonWithAverage: number;
}

const PredictionPage: React.FC = () => {
  const initialParams: PredictionParams = {
    crop: 'rice',
    area: 1,
    rainfall: 200,
    temperature: 25,
    humidity: 80,
    ph: 6.5,
    fertilizer: 'nitrogen'
  };

  const [params, setParams] = useState<PredictionParams>(initialParams);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const crops = [
    { value: 'rice', label: 'Rice' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'maize', label: 'Maize' },
    { value: 'cotton', label: 'Cotton' },
    { value: 'sugarcane', label: 'Sugarcane' },
    { value: 'potato', label: 'Potato' },
    { value: 'tomato', label: 'Tomato' },
    { value: 'mustard', label: 'Mustard' }
  ];

  const fertilizers = [
    { value: 'nitrogen', label: 'Nitrogen-based' },
    { value: 'phosphorus', label: 'Phosphorus-based' },
    { value: 'potassium', label: 'Potassium-based' },
    { value: 'organic', label: 'Organic' },
    { value: 'mixed', label: 'Mixed NPK' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParams({
      ...params,
      [name]: name === 'crop' || name === 'fertilizer' ? value : Number(value)
    });
  };

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call to ML model
    setTimeout(() => {
      // This is a dummy model for demonstration purposes
      // In a real app, this would be an API call to a backend ML service
      const result = predictYield(params);
      setPrediction(result);
      setLoading(false);
    }, 1500);
  };

  const predictYield = (params: PredictionParams): PredictionResult => {
    // Dummy prediction logic - in a real app this would be a call to a trained ML model
    // Base yields for different crops in quintals per hectare (approximate Indian averages)
    const baseYields: { [key: string]: number } = {
      rice: 40,
      wheat: 35,
      maize: 30,
      cotton: 15,
      sugarcane: 700,
      potato: 250,
      tomato: 300,
      mustard: 12
    };

    // Apply some simple adjustments based on parameters
    let yield_factor = 1.0;

    // Rainfall factor (optimum ranges vary by crop)
    if (params.crop === 'rice' && params.rainfall > 150) yield_factor += 0.2;
    if (params.crop === 'wheat' && params.rainfall > 100 && params.rainfall < 200) yield_factor += 0.15;
    if (params.rainfall < 50) yield_factor -= 0.3;
    if (params.rainfall > 300) yield_factor -= 0.1;

    // Temperature factor
    if (params.temperature < 15 || params.temperature > 35) yield_factor -= 0.2;
    if (params.crop === 'rice' && params.temperature > 25 && params.temperature < 32) yield_factor += 0.1;
    if (params.crop === 'wheat' && params.temperature > 15 && params.temperature < 25) yield_factor += 0.15;

    // pH factor
    if (params.ph < 5.5 || params.ph > 8.0) yield_factor -= 0.15;
    if (params.crop === 'potato' && params.ph > 5.0 && params.ph < 6.5) yield_factor += 0.1;
    if (params.crop === 'sugarcane' && params.ph > 6.0 && params.ph < 7.5) yield_factor += 0.1;

    // Humidity factor
    if (params.crop === 'rice' && params.humidity > 70) yield_factor += 0.1;
    if (params.crop === 'cotton' && params.humidity < 60) yield_factor += 0.1;

    // Fertilizer factor
    if (params.crop === 'rice' && params.fertilizer === 'nitrogen') yield_factor += 0.15;
    if (params.crop === 'wheat' && params.fertilizer === 'phosphorus') yield_factor += 0.1;
    if (params.crop === 'potato' && params.fertilizer === 'potassium') yield_factor += 0.12;
    if (params.fertilizer === 'organic') yield_factor += 0.05; // Slight boost for all organic

    // Calculate final predicted yield
    const predictedYield = baseYields[params.crop] * yield_factor * params.area;
    
    // Generate recommendations based on parameters
    const recommendations: string[] = [];
    
    if (params.rainfall < 100 && (params.crop === 'rice' || params.crop === 'sugarcane')) {
      recommendations.push('Consider irrigation systems to supplement low rainfall for water-intensive crops.');
    }
    
    if (params.ph < 5.5) {
      recommendations.push('Soil is acidic. Consider adding lime to increase pH for better nutrient availability.');
    } else if (params.ph > 7.5) {
      recommendations.push('Soil is alkaline. Consider adding sulfur or organic matter to lower pH.');
    }
    
    if (params.temperature > 32 && params.humidity < 60) {
      recommendations.push('High temperature and low humidity may cause water stress. Consider mulching and increased irrigation.');
    }
    
    if (params.crop === 'rice' && params.fertilizer !== 'nitrogen') {
      recommendations.push('Rice typically responds well to nitrogen-based fertilizers. Consider modifying your fertilizer choice.');
    }

    if (recommendations.length === 0) {
      recommendations.push('Your current parameters are optimal for the selected crop.');
    }
    
    // Calculate some additional metrics for the prediction result
    const avgYield = baseYields[params.crop];
    const comparisonWithAverage = (predictedYield / (avgYield * params.area) - 1) * 100;
    
    // Dummy crop prices in INR per quintal (approximate Indian market rates)
    const cropPrices: { [key: string]: number } = {
      rice: 2000,
      wheat: 2200,
      maize: 1800,
      cotton: 6000,
      sugarcane: 300,
      potato: 1500,
      tomato: 2000,
      mustard: 5000
    };
    
    const expectedRevenue = predictedYield * cropPrices[params.crop];
    
    // Calculate a simple "probability of success" based on how optimal the conditions are
    const probabilityOfSuccess = Math.min(95, Math.max(50, yield_factor * 80));

    return {
      predictedYield: Math.round(predictedYield * 10) / 10,
      expectedRevenue: Math.round(expectedRevenue),
      probabilityOfSuccess: Math.round(probabilityOfSuccess),
      recommendations,
      comparisonWithAverage: Math.round(comparisonWithAverage)
    };
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-cover bg-center rounded-xl p-8 text-white mb-8" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071")' }}>
        <h1 className="text-3xl font-bold mb-2">Crop Yield Prediction</h1>
        <p className="mb-6">
          Use our machine learning model to predict crop yields based on various parameters.
          <span className="block mt-2 text-sm opacity-90">Note: This is a simplified demo model for educational purposes.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Input Parameters
            </h2>
            
            <form onSubmit={handlePredict}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">Crop</label>
                  <select
                    name="crop"
                    value={params.crop}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  >
                    {crops.map((crop) => (
                      <option key={crop.value} value={crop.value}>
                        {crop.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Area (Hectares)
                  </label>
                  <input
                    type="number"
                    name="area"
                    min="0.1"
                    max="100"
                    step="0.1"
                    value={params.area}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Rainfall (mm/month)
                  </label>
                  <input
                    type="range"
                    name="rainfall"
                    min="0"
                    max="400"
                    step="10"
                    value={params.rainfall}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm">
                    <span>0 mm</span>
                    <span>{params.rainfall} mm</span>
                    <span>400 mm</span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Temperature (°C)
                  </label>
                  <input
                    type="range"
                    name="temperature"
                    min="10"
                    max="40"
                    step="1"
                    value={params.temperature}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm">
                    <span>10°C</span>
                    <span>{params.temperature}°C</span>
                    <span>40°C</span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Humidity (%)
                  </label>
                  <input
                    type="range"
                    name="humidity"
                    min="30"
                    max="100"
                    step="1"
                    value={params.humidity}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm">
                    <span>30%</span>
                    <span>{params.humidity}%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Soil pH
                  </label>
                  <input
                    type="range"
                    name="ph"
                    min="4"
                    max="9"
                    step="0.1"
                    value={params.ph}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm">
                    <span>Acidic (4.0)</span>
                    <span>{params.ph}</span>
                    <span>Alkaline (9.0)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Fertilizer Type
                  </label>
                  <select
                    name="fertilizer"
                    value={params.fertilizer}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  >
                    {fertilizers.map((fertilizer) => (
                      <option key={fertilizer.value} value={fertilizer.value}>
                        {fertilizer.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Predict Yield'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          {loading ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">
                Analyzing data and generating prediction...
              </p>
            </div>
          ) : prediction ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
                Prediction Results for {crops.find(c => c.value === params.crop)?.label}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Predicted Yield</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {prediction.predictedYield} <span className="text-sm font-normal">quintals</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {prediction.comparisonWithAverage > 0 ? '+' : ''}
                    {prediction.comparisonWithAverage}% vs. average
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Expected Revenue</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ₹{prediction.expectedRevenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Based on current market prices
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Success Probability</p>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-8 mb-1 flex rounded-full bg-gray-200 dark:bg-gray-600">
                      <div
                        style={{ width: `${prediction.probabilityOfSuccess}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                          prediction.probabilityOfSuccess > 70
                            ? 'bg-green-500'
                            : prediction.probabilityOfSuccess > 50
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                      >
                        {prediction.probabilityOfSuccess}%
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {prediction.probabilityOfSuccess > 70
                      ? 'Excellent conditions'
                      : prediction.probabilityOfSuccess > 50
                      ? 'Fair conditions'
                      : 'Challenging conditions'}
                  </p>
                </div>
              </div>

              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
                Recommendations & Insights
              </h3>

              <ul className="space-y-2 mb-6">
                {prediction.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{rec}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg text-blue-800 dark:text-blue-200">
                <p className="text-sm">
                  <strong>Note:</strong> This prediction is based on a simplified model and should be
                  used as a general guide only. For more accurate predictions, consult with local
                  agricultural experts or use advanced prediction tools with regional calibration.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="text-center p-8">
                <img
                  src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=1974"
                  alt="Farm field"
                  className="w-64 h-64 object-cover rounded-full mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Welcome to our Yield Prediction Tool
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Adjust the parameters on the left panel and click "Predict Yield" to see the estimated
                  crop production and recommendations based on your inputs.
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  The tool takes into account factors like soil conditions, climate, and farming practices
                  to provide you with tailored insights for better agricultural planning.
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              About Our Prediction Model
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              This yield prediction tool uses a simplified model based on agricultural data and research.
              In a production environment, this would be replaced with a trained machine learning model
              using techniques such as:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
              <li>Random Forest or Gradient Boosting algorithms</li>
              <li>Neural networks trained on historical yield data</li>
              <li>Regression models incorporating weather patterns and soil analysis</li>
              <li>Integration with satellite imagery for real-time crop health assessment</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300">
              Our model takes into account key parameters that affect crop growth, including rainfall,
              temperature, humidity, soil pH, and fertilizer type. The recommendations are generated
              based on optimal growing conditions for each crop type.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionPage; 