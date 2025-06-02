import React, { useState, useEffect } from 'react';
import './App.css';
import Intro from './Intro';
import Winner from './Winner';

const initialCandidates = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  name: `후보 ${i + 1}`,
  image: `/images/candidate${i + 1}.jpg`,
}));

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showRoundBanner, setShowRoundBanner] = useState(true);
  const [round, setRound] = useState(16);
  const [candidates, setCandidates] = useState(initialCandidates);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [winners, setWinners] = useState([]);
  const [finalWinner, setFinalWinner] = useState(null);
  const [clickedId, setClickedId] = useState(null);

  useEffect(() => {
    if (!showIntro) {
      const timer = setTimeout(() => setShowRoundBanner(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showIntro, round]);

  const handleSelect = (winner) => {
    setClickedId(winner.id);

    setTimeout(() => {
      const newWinners = [...winners, winner];
      if (currentIndex + 2 >= candidates.length) {
        if (newWinners.length === 1) {
          setFinalWinner(newWinners[0]);
        } else {
          setCandidates(newWinners);
          setWinners([]);
          setCurrentIndex(0);
          setRound(round / 2);
          setShowRoundBanner(true);
        }
      } else {
        setWinners(newWinners);
        setCurrentIndex(currentIndex + 2);
      }
      setClickedId(null);
    }, 400);
  };

  const resetGame = () => {
    setCandidates(initialCandidates);
    setCurrentIndex(0);
    setWinners([]);
    setRound(16);
    setFinalWinner(null);
    setShowIntro(true);
    setShowRoundBanner(true);
  };

  if (showIntro) {
    return <Intro onStart={() => setShowIntro(false)} />;
  }

  if (finalWinner) {
    return <Winner winner={finalWinner} onRestart={resetGame} />;
  }

  const currentPair = candidates.slice(currentIndex, currentIndex + 2);

  return (
    <div className={`app round-${round}`}>
      <div className="top-bar">
        <h1>대선 판을 바꾼 순간! 월드컵!</h1>
      </div>

      {showRoundBanner && (
        <div className="round-banner">
          <h2>{round}강</h2>
        </div>
      )}

      <div className="pair-container">
        {currentPair.map((candidate, index) => (
          <div
            key={candidate.id}
            className={`candidate ${
              clickedId === candidate.id
                ? index === 0
                  ? 'clicked-left'
                  : 'clicked-right'
                : ''
            }`}
            onClick={() => handleSelect(candidate)}
          >
            <img src={candidate.image} alt={candidate.name} />
            <p>{candidate.name}</p>
          </div>
        ))}
        <div className="vs-text">VS</div>
      </div>
    </div>
  );
}

export default App;
