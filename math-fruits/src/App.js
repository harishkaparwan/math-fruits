import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Quiz from './components/Quiz';
import AdditionGame from './components/AdditionGame';
import MultiplicationGame from './components/MultiplicationGame';
import SubtractionGame from './components/SubtractionGame';
import './styles/App.css';

// Placeholder components for now
const GamePlaceholder = ({ title, description }) => (
  <div className="game-container">
    <h1 className="game-title">{title}</h1>
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
        {description}
      </p>
      <p style={{ color: '#999' }}>This game component will be available soon!</p>
    </div>
  </div>
);

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL || ''}>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addition" element={<AdditionGame />} />
            <Route path="/addition-more" element={<GamePlaceholder title="Advanced Addition" description="More challenging addition problems for advanced learners!" />} />
            <Route path="/subtraction" element={<SubtractionGame />} />
            <Route path="/subtraction-more" element={<GamePlaceholder title="Advanced Subtraction" description="Advanced subtraction challenges!" />} />
            <Route path="/multiplication" element={<MultiplicationGame />} />
            <Route path="/multiplication-table" element={<GamePlaceholder title="Times Tables" description="Practice and memorize multiplication tables!" />} />
            <Route path="/counting" element={<GamePlaceholder title="Counting Table" description="Learn counting and number recognition!" />} />
            <Route path="/story-reader" element={<GamePlaceholder title="Story Reader" description="Interactive stories to improve reading skills!" />} />
            <Route path="/little-pig-story" element={<GamePlaceholder title="Little Pig Story" description="A delightful story about a little pig's adventures!" />} />
            <Route path="/word-maze" element={<GamePlaceholder title="Word Maze" description="Navigate through word puzzles and mazes!" />} />
            <Route path="/continent-slideshow" element={<GamePlaceholder title="Continents Explorer" description="Learn about different continents around the world!" />} />
            <Route path="/sea-animals" element={<GamePlaceholder title="Sea Animals" description="Discover amazing creatures from the ocean!" />} />
            <Route path="/quiz" element={<div className="game-container"><h1 className="game-title">Fruit Knowledge Quiz</h1><Quiz /></div>} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;