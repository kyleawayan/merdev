import { Formik } from "formik";
import React, { useState } from "react";
import Center from "../components/utils/CenterWholePage";
import styles from "../styles/signup/signUpAndSignIn.module.css";
import { useAuth } from "../utils/use-auth";
import { useRouter } from "next/router";
import Head from "next/head";

export default function SignUp() {
  const auth = useAuth();
  const router = useRouter();
  const [failed, setFailed] = useState(false);

  return (
    <div style={{ backgroundColor: "var(--secondary-bg)" }}>
      <Head>
        <title>Log In - merdev</title>
        <meta name="description" content="Log in to merdev" />
        <meta property="og:title" content="Log in to merdev" />
        <meta property="og:description" content="Log in to merdev" />
        <meta property="og:site_name" content="merdev" />
        <meta name="twitter:title" content="Log In - merdev" />
      </Head>
      <Center>
        <div className={styles.signUpContainer}>
          <h1>Sign in to the UC Merced CSE community</h1>
          <Formik
            initialValues={{ displayName: "", email: "", password: "" }}
            validate={(values) => {
              const errors: Record<string, string> = {};
              if (!values.email) {
                errors.email = "(Please put in an email)";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "(Invalid email address)";
              }
              if (!values.password) {
                errors.password = "(Please put in a passowrd)";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setFailed(false);
              auth
                .signin(values.email, values.password)
                .then(() => {
                  setSubmitting(false);
                  router.push("/");
                })
                .catch(() => {
                  setSubmitting(false);
                  setFailed(true);
                });
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
                {failed && (
                  <div className={styles.warning}>Login was not found.</div>
                )}
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
