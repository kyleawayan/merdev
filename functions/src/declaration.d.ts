interface Votes {
  state?: number;
}

interface QuestionCounters {
  votes: number;
  answers: number;
  views: number;
}

interface Question {
  title: string;
  tags: Array<string>;
  userUid: string;
  displayName: string;
  timestamp: Date; // idk if it's actually a date type in firestore admin
  markdown: string;
  counters: QuestionCounters;
  id: string;
}

interface Answer {
  userUid: string;
  displayName: string;
  markdown: string;
  timestamp: Date; // idk if it's actually a date type in firestore admin
  comments: Array<Comment>;
}
