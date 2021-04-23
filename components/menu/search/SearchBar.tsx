import React from "react";
import styles from "../../../styles/menu/SearchBar.module.css";

export default function SearchBar() {
  return (
    <div className={styles.searchBarContainer}>
      <input type="text" name="search" placeholder="Search (not working yet)" />
    </div>
  );
}
