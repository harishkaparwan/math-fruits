// src/components/SubtractionGame.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const FruitContainer = styled.div`
  margin: 20px 0;
`;

const Fruit = styled(motion.span)<{ crossed?: boolean }>`
  font-size: 24px;
  margin: 0 5px;
  text-decoration: ${props => props.crossed ? 'line-through' : 'none'};
  cursor: pointer;
`;

const SubtractionGame: React.FC = () => {
  const [num1] = useState(Math.floor(Math.random() * 3) + 4); // 4-6
  const [num2] = useState(Math.floor(Math.random() * (num1 - 1)) + 1);
  const [crossed, setCrossed] = useState<number[]>([]);
  // useEffect(() => {
  //     persistAtomToLocalStorage('questions', student.questions);
  //     persistAtomToLocalStorage('studentName', student.name);
  //   }, [isComplete]);
  const handleCross = (index: number) => {
    if (crossed.length < num2 && !crossed.includes(index)) {
      setCrossed([...crossed, index]);
    }
  };

  return (
    <div>
      <h2>Subtraction Game</h2>
      <p>{num1} - {num2} = ?</p>
      <FruitContainer>
        {Array(num1).fill('🍎').map((fruit, i) => (
          <Fruit
            key={i}
            crossed={crossed.includes(i)}
            onClick={() => handleCross(i)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {fruit}
          </Fruit>
        ))}
      </FruitContainer>
      <p>
        Cross out {num2} apples.{' '}
        {crossed.length === num2 && 
          `Answer: ${num1 - num2} ${crossed.length === num2 ? '✓' : ''}`}
      </p>
    </div>
  );
};

export default SubtractionGame;