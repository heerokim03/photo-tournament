import React, { useState, useEffect } from 'react';
import './App.css';
import Intro from './Intro';
import Winner from './Winner';
import confetti from 'canvas-confetti';

const initialCandidates = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  image: `/images/candidate${i + 1}.jpg`,
}));

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showRoundOverlay, setShowRoundOverlay] = useState(true);
  const [round, setRound] = useState(16);
  const [candidates, setCandidates] = useState(initialCandidates);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [winners, setWinners] = useState([]);
  const [finalWinner, setFinalWinner] = useState(null);
  const [clickedId, setClickedId] = useState(null);

  useEffect(() => {
    if (finalWinner) {
      confetti({
        particleCount: 500,
        spread: 200,
        origin: { y: 0.6 }
      });
    }
  }, [finalWinner]);

  useEffect(() => {
    if (!showIntro) {
      const timer = setTimeout(() => setShowRoundOverlay(false), 1500);
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
          setShowRoundOverlay(true);
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
    setShowRoundOverlay(true);
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
            className="candidate"
            onClick={() => handleSelect(candidate)}
          >
            <img src={candidate.image} alt={`후보 ${candidate.id}`} className="animate-fade" />
          </div>
        ))}
        <div className="vs-image animate-pop">
          <img src="/images/vs.png" alt="VS" />
        </div>
      </div>
    </div>
  );
}

export default App;
