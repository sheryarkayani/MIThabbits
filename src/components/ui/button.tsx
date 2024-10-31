// src/components/ui/button.tsx
import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  className = '',
  children,
  ...props
}) => {
  const styles = classNames(
    'px-4 py-2 rounded-md font-medium focus:outline-none',
    {
      'bg-red-500 text-white hover:bg-red-600': variant === 'default',
      'bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white':
        variant === 'outline',
    },
    className
  );
  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
};
