import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Events.module.css';

gsap.registerPlugin(ScrollTrigger);

const eventsData = [
  {
    id: 'event1',
    title: 'Sandstorm Symphony',
    description: 'A mesmerizing orchestral performance where music flows and swirls like the sands of Arrakis, creating auditory patterns that shift and evolve.',
    date: 'March 21',
    location: 'Great Hall',
    image: 'sandstorm.jpg',
    house: 'House Zephyr'
  },
  {
    id: 'event2',
    title: 'Echoes of Arrakis',
    description: 'A multi-sensory exhibition where artists create soundscapes and visuals inspired by the deep desert, evoking the whispers of ancient dunes.',
    date: 'March 21',
    location: 'Desert Pavilion',
    image: 'dune-landscape.jpg',
    house: 'House Nyx'
  },
  {
    id: 'event3',
    title: 'Spice Ink Battle',
    description: 'A competitive art event where participants use pigments infused with spice essence to create vibrant, glowing artworks of unparalleled intensity.',
    date: 'March 21',
    location: 'Spice Market',
    image: 'spice-ink.jpg',
    house: 'House Ignis'
  },
  {
    id: 'event4',
    title: 'Wormhole Artistry',
    description: 'A fusion of dance and projection mapping that creates the illusion of bending space and time, inspired by the folding of space in the Dune universe.',
    date: 'March 21',
    location: 'Quantum Arena',
    image: 'wormhole.jpeg',
    house: 'House Solis'
  },
  {
    id: 'event5',
    title: 'The Fremen Chronicles',
    description: 'An immersive storytelling experience where the ancient tales of survival and resilience are shared through shadow puppetry and spoken word.',
    date: 'March 21',
    location: 'Sietch Tabr',
    image: 'freman.jpg',
    house: 'House Zephyr'
  },
  {
    id: 'event6',
    title: 'Melange Dreams',
    description: 'A guided meditation and visual journey through the consciousness-expanding properties of the spice, rendered in breathtaking holographic art.',
    date: 'March 21',
    location: 'Mind Sanctuary',
    image: 'melange.webp',
    house: 'House Nyx'
  },
];

const Events = () => {
  const sectionRef = useRef(null);
  const eventsRef = useRef([]);
  const dustParticlesRef = useRef([]);
  
  useEffect(() => {
    // Generate random dust particles
    const createDustParticles = () => {
      const particles = [];
      const container = document.querySelector(`.${styles.backgroundDecoration}`);
      
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = styles.dustParticle;
        
        // Random size between 2-4px
        const size = Math.random() * 2 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = `${Math.random() * 100}%`;
        
        // Random movement variables
        const xMove = (Math.random() - 0.5) * 200;
        const yMove = -Math.random() * 150 - 50; // Always move upward
        particle.style.setProperty('--x-move', `${xMove}px`);
        particle.style.setProperty('--y-move', `${yMove}px`);
        
        // Set animation
        particle.style.animation = `${styles.floatDust} ${Math.random() * 10 + 15}s infinite ease-out ${Math.random() * 10}s`;
        
        container.appendChild(particle);
        particles.push(particle);
      }
      return particles;
    };
    
    // Create dust particles
    dustParticlesRef.current = createDustParticles();
    
    // Animate section title
    gsap.fromTo(
      `.${styles.sectionTitle}`,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: `.${styles.sectionTitle}`,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animate events cards with staggered effect
    gsap.fromTo(
      `.${styles.eventCard}`,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: `.${styles.eventsGrid}`,
          start: "top bottom-=50",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animate decorative circles
    gsap.to(`.${styles.circle1}`, {
      rotation: 360,
      duration: 120,
      repeat: -1,
      ease: "none"
    });
    
    gsap.to(`.${styles.circle2}`, {
      rotation: -360,
      duration: 180,
      repeat: -1,
      ease: "none"
    });
    
    gsap.to(`.${styles.circle3}`, {
      rotation: 360,
      duration: 90,
      repeat: -1,
      ease: "none"
    });
    
    // Add parallax effects for multiple elements
    gsap.to(`.${styles.sectionTitle}`, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
    
    // Add parallax for events grid with offset
    gsap.to(`.${styles.eventsGrid}`, {
      yPercent: -15,
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
      // Clean up dust particles
      dustParticlesRef.current.forEach(particle => {
        if (particle && particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <section id="events" className={styles.eventsSection} ref={sectionRef}>
      {/* Add top connector */}
      <div className={styles.topConnector}></div>
      
      <div className={styles.backgroundDecoration}>
        <div className={styles.gridPattern}></div>
        <div className={`${styles.decorCircle} ${styles.circle1}`}></div>
        <div className={`${styles.decorCircle} ${styles.circle2}`}></div>
        <div className={`${styles.decorCircle} ${styles.circle3}`}></div>
        
        <div className={`${styles.diagonalLine} ${styles.line1}`}></div>
        <div className={`${styles.diagonalLine} ${styles.line2}`}></div>
        <div className={`${styles.diagonalLine} ${styles.line3}`}></div>
        
        <div className={`${styles.ornament} ${styles.ornamentTop}`}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 12l8 10 8-10L12 2zm0 18V4l6 8-6 8z"/>
          </svg>
        </div>
        <div className={`${styles.ornament} ${styles.ornamentBottom}`}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 12l8 10 8-10L12 2zm0 18V4l6 8-6 8z"/>
          </svg>
        </div>
        <div className={`${styles.ornament} ${styles.ornamentLeft}`}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 12l8 10 8-10L12 2zm0 18V4l6 8-6 8z"/>
          </svg>
        </div>
        <div className={`${styles.ornament} ${styles.ornamentRight}`}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 12l8 10 8-10L12 2zm0 18V4l6 8-6 8z"/>
          </svg>
        </div>
      </div>
      
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleLine}>Upcoming</span>
          <span className={styles.titleLine}>Festival Events</span>
        </h2>
        
        <div className={styles.eventsGrid}>
          {eventsData.map((event, index) => (
            <div 
              key={event.id} 
              className={styles.eventCard} 
              ref={el => eventsRef.current[index] = el}
            >
              <div className={styles.eventCardInner}>
                <div className={styles.eventFront}>
                  <div className={styles.eventImageContainer}>
                    <div className={styles.eventImage}>
                    </div>
                  </div>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <div className={styles.eventMeta}>
                    <span>{event.date}</span>
                    <span className={styles.eventLocation}>{event.location}</span>
                  </div>
                </div>
                
                <div className={styles.eventBack}>
                  <p className={styles.eventDescription}>{event.description}</p>
                  <p className={styles.eventHost}>Hosted by: {event.house}</p>
                  <button className={styles.registerBtn}>Register</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.viewMoreContainer}>
          <button className={styles.viewMoreBtn}>View All Events</button>
        </div>
      </div>
    </section>
  );
};

export default Events;
