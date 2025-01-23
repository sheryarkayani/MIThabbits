import { HabitModel } from './db/mongoClient';
import { Habit } from './types';

// Fetch all habits from MongoDB
export const fetchHabits = async (): Promise<Habit[]> => {
  try {
    const habits = await HabitModel.find().lean();
    return habits.map(habit => ({
      id: habit._id.toString(),
      name: habit.name,
      goal: habit.goal,
      unit: habit.unit,
      entries: habit.entries instanceof Map ? 
        Object.fromEntries(habit.entries) : 
        (habit.entries || {}),
      streak: habit.streak || 0,
      chunks: habit.chunks || undefined
    }));
  } catch (error) {
    console.error('Error fetching habits:', error);
    throw new Error('Failed to fetch habits from database');
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
export const updateHabit = async (habit: Habit): Promise<Habit | null> => {
  try {
    const updatedHabit = await HabitModel.findByIdAndUpdate(
      habit.id,
      {
        $set: {
          name: habit.name,
          goal: habit.goal,
          unit: habit.unit,
          entries: habit.entries,
          streak: habit.streak,
          chunks: habit.chunks
        }
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedHabit) {
      throw new Error('Habit not found');
    }

    return {
      id: updatedHabit._id.toString(),
      name: updatedHabit.name,
      goal: updatedHabit.goal,
      unit: updatedHabit.unit,
      entries: updatedHabit.entries instanceof Map ? 
        Object.fromEntries(updatedHabit.entries) : 
        updatedHabit.entries,
      streak: updatedHabit.streak,
      chunks: updatedHabit.chunks
    };
  } catch (error) {
    console.error('Error updating habit:', error);
    throw new Error('Failed to update habit in database');
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