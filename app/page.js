"use client";

import { useState } from 'react';
// import './App.css';
import Navbar from './components/Navbar/Navbar';
import Preloader from './components/Preloader/Preloader';
import Hero from './components/Hero/Hero';
import Houses from './components/Houses/Houses';
//import Events from './components/Events/Events';
import Scoreboard from './components/Scoreboard/Scoreboard';
import Sponsors from './components/Sponsors/Sponsors';
import Footer from './components/Footer/Footer';
import { ScoreProvider } from './contexts/scoreContext';
// import { Routes,Route } from 'react-router-dom';
// import HouseDetails from './pages/HouseDetails';


function Main() {
  const [loading, setLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  
  const handlePreloaderComplete = () => {
    // Simulate a delay for the content to be ready
    const topBar = document.head.querySelector('meta[name="theme-color"]');

    const timer = setTimeout(() => {
      setLoading(false);
      topBar?.setAttribute('content', '#000000');
      setTimeout(() => {
        setContentReady(true);
        clearTimeout(timer);
      }, 100);
    }, 500);
  };

  return (
    <>
      {loading ? (
        <Preloader 
          onComplete={handlePreloaderComplete}
        />
      ) : (
        <div className={`app-container ${contentReady ? 'content-visible' : ''}`}>
          <Navbar />
          <main>
            <Hero />
            <Houses />
            {/* <Events /> */}
            <Scoreboard />
            <Sponsors />
          </main>
          <Footer />
        </div>
      )}
    </>
  )
}

function App() {
  return (
   
    <Main />

  );
}


export default App;
