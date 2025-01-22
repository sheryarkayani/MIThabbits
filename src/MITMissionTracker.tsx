import { useState, useEffect } from "react";
import { fetchHabits, updateHabit } from './habitService';
import { Habit } from './types';
import { useToast } from '../src/components/ui/use-toast';
import { connectDB, checkConnection } from './db/mongoClient';

const isHabitCompleted = (habit: Habit, date: string, value?: string): boolean => {
  const checkValue = value !== undefined ? value : habit.entries[date];
  return Boolean(checkValue);
};

export default function MITMissionTracker() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [currentDate] = useState(new Date());
  const [dbStatus, setDbStatus] = useState({ isConnected: false, error: null });
  const { toast } = useToast();

  useEffect(() => {
    const initDB = async () => {
      try {
        await connectDB();
        const connection = checkConnection();
        setDbStatus({ isConnected: connection.isConnected, error: null });
        
        // Only fetch habits if connected
        if (connection.isConnected) {
          const data = await fetchHabits();
          setHabits(data);
        }
      } catch (error) {
        console.error('Database connection error:', error);
        setDbStatus({ isConnected: false, error: error as Error });
        toast({
          title: "Database Connection Error",
          description: "Failed to connect to the database. Please try again later.",
          duration: 5000,
        });
      }
    };

    initDB();
  }, [toast]);

  // Add connection status display
  if (dbStatus.error) {
    return (
      <div className="p-4 text-center">
        <div className="text-red-500 mb-4">
          Failed to connect to database. Please check your connection and try again.
        </div>
        <div className="text-sm text-gray-500">
          Error: {dbStatus.error.message}
        </div>
      </div>
    );
  }

  if (!dbStatus.isConnected) {
    return (
      <div className="p-4 text-center">
        <div className="text-yellow-500">
          Connecting to database...
        </div>
      </div>
    );
  }

  const updateHabitProgress = async (habitIndex: number, date: string, value: string) => {
    const updatedHabits = [...habits];
    const habit = updatedHabits[habitIndex];
    const prevValue = habit.entries[date];
    habit.entries[date] = value;

    if (isHabitCompleted(habit, date) && !isHabitCompleted(habit, date, prevValue)) {
      habit.streak++;
      if (habit.streak % 7 === 0) {
        toast({
          title: "Achievement Unlocked!",
          description: `You've maintained a 7-day streak for ${habit.name}!`,
          duration: 5000,
        });
      }
    } else if (!isHabitCompleted(habit, date) && isHabitCompleted(habit, date, prevValue)) {
      habit.streak = 0;
    }

    setHabits(updatedHabits);
    await updateHabit(habit);
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
                currentDate.toISOString().split('T')[0],
                e.target.value
              )}
              value={habit.entries[currentDate.toISOString().split('T')[0]] || ''}
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