import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import styles from './Hero.module.css';
import PyramidScene from './PyramidScene';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const logoRef = useRef(null);
  const sandParticlesRef = useRef(null);
  
  // Animate sand particles with simple animation
  const animateSandParticles = () => {
    const particles = document.querySelectorAll(`.${styles.sandParticle}`);
    
    particles.forEach((particle, i) => {
      // Random starting position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 3 + 1;
      const duration = Math.random() * 60 + 30;
      
      gsap.set(particle, {
        x: `${x}%`,
        y: `${y}%`,
        width: size,
        height: size,
        opacity: Math.random() * 0.6
      });
      
      // Create random floating animation
      gsap.to(particle, {
        y: `${y + (Math.random() * 10 - 5)}%`,
        x: `${x + (Math.random() * 10 - 5)}%`,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 5
      });
    });
  };
  
  useEffect(() => {
    // Set initial states explicitly to prevent flashing
    gsap.set(`.${styles.heroContent}`, { opacity: 0 });
    gsap.set(`.${styles.logoLetter}`, { 
      opacity: 0, 
      y: 50, 
      rotationX: -90,
      filter: 'blur(10px)'
    });
    gsap.set(`.${styles.tagline}`, { opacity: 0, y: 30, filter: 'blur(5px)' });
    gsap.set(`.${styles.exploreBtn}`, { opacity: 0, y: 20 });
    gsap.set(`.${styles.scrollIndicator}`, { opacity: 0, y: -20 });
    
    // Use a slight delay to ensure DOM is ready
    const tl = gsap.timeline({delay: 0.1});
    
    // Animation timeline for initial animations
    tl.to(`.${styles.heroContent}`, { opacity: 1, duration: 1.5 })
      .to(
        `.${styles.logoLetter}`, 
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          filter: 'blur(0px)',
          stagger: 0.15,
          duration: 1.2,
          ease: "power3.out"
        },
        "-=0.8"
      )
      .to(
        `.${styles.tagline}`,
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 },
        "-=0.7"
      )
      .to(
        `.${styles.exploreBtn}`,
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      )
      .to(
        `.${styles.scrollIndicator}`,
        { opacity: 0.7, y: 0, duration: 0.8 },
        "-=0.3"
      );

    // Glitching letters effect
    const letters = document.querySelectorAll(`.${styles.logoLetter}`);
    letters.forEach(letter => {
      const randomDelay = Math.random() * 10;
      
      // Glow pulse
      gsap.to(letter, {
        textShadow: "0 0 20px var(--tech-glow), 0 0 30px var(--tech-blue)",
        repeat: -1,
        yoyo: true,
        duration: 2 + Math.random() * 2,
        delay: randomDelay,
        ease: "sine.inOut"
      });
      
      // Occasional glitch effect
      gsap.to(letter, {
        skewX: () => Math.random() > 0.7 ? 10 : 0,
        skewY: () => Math.random() > 0.7 ? 10 : 0,
        duration: 0.1,
        repeat: -1,
        repeatDelay: 6 + Math.random() * 10,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.to(letter, {
            skewX: 0,
            skewY: 0,
            duration: 0.1
          });
        }
      });
    });
    
    // Initialize and animate sand particles
    animateSandParticles();
    
    // Animate scroll indicator
    gsap.to(`.${styles.scrollIndicatorIcon}`, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "sine.inOut"
    });
    
    // Set up scroll-triggered parallax effects
    // Background moves slower than foreground for depth effect
    gsap.to(`.${styles.parallaxBg}`, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    
    gsap.to(`.${styles.dunesSilhouette}`, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    
    gsap.to(`.${styles.cloudLayer}`, {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5
      }
    });
    
    // Remove the code that makes content disappear
    // Instead, add subtle parallax to content
    gsap.to(`.${styles.heroContent}`, {
      yPercent: -10, // Move slightly upward creating parallax effect
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    
    gsap.to(`.${styles.stars}`, {
      yPercent: 5,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    
    return () => {
      tl.kill();
      gsap.killTweensOf(`.${styles.sandParticle}`);
      gsap.killTweensOf(`.${styles.scrollIndicatorIcon}`);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const scrollToHouses = () => {
    const housesSection = document.getElementById('houses');
    if (housesSection) {
      housesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className={styles.hero} ref={heroRef}>
      <div className={styles.parallaxContainer}>
        <div className={styles.stars}></div>
        <div className={styles.cloudLayer}></div>
        <div className={styles.parallaxBg}></div>
        <div className={styles.dunesSilhouette}></div>
        <div className={styles.sandOverlay}></div>
        
        {/* Static sand particles */}
        <div className={styles.sandParticlesContainer} ref={sandParticlesRef}>
          {[...Array(50)].map((_, i) => (
            <div key={i} className={styles.sandParticle}></div>
          ))}
        </div>

        {/* 3D Pyramid positioned to the right of the content */}
        <PyramidScene position="right" />
      </div>
      
      <div className={styles.heroContent}>
        <div className={styles.logoContainer}>
          <h1 ref={logoRef} className={styles.logo}>
            <span className={styles.logoLetter}>U</span>
            <span className={styles.logoLetter}>T</span>
            <span className={styles.logoLetter}>S</span>
            <span className={styles.logoLetter}>A</span>
            <span className={styles.logoLetter}>V</span>
          </h1>
          <div className={styles.glowEffect}></div>
        </div>
        
        <p className={styles.tagline}>Where Art Flows Like Spice</p>
        
        <button className={styles.exploreBtn}>
          <span className={styles.exploreBtnText}>Explore Festival</span>
          <div className={styles.btnGlow}></div>
        </button>
      </div>
      
      <div className={styles.scrollIndicator} onClick={scrollToHouses}>
        <span className={styles.scrollText}>Discover the Houses</span>
        <ChevronDown className={styles.scrollIndicatorIcon} size={20} />
      </div>
      
      {/* Atmospheric overlay */}
      <div className={styles.atmosphericOverlay}></div>
    </section>
  );
};

export default Hero;
