import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mit-tracker';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Create Habit Schema
const habitSchema = new mongoose.Schema({
  id: String,
  name: String,
  goal: String,
  unit: String,
  entries: {
    type: Map,
    of: String
  },
  streak: Number,
  chunks: Number
});

export const HabitModel = mongoose.model('Habit', habitSchema); 