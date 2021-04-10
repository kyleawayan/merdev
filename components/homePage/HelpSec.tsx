import React from "react";
import styles from "../../styles/homePage/Home.module.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function HomePageHelpSec() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
      <div className={styles.sectioncontainer}>
        <hr className={styles.homehr}></hr>
        <b>
          <h1>Get general programming help</h1>
        </b>
        <p className={styles.homeparainverted}>
          Since Merdev acts as a forum, it is not limited to only class topics
          and projects. Merdev is a community built to help each other, <br />{" "}
          so feel free to ask any questions you might have with general
          programming!
        </p>
        <div className={styles.inlineplacement}>
          <div className={styles.column}>
            <img
              className={styles.codinglanguages}
              src={"codinglanguages.jpg"}
            />
          </div>
          <div 
          className={styles.column}>
            <b>
              <h1 className={styles.columnp} data-aos="fade-left">
                Work in a community with experience and knowledge!
              </h1>
            </b>
          </div>
        </div>
      </div>
  );
}
