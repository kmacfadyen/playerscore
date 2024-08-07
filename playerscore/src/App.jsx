import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Playercard from './components/Playercard';

function App() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/players');
        console.log('API response:', response.data); // Check the structure of the response
        setPlayers(response.data.data || []);
        setFilteredPlayers(response.data.data || []); // Initialize filteredPlayers
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Search query:', searchQuery); // Log search query
    const results = players.filter(player =>
      `${player.first_name} ${player.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlayers(results);
    console.log('Filtered players:', results); // Log filtered results
  }, [searchQuery, players]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search players..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
        />
        <Playercard players={filteredPlayers} /> {/* Pass filtered players */}
      </div>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
      </div>
    </>
  );
}

export default App;
