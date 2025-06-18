import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, BarChart3, TrendingUp, Download } from "lucide-react"
import { StatCard, PeriodButton } from "../components/dahsboardCards/ReportCards"
import ApiService from "../services/api"

function Reports(){
  const [habits, setHabits] = useState([])
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const habitsData = await ApiService.getHabits()
        setHabits(habitsData || [])

        const analyticsData = await ApiService.getAnalytics(selectedPeriod)
        setAnalytics(analyticsData)
      } catch (error) {
        console.error("Error loading reports data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [selectedPeriod])

  const handleExportData = async () => {
    try {
      const exportData = await ApiService.getAnalytics("all")
      const csvContent = generateCSV(exportData)
      downloadCSV(csvContent, "habitflow-data.csv")
    } catch (error) {
      console.error("Error exporting data:", error)
    }
  }

  const generateCSV = (data) => {
    let csv = "Date,Habit,Value,Unit\n"
    data.logs?.forEach((log) => {
      csv += `${log.date},${log.habitName},${log.value},${log.unit}\n`
    })
    return csv
  }

  const downloadCSV = (content, filename) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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

  if (!analytics || habits.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-3xl font-bold mb-8">Reports & Analytics</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-medium mb-2">No habits to report</h3>
          <p className="text-gray-600">Start tracking habits to see reports and analytics</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <button
          onClick={handleExportData}
          className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg"
        >
          <Download size={18} />
          Export Data
        </button>
      </div>

      {/* Time Period Selector */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar size={20} className="text-gray-500 mr-2" />
            <span className="font-medium">Time Period:</span>
          </div>
          <div className="flex gap-2">
            <PeriodButton active={selectedPeriod === "week"} onClick={() => setSelectedPeriod("week")}>
              Week
            </PeriodButton>
            <PeriodButton active={selectedPeriod === "month"} onClick={() => setSelectedPeriod("month")}>
              Month
            </PeriodButton>
            <PeriodButton active={selectedPeriod === "year"} onClick={() => setSelectedPeriod("year")}>
              Year
            </PeriodButton>
          </div>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<BarChart3 className="h-8 w-8 text-purple-500" />}
          title="Average Completion"
          value={`${analytics.overallStats.avgCompletion}%`}
          description={`For ${selectedPeriod}`}
        />
        <StatCard
          icon={<Calendar className="h-8 w-8 text-blue-500" />}
          title="Total Streak Days"
          value={analytics.overallStats.totalStreak}
          description="Across all habits"
        />
        <StatCard
          icon={<TrendingUp className="h-8 w-8 text-green-500" />}
          title="Total Activities"
          value={analytics.overallStats.totalActivities}
          description="Logged activities"
        />
      </div>

      {/* Habit Performance Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Habit Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3 font-semibold">Habit</th>
                <th className="pb-3 font-semibold">Completion Rate</th>
                <th className="pb-3 font-semibold">Trend</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {analytics.completionRates.map((habit) => (
                <tr key={habit.id} className="border-b border-gray-100">
                  <td className="py-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: habit.color }}></div>
                      <span>{habit.name}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full"
                        style={{
                          width: `${habit.completionRate}%`,
                          backgroundColor: habit.color,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 mt-1 inline-block">{habit.completionRate}%</span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center">
                      {habit.trend === "up" ? (
                        <TrendingUp size={16} className="text-green-500 mr-1" />
                      ) : (
                        <TrendingUp size={16} className="text-red-500 mr-1 transform rotate-180" />
                      )}
                      <span className={habit.trend === "up" ? "text-green-500" : "text-red-500"}>
                        {habit.trendValue}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        habit.completionRate >= 80
                          ? "bg-green-100 text-green-800"
                          : habit.completionRate >= 50
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {habit.completionRate >= 80
                        ? "Excellent"
                        : habit.completionRate >= 50
                          ? "Good"
                          : "Needs Improvement"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}





export default Reports
