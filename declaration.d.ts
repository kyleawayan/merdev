interface QuestionCounters {
  votes: number;
  answers: number;
  views: number;
}

interface Question {
  title: string;
  tags: Array<string>;
  userUid: string;
  timestamp: Date;
  markdown: string;
  counters: QuestionCounters;
}
