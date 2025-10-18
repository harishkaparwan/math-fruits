import React, { useState } from 'react';

const SubtractionGame = () => {
  // Generate numbers where num1 is always larger than num2 to avoid negative results
  const num2 = Math.floor(Math.random() * 15) + 1;
  const num1 = Math.floor(Math.random() * 15) + num2;
  
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userAnswer = parseInt(answer);
    const correctAnswer = num1 - num2;
    
    setAttempts(attempts + 1);
    
    if (userAnswer === correctAnswer) {
      setFeedback('🎉 Perfect! You nailed it!');
      setScore(score + 1);
    } else {
      setFeedback(`❌ Close! The correct answer is ${correctAnswer}`);
    }
    
    setAnswer('');
    
    // Generate new problem after 2 seconds
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="game-container">
      <h1 className="game-title">➖ Subtraction Game</h1>
      
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div style={{ fontSize: '2rem', margin: '20px 0' }}>
          <span style={{ 
            background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            color: '#333',
            padding: '10px 20px',
            borderRadius: '10px',
            margin: '0 10px'
          }}>
            {num1}
          </span>
          <span style={{ fontSize: '2.5rem', color: '#ff8a65' }}>−</span>
          <span style={{ 
            background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            color: '#333',
            padding: '10px 20px',
            borderRadius: '10px',
            margin: '0 10px'
          }}>
            {num2}
          </span>
          <span style={{ fontSize: '2.5rem', color: '#ff8a65' }}>=</span>
          <span style={{ fontSize: '2.5rem', color: '#ff8a65' }}>?</span>
        </div>

        <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your answer"
            style={{
              fontSize: '1.5rem',
              padding: '10px 15px',
              border: '2px solid #ff8a65',
              borderRadius: '10px',
              textAlign: 'center',
              margin: '10px'
            }}
            autoFocus
          />
          <br />
          <button
            type="submit"
            disabled={!answer}
            style={{
              fontSize: '1.2rem',
              padding: '12px 25px',
              background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
              color: '#333',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              marginTop: '10px',
              fontWeight: 'bold'
            }}
          >
            Check Answer
          </button>
        </form>

        {feedback && (
          <div style={{
            fontSize: '1.3rem',
            padding: '15px',
            borderRadius: '10px',
            background: feedback.includes('Perfect') ? '#d4edda' : '#f8d7da',
            color: feedback.includes('Perfect') ? '#155724' : '#721c24',
            margin: '20px 0'
          }}>
            {feedback}
          </div>
        )}

        <div style={{ marginTop: '20px', fontSize: '1.1rem', color: '#666' }}>
          <p>Score: {score} / {attempts}</p>
          <p>🍊 Tip: Think about how many you have left after taking some away!</p>
        </div>
      </div>
    </div>
  );
};

export default SubtractionGame;