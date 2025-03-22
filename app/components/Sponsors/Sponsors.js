import React from "react";
import styles from "./Sponsors.module.css";

const Sponsors = () => {
  return (
    <section id="sponsors" className={styles.sponsors}>
      <div className={styles.gridOverlay}></div>
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.titlePrefix}>OUR</span>
          <span className={styles.titleMain}>SPONSORS</span>
        </h2>

        <div className={styles.sponsorDescription}>
          Thank you to our generous sponsors who make this event possible
        </div>

        <div className={styles.sponsorsContainer}>
          <div className={styles.sponsorItem}>
            <div className={styles.sponsorImageWrapper}>
              <img
                src="/sponsor/msl.svg"
                alt="Mahalekshmi Silks"
                className={styles.sponsorLogo}
                loading="lazy"
              />
            </div>
            <div className={styles.sponsorInfo}>
              <div className={styles.sponsorName}>Mahalekshmi Silks</div>
              <div className={styles.sponsorType}>Official Partner</div>
            </div>
          </div>
          {/* future */}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
