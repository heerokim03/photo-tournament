// src/Intro.jsx
import React from "react";

export default function Intro({ onStart }) {
  return (
    <div className="intro-bg">
      <img src="/images/logo.png" alt="로고" className="intro-logo" />
      <h1 className="intro-title">대선 판을 흔든 순간! 월드컵!</h1>
      <button className="intro-btn" onClick={onStart}>시작하기</button>
    </div>
  );
}
