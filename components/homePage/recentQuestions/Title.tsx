import Link from "next/link";
import React from "react";
import Tags from "./Tags";

interface TitleProps {
  title: string;
  tags: Array<string>;
  id: string;
}

export default function Title({ title, tags, id }: TitleProps) {
  return (
    <div
      style={{
        fontSize: "18px",
        fontWeight: 600,
      }}
    >
      <Link href={`/question/${id}`}>{title}</Link>
      <Tags tags={tags} />
    </div>
  );
}
