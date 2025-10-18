import React, { useState } from 'react';
import styled from '@emotion/styled';

const GameContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  color: white;
  font-family: 'Comic Sans MS', cursive;
`;

const FruitDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  font-size: 3rem;
  gap: 20px;
`;

const Input = styled.input`
  font-size: 2rem;
  padding: 10px;
  border: none;
  border-radius: 10px;
  text-align: center;
  max-width: 100px;
  margin: 0 10px;
`;

const Button = styled.button`
  font-size: 1.5rem;
  padding: 15px 30px;
  background: linear-gradient(45deg, #ff6b6b, #ff8e53);
  border: none;
  border-radius: 25px;
  color: white;
  cursor: pointer;
  margin: 10px;
  
  &:hover {
    transform: scale(1.05);
    transition: all 0.2s ease;
  }
`;

const ScoreDisplay = styled.h2`
  font-size: 2rem;
  margin: 20px 0;
  color: #ffff00;
`;

const ResultMessage = styled.p`
  font-size: 1.5rem;
  margin: 10px 0;
  font-weight: bold;
`;

const AdditionGameAdvanced = () => {
  const [num1, setNum1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 10) + 1);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');

  const fruitEmojis = ['🍎', '🍌', '🍊', '🍇', '🍓', '🥝', '🍑', '🍒', '🥭', '🍍'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const userAnswer = parseInt(answer);
    const correctAnswer = num1 + num2;

    if (userAnswer === correctAnswer) {
      setScore(score + 1);
      setMessage('🎉 Correct! Well done!');
    } else {
      setMessage(`❌ Wrong! The correct answer is ${correctAnswer}`);
    }

    // Generate new numbers after a short delay
    setTimeout(() => {
      setNum1(Math.floor(Math.random() * 10) + 1);
      setNum2(Math.floor(Math.random() * 10) + 1);
      setAnswer('');
      setMessage('');
    }, 2000);
  };

  const resetGame = () => {
    setScore(0);
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setAnswer('');
    setMessage('');
  };

  return (
    <GameContainer>
      <h1>🍎 Advanced Addition Game 🍎</h1>
      <ScoreDisplay>Score: {score}</ScoreDisplay>
      
      <FruitDisplay>
        <span>
          {Array(num1).fill(0).map((_, i) => (
            <span key={i}>{fruitEmojis[i % fruitEmojis.length]}</span>
          ))}
        </span>
        <span style={{ fontSize: '2rem' }}>+</span>
        <span>
          {Array(num2).fill(0).map((_, i) => (
            <span key={i}>{fruitEmojis[(i + num1) % fruitEmojis.length]}</span>
          ))}
        </span>
        <span style={{ fontSize: '2rem' }}>=</span>
        <span>?</span>
      </FruitDisplay>

      <form onSubmit={handleSubmit}>
        <div>
          <span style={{ fontSize: '2rem' }}>{num1} + {num2} = </span>
          <Input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="?"
            required
          />
        </div>
        <Button type="submit">Check Answer</Button>
      </form>

      {message && <ResultMessage>{message}</ResultMessage>}
      
      <Button onClick={resetGame}>Reset Game</Button>
    </GameContainer>
  );
};

export default AdditionGameAdvanced;