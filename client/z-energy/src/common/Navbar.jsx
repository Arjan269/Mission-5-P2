// src/common/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

import ZLogo from "../assets/z-energy-logo.png"; 
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.wrapper}>
      {/* COLLAPSED HEADER */}
      {!menuOpen && (
        <div className={styles.headerBar}>
          <div className={styles.left}>
            <Link to="/" className={styles.logoLink}>
              <img src={ZLogo} alt="Z Energy" className={styles.logo} />
            </Link>
          </div>

          <div className={styles.right}>
            <button className={styles.iconButton}>🌐</button>
            <button className={styles.iconButton}>🔍</button>

            <div className={styles.dividerVertical}></div>

            <button
              className={styles.iconButton}
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>
      )}

      {/* EXPANDED MENU */}
      {menuOpen && (
        <nav className={styles.menuBar}>
          {/* LOGO */}
          <div className={styles.menuLogoArea}>
            <Link to="/" className={styles.logoLink}>
              <img src={ZLogo} alt="Z Energy" className={styles.menuLogo} />
            </Link>
          </div>

          {/* LEFT SECTION */}
          <div className={styles.menuLeft}>
            {/* At the station */}
            <button className={styles.menuItemWithArrow}>
              At the station <span className={styles.arrow}>▾</span>
            </button>

            {/* Compare stations */}
            <Link
              to="/price-comp"
              className={styles.menuItemLink}
              onClick={() => setMenuOpen(false)}
            >
              Compare stations <span className={styles.arrow}>▾</span>
            </Link>

            {/* Z App → official website */}
            <a
              href="https://www.z.co.nz/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.menuItemLink}
            >
              Z App <span className={styles.arrow}>▾</span>
            </a>

            {/* Locations */}
            <Link
              to="/locations"
              className={styles.menuItemLink}
              onClick={() => setMenuOpen(false)}
            >
              Locations
            </Link>
          </div>

          {/* RIGHT SECTION */}
          <div className={styles.menuRight}>
            <span className={styles.divider}></span>

            <button className={styles.linkButton}>About Z</button>
            <button className={styles.linkButton}>Help And Support</button>

            <button className={styles.loginButton}>
              Login <span className={styles.loginArrow}>➜</span>
            </button>

            <button
              className={styles.closeButton}
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
