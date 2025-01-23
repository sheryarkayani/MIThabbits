export interface Habit {
  id: string;
  name: string;
  goal: string;
  unit: string;
  entries: Record<string, string>;
  streak: number;
  chunks?: number;
}

export interface HabitState {
  isHabitCompleted: boolean;
  isLoading: boolean;
} 