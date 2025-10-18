'use client'; // Mark as Client Component for Next.js

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { atom, useAtom, Provider } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { atomWithCache } from 'jotai-cache';
import { motion, AnimatePresence } from 'framer-motion';

// Maze is a 5x5 grid with letters and E (end)
type Cell = string; // Letters or 'E'
type Maze = Cell[][];
type Position = [number, number]; // [row, col]

const initialMaze: Maze = [
  ['S', 'C', 'A', 'T', 'P'],
  ['P', 'L', 'A', 'Y', 'R'],
  ['R', 'U', 'N', 'E', 'O'],
  ['B', 'A', 'L', 'L', 'G'],
  ['H', 'I', 'D', 'E', 'E'],
];

// Function to find valid down or diagonal words in the maze
const findDownOrDiagonalWords = (maze: Maze): string[] => {
  const words: string[] = [];
  const rows = maze.length;
  const cols = maze[0].length;

  // Common English words to check against (simplified dictionary)
  const dictionary = new Set(['CAT', 'PLAY', 'RUN', 'BALL', 'HIDE', 'PLAN', 'RUG', 'BAD', 'HILL']);

  // Check downward (vertical)
  for (let col = 0; col < cols; col++) {
    for (let startRow = 0; startRow <= rows - 3; startRow++) { // At least 3 letters
      let word = '';
      for (let row = startRow; row < rows; row++) {
        word += maze[row][col];
        if (word.length >= 3 && dictionary.has(word)) {
          words.push(word);
        }
      }
    }
  }

  // Check diagonal (down-right)
  for (let startRow = 0; startRow <= rows - 3; startRow++) {
    for (let startCol = 0; startCol <= cols - 3; startCol++) {
      let word = '';
      for (let i = 0; startRow + i < rows && startCol + i < cols; i++) {
        word += maze[startRow + i][startCol + i];
        if (word.length >= 3 && dictionary.has(word)) {
          words.push(word);
        }
      }
    }
  }

  // Check diagonal (down-left)
  for (let startRow = 0; startRow <= rows - 3; startRow++) {
    for (let startCol = 2; startCol < cols; startCol++) {
      let word = '';
      for (let i = 0; startRow + i < rows && startCol - i >= 0; i++) {
        word += maze[startRow + i][startCol - i];
        if (word.length >= 3 && dictionary.has(word)) {
          words.push(word);
        }
      }
    }
  }

  // Remove duplicates without spread operator
  const uniqueWords = Array.from(new Set(words));
  return uniqueWords;
};

// Generate word options dynamically
const wordOptions = [
  { label: 'Choose a word', value: '' },
  ...findDownOrDiagonalWords(initialMaze).map((word) => ({ label: word, value: word })),
];

// Jotai atoms
const studentNameAtom = atomWithStorage('mazeStudentName', 'Student');
const dateAtom = atomWithStorage('mazeDate', new Date().toLocaleDateString());
const selectedWordAtom = atom('');
const playerPosAtom = atom<Position | null>(null); // Start as null, set on first click
const selectedPathAtom = atom<Position[]>([]);
const wordsFoundAtom = atomWithStorage('mazeWordsFound', 0);

// Cached atom for game state
const gameStateAtom = atomWithCache((get) => {
  const selectedPath = get(selectedPathAtom);
  const word = selectedPath.map(([r, c]) => initialMaze[r][c]).join('');
  const selectedWord = get(selectedWordAtom);
  const lastPos = selectedPath[selectedPath.length - 1];
  const isWordMatch = word === selectedWord;
  const isEnd = lastPos ? initialMaze[lastPos[0]][lastPos[1]] === 'E' : false;
  return { word, isWordMatch, isEnd };
});

// Styles with @emotion/styled
const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const MazeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 60px);
  gap: 4px;
  margin: 20px 0;
  position: relative;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 10px;
`;

const Cell = styled(motion.div)<{ isPlayer?: boolean; isEnd?: boolean; isSelected?: boolean }>`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.isPlayer ? '#FFD700' : props.isEnd ? '#32CD32' : props.isSelected ? '#87CEEB' : '#FFFFFF'};
  border: 2px solid #999;
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => (props.isPlayer || props.isEnd || props.isSelected ? '#fff' : '#333')};
  cursor: pointer;
  user-select: none;
  position: relative;
  z-index: 1;
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    transform: scale(1.05);
    background-color: ${(props) =>
      props.isPlayer || props.isEnd || props.isSelected ? undefined : '#e0f7fa'};
  }
`;

const Line = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
`;

const InputContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

const StyledInput = styled.input`
  padding: 12px;
  font-size: 1rem;
  width: 220px;
  border: 2px solid #999;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Select = styled.select`
  padding: 12px;
  font-size: 1rem;
  width: 244px;
  border: 2px solid #999;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const ResetButton = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  background-color: #ff4444;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #cc0000;
  }
`;

const Message = styled.p<{ success?: boolean }>`
  margin-top: 20px;
  font-size: 1.2rem;
  color: ${(props) => (props.success ? '#32CD32' : '#333')};
  text-align: center;
`;

const Stats = styled.p`
  margin-top: 10px;
  font-size: 1rem;
  color: #666;
`;

const CelebrationOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CongratsMessage = styled(motion.h2)`
  font-size: 2.5rem;
  color: #ff69b4;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

// Shapes for celebration
const shapes = [
  { emoji: '❤️', color: '#ff4444' }, // Heart
  { emoji: '🌸', color: '#ff69b4' }, // Flower
  { emoji: '🐟', color: '#1e90ff' }, // Fish
  { emoji: '⭐', color: '#ffd700' }, // Star
  { emoji: '🌟', color: '#ff8c00' }, // Sparkle
];

const getRandomShape = () => shapes[Math.floor(Math.random() * shapes.length)];

const celebrationItems = Array.from({ length: 12 }, (_, i) => {
  const shape = getRandomShape();
  return {
    id: i,
    emoji: shape.emoji,
    color: shape.color,
    x: `${Math.random() * 80 - 40}vw`,
    y: `${Math.random() * 80 - 40}vh`,
    delay: Math.random() * 0.5,
  };
});

const WordMazeDynamicGame: React.FC = () => {
  const [maze] = useState<Maze>(initialMaze);
  const [studentName, setStudentName] = useAtom(studentNameAtom);
  const [date, setDate] = useAtom(dateAtom);
  const [selectedWord, setSelectedWord] = useAtom(selectedWordAtom);
  const [playerPos, setPlayerPos] = useAtom(playerPosAtom);
  const [selectedPath, setSelectedPath] = useAtom(selectedPathAtom);
  const [wordsFound, setWordsFound] = useAtom(wordsFoundAtom);
  const gameState = useAtom(gameStateAtom)[0]; // Cached state
  const [message, setMessage] = useState<string>('Select a word from the dropdown and draw it anywhere in the maze!');
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  // Directions: up, down, left, right (no diagonals for gameplay)
  const directions: [number, number][] = [
    [-1, 0], // up
    [1, 0],  // down
    [0, -1], // left
    [0, 1],  // right
  ];

  const isValidMove = (row: number, col: number): boolean => {
    return row >= 0 && row < 5 && col >= 0 && col < 5;
  };

  const isAdjacent = (pos1: Position, pos2: Position): boolean => {
    const [r1, c1] = pos1;
    const [r2, c2] = pos2;
    const dr = Math.abs(r1 - r2);
    const dc = Math.abs(c1 - c2);
    return (dr === 1 && dc === 0) || (dr === 0 && dc === 1); // Only up, down, left, right
  };

  const handleCellClick = (row: number, col: number) => {
    if (!selectedWord) {
      setMessage('Please select a word from the dropdown first!');
      return;
    }

    const newPos: Position = [row, col];

    if (!playerPos || selectedPath.length === 0) {
      // Start from any letter
      setPlayerPos(newPos);
      setSelectedPath([newPos]);
      setMessage(`Draw "${selectedWord}" starting from ${maze[row][col]}!`);
    } else {
      const lastPos = selectedPath[selectedPath.length - 1];
      if (
        isValidMove(row, col) &&
        isAdjacent(lastPos, newPos) &&
        !selectedPath.some(([r, c]) => r === row && c === col)
      ) {
        const newPath = [...selectedPath, newPos];
        setSelectedPath(newPath);
        const currentWord = newPath.map(([r, c]) => maze[r][c]).join('');
        if (currentWord.length === selectedWord.length && currentWord !== selectedWord) {
          setMessage(`Oops! That’s "${currentWord}", not "${selectedWord}". Try again!`);
        }
      } else if (row === lastPos[0] && col === lastPos[1]) {
        // Do nothing if clicking the last cell again
      } else {
        setMessage('Select a cell next to the last one (up, down, left, or right), and no repeats!');
      }
    }
  };

  const handleSubmit = () => {
    if (selectedPath.length <= 1) {
      setMessage('Select more letters to form the word!');
      return;
    }

    if (gameState.isWordMatch) {
      const lastPos = selectedPath[selectedPath.length - 1];
      setPlayerPos(lastPos);
      setWordsFound((prev) => prev + 1);

      if (gameState.isEnd) {
        setMessage(`Congratulations! You found "${selectedWord}" and reached the end!`);
      } else {
        setMessage(`Great! You found "${selectedWord}". Pick another word to keep going!`);
      }

      // Show celebration for every correct word
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000); // Hide after 2 seconds

      setSelectedWord('');
      setSelectedPath([]); // Clear path for next word
      setPlayerPos(null); // Allow starting anywhere again
    } else {
      setMessage(`That’s not "${selectedWord}"! Try again or reset.`);
    }
  };

  const handleReset = () => {
    setPlayerPos(null);
    setSelectedPath([]);
    setSelectedWord('');
    setMessage('Select a word from the dropdown and draw it anywhere in the maze!');
  };

  // Calculate line coordinates for drawing with smooth curves
  const linePoints = selectedPath.map(([row, col]) => ({
    x: col * 64 + 32, // 60px cell + 4px gap, center at 32
    y: row * 64 + 32,
  }));

  return (
    <GameContainer>
      <h1>Word Maze Game</h1>
      <MazeGrid>
        {maze.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isPlayer = !!playerPos && rowIndex === playerPos[0] && colIndex === playerPos[1];
            const isEnd = cell === 'E' && !isPlayer;
            const isSelected = selectedPath.some(([r, c]) => r === rowIndex && c === colIndex);
            return (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                isPlayer={isPlayer}
                isEnd={isEnd}
                isSelected={isSelected && !isPlayer && !isEnd}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                whileTap={{ scale: 0.95 }} // Soft press effect
              >
                {cell}
              </Cell>
            );
          })
        )}
        <Line width="328" height="328">
          {linePoints.length > 1 && (
            <motion.polyline
              points={linePoints.map((p) => `${p.x},${p.y}`).join(' ')}
              stroke="#FF4500"
              strokeWidth="4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          )}
        </Line>
      </MazeGrid>
      <InputContainer>
        <StyledInput
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Enter your name"
        />
        <Select value={selectedWord} onChange={(e) => setSelectedWord(e.target.value)}>
          {wordOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <ButtonContainer>
          <SubmitButton onClick={handleSubmit}>Submit Word</SubmitButton>
          <ResetButton onClick={handleReset}>Reset</ResetButton>
        </ButtonContainer>
      </InputContainer>
      <Message success={gameState.isEnd && gameState.isWordMatch}>{message}</Message>
      <Stats>Date: {date} | Words Found: {wordsFound}</Stats>

      {/* Celebration Animation for Every Correct Word */}
      <AnimatePresence>
        {showCelebration && (
          <CelebrationOverlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CongratsMessage
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              Congratulations!
            </CongratsMessage>
            {celebrationItems.map((item) => (
              <motion.span
                key={item.id}
                style={{ position: 'absolute', fontSize: '3rem', x: item.x, y: item.y, color: item.color }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: 1, delay: item.delay, ease: 'easeInOut' }}
              >
                {item.emoji}
              </motion.span>
            ))}
          </CelebrationOverlay>
        )}
      </AnimatePresence>
    </GameContainer>
  );
};



export default WordMazeDynamicGame;