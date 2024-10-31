import { Button } from "../components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { ChevronLeft, ChevronRight, Sun, Calendar, Moon } from "lucide-react"

type NavigationProps = {
  viewMode: 'day' | 'week' | 'month'
  setViewMode: (mode: 'day' | 'week' | 'month') => void
  navigate: (direction: number) => void
}

export default function Navigation({ viewMode, setViewMode, navigate }: NavigationProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-2 sm:mb-0">
        <ChevronLeft className="mr-2" /> Previous {viewMode}
      </Button>
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'day' | 'week' | 'month')}>
        <TabsList>
          <TabsTrigger value="day"><Sun className="w-4 h-4 mr-1" />Day</TabsTrigger>
          <TabsTrigger value="week"><Calendar className="w-4 h-4 mr-1" />Week</TabsTrigger>
          <TabsTrigger value="month"><Moon className="w-4 h-4 mr-1" />Month</TabsTrigger>
        </TabsList>
      </Tabs>
      <Button variant="outline" onClick={() => navigate(1)} className="mt-2 sm:mt-0">
        Next {viewMode} <ChevronRight className="ml-2" />
      </Button>
    </div>
  )
}