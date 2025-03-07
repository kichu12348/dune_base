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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        setContentReady(true);
      }, 100);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
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
