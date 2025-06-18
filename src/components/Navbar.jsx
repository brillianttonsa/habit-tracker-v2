import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Menu, X, User, LogOut, Settings, BarChart3 } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { NavLink } from "./Links/NavLink"
import { MobileNavLink } from "./Links/MobileNavLink"

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  let { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  user = "tonsa" // For testing purposes, you can remove this line in production

  const handleLogout = () => {
    logout()
    navigate("/")
    setIsUserMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="bg-purple-600 text-white p-2 rounded-lg mr-2">
              <BarChart3 size={20} />
            </div>
            <span className="text-xl font-bold text-gray-900">HabitFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <NavLink to="/dashboard" active={isActive("/dashboard")}>
                  Dashboard
                </NavLink>
                <NavLink to="/reports" active={isActive("/reports")}>
                  Reports
                </NavLink>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none transition-colors duration-200"
                  >
                    <div className="bg-purple-100 text-purple-600 p-2 rounded-full">
                      <User size={16} />
                    </div>
                    <span className="ml-2 text-sm font-medium">{user.name}</span>
                  </button>

                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                    >
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings size={16} className="mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <LogOut size={16} className="mr-2" />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login" active={isActive("/login")}>
                  Login
                </NavLink>
                <Link
                  to="/register"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            {user ? (
              <div className="space-y-2">
                <MobileNavLink to="/dashboard" active={isActive("/dashboard")} onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </MobileNavLink>
                <MobileNavLink to="/reports" active={isActive("/reports")} onClick={() => setIsMenuOpen(false)}>
                  Reports
                </MobileNavLink>
                <MobileNavLink to="/settings" active={isActive("/settings")} onClick={() => setIsMenuOpen(false)}>
                  Settings
                </MobileNavLink>

                <button
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <MobileNavLink to="/login" active={isActive("/login")} onClick={() => setIsMenuOpen(false)}>
                  Login
                </MobileNavLink>
                <MobileNavLink to="/register" active={isActive("/register")} onClick={() => setIsMenuOpen(false)}>
                  Get Started
                </MobileNavLink>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Overlay for user menu */}
      {isUserMenuOpen && <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)}></div>}
    </nav>
  )
}

export default Navbar
