import React from "react";
import Link from "next/link";
import { useAuth } from "../utils/use-auth";
import LoggedInHomePage from "../components/homePage/LoggedInHomePage";
import HomePageDesign from "../components/homePage/HomePageDesign";

export default function Home() {
  const auth = useAuth();

  return (
    <div>
      <div className="globalContainer">
        {!auth.user && (
          <div>
            <HomePageDesign />
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
