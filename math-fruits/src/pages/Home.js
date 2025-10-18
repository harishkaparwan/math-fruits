import React from 'react';
import { Link } from 'react-router-dom';
import FruitCard from '../components/FruitCard';
import Quiz from '../components/Quiz';

const Home = () => {
    const fruits = [
        {
            name: "Apple",
            image: "🍎",
            description: "A sweet, crisp fruit perfect for math problems! If you have 5 apples and eat 2, how many are left?"
        },
        {
            name: "Banana",
            image: "🍌",
            description: "Yellow and curved! If you buy 3 bunches with 6 bananas each, how many bananas do you have?"
        },
        {
            name: "Orange",
            image: "🍊",
            description: "Citrus and round! If you share 12 oranges equally among 4 friends, how many does each get?"
        }
    ];

    return (
        <div className="home">
            <h1>Welcome to Math Fruits!</h1>
            <p>Learn about fruits while solving math problems!</p>
            
            <div className="quick-links" style={{ margin: '30px 0', textAlign: 'center' }}>
                <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>🎮 Quick Start Games</h2>
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/addition" className="quick-link-btn">➕ Addition Game</Link>
                    <Link to="/subtraction" className="quick-link-btn">➖ Subtraction Game</Link>
                    <Link to="/multiplication" className="quick-link-btn">✖️ Multiplication</Link>
                    <Link to="/quiz" className="quick-link-btn">❓ Fruit Quiz</Link>
                </div>
            </div>

            <div className="fruit-cards">
                {fruits.map((fruit, index) => (
                    <FruitCard key={index} fruit={fruit} />
                ))}
            </div>
            <Quiz />
        </div>
    );
};

export default Home;