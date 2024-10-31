// src/components/ui/tabs.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import classNames from 'classnames';

interface TabsProps {
  children: ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

interface TabsContextProps {
  value: string;
  setValue: (value: string) => void;
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

export const Tabs: React.FC<TabsProps> = ({ children, value, onValueChange }) => {
  const [internalValue, setInternalValue] = useState<string>(value || '');

  const setValue = (newValue: string) => {
    setInternalValue(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  return (
    <TabsContext.Provider value={{ value: internalValue, setValue }}>
      <div className="tabs-container">{children}</div>
    </TabsContext.Provider>
  );
};

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
  return <div className={classNames('flex space-x-2', className)}>{children}</div>;
};

interface TabsTriggerProps {
  children: ReactNode;
  value: string;
  className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ children, value, className }) => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('TabsTrigger must be used within Tabs');
  }

  const { value: selectedValue, setValue } = context;
  const isActive = selectedValue === value;

  return (
    <button
      className={classNames(
        'px-4 py-2 text-sm font-medium rounded-md focus:outline-none',
        {
          'bg-red-500 text-white': isActive,
          'bg-gray-700 text-gray-300 hover:bg-gray-600': !isActive,
        },
        className
      )}
      onClick={() => setValue(value)}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  children: ReactNode;
  value: string;
  className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ children, value, className }) => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('TabsContent must be used within Tabs');
  }

  const { value: selectedValue } = context;
  if (selectedValue !== value) return null;

  return <div className={classNames('mt-4', className)}>{children}</div>;
};
