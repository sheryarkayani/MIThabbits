import { supabase } from './supabaseClient';
import { Habit } from './types';

// Fetch all habits from Supabase
export const fetchHabits = async (): Promise<Habit[]> => {
  const { data, error } = await supabase.from('habits').select('*');
  if (error) {
    console.error('Error fetching habits:', error.message);
    return [];
  }
  return data;
};

// Add a new habit to Supabase
export const addHabit = async (habit: Habit) => {
  const { data, error } = await supabase.from('habits').insert([habit]);
  if (error) {
    console.error('Error adding habit:', error.message);
    return null;
  }
  return data;
};

// Update habit in Supabase
export const updateHabit = async (habit: Habit) => {
  const { data, error } = await supabase
    .from('habits')
    .update(habit)
    .eq('id', habit.id);
  if (error) {
    console.error('Error updating habit:', error.message);
  }
  return data;
};

// Delete habit from Supabase
export const deleteHabit = async (id: string) => {
  const { error } = await supabase.from('habits').delete().eq('id', id);
  if (error) {
    console.error('Error deleting habit:', error.message);
  }
};