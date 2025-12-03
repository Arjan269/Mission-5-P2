import styles from "./priceCompStyles.module.css";

export default function CompareGrid({ leftDropdown, rightDropdown, leftCard, rightCard }) {
  return (
    <div className={styles.grid}>
      <div className={styles.column}>
        {leftDropdown}
        {leftCard}
      </div>

      <div className={styles.column}>
        {rightDropdown}
        {rightCard}
      </div>
    </div>
  );
}
