"use client";

import React, { useState } from "react";

export default function IframeEmbed({
  src,
  title,
  iconImage,
  buttonText = "Play the game",
}) {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleButtonClick = () => {
    setIsIframeLoaded(true);
  };

  return (
    <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900">
      {isIframeLoaded ? (
        <iframe
          allowFullScreen
          className="w-full h-full rounded-2xl"
          src={src}
          title={title}
        />
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full p-4">
          <div
            className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden shadow-lg animate-pulse hover:animate-none transition-all duration-300 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              alt={title}
              className="w-full h-full object-cover"
              src={iconImage}
            />
            {isHovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white font-semibold text-lg md:text-xl lg:text-2xl">
                {title}
              </div>
            )}
          </div>

          <button
            className="mt-6 px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-full text-lg md:text-xl font-bold shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={handleButtonClick}
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
}
