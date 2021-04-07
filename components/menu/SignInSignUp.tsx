import React from "react";
import styles from "../../styles/menu/SignInSignUp.module.css";
import Link from "next/link";

export default function SignInSignUp() {
  return (
    <div className={styles.signInSignUp}>
      <Link href="/login">
        <button>Log in</button>
      </Link>
      <Link href="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
}
