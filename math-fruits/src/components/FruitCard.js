import React from 'react';

const FruitCard = ({ fruit }) => {
    return (
        <div className="fruit-card">
            <h2>{fruit.name}</h2>
            <div className="fruit-emoji" style={{ fontSize: '4rem', textAlign: 'center', margin: '20px 0' }}>
                {fruit.image}
            </div>
            <p>{fruit.description}</p>
        </div>
    );
};

export default FruitCard;