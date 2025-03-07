import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false); // Close menu after navigation
    }
  };

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo} onClick={() => scrollToSection('hero')}>UTSAV</div>
      
      {/* Desktop Navigation */}
      <ul className={styles.navLinks}>
        <li onClick={() => scrollToSection('hero')}>Home</li>
        <li onClick={() => scrollToSection('houses')}>Houses</li>
        <li onClick={() => scrollToSection('events')}>Events</li>
        <li onClick={() => scrollToSection('scoreboard')}>Scoreboard</li>
      </ul>
      
      {/* Hamburger Menu Button */}
      <div 
        className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`} 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`${styles.mobileNav} ${menuOpen ? styles.open : ''}`}>
        <div className={styles.mobileNavContent}>
          <ul className={styles.mobileNavLinks}>
            <li onClick={() => scrollToSection('hero')}>Home</li>
            <li onClick={() => scrollToSection('houses')}>Houses</li>
            <li onClick={() => scrollToSection('events')}>Events</li>
            <li onClick={() => scrollToSection('scoreboard')}>Scoreboard</li>
          </ul>
          <div className={styles.mobileNavFooter}>
            <div className={styles.grainOverlay}></div>
            <p>© 2025 UTSAV Festival</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
