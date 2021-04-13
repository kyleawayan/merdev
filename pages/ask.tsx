import React from "react";
import QuestionMakerEditor from "../components/ask/QuestionMakerEditor";
import RulesAndStuff from "../components/ask/RulesAndStuff";
import styles from "../styles/ask/ask.module.css";
import { useAuth } from "../utils/use-auth";
import { useRouter } from "next/router";

export default function Ask() {
  const auth = useAuth();
  const router = useRouter();

  if (!auth.user) {
    if (auth.user == false) {
      router.push("/signup");
    }
    return <div className="globalContainer">loading...</div>;
  }

  return (
    <div style={{ height: "800px" }}>
      <div className="globalContainer">
        <div className={styles.askContainer}>
          <QuestionMakerEditor />
          <RulesAndStuff />
        </div>
      </div>
    </div>
  );
}
