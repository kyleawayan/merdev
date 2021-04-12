import React from "react";
import styles from "../../../styles/menu/SearchBar.module.css";

export default function SearchBar() {
  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        name="search"
        placeholder="i am non working search bar"
      />
    </div>
  );
}
