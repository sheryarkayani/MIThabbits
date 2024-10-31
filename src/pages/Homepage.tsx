'use client'

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "../components/ui/card"
import { useToast } from "../components/ui/use-toast"
import Header from "../components/Header"
import Navigation from "../components/Navigation"
import HabitList from "../components/HabitList"
import OverallProgress from "../components/OverallProgress"
import Footer from "../components/Footer"
import { Habit } from "../types"
import { initialHabits, motivationalQuotes } from "../data"

export default function Homepage() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const savedHabits = localStorage.getItem("mitHabits")
    return savedHabits ? JSON.parse(savedHabits) : initialHabits
  })
  const [currentDate, setCurrentDate] = useState(new Date())
  const [level, setLevel] = useState(() => {
    const savedLevel = localStorage.getItem("mitLevel")
    return savedLevel ? parseInt(savedLevel) : 1
  })
  const [quote, setQuote] = useState("")
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day')
  const { toast } = useToast()

  useEffect(() => {
    localStorage.setItem("mitHabits", JSON.stringify(habits))
    localStorage.setItem("mitLevel", level.toString())
  }, [habits, level])

  useEffect(() => {
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)])
  }, [currentDate])

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const getDates = () => {
    const dates = []
    let startDate = new Date(currentDate)
    let endDate = new Date(currentDate)

    if (viewMode === 'day') {
      dates.push(formatDate(startDate))
    } else if (viewMode === 'week') {
      const dayOfWeek = startDate.getDay()
      startDate.setDate(startDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))
      endDate = new Date(startDate)
      endDate.setDate(startDate.getDate() + 6)
    } else if (viewMode === 'month') {
      startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1)
      endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)
    }

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      dates.push(formatDate(new Date(d)))
    }

    return dates
  }

  const dates = getDates()

  const updateHabitProgress = (habitIndex: number, date: string, value: string) => {
    const updatedHabits = [...habits]
    const habit = updatedHabits[habitIndex]
    const prevValue = habit.entries[date]
    habit.entries[date] = value

    if (isHabitCompleted(habit, date) && !isHabitCompleted(habit, date, prevValue)) {
      habit.streak++
      if (habit.streak % 7 === 0) {
        toast({
          title: "Achievement Unlocked!",
          description: `You've maintained a 7-day streak for ${habit.name}!`,
          duration: 5000,
        })
      }
    } else if (!isHabitCompleted(habit, date) && isHabitCompleted(habit, date, prevValue)) {
      habit.streak = 0
    }

    setHabits(updatedHabits)
    updateLevel()
  }

  const isHabitCompleted = (habit: Habit, date: string, value?: string) => {
    const entry = value || habit.entries[date]
    if (!entry) return false
    if (habit.unit === "min" || habit.unit === "AM" || habit.unit === "PM") {
      const [entryHours, entryMinutes] = entry.split(":").map(Number)
      const [goalHours, goalMinutes] = habit.goal.split(":").map(Number)
      return entryHours < goalHours || (entryHours === goalHours && entryMinutes <= goalMinutes)
    }
    return parseFloat(entry) >= parseFloat(habit.goal)
  }

  const calculateProgress = (habit: Habit) => {
    const completedDays = dates.filter((date) => isHabitCompleted(habit, date)).length
    return (completedDays / dates.length) * 100
  }

  const calculateOverallProgress = () => {
    const totalProgress = habits.reduce((sum, habit) => sum + calculateProgress(habit), 0)
    return totalProgress / habits.length
  }

  const updateLevel = () => {
    const newLevel = Math.floor(calculateOverallProgress() / 10) + 1
    if (newLevel > level) {
      setLevel(newLevel)
      
      toast({
        title: "Level Up!",
        description: `You've reached Level ${newLevel} on your MIT Mission!`,
        duration: 5000,
      })
    }
  }

  const navigate = (direction: number) => {
    const newDate = new Date(currentDate)
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + direction)
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7 * direction)
    } else if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + direction)
    }
    setCurrentDate(newDate)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-red-900 text-white p-4">
      <Card className="w-full max-w-4xl mx-auto bg-gray-800 border-gray-700">
        <Header />
        <div className="p-4">
          <CardContent>
            <Navigation viewMode={viewMode} setViewMode={setViewMode} navigate={navigate} />
            <h2 className="text-xl font-semibold text-red-400 mb-2 text-center">
              {viewMode === 'day' && currentDate.toLocaleDateString()}
              {viewMode === 'week' && `Week of ${dates[0]}`}
              {viewMode === 'month' && currentDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
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
  )
}