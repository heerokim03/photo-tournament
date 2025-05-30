// ✅ React 코드 업데이트: 제목을 '대선 판을 흔든 순간! 월드컵!'로 변경

import React, { useState } from 'react';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [winner, setWinner] = useState(null);

  const getRoundTitle = (length) => {
    if (length === 16) return '16강';
    if (length === 8) return '8강';
    if (length === 4) return '4강';
    if (length === 2) return '결승';
    return '우승!';
  };

  const handleClick = (selected) => {
    if (currentRound.length === 2) {
      setWinner(selected);
      return;
    }
    setNextRound([...nextRound, selected]);
    if (index + 2 >= currentRound.length) {
      setCurrentRound([...nextRound, selected]);
      setNextRound([]);
      setIndex(0);
    } else {
      setIndex(index + 2);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'linear-gradient(135deg, #1e1e2f, #2e2e3f)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '1rem', fontFamily: 'sans-serif' }}>🔥 대선 판을 흔든 순간! 월드컵! 🔥</h1>
      <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '2rem' }}>{getRoundTitle(currentRound.length)}</h2>

      <AnimatePresence>
        {winner ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, rotate: [0, 10, -10, 0], boxShadow: '0 0 100px rgba(255, 255, 0, 0.8)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{ textAlign: 'center' }}
          >
            <h2 style={{ color: '#ffeb3b', fontSize: '4rem', marginBottom: '1rem' }}>🏆 최종 우승! 🏆</h2>
            <img
              src={winner}
              alt="winner"
              style={{ width: '60%', height: 'auto', border: '8px solid gold', borderRadius: '20px', boxShadow: '0 0 40px gold' }}
            />
          </motion.div>
        ) : (
          <div style={{ display: 'flex', width: '1920px', height: '1080px', alignItems: 'center', justifyContent: 'center', gap: '40px' }}>
            <motion.img
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              src={currentRound[index]}
              alt="left"
              style={{ width: '45%', height: '100%', objectFit: 'cover', cursor: 'pointer', border: '6px solid #fff', borderRadius: '20px', boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)' }}
              onClick={() => handleClick(currentRound[index])}
            />

            <img
              src="/images/vs.png"
              alt="vs"
              style={{ width: '80px', height: '80px' }}
            />

            <motion.img
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              src={currentRound[index + 1]}
              alt="right"
              style={{ width: '45%', height: '100%', objectFit: 'cover', cursor: 'pointer', border: '6px solid #fff', borderRadius: '20px', boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)' }}
              onClick={() => handleClick(currentRound[index + 1])}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;