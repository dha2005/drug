import React, { useState } from 'react';
import { Header } from './components/Header';
import { StepIndicator } from './components/StepIndicator';
import { DataUpload } from './components/DataUpload';
import { LinearityCheck } from './components/LinearityCheck';
import { TimeSeriesDecomposition } from './components/TimeSeriesDecomposition';
import { StationarityTest } from './components/StationarityTest';
import { ModelSelection } from './components/ModelSelection';
import { ForecastResults } from './components/ForecastResults';

const WORKFLOW_STEPS = [
  { id: 1, title: 'Data Upload & Preprocessing', description: 'Load and clean your 2014-2019 sales data' },
  { id: 2, title: 'Linearity Assessment', description: 'Analyze linear trends and correlations' },
  { id: 3, title: 'Time Series Decomposition', description: 'Break down trend, seasonality, and residuals' },
  { id: 4, title: 'Stationarity Testing', description: 'Check data stationarity with ADF test' },
  { id: 5, title: 'Model Selection', description: 'Configure ARIMA/SARIMA parameters' },
  { id: 6, title: 'Model Training', description: 'Fit the selected model to historical data' },
  { id: 7, title: 'Generate Forecast', description: 'Predict 2020-2024 demand with confidence intervals' },
  { id: 8, title: 'Export Results', description: 'Download forecast data and analysis report' }
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const [selectedModel, setSelectedModel] = useState<any>(null);

  const handleDataLoaded = (loadedData: any[]) => {
    setData(loadedData);
    setCurrentStep(2);
  };

  const handleStepClick = (stepId: number) => {
    if (stepId === 1 || (stepId <= currentStep + 1 && data.length > 0)) {
      setCurrentStep(stepId);
    }
  };

  const handleModelSelected = (model: any) => {
    setSelectedModel(model);
    setCurrentStep(7);
  };

  React.useEffect(() => {
    // Auto-advance through analysis steps
    if (data.length > 0 && currentStep < 6) {
      const timer = setTimeout(() => {
        if (currentStep === 5 && !selectedModel) return; // Wait for model selection
        setCurrentStep(prev => Math.min(prev + 1, 6));
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, data.length, selectedModel]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentStep={currentStep} totalSteps={WORKFLOW_STEPS.length} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with step indicator */}
          <div className="lg:w-80 flex-shrink-0">
            <StepIndicator
              currentStep={currentStep}
              steps={WORKFLOW_STEPS}
              onStepClick={handleStepClick}
            />
          </div>
          
          {/* Main content area */}
          <div className="flex-1">
            {currentStep === 1 && (
              <DataUpload onDataLoaded={handleDataLoaded} />
            )}
            
            <LinearityCheck data={data} isVisible={currentStep >= 2} />
            <TimeSeriesDecomposition data={data} isVisible={currentStep >= 3} />
            <StationarityTest data={data} isVisible={currentStep >= 4} />
            
            {currentStep >= 5 && (
              <ModelSelection 
                isVisible={currentStep >= 5} 
                onModelSelected={handleModelSelected}
              />
            )}
            
            {currentStep >= 7 && selectedModel && (
              <ForecastResults model={selectedModel} isVisible={currentStep >= 7} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;