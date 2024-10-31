// src/components/ui/input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  const styles = `bg-gray-800 border border-gray-600 text-white rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500 ${className}`;
  return <input className={styles} {...props} />;
};
