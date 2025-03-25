const express = require('express');
const cors = require('cors');
const yahooFinance = require('yahoo-finance2').default;
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5200;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API to fetch stock data from Yahoo Finance
app.post('/api/portfolio/analyze', async (req, res) => {
  try {
    const { holdings } = req.body;
    console.log('Received portfolio holdings:', holdings);
    
    if (!holdings || !Array.isArray(holdings) || holdings.length === 0) {
      console.log('Invalid portfolio data received');
      return res.status(400).json({ error: 'Invalid portfolio data' });
    }
    
    const portfolioData = await Promise.all(
      holdings.map(async (holding) => {
        try {
          console.log(`Fetching data for ticker: ${holding.ticker}`);
          
          // Get quote data (current price and basic info)
          const quote = await yahooFinance.quote(holding.ticker);
          console.log(`Quote data received for ${holding.ticker}`);
          
          // Get historical data
          const historical = await yahooFinance.historical(holding.ticker, {
            period1: '2023-01-01',
            period2: new Date().toISOString().split('T')[0],
            interval: '1mo'
          });
          console.log(`Historical data received for ${holding.ticker}`);
          
          // Get company info
          const quoteSummary = await yahooFinance.quoteSummary(holding.ticker, {
            modules: ['assetProfile', 'summaryDetail', 'defaultKeyStatistics']
          });
          console.log(`Company info received for ${holding.ticker}`);
          
          const currentPrice = quote.regularMarketPrice;
          const historicalPrices = historical.map(h => ({
            date: h.date.getTime(),
            price: h.close
          }));
          
          // Calculate current value
          const currentValue = holding.quantity * currentPrice;
          
          // Calculate profit/loss
          const costBasis = holding.quantity * holding.purchasePrice;
          const profitLoss = currentValue - costBasis;
          const profitLossPercentage = (profitLoss / costBasis) * 100;
          
          // Calculate historical returns
          const returns = [];
          for (let i = 1; i < historical.length; i++) {
            const monthlyReturn = ((historical[i].close - historical[i-1].close) / historical[i-1].close) * 100;
            returns.push({
              timestamp: historical[i].date.getTime(),
              return: monthlyReturn
            });
          }
          
          // Calculate volatility
          const avgReturn = returns.reduce((sum, r) => sum + r.return, 0) / returns.length;
          const squaredDiffs = returns.map(r => Math.pow(r.return - avgReturn, 2));
          const avgSquaredDiff = squaredDiffs.reduce((sum, val) => sum + val, 0) / squaredDiffs.length;
          const volatility = Math.sqrt(avgSquaredDiff);
          const annualizedVolatility = volatility * Math.sqrt(12);
          
          // Calculate max drawdown
          let maxDrawdown = 0;
          let peak = historical[0].close;
          
          for (const record of historical) {
            if (record.close > peak) {
              peak = record.close;
            }
            const drawdown = (peak - record.close) / peak;
            if (drawdown > maxDrawdown) {
              maxDrawdown = drawdown;
            }
          }
          
          // Calculate risk metrics
          const riskFreeRate = 0.05;
          const annualizedReturn = avgReturn * 12;
          const sharpeRatio = (annualizedReturn - riskFreeRate) / annualizedVolatility;
          
          // Calculate Sortino ratio
          const negativeReturns = returns.filter(r => r.return < 0);
          const downSideDeviation = negativeReturns.length > 0
            ? Math.sqrt(negativeReturns.map(r => Math.pow(r.return, 2)).reduce((sum, val) => sum + val, 0) / negativeReturns.length) * Math.sqrt(12)
            : 0.0001;
          
          const sortinoRatio = (annualizedReturn - riskFreeRate) / downSideDeviation;
          const treynorRatio = (annualizedReturn - riskFreeRate) / 1.0;
          
          const assetProfile = quoteSummary.assetProfile || {};
          
          return {
            ticker: holding.ticker,
            purchaseDate: holding.purchaseDate,
            quantity: holding.quantity,
            purchasePrice: holding.purchasePrice,
            currentPrice,
            currentValue,
            profitLoss,
            profitLossPercentage,
            assetType: assetProfile.fundFamily ? 'ETF' : 'Stock',
            sector: assetProfile.sector || 'N/A',
            industry: assetProfile.industry || 'N/A',
            country: assetProfile.country || 'Global',
            historicalPrices,
            historicalReturns: returns,
            riskMetrics: {
              volatility: annualizedVolatility,
              maxDrawdown: maxDrawdown * 100,
              sharpeRatio,
              sortinoRatio,
              treynorRatio
            }
          };
        } catch (error) {
          console.error(`Error fetching data for ${holding.ticker}:`, error.message);
          return {
            ticker: holding.ticker,
            error: `Could not fetch data: ${error.message}`,
            purchaseDate: holding.purchaseDate,
            quantity: holding.quantity,
            purchasePrice: holding.purchasePrice,
          };
        }
      })
    );
    
    // Calculate portfolio summary
    const portfolioSummary = calculatePortfolioSummary(portfolioData);
    
    res.json({
      holdings: portfolioData,
      summary: portfolioSummary
    });
  } catch (error) {
    console.error('Error analyzing portfolio:', error);
    res.status(500).json({ error: 'Error analyzing portfolio' });
  }
});

// Helper function to calculate portfolio summary
function calculatePortfolioSummary(holdings) {
  const validHoldings = holdings.filter(h => !h.error);
  
  if (validHoldings.length === 0) {
    return {
      totalValue: 0,
      totalProfitLoss: 0,
      totalProfitLossPercentage: 0,
      assetAllocation: {},
      sectorAllocation: {},
      regionAllocation: {},
      riskMetrics: {
        portfolioVolatility: 0,
        averageMaxDrawdown: 0,
        averageSharpeRatio: 0,
        averageSortinoRatio: 0,
        averageTreynorRatio: 0
      }
    };
  }
  
  const totalValue = validHoldings.reduce((sum, h) => sum + h.currentValue, 0);
  const totalProfitLoss = validHoldings.reduce((sum, h) => sum + h.profitLoss, 0);
  const totalCostBasis = validHoldings.reduce((sum, h) => sum + (h.purchasePrice * h.quantity), 0);
  const totalProfitLossPercentage = (totalProfitLoss / totalCostBasis) * 100;
  
  const assetAllocation = validHoldings.reduce((acc, h) => {
    const type = h.assetType || 'Other';
    acc[type] = (acc[type] || 0) + h.currentValue;
    return acc;
  }, {});
  
  Object.keys(assetAllocation).forEach(key => {
    assetAllocation[key] = (assetAllocation[key] / totalValue) * 100;
  });
  
  const sectorAllocation = validHoldings.reduce((acc, h) => {
    const sector = h.sector || 'Other';
    acc[sector] = (acc[sector] || 0) + h.currentValue;
    return acc;
  }, {});
  
  Object.keys(sectorAllocation).forEach(key => {
    sectorAllocation[key] = (sectorAllocation[key] / totalValue) * 100;
  });
  
  const regionAllocation = validHoldings.reduce((acc, h) => {
    const region = h.country || 'Global';
    acc[region] = (acc[region] || 0) + h.currentValue;
    return acc;
  }, {});
  
  Object.keys(regionAllocation).forEach(key => {
    regionAllocation[key] = (regionAllocation[key] / totalValue) * 100;
  });
  
  const portfolioVolatility = validHoldings.reduce((sum, h) => 
    sum + (h.riskMetrics?.volatility || 0) * (h.currentValue / totalValue), 0);
  
  const averageMaxDrawdown = validHoldings.reduce((sum, h) => 
    sum + (h.riskMetrics?.maxDrawdown || 0), 0) / validHoldings.length;
  
  const averageSharpeRatio = validHoldings.reduce((sum, h) => 
    sum + (h.riskMetrics?.sharpeRatio || 0), 0) / validHoldings.length;
  
  const averageSortinoRatio = validHoldings.reduce((sum, h) => 
    sum + (h.riskMetrics?.sortinoRatio || 0), 0) / validHoldings.length;
  
  const averageTreynorRatio = validHoldings.reduce((sum, h) => 
    sum + (h.riskMetrics?.treynorRatio || 0), 0) / validHoldings.length;
  
  return {
    totalValue,
    totalProfitLoss,
    totalProfitLossPercentage,
    assetAllocation,
    sectorAllocation,
    regionAllocation,
    riskMetrics: {
      portfolioVolatility,
      averageMaxDrawdown,
      averageSharpeRatio,
      averageSortinoRatio,
      averageTreynorRatio
    }
  };
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 