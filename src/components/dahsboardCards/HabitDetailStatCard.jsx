export const StatCard = ({ icon, title, value, description }) => {
    return (
      <div className="bg-gray-50 rounded-lg p-4 flex items-center">
        <div className="mr-4">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    )
  }
  