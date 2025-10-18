import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import worldMap from '../../../assets/world-map.jpg'; // Adjust path based on your project structure

// Continent data with descriptions and highlight positions
const continents = [
  {
    name: 'Africa',
    description: 'Africa is a land of wild animals like lions and elephants.',
    highlight: { top: '40%', left: '40%', width: '20%', height: '30%', backgroundColor: 'rgba(255, 0, 0, 0.5)' },
  },
  {
    name: 'Antarctica',
    description: 'Antarctica is a very cold, icy place where penguins live.',
    highlight: { top: '80%', left: '20%', width: '60%', height: '20%', backgroundColor: 'rgba(0, 191, 255, 0.5)' },
  },
  {
    name: 'Asia',
    description: 'Asia is the biggest continent with many different people and cultures.',
    highlight: { top: '20%', left: '60%', width: '30%', height: '40%', backgroundColor: 'rgba(255, 0, 0, 0.5)' },
  },
  {
    name: 'Europe',
    description: 'Europe is full of old castles, fun stories, and pretty towns.',
    highlight: { top: '20%', left: '40%', width: '15%', height: '20%', backgroundColor: 'rgba(2, 82, 2, 0.5)' },
  },
  {
    name: 'North America',
    description: 'North America has big cities, tall mountains, and lovely parks.',
    highlight: { top: '20%', left: '10%', width: '25%', height: '30%', backgroundColor: 'rgba(29, 19, 119, 0.5)' },
  },
  {
    name: 'Australia',
    description: 'Australia is a sunny place where kangaroos and koalas live.',
    highlight: { top: '60%', left: '70%', width: '15%', height: '20%', backgroundColor: 'rgba(5, 26, 89, 0.5)' },
  },
  {
    name: 'South America',
    description: 'South America has lush rainforests, colorful festivals, and amazing nature.',
    highlight: { top: '50%', left: '20%', width: '15%', height: '30%', backgroundColor: 'rgba(0, 0, 255, 0.5)' },
  },
];

// Styles with TypeScript typing
const slideStyles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center' as const,
  },
  slide: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    height: '600px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    padding: '20px',
  },
  mapContainer: {
    position: 'relative' as const,
    width: '100%',
    maxWidth: '600px',
    height: '400px',
    marginBottom: '20px',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    borderRadius: '8px',
  },
  highlight: {
    position: 'absolute' as const,
    borderRadius: '5px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold' as const,
    color: '#333',
    marginBottom: '10px',
  },
  description: {
    fontSize: '1.2rem',
    color: '#666',
    maxWidth: '600px',
  },
} satisfies Record<string, React.CSSProperties>;

export const ContinentSlideshowOLD = () => {
  return (
    <div style={slideStyles.container}>
      <h1>Explore the Continents</h1>
      <Slide
        autoplay={false}
        arrows={true}
        indicators={true}
        duration={3000}
      >
        {continents.map((continent, index) => (
          <div key={index} className="each-slide" style={slideStyles.slide}>
            <div style={slideStyles.mapContainer}>
              <img src={worldMap} alt="World Map" style={slideStyles.mapImage} />
              <div
                style={{
                  ...slideStyles.highlight,
                  ...continent.highlight,
                }}
              />
            </div>
            <h2 style={slideStyles.title}>{continent.name}</h2>
            <p style={slideStyles.description}>{continent.description}</p>
          </div>
        ))}
      </Slide>
      <p style={{ fontSize: '0.8rem', color: '#999' }}>
        Map provided by GIS Geography
      </p>
    </div>
  );
};

export default ContinentSlideshowOLD;