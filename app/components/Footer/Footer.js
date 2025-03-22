import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import styles from "./Footer.module.css";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    const entryTl = gsap.timeline({
      defaults: {
        ease: "power2.out"
      }
    });
    
    entryTl.fromTo(
      quoteRef.current,
      { 
        opacity: 0, 
        y: 30,
        willChange: "opacity, transform" 
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        clearProps: "willChange" 
      }
    );
    
    ScrollTrigger.create({
      trigger: quoteRef.current,
      start: "top bottom-=100",
      toggleActions: "play none none reverse",
      animation: entryTl
    });
    
    const socialTl = gsap.timeline({
      scrollTrigger: {
        trigger: `.${styles.socialLinks}`,
        start: "top bottom-=50",
        toggleActions: "play none none reverse"
      }
    });
    
   
    socialTl.fromTo(
      `.${styles.socialIcon}`,
      { 
        scale: 0, 
        opacity: 0,
        willChange: "transform, opacity" 
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        clearProps: "willChange"
      }
    );
    
    if (!isMobile) {
      const parallaxElements = [
        {el: `.${styles.quoteSection}`, y: -15},
        {el: `.${styles.footerColumns}`, y: -10}
      ];
      
      const parallaxTl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      });
      parallaxElements.forEach(({el, y}) => {
        parallaxTl.to(el, {
          yPercent: y,
          ease: "none"
        }, 0); 
      });
    }
    
    return () => {
      // Clean up 
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (entryTl) entryTl.kill();
      if (socialTl) socialTl.kill();
    };
  }, []);

  return (
    <footer className={styles.footer} ref={footerRef}>
      <div className={styles.footerContent}>
        <div className={styles.quoteSection} ref={quoteRef}>
          <p className={styles.quote}>
            &quot;The arts flow like the sacred waters of the Nile, bringing life to
            those who drink from its wisdom.&quot;
          </p>
          <p className={styles.quoteAuthor}>— Teachings of the Great Temple</p>
        </div>

        <div className={styles.footerColumns}>
          <div className={styles.footerColumn}>
            <h4>UTSAV Festival</h4>
            <p>
              In a Middle Eastern nation, hidden followers revive the forgotten hero Misaya by hijacking the Elwar Festival. 
              Seizing the moment, Misaya renames it UTSAV, reclaiming his place in history.
            </p>
          </div>

          <div className={styles.footerColumn}>
            <h4>Sacred Dates</h4>
            <p>The 21st Day of the Month of Thoth, 2025</p>
            <p>Great Hall of Amun-Ra</p>
          </div>

          <div className={styles.footerColumn}>
            <h4>Royal Messengers</h4>
            <p>utsavcec25@gmail.com</p>
            <p>Speak to our High Priests: +91 77364 74154</p>
            <p>College of Engineering, Chengannur</p>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.logoContainer}>
            <div className={styles.footerLogo}>
              <img
                src="/favicon.svg"
                alt="UTSAV Sacred Symbol"
                className={styles.footerLogoImage}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                loading="lazy"
              />
            </div>
            <div className={styles.collegeLogo}>
              <img
                src="/images/college.png"
                alt="College of Engineering, Chengannur"
                className={styles.collegeLogoImage}
                loading="lazy"
              />
            </div>
          </div>

          <div className={styles.socialLinks}>
            <div className={styles.socialIcon} title="Facebook">
              <Facebook size={20} />
            </div>
            <div
              className={styles.socialIcon}
              title="Instagram"
              onClick={() =>
                window.open("https://www.instagram.com/utsav25.cec", "_blank")
              }
            >
              <Instagram size={20} />
            </div>
            <div className={styles.socialIcon} title="Twitter">
              <Twitter size={20} />
            </div>
            <div className={styles.socialIcon} title="Youtube">
              <Youtube size={20} />
            </div>
          </div>

          <div className={styles.copyright}>
            <p>
              © 2025 UTSAV Arts Festival. All rights protected by the Eye of
              Horus.
            </p>
            <p className={styles.credit}>College of Engineering, Chengannur</p>
            <p className={styles.credit}>May the Ankh guide your path.</p>
            <p className={styles.credit}>
              Crafted with ❤️ by S4 E
            </p>
          </div>
        </div>
      </div>

      <div className={styles.sandFooter}></div>
    </footer>
  );
};

export default Footer;
