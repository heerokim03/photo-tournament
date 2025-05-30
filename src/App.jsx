import React, { useState, useEffect } from 'react';
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
  const [showRoundTitle, setShowRoundTitle] = useState(true);

  const getRoundTitle = (length) => {
    if (length === 16) return '16강';
    if (length === 8) return '8강';
    if (length === 4) return '4강';
    if (length === 2) return '결승';
    return '우승!';
  };

  useEffect(() => {
    setShowRoundTitle(true);
    const timer = setTimeout(() => setShowRoundTitle(false), 2000);
    return () => clearTimeout(timer);
  }, [currentRound]);

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
    <div style={{ width: '100vw', height: '100vh', background: 'linear-gradient(135deg, #1e1e2f, #2e2e3f)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <AnimatePresence>
        {showRoundTitle && (
          <motion.div
            key={currentRound.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: [0.5, 1.2, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
          >
            <h1 style={{ color: '#ffeb3b', fontSize: '8rem', fontWeight: '900', fontFamily: 'Arial Black, sans-serif', textShadow: '0 0 60px rgba(255,255,0,0.9)' }}>{getRoundTitle(currentRound.length)}</h1>
          </motion.div>
        )}
      </AnimatePresence>

      <h1 style={{ color: '#fff', fontSize: '2.5rem', position: 'absolute', top: '20px' }}>대선 판을 흔든 순간! 월드컵!</h1>

      {winner ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, rotate: [0, 10, -10, 0], boxShadow: '0 0 100px rgba(255, 255, 0, 0.8)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          style={{ textAlign: 'center' }}
        >
          <h2 style={{ color: '#ffeb3b', fontSize: '5rem', marginBottom: '1rem', fontWeight: '900', fontFamily: 'Arial Black, sans-serif' }}>🏆 최종 우승! 🏆</h2>
          <img
            src={winner}
            alt="winner"
            style={{ width: '60vw', height: 'auto', border: '10px solid gold', borderRadius: '20px', boxShadow: '0 0 50px gold' }}
          />
        </motion.div>
      ) : (
        <div style={{ display: 'flex', width: '100vw', height: '80vh', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
          <motion.img
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            src={currentRound[index]}
            alt="left"
            style={{ width: '45%', height: '100%', objectFit: 'cover', cursor: 'pointer', border: '6px solid #fff', borderRadius: '20px', boxShadow: '0 0 30px rgba(255, 255, 255, 0.5)' }}
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
            style={{ width: '45%', height: '100%', objectFit: 'cover', cursor: 'pointer', border: '6px solid #fff', borderRadius: '20px', boxShadow: '0 0 30px rgba(255, 255, 255, 0.5)' }}
            onClick={() => handleClick(currentRound[index + 1])}
          />
        </div>
      )}
    </div>
  );
}

export default App;
