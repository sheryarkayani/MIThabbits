"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { useToast } from "../components/ui/use-toast";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import HabitList from "../components/HabitList";
import OverallProgress from "../components/OverallProgress";
import Footer from "../components/Footer";
import { Habit } from "../types";
import { motivationalQuotes } from "../data";
import { fetchHabits, updateHabit } from "../habitService";

export default function Homepage() {
  const [habits, setHabits] = useState<Habit[]>([]); // Initialize as an empty array
  const [currentDate, setCurrentDate] = useState(new Date());
  const [level, setLevel] = useState(1);
  const [quote, setQuote] = useState("");
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("day");
  const { toast } = useToast();

  // Fetch habits from the API on component mount
  useEffect(() => {
    const loadHabits = async () => {
      try {
        const habitsData = await fetchHabits();
        setHabits(habitsData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch habits. Please try again later.",
          duration: 5000,
        });
      }
    };

    loadHabits();
  }, []);

  // Set a random motivational quote when the date changes
  useEffect(() => {
    setQuote(
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
    );
  }, [currentDate]);

  // Format date to YYYY-MM-DD
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  // Get dates based on the current view mode (day, week, month)
  const getDates = () => {
    const dates = [];
    let startDate = new Date(currentDate);
    let endDate = new Date(currentDate);

    if (viewMode === "day") {
      dates.push(formatDate(startDate));
    } else if (viewMode === "week") {
      const dayOfWeek = startDate.getDay();
      startDate.setDate(
        startDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
      );
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
    } else if (viewMode === "month") {
      startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
      endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    }

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      dates.push(formatDate(new Date(d)));
    }

    return dates;
  };

  const dates = getDates();

  const updateHabitProgress = async (
    habitIndex: number,
    date: string,
    value: string
  ) => {
    setHabits((prevHabits) => {
      const updatedHabits = [...prevHabits]; // Clone the array
      const habit = { ...updatedHabits[habitIndex] }; // Clone the specific habit
      habit.entries = { ...habit.entries, [date]: value }; // Clone and update entries

      updatedHabits[habitIndex] = habit; // Replace with the updated habit

      return updatedHabits; // Return new array to trigger re-render
    });

    try {
      const updatedHabit = await updateHabit(habits[habitIndex]); // Send updated habit to API
      setHabits((prevHabits) => {
        const updatedHabits = [...prevHabits];
        updatedHabits[habitIndex] = updatedHabit;
        return updatedHabits;
      });
      updateLevel();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update habit. Please try again.",
        duration: 5000,
      });
    }
  };

  // Check if a habit is completed for a specific date
  const isHabitCompleted = (habit: Habit, date: string, value?: string) => {
    const entry = value || habit.entries[date];
    if (!entry) return false;
    if (habit.unit === "min" || habit.unit === "AM" || habit.unit === "PM") {
      const [entryHours, entryMinutes] = entry.split(":").map(Number);
      const [goalHours, goalMinutes] = habit.goal.split(":").map(Number);
      return (
        entryHours < goalHours ||
        (entryHours === goalHours && entryMinutes <= goalMinutes)
      );
    }
    return parseFloat(entry) >= parseFloat(habit.goal);
  };

  // Calculate progress for a specific habit
  const calculateProgress = (habit: Habit) => {
    const completedDays = dates.filter((date) =>
      isHabitCompleted(habit, date)
    ).length;
    return (completedDays / dates.length) * 100;
  };

  // Calculate overall progress for all habits
  const calculateOverallProgress = () => {
    if (!Array.isArray(habits) || habits.length === 0) {
      return 0; // Return 0 if habits is not an array or is empty
    }
    const totalProgress = habits.reduce(
      (sum, habit) => sum + calculateProgress(habit),
      0
    );
    return totalProgress / habits.length;
  };

  // Update the user's level based on overall progress
  const updateLevel = () => {
    const newLevel = Math.floor(calculateOverallProgress() / 10) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      toast({
        title: "Level Up!",
        description: `You've reached Level ${newLevel} on your MIT Mission!`,
        duration: 5000,
      });
    }
  };

  // Navigate between dates (day, week, month)
  const navigate = (direction: number) => {
    const newDate = new Date(currentDate);
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() + direction);
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7 * direction);
    } else if (viewMode === "month") {
      newDate.setMonth(newDate.getMonth() + direction);
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="p-4 min-h-screen text-white bg-gradient-to-b from-gray-900 to-red-900">
      <Card className="mx-auto w-full max-w-4xl bg-gray-800 border-gray-700">
        <Header />
        <div className="p-4">
          <CardContent>
            <Navigation
              viewMode={viewMode}
              setViewMode={setViewMode}
              navigate={navigate}
            />
            <h2 className="mb-2 text-xl font-semibold text-center text-red-400">
              {viewMode === "day" && currentDate.toLocaleDateString()}
              {viewMode === "week" && `Week of ${dates[0]}`}
              {viewMode === "month" &&
                currentDate.toLocaleDateString(undefined, {
                  month: "long",
                  year: "numeric",
                })}
            </h2>
            <HabitList
              habits={habits}
              dates={dates}
              viewMode={viewMode}
              updateHabitProgress={updateHabitProgress}
            />
          </CardContent>
        </div>
        <div className="flex flex-col items-center p-4">
          <CardFooter>
            <OverallProgress progress={calculateOverallProgress()} />
            <Footer level={level} quote={quote} />
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
