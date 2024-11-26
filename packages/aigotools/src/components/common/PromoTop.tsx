"use client";

import { useRef } from "react";
import Image from "next/image";

import { Site } from "@/models/site";
import Container from "@/components/common/container";
import { useRouter } from "@/navigation";
interface ArrowProps {
  direction: "left" | "right";
  onClick: () => void;
}

const Arrow = ({ direction, onClick }: ArrowProps) => (
  <div
    aria-label={`Scroll ${direction}`}
    className={`absolute top-1/2 transform -translate-y-1/2 z-10 cursor-pointer ${
      direction === "left" ? "left-2" : "right-2"
    }`}
    onClick={onClick}
  >
    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-b from-gray-100 to-gray-200 shadow-md hover:from-gray-300 hover:to-gray-400 transition-all">
      <span className="text-gray-700 font-bold text-lg">
        {direction === "left" ? "‹" : "›"}
      </span>
    </div>
  </div>
);

export default function PromoTop({ sites }: { sites: Array<Site> }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300, // 向左滚动
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300, // 向右滚动
        behavior: "smooth",
      });
    }
  };

  return (
    <Container className="mt-10 sm:mt-16" id="PromoTop">
      <div className="relative">
        <Arrow direction="left" onClick={scrollLeft} />

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scroll-smooth pb-4 pt-2 no-scrollbar"
        >
          <div className="flex space-x-4">
            {sites && sites.length > 0 ? (
              sites.map((item) => (
                <div
                  key={item._id}
                  className="flex-none w-28 relative group cursor-pointer"
                >
                  <a
                    className="block relative rounded-full"
                    href={item.url}
                    title={item.name}
                    onClick={() => {
                      router.push(`/search?s=${encodeURIComponent(item.name)}`);
                    }}
                  >
                    <Image
                      alt={item.name}
                      className="object-cover rounded-full shadow-none transition-transform duration-300 ease-in-out group-hover:scale-110"
                      height={112}
                      loading="lazy"
                      src={item.descriptionIcon}
                      width={112}
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {item.name}
                      </span>
                    </div>
                  </a>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center w-full">
                No items available
              </div>
            )}
          </div>
        </div>

        <Arrow direction="right" onClick={scrollRight} />
      </div>
    </Container>
  );
}
