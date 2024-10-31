import { Habit } from './types';
import { v4 as uuidv4 } from 'uuid';

export const initialHabits: Habit[] = [
  { id: uuidv4(), name: "Study Time", goal: "6", unit: "hours", entries: {}, streak: 0 },
  { id: uuidv4(), name: "Business Activities", goal: "1", unit: "activity", entries: {}, streak: 0 },
  { id: uuidv4(), name: "1 Mile Run", goal: "5:00", unit: "min", entries: {}, streak: 0 },
  { id: uuidv4(), name: "Pushups", goal: "30", unit: "reps", entries: {}, streak: 0 },
  { id: uuidv4(), name: "Memorize Quran Ayas", goal: "1", unit: "ayah", entries: {}, streak: 0 },
  { id: uuidv4(), name: "Daily Prayers", goal: "5", unit: "prayers", entries: {}, streak: 0 },
  { id: uuidv4(), name: "Reading Books", goal: "20", unit: "pages", entries: {}, streak: 0 },
  { id: uuidv4(), name: "Post Reels", goal: "1", unit: "reel", entries: {}, streak: 0 },
  { id: uuidv4(), name: "LinkedIn Posts", goal: "1", unit: "post", entries: {}, streak: 0 },
  { id: uuidv4(), name: "App Development", goal: "1", unit: "task", entries: {}, streak: 0 },
  { id: uuidv4(), name: "Team Meeting", goal: "1", unit: "meeting", entries: {}, streak: 0 },
  { id: uuidv4(), name: "Water Intake", goal: "5", unit: "liters", entries: {}, streak: 0, chunks: 5 },
  { id: uuidv4(), name: "Podcast Creation", goal: "1", unit: "podcast", entries: {}, streak: 0 },
  { id: uuidv4(), name: "Call Grandparents", goal: "1", unit: "call", entries: {}, streak: 0 },
  { id: uuidv4(), name: "Sleep Schedule", goal: "22:00", unit: "PM", entries: {}, streak: 0 },
  { id: uuidv4(), name: "Protein Intake", goal: "180", unit: "grams", entries: {}, streak: 0 }
];


export const motivationalQuotes = [
  "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
  "The best way to predict your future is to create it. - Abraham Lincoln",
  "Hard work beats talent when talent doesn't work hard. - Tim Notke",
  "Dream big and dare to fail. - Norman Vaughan",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "Success is the sum of small efforts, repeated day in and day out. - Robert Collier",
  "Perseverance is not a long race; it's many short races one after the other. - Walter Elliot",
]