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

interface QuestionFromRestApi {
  solved: {
    booleanValue: boolean;
  };
  author: {
    mapValue: {
      fields: {
        userUid: {
          stringValue: string;
        };
        displayName: {
          stringValue: string;
        };
      };
    };
  };
  markdown: {
    stringValue: string;
  };
  title: {
    stringValue: string;
  };
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
