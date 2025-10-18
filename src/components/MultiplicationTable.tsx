// src/components/MultiplicationTable.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { useAtom } from 'jotai';
import { answersAtom, attemptsAtom, correctCountAtom, isCompleteAtom, countByNumberAtom } from './MultiplicationForm';
import { TaskComponentProps } from './story/interface/AppProps';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  max-width: 600px;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  font-size: 20px;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  font-size: 20px;
`;

const Input = styled.input`
  width: 100px;
  height: 40px;
  font-size: 20px;
  padding: 5px;
  border: 2px solid #4CAF50;
  border-radius: 5px;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: textfield;
  &:focus {
    outline: none;
    border-color: #45a049;
  }
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const CheckButton = styled(motion.button)`
  padding: 8px 16px;
  font-size: 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
`;

const CelebrationOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Feedback = styled(motion.div)`
  font-size: 40px;
`;
const GameContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  margin: 20px auto;
`;

const GameTitle = styled.h2`
  color: #333;
  font-family: Arial, sans-serif;
  margin-bottom: 20px;
`;

const FlashButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color:rgb(175, 76, 94);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  /* Flashing text effect */
  span {
    animation: flash 1.5s infinite;
  }

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #3d8b40;
  }

  @keyframes flash {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.2;
    }
    100% {
      opacity: 1;
    }
  }
`;
const MultiplicationTable: React.FC<TaskComponentProps> = ({ onComplete }) =>  {
  const [answers, setAnswers] = useAtom(answersAtom);
  const [attempts, setAttempts] = useAtom(attemptsAtom);
  const [correctCount, setCorrectCount] = useAtom(correctCountAtom);
  const [isComplete, setIsComplete] = useAtom(isCompleteAtom);
  const [countByNumber] = useAtom(countByNumberAtom);
  const [showCelebration, setShowCelebration] = React.useState<boolean[]>(Array(10).fill(false));
  const [showWrong, setShowWrong] = React.useState<boolean[]>(Array(10).fill(false));
  const handleFinish = () => {
    onComplete();
  };
  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const checkAnswer = (index: number) => {
    const correctAnswer = countByNumber * (index + 1);
    const userAnswer = parseInt(answers[index]) || 0;
    const newAttempts = [...attempts];
    newAttempts[index] += 1;
    setAttempts(newAttempts);

    if (userAnswer === correctAnswer) {
      const newCelebration = [...showCelebration];
      newCelebration[index] = true;
      setShowCelebration(newCelebration);
      setCorrectCount(prev => prev + (attempts[index] === 0 ? 1 : 0)); // Increment only on first correct attempt
      setTimeout(() => {
        const resetCelebration = [...showCelebration];
        resetCelebration[index] = false;
        setShowCelebration(resetCelebration);
        // Check if all rows are correctly answered
        if (answers.every((ans, i) => parseInt(ans) === countByNumber * (i + 1))) {
          setIsComplete(true);
        }
      }, 3000);
    } else {
      const newWrong = [...showWrong];
      newWrong[index] = true;
      setShowWrong(newWrong);
      setTimeout(() => {
        const resetWrong = [...showWrong];
        resetWrong[index] = false;
        setShowWrong(resetWrong);
      }, 2000);
    }
  };

  return (
    <Container>
      <h2>Multiplication Table of {countByNumber}</h2>
      {isComplete && (<GameContainer>
    <GameTitle>Great Job!!! Go To the next Task</GameTitle>
      <FlashButton onClick={handleFinish}>
        <span>Next Task!!</span>
      </FlashButton>
 </GameContainer>)}
      <Table>
        <thead>
          <tr>
            <Th>Question</Th>
            <Th>Answer</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((multiplier, index) => (
            <tr key={index}>
              <Td>{countByNumber} × {multiplier}</Td>
              <Td>
                <Input
                  type="text"
                  value={answers[index]}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder="Enter answer"
                  onKeyPress={(e) => e.key === 'Enter' && checkAnswer(index)}
                  disabled={isComplete}
                />
              </Td>
              <Td>
                <CheckButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => checkAnswer(index)}
                  disabled={isComplete}
                >
                  Check
                </CheckButton>
                <AnimatePresence>
                  {showWrong[index] && (
                    <Feedback
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                    >
                      👎
                    </Feedback>
                  )}
                </AnimatePresence>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AnimatePresence>
        {showCelebration.some(Boolean) && (
          <CelebrationOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array(20).fill('🎈').map((_, i) => (
              <motion.span
                key={i}
                style={{
                  position: 'absolute',
                  fontSize: '40px',
                }}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight,
                  opacity: 0,
                }}
                animate={{
                  y: -100,
                  opacity: 1,
                  transition: {
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                  },
                }}
              >
                {Math.random() > 0.5 ? '🎈' : '🎉'}
              </motion.span>
            ))}
          </CelebrationOverlay>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default MultiplicationTable;