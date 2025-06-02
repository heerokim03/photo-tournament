import React from 'react';

function Winner({ winner, onRestart, onShowTopWinners }) {
  return (
    <div className="winner-screen">
      <div className="winner-title">🏆 최종 우승자 🏆</div>
      <img src={winner.image} alt="최종 우승자" className="winner-image animate-pop" />
      <button className="restart-button" onClick={onRestart}>다시 시작하기</button>
      <button className="top-winner-button" onClick={onShowTopWinners}>최다 우승자 보기</button>
    </div>
  );
}

export default Winner;
