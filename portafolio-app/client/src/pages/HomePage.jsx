import PortfolioForm from '../components/PortfolioForm'

function HomePage() {
  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Portfolio Analysis Tool
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Enter your investment portfolio details to get comprehensive analysis including 
          risk metrics, performance insights, and allocation breakdowns.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <PortfolioForm />
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-4xl text-secondary mb-3">📊</div>
          <h3 className="text-lg font-semibold text-primary mb-2">Portfolio Dashboard</h3>
          <p className="text-gray-600">
            View your portfolio's current value and asset distribution with interactive charts.
          </p>
        </div>
        
        <div className="card text-center">
          <div className="text-4xl text-secondary mb-3">📈</div>
          <h3 className="text-lg font-semibold text-primary mb-2">Performance Analysis</h3>
          <p className="text-gray-600">
            Track your returns against major indices and visualize historical performance.
          </p>
        </div>
        
        <div className="card text-center">
          <div className="text-4xl text-secondary mb-3">⚖️</div>
          <h3 className="text-lg font-semibold text-primary mb-2">Risk Assessment</h3>
          <p className="text-gray-600">
            Evaluate portfolio risk with metrics like Sharpe Ratio, volatility, and maximum drawdown.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage 