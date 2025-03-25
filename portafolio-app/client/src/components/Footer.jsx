function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-primary-dark text-white py-6 mt-auto">
      <div className="app-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {currentYear} Portfolio Analyzer. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-300 hover:text-secondary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-secondary transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 