import React, { useState } from 'react';
import './App.css';
import { motion } from 'framer-motion';

const images = [
  '/images/photo1.png', '/images/photo2.png', '/images/photo3.png', '/images/photo4.png',
  '/images/photo5.png', '/images/photo6.png', '/images/photo7.png', '/images/photo8.png',
  '/images/photo9.png', '/images/photo10.png', '/images/photo11.png', '/images/photo12.png',
  '/images/photo13.png', '/images/photo14.png', '/images/photo15.png', '/images/photo16.png'
];

function App() {
  const [currentRound, setCurrentRound] = useState(images);
  const [nextRound, setNextRound] = useState([]);
  const [index, setIndex] = useState(0);

  const handleClick = (winner) => {
    setNextRound([...nextRound, winner]);
    if (index + 2 >= currentRound.length) {
      if (nextRound.length + 1 === 1) {
        alert(`최종 우승 사진!`);
      } else {
        setCurrentRound([...nextRound, winner]);
        setNextRound([]);
        setIndex(0);
      }
    } else {
      setIndex(index + 2);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'linear-gradient(135deg, #1e1e2f, #2e2e3f)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '2rem', fontFamily: 'sans-serif' }}>📸 사진 이상형 월드컵</h1>
      <div style={{ display: 'flex', width: '1920px', height: '1080px', justifyContent: 'space-between', gap: '20px' }}>
        <motion.img
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          src={currentRound[index]}
          alt="left"
          style={{ width: '49%', height: '100%', objectFit: 'cover', cursor: 'pointer', border: '6px solid #fff', borderRadius: '20px', boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)' }}
          onClick={() => handleClick(currentRound[index])}
        />
        <motion.img
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          src={currentRound[index + 1]}
          alt="right"
          style={{ width: '49%', height: '100%', objectFit: 'cover', cursor: 'pointer', border: '6px solid #fff', borderRadius: '20px', boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)' }}
          onClick={() => handleClick(currentRound[index + 1])}
        />
      </div>
    </div>
  );
}

export default App;
