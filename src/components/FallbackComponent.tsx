import React from "react";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="bg-blue-50 text-blue-600 h-screen flex flex-col justify-center items-center text-center p-5">
      <h1 className="text-blue-600 mb-4">Something went wrong</h1>
      <p className="text-blue-600 mb-6">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="bg-blue-600 text-blue-100 border-none px-5 py-2.5 rounded-lg cursor-pointer font-bold text-base hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorFallback;
