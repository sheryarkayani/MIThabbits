export interface Habit {
  id: string;
  name: string;
  goal: string;
  unit: string;
  entries: { [key: string]: string };
  streak: number;
  chunks?: number | undefined;
}