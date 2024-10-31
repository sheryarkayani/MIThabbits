import { motion } from "framer-motion"
import { Progress } from "../components/ui/progress"

type OverallProgressProps = {
  progress: number
}

export default function OverallProgress({ progress }: OverallProgressProps) {
  return (
    <div className="w-full mb-4">
      <h3 className="text-lg font-semibold mb-2 text-red-500 text-center">Overall Progress</h3>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      >
        <Progress value={progress} className="w-full h-4" />
      </motion.div>
    </div>
  )
}