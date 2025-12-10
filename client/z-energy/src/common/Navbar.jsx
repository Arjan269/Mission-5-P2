// src/common/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

import ZLogo from "../assets/z-energy-logo.png";
import LanguageIcon from "../assets/Language.png";
import SearchIcon from "../assets/Search.svg";
import ArrowIcon from "../assets/arrow.png"; // ← CUSTOM ARROW
import FlagIcon from "../assets/flag.png";  // ← MOBILE-ONLY FLAG

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.wrapper}>
      {/* Always-visible header */}
      <div className={styles.headerBar}>
        <button type="button" className={styles.logoButton} onClick={closeMenu}>
          <Link to="/" className={styles.logoLink}>
            <img src={ZLogo} alt="Z Energy" className={styles.logo} />
          </Link>
        </button>

        <div className={styles.rightIcons}>

          <button type="button" className={styles.iconButton}>
            <img src={LanguageIcon} alt="Language" className={styles.iconImage} />
          </button>

          <button type="button" className={styles.iconButton}>
            <img src={SearchIcon} alt="Search" className={styles.iconImage} />
          </button>

          {/* BURGER */}
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setMenuOpen(o => !o)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* POPUP MENU */}
      {menuOpen && (
        <nav className={styles.menuBar}>
          <div className={styles.menuLeft}>

            {/* DESKTOP: ▼  MOBILE: ► */}
            <button type="button" className={styles.menuItemWithArrow}>
              At the station
              <img src={ArrowIcon} className={styles.arrowDown} alt="" />
            </button>

            <Link to="/price-comp" className={styles.menuItemWithArrow} onClick={closeMenu}>
              Compare stations
              <img src={ArrowIcon} className={styles.arrowDown} alt="" />
            </Link>

            <a
              href="https://www.z.co.nz/"
              target="_blank"
              rel="noreferrer"
              className={styles.menuItemWithArrow}
              onClick={closeMenu}
            >
              Z App
              <img src={ArrowIcon} className={styles.arrowDown} alt="" />
            </a>

            <Link to="/locations" className={styles.menuLink} onClick={closeMenu}>
              Locations
            </Link>
          </div>

          <div className={styles.menuRight}>
            <span className={styles.divider}></span>

            <button type="button" className={styles.linkButton}>
              About Z
            </button>

            <button type="button" className={styles.linkButton}>
              Help And Support
              <img src={FlagIcon} alt="" className={styles.flagMobile} />
            </button>

            <button type="button" className={styles.loginButton}>
              Login <span className={styles.loginArrow}>➜</span>
            </button>

            <button type="button" className={styles.closeButton} onClick={closeMenu}>
              ✕
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
