// Playercard.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Playercard = ({ players = [] }) => {
  if (!players.length) {
    return <div>No players found</div>;
  }

  return (
    <div>
      {players.map(player => (
        <div key={player.id}>
          <h2>{player.first_name} {player.last_name}</h2>
          {/* Display other player details as needed */}
        </div>
      ))}
    </div>
  );
};

Playercard.propTypes = {
  players: PropTypes.array
};

export default Playercard;
