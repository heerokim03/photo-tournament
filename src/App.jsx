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
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#fcd34d', color: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', fontFamily: 'Montserrat, sans-serif' }}>
      {/* 좌측 상단 고정 로고 */}
      <img
        src="/images/logo.png"
        alt="뉴스인 로고"
        style={{ position: 'absolute', top: '20px', left: '20px', width: '15vw', height: 'auto', maxWidth: '250px', zIndex: 20 }}
      />

      <AnimatePresence>
        {showRoundTitle && (
          <motion.div
            key={currentRound.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: [0.5, 1.2, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(30, 58, 138, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
          >
            <h1 style={{ color: '#fcd34d', fontSize: '7rem', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>{getRoundTitle(currentRound.length)}</h1>
          </motion.div>
        )}
      </AnimatePresence>

      <h1 style={{ color: '#1e3a8a', fontSize: '2rem', position: 'absolute', top: '20px', right: '20px', fontWeight: '600', letterSpacing: '1px' }}>대선 판을 흔든 순간! 월드컵!</h1>

      {winner ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, rotate: [0, 5, -5, 0] }}
          transition={{ duration: 1.2 }}
          style={{ textAlign: 'center' }}
        >
          <h2 style={{ color: '#1e3a8a', fontSize: '4rem', marginBottom: '1rem', fontWeight: '700', letterSpacing: '1px' }}>🏆 최종 우승! 🏆</h2>
          <img
            src={winner}
            alt="winner"
            style={{ width: '50vw', height: 'auto', border: '8px solid #1e3a8a', borderRadius: '16px' }}
          />
        </motion.div>
      ) : (
        <div style={{ display: 'flex', width: '100vw', height: '75vh', alignItems: 'center', justifyContent: 'center', gap: '40px' }}>
          <motion.img
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            src={currentRound[index]}
            alt="left"
            style={{ width: '40%', height: '100%', objectFit: 'cover', cursor: 'pointer', border: '4px solid #1e3a8a', borderRadius: '16px', transition: 'all 0.3s ease-in-out' }}
            onClick={() => handleClick(currentRound[index])}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img
              src="/images/vs.png"
              alt="vs"
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>

          <motion.img
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            src={currentRound[index + 1]}
            alt="right"
            style={{ width: '40%', height: '100%', objectFit: 'cover', cursor: 'pointer', border: '4px solid #1e3a8a', borderRadius: '16px', transition: 'all 0.3s ease-in-out' }}
            onClick={() => handleClick(currentRound[index + 1])}
          />
        </div>
      )}
    </div>
  );
}

export default App;
