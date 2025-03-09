import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sun, Moon, ArrowUp, Star } from 'lucide-react';
import styles from './Footer.module.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const quoteRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(
      quoteRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    gsap.fromTo(
      `.${styles.socialIcon}`,
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: `.${styles.socialLinks}`,
          start: "top bottom-=50",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    gsap.to(`.${styles.quoteSection}`, {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true
      }
    });
    
    gsap.to(`.${styles.footerColumns}`, {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <footer className={styles.footer} ref={footerRef}>
      <div className={styles.footerContent}>
        <div className={styles.quoteSection} ref={quoteRef}>
          <p className={styles.quote}>
            "The mystery of life isn't a problem to solve, but a reality to experience."
          </p>
          <p className={styles.quoteAuthor}>— Dune, Frank Herbert</p>
        </div>
        
        <div className={styles.footerColumns}>
          <div className={styles.footerColumn}>
            <h4>UTSAV Festival</h4>
            <p>A celebration of art across the dunes of imagination, where creativity flows like spice.</p>
          </div>
          
          <div className={styles.footerColumn}>
            <h4>Festival Dates</h4>
            <p>March 21 2025</p>
            <p>Arrakeen Grand Arena</p>
          </div>
          
          <div className={styles.footerColumn}>
            <h4>Contact</h4>
            <p>info@utsavfestival.com</p>
            <p>+1 (555) ARRAKIS</p>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <div className={styles.footerLogo}>
            <img 
            src="/favicon.svg" alt="UTSAV Logo" 
            className={styles.footerLogoImage}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            loading='lazy'
             />
          </div>
          
          <div className={styles.socialLinks}>
            <div className={styles.socialIcon}><Sun size={20} /></div>
            <div className={styles.socialIcon}><Moon size={20} /></div>
            <div className={styles.socialIcon}><ArrowUp size={20} /></div>
            <div className={styles.socialIcon}><Star size={20} /></div>
          </div>
          
          <div className={styles.copyright}>
            <p>© 2025 UTSAV Arts Festival. All rights reserved.</p>
            <p className={styles.credit}>
              The spice must flow.
            </p>
            <p className={styles.credit}>
              Made With ❤️ by S4 E
            </p>
          </div>
        </div>
      </div>
      
      <div className={styles.sandFooter}></div>
    </footer>
  );
};

export default Footer;
