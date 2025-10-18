import React from 'react';
import FruitCard from '../components/FruitCard';
import Quiz from '../components/Quiz';
import './Home.css'; // Assuming you want to style the Home component

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to Math Fruits!</h1>
            <p>Learn about fruits while solving math problems!</p>
            <div className="fruit-cards">
                <FruitCard />
                <FruitCard />
                <FruitCard />
            </div>
            <Quiz />
        </div>
    );
};

export default Home;