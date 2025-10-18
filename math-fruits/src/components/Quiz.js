import React, { useState } from 'react';

const Quiz = () => {
    const [score, setScore] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);
    const questions = [
        {
            question: "What fruit is known as the king of fruits?",
            options: ["Mango", "Durian", "Apple", "Banana"],
            answer: "Durian"
        },
        {
            question: "Which fruit is typically red and often mistaken for a vegetable?",
            options: ["Tomato", "Strawberry", "Cherry", "Raspberry"],
            answer: "Tomato"
        },
        {
            question: "Which fruit is known for having seeds on the outside?",
            options: ["Blueberry", "Strawberry", "Kiwi", "Peach"],
            answer: "Strawberry"
        }
    ];

    const handleAnswer = (option) => {
        if (option === questions[questionIndex].answer) {
            setScore(score + 1);
        }
        setQuestionIndex(questionIndex + 1);
    };

    if (questionIndex >= questions.length) {
        return (
            <div>
                <h2>Your score: {score} out of {questions.length}</h2>
                <button onClick={() => {
                    setScore(0);
                    setQuestionIndex(0);
                }}>Restart Quiz</button>
            </div>
        );
    }

    return (
        <div>
            <h2>{questions[questionIndex].question}</h2>
            <div>
                {questions[questionIndex].options.map((option, index) => (
                    <button key={index} onClick={() => handleAnswer(option)}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Quiz;