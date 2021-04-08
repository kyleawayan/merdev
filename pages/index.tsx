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
        {!auth.user && <div><HomePageDesign></HomePageDesign></div>}
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
