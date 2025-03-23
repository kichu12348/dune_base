"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useScore } from "../../contexts/scoreContext";
import styles from "./HouseDetails.module.css";
import Link from "next/link";
import {
  ChevronLeft,
  Award,
  Star,
  Trophy,
  Medal,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import gsap from "gsap";
import { useParams } from "next/navigation";
import Footer from "@/app/components/Footer/Footer";

// House descriptions for more context
const houseDescriptions = {
  atreides: {
    description:
      "A house of honor and justice, whose leadership principles and strategic brilliance have earned them respect across the universe.",
    specialty: "Leadership",
    motto: "The measure of a person is what they do with power.",
  },
  arrakis: {
    description:
      "Born of the harsh desert, they've mastered survival in the most unforgiving landscapes, finding beauty and strength where others see only desolation.",
    specialty: "Desert Craft",
    motto: "The spice must flow.",
  },
  winterfell: {
    description:
      "Steadfast and resilient as the northern winters, they embody honor and tradition while preparing for the long challenges ahead.",
    specialty: "Strategy",
    motto: "Winter is coming.",
  },
  zephandor: {
    description:
      "Fluid and adaptable, they harness the power of innovation and knowledge, flowing around obstacles rather than confronting them directly.",
    specialty: "Innovation",
    motto: "Adapt, evolve, transcend.",
  },
};

// Hieroglyph symbols for decoration
const hieroglyphs = [
  "𓀀",
  "𓀁",
  "𓀂",
  "𓀃",
  "𓀄",
  "𓀅",
  "𓀆",
  "𓀇",
  "𓀈",
  "𓀉",
  "𓀊",
  "𓀋",
  "𓀌",
  "𓀍",
  "𓀎",
  "𓀏",
  "𓀐",
  "𓀑",
  "𓀒",
  "𓀓",
  "𓀔",
  "𓀕",
  "𓀖",
  "𓀗",
  "𓀘",
  "𓀙",
  "𓀚",
  "𓀛",
  "𓀜",
  "𓀝",
  "𓀞",
  "𓀟",
  "𓀠",
  "𓀡",
  "𓀢",
  "𓀣",
  "𓁀",
  "𓁁",
  "𓁂",
  "𓁃",
  "𓁄",
  "𓁅",
  "𓁆",
  "𓁇",
  "𓁈",
  "𓁉",
  "𓁊",
  "𓁋",
  "𓁌",
  "𓁍",
  "𓁎",
  "𓁏",
  "𓁐",
  "𓁑",
  "𓁒",
  "𓁓",
  "𓁔",
  "𓁕",
  "𓁖",
  "𓁗",
  "𓂀",
  "𓂁",
  "𓂂",
  "𓂃",
  "𓂄",
  "𓂅",
  "𓂆",
  "𓂇",
  "𓂈",
  "𓂉",
  "𓂊",
  "𓂋",
  "𓂌",
  "𓂍",
  "𓂎",
  "𓂏",
  "𓂐",
  "𓂑",
  "𓂒",
  "𓂓",
  "𓂔",
  "𓂕",
  "𓂖",
  "𓂗",
  "𓃀",
  "𓃁",
  "𓃂",
  "𓃃",
  "𓃄",
  "𓃅",
  "𓃆",
  "𓃇",
  "𓃈",
  "𓃉",
  "𓃊",
  "𓃋",
];

// Animated score counter component
const ScoreCounter = ({ value, color }) => {
  const counterRef = useRef(null);

  useEffect(() => {
    if (counterRef.current) {
      gsap.to(
        {
          value: 0,
        },
        {
          value: value,
          duration: 2,
          ease: "power2.out",
          onUpdate: function () {
            if (counterRef.current) {
              counterRef.current.textContent = Math.round(
                this.targets()[0].value
              );
            }
          },
        }
      );
    }
  }, [value]);

  return (
    <span ref={counterRef} className={styles.scoreValue} style={{ color }}>
      0
    </span>
  );
};

const HouseDetails = () => {
  const params = useParams();
  const houseId = params.house;
  const { score } = useScore();
  const [houseData, setHouseData] = useState(null);
  const [houseColor, setHouseColor] = useState(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const particlesRef = useRef(null);
  const hieroglyphsRef = useRef(null);

  // Create background decoration elements
  useEffect(() => {
    // Create particles
    if (particlesRef.current) {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div");
        particle.classList.add(styles.particle);
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.width = `${Math.random() * 2 + 1}px`;
        particle.style.height = `${Math.random() * 2 + 1}px`;
        particlesRef.current.appendChild(particle);
      }
    }

    // Create stars
    if (hieroglyphsRef.current) {
      // Create hieroglyphs
      for (let i = 0; i < 20; i++) {
        const glyph = document.createElement("div");
        glyph.classList.add(styles.hieroglyph);
        const randomIndex = Math.floor(Math.random() * hieroglyphs.length);
        glyph.textContent = hieroglyphs[randomIndex];
        glyph.style.left = `${Math.random() * 100}%`;
        glyph.style.top = `${Math.random() * 100}%`;
        glyph.style.opacity = 0.08 + Math.random() * 0.05;
        glyph.style.fontSize = `${3 + Math.random() * 4}rem`;
        glyph.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
        hieroglyphsRef.current.appendChild(glyph);
      }

      // Create stars
      for (let i = 0; i < 50; i++) {
        const star = document.createElement("div");
        star.classList.add(styles.star);
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 2 + 1}px`;
        star.style.height = `${Math.random() * 2 + 1}px`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        hieroglyphsRef.current.appendChild(star);
      }
    }

    // Animation on initial load
    if (headerRef.current && contentRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power2.out" }
      );
    }
  }, [houseData]);

  useEffect(() => {
    // Map house IDs to their respective properties in the score context
    const houseKeyMap = {
      atreides: {
        totalKey: "totalAtredies",
        name: "House Atreides",
        color: "#a0a0a0",
        logo: "/houses/atreides.svg",
      },
      arrakis: {
        totalKey: "totalArrakis",
        name: "House Arrakis",
        color: "#d2b48c",
        logo: "/houses/arrakis.jpg",
      },
      winterfell: {
        totalKey: "totalWinterfell",
        name: "House Winterfell",
        color: "#e1e6e9",
        logo: "/houses/winterfellLogo.jpg",
      },
      zephandor: {
        totalKey: "totalZephandor",
        name: "House Zephandor",
        color: "#6495ed",
        logo: "/houses/zeph2.png",
      },
    };

    const houseInfo = houseKeyMap[houseId];
    setHouseColor(houseInfo.color);
    if (houseInfo && score) {
      // Get house events with more detailed information
      const houseKey = houseId.charAt(0).toUpperCase() + houseId.slice(1);

      const processedEvents =
        score.scores?.map((eventScore) => {
          // Get all house scores for this event
          const allHouseScores = Object.values(eventScore.scores || {});
          const thisHouseScore = eventScore.scores[houseKey] || 0;
          const maxScore = Math.max(...allHouseScores, 0);

          // Calculate position/rank in this event
          const sortedScores = [...allHouseScores].sort((a, b) => b - a);
          const position = sortedScores.indexOf(thisHouseScore) + 1;

          // Count houses that scored in this event
          const housesWithScores = Object.values(
            eventScore.scores || {}
          ).filter((score) => score > 0).length;

          return {
            name: eventScore.event,
            score: thisHouseScore,
            maxScore,
            position,
            isHighest: thisHouseScore > 0 && thisHouseScore === maxScore,
            totalHouses: Object.keys(eventScore.scores || {}).length,
            scoringHouses: housesWithScores,
            scorePercentage:
              maxScore > 0 ? (thisHouseScore / maxScore) * 100 : 0,
          };
        }) || [];

      // Separate events into scored and participated categories and sort them
      const scoredEvents = processedEvents
        .filter((event) => event.score > 0)
        .sort((a, b) => b.score - a.score);

      const participatedEvents = processedEvents
        .filter((event) => event.score === 0)
        .sort((a, b) => a.name.localeCompare(b.name));

      setHouseData({
        ...houseInfo,
        totalScore: score.totalScores?.[houseInfo.totalKey] || 0,
        scoredEvents,
        participatedEvents,
        allEvents: processedEvents,
        ...houseDescriptions[houseId],
      });
    }
  }, [houseId, score]);

  useEffect(() => {
    const topBar = document.head.querySelector('meta[name="theme-color"]');
    topBar.setAttribute("content", houseColor || "#0e1111");

    const changeColorOnScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll < 10) {
        topBar.setAttribute("content", houseColor || "#0e1111");
      } else {
        topBar.setAttribute("content", "#0e1111");
      }
    };

    window.addEventListener("scroll", changeColorOnScroll);
    return () => {
      window.removeEventListener("scroll", changeColorOnScroll);
      topBar.setAttribute("content", "#000000");
    };
  }, [houseColor]);

  useEffect(() => {
    const favLink = document.querySelector('link[rel="icon"]');
    favLink.href = "/favicon.ico";
  }, []);

  const houseRankings = useMemo(() => {
    const houseNameTotal =
      houseId === "atreides"
        ? "totalAtredies"
        : `total${houseId.charAt(0).toUpperCase()}${houseId.slice(1)}`;
    const rank =
      Object.entries(score?.totalScores || {})
        .sort((a, b) => b[1] - a[1])
        .findIndex(([key, value]) => key === houseNameTotal) + 1;
    return rank;
  }, [score]);

  // Animate event items when they come into view
  useEffect(() => {
    if (houseData) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(styles.visible);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      const eventItems = document.querySelectorAll(`.${styles.eventItem}`);
      eventItems.forEach((item) => observer.observe(item));

      return () => {
        eventItems.forEach((item) => observer.unobserve(item));
        observer.disconnect();
      };
    }
  }, [houseData]);

  if (!houseData) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading house details...</p>
      </div>
    );
  }

  return (
    <div className={styles.houseDetails}>
      <div className={styles.backgroundElements} ref={hieroglyphsRef}></div>
      <div className={styles.particles} ref={particlesRef}></div>
      <div className={styles.starsPattern}></div>
      <div className={styles.gridPattern}></div>

      <div className={styles.header} ref={headerRef}>
        <div
          className={styles.houseColorAccent}
          style={{ backgroundColor: houseData.color }}
        ></div>
        <Link
          href="/"
          className={styles.backButton}
          onClick={() => {
            const topBar = document.head.querySelector(
              'meta[name="theme-color"]'
            );
            topBar.setAttribute("content", "#000000");
          }}
        >
          <ChevronLeft size={20} />
          <span>Back to Scoreboard</span>
        </Link>

        <div className={styles.houseInfo}>
          <div className={styles.logoContainer}>
            <div
              className={styles.logoGlow}
              style={{ backgroundColor: houseData.color }}
            ></div>
            <img
              src={houseData.logo}
              alt={houseData.name}
              className={styles.houseLogo}
            />
          </div>
          <h1 style={{ color: houseData.color }}>{houseData.name}</h1>
          {/* <div className={styles.houseMotto}>"{houseData.motto || 'Unknown'}"</div> */}
          <div className={styles.houseDescription}>{houseData.description}</div>

          <div
            className={styles.specialtyBadge}
            style={{ borderColor: houseData.color }}
          >
            <Star size={16} color={houseData.color} />
            <span>Specialty: {houseData.specialty}</span>
          </div>
        </div>

        <div className={styles.scoreCard}>
          <div className={styles.scoreLabel}>TOTAL SCORE</div>
          <div className={styles.scoreValueContainer}>
            <ScoreCounter
              value={houseData.totalScore}
              color={houseData.color}
            />
          </div>
          <div className={styles.rankLabel}>
            {houseRankings === 1 ? (
              <Trophy
                size={22}
                style={{
                  filter: `drop-shadow(0 0 5px #cd6c2480)`,
                  color: "var(--spice)",
                }}
              />
            ) : (
              <span
                className={styles.rankValue}
                style={{
                  "--house-color-selected": houseData.color,
                }}
              >
                Ranking: {houseRankings}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.contentContainer} ref={contentRef}>
        <div className={styles.eventsContainer}>
          <h2>
            <Award size={24} className={styles.sectionIcon} />
            Event Performance
          </h2>

          {houseData.scoredEvents && houseData.scoredEvents.length > 0 ? (
            <>
              <div className={styles.eventSectionTitle}>
                <Trophy size={16} />
                <span>Events With Points</span>
              </div>

              <div className={styles.eventsList}>
                {houseData.scoredEvents.map((event, index) => (
                  <div
                    key={`scored-${index}`}
                    className={`${styles.eventItem} ${styles.scoredEvent}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={styles.eventContent}>
                      <div className={styles.eventName}>
                        {event.name}
                        {event.isHighest && (
                          <span
                            className={styles.highestScore}
                            title="Highest score"
                          >
                            <Star size={14} />
                          </span>
                        )}
                      </div>
                      <div className={styles.eventPosition}>
                        {event.position === 1 ? (
                          <div
                            className={styles.positionBadge}
                            title="1st Place"
                          >
                            <Medal size={16} color={houseData.color} />
                          </div>
                        ) : event.position === 2 ? (
                          <div
                            className={styles.positionBadge}
                            title="2nd Place"
                          >
                            2
                          </div>
                        ) : event.position === 3 ? (
                          <div
                            className={styles.positionBadge}
                            title="3rd Place"
                          >
                            3
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className={styles.eventScoreContainer}>
                      {/* <div 
                        className={styles.eventScoreBar} 
                        style={{ 
                          backgroundColor: houseData.color,
                          width: `${event.scorePercentage}%`
                        }}
                      ></div> */}

                      <div className={styles.scoreDetails}>
                        <div className={styles.scoreComparison}>
                          <span
                            className={styles.scoreValue}
                            style={{ color: houseData.color }}
                          >
                            {event.score}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}

          {houseData.participatedEvents &&
          houseData.participatedEvents.length > 0 ? (
            <>
              <div className={styles.eventSectionTitle}>
                <CheckCircle2 size={16} />
                <span>Events Participated</span>
              </div>

              <div className={styles.eventsList}>
                {houseData.participatedEvents.map((event, index) => (
                  <div
                    key={`participated-${index}`}
                    className={`${styles.eventItem} ${styles.participatedEvent}`}
                    style={{
                      animationDelay: `${
                        (houseData.scoredEvents?.length || 0) * 0.1 +
                        index * 0.1
                      }s`,
                    }}
                  >
                    <div className={styles.eventContent}>
                      <div className={styles.eventName}>{event.name}</div>
                      <div className={styles.noScoreBadge}>
                        <AlertCircle size={14} />
                        <span>No points</span>
                      </div>
                    </div>

                    <div className={styles.emptyScoreBar}>
                      <div className={styles.scoreDetails}>
                        <div className={styles.scoreComparison}>
                          <span
                            className={styles.scoreValue}
                            style={{ color: "var(--text-secondary)" }}
                          >
                            0
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}

          {(!houseData.scoredEvents || houseData.scoredEvents.length === 0) &&
            (!houseData.participatedEvents ||
              houseData.participatedEvents.length === 0) && (
              <div className={styles.noEvents}>
                <AlertCircle size={40} opacity={0.6} />
                <p>No events recorded for this house yet.</p>
              </div>
            )}
        </div>

        <div className={styles.houseStats}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>
              {houseData.allEvents?.length || 0}
            </div>
            <div className={styles.statLabel}>Events Total</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>
              {houseData.scoredEvents?.length || 0}
            </div>
            <div className={styles.statLabel}>Events Scored</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>
              {houseData.scoredEvents?.filter((event) => event.isHighest)
                ?.length || 0}
            </div>
            <div className={styles.statLabel}>Top Scores</div>
          </div>
        </div>
      </div>
      <Footer isNotMain={true} />
    </div>
  );
};

export default HouseDetails;
