import { Formik } from "formik";
import React, { useState } from "react";
import Center from "../components/utils/CenterWholePage";
import styles from "../styles/signup/signUpAndSignIn.module.css";
import { useAuth } from "../utils/use-auth";
import { useRouter } from "next/router";

export default function SignUp() {
  const auth = useAuth();
  const router = useRouter();
  const [emailInUse, setEmailInUse] = useState(false);

  return (
    <div style={{ backgroundColor: "lightgrey" }}>
      <Center>
        <div className={styles.signUpContainer}>
          <h1>Join the [community name] community</h1>
          <Formik
            initialValues={{ displayName: "", email: "", password: "" }}
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
              if (values.password.length <= 6) {
                errors.password = "(Needs to be at least 6 characters)";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setEmailInUse(false);
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
                      console.log(error);
                    }
                  }
                );
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
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </div>
      </Center>
    </div>
  );
}
