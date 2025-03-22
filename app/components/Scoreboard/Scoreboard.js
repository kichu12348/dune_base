import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Award, Medal, Star } from "lucide-react";
import styles from "./Scoreboard.module.css";
import { useScore } from "../../contexts/scoreContext";

gsap.registerPlugin(ScrollTrigger);

const ScoreCounter = ({ value, color }) => {
  const counterRef = useRef(null);

  useEffect(() => {
    // Create one IntersectionObserver for all score counters
    if (!window.scoreObserver) {
      window.scoreObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const element = entry.target;
              const targetValue = parseInt(element.getAttribute("data-value"));

              gsap.to(
                {
                  value: 0,
                },
                {
                  value: targetValue,
                  duration: 2.5,
                  ease: "power2.out",
                  onUpdate: function () {
                    element.innerHTML = Math.round(this.targets()[0].value);
                  },
                  onComplete: () => {
                    window.scoreObserver.unobserve(element);
                  },
                }
              );
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -20% 0px",
        }
      );
    }

    if (counterRef.current) {
      counterRef.current?.setAttribute("data-value", value);
      window.scoreObserver.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current && window.scoreObserver) {
        window.scoreObserver.unobserve(counterRef.current);
      }
    };
  }, [value]);

  return (
    <span ref={counterRef} className={styles.scoreValue} style={{ color }}>
      0
    </span>
  );
};

const Scoreboard = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const { score } = useScore();

  const houseScores = [
    {
      id: "atreides",
      name: "House Atreides",
      logo: "/houses/atreides.svg",
      score: score?.totalScores?.totalAtredies || 0,
      color: "var(--house-atreides)",
      achievements: 0,
      ranking: 2,
    },
    {
      id: "arrakis",
      name: "House Arrakis",
      logo: "/houses/arrakis.jpg",
      score: score?.totalScores?.totalArrakis || 0,
      color: "var(--house-arrakis)",
      achievements: 0,
      ranking: 1,
    },
    {
      id: "winterfell",
      name: "House Winterfell",
      logo: "/houses/winterfellLogo.jpg",
      score: score?.totalScores?.totalWinterfell || 0,
      color: "var(--house-winterfell)",
      achievements: 0,
      ranking: 3,
    },
    {
      id: "zephandor",
      name: "House Zephandor",
      logo: "/houses/zeph2.png",
      score: score?.totalScores?.totalZephandor || 0,
      color: "var(--house-zephandor)",
      achievements: 0,
      ranking: 4,
    },
  ];

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const mainTl = gsap.timeline({
      defaults: {
        ease: "power2.out",
      },
    });
    mainTl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
      },
      {
        opacity: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.2,
      }
    );
    ScrollTrigger.create({
      trigger: titleRef.current,
      start: "top bottom-=100",
      toggleActions: "play none none reverse",
      animation: mainTl,
    });

    const rowsTl = gsap.timeline({
      scrollTrigger: {
        trigger: `.${styles.rankingsContainer}`,
        start: "top bottom-=50",
        toggleActions: "play none none reverse",
      },
    });

    if (isMobile) {
      rowsTl.fromTo(
        `.${styles.rankingRow}`,
        {
          x: -50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          clearProps: "transform",
        }
      );
    } else {
      rowsTl.fromTo(
        `.${styles.rankingRow}`,
        {
          x: -100,
          opacity: 0,
          filter: "blur(8px)",
        },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.2,
          duration: 0.8,
          clearProps: "transform,filter",
        }
      );
    }
    const barsTl = gsap.timeline({
      scrollTrigger: {
        trigger: `.${styles.rankingsContainer}`,
        start: "top bottom-=50",
        toggleActions: "play none none reverse",
      },
    });

    barsTl.fromTo(
      `.${styles.scoreBar}`,
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1,
        duration: 1.5,
        ease: "power2.inOut",
        stagger: 0.2,
        delay: 0.3,
      }
    );
    if (!isMobile) {
      // Batch the parallax effects
      const parallaxElements = [
        { el: `.${styles.title}`, y: -25 },
        { el: `.${styles.subtitle}`, y: -20 },
        { el: `.${styles.rankingsContainer}`, y: -15 },
        { el: `.${styles.gridOverlay}`, y: 10 },
      ];

      parallaxElements.forEach(({ el, y }) => {
        gsap.to(el, {
          yPercent: y,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }

    return () => {
      // Clean up
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      mainTl.kill();
      rowsTl.kill();
      barsTl.kill();
    };
  }, []);

  // if all are 0 or same score
  const allScoresZero =
    houseScores.every((house) => house.score === 0) ||
    houseScores.every((house) => house.score === houseScores[0].score);
  const sortedHouses = [...houseScores]
    .sort((a, b) => {
      if (allScoresZero) {
        if (a.id === "arrakis") return -1;
        if (b.id === "arrakis") return 1;
        return 0;
      }
      return b.score - a.score;
    })
    .map((house, index) => ({ ...house, ranking: index + 1 }));

  const maxScore = Math.max(...sortedHouses.map((house) => house.score)) || 1;

  const handleViewDetails = (houseId) => {
    window.location.href = `/houses/${houseId}`;
  };

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
          {sortedHouses.map((house) => {
            const scorePercentage = (house.score / maxScore) * 100;

            return (
              <div key={house.id} className={styles.rankingRowWrapper}>
                <div className={styles.rankingRow}>
                  <div className={styles.rankPosition}>
                    {!allScoresZero &&
                      (house.ranking === 1 ? (
                        <Trophy size={22} />
                      ) : (
                        `${house.ranking}`
                      ))}
                  </div>

                  <div
                    className={styles.houseIcon}
                    style={{ backgroundColor: "transparent" }}
                  >
                    <img
                      src={house.logo}
                      alt={`${house.name} Logo`}
                      className={styles.houseLogo}
                      loading="lazy"
                    />
                  </div>

                  <div className={styles.houseName}>{house.name}</div>

                  <div className={styles.scoreBarContainer}>
                    <div
                      className={styles.scoreBar}
                      style={{
                        "--score-width": `${scorePercentage}%`,
                        backgroundColor: house.color,
                        transform: `scaleX(${scorePercentage / 100})`,
                      }}
                    ></div>
                  </div>

                  <div className={styles.scoreDisplay}>
                    <ScoreCounter value={house.score} color={house.color} />
                  </div>

                  <button
                    className={styles.viewDetailsButton}
                    onClick={() => handleViewDetails(house.id)}
                    style={{ color: house.color }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Scoreboard;
