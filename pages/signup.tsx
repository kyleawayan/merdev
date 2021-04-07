import { Formik } from "formik";
import React from "react";
import Center from "../components/utils/CenterWholePage";
import styles from "../styles/signup/signup.module.css";
import { useAuth } from "../utils/use-auth";
import { useRouter } from "next/router";

export default function SignUp() {
  const auth = useAuth();
  const router = useRouter();

  return (
    <div style={{ backgroundColor: "lightgrey" }}>
      <Center>
        <div className={styles.signUpContainer}>
          <h1>Join the [community name] community</h1>
          <Formik
            initialValues={{ displayName: "", email: "", password: "" }}
            // validate={(values) => {  // form validation stuff i'll add later
            //   const errors = {};
            //   if (!values.email) {
            //     errors.email = "Required email";
            //   } else if (
            //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            //   ) {
            //     errors.email = "Invalid email address";
            //   }
            //   if (!values.displayName) {
            //     errors.displayName = "required display name";
            //   }
            //   if (!values.password) {
            //     errors.password = "no password"; // 6 characters
            //   }
            //   return errors;
            // }}
            onSubmit={(values, { setSubmitting }) => {
              auth
                .signup(values.email, values.password, values.displayName)
                .then(() => {
                  setSubmitting(false);
                  router.push("/");
                })
                .catch(() => {
                  setSubmitting(false);
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
                <div>
                  <label>Display name</label>
                  <input
                    type="text"
                    name="displayName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.displayName}
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </div>
                <div>
                  {errors.email && touched.email && errors.email}
                  <label>Password needs to be 6 characters at least</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </div>

                {errors.password && touched.password && errors.password}
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
