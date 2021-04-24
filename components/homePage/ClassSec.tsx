import React from "react";
import styles from "../../styles/homePage/Home.module.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function HomePageClassSec() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div>
      <div className={styles.sectioncontainer}>
        <hr className={styles.homehr}></hr>
        <b>
          <h1>Immense Class Support</h1>
        </b>
        <p className={styles.homeparainverted}>
          merdev is designed to help UC Merced computer science students
          regardless of the course they are taking. <br /> We provide class
          support but not limited to:{" "}
        </p>
        <div className={styles.column}>
          <div className={styles.inlineplacement}>
            <span className={styles.card} data-aos="fade-right">
              <h4>
                <b>CSE 05:</b>
              </h4>
              <p>Into to Computer Science</p>
            </span>
            <span className={styles.card} data-aos="fade-left">
              <h4>
                <b>CSE 15:</b>
              </h4>
              <p>Discrete Mathematics</p>
            </span>
            <span className={styles.card} data-aos="fade-right">
              <h4>
                <b>CSE 21:</b>
              </h4>
              <p>Introduction to Computing II</p>
            </span>
            <span className={styles.card} data-aos="fade-left">
              <h4>
                <b>CSE 22:</b>
              </h4>
              <p>Introduction to Programming</p>
            </span>
            <span className={styles.card} data-aos="fade-right">
              <h4>
                <b>CSE 24:</b>
              </h4>
              <p>Advanced Programming</p>
            </span>
            <span className={styles.card} data-aos="fade-left">
              <h4>
                <b>CSE 30:</b>
              </h4>
              <p>Data Structures</p>
            </span>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
}
