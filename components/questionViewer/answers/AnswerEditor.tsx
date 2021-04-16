import React from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import math from "remark-math";
import { InlineMath, BlockMath } from "react-katex";

const renderers = {
  code: ({ language, value }: codeRendererProps) => {
    return (
      <SyntaxHighlighter
        style={materialDark}
        language={language ?? ""} // if language is undefined, just make it a blank string
        children={value ?? ""} // if value is undefined, just make it a blank string
      />
    );
  },
  inlineMath: ({ value }: inlineMapRendererProps) => (
    <InlineMath math={value} />
  ),
  math: ({ value }: mathRendererProps) => <BlockMath math={value} />,
};

interface AnswerEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AnswerEditor({ value, onChange }: AnswerEditorProps) {
  return (
    <div>
      <ReactMde
        value={value}
        onChange={onChange}
        minEditorHeight={150}
        maxEditorHeight={150}
        selectedTab={"write"}
        onTabChange={() => console.log()}
      />
      <ReactMarkdown plugins={[math]} renderers={renderers}>
        {value}
      </ReactMarkdown>
    </div>
  );
}
