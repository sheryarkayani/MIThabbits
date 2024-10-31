import { motion } from "framer-motion"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { Progress } from "../components/ui/progress"
import { Zap, Droplet } from "lucide-react"
import { Habit } from "../types"

type HabitItemProps = {
  habit: Habit
  index: number
  date: string
  viewMode: 'day' | 'week' | 'month'
  updateHabitProgress: (habitIndex: number, date: string, value: string) => void
}

export default function HabitItem({ habit, index, date, viewMode, updateHabitProgress }: HabitItemProps) {
  const calculateProgress = () => {
    const entry = habit.entries[date] || "0"
    if (habit.unit === "min" || habit.unit === "AM" || habit.unit === "PM") {
      const [entryHours, entryMinutes] = entry.split(":").map(Number)
      const [goalHours, goalMinutes] = habit.goal.split(":").map(Number)
      const entryTotal = entryHours * 60 + entryMinutes
      const goalTotal = goalHours * 60 + goalMinutes
      return (entryTotal / goalTotal) * 100
    }
    return (parseFloat(entry) / parseFloat(habit.goal)) * 100
  }

  const getChunkIcons = () => {
    const chunks = habit.chunks || 1
    const entryValue = parseFloat(habit.entries[date] || "0")
    const goalValue = parseFloat(habit.goal)
    const chunkValue = goalValue / chunks
    const filledChunks = Math.floor(entryValue / chunkValue)
    return Array.from({ length: chunks }, (_, i) => (
      <Droplet
        key={i}
        className={`w-6 h-6 ${i < filledChunks ? 'text-blue-500' : 'text-gray-500'}`}
      />
    ))
  }

  return (
    <div className="mb-4 p-4 bg-gray-700 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-red-300">{habit.name}</h3>
        <Badge variant="secondary" className="bg-red-600 text-white">
          <Zap className="w-4 h-4 mr-1" />
          {habit.streak} days
        </Badge>
      </div>
      <div className="flex items-center justify-between mb-2">
        <p>Goal: {habit.goal} {habit.unit}</p>
        {viewMode === 'day' && (
          <Input
            type={habit.unit === "min" || habit.unit === "AM" || habit.unit === "PM" ? "time" : "number"}
            value={habit.entries[date] || ""}
            onChange={(e) => updateHabitProgress(index, date, e.target.value)}
            className="w-24 bg-gray-600 border-gray-500 text-white"
          />
        )}
      </div>
      {habit.chunks ? (
        <div className="flex items-center">
          {getChunkIcons()}
        </div>
      ) : (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${calculateProgress()}%` }}
          transition={{ duration: 0.5 }}
        >
          <Progress value={calculateProgress()} className="w-full h-2" />
        </motion.div>
      )}
    </div>
  )
}