import { Formik } from "formik";
import React, { useState } from "react";
import Center from "../components/utils/CenterWholePage";
import styles from "../styles/signup/signUpAndSignIn.module.css";
import { useAuth } from "../utils/use-auth";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/firestore";
import Head from "next/head";

const db = firebase.firestore();

export default function SignUp() {
  const auth = useAuth();
  const router = useRouter();
  const [emailInUse, setEmailInUse] = useState(false);
  const [displayNameInUse, setDisplayNameInUse] = useState(false);

  return (
    <div style={{ backgroundColor: "var(--secondary-bg)" }}>
      <Head>
        <title>Sign Up - merdev</title>
        <meta name="description" content="Create a merdev account" />
        <meta property="og:title" content="Create a merdev account" />
        <meta property="og:description" content="Create a merdev account" />
        <meta property="og:site_name" content="merdev" />
        <meta name="twitter:title" content="Sign Up - merdev" />
      </Head>
      <Center>
        <div className={styles.signUpContainer}>
          <h1>Join the UC Merced CSE community</h1>
          <Formik
            initialValues={{
              displayName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validate={(values) => {
              const errors: Record<string, string> = {};
              if (!values.email) {
                errors.email = "(Required email)";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "(Invalid email address)";
              }
              if (!values.displayName) {
                errors.displayName = "(Please put in a display name)";
              }
              if (!values.password) {
                errors.password = "(Please put in a passowrd)";
              }
              if (values.password.length < 6) {
                errors.password = "(Needs to be at least 6 characters)";
              }
              if (values.confirmPassword != values.password) {
                errors.confirmPassword = "(Does not match)";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setEmailInUse(false);
              setDisplayNameInUse(false);
              const displayNameDoc = await db
                .collection("displayNames")
                .doc(values.displayName)
                .get();
              if (!displayNameDoc.exists) {
                auth
                  .signup(values.email, values.password, values.displayName)
                  .then(() => {
                    setSubmitting(false);
                    router.push("/");
                  })
                  .catch(
                    (error: {
                      a: unknown;
                      code: string;
                      message: string;
                      stack: string;
                    }) => {
                      setSubmitting(false);
                      if ((error.code = "auth/email-already-in-use")) {
                        setEmailInUse(true);
                      } else {
                        console.error(error);
                      }
                    }
                  );
              } else {
                setSubmitting(false);
                setDisplayNameInUse(true);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                {emailInUse && (
                  <div className={styles.warning}>
                    The email address is already in use by another account.
                  </div>
                )}
                {displayNameInUse && (
                  <div className={styles.warning}>
                    The display name is already in use by another account.
                  </div>
                )}
                <div>
                  <label>
                    Display name
                    <span className={styles.warning}>
                      {" "}
                      {errors.displayName &&
                        touched.displayName &&
                        errors.displayName}
                    </span>
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.displayName}
                  />
                </div>
                <div>
                  <label>
                    Email{" "}
                    <span className={styles.warning}>
                      {" "}
                      {errors.email && touched.email && errors.email}
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </div>
                <div>
                  <label>
                    Password{" "}
                    <span className={styles.warning}>
                      {" "}
                      {errors.password && touched.password && errors.password}
                    </span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </div>
                <div>
                  <label>
                    Confirm password{" "}
                    <span className={styles.warning}>
                      {" "}
                      {errors.confirmPassword &&
                        touched.confirmPassword &&
                        errors.confirmPassword}
                    </span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                </div>
                <button type="submit" disabled={isSubmitting}>
                  {!isSubmitting ? "Submit" : "Loading..."}
                </button>
              </form>
            )}
          </Formik>
        </div>
      </Center>
    </div>
  );
}
