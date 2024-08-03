import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 5001;

// Middleware to enable CORS and allow requests from http://localhost:5173
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get('/api/players', async (req, res) => {
  console.log('Received request for players data');
  try {
    const response = await axios.get('https://www.balldontlie.io/api/v1/players');
    console.log('Data fetched successfully');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
