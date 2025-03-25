import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function PerformanceChart({ holdings }) {
  if (!holdings || holdings.length === 0) {
    return (
      <div className="card text-center p-8">
        <p className="text-gray-500">No performance data available</p>
      </div>
    )
  }
  
  // Find the earliest date across all holdings
  const allDates = holdings.flatMap(holding => 
    holding.historicalPrices?.map(point => point.date) || []
  ).sort();
  
  const startDate = allDates[0];
  
  // Normalize all prices to start from 100 (percentage of initial value)
  const normalizedData = {};
  
  holdings.forEach(holding => {
    if (holding.historicalPrices && holding.historicalPrices.length > 0) {
      const initialPrice = holding.historicalPrices[0].price;
      
      holding.historicalPrices.forEach(point => {
        const date = new Date(point.date).toISOString().split('T')[0];
        
        if (!normalizedData[date]) {
          normalizedData[date] = {
            date,
          };
        }
        
        // Calculate the percentage change from the initial price
        const normalizedPrice = (point.price / initialPrice) * 100;
        normalizedData[date][holding.ticker] = normalizedPrice;
      });
    }
  });
  
  // Convert to array and sort by date
  const chartData = Object.values(normalizedData).sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );
  
  // Generate lines for each holding
  const lines = holdings.map((holding, index) => (
    <Line 
      key={holding.ticker}
      type="monotone"
      dataKey={holding.ticker}
      stroke={getLineColor(index)}
      strokeWidth={2}
      dot={false}
      activeDot={{ r: 6 }}
    />
  ));
  
  // Add S&P 500 benchmark (placeholder - would be replaced with actual S&P 500 data)
  // This is just for demonstration purposes
  chartData.forEach((dataPoint, i) => {
    // Simple mockup of S&P 500 performance with some variation
    dataPoint['S&P 500'] = 100 + (i * 0.5) + (Math.sin(i) * 5);
  });
  
  lines.push(
    <Line 
      key="benchmark"
      type="monotone"
      dataKey="S&P 500"
      stroke="#888888"
      strokeWidth={2}
      strokeDasharray="5 5"
      dot={false}
    />
  );
  
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-primary">Performance Over Time</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date"
              tickFormatter={tick => new Date(tick).toLocaleDateString()}
            />
            <YAxis 
              label={{ value: 'Value (indexed to 100)', angle: -90, position: 'insideLeft' }}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Tooltip 
              formatter={(value) => [`${value.toFixed(2)}%`, 'Value']}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Legend />
            {lines}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// Helper function to get different colors for lines
function getLineColor(index) {
  const colors = ['#0A2647', '#144272', '#205295', '#2C74B3', '#5BD6A2', '#8EEDC7'];
  return colors[index % colors.length];
}

export default PerformanceChart 