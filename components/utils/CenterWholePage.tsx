import React from "react";
import styles from "../../styles/utils/CenterWholePage.module.css";

interface CenterProps {
  children: React.ReactChild;
}

export default function Center({ children }: CenterProps) {
  return <div className={styles.center}>{children}</div>;
}
