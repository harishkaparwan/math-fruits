import React from 'react';
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