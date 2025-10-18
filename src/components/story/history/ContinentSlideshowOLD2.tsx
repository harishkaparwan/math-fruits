import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { motion, AnimatePresence } from 'framer-motion';
import { atom, useAtom, useAtomValue } from 'jotai';
import { atomWithCache } from 'jotai-cache';
import worldMap from '../../../assets/world-map.jpg'; 
// Continent data with questions
const continents = [
  {
    name: 'Africa',
    description: 'Africa is a land of wild animals like lions and elephants.',
    highlight: { top: '40%', left: '40%', width: '20%', height: '30%', backgroundColor: 'rgba(255, 165, 0, 0.5)' },
    questions: [
      { question: 'Which animal is known as the "King of the Jungle" in Africa?', options: ['Lion', 'Elephant', 'Giraffe', 'Zebra'], correct: 0 },
     { question: 'What is the largest desert in Africa?', options: ['Sahara', 'Kalahari', 'Namib', 'Gobi'], correct: 0 },
      // { question: 'Which river is the longest in Africa?', options: ['Nile', 'Congo', 'Zambezi', 'Niger'], correct: 0 },
      // { question: 'What is the capital of South Africa?', options: ['Cape Town', 'Pretoria', 'Johannesburg', 'Durban'], correct: 1 },
      // { question: 'Which African country is known for pyramids?', options: ['Egypt', 'Kenya', 'Nigeria', 'Ghana'], correct: 0 },
      // { question: 'What is a common African grassland called?', options: ['Savanna', 'Tundra', 'Forest', 'Desert'], correct: 0 },
    ],
  },
  {
    name: 'Antarctica',
    description: 'Antarctica is a very cold, icy place where penguins live.',
    highlight: { top: '80%', left: '20%', width: '60%', height: '20%', backgroundColor: 'rgba(0, 191, 255, 0.5)' },
    questions: [
      { question: 'What is the primary animal species in Antarctica?', options: ['Penguins', 'Polar Bears', 'Seals', 'Whales'], correct: 0 },
      { question: 'What is the temperature like in Antarctica?', options: ['Very Cold', 'Warm', 'Hot', 'Mild'], correct: 0 },
      // { question: 'Which ocean surrounds Antarctica?', options: ['Southern', 'Pacific', 'Atlantic', 'Indian'], correct: 0 },
      // { question: 'What is Antarctica covered in?', options: ['Ice', 'Sand', 'Grass', 'Forests'], correct: 0 },
      // { question: 'Is Antarctica a continent or a country?', options: ['Continent', 'Country', 'Island', 'State'], correct: 0 },
      // { question: 'Which season is longest in Antarctica?', options: ['Winter', 'Summer', 'Spring', 'Fall'], correct: 0 },
    ],
  },
  {
    name: 'Asia',
    description: 'Asia is the biggest continent with many different people and cultures.',
    highlight: { top: '20%', left: '60%', width: '30%', height: '40%', backgroundColor: 'rgba(255, 0, 0, 0.5)' },
    questions: [
      { question: 'Which is the largest country in Asia by area?', options: ['Russia', 'China', 'India', 'Japan'], correct: 0 },
      { question: 'What is the tallest mountain in Asia?', options: ['Everest', 'K2', 'Kangchenjunga', 'Lhotse'], correct: 0 },
      // { question: 'Which river is sacred in India?', options: ['Ganges', 'Yangtze', 'Yellow', 'Mekong'], correct: 0 },
      // { question: 'Which country is known as the "Land of the Rising Sun"?', options: ['Japan', 'China', 'Korea', 'Thailand'], correct: 0 },
      // { question: 'What is the largest desert in Asia?', options: ['Gobi', 'Thar', 'Karakum', 'Taklamakan'], correct: 0 },
      // { question: 'Which Asian city is the most populous?', options: ['Tokyo', 'Delhi', 'Shanghai', 'Mumbai'], correct: 0 },
    ],
  },
  {
    name: 'Europe',
    description: 'Europe is full of old castles, fun stories, and pretty towns.',
    highlight: { top: '20%', left: '40%', width: '15%', height: '20%', backgroundColor: 'rgba(0, 128, 0, 0.5)' },
    questions: [
      // { question: 'Which river flows through Paris?', options: ['Seine', 'Thames', 'Danube', 'Rhine'], correct: 0 },
      { question: 'What is the capital of Italy?', options: ['Rome', 'Paris', 'Berlin', 'Madrid'], correct: 0 },
      { question: 'Which country has the Eiffel Tower?', options: ['France', 'Germany', 'Spain', 'UK'], correct: 0 },
      // { question: 'What sea borders Southern Europe?', options: ['Mediterranean', 'Baltic', 'North', 'Black'], correct: 0 },
      // { question: 'Which country is famous for windmills?', options: ['Netherlands', 'Denmark', 'Sweden', 'Norway'], correct: 0 },
      // { question: 'What is the smallest country in Europe?', options: ['Vatican City', 'Monaco', 'Malta', 'Luxembourg'], correct: 0 },
    ],
  },
  {
    name: 'North America',
    description: 'North America has big cities, tall mountains, and lovely parks.',
    highlight: { top: '20%', left: '10%', width: '25%', height: '30%', backgroundColor: 'rgba(255, 215, 0, 0.5)' },
    questions: [
      // { question: 'What is the largest country in North America?', options: ['Canada', 'USA', 'Mexico', 'Cuba'], correct: 0 },
      // { question: 'Which mountain range runs through the western USA?', options: ['Rockies', 'Appalachians', 'Sierra Nevada', 'Cascades'], correct: 0 },
      { question: 'What is the capital of the USA?', options: ['Washington D.C.', 'New York', 'Los Angeles', 'Chicago'], correct: 0 },
       { question: 'Which famous park is in Wyoming?', options: ['Yellowstone', 'Yosemite', 'Grand Canyon', 'Everglades'], correct: 0 },
      // { question: 'What ocean borders the east coast?', options: ['Atlantic', 'Pacific', 'Arctic', 'Gulf'], correct: 0 },
      // { question: 'Which city is known for Hollywood?', options: ['Los Angeles', 'Miami', 'Toronto', 'Vancouver'], correct: 0 },
    ],
  },
  {
    name: 'Australia',
    description: 'Australia is a sunny place where kangaroos and koalas live.',
    highlight: { top: '60%', left: '70%', width: '15%', height: '20%', backgroundColor: 'rgba(128, 0, 128, 0.5)' },
    questions: [
      { question: 'What animal is a symbol of Australia?', options: ['Kangaroo', 'Koala', 'Emu', 'All of these'], correct: 0 },
      // { question: 'What is the capital of Australia?', options: ['Canberra', 'Sydney', 'Melbourne', 'Perth'], correct: 0 },
       { question: 'Which reef is off Australia’s coast?', options: ['Great Barrier', 'Coral Sea', 'Ningaloo', 'Pacific'], correct: 0 },
      // { question: 'What is the largest desert in Australia?', options: ['Great Victoria', 'Simpson', 'Gibson', 'Tanami'], correct: 0 },
      // { question: 'Which city has the famous Opera House?', options: ['Sydney', 'Melbourne', 'Brisbane', 'Adelaide'], correct: 0 },
      // { question: 'What is Australia also called?', options: ['Down Under', 'Outback', 'Land Above', 'Island West'], correct: 0 },
    ],
  },
  {
    name: 'South America',
    description: 'South America has lush rainforests, colorful festivals, and amazing nature.',
    highlight: { top: '50%', left: '20%', width: '15%', height: '30%', backgroundColor: 'rgba(0, 0, 255, 0.5)' },
    questions: [
      // { question: 'Which rainforest covers much of South America?', options: ['Amazon', 'Congo', 'Daintree', 'Borneo'], correct: 0 },
       { question: 'What is the capital of Brazil?', options: ['Brasilia', 'Rio de Janeiro', 'Sao Paulo', 'Lima'], correct: 0 },
      // { question: 'Which mountain range runs along the west?', options: ['Andes', 'Rockies', 'Alps', 'Himalayas'], correct: 0 },
      // { question: 'What is the largest country in South America?', options: ['Brazil', 'Argentina', 'Peru', 'Chile'], correct: 0 },
      // { question: 'Which dance is famous in South America?', options: ['Samba', 'Waltz', 'Ballet', 'Hip Hop'], correct: 0 },
      { question: 'What waterfall is on the Brazil-Argentina border?', options: ['Iguazu', 'Niagara', 'Victoria', 'Angel'], correct: 0 },
    ],
  },
];

// Unique background colors for questions and answers
const colors = [
  '#FFB6C1', '#ADD8E6', '#98FB98', '#FFDAB9', '#E6E6FA', '#F0E68C', '#DDA0DD', '#B0E0E6', '#F08080', '#E0FFFF',
];

// Jotai atoms
const studentNameAtom = atom('John Doe');
const answersAtom = atom<Record<string, number[]>>({}); // Store selected option indices
const resultCacheAtom = atomWithCache(async (get) => {
  const answers = get(answersAtom);
  const results = continents.map((continent) => {
    const studentAnswers = answers[continent.name] || [];
    const correctCount = studentAnswers.reduce((acc, ans, i) => acc + (ans === continent.questions[i].correct ? 1 : 0), 0);
    return { continent: continent.name, correct: correctCount, total: 6 };
  });
  const totalCorrect = results.reduce((acc, res) => acc + res.correct, 0);
  const totalWrong = 42 - totalCorrect; // 7 continents * 6 questions
  return { results, totalCorrect, totalWrong };
});
const showResultsAtom = atom(false);

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
  airplane: { position: 'fixed' as const, top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000, backgroundColor: 'rgba(0, 191, 255, 0.8)', display: 'flex', flexDirection: 'column' as const, alignItems: 'center' as const, justifyContent: 'center' as const },
  result: { color: '#fff', fontSize: '1.5rem', margin: '10px 0' },
  correct: { backgroundColor: '#90EE90' }, // Light green for correct sections
} satisfies Record<string, React.CSSProperties>;

const ContinentSlideshowOLD2 = () => {
  const [studentName, setStudentName] = useAtom(studentNameAtom);
  const [answers, setAnswers] = useAtom(answersAtom);
  const cachedResults = useAtomValue(resultCacheAtom);
  const [showResults, setShowResults] = useAtom(showResultsAtom);

  const currentDate = 'March 22, 2025'; // Static per your context

  const handleAnswer = (continent: string, questionIndex: number, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [continent]: prev[continent] ? [...prev[continent].slice(0, questionIndex), optionIndex, ...prev[continent].slice(questionIndex + 1)] : Array(6).fill(-1).map((_, i) => (i === questionIndex ? optionIndex : -1)),
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
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
        {continents.map((continent, continentIndex) => (
          <div key={continent.name}>
            <h3>{continent.name}</h3>
            {continent.questions.map((q, qIndex) => {
              const questionColor = colors[(continentIndex * 6 + qIndex) % colors.length];
              const answerColor = colors[(continentIndex * 6 + qIndex + 1) % colors.length];
              const isCorrect = showResults && (answers[continent.name]?.[qIndex] ?? -1) === q.correct;
              const isWrong = showResults && (answers[continent.name]?.[qIndex] ?? -1) !== -1 && !isCorrect;

              return (
                <motion.div
                  key={qIndex}
                  style={{
                    ...slideStyles.questionContainer,
                    ...(isCorrect ? slideStyles.correct : {}),
                  }}
                  animate={isWrong ? { backgroundColor: ['#ff6347', '#ffffff', '#ff6347'] } : {}}
                  transition={isWrong ? { duration: 0.5, repeat: Infinity } : {}}
                >
                  <div style={{ ...slideStyles.question, backgroundColor: questionColor }}>
                    <strong>Question:</strong> {q.question}
                  </div>
                  <div style={{ ...slideStyles.answerContainer, backgroundColor: answerColor }}>
                    <strong>Answer:</strong>
                    {q.options.map((option, optionIndex) => {
                      const isSelected = (answers[continent.name]?.[qIndex] ?? -1) === optionIndex;
                      const highlightColor = isDarkBackground(answerColor) ? '#d3d3d3' : '#ffff99'; // Gray or yellow based on background
                      return (
                        <div key={option} style={slideStyles.option}>
                          <input
                            type="radio"
                            name={`${continent.name}-${qIndex}`}
                            checked={isSelected}
                            onChange={() => handleAnswer(continent.name, qIndex, optionIndex)}
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
          </div>
        ))}
        <button style={slideStyles.submitButton} onClick={handleSubmit}>
          Submit Answers
        </button>
      </div>
      <p style={{ fontSize: '0.8rem', color: '#999' }}>Map provided by GIS Geography</p>

      {/* Airplane Animation with Cached Results */}
      <AnimatePresence>
        {showResults && cachedResults.totalCorrect === 42 && (
          <motion.div
            style={slideStyles.airplane}
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '100vw' }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
          >
            <motion.span
              style={{ fontSize: '5rem' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              ✈️
            </motion.span>
            <p style={{ color: '#fff', fontSize: '2rem' }}>Congratulations, {studentName}!</p>
            {cachedResults.results.map((result) => (
              <p key={result.continent} style={slideStyles.result}>
                {result.continent}: {result.correct}/{result.total} correct
              </p>
            ))}
            <p style={slideStyles.result}>Total Correct: {cachedResults.totalCorrect}</p>
            <p style={slideStyles.result}>Total Wrong: {cachedResults.totalWrong}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContinentSlideshowOLD2;