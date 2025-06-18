import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

// frontend pages
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"

// dashboards pages
import Dashboard from "./dashboard/Dashboard"
import CreateHabit from "./dashboard/CreateHabit"
import HabitDetail from "./dashboard/HabitDetail"
import Settings from "./dashboard/Settings"
import Reports from "./dashboard/Reports"

//components
import Navbar from "./components/Navbar"

// auth
import { AuthProvider } from "./contexts/AuthContext"
import ProtectedRoute from "./contexts/ProtectedRoute"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/dashboard/create-habit" element={<CreateHabit/>}/>


          <Route
                    path="/reports"
                    element={
                        <Reports />
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                        <Settings />
                    }
                  />
        </Routes>
      </AuthProvider>
    </Router>


    //   <Router>
    //         <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    //           <Navbar />
    //           <AnimatePresence mode="wait">
    //             <Routes>
    //               <Route path="/" element={<HomePage />} />
    //               <Route path="/login" element={<Login />} />
    //               <Route path="/register" element={<Register />} />
    //               <Route path="/forgot-password" element={<ForgotPassword />} />
    //               <Route
    //                 path="/dashboard"
    //                 element={
    //                   <ProtectedRoute>
    //                     <Dashboard />
    //                   </ProtectedRoute>
    //                 }
    //               />
    //               <Route
    //                 path="/create-habit"
    //                 element={
    //                   <ProtectedRoute>
    //                     <CreateHabit />
    //                   </ProtectedRoute>
    //                 }
    //               />
    //               <Route
    //                 path="/habit/:id"
    //                 element={
    //                   <ProtectedRoute>
    //                     <HabitDetail />
    //                   </ProtectedRoute>
    //                 }
    //               />
    //               <Route
    //                 path="/reports"
    //                 element={
    //                   <ProtectedRoute>
    //                     <Reports />
    //                   </ProtectedRoute>
    //                 }
    //               />
    //               <Route
    //                 path="/settings"
    //                 element={
    //                   <ProtectedRoute>
    //                     <Settings />
    //                   </ProtectedRoute>
    //                 }
    //               />
    //             </Routes>
    //           </AnimatePresence>
    //         </div>
    //   </Router>
  )
}

export default App
