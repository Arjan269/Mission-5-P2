// src/components/HeroSection.jsx
import styles from "./HeroSection.module.css";
import HeroImage from "../assets/Hero section.png";

export default function HeroSection() {
  return (
    <section className={styles.heroWrapper}>
      <img
        src={HeroImage}
        alt="Welcome to our station filter"
        className={styles.heroImage}
      />
    </section>
  );
}
