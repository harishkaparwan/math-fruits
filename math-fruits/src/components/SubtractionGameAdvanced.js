import React, { useState } from 'react';
import styled from '@emotion/styled';

const GameContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
  border-radius: 15px;
  color: #333;
  font-family: 'Comic Sans MS', cursive;
`;

const FruitDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  font-size: 3rem;
  gap: 20px;
  flex-wrap: wrap;
`;

const CrossedFruit = styled.span`
  position: relative;
  display: inline-block;
  
  ${props => props.crossed && `
    &::after {
      content: '❌';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.5rem;
    }
  `}
`;

const Input = styled.input`
  font-size: 2rem;
  padding: 10px;
  border: 2px solid #ff6b6b;
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
  color: #e91e63;
`;

const ResultMessage = styled.p`
  font-size: 1.5rem;
  margin: 10px 0;
  font-weight: bold;
`;

const SubtractionGameAdvanced = () => {
  const [num1, setNum1] = useState(Math.floor(Math.random() * 10) + 5);
  const [num2, setNum2] = useState(Math.floor(Math.random() * num1) + 1);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');

  const fruitEmojis = ['🍎', '🍌', '🍊', '🍇', '🍓', '🥝', '🍑', '🍒', '🥭', '🍍'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const userAnswer = parseInt(answer);
    const correctAnswer = num1 - num2;

    if (userAnswer === correctAnswer) {
      setScore(score + 1);
      setMessage('🎉 Excellent! That\'s correct!');
    } else {
      setMessage(`❌ Not quite! The correct answer is ${correctAnswer}`);
    }

    // Generate new numbers after a short delay
    setTimeout(() => {
      const newNum1 = Math.floor(Math.random() * 10) + 5;
      const newNum2 = Math.floor(Math.random() * newNum1) + 1;
      setNum1(newNum1);
      setNum2(newNum2);
      setAnswer('');
      setMessage('');
    }, 2000);
  };

  const resetGame = () => {
    setScore(0);
    const newNum1 = Math.floor(Math.random() * 10) + 5;
    const newNum2 = Math.floor(Math.random() * newNum1) + 1;
    setNum1(newNum1);
    setNum2(newNum2);
    setAnswer('');
    setMessage('');
  };

  return (
    <GameContainer>
      <h1>🍓 Advanced Subtraction Game 🍓</h1>
      <ScoreDisplay>Score: {score}</ScoreDisplay>
      
      <FruitDisplay>
        <div>
          {Array(num1).fill(0).map((_, i) => (
            <CrossedFruit key={i} crossed={i >= (num1 - num2)}>
              {fruitEmojis[i % fruitEmojis.length]}
            </CrossedFruit>
          ))}
        </div>
      </FruitDisplay>

      <p style={{ fontSize: '1.2rem', margin: '10px 0' }}>
        We had {num1} fruits, then {num2} were taken away!
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <span style={{ fontSize: '2rem' }}>{num1} - {num2} = </span>
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
      
      <Button onClick={resetGame}>New Problem</Button>
    </GameContainer>
  );
};

export default SubtractionGameAdvanced;