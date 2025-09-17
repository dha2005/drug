import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, TrendingDown } from 'lucide-react';

interface StationarityTestProps {
  data: any[];
  isVisible: boolean;
}

export function StationarityTest({ data, isVisible }: StationarityTestProps) {
  const [adfResults, setAdfResults] = useState<{
    statistic: number;
    pValue: number;
    isStationary: boolean;
    criticalValues: { [key: string]: number };
    differencingOrder: number;
  } | null>(null);

  useEffect(() => {
    if (isVisible && data.length > 0) {
      setTimeout(() => {
        // Simulate ADF test results
        const results = {
          statistic: -2.158,
          pValue: 0.224, // Non-stationary initially
          isStationary: false,
          criticalValues: {
            '1%': -3.621,
            '5%': -2.943,
            '10%': -2.610
          },
          differencingOrder: 1 // Need first differencing
        };
        
        setAdfResults(results);
      }, 1200);
    }
  }, [isVisible, data]);

  if (!isVisible) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        4. Stationarity Analysis
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">
              Augmented Dickey-Fuller Test
            </h3>
            
            {adfResults ? (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border ${
                  adfResults.isStationary 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {adfResults.isStationary ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    )}
                    <span className={`font-medium ${
                      adfResults.isStationary ? 'text-green-900' : 'text-red-900'
                    }`}>
                      {adfResults.isStationary ? 'Stationary' : 'Non-Stationary'}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    adfResults.isStationary ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {adfResults.isStationary 
                      ? 'Data is ready for ARIMA modeling' 
                      : 'Data requires differencing for stationarity'
                    }
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">ADF Statistic</span>
                    <span className="font-bold text-gray-900">
                      {adfResults.statistic.toFixed(3)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">P-value</span>
                    <span className={`font-bold ${
                      adfResults.pValue <= 0.05 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {adfResults.pValue.toFixed(3)}
                    </span>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-xs text-gray-600 mb-2">Critical Values:</p>
                    <div className="space-y-1">
                      {Object.entries(adfResults.criticalValues).map(([level, value]) => (
                        <div key={level} className="flex justify-between text-xs">
                          <span className="text-gray-500">{level} level</span>
                          <span className="text-gray-700">{value.toFixed(3)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm text-gray-600">Running ADF test...</span>
              </div>
            )}
          </div>
          
          {adfResults && !adfResults.isStationary && (
            <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingDown className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Differencing Required</span>
              </div>
              <p className="text-sm text-blue-700 mb-2">
                Applying {adfResults.differencingOrder === 1 ? 'first' : `${adfResults.differencingOrder}th`} 
                -order differencing to achieve stationarity
              </p>
              <div className="bg-blue-100 rounded p-2">
                <code className="text-xs text-blue-800">
                  d = {adfResults.differencingOrder} (differencing order for ARIMA)
                </code>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Stationarity Visualization</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Original Series</p>
                <div className="h-16 bg-gradient-to-r from-red-100 to-red-200 rounded flex items-center justify-center">
                  <span className="text-xs text-red-700">Non-stationary trend</span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">After First Differencing</p>
                <div className="h-16 bg-gradient-to-r from-green-100 to-green-200 rounded flex items-center justify-center">
                  <span className="text-xs text-green-700">Stationary series</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Statistical Guidelines</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>p-value ≤ 0.05: Reject null hypothesis (Stationary)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>p-value {'>'} 0.05: Fail to reject (Non-stationary)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>ADF {'<'} Critical Value: Series is stationary</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}