
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Bell, Database, Download, Save, Eye, EyeOff } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import ApiService from "../services/api"

function Settings(){
  const { user, logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState({
    pixela_username: "",
    pixela_token: "",
    google_sheet_id: "",
    google_sheet_name: "",
    notifications_enabled: true,
    reminder_time: "09:00",
  })
  const [showPixelaToken, setShowPixelaToken] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  const isDemoUser = user?.email === "demo@habitflow.com"

  useEffect(() => {
    if (!isDemoUser) {
      fetchSettings()
    }
  }, [isDemoUser])

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const response = await ApiService.getUserSettings()
      setSettings((prev) => ({ ...prev, ...response }))
    } catch (error) {
      console.error("Error fetching settings:", error)
      setMessage({ type: "error", text: "Failed to load settings" })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    if (isDemoUser) {
      setMessage({ type: "info", text: "Settings saved locally for demo user" })
      return
    }

    setSaving(true)
    setMessage({ type: "", text: "" })

    try {
      await ApiService.updateSettings(settings)
      setMessage({ type: "success", text: "Settings saved successfully!" })
    } catch (error) {
      console.error("Error saving settings:", error)
      setMessage({ type: "error", text: "Failed to save settings" })
    } finally {
      setSaving(false)
    }
  }

  const handleExportData = async () => {
    try {
      if (isDemoUser) {
        setMessage({ type: "info", text: "Demo data export would be available for real users" })
        return
      }

      const data = await ApiService.getAnalytics("all")
      const jsonData = JSON.stringify(data, null, 2)
      const blob = new Blob([jsonData], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "habitflow-data.json"
      link.click()
      URL.revokeObjectURL(url)

      setMessage({ type: "success", text: "Data exported successfully!" })
    } catch (error) {
      console.error("Error exporting data:", error)
      setMessage({ type: "error", text: "Failed to export data" })
    }
  }

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
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
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : message.type === "error"
                ? "bg-red-50 border border-red-200 text-red-700"
                : "bg-blue-50 border border-blue-200 text-blue-700"
          }`}
        >
          {message.text}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <User className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold">Profile</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={user?.name || ""}
                disabled
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
              />
            </div>

            {isDemoUser && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700 text-sm">You're using a demo account. Profile changes are not available.</p>
              </div>
            )}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Bell className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Enable Notifications</label>
                <p className="text-xs text-gray-500">Receive reminders for your habits</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications_enabled}
                onChange={(e) => handleInputChange("notifications_enabled", e.target.checked)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Reminder Time</label>
              <input
                type="time"
                value={settings.reminder_time}
                onChange={(e) => handleInputChange("reminder_time", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Pixela Integration */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Database className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold">Pixela Integration</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pixela Username</label>
              <input
                type="text"
                value={settings.pixela_username}
                onChange={(e) => handleInputChange("pixela_username", e.target.value)}
                placeholder="Your Pixela username"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pixela Token</label>
              <div className="relative">
                <input
                  type={showPixelaToken ? "text" : "password"}
                  value={settings.pixela_token}
                  onChange={(e) => handleInputChange("pixela_token", e.target.value)}
                  placeholder="Your Pixela API token"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPixelaToken(!showPixelaToken)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPixelaToken ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Get your token from{" "}
                <a
                  href="https://pixe.la"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-500"
                >
                  pixe.la
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Google Sheets Integration */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Database className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold">Google Sheets Integration</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sheet ID</label>
              <input
                type="text"
                value={settings.google_sheet_id}
                onChange={(e) => handleInputChange("google_sheet_id", e.target.value)}
                placeholder="Google Sheets ID"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sheet Name</label>
              <input
                type="text"
                value={settings.google_sheet_name}
                onChange={(e) => handleInputChange("google_sheet_name", e.target.value)}
                placeholder="Sheet name (e.g., Habits)"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className="flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Settings"}
        </button>

        <button
          onClick={handleExportData}
          className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </button>

        <button
          onClick={logout}
          className="flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </motion.div>
  )
}

export default Settings
