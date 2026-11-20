import React, { forwardRef } from 'react';

const Input = forwardRef(function Input({ label, className = '', error, ...props }, ref) {
  return (
    <div className={`mb-3 ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        ref={ref}
        className={`input-field ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
        {...props}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
});

export { Input };