import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Award, Medal, Star } from 'lucide-react';
import styles from './Scoreboard.module.css';

gsap.registerPlugin(ScrollTrigger);

// Updated house scores with the new houses and logos
const houseScores = [
  {
    id: 'atreides',
    name: 'House Atreides',
    logo: '/houses/atreides.svg',
    score: 0,
    color: 'var(--house-atreides)',
    achievements: 0,
    ranking: 1
  },
  {
    id: 'arrakis',
    name: 'House Arrakis',
    logo: '/houses/arrakis.jpg',
    score: 0,
    color: 'var(--house-arrakis)',
    achievements: 0,
    ranking: 2
  },
  {
    id: 'winterfell',
    name: 'House Winterfell',
    logo: '/houses/winterfellLogo.jpg',
    score: 0,
    color: 'var(--house-winterfell)',
    achievements: 0,
    ranking: 3
  },
  {
    id: 'zephandor',
    name: 'House Zephandor',
    logo: '/houses/zeph2.png',
    score: 0,
    color: 'var(--house-zephandor)',
    achievements: 0,
    ranking: 4
  }
];

const ScoreCounter = ({ value, color }) => {
  const counterRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const element = counterRef.current;
    
    // Only animate if the element is in the viewport
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        gsap.to(counterRef.current, {
          innerHTML: value,
          duration: 2.5,
          ease: "power2.out",
          snap: { innerHTML: 1 }
        });
        observer.disconnect();
      }
    });
    
    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);
  
  return (
    <span 
      ref={counterRef} 
      className={styles.scoreValue}
      style={{ color }}
    >
      0
    </span>
  );
};

const Scoreboard = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { 
        opacity: 0,
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" 
      },
      {
        opacity: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.2,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animate the ranking rows
    gsap.fromTo(
      `.${styles.rankingRow}`,
      { 
        x: -100, 
        opacity: 0,
        filter: "blur(8px)"
      },
      {
        x: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.rankingsContainer}`,
          start: "top bottom-=50",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    gsap.fromTo(
      `.${styles.scoreBar}`,
      { width: 0 },
      {
        width: "var(--score-width)",
        duration: 1.5,
        ease: "power2.inOut",
        stagger: 0.2,
        delay: 0.3,
        scrollTrigger: {
          trigger: `.${styles.rankingsContainer}`,
          start: "top bottom-=50",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Add parallax effects
    gsap.to(`.${styles.title}`, {
      yPercent: -25,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
    
    gsap.to(`.${styles.subtitle}`, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
    
    gsap.to(`.${styles.rankingsContainer}`, {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
    
    // Parallax for grid overlay
    gsap.to(`.${styles.gridOverlay}`, {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Order houses by rank
  const sortedHouses = [...houseScores].sort((a, b) => a.ranking - b.ranking);
  
  // Calculate max score for percentage bars
  const maxScore = Math.max(...houseScores.map(house => house.score));
  
  return (
    <section id="scoreboard" className={styles.scoreboard} ref={sectionRef}>
      <div className={styles.gridOverlay}></div>
      
      <div className={styles.container}>
        <h2 className={styles.title} ref={titleRef}>
          <span className={styles.titlePrefix}>CURRENT</span>
          <span className={styles.titleMain}>HOUSE RANKINGS</span>
        </h2>
        
        <div className={styles.subtitle}>Festival Cycle 10959</div>
        
        <div className={styles.rankingsContainer}>
          {sortedHouses.map(house => {
            const scorePercentage = (house.score / maxScore) * 100;
            
            return (
              <div key={house.id} className={styles.rankingRow}>
                <div className={styles.rankPosition}>
                  {house.ranking === 1 ? <Trophy size={22} /> : `${house.ranking}`}
                </div>
                
                <div className={styles.houseIcon} style={{backgroundColor: house.color}}>
                  <img 
                    src={house.logo} 
                    alt={`${house.name} Logo`} 
                    className={styles.houseLogo}
                  />
                </div>
                
                <div className={styles.houseName}>{house.name}</div>
                
                <div className={styles.scoreBarContainer}>
                  <div 
                    className={styles.scoreBar} 
                    style={{
                      '--score-width': `${scorePercentage}%`,
                      backgroundColor: house.color
                    }}
                  ></div>
                </div>
                
                <div className={styles.scoreDisplay}>
                  <ScoreCounter value={house.score} color={house.color} />
                </div>
                
                <div className={styles.achievements}>
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className={styles.achievementIcon}
                      style={{
                        opacity: i < house.achievements % 3 ? 1 : 0.2
                      }}
                    >
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* <div className={styles.dataInfo}>
          <div className={styles.lastUpdated}>
            <span className={styles.blinkingDot}></span>
            Last updated: Festival Day 7
          </div>
          <div className={styles.viewDetails}>
            <button className={styles.detailsBtn}>View Detailed Analytics</button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Scoreboard;
