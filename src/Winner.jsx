import React, { useEffect } from 'react';
import './App.css';

function Winner({ winner, onRestart }) {
  useEffect(() => {
    const audio = new Audio('/sounds/cheer.mp3');
    audio.play();
    return () => audio.pause();
  }, []);

  return (
    <div className="winner-screen">
      <h1>🏆 최종 우승자 🏆</h1>
      <img src={winner.image} alt={winner.name} className="winner-image" />
      <h2>{winner.name}</h2>
      <button className="restart-button" onClick={onRestart}>다시 시작하기</button>
    </div>
  );
}

export default Winner;
