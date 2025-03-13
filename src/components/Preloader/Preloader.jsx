import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Preloader.module.css';

const Preloader = ({onComplete}) => {
  const preloaderRef = useRef(null);
  const sandParticlesRef = useRef(null);
  
  // Array of ancient/Egyptian themed messages
  const messages = [
    "Ancient Sands Await",
    "Written in the Stars",
    "Secrets of the Pharaohs",
    "Mysteries of the Desert",
    "The Gods Beckon",
    "Journey Along the Nile",
    "Pyramids on the Horizon",
    "Whispers of the Ancients",
    "Golden Treasures Await",
    "The Sun God Rises"
  ];
  
  // Select a random message when component mounts
  const [loadingMessage] = useState(() => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  });
  
  useEffect(() => {
    const tl = gsap.timeline();

    gsap.to(sandParticlesRef.current.children, {
      opacity: 0.8,
      scale: 1,
      duration: 1.5,
      stagger: 0.1,
      repeat: -1,
      yoyo: true
    });
    
    tl.to(`.${styles.loadingText}`, {
      opacity: 1,
      duration: 1,
      delay: 0.5
    })
    .to(`.${styles.loadingBar}`, {
      width: '100%',
      duration: 2,
      ease: "power2.inOut",
      onComplete: onComplete
    });
    
    return () => {
      tl.kill();
    };
  }, [onComplete]);
  
  return (
    <div className={styles.preloader} ref={preloaderRef}>
      <div className={styles.sandParticles} ref={sandParticlesRef}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles.particle}></div>
        ))}
      </div>
      <div
        className={styles.logoContainer}
      >
        <img 
        src='/favicon.svg'
        alt='Utsav Logo'
        className={styles.logo}
        />
      </div>
      <h1 className={styles.title}>UTSAV</h1>
      <div className={styles.loadingText}>{loadingMessage}</div>
      <div className={styles.loadingBarContainer}>
        <div className={styles.loadingBar}></div>
      </div>
    </div>
  );
};

export default Preloader;
