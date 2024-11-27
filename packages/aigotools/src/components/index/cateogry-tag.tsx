import clsx from "clsx";
import { ReactNode } from "react";

export default function CategoryTag({
  children,
  onClick,
  active,
  className,
  size = "medium",
  theme = "blue",
}: {
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  size?: "small" | "medium" | "large";
  theme?: "blue" | "red" | "green" | "gray";
}) {
  const baseStyles =
    "inline-block rounded text-sm font-medium cursor-pointer transition-transform duration-150 active:scale-95";
  const sizeStyles = {
    small: "px-2 py-1 text-xs",
    medium: "px-3 py-1.5 text-sm",
    large: "px-4 py-2 text-base",
  };
  const themeStyles = {
    blue: "bg-blue-500 text-white hover:bg-blue-700",
    red: "bg-red-500 text-white hover:bg-red-700",
    green: "bg-green-500 text-white hover:bg-green-700",
    gray: "bg-gray-500 text-white hover:bg-gray-700",
  };

  return (
    <span
      className={clsx(
        baseStyles,
        sizeStyles[size],
        themeStyles[theme],
        {
          "!bg-blue-700": active && theme === "blue",
          "!bg-red-700": active && theme === "red",
          "!bg-green-700": active && theme === "green",
          "!bg-gray-700": active && theme === "gray",
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
