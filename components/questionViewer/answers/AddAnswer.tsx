import React, { useState } from "react";
import YourAnswer from "./YourAnswer";

interface AddAnswerProps {
  questionId: string;
}

export default function AddAnswer({ questionId }: AddAnswerProps) {
  const [editorOpen, setEditorOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setEditorOpen(!editorOpen)}
        style={{ marginBottom: "20px" }}
      >
        Post an answer
      </button>
      {editorOpen && (
        <YourAnswer
          questionId={questionId}
          submitted={() => setEditorOpen(false)}
        />
      )}
    </div>
  );
}
