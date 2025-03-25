import axios from 'axios';

const API_URL = '/api';

export const analyzePortfolio = async (holdings) => {
  try {
    console.log('Sending portfolio holdings to API:', holdings);
    const response = await axios.post(`${API_URL}/portfolio/analyze`, { holdings });
    console.log('Received portfolio analysis:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error analyzing portfolio:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
    throw error;
  }
};

export const healthCheck = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`);
    return response.data;
  } catch (error) {
    console.error('API health check failed:', error);
    throw error;
  }
}; 