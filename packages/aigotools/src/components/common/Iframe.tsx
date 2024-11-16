"use client"; // 声明为 Client Component

import React, { useState } from "react";

export default function IframeEmbed({
  src,
  title,
  iconImage, // Icon 图片的 URL
  buttonText = "Play the game", // 按钮文本
  width = "800px",
  height = "450px",
}) {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false); // 控制 iframe 是否加载

  // 按钮点击事件，开始加载 iframe
  const handleButtonClick = () => {
    setIsIframeLoaded(true);
  };

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#f0f0f0",
      }}
    >
      {/* 如果 isIframeLoaded 为 true，则加载 iframe */}
      {isIframeLoaded ? (
        <iframe
          allowFullScreen
          frameBorder="0"
          src={src}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
          }}
          title={title}
        />
      ) : (
        // 初始展示状态
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            position: "relative",
            backgroundColor: "#1e1e1e",
          }}
        >
          {/* Icon 图片 */}
          {iconImage && (
            <img
              alt="Game Icon"
              src={iconImage}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            />
          )}

          {/* Play the game 按钮 */}
          <button
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#007bff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              transition: "all 0.3s ease",
            }}
            onClick={handleButtonClick}
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
}
