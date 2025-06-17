import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Mail, Lock, User, Eye, EyeOff, BarChart3, Zap, Shield, Smartphone } from "lucide-react"
import { MobileFeatureItem, FeatureItem } from "../components/mobileFeatures/MobileFeatureItems"
import { useAuth } from "../contexts/AuthContext"
import api from "../services/api"

function Register(){
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
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

    setIsLoading(true)

    try {
      //API
      const response = await api.register(formData.name, formData.email, formData.password)
      // Save user data to local storage
      login(response.user, response.token)
      navigate("/dashboard")
    } catch (error) {
      setErrors({ submit: "Registration failed. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col lg:flex-row">
      

      {/* Left Side - Registration Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-12 order-2 lg:order-1">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center">
              <div className="bg-purple-600 text-white p-2 rounded-lg mr-2">
                <BarChart3 size={24} />
              </div>
              <span className="text-2xl font-bold text-gray-900 ">HabitFlow</span>
            </div>
          </div>

          <div className="bg-white  rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900  mb-2">Create Account</h2>
              <p className="text-gray-600  text-sm sm:text-base">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-purple-600 hover:text-purple-500 transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-red-200 rounded-lg p-4"
                >
                  <p className="text-red-700 text-sm">{errors.submit}</p>
                </motion.div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700  mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.name
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300  focus:border-purple-500 focus:ring-purple-500"
                    } rounded-lg shadow-sm placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors bg-white  text-gray-900 `}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-sm text-red-600"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300  focus:border-purple-500 focus:ring-purple-500"
                    } rounded-lg shadow-sm placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors bg-white  text-gray-900 `}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-sm text-red-600 "
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700  mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-10 py-3 border ${
                      errors.password
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300  focus:border-purple-500 focus:ring-purple-500"
                    } rounded-lg shadow-sm placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors bg-white  text-gray-900 `}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600  transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600  transition-colors" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-sm text-red-600"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-10 py-3 border ${
                      errors.confirmPassword
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300  focus:border-purple-500 focus:ring-purple-500"
                    } rounded-lg shadow-sm placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors bg-white  text-gray-900 `}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600  transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600  transition-colors" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-sm text-red-600"
                  >
                    {errors.confirmPassword}
                  </motion.p>
                )}
              </div>

              <div className="flex items-start">
                <input
                  id="agree-terms"
                  name="agree-terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300  rounded transition-colors mt-1"
                />
                <label htmlFor="agree-terms" className="ml-3 block text-sm text-gray-700 ">
                  I agree to the{" "}
                  <a href="#" className="text-purple-600 hover:text-purple-500 font-medium transition-colors">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-purple-600 hover:text-purple-500 font-medium transition-colors">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </div>

          {/* Mobile Features (shown only on mobile) */}
          <div className="lg:hidden mt-8 space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900  mb-4">Join HabitFlow Today</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <MobileFeatureItem
                icon={<Zap className="h-5 w-5" />}
                title="Quick Setup"
                description="Get started in minutes"
              />
              <MobileFeatureItem
                icon={<Shield className="h-5 w-5" />}
                title="Secure & Private"
                description="Your data is protected"
              />
              <MobileFeatureItem
                icon={<Smartphone className="h-5 w-5" />}
                title="Mobile Friendly"
                description="Access anywhere, anytime"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Features (Hidden on mobile, shown on desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 relative overflow-hidden order-1 lg:order-2">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col justify-center px-8 xl:px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center mb-8">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl mr-4">
                <BarChart3 size={32} />
              </div>
              <h1 className="text-3xl font-bold">HabitFlow</h1>
            </div>

            <h2 className="text-3xl font-bold mb-6 leading-tight">
              Start your journey to
              <br />
              <span className="text-indigo-200">better habits</span>
            </h2>

            <p className="text-lg text-indigo-100 mb-12 leading-relaxed">
              Join to be among those who are transforming their lives through consistent habit tracking and visual
              progress monitoring.
            </p>

            <div className="space-y-6">
              <FeatureItem
                icon={<Zap className="h-6 w-6" />}
                title="Quick Setup"
                description="Get started in minutes with our intuitive interface"
              />
              <FeatureItem
                icon={<Shield className="h-6 w-6" />}
                title="Secure & Private"
                description="Your data is encrypted and stored securely"
              />
              <FeatureItem
                icon={<Smartphone className="h-6 w-6" />}
                title="Mobile Friendly"
                description="Access your habits anywhere, anytime"
              />
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}




export default Register
