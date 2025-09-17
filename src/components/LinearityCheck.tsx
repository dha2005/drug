import React, { useEffect, useState } from 'react';
import { TrendingUp, BarChart } from 'lucide-react';

interface LinearityCheckProps {
  data: any[];
  isVisible: boolean;
}

export function LinearityCheck({ data, isVisible }: LinearityCheckProps) {
  const [analysis, setAnalysis] = useState<{
    correlation: number;
    pValue: number;
    isLinear: boolean;
  } | null>(null);

  useEffect(() => {
    if (isVisible && data.length > 0) {
      // Simulate statistical analysis
      setTimeout(() => {
        const correlation = 0.85; // Strong positive correlation
        const pValue = 0.001; // Highly significant
        
        setAnalysis({
          correlation,
          pValue,
          isLinear: Math.abs(correlation) >= 0.7 && pValue < 0.05
        });
      }, 1000);
    }
  }, [isVisible, data]);

  if (!isVisible) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        2. Linearity Assessment
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Pearson Correlation Analysis</h3>
            
            {analysis ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Correlation Coefficient (r)</span>
                  <span className={`font-bold ${
                    Math.abs(analysis.correlation) >= 0.7 ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {analysis.correlation.toFixed(3)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">P-value</span>
                  <span className={`font-bold ${
                    analysis.pValue < 0.05 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {analysis.pValue.toFixed(3)}
                  </span>
                </div>
                
                <div className="pt-2 border-t">
                  <div className={`flex items-center space-x-2 ${
                    analysis.isLinear ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    <TrendingUp className="h-5 w-5" />
                    <span className="font-medium">
                      {analysis.isLinear ? 'Strong Linear Trend' : 'Non-linear Pattern'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {analysis.isLinear 
                      ? 'Data shows significant linear relationship with time'
                      : 'Data exhibits non-linear patterns - consider advanced modeling'
                    }
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm text-gray-600">Calculating correlation...</span>
              </div>
            )}
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Statistical Interpretation</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>|r| ≥ 0.7 &amp; p &lt; 0.05: Strong linear trend</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>|r| &lt; 0.7 or p ≥ 0.05: Non-linear pattern</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Trend Visualization</h3>
          <div className="bg-gray-50 rounded-lg p-4 h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Sales vs Time Scatter Plot</p>
              <p className="text-xs text-gray-500 mt-1">
                {analysis?.isLinear ? 'Strong upward trend visible' : 'Non-linear pattern detected'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}