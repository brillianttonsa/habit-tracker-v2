
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Plus, Calendar, TrendingUp, Award, CheckCircle2, X } from "lucide-react"
import { StatCard, HabitCard } from "../components/dahsboardCards/DashboardCards"
import ApiService from "../services/api"

function Dashboard(){
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedHabit, setSelectedHabit] = useState(null)
  const [showLogModal, setShowLogModal] = useState(false)
  const [logValue, setLogValue] = useState(1)

  useEffect(() => {
    fetchHabits()
  }, [])

  const fetchHabits = async () => {
    setLoading(true)
    try {
      const response = await ApiService.getHabits()
      setHabits(response || [])
    } catch (error) {
      console.error("Error fetching habits:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogHabit = async () => {
    if (selectedHabit) {
      try {
        await ApiService.logHabit(selectedHabit.id, { value: logValue })
        await fetchHabits() // Refresh habits
        setShowLogModal(false)
        setSelectedHabit(null)
        setLogValue(1)
      } catch (error) {
        console.error("Error logging habit:", error)
      }
    }
  }

  const openLogModal = (habit) => {
    setSelectedHabit(habit)
    setShowLogModal(true)
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0]

  // Calculate streaks
  const currentStreak = habits.reduce((total, habit) => {
    return total + (habit.currentStreak || 0)
  }, 0)

  // Calculate completion rate
  const completionRate =
    habits.length > 0
      ? Math.round((habits.filter((h) => h.lastCompletedDate === today).length / habits.length) * 100)
      : 0

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <Link
          to="/dashboard/create-habit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          New Habit
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<CheckCircle2 className="h-8 w-8 text-green-500" />}
          title="Today's Progress"
          value={`${habits.filter((h) => h.lastCompletedDate === today).length}/${habits.length}`}
          description="Habits completed today"
          color="bg-green-100"
        />
        <StatCard
          icon={<TrendingUp className="h-8 w-8 text-blue-500" />}
          title="Completion Rate"
          value={`${completionRate}%`}
          description="Daily completion rate"
          color="bg-blue-100"
        />
        <StatCard
          icon={<Award className="h-8 w-8 text-yellow-500" />}
          title="Current Streak"
          value={currentStreak}
          description="Days in a row"
          color="bg-yellow-100"
        />
        <StatCard
          icon={<Calendar className="h-8 w-8 text-purple-500" />}
          title="Total Habits"
          value={habits.length}
          description="Active habits"
          color="bg-purple-100"
        />
      </div>

      {/* Habits List */}
      <h2 className="text-2xl font-semibold mb-4">Your Habits</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : habits.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-medium mb-2">No habits yet</h3>
          <p className="text-gray-600 mb-6">Start by creating your first habit to track</p>
          <Link
            to="/dashboard/create-habit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg inline-flex items-center gap-2"
          >
            <Plus size={18} />
            Create First Habit
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} onLog={() => openLogModal(habit)} />
          ))}
        </div>
      )}

      {/* Log Habit Modal */}
      {showLogModal && selectedHabit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Log Progress: {selectedHabit.name}</h3>
              <button onClick={() => setShowLogModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Value to log:</label>
              <input
                type="number"
                min="1"
                value={logValue}
                onChange={(e) => setLogValue(Number.parseInt(e.target.value) || 1)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-sm text-gray-500 mt-2">Unit: {selectedHabit.unit || "completion"}</p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLogHabit}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Log Progress
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}


export default Dashboard
