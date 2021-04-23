import React, { useEffect, useState } from "react";
import QuestionMakerEditor from "../components/ask/QuestionMakerEditor";
import RulesAndStuff from "../components/ask/RulesAndStuff";
import styles from "../styles/ask/ask.module.css";
import { useAuth } from "../utils/use-auth";
import { useRouter } from "next/router";
import debounce from "debounce";
import Head from "next/head";

export default function Ask() {
  const auth = useAuth();
  const router = useRouter();
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

  if (!auth.user) {
    if (auth.user == false) {
      router.push("/signup");
    }
    return <div className="globalContainer">loading...</div>;
  }

  return (
    <div style={{ height: "800px" }}>
      <Head>
        <title>Ask a Question on merdev</title>
        <meta name="description" content="Ask a question on merdev" />
        <meta property="og:title" content="Ask a Question on merdev" />
        <meta property="og:description" content="Ask a Question on merdev" />
        <meta property="og:site_name" content="merdev" />
        <meta name="twitter:title" content="Ask a question on merdev" />
      </Head>
      <div className="globalContainer">
        <div className={styles.askContainer}>
          <QuestionMakerEditor />
          {width > 780 && <RulesAndStuff />}
        </div>
      </div>
    </div>
  );
}
