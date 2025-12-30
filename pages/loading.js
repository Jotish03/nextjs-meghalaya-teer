import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 w-full h-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#99e4af] to-[#6eb591] z-[9999] overflow-hidden">
      <div className="text-center px-4 w-full max-w-md">
        {/* Animated Logo */}
        <div className="mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 relative">
            <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-white border-b-transparent rounded-full animate-spin animate-reverse"></div>
            <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
              {/* Removed MT initial */}
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Morning Sunday Teer
        </h2>
        <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base">
          Loading results...
        </p>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
