interface QuestionCounters {
  votes: number;
  answers: number;
  views: number;
}

interface CommentOrAnswerCounters {
  votes: number;
}

interface Author {
  displayName: string;
  userUid: string;
}

interface Comment {
  author: Author;
  markdown: string;
  timestamp: FirestoreDate;
}

interface Answer {
  author: Author;
  markdown: string;
  timestamp: FirestoreDate;
  comments: Array<Comment>;
  marked: boolean;
}

interface FirestoreDate {
  toDate(): Date;
}

interface Question {
  title: string;
  tags: Array<string>;
  author: Author;
  timestamp: FirestoreDate;
  markdown: string;
  counters: QuestionCounters;
  id: string;
  solved: boolean;
}

interface QuestionFromRESTAPI {
  solved: Solved;
  markdown: Markdown;
  author: Author;
  timestamp: Timestamp;
  tags: Tags;
  title: Markdown;
  counters: Counters;
}

interface Author {
  mapValue: AuthorMapValue;
}

interface AuthorMapValue {
  fields: PurpleFields;
}

interface PurpleFields {
  displayName: Markdown;
  userUid: Markdown;
}

interface Markdown {
  stringValue: string;
}

interface Counters {
  mapValue: CountersMapValue;
}

interface CountersMapValue {
  fields: FluffyFields;
}

interface FluffyFields {
  views: Answers;
  votes: Answers;
  answers: Answers;
}

interface Answers {
  integerValue: string;
}

interface Solved {
  booleanValue: boolean;
}

interface Tags {
  arrayValue: ArrayValue;
}

interface ArrayValue {
  values: Markdown[];
}

interface Timestamp {
  timestampValue: Date;
}

interface QuestionOrAnswerComment {
  author: Author;
  markdown: string;
  timestamp: FirestoreDate;
  counters: CommentOrAnswerCounters;
  id: string;
}

interface Answer {
  id: string;
  author: Author;
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
