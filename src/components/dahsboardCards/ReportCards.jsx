export const PeriodButton = ({ active, children, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-md text-sm font-medium ${
          active
            ? "bg-purple-100 text-purple-700 border border-purple-200"
            : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
        }`}
      >
        {children}
      </button>
    )
  }


export const StatCard = ({ icon, title, value, description }) => {
    return (
      <motion.div
        className="bg-white rounded-lg shadow-md p-6 flex items-center"
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <div className="bg-gray-100 p-3 rounded-full mr-4">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </motion.div>
    )
  }