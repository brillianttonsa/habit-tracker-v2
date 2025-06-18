
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Edit, Trash2, Award, TrendingUp, CheckCircle2 } from "lucide-react"
import {StatCard} from "../components/dahsboardCards/HabitDetailStatCard"
import ApiService from "../services/api"

function HabitDetail(){
  const { id } = useParams()
  const navigate = useNavigate()

  const [habit, setHabit] = useState(null)
  const [loading, setLoading] = useState(true)
  const [logValue, setLogValue] = useState(1)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    const fetchHabitDetails = async () => {
      try {
        const habitData = await ApiService.getHabit(id)
        setHabit(habitData)
      } catch (error) {
        console.error("Error fetching habit details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHabitDetails()
  }, [id])

  const handleLogProgress = async () => {
    try {
      await ApiService.logHabit(id, { value: logValue })
      // Refresh habit data
      const updatedHabit = await ApiService.getHabit(id)
      setHabit(updatedHabit)
      setLogValue(1)
    } catch (error) {
      console.error("Error logging habit:", error)
    }
  }

  const handleDelete = async () => {
    try {
      await ApiService.deleteHabit(id)
      navigate("/dashboard")
    } catch (error) {
      console.error("Error deleting habit:", error)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!habit) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Habit not found</h2>
        <button onClick={() => navigate("/dashboard")} className="text-purple-600 hover:text-purple-800 font-medium">
          Return to Dashboard
        </button>
      </div>
    )
  }

  // Format dates for display
  const startDate = new Date(habit.createdAt).toLocaleDateString()
  const lastCompletedDate = habit.lastCompletedDate ? new Date(habit.lastCompletedDate).toLocaleDateString() : "Never"

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={18} className="mr-1" />
        Back to Dashboard
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Habit Header */}
        <div className="p-6" style={{ backgroundColor: habit.color || "#6d28d9" }}>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{habit.name}</h1>
              {habit.description && <p className="text-white/90 mb-2">{habit.description}</p>}
              <div className="flex items-center text-white/80 text-sm">
                <Calendar size={16} className="mr-1" />
                <span>Started on {startDate}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/dashboard/edit-habit/${id}`)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full"
                title="Edit Habit"
              >
                <Edit size={18} className="text-white" />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full"
                title="Delete Habit"
              >
                <Trash2 size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <StatCard
            icon={<CheckCircle2 className="h-8 w-8 text-green-500" />}
            title="Completion Rate"
            value={`${habit.completionRate || 0}%`}
            description="Overall completion rate"
          />
          <StatCard
            icon={<TrendingUp className="h-8 w-8 text-blue-500" />}
            title="Total Logged"
            value={habit.totalLogged || 0}
            description={`${habit.unit || "completions"} total`}
          />
          <StatCard
            icon={<Award className="h-8 w-8 text-yellow-500" />}
            title="Current Streak"
            value={habit.currentStreak || 0}
            description={`Best: ${habit.bestStreak || 0} days`}
          />
        </div>

        {/* Log Progress */}
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Log Today's Progress</h2>
          <div className="flex items-end gap-4">
            <div className="flex-1 max-w-xs">
              <label htmlFor="logValue" className="block text-sm font-medium text-gray-700 mb-1">
                Value ({habit.unit || "completion"})
              </label>
              <input
                type="number"
                id="logValue"
                value={logValue}
                onChange={(e) => setLogValue(Math.max(1, Number.parseInt(e.target.value) || 1))}
                min="1"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              onClick={handleLogProgress}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Log Progress
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">Last completed: {lastCompletedDate}</p>
        </div>

        {/* Activity History */}
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Activity History</h2>
          <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
            {habit.logs && habit.logs.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {habit.logs.map((log, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2">{new Date(log.date).toLocaleDateString()}</td>
                      <td className="py-2">
                        {log.value} {habit.unit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 text-center py-4">No activity logged yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-semibold mb-4">Delete Habit</h3>
            <p className="mb-6">Are you sure you want to delete "{habit.name}"? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}


export default HabitDetail
