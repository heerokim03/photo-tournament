import React, { useState } from 'react';
import './App.css';
import Intro from './Intro';
import Winner from './Winner';
import TopWinners from './TopWinners';

const initialCandidates = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  name: `후보 ${i + 1}`,
  image: `/images/candidate${i + 1}.jpg`,
}));

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [round, setRound] = useState(16);
  const [candidates, setCandidates] = useState(initialCandidates);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [winners, setWinners] = useState([]);
  const [finalWinner, setFinalWinner] = useState(null);
  const [showTopWinners, setShowTopWinners] = useState(false);

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
      }
    } else {
      setWinners(newWinners);
      setCurrentIndex(currentIndex + 2);
    }
  };

  const resetGame = () => {
    setCandidates(initialCandidates);
    setCurrentIndex(0);
    setWinners([]);
    setRound(16);
    setFinalWinner(null);
  };

  if (showIntro) {
    return <Intro onStart={() => setShowIntro(false)} />;
  }

  if (showTopWinners) {
    return <TopWinners onBack={() => setShowTopWinners(false)} />;
  }

  if (finalWinner) {
    return (
      <Winner
        winner={finalWinner}
        onRestart={resetGame}
        onShowTop={() => setShowTopWinners(true)}
      />
    );
  }

  const currentPair = candidates.slice(currentIndex, currentIndex + 2);

  return (
    <div className={`app round-${round}`}>
      <div className="pair-container">
        {currentPair.map((candidate) => (
          <div key={candidate.id} className="candidate" onClick={() => handleSelect(candidate)}>
            <img src={candidate.image} alt={candidate.name} />
          </div>
        ))}
        <div className="vs-image">
          <img src="/images/vs.png" alt="VS" />
        </div>
      </div>
    </div>
  );
}

export default App;