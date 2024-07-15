import React, { useEffect } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";

function App() {
  function setScreenSize() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:type" element={<Home />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
