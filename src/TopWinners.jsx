import React, { useEffect, useState } from 'react';

const firebaseUrl = 'https://worldcup-tracker-default-rtdb.firebaseio.com';
const initialCandidates = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  image: `/images/candidate${i + 1}.jpg`,
}));

function TopWinners({ onBack }) {
  const [topWinners, setTopWinners] = useState([]);

  useEffect(() => {
    fetch(`${firebaseUrl}/winners.json`)
      .then(res => res.json())
      .then(data => {
        const sorted = Object.entries(data)
          .map(([id, count]) => ({
            id: parseInt(id),
            count,
            image: initialCandidates.find(c => c.id === parseInt(id)).image,
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 3);
        setTopWinners(sorted);
      });
  }, []);

  return (
    <div className="winner-screen">
      <div className="winner-title">🏅 최다 우승자 TOP 3 🏅</div>
      {topWinners.length > 0 ? (
        <div className="top-winner-list">
          {topWinners.map((winner, index) => (
            <div key={winner.id} className="top-winner-item">
              <h3>{index + 1}위 — 후보 {winner.id}</h3>
              <img src={winner.image} alt={`후보 ${winner.id}`} className="winner-image animate-pop" />
              <p>{winner.count}회 우승</p>
            </div>
          ))}
        </div>
      ) : (
        <p>데이터를 불러오는 중...</p>
      )}
      <button className="restart-button" onClick={onBack}>뒤로가기</button>
    </div>
  );
}

export default TopWinners;
