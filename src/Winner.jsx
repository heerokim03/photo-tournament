import React from 'react';
import './App.css';

function Winner({ winner, onRestart, onShowTopWinners }) {
  return (
    <div className="winner-screen animate-pop">
      <h2 className="winner-title">🏆 최종 우승자 🏆</h2>
      <img src={winner.image} alt={`후보 ${winner.id}`} className="winner-image" />
      <button className="restart-button" onClick={onRestart}>다시 시작하기</button>
      <button className="top-winner-button" onClick={onShowTopWinners}>최다 우승자 TOP 3 보기</button>
    </div>
  );
}

export default Winner;