import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sun, Moon, Wind, Flame, Users, Award, Star } from 'lucide-react';
import styles from './Houses.module.css';

gsap.registerPlugin(ScrollTrigger);

const housesData = [
  {
    id: 'solis',
    name: 'House Solis',
    icon: Sun,
    title: 'Masters of Light & Vision',
    description: 'The visionaries who bend light to their will, creating spectacles of illumination and visual arts that transcend conventional sight.',
    color: 'var(--house-solis)',
    members: 124,
    achievements: 8,
    specialty: 'Visual Arts'
  },
  {
    id: 'nyx',
    name: 'House Nyx',
    icon: Moon,
    title: 'Keepers of the Night Arts',
    description: 'Dwelling in shadow and mystery, they harness darkness itself to create performances that reveal the beauty hidden within the void.',
    color: 'var(--house-nyx)',
    members: 98,
    achievements: 7,
    specialty: 'Performance'
  },
  {
    id: 'zephyr',
    name: 'House Zephyr',
    icon: Wind,
    title: 'Windborne Storytellers',
    description: 'Masters of sound and voice who carry tales across vast distances, weaving narratives that dance on the air like desert winds.',
    color: 'var(--house-zephyr)',
    members: 112,
    achievements: 9,
    specialty: 'Music & Sound'
  },
  {
    id: 'ignis',
    name: 'House Ignis',
    icon: Flame,
    title: 'Flames of Expression',
    description: 'Passionate creators whose arts burn with intensity and transformation, forging new forms from the raw materials of imagination.',
    color: 'var(--house-ignis)',
    members: 106,
    achievements: 6,
    specialty: 'Sculpture & Design'
  }
];

const Houses = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const housesRef = useRef([]);
  const [activeHouse, setActiveHouse] = useState(null);

  const handleHouseClick = (id) => {
    setActiveHouse(activeHouse === id ? null : id);
  };

  useEffect(() => {
    // Create timeline for section intro
    const introTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom-=100",
        end: "top center",
        toggleActions: "play none none reverse"
      }
    });
    
    introTl
      .fromTo(titleRef.current.querySelector('h2'), 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(titleRef.current.querySelector('p'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.8"
      );
    
    // Animate each house card with a staggered effect
    housesRef.current.forEach((house, index) => {
      gsap.fromTo(house,
        { 
          y: 100, 
          opacity: 0,
          rotateX: -15
        },
        { 
          y: 0, 
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2 * index,
          scrollTrigger: {
            trigger: house,
            start: "top bottom-=50",
            end: "center center",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
    
    // Parallax effect for section background
    gsap.to(`.${styles.duneBackground}`, {
      backgroundPositionY: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
    
    // Parallax for the sand overlay
    gsap.to(`.${styles.sandOverlay}`, {
      backgroundPositionY: "10%",
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
    <section id="houses" className={styles.houses} ref={sectionRef}>
      <div className={styles.duneBackground}></div>
      <div className={styles.sandOverlay}></div>
      
      <div className={styles.container}>
        <div className={styles.titleContainer} ref={titleRef}>
          <h2>The Great Houses</h2>
          <p>Choose your allegiance in the artistic landscape of Arrakis</p>
        </div>
        
        <div className={styles.housesGrid}>
          {housesData.map((house, index) => {
            const IconComponent = house.icon;
            const isActive = activeHouse === house.id;
            
            return (
              <div 
                key={house.id} 
                className={`${styles.houseCard} ${isActive ? styles.active : ''}`}
                style={{'--house-color': house.color}}
                ref={el => housesRef.current[index] = el}
                onClick={() => handleHouseClick(house.id)}
              >
                <div className={styles.houseTop}>
                  <div className={styles.houseIconContainer}>
                    <IconComponent size={isActive ? 48 : 36} className={styles.houseIcon} />
                  </div>
                  
                  <div className={styles.houseName}>{house.name}</div>
                  <div className={styles.houseDivider}></div>
                  <div className={styles.houseTitle}>{house.title}</div>
                </div>
                
                <div className={styles.houseBottom}>
                  <div className={styles.houseDescription}>
                    <p>{house.description}</p>
                  </div>
                  
                  <div className={styles.houseStats}>
                    <div className={styles.statItem}>
                      <Users size={16} />
                      <span>{house.members} Members</span>
                    </div>
                    <div className={styles.statItem}>
                      <Award size={16} />
                      <span>{house.achievements} Awards</span>
                    </div>
                    <div className={styles.statItem}>
                      <Star size={16} />
                      <span>{house.specialty}</span>
                    </div>
                  </div>
                  
                  <div className={styles.houseActions}>
                    <button className={styles.joinBtn}>
                      <span>Join House</span>
                      <div className={styles.btnGlow}></div>
                    </button>
                  </div>
                </div>
                
                <div className={styles.cardGlow}></div>
                <div className={styles.cardDecoration}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Houses;
