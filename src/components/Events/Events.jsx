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
    date: 'Oct 15',
    location: 'Great Hall',
    image: 'sandstorm.jpg',
    house: 'House Zephyr'
  },
  {
    id: 'event2',
    title: 'Echoes of Arrakis',
    description: 'A multi-sensory exhibition where artists create soundscapes and visuals inspired by the deep desert, evoking the whispers of ancient dunes.',
    date: 'Oct 17',
    location: 'Desert Pavilion',
    image: 'echoes.jpg',
    house: 'House Nyx'
  },
  {
    id: 'event3',
    title: 'Spice Ink Battle',
    description: 'A competitive art event where participants use pigments infused with spice essence to create vibrant, glowing artworks of unparalleled intensity.',
    date: 'Oct 19',
    location: 'Spice Market',
    image: 'spice-ink.jpg',
    house: 'House Ignis'
  },
  {
    id: 'event4',
    title: 'Wormhole Artistry',
    description: 'A fusion of dance and projection mapping that creates the illusion of bending space and time, inspired by the folding of space in the Dune universe.',
    date: 'Oct 20',
    location: 'Quantum Arena',
    image: 'wormhole.jpg',
    house: 'House Solis'
  },
  {
    id: 'event5',
    title: 'The Fremen Chronicles',
    description: 'An immersive storytelling experience where the ancient tales of survival and resilience are shared through shadow puppetry and spoken word.',
    date: 'Oct 22',
    location: 'Sietch Tabr',
    image: 'fremen.jpg',
    house: 'House Zephyr'
  },
  {
    id: 'event6',
    title: 'Melange Dreams',
    description: 'A guided meditation and visual journey through the consciousness-expanding properties of the spice, rendered in breathtaking holographic art.',
    date: 'Oct 24',
    location: 'Mind Sanctuary',
    image: 'melange.jpg',
    house: 'House Nyx'
  },
];

const Events = () => {
  const sectionRef = useRef(null);
  const eventsRef = useRef([]);
  
  useEffect(() => {
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
    
    // Parallax effect for sand background
    gsap.to(`.${styles.sandBackground}`, {
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

  return (
    <section id="events" className={styles.eventsSection} ref={sectionRef}>
      <div className={styles.sandBackground}></div>
      
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
                    <div className={styles.eventImage}></div>
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
