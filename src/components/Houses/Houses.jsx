import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sun, Moon, Wind, Flame, Users, Trophy, Star } from 'lucide-react';
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
  
  useEffect(() => {
    const createParticles = () => {
      const container = sectionRef.current;
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = styles.particle;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = `${Math.random() * 100}%`;
        const xMove = (Math.random() - 0.5) * 200;
        const yMove = -Math.random() * 150 - 50;
        particle.style.setProperty('--x-move', `${xMove}px`);
        particle.style.setProperty('--y-move', `${yMove}px`);
        particle.style.animation = `${styles.float} ${Math.random() * 10 + 15}s infinite ease-out ${Math.random() * 10}s`;
        
        container.appendChild(particle);
      }
    };
    
    createParticles();
    
    const sectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "top top",
        scrub: 1
      }
    });
    
    sectionTl.to(".heroContent", {
      opacity: 0,
      y: -50,
      ease: "power2.in"
    });
    

    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=100",
          end: "top center",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    gsap.fromTo(housesRef.current,
      { 
        opacity: 0,
        y: 80,
        rotateX: -10
      },
      { 
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current.querySelector(`.${styles.housesGrid}`),
          start: "top bottom-=50",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    const egyptianSymbols = document.querySelectorAll(`.${styles.egyptianSymbol}`);
    egyptianSymbols.forEach(symbol => {
      gsap.to(symbol, {
        opacity: gsap.utils.random(0.15, 0.25),
        duration: gsap.utils.random(10, 20),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: gsap.utils.random(0, 5)
      });
    });

    gsap.to(sectionRef.current.querySelector(`.${styles.dunesSilhouette}`), {
      y: -80,
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
      {/* Section connectors */}
      <div className={styles.heroConnector}></div>
      <div className={styles.eventsConnector}></div>
      
      {/* Background elements */}
      <div className={styles.starsPattern}></div>
      <div className={styles.dunesSilhouette}></div>
      <div className={styles.gridPattern}></div>
      
      {/* Egyptian SVG symbols */}
      <div className={styles.egyptianSymbols}>
        <img src="/svgs/ankh.svg" className={`${styles.egyptianSymbol}`} style={{top: '15%', left: '5%', width: '70px', transform: 'rotate(-15deg)'}} alt="" />
        <img src="/svgs/sphinx-egypt.svg" className={`${styles.egyptianSymbol}`} style={{bottom: '20%', right: '8%', width: '100px'}} alt="" />
        <img src="/svgs/pharaoh.svg" className={`${styles.egyptianSymbol}`} style={{top: '40%', left: '3%', width: '80px'}} alt="" />
        <img src="/svgs/mummy-man.svg" className={`${styles.egyptianSymbol}`} style={{top: '25%', right: '12%', width: '70px', transform: 'rotate(10deg)'}} alt="" />
        <img src="/svgs/hieroglyphs-ancient-culture-egyptian-pyramid.svg" className={`${styles.egyptianSymbol}`} style={{bottom: '35%', left: '12%', width: '60px'}} alt="" />
        <img src="/svgs/hieroglyphs-ancient-culture-egyptian-pyramid-10.svg" className={`${styles.egyptianSymbol}`} style={{top: '10%', right: '25%', width: '60px', transform: 'rotate(-8deg)'}} alt="" />
        <img src="/svgs/egyptian-egypt-egyptian-ancient.svg" className={`${styles.egyptianSymbol}`} style={{top: '55%', right: '20%', width: '90px'}} alt="" />
        
        <img src="/svgs/ankh.svg" className={`${styles.egyptianSymbol}`} style={{bottom: '45%', right: '28%', width: '60px', transform: 'rotate(20deg)'}} alt="" />
        <img src="/svgs/sphinx-egypt.svg" className={`${styles.egyptianSymbol}`} style={{top: '15%', left: '35%', width: '120px', transform: 'scaleX(-1) rotate(-5deg)'}} alt="" />
        <img src="/svgs/mummy-man.svg" className={`${styles.egyptianSymbol}`} style={{bottom: '15%', left: '25%', width: '65px', transform: 'rotate(-15deg)'}} alt="" />
        <img src="/svgs/hieroglyphs-ancient-culture-egyptian-pyramid.svg" className={`${styles.egyptianSymbol}`} style={{top: '60%', left: '55%', width: '55px', transform: 'rotate(10deg)'}} alt="" />
        <img src="/svgs/egyptian-egypt-egyptian-ancient.svg" className={`${styles.egyptianSymbol}`} style={{top: '5%', right: '45%', width: '75px', transform: 'rotate(8deg)'}} alt="" />
      </div>
      
      <div className={styles.housesContainer}>
        {/* Title section */}
        <div className={styles.titleContainer} ref={titleRef}>
          <h2>The Great Houses</h2>
          <p>Choose your allegiance in the artistic landscape of Arrakis</p>
        </div>
        
        {/* Houses grid */}
        <div className={styles.housesGrid}>
          {housesData.map((house, index) => {
            const IconComponent = house.icon;
            
            return (
              <div 
                key={house.id} 
                className={styles.houseCard}
                ref={el => housesRef.current[index] = el}
                style={{
                  '--icon-color': house.color,
                  '--shadow-color': house.color,
                  '--border-color': house.color,
                  '--text-color': house.color
                }}
              >
                {/* Add card glow and decoration elements */}
                <div className={styles.cardGlow} style={{backgroundColor: house.color, boxShadow: `0 0 20px ${house.color}`}}></div>
                <div className={styles.cardDecoration}></div>
                
                {/* House header */}
                <div className={styles.houseTop}>
                  <div className={styles.houseIconContainer}>
                    <div className={styles.iconCircle} style={{backgroundColor: house.color}}></div>
                    <div className={styles.iconGlow} style={{background: `radial-gradient(circle, ${house.color} 0%, transparent 70%)`}}></div>
                    <IconComponent size={38} className={styles.houseIcon} />
                  </div>
                  
                  <h3 className={styles.houseName} style={{color: house.color}}>{house.name}</h3>
                  <div className={styles.houseTitle}>{house.title}</div>
                </div>
                
                {/* House content */}
                <div className={styles.houseBottom}>
                  <div className={styles.houseDescription}>
                    <p>{house.description}</p>
                  </div>
                  
                  {/* Stats with new layout */}
                  <div className={styles.houseStats}>
                    <div className={styles.statItem}>
                      <Users size={18} className={styles.statIcon} />
                      <span className={styles.statValue}>{house.members}</span>
                      <span className={styles.statLabel}>Members</span>
                    </div>
                    <div className={styles.statItem}>
                      <Trophy size={18} className={styles.statIcon} />
                      <span className={styles.statValue}>{house.achievements}</span>
                      <span className={styles.statLabel}>Awards</span>
                    </div>
                    <div className={styles.statItem}>
                      <Star size={18} className={styles.statIcon} />
                      <span className={styles.statValue}>{house.specialty}</span>
                      <span className={styles.statLabel}>Focus</span>
                    </div>
                  </div>
                  
                  {/* Join button */}
                  <div className={styles.houseActions}>
                    <button className={styles.joinBtn} style={{color: house.color, borderColor: house.color}}>
                      <span>Join House</span>
                      <div className={styles.btnGlow}></div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Houses;
