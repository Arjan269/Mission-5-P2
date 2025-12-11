import HeroSection from "../../components/HeroSection/HeroSection";
import landingBottomHalf from "../../assets/landingBottomHalf.png";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.mainDiv}>
      {/* Hero banner */}

      <HeroSection />

      {/* Temporary placeholder below */}
      <img
        src={landingBottomHalf}
        alt="Illustration of landing section"
        className={styles.bottomHalf}
      />
    </div>
  );
}
