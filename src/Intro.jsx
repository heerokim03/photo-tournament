import React, { useEffect } from 'react';
import './App.css';

function Intro({ onStart }) {
  useEffect(() => {
    const timer = setTimeout(onStart, 3000); // 3초 후 메인 화면으로
    return () => clearTimeout(timer);
  }, [onStart]);

  return (
    <div className="intro-screen">
      <img src="/logo.jpg" alt="로고" className="intro-logo" />
      <h1 className="intro-title">대선 판을 바꾼 순간! 월드컵!</h1>
    </div>
  );
}

export default Intro;
