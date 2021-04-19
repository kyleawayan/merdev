interface Votes {
  state?: number;
}

interface QuestionCounters {
  votes: number;
  answers: number;
  views: number;
}

interface Author {
  displayName: string;
  userUid: string;
}

interface CommentOrAnswerCounters {
  votes: number;
}

interface Question {
  title: string;
  tags: Array<string>;
  author: Author;
  timestamp: Date; // idk if it's actually a date type in firestore admin
  markdown: string;
  counters: QuestionCounters;
  id: string;
  solved: boolean;
}

interface Answer {
  author: Author;
  markdown: string;
  timestamp: Date; // idk if it's actually a date type in firestore admin
  comments: Array<Comment>;
  marked: boolean;
  counters: CommentOrAnswerCounters;
}

interface QuestionOrAnswerComment {
  author: Author;
  markdown: string;
  timestamp: Date; // idk if it's actually a date type in firestore admin
  counters: CommentOrAnswerCounters;
  id: string;
}
