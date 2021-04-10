import React from "react";
import styles from "../../styles/homePage/Home.module.css";
import Link from "next/link";
import HomeLogo from "../../components/homePage/HomeLogo";
import { motion } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Image from "next/image";

export default function HomePageHeader() {
    useEffect(() => {
      Aos.init({ duration: 1000 });
    }, []);
    return (
      <div>
        <div className = "bg">
        <Image
          src="/se.jpeg"
          alt="me"
          layout="fill"
          objectFit="cover"
          className={styles.background}
        />
        </div>
        <div className={styles.container}>
          <HomeLogo />
          <p className={styles.homepara}>
            One stop hub for all your coding troubles and needs. Exclusive to UC
            Merced computer science students <br /> developed by UC Merced
            computer science students.
          </p>
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={styles.homebtn}
            >
              Sign Up Now
            </motion.button>
          </Link>
          <p className={styles.homeparalogin}>
            Already have an account? Log in <Link href="/login"><u>here!</u></Link>
          </p>
          <img
            data-aos="fade-up"
            className={styles.homeimg}
            src={"uisample.jpg"}
          />
          <br />
        </div>
      </div>
    );
  }
  