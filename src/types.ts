export interface Habit {
  id: string;
  name: string;
  goal: string;
  unit: string;
  entries: { [date: string]: string };
  streak: number;
  chunks?: number;
}