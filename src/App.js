import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Quiz from './components/Quiz';
import Home from './components/Home';
import Congrats from './components/Congrats';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/congrats" element={<Congrats />} />
      </Routes>
    </Router>
  );
}

export default App;
