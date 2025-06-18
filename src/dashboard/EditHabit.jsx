
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Calendar, Clock, BarChart3, Target, ArrowLeft } from "lucide-react"
import ApiService from "../services/api"

function EditHabit(){
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    frequency: "daily",
    unit: "completion",
    target: 1,
    color: "#6d28d9",
    reminderTime: "",
    reminderEnabled: false,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const habit = await ApiService.getHabit(id)
        setFormData({
          name: habit.name || "",
          description: habit.description || "",
          frequency: habit.frequency || "daily",
          unit: habit.unit || "completion",
          target: habit.target || 1,
          color: habit.color || "#6d28d9",
          reminderTime: habit.reminderTime || "",
          reminderEnabled: habit.reminderEnabled || false,
        })
      } catch (error) {
        console.error("Error fetching habit:", error)
        navigate("/dashboard")
      } finally {
        setLoading(false)
      }
    }

    fetchHabit()
  }, [id, navigate])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Habit name is required"
    }

    if (formData.target <= 0) {
      newErrors.target = "Target must be greater than 0"
    }

    if (formData.reminderEnabled && !formData.reminderTime) {
      newErrors.reminderTime = "Please select a reminder time"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      await ApiService.updateHabit(id, formData)
      navigate(`/dashboard/habit/${id}`)
    } catch (error) {
      console.error("Error updating habit:", error)
      setErrors({ submit: "Failed to update habit. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <button
        onClick={() => navigate(`/dashboard/habit/${id}`)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={18} className="mr-1" />
        Back to Habit
      </button>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Habit</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">{errors.submit}</div>
          )}

          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Habit Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
              placeholder="e.g., Read Books, Exercise, Drink Water"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Why is this habit important to you?"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar size={16} className="inline mr-1" />
                Frequency
              </label>
              <select
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="h-10 w-10 rounded border border-gray-300 mr-2"
                />
                <span className="text-sm text-gray-500">{formData.color}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                <BarChart3 size={16} className="inline mr-1" />
                Measurement Unit
              </label>
              <input
                type="text"
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., pages, minutes, glasses"
              />
              <p className="mt-1 text-xs text-gray-500">Leave as "completion" for simple yes/no habits</p>
            </div>

            <div>
              <label htmlFor="target" className="block text-sm font-medium text-gray-700 mb-1">
                <Target size={16} className="inline mr-1" />
                Daily Target
              </label>
              <input
                type="number"
                id="target"
                name="target"
                value={formData.target}
                onChange={handleChange}
                min="1"
                className={`w-full border ${errors.target ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
              {errors.target && <p className="mt-1 text-sm text-red-600">{errors.target}</p>}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="reminderEnabled"
                name="reminderEnabled"
                checked={formData.reminderEnabled}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="reminderEnabled" className="ml-2 block text-sm font-medium text-gray-700">
                <Clock size={16} className="inline mr-1" />
                Enable Daily Reminder
              </label>
            </div>

            {formData.reminderEnabled && (
              <div className="ml-6 mt-2">
                <input
                  type="time"
                  id="reminderTime"
                  name="reminderTime"
                  value={formData.reminderTime}
                  onChange={handleChange}
                  className={`border ${errors.reminderTime ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                {errors.reminderTime && <p className="mt-1 text-sm text-red-600">{errors.reminderTime}</p>}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(`/dashboard/habit/${id}`)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Updating..." : "Update Habit"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default EditHabit
