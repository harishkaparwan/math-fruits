import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Quiz from './components/Quiz';
import AdditionGame from './components/AdditionGame';
import MultiplicationGame from './components/MultiplicationGame';
import SubtractionGame from './components/SubtractionGame';
// Simple components without dependencies
import AdditionGameAdvanced from './components/AdditionGameAdvanced.js';
import SubtractionGameAdvanced from './components/SubtractionGameAdvanced.js';
import ContinentSlideshowJS from './components/ContinentSlideshowJS.js';
import SeaAnimalSlideshowJS from './components/SeaAnimalSlideshowJS.js';
import './styles/App.css';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL || ''}>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addition" element={<AdditionGame />} />
            <Route path="/addition-more" element={<AdditionGameAdvanced />} />
            <Route path="/subtraction" element={<SubtractionGame />} />
            <Route path="/subtraction-more" element={<SubtractionGameAdvanced />} />
            <Route path="/multiplication" element={<MultiplicationGame />} />
            <Route path="/multiplication-table" element={<div className="game-container"><h1 className="game-title">Multiplication Table</h1><p>Coming Soon!</p></div>} />
            <Route path="/counting" element={<div className="game-container"><h1 className="game-title">Counting Table</h1><p>Coming Soon!</p></div>} />
            <Route path="/story-reader" element={<div className="game-container"><h1 className="game-title">Story Reader</h1><p>Coming Soon!</p></div>} />
            <Route path="/little-pig-story" element={<div className="game-container"><h1 className="game-title">Little Pig Story</h1><p>Coming Soon!</p></div>} />
            <Route path="/word-maze" element={<div className="game-container"><h1 className="game-title">Word Maze Game</h1><p>Coming Soon!</p></div>} />
            <Route path="/continent-slideshow" element={<ContinentSlideshowJS />} />
            <Route path="/sea-animals" element={<SeaAnimalSlideshowJS />} />
            <Route path="/quiz" element={<div className="game-container"><h1 className="game-title">Fruit Knowledge Quiz</h1><Quiz /></div>} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;