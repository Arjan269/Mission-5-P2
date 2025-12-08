// src/common/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

import ZLogo from "../assets/z-energy-logo.png";
import LanguageIcon from "../assets/Language.png";
import SearchIcon from "../assets/Search.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.wrapper}>
      {/* Always-visible header bar */}
      <div className={styles.headerBar}>
        <button
          type="button"
          className={styles.logoButton}
          onClick={closeMenu}
        >
          <Link to="/" className={styles.logoLink}>
            <img src={ZLogo} alt="Z Energy" className={styles.logo} />
          </Link>
        </button>

        <div className={styles.rightIcons}>
          {/* Language icon */}
          <button type="button" className={styles.iconButton}>
            <img
              src={LanguageIcon}
              alt="Language"
              className={styles.iconImage}
            />
          </button>

          {/* Search icon */}
          <button type="button" className={styles.iconButton}>
            <img
              src={SearchIcon}
              alt="Search"
              className={styles.iconImage}
            />
          </button>

          {/* Burger / close toggle */}
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Popup nav bubble that drops under header */}
      {menuOpen && (
        <nav className={styles.menuBar} aria-label="Main navigation">
          <div className={styles.menuLeft}>
            <button type="button" className={styles.menuItemWithArrow}>
              At the station <span className={styles.arrow}>▾</span>
            </button>

            <Link
              to="/price-comp"
              className={styles.menuLinkWithArrow}
              onClick={closeMenu}
            >
              Compare stations <span className={styles.arrow}>▾</span>
            </Link>

            <a
              href="https://www.z.co.nz/"
              target="_blank"
              rel="noreferrer"
              className={styles.menuLinkWithArrow}
              onClick={closeMenu}
            >
              Z App <span className={styles.arrow}>▾</span>
            </a>

            <Link
              to="/locations"
              className={styles.menuLink}
              onClick={closeMenu}
            >
              Locations
            </Link>
          </div>

          <div className={styles.menuRight}>
            <span className={styles.divider} />

            <button type="button" className={styles.linkButton}>
              About Z
            </button>

            <button type="button" className={styles.linkButton}>
              Help And Support
            </button>

            <button type="button" className={styles.loginButton}>
              Login <span className={styles.loginArrow}>➜</span>
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
