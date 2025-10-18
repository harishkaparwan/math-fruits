// src/components/CountingTable.tsx
import React from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { TaskComponentProps } from './story/interface/AppProps';

const Grid = styled.div`
  display: grid;
  gap: 20px;
  margin-top: 20px;
`;

const FruitItem = styled(motion.div)`
  display: flex;
  gap: 5px;
`;

const CountingTable: React.FC<TaskComponentProps> = ({ onComplete }) => {
  const fruits = ['🍎', '🍌', '🍊', '🍇'];
  const handleFinish = () => {
    onComplete();
  };
  return (
    <div>
      <h2>Counting Table</h2>
      <Grid>
        {[1, 2, 3, 4].map((count) => (
          <div key={count}>
            <h3>Count by {count}</h3>
            {[1, 2, 3, 4, 5,6,7,8,9,10].map((num) => (
              <FruitItem
                key={num}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: num * 0.1 }}
              >
                {Array(num * count).fill(fruits[(count - 1) % 4]).map((fruit, i) => (
                  <span key={i}>{fruit}</span>
                ))}
                <span>= {num * count}</span>
              </FruitItem>
            ))}
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default CountingTable;