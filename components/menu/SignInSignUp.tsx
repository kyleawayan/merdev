import React from "react";
import styles from "../../styles/menu/SignInSignUp.module.css";
import Link from "next/link";

export default function SignInSignUp() {
  return (
    <div>
      <div className={styles.signIn}>
          <Link href="/login">
          <button className={styles.btn}>Log in</button>
          </Link>
        </div>
          <div className={styles.signUp}>
          <Link href="/signup">
            <button className={styles.btn}>Sign Up</button>
          </Link>
        </div>
    </div>
  );
}
