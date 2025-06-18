import { Link } from "react-router-dom"

export const MobileNavLink = ({ to, children, active, onClick }) => {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
          active
            ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20"
            : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
        }`}
      >
        {children}
      </Link>
    )
  }

  //hello