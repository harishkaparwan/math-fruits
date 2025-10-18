import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
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
// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f8ff;
  font-family: Arial, sans-serif;
  padding: 20px;
  position: relative;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background-color: #87ceeb;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
  &:hover {
    background-color: #add8e6;
  }
`;

const TextArea = styled.textarea`
  width: 80%;
  max-width: 500px;
  height: 150px;
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  resize: vertical;
`;

const LineContainer = styled.div`
  margin-top: 20px;
  min-height: 30px;
  text-align: center;
  max-width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
`;

const Word = styled(motion.span)`
  font-size: 20px;
  color: #333;
  padding: 5px 8px;
  border-radius: 4px;
  font-family: 'Comic Sans MS', cursive;
`;

const QuestionContainer = styled.div`
  margin-top: 20px;
  width: 80%;
  max-width: 600px;
`;

const Question = styled.div<{ isCorrect?: boolean; isIncorrect?: boolean }>`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ isCorrect, isIncorrect }) => 
    isCorrect ? '#d4edda' : isIncorrect ? '#f8d7da' : 'transparent'};
`;

const Option = styled.label`
  display: block;
  margin: 5px 0;
  font-size: 16px;
`;

const Result = styled(motion.div)`
  margin: 20px 0;
  font-size: 18px;
  color: #333;
  text-align: center;
  animation: flash 0.5s infinite;
  @keyframes flash {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const Firecracker = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, #ffeb3b, #ff5722);
  border-radius: 50%;
`;

const Flower = styled(motion.div)`
  position: absolute;
  width: 30px;
  height: 30px;
  background: radial-gradient(circle, #ff69b4, #ff1493);
  border-radius: 50%;
`;

const SliderContainer = styled.div`
  width: 300px;
  text-align: center;
`;

const Label = styled.label`
  font-size: 16px;
  color: #555;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const StoryReader: React.FC<TaskComponentProps> = ({ onComplete }) => {
  const [story, setStory] = useState<string>(
    "Once upon a time, a little blue bird flew to a big tree.\nIt sang a happy song.\nThe sun was bright.\nThe bird was happy.\nThe end."
  );
  const [speed, setSpeed] = useState<number>(1);
  const [currentLine, setCurrentLine] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
  const [studentName, setStudentName] = useState<string>('');
  const [answers, setAnswers] = useState<number[]>([-1, -1, -1]);
  const [attempts, setAttempts] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [celebrationTimeout, setCelebrationTimeout] = useState<NodeJS.Timeout | null>(null);

  const questions = [
    { question: "What color was the bird?", options: ["Red", "Blue", "Green", "Yellow"], correct: 1 },
    { question: "What did the bird do?", options: ["Flew away", "Slept", "Sang a song", "Ate food"], correct: 2 },
    { question: "What was the weather like?", options: ["Rainy", "Cloudy", "Bright", "Snowy"], correct: 2 },
  ];
  const handleFinish = () => {
    onComplete();
  };
  const readStory = () => {
    window.speechSynthesis.cancel();
    const lines = story.split('\n').filter(line => line.trim() !== '');
    let lineIndex = 0;

    const speakNextLine = () => {
      if (lineIndex < lines.length) {
        const words = lines[lineIndex].split(' ').filter(word => word.trim() !== '');
        setCurrentLine(words);
        setCurrentWordIndex(-1);

        const speech = new SpeechSynthesisUtterance(lines[lineIndex]);
        speech.rate = speed;
        speech.volume = 0.9;
        speech.pitch = 1;

        const wordDuration = (60 / (150 * speed)) * 1000;
        let wordIndex = 0;
        const highlightNextWord = () => {
          if (wordIndex < words.length) {
            setCurrentWordIndex(wordIndex);
            wordIndex++;
            setTimeout(highlightNextWord, wordDuration);
          }
        };

        speech.onstart = () => highlightNextWord();
        speech.onend = () => {
          lineIndex++;
          setCurrentWordIndex(-1);
          speakNextLine();
        };

        window.speechSynthesis.speak(speech);
      } else {
        setCurrentLine([]);
        setCurrentWordIndex(-1);
      }
    };

    speakNextLine();
  };

  const resetEverything = () => {
    setCurrentLine([]);
    setCurrentWordIndex(-1);
    setStudentName('');
    setAnswers([-1, -1, -1]);
    setAttempts(0);
    setShowResults(false);
    setIsWinner(false);
    if (celebrationTimeout) clearTimeout(celebrationTimeout);
    readStory();
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseFloat(event.target.value));
  };

  const handleStoryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStory(event.target.value);
  };

  const handleAnswerChange = (questionIndex: number, optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const submitAnswers = () => {
    setAttempts(attempts + 1);
    const correctCount = answers.reduce((acc, answer, idx) => 
      acc + (answer === questions[idx].correct ? 1 : 0), 0);
    setShowResults(true);
    const winner = correctCount === questions.length;
    setIsWinner(winner);

    if (winner) {
      const timeout = setTimeout(() => {
        setIsWinner(false);
      }, 35000); // 35 seconds
      setCelebrationTimeout(timeout);
    }
  };

  const wordVariants = {
    inactive: { backgroundColor: 'transparent', scale: 1 },
    active: { backgroundColor: '#ffe4e1', scale: 1.1, transition: { duration: 0.3 } },
  };

  // Fixed variants without repeat/repeatType
  const firecrackerVariants = {
    burst: {
      opacity: [1, 0],
      scale: [0, 1.5],
    },
  };

  const flowerVariants = {
    burst: {
      opacity: [1, 0],
      scale: [0, 2],
      rotate: [0, 360],
    },
  };

  return (
    <Container>
      <Title>Listen to a Story!</Title>
      <TextArea
        value={story}
        onChange={handleStoryChange}
        placeholder="Type or paste your story here..."
      />
      <Button onClick={readStory}>Play Story</Button>
      <Button onClick={resetEverything}>Read Story Again</Button>
      <SliderContainer>
        <Label>Reading Speed: {speed.toFixed(1)}</Label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={speed}
          onChange={handleSpeedChange}
          style={{ width: '100%', marginTop: '10px' }}
        />
      </SliderContainer>
      <LineContainer>
        <AnimatePresence>
          {currentLine.map((word, index) => (
            <Word
              key={`${word}-${index}`}
              variants={wordVariants}
              initial="inactive"
              animate={index === currentWordIndex ? 'active' : 'inactive'}
            >
              {word}
            </Word>
          ))}
        </AnimatePresence>
      </LineContainer>

      <Input
        type="text"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        placeholder="Enter your name"
      />

      {/* Results with flashing effect using CSS */}
      {showResults && (
        <>
        <Result
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p>Name: {studentName || 'Student'}</p>
          <p>Correct Answers: {answers.reduce((acc, a, idx) => acc + (a === questions[idx].correct ? 1 : 0), 0)} / 3</p>
          <p>Attempts: {attempts}</p>
          {isWinner && <p>Congratulations, {studentName || 'Student'}! You got all correct!</p>}
        </Result>
        <GameContainer>
      <GameTitle>Great Job!!! Go To the next Task</GameTitle>
      <FlashButton onClick={handleFinish}>
        <span>Next Task</span>
      </FlashButton>
      </GameContainer>
      </>
      )}

      {/* Questions with color coding */}
      <QuestionContainer>
        {questions.map((q, qIdx) => (
          <Question
            key={qIdx}
            isCorrect={showResults && answers[qIdx] === q.correct}
            isIncorrect={showResults && answers[qIdx] !== -1 && answers[qIdx] !== q.correct}
          >
            <h3>{q.question}</h3>
            {q.options.map((option, oIdx) => (
              <Option key={oIdx}>
                <input
                  type="radio"
                  name={`question-${qIdx}`}
                  checked={answers[qIdx] === oIdx}
                  onChange={() => handleAnswerChange(qIdx, oIdx)}
                />
                {option}
              </Option>
            ))}
          </Question>
        ))}
        <Button onClick={submitAnswers}>Submit Answers</Button>
      </QuestionContainer>

      {/* Celebration with firecrackers and flowers */}
      {isWinner && (
        <>
          {Array.from({ length: 20 }).map((_, i) => (
            <Firecracker
              key={`fire-${i}`}
              variants={firecrackerVariants}
              initial={{ opacity: 0, x: Math.random() * 800 - 400, y: Math.random() * 600 - 300 }}
              animate="burst"
              transition={{ duration: 1, ease: 'easeOut', repeat: 35, repeatType: 'loop' }}
            />
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <Flower
              key={`flower-${i}`}
              variants={flowerVariants}
              initial={{ opacity: 0, x: Math.random() * 800 - 400, y: Math.random() * 600 - 300 }}
              animate="burst"
              transition={{ duration: 1.5, ease: 'easeOut', repeat: 23, repeatType: 'loop' }}
            />
          ))}
        </>
      )}
    </Container>
  );
};

export default StoryReader;