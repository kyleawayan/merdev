import React from "react";

interface CheckmarkProps {
  width: number;
  height?: number;
  filled?: boolean;
}

export default function Checkmark({ width, height, filled }: CheckmarkProps) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      viewBox="0 0 16 16"
    >
      {!filled && (
        <path
          fill="var(--arrow-unhighlighted)"
          d="M6.21 14.339l-6.217-6.119 3.084-3.035 3.133 3.083 6.713-6.607 3.084 3.035-9.797 9.643zM1.686 8.22l4.524 4.453 8.104-7.976-1.391-1.369-6.713 6.607-3.133-3.083-1.391 1.369z"
        ></path>
      )}
      {filled && (
        <path
          fill="var(--green)"
          d="M13.5 2l-7.5 7.5-3.5-3.5-2.5 2.5 6 6 10-10z"
        ></path>
      )}
    </svg>
  );
}
