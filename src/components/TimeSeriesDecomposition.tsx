import React, { useEffect, useState } from 'react';
import { Activity, TrendingUp, Repeat, Zap } from 'lucide-react';

interface DecompositionProps {
  data: any[];
  isVisible: boolean;
}

export function TimeSeriesDecomposition({ data, isVisible }: DecompositionProps) {
  const [decomposition, setDecomposition] = useState<{
    trend: number[];
    seasonal: number[];
    residual: number[];
    seasonalStrength: number;
  } | null>(null);

  useEffect(() => {
    if (isVisible && data.length > 0) {
      setTimeout(() => {
        // Simulate decomposition analysis
        const trend = data.map((_, i) => 1000 + i * 50 + Math.random() * 100);
        const seasonal = data.map((_, i) => 200 * Math.sin((i * 2 * Math.PI) / 12));
        const residual = data.map(() => (Math.random() - 0.5) * 100);
        
        setDecomposition({
          trend,
          seasonal,
          residual,
          seasonalStrength: 0.75 // Strong seasonality
        });
      }, 1500);
    }
  }, [isVisible, data]);

  if (!isVisible) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        3. Time Series Decomposition
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Decomposition Components</h3>
            
            {decomposition ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium text-blue-900">Trend Component</p>
                    <p className="text-sm text-blue-700">Long-term directional movement</p>
                  </div>
                  <span className="text-blue-600 font-bold">↗ Positive</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Repeat className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium text-green-900">Seasonal Component</p>
                    <p className="text-sm text-green-700">Recurring patterns within year</p>
                  </div>
                  <span className="text-green-600 font-bold">
                    {(decomposition.seasonalStrength * 100).toFixed(0)}% Strong
                  </span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <div className="flex-1">
                    <p className="font-medium text-purple-900">Residual Component</p>
                    <p className="text-sm text-purple-700">Random variations & noise</p>
                  </div>
                  <span className="text-purple-600 font-bold">Normal</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm text-gray-600">Decomposing time series...</span>
              </div>
            )}
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Key Insights</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                <p>Strong upward trend indicates growing market demand</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                <p>Clear seasonal patterns suggest monthly sales cycles</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2"></div>
                <p>Low residual variance indicates predictable patterns</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Decomposition Charts</h3>
            <div className="space-y-3">
              {['Original Series', 'Trend', 'Seasonal', 'Residuals'].map((component, index) => (
                <div key={component} className="bg-gray-50 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{component}</span>
                    <Activity className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="h-8 bg-gradient-to-r from-blue-100 to-blue-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Model Recommendations</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm font-medium text-yellow-800">
                Recommended: SARIMA Model
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                Strong seasonality detected - use Seasonal ARIMA for better forecasting accuracy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}