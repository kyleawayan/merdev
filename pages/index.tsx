import React from "react";
import Link from "next/link";
import { useAuth } from "../utils/use-auth";
import LoggedInHomePage from "../components/homePage/LoggedInHomePage";

export default function Home() {
  const auth = useAuth();

  return (
    <div>
      <div className="globalContainer">
        {!auth.user && <div>i am home page when not logged in</div>}
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
