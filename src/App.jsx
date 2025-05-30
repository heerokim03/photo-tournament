// src/App.jsx
import React, { useState } from "react";
import Intro from "./Intro";
// (아래에 기존 Tournament 컴포넌트 import)

import "./App.css";

function App() {
  const [isIntro, setIsIntro] = useState(true);

  return (
    <>
      {isIntro ? (
        <Intro onStart={() => setIsIntro(false)} />
      ) : (
        // 기존 Tournament 컴포넌트로 교체!
        <Tournament />
      )}
    </>
  );
}

export default App;
