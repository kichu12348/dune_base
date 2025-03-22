"use client";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const topBar = document.head.querySelector('meta[name="theme-color"]');

    const handleScroll = () => {
      const isScrolled = window.scrollY > window.innerHeight-80;
      
      if (isScrolled !== scrolled) {
        // topBar.content = isScrolled ? "#0e1111" : "#00000";
        topBar.setAttribute('content', isScrolled ? '#0e1111' : '#000000');
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) setIsMobile(true);
      else setIsMobile(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo} onClick={() => scrollToSection("hero")}>
        <img src="/favicon.svg" alt="UTSAV Logo" className={styles.logoImage} />
      </div>

      {/* Desktop Navigation */}
      <ul className={styles.navLinks}>
        <li onClick={() => scrollToSection("hero")}>Home</li>
        <li onClick={() => scrollToSection("houses")}>Houses</li>
        {/* <li onClick={() => scrollToSection("events")}>Events</li> */}
        <li onClick={() => scrollToSection("scoreboard")}>Scoreboard</li>
      </ul>

      {/* Hamburger Menu Button */}
      <div
        className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <div className={`${styles.mobileNav} ${menuOpen ? styles.open : ""}`}>
          <div className={styles.mobileNavContent}>
            <ul className={styles.mobileNavLinks}>
              <li onClick={() => scrollToSection("hero")}>Home</li>
              <li onClick={() => scrollToSection("houses")}>Houses</li>
              {/* <li onClick={() => scrollToSection("events")}>Events</li> */}
              <li onClick={() => scrollToSection("scoreboard")}>Scoreboard</li>
            </ul>
            <div className={styles.mobileNavFooter}>
              <div className={styles.grainOverlay}></div>
              <p>© 2025 UTSAV Festival</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
