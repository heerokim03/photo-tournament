import React, { useState, useEffect } from 'react';
import './App.css';
import Intro from './Intro';
import Winner from './Winner';
import confetti from 'canvas-confetti';

const firebaseUrl = 'https://worldcup-tracker-default-rtdb.firebaseio.com';

const initialCandidates = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  image: `/images/candidate${i + 1}.jpg`,
}));

function recordWinner(winnerId) {
  fetch(`${firebaseUrl}/winners/${winnerId}.json`)
    .then(res => res.json())
    .then(count => {
      const newCount = (count || 0) + 1;
      fetch(`${firebaseUrl}/winners/${winnerId}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCount),
      });
    });
}

function fetchTopWinner() {
  fetch(`${firebaseUrl}/winners.json`)
    .then(res => res.json())
    .then(data => {
      let topId = null;
      let maxCount = -1;
      for (const [id, count] of Object.entries(data)) {
        if (count > maxCount) {
          maxCount = count;
          topId = id;
        }
      }
      alert(`지금까지 최다 우승자: 후보 ${topId} (${maxCount}회)`);
    });
}

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showRoundOverlay, setShowRoundOverlay] = useState(true);
  const [round, setRound] = useState(16);
  const [candidates, setCandidates] = useState(initialCandidates);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [winners, setWinners] = useState([]);
  const [finalWinner, setFinalWinner] = useState(null);
  const [vsKey, setVsKey] = useState(0);

  useEffect(() => {
    if (finalWinner) {
      confetti({
        particleCount: 500,
        spread: 200,
        origin: { y: 0.6 },
      });
      recordWinner(finalWinner.id);
    }
  }, [finalWinner]);

  useEffect(() => {
    if (!showIntro) {
      const timer = setTimeout(() => setShowRoundOverlay(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [showIntro, round]);

  const handleSelect = (winner) => {
    const newWinners = [...winners, winner];
    if (currentIndex + 2 >= candidates.length) {
      if (newWinners.length === 1) {
        setFinalWinner(newWinners[0]);
      } else {
        setCandidates(newWinners);
        setWinners([]);
        setCurrentIndex(0);
        setRound(round / 2);
        setShowRoundOverlay(true);
      }
    } else {
      setWinners(newWinners);
      setCurrentIndex(currentIndex + 2);
    }
    setVsKey((prev) => prev + 1);
  };

  const resetGame = () => {
    setCandidates(initialCandidates);
    setCurrentIndex(0);
    setWinners([]);
    setRound(16);
    setFinalWinner(null);
    setShowIntro(true);
    setShowRoundOverlay(true);
    setVsKey(0);
  };

  if (showIntro) {
    return <Intro onStart={() => setShowIntro(false)} />;
  }

  if (finalWinner) {
    return (
      <div className="winner-screen">
        <div className="winner-title">🏆 최종 우승자 🏆</div>
        <img src={finalWinner.image} alt="최종 우승자" className="winner-image animate-pop" />
        <button className="restart-button" onClick={resetGame}>다시 시작하기</button>
        <button className="top-winner-button" onClick={fetchTopWinner}>최다 우승자 보기</button>
      </div>
    );
  }

  const currentPair = candidates.slice(currentIndex, currentIndex + 2);

  return (
    <div className="app">
      {showRoundOverlay && (
        <div className="round-overlay animate-fade">
          {round === 16 && '16강'}
          {round === 8 && '8강'}
          {round === 4 && '4강'}
          {round === 2 && '결승'}
        </div>
      )}
      <div className="pair-container">
        {currentPair.map((candidate) => (
          <div
            key={candidate.id}
            className="candidate animate-fade"
            onClick={() => handleSelect(candidate)}
          >
            <img src={candidate.image} alt={`후보 ${candidate.id}`} />
          </div>
        ))}
        <div key={vsKey} className="vs-image animate-fade">
          <img src="/images/vs.png" alt="VS" />
        </div>
      </div>
    </div>
  );
}

export default App;
