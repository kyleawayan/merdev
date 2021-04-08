import React from "react";
import IndividualTag from "./IndividualTag";

interface TagsProps {
  tags: Array<string>;
}

export default function Tags({ tags }: TagsProps) {
  return (
    <div>
      {tags.map(
        (tag: string) => (
          <IndividualTag tag={tag} />
        ) // add keys
      )}
    </div>
  );
}
