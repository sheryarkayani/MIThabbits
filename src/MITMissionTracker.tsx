import { useState, useEffect } from "react";
import { fetchHabits, updateHabit } from './habitService';
import { Habit } from './types';
import { useToast } from './components/ui/use-toast';
import { connectDB, initializeDefaultHabits } from './db/mongoClient';
import { initialHabits } from './data';

const isHabitCompleted = (habit: Habit, date: string, value?: string): boolean => {
  const checkValue = value !== undefined ? value : habit.entries[date];
  return Boolean(checkValue);
};

export default function MITMissionTracker() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const initializeDB = async () => {
      try {
        setIsLoading(true);
        await connectDB();
        await initializeDefaultHabits(initialHabits);
        const data = await fetchHabits();
        setHabits(data);
      } catch (error) {
        console.error('Error initializing database:', error);
        toast({
          title: "Database Error",
          description: "Failed to connect to database. Please try again later.",
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeDB();
  }, [toast]);

  const updateHabitProgress = async (habitIndex: number, date: string, value: string) => {
    try {
      const updatedHabits = [...habits];
      const habit = { ...updatedHabits[habitIndex] };
      const prevValue = habit.entries[date];
      
      // Update entries
      habit.entries = {
        ...habit.entries,
        [date]: value
      };

      // Update streak
      if (value && !prevValue) {
        habit.streak++;
      } else if (!value && prevValue) {
        habit.streak = Math.max(0, habit.streak - 1);
      }

      // Save to database
      const updatedHabit = await updateHabit(habit);
      if (updatedHabit) {
        updatedHabits[habitIndex] = updatedHabit;
        setHabits(updatedHabits);
        
        toast({
          title: "Success",
          description: "Habit progress updated successfully",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error updating habit:', error);
      toast({
        title: "Error",
        description: "Failed to update habit. Please try again.",
        duration: 5000,
      });
    }
  };

  const saveHabits = async () => {
    for (const habit of habits) {
      await updateHabit(habit);
    }
    toast({
      title: "Habits Saved!",
      description: "All habit changes have been saved successfully.",
      duration: 3000,
    });
  };

  return (
    <div className="p-4">
      {habits.map((habit) => (
        <div key={habit.id} className="mb-4 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold">{habit.name}</h3>
          <div className="mt-2">
            <input
              type="text"
              className="border rounded px-2 py-1"
              onChange={(e) => updateHabitProgress(
                habits.indexOf(habit),
                new Date().toISOString().split('T')[0],
                e.target.value
              )}
              value={habit.entries[new Date().toISOString().split('T')[0]] || ''}
            />
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Streak: {habit.streak} days
          </div>
          <div className="mt-1 text-sm text-gray-500">
            Goal: {habit.goal} {habit.unit}
          </div>
        </div>
      ))}
      <button
        onClick={saveHabits}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Habits
      </button>
    </div>
  );
}