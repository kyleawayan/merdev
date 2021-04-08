import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="globalContainer">
        <Link href="/ask">
          <button>ask question</button>
        </Link>
      </div>
    </div>
  );
}
