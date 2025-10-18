import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './styles/App.css';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;