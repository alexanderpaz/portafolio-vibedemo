import { formatCurrency, formatPercentage } from '../../utils/formatters'

function PortfolioSummary({ summary }) {
  if (!summary) return null

  const profitLossColorClass = summary.totalProfitLoss >= 0 
    ? 'text-green-600' 
    : 'text-red-600'

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-semibold mb-4 text-primary">Portfolio Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Value</h3>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(summary.totalValue)}
          </p>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Profit/Loss</h3>
          <p className={`text-2xl font-bold ${profitLossColorClass}`}>
            {formatCurrency(summary.totalProfitLoss)}
          </p>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Return</h3>
          <p className={`text-2xl font-bold ${profitLossColorClass}`}>
            {formatPercentage(summary.totalProfitLossPercentage)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PortfolioSummary 