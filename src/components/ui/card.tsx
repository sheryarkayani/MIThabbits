// src/components/ui/card.tsx
import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return <div className={`rounded-lg shadow-md ${className}`}>{children}</div>;
};

export const CardHeader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="p-6 border-b border-gray-700">{children}</div>;
};

export const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({
  children,
  className = '',
}) => {
  return <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>;
};

export const CardDescription: React.FC<{ className?: string; children: React.ReactNode }> = ({
  children,
  className = '',
}) => {
  return <p className={`mt-2 text-sm ${className}`}>{children}</p>;
};

export const CardContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="p-6">{children}</div>;
};

export const CardFooter: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="p-6 border-t border-gray-700">{children}</div>;
};
