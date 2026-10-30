export type QuestionTopic =
  | 'legislation'
  | 'defensive_driving'
  | 'first_aid'
  | 'citizenship_environment'
  | 'mechanics'
  | 'signs';

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  topic: QuestionTopic;
  text: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
  signId?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  icon: string;
  questions: Question[];
  xpReward: number;
}

export interface Unit {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  color: string;
  lessons: Lesson[];
}

export interface TrafficSign {
  id: string;
  code: string;
  name: string;
  category: 'regulamentacao' | 'advertencia' | 'indicacao';
  description: string;
  pointsToRemember: string;
}

export interface SimuladoResult {
  id: string;
  date: string;
  score: number;
  total: number;
  passed: boolean;
  timeSpentSeconds: number;
  answers: {
    questionId: string;
    selectedOptionId: string;
    isCorrect: boolean;
  }[];
}

export interface UserProfile {
  name: string;
  email: string;
  isLoggedIn: boolean;
  streak: number;
  hearts: number;
  maxHearts: number;
  xp: number;
  completedLessons: string[];
  simuladosHistory: SimuladoResult[];
  soundEnabled: boolean;
}
