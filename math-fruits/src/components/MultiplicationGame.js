import React, { useState } from 'react';

const MultiplicationGame = () => {
  const [num1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2] = useState(Math.floor(Math.random() * 10) + 1);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userAnswer = parseInt(answer);
    const correctAnswer = num1 * num2;
    
    setAttempts(attempts + 1);
    
    if (userAnswer === correctAnswer) {
      setFeedback('🎉 Correct! Well done!');
      setScore(score + 1);
    } else {
      setFeedback(`❌ Not quite. The correct answer is ${correctAnswer}`);
    }
    
    setAnswer('');
    
    // Generate new problem after 2 seconds
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="game-container">
      <h1 className="game-title">🔢 Multiplication Game</h1>
      
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div style={{ fontSize: '2rem', margin: '20px 0' }}>
          <span style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '10px',
            margin: '0 10px'
          }}>
            {num1}
          </span>
          <span style={{ fontSize: '2.5rem', color: '#764ba2' }}>×</span>
          <span style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '10px',
            margin: '0 10px'
          }}>
            {num2}
          </span>
          <span style={{ fontSize: '2.5rem', color: '#764ba2' }}>=</span>
          <span style={{ fontSize: '2.5rem', color: '#764ba2' }}>?</span>
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
              border: '2px solid #667eea',
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
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              marginTop: '10px'
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
            background: feedback.includes('Correct') ? '#d4edda' : '#f8d7da',
            color: feedback.includes('Correct') ? '#155724' : '#721c24',
            margin: '20px 0'
          }}>
            {feedback}
          </div>
        )}

        <div style={{ marginTop: '20px', fontSize: '1.1rem', color: '#666' }}>
          <p>Score: {score} / {attempts}</p>
          <p>💡 Tip: Try to calculate {num1} × {num2} in your head!</p>
        </div>
      </div>
    </div>
  );
};

export default MultiplicationGame;