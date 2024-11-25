import { useEffect } from "react";

const RufflePlayer = ({ src, width = 800, height = 600 }) => {
  useEffect(() => {
    // 检查是否已经加载 Ruffle 脚本
    if (!window.RufflePlayer) {
      const script = document.createElement("script");

      script.src = "https://unpkg.com/@ruffle-rs/ruffle"; // 替换为正确的 CDN 地址
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log("Ruffle loaded successfully.");
      };
    }

    // 当 Ruffle 脚本加载完成后初始化播放器
    const initializeRuffle = () => {
      const ruffle =
        window.RufflePlayer?.newest() || window.RufflePlayer?.core();

      if (ruffle) {
        const flashObject = document.querySelector(".ruffle-flash");

        if (flashObject) {
          ruffle.createPlayer(flashObject);
        }
      }
    };

    initializeRuffle();
  }, []);

  return (
    <div
      className="ruffle-flash"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        border: "1px solid #ccc",
      }}
    >
      <object
        data={src}
        height={height}
        type="application/x-shockwave-flash"
        width={width}
      >
        <param name="movie" value={src} />
      </object>
    </div>
  );
};

export default RufflePlayer;
