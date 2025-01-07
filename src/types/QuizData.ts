export interface Answer {
  questionId: string;
  selectedOption: string;
  correctOption: string;
  isCorrect: boolean;
}

export interface QuizResult {
  userId: string;
  quizId: string;
  scorePercentage: number;
  totalQuestions: number;
  answers: Answer[];
}

export interface ResultProps {
  totalQuestions: number;
  attemptedQuestions: number;
  score: number;
  quizResults: Answer[];
}
