import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { CheckCircle, TrendingUp, Award, Calendar, BarChart3, FileSpreadsheet } from "lucide-react"
import { FeatureCard } from "../components/cards/FeatureCard";
import { StepCard } from "../components/cards/StepCard";

function HomePage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Track Habits, Visualize Progress
              </motion.h1>
              <motion.p
                className="text-xl mb-8"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                HabitFlow helps you build better habits through visual tracking, streak rewards, and weekly insights.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to="/register"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg text-center"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="bg-transparent border border-white hover:bg-white/10 font-medium py-3 px-6 rounded-lg text-center"
                >
                  Login
                </Link>
              </motion.div>
            </div>
            <motion.div
              className="md:w-1/2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <img
                src="/habitTracker.png"
                alt="HabitFlow Dashboard Preview"
                className="rounded-full shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-16"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            Key Features
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<CheckCircle className="h-10 w-10 text-purple-500" />}
              title="Custom Habit Tracking"
              description="Create and track any habit that matters to you - from reading and exercise to meditation and water intake."
            />
            <FeatureCard
              icon={<TrendingUp className="h-10 w-10 text-purple-500" />}
              title="Visual Progress Graphs"
              description="Watch your progress unfold with beautiful Pixela graphs that update automatically when you log your activity."
            />
            <FeatureCard
              icon={<Award className="h-10 w-10 text-purple-500" />}
              title="Streak Rewards"
              description="Stay motivated with streak tracking and milestone celebrations that reward your consistency."
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-purple-500" />}
              title="Daily Check-ins"
              description="Simple, quick daily check-ins make logging your habits effortless and sustainable."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-purple-500" />}
              title="Weekly Reports"
              description="Receive personalized weekly reports analyzing your habits and suggesting improvements."
            />
            <FeatureCard
              icon={<FileSpreadsheet className="h-10 w-10 text-purple-500" />}
              title="Google Sheets Integration"
              description="Export your habit data to Google Sheets for deeper analysis and record-keeping."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-16"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            How HabitFlow Works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StepCard
              number="1"
              title="Create Habits"
              description="Define the habits you want to track and set your goals and frequency."
            />
            <StepCard
              number="2"
              title="Log Daily"
              description="Check in daily to log your progress and maintain your streaks."
            />
            <StepCard
              number="3"
              title="Visualize Growth"
              description="Watch your progress graphs grow and receive insights about your habits."
            />
          </div>
        </div>
      </section>

      {/* Section */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Habits?
          </motion.h2>
          <motion.p
            className="text-xl mb-10 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Join to be building better habits and achieving your goals with HabitFlow.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/register"
              className="bg-white text-purple-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg inline-block"
            >
              Start Free Trial
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">HabitFlow</h3>
              <p className="text-gray-400 max-w-xs">
                Building better habits through visual tracking and consistent motivation.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Guides
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Pricing
                    </a>
                  </li>
                  
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      +255683208698
                    </a>
                  </li>
                  <li>
                    <a href="mailto:abdullatifmnyamis@gmail.com" className="text-gray-400 hover:text-white">
                      abdullatifmnyamis@gmail.com
                    </a>
                  </li>
                
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} HabitFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </motion.div>
  )
}




export default HomePage
