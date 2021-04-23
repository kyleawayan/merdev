import React, { useEffect, useState } from "react";
import styles from "../../styles/homePage/LoggedInHomePage.module.css";
import RecentQuestions from "./RecentQuestions";
import debounce from "debounce";
import Link from "next/link";

export default function LoggedInHomePage() {
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
    <div>
      <div className={styles.loggedInHomePage}>
        <div className={styles.recentQuestions}>
          <div className={styles.header}>
            <span>
              <h1>Recent Questions</h1>
            </span>
            <div className={styles.askQuestionContainer}>
              <span className={styles.askQuestion}>
                <Link href="/ask">
                  <a>
                    <button>Ask Question</button>
                  </a>
                </Link>
              </span>
            </div>
          </div>
          <div className={styles.line} />
          <RecentQuestions />
        </div>
        {width > 780 && (
          <div className={styles.sidebar}>
            <div>
              <strong>Welcome to merdev alpha!</strong>
              <p>
                I am a sidebar. I will show useful info like upcoming
                assignments here soon.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
