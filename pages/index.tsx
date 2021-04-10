import React from "react";
import Link from "next/link";
import { useAuth } from "../utils/use-auth";
import LoggedInHomePage from "../components/homePage/LoggedInHomePage";
import HomePageHeader from "../components/homePage/Header";
import HomePageClassSec from "../components/homePage/ClassSec";
import HomePageHelpSec from "../components/homePage/HelpSec";
import Center from "../components/utils/CenterWholePage";
// import styles from "../styles/homePage/imagebackground.module.css";
// import Image from "next/Image";


export default function Home() {
  const auth = useAuth();
  return (
    <div>
      <div className="globalContainer">
        {!auth.user && 
          <div>
          <HomePageHeader />
          <HomePageClassSec />
          <HomePageHelpSec />
          </div>}
        {auth.user && (
          <div>
            <Link href="/ask">
              <button>ask question</button>
            </Link>
            <LoggedInHomePage />
          </div>
        )}
      </div>
    </div>
  );
}
