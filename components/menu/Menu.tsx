import React, { useEffect, useState } from "react";
import styles from "../../styles/menu/Menu.module.css";
import Logo from "./Logo";
import SearchBar from "./search/SearchBar";
import SignInSignUp from "./SignInSignUp";
import { useAuth } from "../../utils/use-auth";
import SearchBarMobile from "./search/SearchBarMobile";
import debounce from "debounce";

export default function Menu() {
  const auth = useAuth();
  const [width, setWidth] = useState(999);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const updateSize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", debounce(updateSize, 200));
    return () => {
      window.removeEventListener("resize", debounce(updateSize, 200));
    };
  });

  return (
    <div className={styles.menuContainerContainer}>
      <div className={styles.menu}>
        <Logo />
        {width > 780 && <SearchBar />}
        {width < 780 && (
          <span className={styles.mobileSearch}>
            <SearchBarMobile />
          </span>
        )}
        {!auth.user && <SignInSignUp />}
        {auth.user && (
          <div className={styles.usernameAndSignOut}>
            <span className={styles.username}>{auth.user.displayName}</span>
            <button onClick={auth.signout}>sign out</button>
          </div>
        )}
      </div>
    </div>
  );
}
