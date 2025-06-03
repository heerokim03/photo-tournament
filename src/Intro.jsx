import React, { useEffect } from 'react';
import './App.css';

function Intro({ onStart }) {
  useEffect(() => {
    const timer = setTimeout(onStart, 3000);
    return () => clearTimeout(timer);
  }, [onStart]);

  return (
    <div className="intro-screen">
      <img src="/images/logo.jpg" alt="로고" className="intro-logo" />
      <h1 className="intro-title">2025 대선, 결정적 한 장면</h1>
      <p className="intro-subtitle">제작: 시사IN</p> {/* 👉 추가된 부분 */}
    </div>
  );
}

export default Intro;