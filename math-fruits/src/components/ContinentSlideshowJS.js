import React, { useState } from 'react';
import styled from '@emotion/styled';

const SlideshowContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  color: white;
  font-family: 'Comic Sans MS', cursive;
`;

const SlideContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 30px;
  margin: 20px 0;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContinentEmoji = styled.div`
  font-size: 6rem;
  margin: 20px 0;
`;

const Button = styled.button`
  font-size: 1.2rem;
  padding: 12px 24px;
  background: linear-gradient(45deg, #ff6b6b, #ff8e53);
  border: none;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  margin: 10px;
  
  &:hover {
    transform: scale(1.05);
    transition: all 0.2s ease;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
`;

const ContinentSlideshowJS = () => {
  const continents = [
    {
      name: 'Africa',
      emoji: '🌍',
      description: 'The second largest continent, known for its diverse wildlife and cultures.',
      facts: ['Home to the Sahara Desert', 'Birthplace of humanity', '54 countries', 'Over 2000 languages spoken']
    },
    {
      name: 'Asia',
      emoji: '🌏',
      description: 'The largest continent by both area and population.',
      facts: ['Home to Mount Everest', 'Contains 60% of world population', '48 countries', 'Birthplace of major religions']
    },
    {
      name: 'Europe',
      emoji: '🌍',
      description: 'Known for its rich history and cultural heritage.',
      facts: ['44 countries', 'Rich in art and culture', 'Industrial revolution started here', 'Many famous landmarks']
    },
    {
      name: 'North America',
      emoji: '🌎',
      description: 'Home to diverse landscapes from Arctic to tropical.',
      facts: ['3 major countries', 'Grand Canyon located here', 'Diverse climate zones', 'Rich in natural resources']
    },
    {
      name: 'South America',
      emoji: '🌎',
      description: 'Known for the Amazon rainforest and Andes mountains.',
      facts: ['12 countries', 'Amazon rainforest', 'Andes mountains', 'Rich biodiversity']
    },
    {
      name: 'Australia',
      emoji: '🇦🇺',
      description: 'The smallest continent, unique wildlife and landscapes.',
      facts: ['Also called Oceania', 'Unique animals like kangaroos', 'Great Barrier Reef', 'Indigenous cultures']
    },
    {
      name: 'Antarctica',
      emoji: '🐧',
      description: 'The coldest continent, covered in ice.',
      facts: ['No permanent residents', 'Research stations only', 'Covered in ice', 'Home to penguins']
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % continents.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + continents.length) % continents.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const continent = continents[currentSlide];

  return (
    <SlideshowContainer>
      <h1>🌍 Explore the Continents 🌎</h1>
      
      <SlideContent>
        <ContinentEmoji>{continent.emoji}</ContinentEmoji>
        <h2 style={{ fontSize: '2.5rem', margin: '10px 0' }}>{continent.name}</h2>
        <p style={{ fontSize: '1.3rem', margin: '20px 0', lineHeight: '1.6' }}>
          {continent.description}
        </p>
        
        <div style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Fun Facts:</h3>
          <ul style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            {continent.facts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>
      </SlideContent>

      <NavigationButtons>
        <Button onClick={prevSlide}>← Previous</Button>
        <span style={{ margin: '0 20px', fontSize: '1.2rem' }}>
          {currentSlide + 1} of {continents.length}
        </span>
        <Button onClick={nextSlide}>Next →</Button>
      </NavigationButtons>

      <div style={{ margin: '20px 0' }}>
        {continents.map((_, index) => (
          <Button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              background: index === currentSlide ? 
                'linear-gradient(45deg, #4caf50, #66bb6a)' : 
                'linear-gradient(45deg, #9e9e9e, #757575)',
              margin: '2px',
              padding: '8px 12px',
              fontSize: '1rem'
            }}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </SlideshowContainer>
  );
};

export default ContinentSlideshowJS;