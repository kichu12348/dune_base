import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  const starsRef = useRef(null);
  const spiceDustRef = useRef(null);
  
  // Array of hieroglyphs for the animation
  const hieroglyphs = [
    "𓀀", "𓀁", "𓀂", "𓀃", "𓀄", "𓀅", "𓀆", "𓀇", "𓀈", "𓀉", "𓀊", "𓀋", 
    "𓀌", "𓀍", "𓀎", "𓀏", "𓀐", "𓀑", "𓀒", "𓀓", "𓀔", "𓀕", "𓀖", "𓀗",
    "𓀘", "𓀙", "𓀚", "𓀛", "𓀜", "𓀝", "𓀞", "𓀟", "𓀠", "𓀡", "𓀢", "𓀣",
    "𓁀", "𓁁", "𓁂", "𓁃", "𓁄", "𓁅", "𓁆", "𓁇", "𓁈", "𓁉", "𓁊", "𓁋",
    "𓁌", "𓁍", "𓁎", "𓁏", "𓁐", "𓁑", "𓁒", "𓁓", "𓁔", "𓁕", "𓁖", "𓁗",
    "𓂀", "𓂁", "𓂂", "𓂃", "𓂄", "𓂅", "𓂆", "𓂇", "𓂈", "𓂉", "𓂊", "𓂋",
    "𓂌", "𓂍", "𓂎", "𓂏", "𓂐", "𓂑", "𓂒", "𓂓", "𓂔", "𓂕", "𓂖", "𓂗",
    "𓃀", "𓃁", "𓃂", "𓃃", "𓃄", "𓃅", "𓃆", "𓃇", "𓃈", "𓃉", "𓃊", "𓃋"
  ];
  
  useEffect(() => {
    // Create stars dynamically
    const createStars = () => {
      const starsContainer = starsRef.current;
      if (!starsContainer) return;
      
      const starCount = 150;
      
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add(styles.star);
        
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        starsContainer.appendChild(star);
      }
    };
    
    // Create dust particles dynamically
    const createDustParticles = () => {
      const dustContainer = spiceDustRef.current;
      if (!dustContainer) return;
      
      const dustCount = 50;
      
      for (let i = 0; i < dustCount; i++) {
        const dust = document.createElement('div');
        dust.classList.add(styles.dustParticle);
        
        const size = Math.random() * 3 + 2;
        dust.style.width = `${size}px`;
        dust.style.height = `${size}px`;
        
        dust.style.left = `${Math.random() * 100}%`;
        dust.style.opacity = Math.random() * 0.5;
        
        const duration = Math.random() * 10 + 10;
        dust.style.animationDuration = `${duration}s`;
        
        dust.style.animationDelay = `${Math.random() * 10}s`;
        
        dustContainer.appendChild(dust);
      }
    };
    
    // Animate hieroglyphs to letters
    const animateHieroglyphs = () => {
      const letterContainers = document.querySelectorAll(`.${styles.letterContainer}`);
      
      letterContainers.forEach((container, index) => {
        const hieroglyphChar = container.querySelector(`.${styles.hieroglyphChar}`);
        if (!hieroglyphChar) return;
        
        const finalLetter = container.getAttribute('data-letter');
        let currentIndex = 0;
        
        const changeCount = 10 + (index * 5); 
        let changeInterval = 120; 
        
        const animationInterval = setInterval(() => {
          if (currentIndex < changeCount) {
            const randomIndex = Math.floor(Math.random() * hieroglyphs.length);
            hieroglyphChar.textContent = hieroglyphs[randomIndex];
            
            if (currentIndex > changeCount * 0.7) {
              changeInterval = Math.max(80, changeInterval - 2);
            }
            
            currentIndex++;
          } else {
            hieroglyphChar.textContent = finalLetter;
            clearInterval(animationInterval);
          }
        }, changeInterval);
        
        // Store interval ID for cleanup
        container.animationInterval = animationInterval;
      });
    };
    
    // Initialize animations
    createStars();
    createDustParticles();
    animateHieroglyphs();
    
    // Clean up animations on unmount
    return () => {
      const letterContainers = document.querySelectorAll(`.${styles.letterContainer}`);
      letterContainers.forEach((container) => {
        if (container.animationInterval) {
          clearInterval(container.animationInterval);
        }
      });
    };
  }, []);

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.stars} ref={starsRef}></div>
      <div className={styles.spiceDust} ref={spiceDustRef}></div>
      
      <div className={`${styles.hieroglyph} ${styles.hieroglyph1}`}>
        <svg width="100" height="200" viewBox="0 0 100 200" fill="var(--sand-light)">
          <path d="M20,10 L80,10 L80,50 L50,80 L20,50 Z M40,100 L60,100 L60,180 L40,180 Z M30,130 L70,130 M30,150 L70,150" stroke="var(--sand-light)" strokeWidth="4" fill="none"/>
        </svg>
      </div>
      
      <div className={`${styles.hieroglyph} ${styles.hieroglyph2}`}>
        <svg width="120" height="150" viewBox="0 0 120 150" fill="var(--sand-light)">
          <path d="M60,10 L90,40 L60,70 L30,40 Z M60,80 A30,30 0 0,1 60,140 A30,30 0 0,1 60,80 Z" stroke="var(--sand-light)" strokeWidth="4" fill="none"/>
        </svg>
      </div>
      
      <div className={styles.heroContent}>
        <div className={styles.festivalTitle}>
          <div className={styles.festivalName}>
            <div className={styles.lettersRow}>
              <div className={styles.letterContainer} data-letter="U">
                <div className={styles.hieroglyphChar}>𓀀</div>
              </div>
              <div className={styles.letterContainer} data-letter="T">
                <div className={styles.hieroglyphChar}>𓁀</div>
              </div>
              <div className={styles.letterContainer} data-letter="S">
                <div className={styles.hieroglyphChar}>𓂀</div>
              </div>
              <div className={styles.letterContainer} data-letter="A">
                <div className={styles.hieroglyphChar}>𓃀</div>
              </div>
              <div className={styles.letterContainer} data-letter="V">
                <div className={styles.hieroglyphChar}>𓄀</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
