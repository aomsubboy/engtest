export type QuizCategory = 'Reading' | 'Listening';
export type ReadingSubCategory = 'Grammar' | 'Vocab' | 'Conversation' | 'Story';
export type ListeningSubCategory = 'Short Conversation' | 'Long Conversation';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
  audioUrl?: string; // For listening
  passage?: string; // For reading comprehension (Story)
}

export interface QuizSession {
  category: QuizCategory;
  subCategory: ReadingSubCategory | ListeningSubCategory;
  questions: Question[];
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  lastReviewed?: number;
}
