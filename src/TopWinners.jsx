import React, { useEffect, useState } from 'react';
import './App.css';

function TopWinners({ onBack }) {
  const [topWinners, setTopWinners] = useState([]);

  useEffect(() => {
    fetch('https://worldcup-tracker-default-rtdb.firebaseio.com/winners.json')
      .then((res) => res.json())
      .then((data) => {
        const sorted = Object.entries(data || {})
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([id, count], index) => ({
            id,
            rank: `${index + 1}위`,
            image: `/images/candidate${id}.jpg`,
            winCount: count,
          }));
        setTopWinners(sorted);
      });
  }, []);

  return (
    <div className="top-winner-list">
      {topWinners.map((item) => (
        <div key={item.id} className="top-winner-item">
<h3>{window.innerWidth <= 768 ? '최다 우승자 TOP 1' : item.rank}</h3>
          <img src={item.image} alt={`후보 ${item.id}`} />
          <p>{item.winCount}회 우승</p>
        </div>
      ))}
    </div>
  );
}

export default TopWinners;
