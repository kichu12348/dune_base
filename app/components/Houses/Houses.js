import { useEffect, useRef, useState } from "react";
import { Users, Trophy, Star } from "lucide-react";
import styles from "./Houses.module.css";

const housesData = [
  {
    id: "atreides",
    name: "House Atreides",
    logo: "/houses/atreides.svg",
    title: "Noble House of Leadership",
    description:
      "A house of honor and justice, whose leadership principles and strategic brilliance have earned them respect across the universe.",
    color: "var(--house-atreides)",
    members: 0,
    achievements: 0,
    specialty: "Leadership",
  },
  {
    id: "arrakis",
    name: "House Arrakis",
    logo: "/houses/arrakis.jpg",
    title: "Desert Masters of Dune",
    description:
      "Born of the harsh desert, they've mastered survival in the most unforgiving landscapes, finding beauty and strength where others see only desolation.",
    color: "var(--house-arrakis)",
    members: 0,
    achievements: 0,
    specialty: "Desert Craft",
  },
  {
    id: "winterfell",
    name: "House Winterfell",
    logo: "/houses/winterfellLogo.jpg",
    title: "Wardens of the North",
    description:
      "Steadfast and resilient as the northern winters, they embody honor and tradition while preparing for the long challenges ahead.",
    color: "var(--house-winterfell)",
    members: 0,
    achievements: 0,
    specialty: "Strategy",
  },
  {
    id: "zephandor",
    name: "House Zephandor",
    logo: "/houses/zeph2.png",
    title: "Masters of the Waters",
    description:
      "Fluid and adaptable, they harness the power of innovation and knowledge, flowing around obstacles rather than confronting them directly.",
    color: "var(--house-zephandor)",
    members: 0,
    achievements: 0,
    specialty: "Innovation",
  },
];

// Array of hieroglyphs for decoration
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

const Houses = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const housesRef = useRef([]);
  const hieroglyphsRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Optimize particle creation using vanilla JS instead of manipulating DOM in useEffect
  const createParticles = (container) => {
    if (!container) return;
    
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = styles.particle;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.bottom = `${Math.random() * 100}%`;
      
      // Pre-calculate values for animation timing
      const duration = Math.random() * 10 + 15;
      const delay = Math.random() * 10;
      
      particle.style.animation = `${styles.float} ${duration}s infinite ease-out ${delay}s`;
      particle.style.transform = `translate3d(0, 0, 0)`;
      
      fragment.appendChild(particle);
    }
    container.appendChild(fragment);
  };

  // Optimize hieroglyph creation
  const createHieroglyphs = (container) => {
    if (!container) return;
    container.innerHTML = '';
    
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 15; i++) {
      const hieroglyphChar = document.createElement('div');
      hieroglyphChar.className = styles.egyptianHieroglyph;
      const randomIndex = Math.floor(Math.random() * hieroglyphs.length);
      hieroglyphChar.textContent = hieroglyphs[randomIndex];
      hieroglyphChar.style.top = `${Math.random() * 100}%`;
      hieroglyphChar.style.left = `${Math.random() * 100}%`;
      const size = Math.random() * 50 + 30;
      hieroglyphChar.style.fontSize = `${size}px`;
      const rotation = Math.random() * 30 - 15;
      hieroglyphChar.style.transform = `rotate(${rotation}deg) translate3d(0, 0, 0)`;
      fragment.appendChild(hieroglyphChar);
    }
    container.appendChild(fragment);
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isInView) {
        setIsInView(true);
        
        // Animate title with native JS instead of GSAP
        if (titleRef.current) {
          titleRef.current.classList.add(styles.animateIn);
        }
        
        // Animate house cards with CSS classes
        if (housesRef.current.length > 0) {
          housesRef.current.forEach((card, index) => {
            if (card) {
              setTimeout(() => {
                card.classList.add(styles.animateIn);
              }, index * 100); // Staggered animation with setTimeout
            }
          });
        }
      } else if (!entries[0].isIntersecting && isInView) {
        // Optional: Handle exit animations if needed
        setIsInView(false);
      }
    }, {
      threshold: 0.1
    });
    
    observer.observe(sectionRef.current);
    
    // Scroll listener to handle parallax and fade effects previously done with GSAP
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const heroContent = document.querySelector(".heroContent");
      
      if (heroContent) {
        const opacity = 1 - Math.min(1, scrollTop / window.innerHeight);
        const yTranslate = scrollTop * 0.3;
        heroContent.style.opacity = Math.max(0, opacity);
        heroContent.style.transform = `translateY(-${yTranslate}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Only run these effects if section is in view or for initial setup
    createParticles(sectionRef.current);
    
    // Use requestIdleCallback for non-critical animations
    window.requestIdleCallback ? 
      window.requestIdleCallback(() => createHieroglyphs(hieroglyphsRef.current)) :
      setTimeout(() => createHieroglyphs(hieroglyphsRef.current), 200);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      setIsInView(false);
    };
  }, []);

  return (
    <section id="houses" className={styles.houses} ref={sectionRef}>
      <div className={styles.overlay}></div>
      <div className={styles.eventsConnector}></div>
      <div className={styles.starsPattern}></div>
      <div className={styles.gridPattern}></div>

      <div className={styles.egyptianSymbols} ref={hieroglyphsRef}>
        {/* Hieroglyphs will be added dynamically */}
      </div>

      <div className={styles.housesContainer}>
        <div className={`${styles.titleContainer}`} ref={titleRef}>
          <h2>The Great Houses</h2>
          <p>Pledge your allegiance in the shadow of the ancient pyramids</p>
        </div>

        <div className={styles.housesGrid}>
          {housesData.map((house, index) => {
            return (
              <div
                key={house.id}
                className={styles.houseCard}
                ref={(el) => (housesRef.current[index] = el)}
                style={{
                  "--icon-color": house.color,
                  "--shadow-color": house.color,
                  "--border-color": house.color,
                  "--text-color": house.color,
                  "--animation-delay": `${index * 0.1}s`,
                }}
              >
                <div
                  className={styles.cardGlow}
                  style={{
                    backgroundColor: house.color,
                    boxShadow: `0 0 20px ${house.color}`,
                  }}
                ></div>
                <div className={styles.cardDecoration}></div>

                <div className={styles.houseTop}>
                  <div className={styles.houseIconContainer}>
                    <div
                      className={styles.iconCircle}
                      style={{ backgroundColor: "transparent"}}
                    ></div>
                    <div
                      className={styles.iconGlow}
                      style={{
                        background: `transparent`,
                      }}
                    ></div>
                    <img 
                      src={house.logo} 
                      alt={`${house.name} Logo`}
                      className={styles.houseLogo} 
                      loading="lazy"
                    />
                  </div>

                  <h3
                    className={styles.houseName}
                    style={{ color: house.color }}
                  >
                    {house.name}
                  </h3>
                  <div className={styles.houseTitle}>{house.title}</div>
                </div>

                <div className={styles.houseBottom}>
                  <div className={styles.houseDescription}>
                    <p>{house.description}</p>
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
