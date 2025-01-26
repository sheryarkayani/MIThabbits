import axios from "axios";
import { Habit } from "./types";

// Set the base URL for Axios
axios.defaults.baseURL = "http://localhost:3000"; // Replace with your actual domain

/**
 * Fetch all habits from the API
 */
export const fetchHabits = async (): Promise<Habit[]> => {
  try {
    const response = await axios.get("/api/habits");
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error("Invalid data format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching habits:", error);
    throw new Error("Failed to fetch habits. Please try again later.");
  }
};

/**
 * Update a habit in the database
 * @param habit - The updated habit object
 */
export const updateHabit = async (habit: Habit): Promise<Habit> => {
  try {
    const response = await axios.put("/api/habits", habit);
    return response.data;
  } catch (error) {
    console.error("Error updating habit:", error);
    throw new Error("Failed to update habit. Please try again.");
  }
};

/**
 * Create a new habit in the database
 * @param habit - The new habit object
 */
export const createHabit = async (habit: Habit): Promise<Habit> => {
  try {
    const response = await axios.post("/api/habits", habit);
    return response.data;
  } catch (error) {
    console.error("Error creating habit:", error);
    throw new Error("Failed to create habit. Please try again.");
  }
};

/**
 * Delete a habit from the database
 * @param id - The ID of the habit to delete
 */
export const deleteHabit = async (id: string): Promise<void> => {
  try {
    await axios.delete("/api/habits", { data: { id } });
  } catch (error) {
    console.error("Error deleting habit:", error);
    throw new Error("Failed to delete habit. Please try again.");
  }
};
