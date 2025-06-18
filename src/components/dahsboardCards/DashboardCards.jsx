import { motion } from "framer-motion"
import { TrendingUp, Calendar, Plus, CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"


export const StatCard = ({ icon, title, value, description, color }) => {
    return (
      <motion.div
        className="bg-white rounded-lg shadow-md p-6 flex items-center"
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <div className={`${color} p-3 rounded-full mr-4`}>{icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </motion.div>
    )
  }


  //habitcard

  export const HabitCard = ({ habit, onLog }) => {
    const today = new Date().toISOString().split("T")[0]
    const isCompletedToday = habit.lastCompletedDate === today
  
    // Calculate completion percentage for the week
    const weeklyCompletion = Math.floor(Math.random() * 100) // Mock data
  
    return (
      <motion.div
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        {/* Header with color */}
        <div className="h-2" style={{ backgroundColor: habit.color || "#6d28d9" }}></div>
  
        <div className="p-6">
          {/* Habit Name and Description */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{habit.name}</h3>
            {habit.description && <p className="text-sm text-gray-600 line-clamp-2">{habit.description}</p>}
          </div>
  
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp size={16} className="text-blue-500 mr-1" />
                <span className="text-sm text-gray-500">Streak</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{habit.currentStreak || 0}</p>
            </div>
  
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Calendar size={16} className="text-green-500 mr-1" />
                <span className="text-sm text-gray-500">This Week</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{weeklyCompletion}%</p>
            </div>
          </div>
  
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">Weekly Progress</span>
              <span className="text-xs text-gray-500">{weeklyCompletion}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${weeklyCompletion}%`,
                  backgroundColor: habit.color || "#6d28d9",
                }}
              ></div>
            </div>
          </div>
  
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => onLog(habit)}
              disabled={isCompletedToday}
              className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium ${
                isCompletedToday
                  ? "bg-green-100 text-green-700 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              {isCompletedToday ? (
                <>
                  <CheckCircle2 size={16} className="mr-1" />
                  Completed
                </>
              ) : (
                <>
                  <Plus size={16} className="mr-1" />
                  Log
                </>
              )}
            </button>
  
            <Link
              to={`/dashboard/habit/${habit.id}`}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              View
            </Link>
          </div>
  
          {/* Last Completed */}
          <div className="mt-3 text-xs text-gray-500 text-center">
            {isCompletedToday
              ? "Completed today"
              : habit.lastCompletedDate
                ? `Last: ${new Date(habit.lastCompletedDate).toLocaleDateString()}`
                : "Not started yet"}
          </div>
        </div>
      </motion.div>
    )
  }