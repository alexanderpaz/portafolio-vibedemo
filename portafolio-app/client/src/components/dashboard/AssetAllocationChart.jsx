import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { formatPercentage } from '../../utils/formatters'

// Custom colors for the pie chart
const COLORS = ['#0A2647', '#144272', '#205295', '#2C74B3', '#5BD6A2', '#8EEDC7', '#A6F4D2', '#C8FFE0'];

function AssetAllocationChart({ allocation, title }) {
  if (!allocation || Object.keys(allocation).length === 0) {
    return (
      <div className="card text-center p-8">
        <p className="text-gray-500">No allocation data available</p>
      </div>
    )
  }
  
  // Transform the allocation object into an array for Recharts
  const data = Object.entries(allocation).map(([name, value], index) => ({
    name,
    value,
    color: COLORS[index % COLORS.length]
  }));
  
  // Custom tooltip formatter
  const renderTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      return (
        <div className="bg-white p-2 shadow-md rounded border">
          <p className="font-medium">{item.name}</p>
          <p className="text-primary">
            {formatPercentage(item.value)}
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-primary">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={renderTooltip} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AssetAllocationChart 