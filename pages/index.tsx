import React from "react";
import { useAuth } from "../utils/use-auth";
import LoggedInHomePage from "../components/homePage/LoggedInHomePage";
import HomePageHeader from "../components/homePage/Header";
import HomePageClassSec from "../components/homePage/ClassSec";
import HomePageHelpSec from "../components/homePage/HelpSec";

export default function Home() {
  const auth = useAuth();
  return (
    <div>
      <div className="globalContainer">
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
