import React from "react";
import styles from "../../styles/footer/Footer.module.css";
import Logo from "../menu/Logo";
import useDarkMode from "use-dark-mode";
import Link from "next/link";

export default function Footer() {
  const darkMode = useDarkMode();

  return (
    <div className={styles.footerParent}>
      <div className={styles.container}>
        <div className={styles.footerChild}>
          <Logo />
          <div className={styles.version}>v0.3.1</div>
        </div>
        <div className={styles.footerChild}>
          <div className={styles.menuButtons}>
            <a
              href="https://github.com/kyleawayan/merdev/issues/new/choose"
              target="_blank"
            >
              <div className={styles.notMenuButton}>Report an issue</div>
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
