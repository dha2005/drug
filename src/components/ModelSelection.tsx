import React, { useState, useEffect } from 'react';
import { Settings, Cpu, CheckCircle, BarChart3 } from 'lucide-react';

interface ModelSelectionProps {
  isVisible: boolean;
  onModelSelected: (model: any) => void;
}

export function ModelSelection({ isVisible, onModelSelected }: ModelSelectionProps) {
  const [autoArimaResults, setAutoArimaResults] = useState<{
    bestModel: string;
    aic: number;
    bic: number;
    parameters: { p: number; d: number; q: number; P: number; D: number; Q: number; s: number };
    isRunning: boolean;
  } | null>(null);

  const [selectedModel, setSelectedModel] = useState<'auto' | 'manual'>('auto');

  useEffect(() => {
    if (isVisible) {
      setAutoArimaResults({ ...autoArimaResults, isRunning: true });
      
      setTimeout(() => {
        const results = {
          bestModel: 'SARIMA(2,1,2)(1,1,1)[12]',
          aic: 1247.83,
          bic: 1268.91,
          parameters: { p: 2, d: 1, q: 2, P: 1, D: 1, Q: 1, s: 12 },
          isRunning: false
        };
        
        setAutoArimaResults(results);
        onModelSelected(results);
      }, 3000);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        5. ARIMA/SARIMA Model Selection
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">Model Selection Method</h3>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="modelMethod"
                  value="auto"
                  checked={selectedModel === 'auto'}
                  onChange={(e) => setSelectedModel(e.target.value as 'auto')}
                  className="text-blue-600"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Cpu className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-900">Auto ARIMA</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Automatically find optimal parameters using AIC/BIC criteria
                  </p>
                </div>
                {selectedModel === 'auto' && (
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                )}
              </label>
              
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="modelMethod"
                  value="manual"
                  checked={selectedModel === 'manual'}
                  onChange={(e) => setSelectedModel(e.target.value as 'manual')}
                  className="text-blue-600"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Manual Configuration</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Specify ARIMA parameters manually based on ACF/PACF plots
                  </p>
                </div>
              </label>
            </div>
          </div>
          
          {selectedModel === 'auto' && autoArimaResults && (
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Auto ARIMA Results</h3>
              
              {autoArimaResults.isRunning ? (
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <div>
                    <p className="font-medium text-blue-900">Searching for optimal model...</p>
                    <p className="text-sm text-blue-700">Testing different parameter combinations</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-900">Best Model Found</span>
                    </div>
                    <p className="text-lg font-bold text-green-800 mb-2">
                      {autoArimaResults.bestModel}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-green-700">AIC: </span>
                        <span className="font-medium">{autoArimaResults.aic.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-green-700">BIC: </span>
                        <span className="font-medium">{autoArimaResults.bic.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-600">ARIMA Order</p>
                      <p className="font-bold text-gray-900">
                        ({autoArimaResults.parameters.p},{autoArimaResults.parameters.d},{autoArimaResults.parameters.q})
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-600">Seasonal Order</p>
                      <p className="font-bold text-gray-900">
                        ({autoArimaResults.parameters.P},{autoArimaResults.parameters.D},{autoArimaResults.parameters.Q})
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-600">Seasonality</p>
                      <p className="font-bold text-gray-900">
                        {autoArimaResults.parameters.s}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Model Comparison</h3>
            <div className="space-y-3">
              {[
                { model: 'SARIMA(2,1,2)(1,1,1)[12]', aic: 1247.83, selected: true },
                { model: 'SARIMA(1,1,1)(1,1,1)[12]', aic: 1252.47, selected: false },
                { model: 'ARIMA(2,1,2)', aic: 1289.15, selected: false },
                { model: 'SARIMA(3,1,1)(1,1,1)[12]', aic: 1253.92, selected: false },
              ].map((model, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    model.selected 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {model.selected && <CheckCircle className="h-4 w-4 text-green-600" />}
                    <span className={`text-sm font-medium ${
                      model.selected ? 'text-green-900' : 'text-gray-700'
                    }`}>
                      {model.model}
                    </span>
                  </div>
                  <span className={`text-sm ${
                    model.selected ? 'text-green-700' : 'text-gray-600'
                  }`}>
                    AIC: {model.aic}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Model Diagnostics</h3>
            <div className="bg-gray-50 rounded-lg p-4 h-40 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Residual Analysis</p>
                <p className="text-xs text-gray-500 mt-1">
                  Checking model assumptions & fit quality
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}