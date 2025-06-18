import { motion } from "framer-motion"

export const MobileFeatureItem = ({ icon, title, description }) => (
    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 ">
      <div className="flex-shrink-0 bg-purple-100  p-2 rounded-lg text-purple-600 ">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-gray-900  text-sm">{title}</h4>
        <p className="text-gray-600 text-xs">{description}</p>
      </div>
    </div>
)

export const FeatureItem = ({ icon, title, description }) => (
  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex items-start space-x-4">
    <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm p-2 rounded-lg">{icon}</div>
    <div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-purple-100">{description}</p>
    </div>
  </motion.div>
)