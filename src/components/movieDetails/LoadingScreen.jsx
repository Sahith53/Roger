import React from 'react';

const LoadingSkeleton = () => (
  <div className="animate-pulse flex space-x-4">
    <div className="w-full h-full flex items-center justify-center space-y-6 p-6">
      <div className="bg-gray-700 h-8 w-1/4 rounded"></div>
      <div className="bg-gray-700 h-4 w-3/4 rounded"></div>
      <div className="bg-gray-700 h-4 w-2/3 rounded"></div>
      <div className="bg-gray-700 h-4 w-1/2 rounded"></div>
      <div className="bg-gray-700 h-4 w-1/3 rounded"></div>
      <div className="bg-gray-700 h-64 w-full rounded-lg"></div>
    </div>
  </div>
);

export default LoadingSkeleton;
