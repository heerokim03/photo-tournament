// src/Intro.jsx
import React from 'react';
import './App.css';

export default function Intro({ onStart }) {
  return (
    <div className="intro-container">
      <h1 className="intro-title">🔥 이상형 월드컵 🔥</h1>
      <button className="start-button" onClick={onStart}>시작하기</button>
    </div>
  );
}