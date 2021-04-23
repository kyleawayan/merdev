import React from "react";
import { useAuth } from "../utils/use-auth";
import LoggedInHomePage from "../components/homePage/LoggedInHomePage";
import HomePageHeader from "../components/homePage/Header";
import HomePageClassSec from "../components/homePage/ClassSec";
import HomePageHelpSec from "../components/homePage/HelpSec";
import Head from "next/head";

export default function Home() {
  const auth = useAuth();
  return (
    <div>
      <Head>
        <title>merdev</title>
        <meta
          name="description"
          content="One stop hub for all your coding troubles and needs. Exclusive to UC Merced computer science students, developed by UC Merced computer science students."
        />
        <meta property="og:title" content="merdev" />
        <meta
          property="og:description"
          content="One stop hub for all your coding troubles and needs. Exclusive to UC Merced computer science students, developed by UC Merced computer science students."
        />
        <meta property="og:site_name" content="merdev" />
        <meta name="twitter:title" content="merdev" />
      </Head>
      <div className="globalContainer" style={{ overflow: "hidden" }}>
        {!auth.user && (
          <div>
            <HomePageHeader />
            <HomePageClassSec />
            <HomePageHelpSec />
          </div>
        )}
        {auth.user && (
          <div>
            <LoggedInHomePage />
          </div>
        )}
      </div>
    </div>
  );
}
