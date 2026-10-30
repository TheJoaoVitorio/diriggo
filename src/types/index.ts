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

export interface TheorySlide {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  bullets?: string[];
  signId?: string;
  badge?: string;
  tip?: string;
  stat?: {
    value: string;
    label: string;
  };
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  icon: string;
  theorySlides?: TheorySlide[];
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
  cnhPoints: number;
  maxCnhPoints: number;
  xp: number;
  completedLessons: string[];
  simuladosHistory: SimuladoResult[];
  soundEnabled: boolean;
  darkMode: boolean;
}
