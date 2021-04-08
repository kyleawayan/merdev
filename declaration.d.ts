interface QuestionCounters {
  votes: number;
  answers: number;
  views: number;
}

interface Comment {
  userUid: string;
  markdown: string;
  timestamp: any; // firestore date type, idk what it is exactly
}

interface Answer {
  userUid: string;
  markdown: string;
  timestamp: any; // firestore date type, idk what it is exactly
  comments: Array<Comment>;
}

interface Question {
  title: string;
  tags: Array<string>;
  userUid: string;
  timestamp: any; // firestore date type, idk what it is exactly
  markdown: string;
  counters: QuestionCounters;
}

interface codeRendererProps {
  language: string;
  value: string;
}

interface inlineMapRendererProps {
  value: string;
}

interface mathRendererProps {
  value: string;
}

declare module "react-katex";
