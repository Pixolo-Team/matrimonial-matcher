import React from "react";

interface FullPageLoaderProps {
  isLoading: boolean;
  text?: string;
}

const FullPageLoader: React.FC<FullPageLoaderProps> = ({
  isLoading,
  text = "Loading profiles...",
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      {/* Loading Spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin"></div>
        <div
          className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-yellow-400 rounded-full animate-spin"
          style={{ animationDelay: "0.1s" }}
        ></div>
      </div>

      {/* Loading Text */}
      <div className="mt-6 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Loading Matches
        </h2>
        <p className="text-gray-600">{text}</p>
      </div>

      {/* Decorative Elements */}
      <div className="mt-8 flex gap-2">
        <div
          className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    </div>
  );
};

export default FullPageLoader;
