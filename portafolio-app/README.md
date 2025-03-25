# Portfolio Analyzer

A web application for analyzing investment portfolios, built with React, Tailwind CSS, and Express.js.

## Features

- Enter up to 5 investment holdings with ticker symbols, quantities, and purchase details
- View comprehensive portfolio analysis including:
  - Portfolio summary with total value and returns
  - Asset allocation by type and sector
  - Performance charts comparing to market benchmarks
  - Risk metrics including Sharpe Ratio, Sortino Ratio, and Maximum Drawdown
  - Detailed holdings table

## Technologies Used

### Frontend
- React
- React Router for navigation
- Recharts for data visualization
- Tailwind CSS for styling
- Axios for API requests

### Backend
- Express.js
- Yahoo Finance API for financial data

## Project Structure

```
portafolio-app/
├── client/           # Frontend React application
│   ├── public/       # Static assets
│   └── src/          # Source code
│       ├── api/      # API service functions
│       ├── components/ # React components
│       ├── pages/    # Page components
│       └── utils/    # Utility functions
└── server/           # Backend Express application
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```
git clone <repository-url>
cd portafolio-app
```

2. Install backend dependencies:
```
cd server
npm install
```

3. Install frontend dependencies:
```
cd ../client
npm install
```

### Running the Application

1. Start the backend server:
```
cd server
npm run dev
```

2. Start the frontend development server:
```
cd ../client
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

1. On the homepage, enter your portfolio holdings information (ticker symbols, quantities, purchase prices)
2. Click "Analyze Portfolio" to view a comprehensive dashboard analysis
3. Explore different metrics and visualizations of your portfolio

## License

This project is licensed under the MIT License.

## Acknowledgements

- Data provided by Yahoo Finance
- Icons from various free resources 