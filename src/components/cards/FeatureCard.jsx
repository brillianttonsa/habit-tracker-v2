import { motion } from "framer-motion"

export const FeatureCard = ({ icon, title, description }) => {
    return (
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </motion.div>
    )
  }