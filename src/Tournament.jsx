import React, { useState, useEffect } from 'react';
import './App.css';

const images = Array.from({ length: 16 }, (_, i) => `/images/photo${i + 1}.png`);

export default function Tournament() {
  const [currentRound, setCurrentRound] = useState(16);
  const [candidates, setCandidates] = useState([]);
  const [nextRound, setNextRound] = useState([]);
  const [index, setIndex] = useState(0);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    setCandidates(shuffle(images));
  }, []);

  function shuffle(array) {
    let a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function handleSelect(selection) {
    const selected = candidates[index + selection];
    setNextRound([...nextRound, selected]);

    if (index + 2 >= candidates.length) {
      if (nextRound.length + 1 === 1) {
        setWinner(selected);
      } else {
        setCandidates(nextRound.concat(selected));
        setNextRound([]);
        setIndex(0);
        setCurrentRound(currentRound / 2);
      }
    } else {
      setIndex(index + 2);
    }
  }

  if (winner) {
    return (
      <div className="stage-container">
        <h1 className="stage-title">🏆 최종 우승자!</h1>
        <img src={winner} alt="Winner" className="winner-image" />
      </div>
    );
  }

  return (
    <div className="stage-container">
      <h2 className="stage-title">{currentRound}강</h2>
      <div className="matchup">
        <img src={candidates[index]} alt="Option 1" className="photo" onClick={() => handleSelect(0)} />
        <div className="vs-text">VS</div>
        <img src={candidates[index + 1]} alt="Option 2" className="photo" onClick={() => handleSelect(1)} />
      </div>
    </div>
  );
}