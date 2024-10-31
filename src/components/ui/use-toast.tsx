import { toast as hotToast, Toaster } from 'react-hot-toast';
import React from 'react';

interface ToastProps {
  title: string;
  description?: string;
  duration?: number;
  icon?: React.ReactNode;
}

export const useToast = () => {
  const toast = ({
    title,
    description,
    duration = 5000,
    icon,
  }: ToastProps) => {
    hotToast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              {icon && <div className="flex-shrink-0 pt-0.5">{icon}</div>}
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">{title}</p>
                {description && (
                  <p className="mt-1 text-sm text-gray-300">{description}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-700">
            <button
              onClick={() => hotToast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-500 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Close
            </button>
          </div>
        </div>
      ),
      { duration }
    );
  };

  return { toast };
};

// Export the Toaster component
export { Toaster };
