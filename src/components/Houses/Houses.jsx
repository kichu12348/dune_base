import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Trophy, Star } from "lucide-react";
import styles from "./Houses.module.css";

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    const createParticles = () => {
      const container = sectionRef.current;
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.className = styles.particle;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = `${Math.random() * 100}%`;
        const xMove = (Math.random() - 0.5) * 200;
        const yMove = -Math.random() * 150 - 50;
        particle.style.setProperty("--x-move", `${xMove}px`);
        particle.style.setProperty("--y-move", `${yMove}px`);
        particle.style.animation = `${styles.float} ${
          Math.random() * 10 + 15
        }s infinite ease-out ${Math.random() * 10}s`;

        container.appendChild(particle);
      }
    };

    // Create hieroglyph floating symbols
    const createHieroglyphs = () => {
      const container = hieroglyphsRef.current;
      if (!container) return;

      // Clear container first
      container.innerHTML = '';
      
      // Create 15 random hieroglyph elements
      for (let i = 0; i < 15; i++) {
        const hieroglyphChar = document.createElement('div');
        hieroglyphChar.className = styles.egyptianHieroglyph;
        
        // Pick random hieroglyph
        const randomIndex = Math.floor(Math.random() * hieroglyphs.length);
        hieroglyphChar.textContent = hieroglyphs[randomIndex];
        
        // Random positioning
        hieroglyphChar.style.top = `${Math.random() * 100}%`;
        hieroglyphChar.style.left = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 50 + 30; // 30-80px
        hieroglyphChar.style.fontSize = `${size}px`;
        
        // Random rotation
        const rotation = Math.random() * 30 - 15; // -15 to 15 degrees
        hieroglyphChar.style.transform = `rotate(${rotation}deg)`;
        
        // Add to container
        container.appendChild(hieroglyphChar);
      }
    };

    createParticles();
    createHieroglyphs();

    const sectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "top top",
        scrub: 1,
      },
    });

    sectionTl.to(".heroContent", {
      opacity: 0,
      y: -50,
      ease: "power2.in",
    });

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=100",
          end: "top center",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      housesRef.current,
      {
        opacity: 0,
        y: 80,
        rotateX: -10,
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
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate hieroglyphs
    const hieroglyphElements = document.querySelectorAll(`.${styles.egyptianHieroglyph}`);
    hieroglyphElements.forEach((symbol) => {
      gsap.to(symbol, {
        opacity: gsap.utils.random(0.15, 0.25),
        y: gsap.utils.random(-20, 20),
        x: gsap.utils.random(-15, 15),
        rotation: gsap.utils.random(-10, 10),
        duration: gsap.utils.random(10, 20),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: gsap.utils.random(0, 5),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="houses" className={styles.houses} ref={sectionRef}>
      {/* Remove heroConnector div */}
      <div className={styles.eventsConnector}></div>
      {/* Background patterns */}
      <div className={styles.starsPattern}></div>
      {/* Remove dunesSilhouette div */}
      <div className={styles.gridPattern}></div>

      {/* Replace SVG symbols with hieroglyph characters */}
      <div className={styles.egyptianSymbols} ref={hieroglyphsRef}>
        {/* Hieroglyphs will be added dynamically */}
      </div>

      <div className={styles.housesContainer}>
        {/* Title section */}
        <div className={styles.titleContainer} ref={titleRef}>
          <h2>The Great Houses</h2>
          <p>Pledge your allegiance in the shadow of the ancient pyramids</p>
        </div>

        {/* Houses grid */}
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
                }}
              >
                {/* Add card glow and decoration elements */}
                <div
                  className={styles.cardGlow}
                  style={{
                    backgroundColor: house.color,
                    boxShadow: `0 0 20px ${house.color}`,
                  }}
                ></div>
                <div className={styles.cardDecoration}></div>

                {/* House header */}
                <div className={styles.houseTop}>
                  <div className={styles.houseIconContainer}>
                    <div
                      className={styles.iconCircle}
                      style={{ backgroundColor: house.color }}
                    ></div>
                    <div
                      className={styles.iconGlow}
                      style={{
                        background: `radial-gradient(circle, ${house.color} 0%, transparent 70%)`,
                      }}
                    ></div>
                    <img 
                      src={house.logo} 
                      alt={`${house.name} Logo`}
                      className={styles.houseLogo} 
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

                {/* House content */}
                <div className={styles.houseBottom}>
                  <div className={styles.houseDescription}>
                    <p>{house.description}</p>
                  </div>

                  {/* Stats with new layout 
                  <div className={styles.houseStats}>
                    <div className={styles.statItem}>
                      <Users size={18} className={styles.statIcon} />
                      <span className={styles.statValue}>{house.members}</span>
                      <span className={styles.statLabel}>Members</span>
                    </div>
                    <div className={styles.statItem}>
                      <Trophy size={18} className={styles.statIcon} />
                      <span className={styles.statValue}>
                        {house.achievements}
                      </span>
                      <span className={styles.statLabel}>Awards</span>
                    </div>
                    <div className={styles.statItem}>
                      <Star size={18} className={styles.statIcon} />
                      <span className={styles.statValue}>
                        {house.specialty}
                      </span>
                      <span className={styles.statLabel}>Focus</span>
                    </div>
                  </div>*/}

                  {/* Join button */}
                  <div className={styles.houseActions}>
                    {/* <button
                      className={styles.joinBtn}
                      style={{ color: house.color, borderColor: house.color }}
                    >
                      <span>Join House</span>
                      <div className={styles.btnGlow}></div>
                    </button> */}
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
