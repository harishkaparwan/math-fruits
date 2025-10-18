// src/components/MultiplicationForm.tsx
import React from 'react';
import styled from '@emotion/styled';
import { atom, useAtom } from 'jotai';
import { motion } from 'framer-motion';
import MultiplicationTable from './MultiplicationTable';
import { TaskComponentProps } from './story/interface/AppProps';
const GameContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  margin: 20px auto;
`;

const GameTitle = styled.h2`
  color: #333;
  font-family: Arial, sans-serif;
  margin-bottom: 20px;
`;

const FlashButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color:rgb(175, 76, 94);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  /* Flashing text effect */
  span {
    animation: flash 1.5s infinite;
  }

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #3d8b40;
  }

  @keyframes flash {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.2;
    }
    100% {
      opacity: 1;
    }
  }
`;
const FormContainer = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 margin-top: 20px;
`;

const DateDisplay = styled.div`
 font-size: 24px;
 color: #333;
 margin-bottom: 20px;
`;

const InputForm = styled.form`
 display: flex;
 gap: 15px;
 align-items: center;
`;

const NumberInput = styled.input`
 width: 100px;
 height: 40px;
 font-size: 20px;
 padding: 5px;
 border: 2px solid #4CAF50;
 border-radius: 5px;
 text-align: center;
 -webkit-appearance: none;
 -moz-appearance: textfield;
 &:focus {
 outline: none;
 border-color: #45a049;
 }
 &::-webkit-inner-spin-button,
 &::-webkit-outer-spin-button {
 -webkit-appearance: none;
 margin: 0;
 }
`;

const NameInput = styled.input`
 width: 200px;
 height: 40px;
 font-size: 20px;
 padding: 5px;
 border: 2px solid #4CAF50;
 border-radius: 5px;
 text-align: center;
 margin-bottom: 20px;
`;

const SubmitButton = styled.button`
 padding: 10px 20px;
 font-size: 16px;
 background: #4CAF50;
 color: white;
 border: none;
 border-radius: 5px;
 cursor: pointer;
 &:hover {
 background: #45a049;
 }
`;

const CongratsContainer = styled.div`
 margin-bottom: 20px;
`;

const FlashingCongrats = styled(motion.h2)`
 font-size: 28px;
 color: #4CAF50;
 padding: 10px 20px;
 border-radius: 8px;
 display: inline-block;
`;

const ResultDisplay = styled.div`
 margin-top: 20px;
 padding: 20px;
 border: 2px solid #4CAF50;
 border-radius: 8px;
 background-color: #f0f0f0;
 text-align: center;
`;

const ResultText = styled.p`
 font-size: 20px;
 color: #333;
 margin: 5px 0;
`;

const RestartButton = styled.button`
 padding: 10px 20px;
 font-size: 16px;
 background: #4CAF50;
 color: white;
 border: none;
 border-radius: 5px;
 cursor: pointer;
 margin-top: 20px;
 &:hover {
 background: #45a049;
 }
`;

// Jotai atoms (exported)
export const inputAtom = atom('');
export const showTableAtom = atom(false);
export const studentNameAtom = atom('');
export const answersAtom = atom<string[]>(Array(10).fill(''));
export const attemptsAtom = atom<number[]>(Array(10).fill(0));
export const correctCountAtom = atom(0);
export const isCompleteAtom = atom(false);
export const countByNumberAtom = atom(2);

const MultiplicationForm: React.FC<TaskComponentProps> = ({ onComplete }) => {
 const [inputValue, setInputValue] = useAtom(inputAtom);
 const [showTable, setShowTable] = useAtom(showTableAtom);
 const [studentName, setStudentName] = useAtom(studentNameAtom);
 const [isComplete, setIsComplete] = useAtom(isCompleteAtom);
 const [answers, setAnswers] = useAtom(answersAtom);
 const [attempts, setAttempts] = useAtom(attemptsAtom);
 const [correctCount, setCorrectCount] = useAtom(correctCountAtom);
 const [countByNumber, setCountByNumber] = useAtom(countByNumberAtom);
 const currentDate = new Date().toLocaleDateString('en-US', {
 year: 'numeric',
 month: 'long',
 day: 'numeric',
 });
 const handleFinish = () => {
    onComplete();
  };
 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 const num = parseInt(inputValue);
 if (num >= 1 && num <= 20) {
 setCountByNumber(num);
 setShowTable(true);
 } else {
 setShowTable(false);
 }
 };

 const handleRestart = () => {
 setInputValue('');
 setShowTable(false);
 setStudentName('');
 setAnswers(Array(10).fill(''));
 setAttempts(Array(10).fill(0));
 setCorrectCount(0);
 setIsComplete(false);
 setCountByNumber(2);
 };

 return (
 <FormContainer>
 {isComplete && (
 <CongratsContainer>
 <FlashingCongrats
 animate={{
 scale: [1, 1.05, 1],
 backgroundColor: ['#fff3e0', '#ffe0b2', '#fff3e0'],
 boxShadow: [
 '0 0 5px rgba(76, 175, 80, 0.5)',
 '0 0 15px rgba(76, 175, 80, 0.8)',
 '0 0 5px rgba(76, 175, 80, 0.5)',
 ],
 }}
 transition={{
 duration: 1,
 repeat: Infinity,
 ease: 'easeInOut',
 }}
 >
 Congratulations, {studentName || 'Student'}!
 </FlashingCongrats>
 </CongratsContainer>
 )}
 <DateDisplay>Today: {currentDate}</DateDisplay>
 <NameInput
 type="text"
 value={studentName}
 onChange={(e) => setStudentName(e.target.value)}
 placeholder="Enter your name"
 disabled={showTable || isComplete}
 />
 {!isComplete && (
 <InputForm onSubmit={handleSubmit}>
 <NumberInput
 type="text"
 value={inputValue}
 onChange={(e) => setInputValue(e.target.value)}
 placeholder="Enter 1-20"
 disabled={showTable}
 />
 <SubmitButton type="submit">Show Table</SubmitButton>
 </InputForm>
 )}
 {showTable && !isComplete && <MultiplicationTable onComplete={onComplete}/>}
 {isComplete && (
    <>
 <ResultDisplay>
 <ResultText>Student Name: {studentName || 'Student'}</ResultText>
 <ResultText>Count by Number: {countByNumber}</ResultText>
 <ResultText>Date: {currentDate}</ResultText>
 <ResultText>Result: {correctCount} out of 10 correct on first attempt</ResultText>
 <ResultText>Total Attempts: {attempts.reduce((sum, a) => sum + a, 0)}</ResultText>
 <RestartButton onClick={handleRestart}>Restart Again</RestartButton>
 </ResultDisplay>
 <GameContainer>
    <GameTitle>Great Job!!! Go To the next Task</GameTitle>
      <FlashButton onClick={handleFinish}>
        <span>Next Task!!</span>
      </FlashButton>
 </GameContainer>
 </>
 )}
 </FormContainer>
 );
};

export default MultiplicationForm;