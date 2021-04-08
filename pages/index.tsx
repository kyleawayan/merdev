import React from "react";
import styles from "../styles/Landing.module.css";
import Image from 'next/image'
export default function Home() {
  return (
    <div>

      {/* <div className = "container">
        <div className="text">i am text</div>
        <div className = "new">
          <Image src="/aerial2.png" alt="me" layout = "fill" className = "aerial"/>
        </div>
      </div> */}

      <div className = {styles.Landing}>
        <Image src="/aerial2.png" alt="me" layout = "fill"/>
        <div className = {styles.text}>test text</div>
      </div>

    </div>
  );
}


