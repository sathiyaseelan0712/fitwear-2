import React from 'react';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-3',
    large: 'h-12 w-12 border-4'
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div
        className={`rounded-full border-t-transparent border-blue-700 animate-spin ${sizeClasses[size]} ${className}`}
      />
    </div>
  );
};

export default Spinner;