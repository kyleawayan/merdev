import React from "react";
import styles from "../../styles/footer/Footer.module.css";
import Logo from "../menu/Logo";

export default function Footer() {
  return (
    <div className={styles.footerParent}>
      <div className={styles.container}>
        <div className={styles.footerChild}>
          <Logo />
          <div className={styles.version}>v0.4.01</div>
        </div>
        <div className={styles.footerChild}>
          <div className={styles.menuButtons}>
            <a
              href="https://github.com/kyleawayan/merdev/issues"
              target="_blank"
            >
              <div className={styles.notMenuButton}>Report Issues/Feedback</div>
            </a>
            <a href="https://github.com/kyleawayan/merdev" target="_blank">
              <div className={styles.notMenuButton}>GitHub</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
