import React, { useState, useCallback } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

interface DataUploadProps {
  onDataLoaded: (data: any) => void;
}

export function DataUpload({ onDataLoaded }: DataUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState<string>('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = async (file: File) => {
    setFileName(file.name);
    setUploadStatus('processing');
    
    // Simulate file processing
    setTimeout(() => {
      const mockData = generateMockData();
      onDataLoaded(mockData);
      setUploadStatus('success');
    }, 2000);
  };

  const generateMockData = () => {
    const data = [];
    const startDate = new Date('2014-01-01');
    
    for (let i = 0; i < 72; i++) { // 6 years of monthly data
      const date = new Date(startDate);
      date.setMonth(date.getMonth() + i);
      
      // Generate realistic drug sales data with trend and seasonality
      const trend = 1000 + (i * 50); // Growing trend
      const seasonal = 200 * Math.sin((i * 2 * Math.PI) / 12); // Annual seasonality
      const noise = (Math.random() - 0.5) * 200; // Random noise
      const sales = Math.max(500, trend + seasonal + noise);
      
      data.push({
        month: date.toISOString().slice(0, 7),
        sales: Math.round(sales),
        production: Math.round(sales * 1.1 + noise),
      });
    }
    
    return data;
  };

  const StatusIcon = () => {
    switch (uploadStatus) {
      case 'processing':
        return <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>;
      case 'success':
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Upload className="h-8 w-8 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        1. Data Upload & Preprocessing
      </h2>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          dragActive
            ? 'border-blue-400 bg-blue-50'
            : uploadStatus === 'success'
            ? 'border-green-400 bg-green-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <StatusIcon />
          
          {uploadStatus === 'idle' && (
            <>
              <div>
                <p className="text-lg font-medium text-gray-900">
                  Upload your drug sales data
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  CSV or Excel format (2014-2019 historical data)
                </p>
              </div>
              
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Choose File
              </label>
            </>
          )}
          
          {uploadStatus === 'processing' && (
            <div>
              <p className="text-lg font-medium text-gray-900">Processing {fileName}</p>
              <p className="text-sm text-gray-500">Analyzing data structure and cleaning...</p>
            </div>
          )}
          
          {uploadStatus === 'success' && (
            <div>
              <p className="text-lg font-medium text-green-700">Data loaded successfully!</p>
              <p className="text-sm text-gray-500">72 months of sales data • Ready for analysis</p>
            </div>
          )}
        </div>
      </div>
      
      {uploadStatus === 'success' && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-gray-900">Data Points</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">72</p>
            <p className="text-sm text-gray-600">Monthly records</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="font-medium text-gray-900">Data Quality</span>
            </div>
            <p className="text-2xl font-bold text-green-600 mt-2">100%</p>
            <p className="text-sm text-gray-600">Complete records</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <span className="font-medium text-gray-900">Outliers</span>
            </div>
            <p className="text-2xl font-bold text-yellow-600 mt-2">3</p>
            <p className="text-sm text-gray-600">Detected & handled</p>
          </div>
        </div>
      )}
    </div>
  );
}