import axios from "axios"

// API Configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL
  || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
})

// Request interceptor to add auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    throw new Error(error.response?.data?.error || error.message)
  },
)

class ApiService {
  // Authentication
  async login(credentials) {
    return apiClient.post("/auth/login", credentials)
  }

  async register(userData) {
    return apiClient.post("/auth/register", userData)
  }

  //forget-password
  async requestPasswordReset(email) {
    return apiClient.post("/auth/forgot-password", { email })
  }

  // Habits
  async getHabits() {
    return apiClient.get("/habits")
  }

  async getHabit(id) {
    return apiClient.get(`/habits/${id}`)
  }

  async createHabit(habitData) {
    return apiClient.post("/habits", habitData)
  }

  async updateHabit(id, habitData) {
    return apiClient.put(`/habits/${id}`, habitData)
  }

  async deleteHabit(id) {
    return apiClient.delete(`/habits/${id}`)
  }

  async logHabit(id, logData) {
    return apiClient.post(`/habits/${id}/log`, logData)
  }

  // Analytics
  async getAnalytics(period = "week") {
    return apiClient.get(`/analytics?period=${period}`)
  }

  // User Settings
  async getUserSettings() {
    return apiClient.get("/user/settings")
  }

  async updateSettings(settings) {
    return apiClient.put("/user/settings", settings)
  }
}

export default new ApiService()
