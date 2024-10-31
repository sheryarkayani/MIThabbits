import { CardHeader, CardTitle, CardDescription } from "../components/ui/card"

export default function Header() {
  return (
    <div className="p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-red-500 text-center">
          MIT Mission Tracker
        </CardTitle>
        <CardDescription className="text-gray-300 text-center">
          Your journey towards MIT begins here
        </CardDescription>
      </CardHeader>
    </div>
  )
}