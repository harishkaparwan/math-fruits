import React from 'react';
import AdditionGameComponent from '../../src/components/AdditionGame';

const AdditionGame = () => {
  return (
    <div className="game-container">
      <h1 className="game-title">Addition Game</h1>
      <AdditionGameComponent onComplete={() => {}} />
    </div>
  );
};

export default AdditionGame;