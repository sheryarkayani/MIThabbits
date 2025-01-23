import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
import { Habit } from '../types';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mit-tracker';

let isConnected = false;

const habitSchema = new Schema<Habit>({
  name: { type: String, required: true },
  goal: { type: String, required: true },
  unit: { type: String, required: true },
  entries: { type: Map, of: String, default: new Map() },
  streak: { type: Number, default: 0 },
  chunks: { type: Number, required: false }
});

export const HabitModel = mongoose.models.Habit || mongoose.model<Habit>('Habit', habitSchema);

export const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    isConnected = false;
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export const checkConnection = () => {
  return {
    isConnected,
    readyState: mongoose.connection.readyState
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  };
};

// Add a new function to initialize the database with default habits if empty
export const initializeDefaultHabits = async (defaultHabits: Habit[]) => {
  try {
    const count = await HabitModel.countDocuments();
    if (count === 0) {
      await HabitModel.insertMany(
        defaultHabits.map(habit => ({
          ...habit,
          entries: new Map(Object.entries(habit.entries))
        }))
      );
      console.log('Default habits initialized');
    }
  } catch (error) {
    console.error('Error initializing default habits:', error);
  }
}; 