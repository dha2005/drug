import React from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';

interface HeaderProps {
  currentStep: number;
  totalSteps: number;
}

export function Header({ currentStep, totalSteps }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Drug Sales Forecasting
                </h1>
                <p className="text-sm text-gray-600">
                  Professional Time Series Analysis & Demand Prediction
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <BarChart3 className="h-4 w-4" />
              <span>Step {currentStep} of {totalSteps}</span>
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}