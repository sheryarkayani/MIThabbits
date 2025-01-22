import { HabitModel } from './db/mongoClient';
import { Habit } from './types';

// Fetch all habits from MongoDB
export const fetchHabits = async (): Promise<Habit[]> => {
  try {
    const habits = await HabitModel.find();
    return habits.map(habit => ({
      id: habit.id,
      name: habit.name,
      goal: habit.goal,
      unit: habit.unit,
      entries: Object.fromEntries(habit.entries),
      streak: habit.streak,
      chunks: habit.chunks
    }));
  } catch (error) {
    console.error('Error fetching habits:', error);
    return [];
  }
};

// Add a new habit to MongoDB
export const addHabit = async (habit: Habit) => {
  try {
    const newHabit = new HabitModel({
      ...habit,
      entries: new Map(Object.entries(habit.entries))
    });
    const savedHabit = await newHabit.save();
    return savedHabit;
  } catch (error) {
    console.error('Error adding habit:', error);
    return null;
  }
};

// Update habit in MongoDB
export const updateHabit = async (habit: Habit) => {
  try {
    const updatedHabit = await HabitModel.findOneAndUpdate(
      { id: habit.id },
      {
        ...habit,
        entries: new Map(Object.entries(habit.entries))
      },
      { new: true }
    );
    return updatedHabit;
  } catch (error) {
    console.error('Error updating habit:', error);
    return null;
  }
};

// Delete habit from MongoDB
export const deleteHabit = async (id: string) => {
  try {
    await HabitModel.deleteOne({ id });
  } catch (error) {
    console.error('Error deleting habit:', error);
  }
};