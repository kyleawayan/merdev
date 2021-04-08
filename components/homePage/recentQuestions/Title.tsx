import React from "react";
import Tags from "./Tags";

interface TitleProps {
  title: string;
  tags: Array<string>;
}

export default function Title({ title, tags }: TitleProps) {
  return (
    <div
      style={{
        fontSize: "18px",
        fontWeight: 600,
        margin: "6px",
      }}
    >
      {title}
      <Tags tags={tags} />
    </div>
  );
}
