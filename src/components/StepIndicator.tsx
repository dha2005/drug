import React from 'react';
import { Check, Circle, Clock } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: Step[];
  onStepClick: (stepId: number) => void;
}

export function StepIndicator({ currentStep, steps, onStepClick }: StepIndicatorProps) {
  const getStepIcon = (stepId: number) => {
    if (stepId < currentStep) {
      return <Check className="h-4 w-4 text-white" />;
    } else if (stepId === currentStep) {
      return <Circle className="h-4 w-4 text-white fill-current" />;
    } else {
      return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStepStyle = (stepId: number) => {
    if (stepId < currentStep) {
      return "bg-green-500 border-green-500 text-white";
    } else if (stepId === currentStep) {
      return "bg-blue-600 border-blue-600 text-white";
    } else {
      return "bg-white border-gray-300 text-gray-400";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Progress</h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start space-x-4">
            <button
              onClick={() => onStepClick(step.id)}
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-105 ${getStepStyle(step.id)}`}
            >
              {getStepIcon(step.id)}
            </button>
            <div className="flex-1 min-w-0">
              <button
                onClick={() => onStepClick(step.id)}
                className="text-left w-full group"
              >
                <p className={`text-sm font-medium transition-colors ${
                  step.id <= currentStep ? 'text-gray-900 group-hover:text-blue-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">{step.description}</p>
              </button>
            </div>
            {index < steps.length - 1 && (
              <div className="absolute left-4 mt-8 w-0.5 h-6 bg-gray-200"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}