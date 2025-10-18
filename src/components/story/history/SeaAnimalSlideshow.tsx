'use client'; // Mark as Client Component

import React, { useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { motion, AnimatePresence } from 'framer-motion';
import { atom, useAtom, useAtomValue, Provider } from 'jotai';
import worldMap from '../../../assets/world-map.jpg'
import whaleImage from '../../../assets/sea-animal/whale.jpg'; // Adjust paths to your images
import sharkImage from '../../../assets/sea-animal/shark.jpg';
import octopusImage from '../../../assets/sea-animal/octopus.jpg';
import tunaImage from '../../../assets/sea-animal/tuna.jpg';
import seaCoralImage from '../../../assets/sea-animal/sea-coral.jpg';
import dolphinsImage from '../../../assets/sea-animal/dolphins.jpg';

// Sea animal data with 1 question each and individual images
const seaAnimals = [
  {
    name: 'Whale',
    description: 'Whales are the largest animals in the ocean, known for their songs.',
    image: whaleImage,
    questions: [
      { question: 'What is the largest type of whale?', options: ['Blue Whale', 'Humpback Whale', 'Orca', 'Sperm Whale'], correct: 0 },
    ],
  },
  {
    name: 'Shark',
    description: 'Sharks are fierce predators with sharp teeth and strong senses.',
    image: sharkImage,
    questions: [
      { question: 'Which shark had hammer-shaped head?', options: ['Tiger Shark', 'Great White', 'Hammerhead', 'Whale Shark'], correct: 2 },
    ],
  },
  {
    name: 'Octopus',
    description: 'Octopuses are smart creatures with eight arms and can change color.',
    image: octopusImage,
    questions: [
      { question: 'How many arms does an octopus have?', options: ['6', '8', '10', '12'], correct: 1 },
    ],
  },
  {
    name: 'Tuna',
    description: 'Tuna are fast swimmers found in warm ocean waters.',
    image: tunaImage,
    questions: [
      { question: 'what kind of water Tuna Like', options: ['Ice Water','cold and warm water', 'Dirty Water', 'Salty Water'], correct: 1 },
    ],
  },
  {
    name: 'Sea Coral',
    description: 'Sea Coral forms colorful reefs that support ocean life.',
    image: seaCoralImage,
    questions: [
      { question: 'What is Sea coral?', options: ['Fish', 'Birds', 'Elephants', 'Sea Animal'], correct: 3 },
    ],
  },
  {
    name: 'Dolphins',
    description: 'Dolphins are playful and intelligent sea mammals.',
    image: dolphinsImage,
    questions: [
      { question: 'What are dolphins known for?', options: ['Intelligence', 'Sharp Teeth', 'Eight Arms', 'Coral Building'], correct: 0 },
    ],
  },
];

// Unique background colors for questions and answers
const colors = ['#FFB6C1', '#ADD8E6', '#98FB98', '#FFDAB9', '#E6E6FA', '#F0E68C'];

// Jotai atoms
const studentNameAtom = atom('');
const answersAtom = atom<Record<string, number[]>>({}); // Store selected option indices
const resultCacheAtom = atom((get) => { // Synchronous computation
  const answers = get(answersAtom);
  const results = seaAnimals.map((animal) => {
    const studentAnswers = answers[animal.name] || [];
    const correctCount = studentAnswers.reduce((acc, ans, i) => acc + (ans === animal.questions[i].correct ? 1 : 0), 0);
    return { animal: animal.name, correct: correctCount, total: 1 };
  });
  const totalCorrect = results.reduce((acc, res) => acc + res.correct, 0);
  const totalWrong = 6 - totalCorrect;
  return { results, totalCorrect, totalWrong };
});
const showResultsAtom = atom(false);

// Persist answers to localStorage
const persistAtomToLocalStorage = (atomKey: string, atomValue: any) => {
  localStorage.setItem(atomKey, JSON.stringify(atomValue));
};
const loadAtomFromLocalStorage = (atomKey: string, defaultValue: any) => {
  const stored = localStorage.getItem(atomKey);
  return stored ? JSON.parse(stored) : defaultValue;
};

// Load initial answers from localStorage
const initialAnswers = loadAtomFromLocalStorage('seaAnimalAnswersAtom', {});
answersAtom.onMount = (set) => set(initialAnswers);

// Styles
const slideStyles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '20px', textAlign: 'center' as const },
  slide: { display: 'flex', flexDirection: 'column' as const, alignItems: 'center' as const, justifyContent: 'center' as const, height: '500px', backgroundColor: '#f0f0f0', borderRadius: '10px', padding: '20px' },
  imageContainer: { width: '100%', maxWidth: '600px', height: '400px', marginBottom: '20px' },
  animalImage: { width: '100%', height: '100%', objectFit: 'cover' as const, borderRadius: '8px' },
  title: { fontSize: '2rem', fontWeight: 'bold' as const, color: '#333', marginBottom: '10px' },
  description: { fontSize: '1.2rem', color: '#666', maxWidth: '600px' },
  questionSection: { marginTop: '20px', textAlign: 'left' as const, maxWidth: '600px' },
  questionContainer: { marginBottom: '20px', padding: '10px', borderRadius: '5px' },
  question: { padding: '10px', borderRadius: '5px', marginBottom: '10px' },
  answerContainer: { padding: '10px', borderRadius: '5px' },
  option: { margin: '5px 0', padding: '5px', display: 'flex', alignItems: 'center' as const },
  submitButton: { padding: '10px 20px', fontSize: '1rem', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' },
  successScreen: { position: 'fixed' as const, top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000, backgroundColor: 'rgba(0, 191, 255, 0.8)', display: 'flex', flexDirection: 'column' as const, alignItems: 'center' as const, justifyContent: 'flex-start' as const, paddingTop: '20px' },
  score: { color: '#fff', fontSize: '3rem', fontWeight: 'bold' as const, margin: '10px 0', textShadow: '3px 3px 6px #000' },
  result: { color: '#fff', fontSize: '1.5rem', margin: '5px 0', textShadow: '2px 2px 4px #000' },
  closeButton: { position: 'absolute' as const, top: '10px', right: '10px', padding: '10px 20px', fontSize: '1rem', backgroundColor: '#ff4444', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  correct: { backgroundColor: '#90EE90' }, // Light green for correct sections
} satisfies Record<string, React.CSSProperties>;

// Success screen animation elements (sea-themed)
const celebrationElements = [
  { emoji: '🐳', size: '5rem', x: '-20vw', y: '30vh', delay: 0 }, // Whale
  { emoji: '🪸', size: '4rem', x: '40vw', y: '-10vh', delay: 0.5 }, // Coral
  { emoji: '🐙', size: '5rem', x: '10vw', y: '50vh', delay: 1 }, // Octopus
  { emoji: '🐬', size: '3rem', x: '-40vw', y: '-20vh', delay: 1.5 }, // Dolphin
  { emoji: '🐠', size: '4rem', x: '30vw', y: '20vh', delay: 0.2 }, // Fish
  { emoji: '🪐', size: '5rem', x: '-30vw', y: '40vh', delay: 0.8 }, // Bubble-like
  { emoji: '🪸', size: '4rem', x: '20vw', y: '-30vh', delay: 1.2 }, // Coral
];

const SeaAnimalSlideshow = () => {
  const [studentName, setStudentName] = useAtom(studentNameAtom);
  const [answers, setAnswers] = useAtom(answersAtom);
  const cachedResults = useAtomValue(resultCacheAtom); // Synchronous
  const [showResults, setShowResults] = useAtom(showResultsAtom);

  const currentDate = 'March 22, 2025'; // Static per your context

  // Persist answers to localStorage whenever they change
  useEffect(() => {
    persistAtomToLocalStorage('seaAnimalAnswersAtom', answers);
  }, [answers]);

  // Log cached results to console for debugging
  useEffect(() => {
    console.log('Cached Results:', cachedResults);
  }, [cachedResults]);

  const handleAnswer = (animal: string, questionIndex: number, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [animal]: prev[animal] ? [...prev[animal].slice(0, questionIndex), optionIndex, ...prev[animal].slice(questionIndex + 1)] : [optionIndex],
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleCloseSuccess = () => {
    setShowResults(false);
  };

  const isDarkBackground = (color: string) => {
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance < 128; // If true, use gray; else, use yellow
  };

  return (
    <div style={slideStyles.container}>
      {/* Slideshow at the top */}
      <h1>Sea Animal Assignment</h1>
      <Slide autoplay={false} arrows={true} indicators={true} duration={3000}>
        {seaAnimals.map((animal, index) => (
          <div key={index} className="each-slide" style={slideStyles.slide}>
            <div style={slideStyles.imageContainer}>
              <img src={animal.image} alt={`${animal.name}`} style={slideStyles.animalImage} />
            </div>
            <h2 style={slideStyles.title}>{animal.name}</h2>
            <p style={slideStyles.description}>{animal.description}</p>
          </div>
        ))}
      </Slide>

      {/* Student Name and Questions Below Slideshow */}
      <div style={slideStyles.questionSection}>
        <p>Student: <input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Enter your name" /></p>
        <p>Date: {currentDate}</p>
        <h2>Questions</h2>
        {seaAnimals.map((animal, animalIndex) => {
          const questionColor = colors[animalIndex % colors.length];
          const answerColor = colors[(animalIndex + 1) % colors.length];
          const isCorrect = showResults && (answers[animal.name]?.[0] ?? -1) === animal.questions[0].correct;
          const isWrong = showResults && (answers[animal.name]?.[0] ?? -1) !== -1 && !isCorrect;

          return (
            <motion.div
              key={animal.name}
              style={{
                ...slideStyles.questionContainer,
                ...(isCorrect ? slideStyles.correct : {}),
              }}
              animate={isWrong ? { backgroundColor: ['#ff6347', '#ffffff', '#ff6347'] } : {}}
              transition={isWrong ? { duration: 0.5, repeat: Infinity } : {}}
            >
              <div style={{ ...slideStyles.question, backgroundColor: questionColor }}>
                <strong>Question:</strong> {animal.questions[0].question}
              </div>
              <div style={{ ...slideStyles.answerContainer, backgroundColor: answerColor }}>
                <strong>Answer:</strong>
                {animal.questions[0].options.map((option, optionIndex) => {
                  const isSelected = (answers[animal.name]?.[0] ?? -1) === optionIndex;
                  const highlightColor = isDarkBackground(answerColor) ? '#d3d3d3' : '#ffff99'; // Gray or yellow based on background
                  return (
                    <div key={option} style={slideStyles.option}>
                      <input
                        type="radio"
                        name={`${animal.name}-0`}
                        checked={isSelected}
                        onChange={() => handleAnswer(animal.name, 0, optionIndex)}
                      />
                      <span style={{ marginLeft: '5px', backgroundColor: isSelected ? highlightColor : 'transparent', padding: '2px 5px', borderRadius: '3px' }}>
                        {option}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
        <button style={slideStyles.submitButton} onClick={handleSubmit}>
          Submit Answers
        </button>
      </div>
      <p style={{ fontSize: '0.8rem', color: '#999' }}>Images provided by Ocean Life Collection</p>

      {/* Success Screen with Flashing Sea Elements */}
      <AnimatePresence>
        {showResults && cachedResults.totalCorrect === 6 && (
          <motion.div
            style={slideStyles.successScreen}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <button style={slideStyles.closeButton} onClick={handleCloseSuccess}>
              Close
            </button>
            <p style={slideStyles.score}>Correct: {cachedResults.totalCorrect}</p>
            <p style={slideStyles.score}>Wrong: {cachedResults.totalWrong}</p>
            {celebrationElements.map((element, index) => (
              <motion.span
                key={index}
                style={{ position: 'absolute', fontSize: element.size, x: element.x, y: element.y }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: element.delay, ease: 'easeInOut' }}
              >
                {element.emoji}
              </motion.span>
            ))}
            <p style={{ color: '#fff', fontSize: '2rem', textShadow: '2px 2px 4px #000', marginTop: '20px' }}>Congratulations, {studentName}!</p>
            {cachedResults.results.map((result) => (
              <p key={result.animal} style={slideStyles.result}>
                {result.animal}: {result.correct}/{result.total} correct
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};



export default SeaAnimalSlideshow;