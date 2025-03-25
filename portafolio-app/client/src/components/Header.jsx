import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="app-container py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-2xl font-bold mb-4 md:mb-0">
          <Link to="/" className="flex items-center">
            <span className="text-secondary mr-2">📊</span>
            Portfolio Analyzer
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-secondary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-secondary transition-colors">
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header 