import React from 'react';
import './App.css';

function Winner({ winner, onRestart, onShowTop }) {
  return (
    <div className="winner-screen animate-pop">
      <h2 className="winner-title">🏆 최종 우승자 🏆</h2>
      <img src={winner.image} alt={winner.name} className="winner-image" />
      <button className="restart-button" onClick={onRestart}>다시 시작하기</button>
      <button className="top-winner-button" onClick={onShowTop}>최다 우승자 TOP 3 보기</button>
    </div>
  );
}

export default Winner;