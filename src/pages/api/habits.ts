import { NextApiRequest, NextApiResponse } from "next";
import { connectDB, HabitModel } from "../../db/mongoClient";

// Connect to MongoDB when the API route is called
connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;
    const { id } = req.query; // Extract ID from URL parameters

    switch (method) {
      case "GET": {
        const habits = await HabitModel.find().lean();
        res.status(200).json(habits);
        break;
      }

      case "POST": {
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
        console.log("Update habit endpoint hit");

        if (!id || typeof id !== "string") {
          return res.status(400).json({ error: "Habit ID is required" });
        }

        const { name, goal, unit, entries, streak, chunks } = req.body;
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
        if (!id || typeof id !== "string") {
          return res.status(400).json({ error: "Habit ID is required" });
        }

        const deletedHabit = await HabitModel.findByIdAndDelete(id);

        if (!deletedHabit) {
          return res.status(404).json({ error: "Habit not found" });
        }

        res.status(200).json({ message: "Habit deleted successfully" });
        break;
      }

      default: {
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).json({ error: `Method ${method} not allowed` });
      }
    }
  } catch (error) {
    console.error("Error in API route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
