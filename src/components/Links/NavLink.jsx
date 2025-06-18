import { Link } from "react-router-dom"

export const NavLink = ({ to, children, active }) => {
    return (
      <Link
        to={to}
        className={`text-sm font-medium transition-colors duration-200 ${
          active
            ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400 pb-1"
            : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        {children}
      </Link>
    )
  }