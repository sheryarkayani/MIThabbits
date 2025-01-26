import { NextApiRequest, NextApiResponse } from "next";
import { connectDB, HabitModel } from "../../db/mongoClient";
// import { Habit } from "../../types";

// Connect to MongoDB when the API route is called
connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Handle different HTTP methods
    switch (req.method) {
      case "GET": {
        // Fetch all habits
        const habits = await HabitModel.find().lean();
        res.status(200).json(habits);
        break;
      }

      case "POST": {
        // Create a new habit
        const { name, goal, unit, entries, streak, chunks } = req.body;
        const newHabit = new HabitModel({
          name,
          goal,
          unit,
          entries: new Map(Object.entries(entries || {})),
          streak: streak || 0,
          chunks: chunks || undefined,
        });
        const savedHabit = await newHabit.save();
        res.status(201).json(savedHabit);
        break;
      }

      case "PUT": {
        // Update an existing habit
        const { id, name, goal, unit, entries, streak, chunks } = req.body;
        const updatedHabit = await HabitModel.findByIdAndUpdate(
          id,
          {
            name,
            goal,
            unit,
            entries: new Map(Object.entries(entries || {})),
            streak,
            chunks,
          },
          { new: true, runValidators: true }
        );

        if (!updatedHabit) {
          return res.status(404).json({ error: "Habit not found" });
        }

        res.status(200).json(updatedHabit);
        break;
      }

      case "DELETE": {
        // Delete a habit
        const { id } = req.body;
        const deletedHabit = await HabitModel.findByIdAndDelete(id);

        if (!deletedHabit) {
          return res.status(404).json({ error: "Habit not found" });
        }

        res.status(200).json({ message: "Habit deleted successfully" });
        break;
      }

      default: {
        // Handle unsupported HTTP methods
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).json({ error: `Method ${req.method} not allowed` });
      }
    }
  } catch (error) {
    console.error("Error in API route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
