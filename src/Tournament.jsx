import React, { useState } from "react";

const images = Array.from({ length: 16 }, (_, i) => `/images/photo${i + 1}.png`);
const roundNames = {
  16: { bg: "/images/bg16.png", label: "16강" },
  8:  { bg: "/images/bg8.png",  label: "8강" },
  4:  { bg: "/images/bg4.png",  label: "4강" },
  2:  { bg: "/images/bg2.png",  label: "결승" },
};

function shuffle(array) {
  let a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Tournament() {
  const [currentRound, setCurrentRound] = useState(16);
  const [candidates, setCandidates] = useState(shuffle(images));
  const [nextRound, setNextRound] = useState([]);
  const [index, setIndex] = useState(0);
  const [winner, setWinner] = useState(null);

  if (winner) {
    return (
      <div
        className="tournament-bg"
        style={{ backgroundImage: `url(${roundNames[2].bg})` }}
      >
        <div className="winner-wrap">
          <img src={winner} alt="우승" className="tournament-image" />
          <div className="winner-title">최종 우승</div>
        </div>
      </div>
    );
  }

  if (index >= candidates.length) {
    if (candidates.length === 1) {
      setWinner(candidates[0]);
    } else {
      setCandidates(nextRound);
      setNextRound([]);
      setIndex(0);
      setCurrentRound(candidates.length / 2);
    }
    return null;
  }

  const left = candidates[index];
  const right = candidates[index + 1];

  return (
    <div
      className="tournament-bg"
      style={{ backgroundImage: `url(${roundNames[currentRound].bg})` }}
    >
      <div className="round-label">
        <img src={roundNames[currentRound].bg} alt="라운드 인서트" className="round-image" />
        <div className="round-title">{roundNames[currentRound].label}</div>
      </div>
      <div className="tournament-row">
        <img
          src={left}
          alt="후보1"
          className="tournament-image"
          onClick={() => {
            setNextRound([...nextRound, left]);
            setIndex(index + 2);
          }}
        />
        <div className="vs-text">VS</div>
        <img
          src={right}
          alt="후보2"
          className="tournament-image"
          onClick={() => {
            setNextRound([...nextRound, right]);
            setIndex(index + 2);
          }}
        />
      </div>
    </div>
  );
}
