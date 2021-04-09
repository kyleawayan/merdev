import React from "react";

interface DownArrowProps {
  onClick?: () => void;
  width?: number;
  height?: number;
}

export default function DownArrow({ onClick, width, height }: DownArrowProps) {
  return (
    <svg
      width={width ? `${width}px` : "24"}
      height={height ? `${height}px` : "15"}
      viewBox="0 0 24 15"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path d="M12 15L0.741669 0L23.2583 0L12 15Z" fill="#C4C4C4" />
    </svg>
  );
}
