import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PortfolioSummary from '../components/dashboard/PortfolioSummary'
import AssetAllocationChart from '../components/dashboard/AssetAllocationChart'
import PerformanceChart from '../components/dashboard/PerformanceChart'
import RiskMetricsTable from '../components/dashboard/RiskMetricsTable'
import HoldingsTable from '../components/dashboard/HoldingsTable'

function DashboardPage() {
  const navigate = useNavigate()
  const [portfolioData, setPortfolioData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    function fetchData() {
      try {
        // Get portfolio data and analysis from localStorage
        const storedData = localStorage.getItem('portfolioData')
        const storedAnalysis = localStorage.getItem('portfolioAnalysis')
        
        if (!storedData || !storedAnalysis) {
          navigate('/')
          return
        }
        
        const holdings = JSON.parse(storedData)
        const analysis = JSON.parse(storedAnalysis)
        
        setPortfolioData(analysis)
      } catch (err) {
        console.error('Error loading portfolio data:', err)
        setError('Failed to load portfolio data. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [navigate])
  
  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto max-w-md p-8 card">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-8"></div>
            <div className="h-40 w-full bg-gray-200 rounded"></div>
          </div>
          <p className="mt-4 text-primary">Analyzing your portfolio...</p>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="py-8">
        <div className="mx-auto max-w-md p-8 card border border-red-200">
          <h2 className="text-xl font-semibold mb-4 text-red-600">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            Return to Home
          </button>
        </div>
      </div>
    )
  }
  
  if (!portfolioData || !portfolioData.summary) {
    return (
      <div className="py-8">
        <div className="mx-auto max-w-md p-8 card">
          <h2 className="text-xl font-semibold mb-4 text-primary">No Portfolio Data</h2>
          <p className="text-gray-700 mb-4">
            Please enter your portfolio details to view the analysis.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            Enter Portfolio Data
          </button>
        </div>
      </div>
    )
  }
  
  const { summary, holdings } = portfolioData
  
  return (
    <div className="py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">
        Portfolio Dashboard
      </h1>
      
      <PortfolioSummary summary={summary} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <AssetAllocationChart 
          allocation={summary.assetAllocation} 
          title="Asset Type Allocation" 
        />
        <AssetAllocationChart 
          allocation={summary.sectorAllocation} 
          title="Sector Allocation" 
        />
      </div>
      
      <div className="mb-6">
        <PerformanceChart holdings={holdings} />
      </div>
      
      <div className="mb-6">
        <RiskMetricsTable summary={summary} />
      </div>
      
      <div>
        <HoldingsTable holdings={holdings} />
      </div>
      
      <div className="mt-8 text-center">
        <button 
          onClick={() => navigate('/')}
          className="btn btn-secondary"
        >
          Edit Portfolio
        </button>
      </div>
    </div>
  )
}

export default DashboardPage 