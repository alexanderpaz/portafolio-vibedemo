import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { analyzePortfolio } from '../api/portfolioService'

const emptyHolding = {
  ticker: '',
  quantity: '',
  purchasePrice: '',
  purchaseDate: ''
}

function PortfolioForm() {
  const navigate = useNavigate()
  const [holdings, setHoldings] = useState([{ ...emptyHolding }])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const addHolding = () => {
    if (holdings.length < 5) {
      setHoldings([...holdings, { ...emptyHolding }])
    }
  }

  const removeHolding = (index) => {
    if (holdings.length > 1) {
      const newHoldings = [...holdings]
      newHoldings.splice(index, 1)
      setHoldings(newHoldings)
    }
  }

  const handleChange = (index, field, value) => {
    const newHoldings = [...holdings]
    newHoldings[index][field] = value
    setHoldings(newHoldings)
  }

  const validateForm = () => {
    // Filter out empty holdings
    const filledHoldings = holdings.filter(holding => 
      holding.ticker && holding.quantity && holding.purchasePrice
    )
    
    if (filledHoldings.length === 0) {
      setError('Please fill in at least one holding')
      return false
    }
    
    // Check each filled holding for valid values
    for (const holding of filledHoldings) {
      if (!holding.ticker.trim()) {
        setError('Ticker symbol cannot be empty')
        return false
      }
      
      if (isNaN(holding.quantity) || parseFloat(holding.quantity) <= 0) {
        setError('Quantity must be a positive number')
        return false
      }
      
      if (isNaN(holding.purchasePrice) || parseFloat(holding.purchasePrice) <= 0) {
        setError('Purchase price must be a positive number')
        return false
      }
    }
    
    setError(null)
    return filledHoldings
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validHoldings = validateForm()
    if (!validHoldings) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      // Make API call to analyze portfolio
      const response = await analyzePortfolio(validHoldings)
      
      // Store the portfolio data and analysis results in localStorage
      localStorage.setItem('portfolioData', JSON.stringify(validHoldings))
      localStorage.setItem('portfolioAnalysis', JSON.stringify(response))
      
      // Navigate to the dashboard page
      navigate('/dashboard')
    } catch (err) {
      setError('Failed to load portfolio data. Please try again.')
      console.error('Error analyzing portfolio:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-primary">Enter Your Portfolio Holdings</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {holdings.map((holding, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Holding #{index + 1}</h3>
              {holdings.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => removeHolding(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Ticker Symbol</label>
                <input
                  type="text"
                  value={holding.ticker}
                  onChange={(e) => handleChange(index, 'ticker', e.target.value.toUpperCase())}
                  placeholder="e.g., AAPL"
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  value={holding.quantity}
                  onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                  placeholder="e.g., 10"
                  className="input-field"
                  min="0.001"
                  step="0.001"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Purchase Price</label>
                <input
                  type="number"
                  value={holding.purchasePrice}
                  onChange={(e) => handleChange(index, 'purchasePrice', e.target.value)}
                  placeholder="e.g., 150.50"
                  className="input-field"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Purchase Date</label>
                <input
                  type="date"
                  value={holding.purchaseDate}
                  onChange={(e) => handleChange(index, 'purchaseDate', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex justify-between mt-4">
          {holdings.length < 5 && (
            <button
              type="button"
              onClick={addHolding}
              className="btn bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              Add Holding
            </button>
          )}
          
          <button
            type="submit"
            className="btn btn-primary ml-auto"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Analyze Portfolio'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PortfolioForm 