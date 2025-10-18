// src/components/AdditionGame.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { TaskComponentProps } from './story/interface/AppProps';

const Form = styled.div`
  margin-top: 20px;
`;

const FruitDisplay = styled(motion.div)`
  display: flex;
  gap: 5px;
  margin: 10px 0;
`;

const AdditionGame: React.FC<TaskComponentProps> = ({ onComplete }) => {
  const [num1] = useState(Math.floor(Math.random() * 5) + 1);
  const [num2] = useState(Math.floor(Math.random() * (9 - num1)) + 1);
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const handleFinish = () => {
    // Logic to determine task completion
    onComplete(); // Call this when the student completes the task
  };
  const checkAnswer = () => {
    const correctAnswer = num1 + num2;
    setIsCorrect(parseInt(answer) === correctAnswer);
  };

  return (
    <div>
      <h2>Addition Game</h2>
      <Form>
        <FruitDisplay>
          {Array(num1).fill('🍎').map((fruit, i) => (
            <motion.span
              key={`apple-${i}`}
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {fruit}
            </motion.span>
          ))}
          <span>+</span>
          {Array(num2).fill('🍌').map((fruit, i) => (
            <motion.span
              key={`banana-${i}`}
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: (i + num1) * 0.1 }}
            >
              {fruit}
            </motion.span>
          ))}
        </FruitDisplay>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          max={9}
        />
        <button onClick={checkAnswer}>Check</button>
        {isCorrect !== null && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {isCorrect ? 'Correct! 🎉' : `Wrong! It's ${num1 + num2}`}
          </motion.p>
        )}
      </Form>
    </div>
  );
};

export default AdditionGame;