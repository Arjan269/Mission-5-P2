import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";

import HeroImagePriceComp from "../../assets/Hero section PriceComp.png";
import HeroImageLanding from "../../assets/Hero section Landing.png";

export default function HeroSection() {
  const location = useLocation();
  const [useSrc, setUseSrc] = useState(null);

  useEffect(() => {
    if (location.pathname === "/") {
      setUseSrc(HeroImageLanding);
    } else if (location.pathname === "/price-comp") {
      setUseSrc(HeroImagePriceComp);
    } else {
      setUseSrc(null);
    }
  }, [location.pathname]);

  if (!useSrc) return null;

  return (
    <section className={styles.heroWrapper}>
      <img src={useSrc} alt="Hero banner" className={styles.heroImage} />
    </section>
  );
}
