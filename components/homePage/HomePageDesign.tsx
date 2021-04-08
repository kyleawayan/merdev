import React from 'react'
import styles from "../../styles/homePage/Home.module.css";
import Link from "next/link";
import HomeLogo from "../../components/homePage/HomeLogo";
import { motion } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function HomePageDesign() {
    useEffect(() => {
        Aos.init({duration: 1000});
    }, []);
    return (
        <div>

            <div className={styles.container}>
                <HomeLogo />
                <p className={styles.homepara}>One stop hub for all your coding troubles and needs. Exclusive to UC Merced computer science students  <br/> developed by UC Merced computer science students.</p>
                <Link href="/signup">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}className={styles.homebtn}>
                    Sign Up Now
                </motion.button>
                </Link>
                <p className={styles.homeplogin}>Already have an account? Log in <Link href="/login">here!</Link></p>
                <img data-aos="fade-up" className={styles.homeimg} src={'uisample.jpg'} />
                <br />
            </div>

            <div className={styles.sectioncontainer}>
                <hr className={styles.homehr}></hr>
                <b><h1>Imense Class Support</h1></b>
                <p className={styles.homepara}>Merdev is designed to help UC Merced computer science students regardless of the course they are taking. <br/> We provide class support but not limited to: </p>
                    <div className={styles.inlineplacement}>
                        <span className={styles.card} data-aos="fade-right">
                        <h4><b>CSE 15:</b></h4>
                            <p>Discrete Mathematics</p>
                        </span>
                        <span className={styles.card} data-aos="fade-up">
                        <h4><b>CSE 22:</b></h4>
                            <p>Introduction to Programming</p>
                        </span>
                        <span className={styles.card} data-aos="fade-left">
                        <h4><b>CSE 24:</b></h4>
                            <p>Advanced Programming</p>
                        </span>
                    </div>
                    <br />
            </div>

            <div className={styles.sectioncontainer}>
            <hr className={styles.homehr}></hr>
            <b><h1>Get general programming help</h1></b>
            <p className={styles.homepara}>Since Merdev acts as a forum, it is not limited to only class topics and projects. Merdev is a community built to help each other, <br /> so feel free to ask any questions you might have with general programming!</p>
                <div className={styles.inlineplacement}>
                    <div className={styles.column}>
                        <img className={styles.codinglanguages} src={'codinglanguages.jpg'} />
                    </div>
                    <div className={styles.column}>
                    <b><h1 className={styles.columnp} data-aos="fade-left">Work in a community with experience and knowledge!</h1></b>
                    </div>
                </div>
            </div>

        </div>
    )
}
