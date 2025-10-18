// src/components/SubtractionGame.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { atom, useAtom } from 'jotai';
import { TaskComponentProps } from './story/interface/AppProps';
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
const Form = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 15px;
  align-items: center;
  width: 100%;
  max-width: 600px;
`;

const Input = styled.input<{ isResult?: boolean }>`
  width: ${props => (props.isResult ? '220px' : '120px')};
  height: ${props => (props.isResult ? '60px' : '50px')};
  font-size: ${props => (props.isResult ? '28px' : '24px')};
  padding: 10px;
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

const OperatorRow = styled.div`
  font-size: 50px;
  color: #4CAF50;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FruitDisplay = styled(motion.div)`
  display: flex;
  gap: 8px;
`;

const Fruit = styled(motion.span)<{ crossed?: boolean }>`
  font-size: 32px;
  text-decoration: ${props => (props.crossed ? 'line-through' : 'none')};
  cursor: ${props => (props.crossed ? 'default' : 'pointer')};
  opacity: ${props => (props.crossed ? 0.5 : 1)};
`;

const SubtractionDisplay = styled.div`
  font-size: 140px;
  color: #4CAF50;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Divider = styled.hr`
  width: 350px;
  border: none;
  height: 2px;
  background-color: #d3d3d3;
  margin: 15px 0;
  display:none;
`;

const ResultCell = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const EqualsSign = styled.span`
  font-size: 50px;
  color: #4CAF50;
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

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StaticTitle = styled.h2`
  font-size: 28px;
  color: #333;
`;

const FlashingTitle = styled(motion.h2)`
  font-size: 28px;
  color: #4CAF50;
  padding: 10px 20px;
  border-radius: 8px;
  display: inline-block;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const NameInput = styled.input`
  width: 200px;
  height: 40px;
  font-size: 20px;
  padding: 8px;
  border: 2px solid #4CAF50;
  border-radius: 5px;
  text-align: center;
`;

const ResultTable = styled.table`
  margin-top: 20px;
  border-collapse: collapse;
  width: 100%;
  max-width: 600px;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #4CAF50;
  color: white;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

type StudentRecord = {
  name: string;
  questions: {
    question: string;
    attempts: number;
    output: number | null;
  }[];
};

const studentAtom = atom<StudentRecord>({
  name: '',
  questions: [],
});
 
const SubtractionMoreGame: React.FC<TaskComponentProps> = ({ onComplete }) => {
  const [answer, setAnswer] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [randomNum1, setRandomNum1] = useState(0);
  const [randomNum2, setRandomNum2] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [crossedIndices, setCrossedIndices] = useState<number[]>([]);
  const [student, setStudent] = useAtom(studentAtom);
  const [isComplete, setIsComplete] = useState(false);
  const [totalQuestion] = useState(10);
  const persistAtomToLocalStorage = (atomKey: string, atomValue: any) => {
    localStorage.setItem(atomKey, JSON.stringify(atomValue));
  };
  useEffect(() => {
      persistAtomToLocalStorage('subtraction_questions', student.questions);
      persistAtomToLocalStorage('subtraction_studentName', student.name);
    }, [isComplete]);
  const handleFinish = () => {
    onComplete();
  };
  const generateRandomQuestion = () => {
    const n1 = Math.floor(Math.random() * 5) + 5; // 5-9
    const n2 = Math.floor(Math.random() * (n1 - 1)) + 1; // 1 to n1-1
    setRandomNum1(n1);
    setRandomNum2(n2);
    setAnswer('');
    setAttempts(0);
    setCrossedIndices([]);
  };

  useEffect(() => {
    generateRandomQuestion(); // Initial question
  }, []);

  const handleCross = (index: number) => {
    if (!isComplete && crossedIndices.length < randomNum2 && !crossedIndices.includes(index)) {
      setCrossedIndices(prev => [...prev, index]);
    }
  };

  const checkAnswer = () => {
    const correctAnswer = randomNum1 - randomNum2;
    setAttempts(prev => prev + 1);

    if (answer === `${correctAnswer}` && crossedIndices.length === randomNum2) {
      const updatedAttempts = attempts + 1; // Include current attempt
      setStudent(prev => ({
        ...prev,
        questions: [
          ...prev.questions.slice(0, questionCount),
          { question: `${randomNum1} - ${randomNum2}`, attempts: updatedAttempts, output: correctAnswer },
          ...prev.questions.slice(questionCount + 1),
        ],
      }));
      setShowCelebration(true);
      setShowWrong(false);
      setTimeout(() => {
        setShowCelebration(false);
        if (questionCount < totalQuestion-1) {
          setQuestionCount(prev => prev + 1);
          generateRandomQuestion();
        } else {
          setIsComplete(true);
          setQuestionCount(totalQuestion);
        }
      }, 3000);
    } else {
      setShowWrong(true);
      setShowCelebration(false);
      setTimeout(() => setShowWrong(false), 2000);
    }
  };

  return (
    <div>
      <NameContainer>
        <NameInput
          type="text"
          value={student.name}
          onChange={(e) => setStudent(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter your name"
          disabled={questionCount > 0 || isComplete}
        />
        {isComplete && (
          <FlashingTitle
            animate={{
              scale: [1, 1.05, 1],
              backgroundColor: ['#fff3e0', '#ffe0b2', '#fff3e0'],
              boxShadow: [
                '0 0 5px rgba(76, 175, 80, 0.5)',
                '0 0 15px rgba(76, 175, 80, 0.8)',
                '0 0 5px rgba(76, 175, 80, 0.5)',
              ],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            Great job! 10 questions completed!
          </FlashingTitle>
        )}
      </NameContainer>
      {!isComplete && (
        <TitleContainer>
          <StaticTitle>Subtraction [Question : {questionCount+1}] :-</StaticTitle>
          <FlashingTitle
            animate={{
              scale: [1, 1.05, 1],
              backgroundColor: ['#fff3e0', '#ffe0b2', '#fff3e0'],
              boxShadow: [
                '0 0 5px rgba(76, 175, 80, 0.5)',
                '0 0 15px rgba(76, 175, 80, 0.8)',
                '0 0 5px rgba(76, 175, 80, 0.5)',
              ],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {`${randomNum1} - ${randomNum2} = ?`}
          </FlashingTitle>
        </TitleContainer>
      )}
      <Form>
        <Grid>
          <div /> {/* Empty cell for alignment */}
          <FruitDisplay>
            {Array(randomNum1).fill('🍎').map((fruit, i) => (
              <Fruit
                key={`apple-${i}`}
                crossed={crossedIndices.includes(i)}
                onClick={() => handleCross(i)}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={!crossedIndices.includes(i) ? { scale: 1.1 } : {}}
                whileTap={!crossedIndices.includes(i) ? { scale: 0.9 } : {}}
              >
                {fruit}
              </Fruit>
            ))}
          </FruitDisplay>

          <SubtractionDisplay>
            <span>{randomNum1}</span>
            <span>-</span>
            <span>{randomNum2}</span>
          </SubtractionDisplay>

          <Divider />
          <div /> {/* Empty cell for alignment */}

          <ResultCell>
            <EqualsSign>=</EqualsSign>
            <Input
              isResult
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Answer"
              onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
              disabled={isComplete}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={checkAnswer}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              disabled={isComplete}
            >
              Check
            </motion.button>
            <AnimatePresence>
              {showWrong && (
                <Feedback
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  👎
                </Feedback>
              )}
            </AnimatePresence>
          </ResultCell>
          <div /> {/* Empty cell for alignment */}
        </Grid>
      </Form>

      {isComplete && (
        <>
        <ResultTable>
          <thead>
            <tr>
              <Th>Question #</Th>
              <Th>Question</Th>
              <Th>Attempts</Th>
              <Th>Output</Th>
            </tr>
          </thead>
          <tbody>
            {student.questions.map((q, index) => (
              <tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{q.question}</Td>
                <Td>{q.attempts}</Td>
                <Td>{q.output}</Td>
              </tr>
            ))}
          </tbody>
        </ResultTable>
        <GameContainer>
      <GameTitle>Great Job!!! Go To the next Task</GameTitle>
      <FlashButton onClick={handleFinish}>
        <span>Next Task</span>
      </FlashButton>
      </GameContainer>
      </>
      )}

      <AnimatePresence>
        {showCelebration && (
          <CelebrationOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array(20).fill('🌸').map((_, i) => (
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
                {Math.random() > 0.5 ? '🌸' : '🌺'}
              </motion.span>
            ))}
          </CelebrationOverlay>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubtractionMoreGame;