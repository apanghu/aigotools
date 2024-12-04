import React from "react";

import IframeEmbed from "./Iframe"; // 确保这些组件路径正确
import RufflePlayer from "./RufflePlayer";

import { Site } from "@/models/site";
function GameComponent({ gametype, site }: { gametype: string; site: Site }) {
  // 动态渲染游戏内容
  const renderGame = () => {
    switch (gametype) {
      case "iframe":
      case "preloader":
        return (
          <IframeEmbed
            buttonText="Play the game"
            iconImage={site.descriptionIcon}
            src={site.url}
            title={site.name}
          />
        );
      case "swf":
        return <RufflePlayer height={600} src={site.url} width={800} />;
      default:
        return <p>Unsupported game type</p>;
    }
  };

  return (
    <div className="mt-10">
      {renderGame()}
      <p className="mt-4 text-center text-sm sm:hidden">
        Tap on the picture above to launch the game.
      </p>
    </div>
  );
}

export default GameComponent;
