import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/quiz', label: 'Quiz', icon: '❓' },
    { path: '/addition', label: 'Addition Game', icon: '➕' },
    { path: '/addition-more', label: 'Addition More', icon: '🔢' },
    { path: '/subtraction', label: 'Subtraction Game', icon: '➖' },
    { path: '/subtraction-more', label: 'Subtraction More', icon: '📊' },
    { path: '/multiplication', label: 'Multiplication', icon: '✖️' },
    { path: '/multiplication-table', label: 'Times Table', icon: '📋' },
    { path: '/counting', label: 'Counting Table', icon: '🔢' },
    { path: '/story-reader', label: 'Story Reader', icon: '📚' },
    { path: '/little-pig-story', label: 'Little Pig Story', icon: '🐷' },
    { path: '/word-maze', label: 'Word Maze', icon: '🎲' },
    { path: '/continent-slideshow', label: 'Continents', icon: '🌍' },
    { path: '/sea-animals', label: 'Sea Animals', icon: '🐠' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <span className="brand-icon">🍎</span>
            <span className="brand-text">Math Fruits</span>
          </Link>
        </div>
        
        <div className="nav-menu">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;