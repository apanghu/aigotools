"use client";

import React, { useState, useRef } from "react";

export default function IframeEmbed({
  src,
  title,
  iconImage,
  buttonText = "Play the game",
}: {
  src: string;
  title: string;
  iconImage: string;
  buttonText?: string;
}) {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleContainerClick = () => {
    if (window.innerWidth < 640) {
      // For mobile, open the game in a new window directly
      window.open(src, "_blank");
    } else {
      setIsIframeLoaded(true);
    }
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    } else {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${
        isFullscreen ? "w-screen h-screen" : "max-w-5xl"
      } aspect-video rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 ${
        isFullscreen ? "fixed inset-0 z-50" : ""
      }`}
      onClick={handleContainerClick}
    >
      {/* Only show iframe on larger screens */}
      {isIframeLoaded ? (
        <iframe
          allowFullScreen
          className="w-full h-full rounded-2xl"
          src={src}
          title={title}
        />
      ) : (
        <div className="hidden sm:flex flex-col items-center justify-center w-full h-full p-4 cursor-pointer">
          <div
            className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden shadow-lg animate-pulse hover:animate-none transition-all duration-300"
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
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering `handleContainerClick`
              setIsIframeLoaded(true);
            }}
          >
            {buttonText}
          </button>
        </div>
      )}

      {/* Fullscreen Button: Hidden on small screens */}
      {/* <button
        className="absolute bottom-4 right-4 px-4 py-2 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-600 text-sm md:text-base font-medium transition-all focus:outline-none focus:ring-4 focus:ring-gray-400 hidden sm:block"
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering `handleContainerClick`
          toggleFullscreen();
        }}
      >
        {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
      </button> */}
    </div>
  );
}
