import React from "react";
import styles from "../../styles/menu/Menu.module.css";
import Logo from "./Logo";
import Pfp from "./Pfp";
import SearchBar from "./SearchBar";
import SignInSignUp from "./SignInSignUp";
import { useAuth } from "../../utils/use-auth";

export default function Menu() {
  const auth = useAuth();

  return (
    <div className={styles.menuContainerContainer}>
      <div className={styles.menu}>
        <Logo />
        <SearchBar />
        {/* <Pfp name="Kyle" imageUrl="https://kyleawayan.com/profile.jpg" /> */}
        {!auth.user && <SignInSignUp />}
        {/* temporary display name show */}
        {auth.user && (
          <div style={{ position: "absolute", right: 0 }}>
            {auth.user.displayName}
            <button onClick={auth.signout}>sign out</button>
          </div>
        )}
      </div>
    </div>
  );
}
