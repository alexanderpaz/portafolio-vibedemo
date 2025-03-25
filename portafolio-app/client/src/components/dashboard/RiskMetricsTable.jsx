import { formatPercentage } from '../../utils/formatters'

function RiskMetricsTable({ summary }) {
  if (!summary || !summary.riskMetrics) {
    return (
      <div className="card text-center p-8">
        <p className="text-gray-500">No risk metrics available</p>
      </div>
    )
  }
  
  const { riskMetrics } = summary
  
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-primary">Portfolio Risk Metrics</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Metric
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Interpretation
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Portfolio Volatility (Annual)
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatPercentage(riskMetrics.portfolioVolatility)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {interpretVolatility(riskMetrics.portfolioVolatility)}
              </td>
            </tr>
            
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Maximum Drawdown
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatPercentage(riskMetrics.averageMaxDrawdown)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {interpretDrawdown(riskMetrics.averageMaxDrawdown)}
              </td>
            </tr>
            
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Sharpe Ratio
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {riskMetrics.averageSharpeRatio.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {interpretSharpeRatio(riskMetrics.averageSharpeRatio)}
              </td>
            </tr>
            
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Sortino Ratio
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {riskMetrics.averageSortinoRatio.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {interpretSortinoRatio(riskMetrics.averageSortinoRatio)}
              </td>
            </tr>
            
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Treynor Ratio
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {riskMetrics.averageTreynorRatio.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {interpretTreynorRatio(riskMetrics.averageTreynorRatio)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Helper functions to interpret risk metrics
function interpretVolatility(volatility) {
  if (volatility < 10) return "Low volatility - relatively stable returns"
  if (volatility < 20) return "Moderate volatility - some fluctuations expected"
  return "High volatility - significant fluctuations expected"
}

function interpretDrawdown(drawdown) {
  if (drawdown < 10) return "Minimal drawdown - low historical price decline"
  if (drawdown < 20) return "Moderate drawdown - some historical price decline"
  return "Significant drawdown - large historical price decline"
}

function interpretSharpeRatio(ratio) {
  if (ratio < 0) return "Negative risk-adjusted returns"
  if (ratio < 1) return "Below average risk-adjusted returns"
  if (ratio < 2) return "Good risk-adjusted returns"
  return "Excellent risk-adjusted returns"
}

function interpretSortinoRatio(ratio) {
  if (ratio < 0) return "Negative downside risk-adjusted returns"
  if (ratio < 1) return "Below average downside risk-adjusted returns"
  if (ratio < 2) return "Good downside risk-adjusted returns"
  return "Excellent downside risk-adjusted returns"
}

function interpretTreynorRatio(ratio) {
  if (ratio < 0) return "Negative market risk-adjusted returns"
  if (ratio < 0.5) return "Below average market risk-adjusted returns"
  if (ratio < 1) return "Good market risk-adjusted returns"
  return "Excellent market risk-adjusted returns"
}

export default RiskMetricsTable 