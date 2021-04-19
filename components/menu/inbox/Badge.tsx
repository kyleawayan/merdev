import React from "react";
import styles from "../../../styles/menu/inbox/Badge.module.css";

interface BadgeProps {
  count: number;
}

export default function Badge({ count }: BadgeProps) {
  return <div className={styles.badge}>{count}</div>;
}
