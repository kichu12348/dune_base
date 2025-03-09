import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Preloader from './components/Preloader/Preloader';
import Hero from './components/Hero/Hero';
import Houses from './components/Houses/Houses';
import Events from './components/Events/Events';
import Scoreboard from './components/Scoreboard/Scoreboard';
import Footer from './components/Footer/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);


  const handlePreloaderComplete = () => {
    const timer = setTimeout(() => {
      setLoading(false);
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
            <Events />
            <Scoreboard />
          </main>
          <Footer />
        </div>
      )}
    </>
  )
}

export default App;
