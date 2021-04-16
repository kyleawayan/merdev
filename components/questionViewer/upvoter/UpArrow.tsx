import React from "react";

interface UpArrowProps {
  onClick?: () => void;
  width?: number;
  height?: number;
  highlighted: boolean;
}

export default function UpArrow({
  onClick,
  width,
  height,
  highlighted,
}: UpArrowProps) {
  return (
    <svg
      width={width ? `${width}px` : "24"}
      height={height ? `${height}px` : "15"}
      viewBox="0 0 24 15"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M12 0L23.2583 15H0.74167L12 0Z"
        fill={highlighted ? "var(--orange)" : "var(--arrow-unhighlighted)"}
      />
    </svg>
  );
}
