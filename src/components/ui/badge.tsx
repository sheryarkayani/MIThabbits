// src/components/ui/badge.tsx
import React from 'react';
import classNames from 'classnames';

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'outline';
  className?: string;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  className = '',
  children,
}) => {
  const styles = classNames(
    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
    {
      'bg-red-600 text-white': variant === 'secondary',
      'bg-gray-800 border border-red-500 text-red-500': variant === 'outline',
    },
    className // Allow additional class names to be added
  );

  return <span className={styles}>{children}</span>;
};
