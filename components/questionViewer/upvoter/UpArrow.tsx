import React from "react";

interface UpArrowProps {
  onClick?: () => void;
}

export default function UpArrow({ onClick }: UpArrowProps) {
  return (
    <svg
      width="24"
      height="15"
      viewBox="0 0 24 15"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path d="M12 0L23.2583 15H0.74167L12 0Z" fill="#C4C4C4" />
    </svg>
  );
}
