import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "../components/ui/badge"
import { Trophy } from "lucide-react"

type FooterProps = {
  level: number
  quote: string
}

export default function Footer({ level, quote }: FooterProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <Badge variant="outline" className="text-lg p-2 bg-gray-800 border-red-500 text-red-500">
        <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
        Level {level}
      </Badge>
      <AnimatePresence>
        <motion.p
          key={quote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-sm italic text-gray-300 max-w-md text-center"
        >
          "{quote}"
        </motion.p>
      </AnimatePresence>
    </div>
  )
}