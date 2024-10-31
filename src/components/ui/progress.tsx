// src/components/ui/progress.tsx
import React from 'react';

interface ProgressProps {
  value: number;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, className = '' }) => {
  return (
    <div className={`w-full bg-gray-700 rounded-full h-2 ${className}`}>
      <div
        className="bg-red-500 h-2 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};
