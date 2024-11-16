"use client";

import React, { useState } from "react";

export default function IframeEmbed({
  src,
  title,
  iconImage,
  buttonText = "Play the game",
  width = "800px",
  height = "450px",
}) {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // 控制鼠标悬停状态

  const handleButtonClick = () => {
    setIsIframeLoaded(true);
  };

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.3)",
        background:
          "linear-gradient(135deg, rgba(30, 30, 30, 0.8), rgba(50, 50, 50, 0.8))",
        backdropFilter: "blur(10px)", // 添加模糊效果
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {isIframeLoaded ? (
        <iframe
          allowFullScreen
          frameBorder="0"
          src={src}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "20px",
          }}
          title={title}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            position: "relative",
            backgroundColor: "rgba(30, 30, 30, 0.9)",
            padding: "20px",
            textAlign: "center",
          }}
        >
          {/* 动态 Icon 图片 */}
          <div
            style={{
              width: "200px",
              height: "200px",
              marginBottom: "30px",
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
              animation: "pulse 2s infinite",
              transition: "transform 0.3s ease",
              position: "relative",
              cursor: "pointer",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* 图标图片 */}
            <img
              alt="Game Icon"
              src={iconImage}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            {/* 悬浮显示游戏名称在图标中央 */}
            {isHovered && (
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: "bold",
                  borderRadius: "50%",
                }}
              >
                {title}
              </div>
            )}
          </div>

          {/* Play the game 按钮 */}
          <button
            style={{
              padding: "15px 40px",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#fff",
              background: "linear-gradient(to right, #6a11cb, #2575fc)",
              border: "none",
              borderRadius: "30px",
              cursor: "pointer",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
            onClick={handleButtonClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 12px 24px rgba(0, 0, 0, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.4)";
            }}
          >
            {buttonText}
          </button>
        </div>
      )}

      {/* 动画样式 */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
}
