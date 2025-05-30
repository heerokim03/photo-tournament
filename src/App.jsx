import React, { useState } from "react";
import Intro from "./Intro";
import Tournament from "./Tournament";
import "./App.css";

function App() {
  const [isIntro, setIsIntro] = useState(true);

  return (
    <>
      {isIntro ? (
        <Intro onStart={() => setIsIntro(false)} />
      ) : (
        <Tournament />
      )}
    </>
  );
}
export default App;
