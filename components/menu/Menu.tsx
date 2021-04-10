import React from "react";
import styles from "../../styles/menu/Menu.module.css";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import SignInSignUp from "./SignInSignUp";
import { useAuth } from "../../utils/use-auth";
import Link from "next/link";

export default function Menu() {
  const auth = useAuth();

  return (
    <div className={styles.menuContainerContainer}>
      <div className={styles.menu}>
        <Link href="/">
          <a><Logo /></a> 
        </Link>
        <SearchBar />
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
