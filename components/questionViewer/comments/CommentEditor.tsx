import React from "react";
import ReactMde from "react-mde";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CommentEditor({
  value,
  onChange,
}: MarkdownEditorProps) {
  return (
    <ReactMde
      value={value}
      onChange={onChange}
      minEditorHeight={100}
      maxEditorHeight={100}
      selectedTab={"write"}
      toolbarCommands={[
        ["bold", "italic"],
        ["link", "code"],
      ]}
    />
  );
}
