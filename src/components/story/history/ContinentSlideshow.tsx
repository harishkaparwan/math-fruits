import React, { useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { motion, AnimatePresence } from 'framer-motion';
import { atom, useAtom, useAtomValue, Provider } from 'jotai';
import worldMap from '../../../assets/world-map.jpg'; // Adjust path based on your project structure

// Continent data with 1 question each (6 continents)
const continents = [
  {
    name: 'Africa',
    description: 'Africa is a land of wild animals like lions and elephants.',
    highlight: { top: '40%', left: '40%', width: '20%', height: '30%', backgroundColor: 'rgba(255, 165, 0, 0.5)' },
    questions: [
      { question: 'Which animal is lives in Africa?', options: ['Koela', 'Kangaro', 'Lion', 'Bear'], correct: 2 },
    ],
  },
  {
    name: 'Asia',
    description: 'Asia is the biggest continent with many different people and cultures. Like India, Japana, South Korea',
    highlight: { top: '20%', left: '60%', width: '30%', height: '40%', backgroundColor: 'rgba(255, 0, 0, 0.5)' },
    questions: [
      { question: 'Which Country is in Asia?', options: ['America', 'Europe', 'Canada', 'India'], correct: 3 },
    ],
  },
  {
    name: 'Europe',
    description: 'Europe is full of old castles, fun stories, and pretty towns. It has a bog tower Like Eiffel Tower. Eiffel Tower is in France',
    highlight: { top: '20%', left: '40%', width: '15%', height: '20%', backgroundColor: 'rgba(0, 128, 0, 0.5)' },
    questions: [
      { question: 'Which country has the Eiffel Tower?', options: ['France', 'Germany', 'Spain', 'UK'], correct: 0 },
    ],
  },
  {
    name: 'North America',
    description: 'North America has big cities, tall mountains, and lovely parks. Canada,Mexico,America is part of North America',
    highlight: { top: '20%', left: '10%', width: '25%', height: '30%', backgroundColor: 'rgba(255, 215, 0, 0.5)' },
    questions: [
      { question: 'Which Country is in North America', options: ['America', 'France', 'Japan', 'India'], correct: 0 },
    ],
  },
  {
    name: 'Australia',
    description: 'Australia is a sunny place where kangaroos and koalas live.',
    highlight: { top: '60%', left: '70%', width: '15%', height: '20%', backgroundColor: 'rgba(128, 0, 128, 0.5)' },
    questions: [
      { question: 'What animal lives in Australia?', options: ['Elephant', 'Kangaroo', 'Bear', 'All of these'], correct: 1 },
    ],
  },
  {
    name: 'South America',
    description: 'South America has lush rainforests, colorful festivals, and amazing nature.',
    highlight: { top: '50%', left: '20%', width: '15%', height: '30%', backgroundColor: 'rgba(0, 0, 255, 0.5)' },
    questions: [
      { question: 'Which rainforest covers much of South America?', options: ['Amazon', 'Congo', 'Daintree', 'Borneo'], correct: 0 },
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
  const results = continents.map((continent) => {
    const studentAnswers = answers[continent.name] || [];
    const correctCount = studentAnswers.reduce((acc, ans, i) => acc + (ans === continent.questions[i].correct ? 1 : 0), 0);
    return { continent: continent.name, correct: correctCount, total: 1 };
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
const initialAnswers = loadAtomFromLocalStorage('answersAtom', {});
answersAtom.onMount = (set) => set(initialAnswers);

// Styles
const slideStyles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '20px', textAlign: 'center' as const },
  slide: { display: 'flex', flexDirection: 'column' as const, alignItems: 'center' as const, justifyContent: 'center' as const, height: '500px', backgroundColor: '#f0f0f0', borderRadius: '10px', padding: '20px' },
  mapContainer: { position: 'relative' as const, width: '100%', maxWidth: '600px', height: '400px', marginBottom: '20px' },
  mapImage: { width: '100%', height: '100%', objectFit: 'cover' as const, borderRadius: '8px' },
  highlight: { position: 'absolute' as const, borderRadius: '5px' },
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

// Success screen animation elements
const celebrationElements = [
  { emoji: '✈️', size: '5rem', x: '-20vw', y: '30vh', delay: 0 },
  { emoji: '✈️', size: '4rem', x: '40vw', y: '-10vh', delay: 0.5 },
  { emoji: '🚀', size: '5rem', x: '10vw', y: '50vh', delay: 1 },
  { emoji: '🚀', size: '3rem', x: '-40vw', y: '-20vh', delay: 1.5 },
  { emoji: '🌸', size: '4rem', x: '30vw', y: '20vh', delay: 0.2 },
  { emoji: '🌺', size: '5rem', x: '-30vw', y: '40vh', delay: 0.8 },
  { emoji: '💐', size: '4rem', x: '20vw', y: '-30vh', delay: 1.2 },
];

const ContinentSlideshow = () => {
  const [studentName, setStudentName] = useAtom(studentNameAtom);
  const [answers, setAnswers] = useAtom(answersAtom);
  const cachedResults = useAtomValue(resultCacheAtom); // Now synchronous
  const [showResults, setShowResults] = useAtom(showResultsAtom);

  const currentDate = 'March 22, 2025'; // Static per your context

  // Persist answers to localStorage whenever they change
  useEffect(() => {
    persistAtomToLocalStorage('answersAtom', answers);
  }, [answers]);

  // Log cached results to console for debugging
  useEffect(() => {
    console.log('Cached Results:', cachedResults);
  }, [cachedResults]);

  const handleAnswer = (continent: string, questionIndex: number, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [continent]: prev[continent] ? [...prev[continent].slice(0, questionIndex), optionIndex, ...prev[continent].slice(questionIndex + 1)] : [optionIndex],
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
      <h1>Continent Assignment</h1>
      <Slide autoplay={false} arrows={true} indicators={true} duration={3000}>
        {continents.map((continent, index) => (
          <div key={index} className="each-slide" style={slideStyles.slide}>
            <div style={slideStyles.mapContainer}>
              <img src={worldMap} alt="World Map" style={slideStyles.mapImage} />
              <div style={{ ...slideStyles.highlight, ...continent.highlight }} />
            </div>
            <h2 style={slideStyles.title}>{continent.name}</h2>
            <p style={slideStyles.description}>{continent.description}</p>
          </div>
        ))}
      </Slide>

      {/* Student Name and Questions Below Slideshow */}
      <div style={slideStyles.questionSection}>
        <p>Student: <input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Enter your name" /></p>
        <p>Date: {currentDate}</p>
        <h2>Questions</h2>
        {continents.map((continent, continentIndex) => {
          const questionColor = colors[continentIndex % colors.length];
          const answerColor = colors[(continentIndex + 1) % colors.length];
          const isCorrect = showResults && (answers[continent.name]?.[0] ?? -1) === continent.questions[0].correct;
          const isWrong = showResults && (answers[continent.name]?.[0] ?? -1) !== -1 && !isCorrect;

          return (
            <motion.div
              key={continent.name}
              style={{
                ...slideStyles.questionContainer,
                ...(isCorrect ? slideStyles.correct : {}),
              }}
              animate={isWrong ? { backgroundColor: ['#ff6347', '#ffffff', '#ff6347'] } : {}}
              transition={isWrong ? { duration: 0.5, repeat: Infinity } : {}}
            >
              <div style={{ ...slideStyles.question, backgroundColor: questionColor }}>
                <strong>Question:</strong> {continent.questions[0].question}
              </div>
              <div style={{ ...slideStyles.answerContainer, backgroundColor: answerColor }}>
                <strong>Answer:</strong>
                {continent.questions[0].options.map((option, optionIndex) => {
                  const isSelected = (answers[continent.name]?.[0] ?? -1) === optionIndex;
                  const highlightColor = isDarkBackground(answerColor) ? '#d3d3d3' : '#ffff99'; // Gray or yellow based on background
                  return (
                    <div key={option} style={slideStyles.option}>
                      <input
                        type="radio"
                        name={`${continent.name}-0`}
                        checked={isSelected}
                        onChange={() => handleAnswer(continent.name, 0, optionIndex)}
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
      <p style={{ fontSize: '0.8rem', color: '#999' }}>Map provided by GIS Geography</p>

      {/* Success Screen with Flashing Airplanes, Rockets, and Flowers */}
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
              <p key={result.continent} style={slideStyles.result}>
                {result.continent}: {result.correct}/{result.total} correct
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContinentSlideshow;