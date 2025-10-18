import React from 'react';
import styled from '@emotion/styled';
import { atom, useAtom } from 'jotai';
import { Provider } from 'jotai';
import { useAtomsDevtools } from 'jotai-devtools';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdditionMoreGame from './components/AdditionMoreGame';

import { faBook, faBookReader, faFish, faMap, faMinus, faMultiply, faPlus, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
// import CountingTable from './components/CountingTable';
// import AdditionGame from './components/AdditionGame';
// import SubtractionGame from './components/SubtractionGame';
import SubtractionMoreGame from './components/SubtractionMoreGame';
//import MultiplicationForm from './components/MultiplicationForm';
import StoryReader from './components/StoryReader';
import LittlePigStoryReader from './components/LittlePigStoryReader';
// import ContinentSlideshow from './components/story/history/ContinentSlideshow';
// import SeaAnimalSlideshow from './components/story/history/SeaAnimalSlideshow';
// import WordMazeGame from './components/story/game/WordMazeGame';
// import WordMazeDynamicGame from './components/story/game/WordMazeDynamicGame';
import 'jotai-devtools/styles.css';
import MultiplicationTable from './components/MultiplicationTable';
import MultiplicationForm from './components/MultiplicationForm';
import WordMazeGame from './components/story/game/WordMazeGame';

type TabName =
  | 'counting'
  | 'addition'
  | 'additionMore'
  | 'subtraction'
  | 'subtractionMore'
  | 'multiplication'
  | 'readStory'
  | 'littlePigStoryReader'
  | 'continents'
  | 'seaAnimal'
  | 'WordMazeGame'
  | 'WordMazeDynamicGame';

const tabStatusAtom = atom<Record<TabName, boolean>>({
  counting: false,
  addition: false,
  additionMore: false,
  subtraction: false,
  subtractionMore: false,
  multiplication: false,
  readStory: false,
  littlePigStoryReader: false,
  continents: false,
  seaAnimal: false,
  WordMazeGame: false,
  WordMazeDynamicGame: false,
});

const activeTabAtom = atom<TabName>('additionMore');

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Tabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const TabButton = styled.button<{ active: boolean; disabled: boolean }>`
  padding: 10px 20px;
  background: ${props => (props.active ? '#4CAF50' : props.disabled ? '#cccccc' : '#f0f0f0')};
  color: ${props => (props.active ? 'white' : props.disabled ? '#666666' : 'black')};
  border: none;
  border-radius: 5px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;

  &:hover {
    opacity: ${props => (props.disabled ? 1 : 0.9)};
  }
`;

const IconWrapper = styled.div<{ active: boolean }>`
  width: 24px;
  height: 24px;
  background: ${props => (props.active ? '#ffffff' : '#666666')};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => (props.active ? '#4CAF50' : '#ffffff')};
`;

const TabContent = ({ tab, onComplete }: { tab: TabName; onComplete: () => void }) => {
  switch (tab) {
    // case 'counting':
    //   return <CountingTable onComplete={onComplete} />;
    // case 'addition':
    //   return <AdditionGame onComplete={onComplete} />;
    case 'additionMore':
      return <AdditionMoreGame onComplete={onComplete} />;
    // case 'subtraction':
    //   return <SubtractionGame onComplete={onComplete} />;
    case 'subtractionMore':
      return <SubtractionMoreGame onComplete={onComplete} />;
    case 'multiplication':
      return <MultiplicationForm onComplete={onComplete} />;
    case 'readStory':
      return <StoryReader onComplete={onComplete} />;
    case 'littlePigStoryReader':
      return <LittlePigStoryReader onComplete={onComplete} />;
    // case 'continents':
    //   return <ContinentSlideshow onComplete={onComplete} />;
    // case 'seaAnimal':
    //   return <SeaAnimalSlideshow onComplete={onComplete} />;
    case 'WordMazeGame':
      return <WordMazeGame onComplete={onComplete} />;
    // case 'WordMazeDynamicGame':
    //   return <WordMazeDynamicGame onComplete={onComplete} />;
    default:
      return null;
  }
};

function App() {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const [tabStatus, setTabStatus] = useAtom(tabStatusAtom);
  useAtomsDevtools('MyApp');

  const handleTaskComplete = (tab: TabName) => {
    setTabStatus(prev => ({ ...prev, [tab]: true }));
    if (tab === 'additionMore' && !tabStatus.subtractionMore) {
      setActiveTab('subtractionMore');
    }else if (tab === 'subtractionMore' && !tabStatus.multiplication) {
      setActiveTab('multiplication'); 
    }else if (tab === 'multiplication' && !tabStatus.readStory) {
      setActiveTab('readStory');
    }else if (tab === 'readStory' && !tabStatus.littlePigStoryReader) {
      setActiveTab('littlePigStoryReader');
    }else if (tab === 'littlePigStoryReader' && !tabStatus.continents) {
      setActiveTab('continents');
    }else if (tab === 'continents' && !tabStatus.seaAnimal) {
      setActiveTab('seaAnimal');
    }else if (tab === 'seaAnimal' && !tabStatus.WordMazeGame) {
      setActiveTab('WordMazeGame');
    }else if (tab === 'WordMazeGame' && !tabStatus.WordMazeDynamicGame) {
      setActiveTab('additionMore');
    }
  };

  const isTabUnlocked = (tab: TabName) => {
    const unlocked = tab === 'additionMore' && !tabStatus.additionMore
    ? true
    : tab === activeTab || !tabStatus[tab];
  console.log(`Tab: ${tab}, Active: ${activeTab}, Completed: ${tabStatus[tab]}, Unlocked: ${unlocked}`);
  return unlocked;
  };

  return (
    <Provider>
      <AppContainer>
        <h1>Kiara Kaparwan - Home Classes</h1>
        <Tabs>
          <TabButton
            active={activeTab === 'additionMore'}
            disabled={!isTabUnlocked('additionMore')}
            onClick={() => isTabUnlocked('additionMore') && setActiveTab('additionMore')}
          >
            <IconWrapper active={activeTab === 'additionMore'}>
              <FontAwesomeIcon icon={faPlus} />
            </IconWrapper>
            Addition [Add More]
          </TabButton>
           <TabButton
            active={activeTab === 'subtractionMore'}
            disabled={!isTabUnlocked('subtractionMore')}
            onClick={() => isTabUnlocked('subtractionMore') && setActiveTab('subtractionMore')}
          >
            <IconWrapper active={activeTab === 'subtractionMore'}>
              <FontAwesomeIcon icon={faMinus} />
            </IconWrapper>
            Subtraction [Take Away]
          </TabButton>
         <TabButton
            active={activeTab === 'multiplication'}
            disabled={!isTabUnlocked('multiplication')}
            onClick={() => isTabUnlocked('multiplication') && setActiveTab('multiplication')}
          >
            <IconWrapper active={activeTab === 'multiplication'}>
              <FontAwesomeIcon icon={faMultiply} />
            </IconWrapper>
            Multiplication [Count By]
          </TabButton>
          <TabButton
            active={activeTab === 'readStory'}
            disabled={!isTabUnlocked('readStory')}
            onClick={() => isTabUnlocked('readStory') && setActiveTab('readStory')}
          >
            <IconWrapper active={activeTab === 'readStory'}>
              <FontAwesomeIcon icon={faBookReader} />
            </IconWrapper>
            Read a Story
          </TabButton>
          <TabButton
            active={activeTab === 'littlePigStoryReader'}
            disabled={!isTabUnlocked('littlePigStoryReader')}
            onClick={() => isTabUnlocked('littlePigStoryReader') && setActiveTab('littlePigStoryReader')}
          >
            <IconWrapper active={activeTab === 'littlePigStoryReader'}>
              <FontAwesomeIcon icon={faBook} color="red" />
            </IconWrapper>
            3 Little Pig Story
          </TabButton>
          {/* <TabButton
            active={activeTab === 'continents'}
            disabled={!isTabUnlocked('continents')}
            onClick={() => isTabUnlocked('continents') && setActiveTab('continents')}
          >
            <IconWrapper active={activeTab === 'continents'}>
              <FontAwesomeIcon icon={faMap} />
            </IconWrapper>
            Continents
          </TabButton>
          <TabButton
            active={activeTab === 'seaAnimal'}
            disabled={!isTabUnlocked('seaAnimal')}
            onClick={() => isTabUnlocked('seaAnimal') && setActiveTab('seaAnimal')}
          >
            <IconWrapper active={activeTab === 'seaAnimal'}>
              <FontAwesomeIcon icon={faFish} />
            </IconWrapper>
            Sea Animals
          </TabButton> */}
          <TabButton
            active={activeTab === 'WordMazeGame'}
            disabled={!isTabUnlocked('WordMazeGame')}
            onClick={() => isTabUnlocked('WordMazeGame') && setActiveTab('WordMazeGame')}
          >
            <IconWrapper active={activeTab === 'WordMazeGame'}>
              <FontAwesomeIcon icon={faPuzzlePiece} />
            </IconWrapper>
            Word Maze Game
          </TabButton>
        </Tabs> 

        <TabContent tab={activeTab} onComplete={() => handleTaskComplete(activeTab)} />
      </AppContainer>
    </Provider>
  );
}

export default App;