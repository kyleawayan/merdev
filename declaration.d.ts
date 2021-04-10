interface QuestionCounters {
  votes: number;
  answers: number;
  views: number;
}

interface CommentOrAnswerCounters {
  votes: number;
}

interface Comment {
  userUid: string;
  displayName: string;
  markdown: string;
  timestamp: FirestoreDate;
}

interface Answer {
  userUid: string;
  displayName: string;
  markdown: string;
  timestamp: FirestoreDate;
  comments: Array<Comment>;
}

interface FirestoreDate {
  toDate(): Date;
}

interface Question {
  title: string;
  tags: Array<string>;
  userUid: string;
  displayName: string;
  timestamp: FirestoreDate;
  markdown: string;
  counters: QuestionCounters;
  id: string;
}

interface QuestionOrAnswerComment {
  userUid: string;
  displayName: string;
  markdown: string;
  timestamp: FirestoreDate;
  counters: CommentOrAnswerCounters;
  id: string;
}

interface Answer {
  id: string;
  userUid: string;
  displayName: string;
  markdown: string;
  timestamp: FirestoreDate;
  counters: CommentOrAnswerCounters;
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
