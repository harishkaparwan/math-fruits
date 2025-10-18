import React, { useState } from 'react';
import styled from '@emotion/styled';

const SlideshowContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
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

const AnimalEmoji = styled.div`
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

const SeaAnimalSlideshowJS = () => {
  const seaAnimals = [
    {
      name: 'Dolphin',
      emoji: '🐬',
      description: 'Intelligent marine mammals known for their playful nature and echolocation abilities.',
      facts: ['Highly intelligent', 'Use echolocation', 'Live in pods', 'Can recognize themselves in mirrors']
    },
    {
      name: 'Whale',
      emoji: '🐋',
      description: 'The largest animals on Earth, these gentle giants migrate thousands of miles.',
      facts: ['Largest animals on Earth', 'Migrate long distances', 'Communicate through songs', 'Breathe air through blowholes']
    },
    {
      name: 'Octopus',
      emoji: '🐙',
      description: 'Highly intelligent invertebrates with eight arms and amazing camouflage abilities.',
      facts: ['8 arms with suction cups', 'Can change color', 'Very intelligent', 'Have 3 hearts']
    },
    {
      name: 'Sea Turtle',
      emoji: '🐢',
      description: 'Ancient mariners that have been swimming the oceans for millions of years.',
      facts: ['Can live over 100 years', 'Navigate using magnetic fields', 'Return to birth beaches to nest', 'Eat jellyfish and seagrass']
    },
    {
      name: 'Shark',
      emoji: '🦈',
      description: 'Apex predators with excellent senses and streamlined bodies for hunting.',
      facts: ['Excellent sense of smell', 'Cartilage skeleton', 'Been around for 400 million years', 'Important for ocean ecosystem']
    },
    {
      name: 'Jellyfish',
      emoji: '🪼',
      description: 'Simple but beautiful creatures that drift through the ocean currents.',
      facts: ['95% water', 'No brain or heart', 'Some are immortal', 'Beautiful but can sting']
    },
    {
      name: 'Seahorse',
      emoji: '🐴',
      description: 'Unique fish where males carry the babies and have prehensile tails.',
      facts: ['Males carry babies', 'Prehensile tail', 'Eyes move independently', 'Poor swimmers']
    },
    {
      name: 'Starfish',
      emoji: '⭐',
      description: 'Amazing creatures that can regenerate lost arms and have no brain.',
      facts: ['Can regenerate lost arms', 'No brain or blood', 'Water vascular system', 'Some have 40 arms']
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % seaAnimals.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + seaAnimals.length) % seaAnimals.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const animal = seaAnimals[currentSlide];

  return (
    <SlideshowContainer>
      <h1>🌊 Discover Sea Animals 🐠</h1>
      
      <SlideContent>
        <AnimalEmoji>{animal.emoji}</AnimalEmoji>
        <h2 style={{ fontSize: '2.5rem', margin: '10px 0' }}>{animal.name}</h2>
        <p style={{ fontSize: '1.3rem', margin: '20px 0', lineHeight: '1.6' }}>
          {animal.description}
        </p>
        
        <div style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Amazing Facts:</h3>
          <ul style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            {animal.facts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>
      </SlideContent>

      <NavigationButtons>
        <Button onClick={prevSlide}>← Previous</Button>
        <span style={{ margin: '0 20px', fontSize: '1.2rem' }}>
          {currentSlide + 1} of {seaAnimals.length}
        </span>
        <Button onClick={nextSlide}>Next →</Button>
      </NavigationButtons>

      <div style={{ margin: '20px 0' }}>
        {seaAnimals.map((_, index) => (
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

export default SeaAnimalSlideshowJS;