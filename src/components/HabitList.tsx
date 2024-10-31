import { motion } from "framer-motion"
import HabitItem from "./HabitItem"
import { Habit } from "../types"

type HabitListProps = {
  habits: Habit[]
  dates: string[]
  viewMode: 'day' | 'week' | 'month'
  updateHabitProgress: (habitIndex: number, date: string, value: string) => void
}

export default function HabitList({ habits, dates, viewMode, updateHabitProgress }: HabitListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {habits.map((habit, index) => (
        <HabitItem
          key={habit.name}
          habit={habit}
          index={index}
          date={dates[0]}
          viewMode={viewMode}
          updateHabitProgress={updateHabitProgress}
        />
      ))}
    </motion.div>
  )
}