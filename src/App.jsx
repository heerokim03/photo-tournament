import React, { useState } from 'react';
import Intro from './Intro';
import Tournament from './Tournament';
import './App.css';

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <div>
      {started ? <Tournament /> : <Intro onStart={() => setStarted(true)} />}
    </div>
  );
}