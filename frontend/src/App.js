// import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Nav from './components/Nav'
import Home from './pages/Home'
import ShareExercise from './pages/ShareExercise.jsx';

function App() {

  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/share-exercise" element={<ShareExercise />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
