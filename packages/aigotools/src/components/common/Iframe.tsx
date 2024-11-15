"use client"; // Add this to mark the component as a Client Component

import React, { useState } from "react";

export default function IframeEmbed({
  src,
  title,
  width = "100%",
  height = "500px",
  overlayImage, // 遮罩层图片 URL
  buttonText, // 按钮文本
}) {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false); // 控制 iframe 是否加载

  // 按钮点击事件，开始加载 iframe
  const handleButtonClick = () => {
    setIsIframeLoaded(true);
  };

  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "56.25%", // 保持宽高比
        height: "0",
        overflow: "hidden",
      }}
    >
      {/* 如果 isIframeLoaded 为 true，则加载 iframe */}
      {isIframeLoaded && (
        <iframe
          allowFullScreen
          frameBorder="0"
          height={height}
          src={src}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          }}
          title={title}
          width={width}
        />
      )}

      {/* 遮罩层 */}
      {overlayImage && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // 确保遮罩在中心
            width: "150px", // 圆形遮罩的宽度
            height: "150px", // 圆形遮罩的高度
            borderRadius: "50%", // 圆形遮罩
            backgroundImage: `url(${overlayImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 1, // 确保遮罩层覆盖在 iframe 之上
          }}
        >
          {/* 按钮 */}
          {buttonText && (
            <button
              style={{
                position: "absolute",
                bottom: "-40px", // 按钮位于圆形遮罩下方
                left: "50%",
                transform: "translateX(-50%)", // 水平居中按钮
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
              onClick={handleButtonClick}
            >
              {buttonText}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
