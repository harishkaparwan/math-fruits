import React from 'react';

const FruitCard = ({ fruit }) => {
    return (
        <div className="fruit-card">
            <h2>{fruit.name}</h2>
            <img src={fruit.image} alt={fruit.name} />
            <p>{fruit.description}</p>
        </div>
    );
};

export default FruitCard;