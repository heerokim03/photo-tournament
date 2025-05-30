import React, { useState } from 'react';

const PhotoTournament = () => {
  const initialPhotos = [
    { id: 1, url: '/images/photo1.png', title: '임시 제목 1' },
    { id: 2, url: '/images/photo2.png', title: '임시 제목 2' },
    { id: 3, url: '/images/photo3.png', title: '임시 제목 3' },
    { id: 4, url: '/images/photo4.png', title: '임시 제목 4' },
    { id: 5, url: '/images/photo5.png', title: '임시 제목 5' },
    { id: 6, url: '/images/photo6.png', title: '임시 제목 6' },
    { id: 7, url: '/images/photo7.png', title: '임시 제목 7' },
    { id: 8, url: '/images/photo8.png', title: '임시 제목 8' },
    { id: 9, url: '/images/photo9.png', title: '임시 제목 9' },
    { id: 10, url: '/images/photo10.png', title: '임시 제목 10' },
    { id: 11, url: '/images/photo11.png', title: '임시 제목 11' },
    { id: 12, url: '/images/photo12.png', title: '임시 제목 12' },
    { id: 13, url: '/images/photo13.png', title: '임시 제목 13' },
    { id: 14, url: '/images/photo14.png', title: '임시 제목 14' },
    { id: 15, url: '/images/photo15.png', title: '임시 제목 15' },
    { id: 16, url: '/images/photo16.png', title: '임시 제목 16' },
  ];

  const [photos, setPhotos] = useState(initialPhotos);
  const [round, setRound] = useState(1);
  const [winners, setWinners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelect = (winner) => {
    const nextWinners = [...winners, winner];
    if (nextWinners.length === Math.ceil(photos.length / 2)) {
      if (nextWinners.length === 1) {
        alert(`최종 우승: ${winner.title}`);
        resetTournament();
      } else {
        setPhotos(nextWinners);
        setWinners([]);
        setCurrentIndex(0);
        setRound(round + 1);
      }
    } else {
      setWinners(nextWinners);
      setCurrentIndex(currentIndex + 2);
    }
  };

  const resetTournament = () => {
    setPhotos(initialPhotos);
    setWinners([]);
    setCurrentIndex(0);
    setRound(1);
  };

  const pair = photos.slice(currentIndex, currentIndex + 2);

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl mb-4">사진 토너먼트 - {round} 라운드</h1>
      <div className="grid grid-cols-2 gap-4">
        {pair.map((photo) => (
          <div
            key={photo.id}
            className="cursor-pointer border rounded-2xl shadow p-2 hover:scale-105 transition"
            onClick={() => handleSelect(photo)}
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-64 object-cover rounded-2xl"
            />
            <p className="mt-2">{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoTournament;
