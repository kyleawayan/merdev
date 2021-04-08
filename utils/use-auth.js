// https://usehooks.com/useAuth/

import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

// Add your Firebase credentials
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAyKoCawOT6HyIb0EOWcfGomm2eWt1dSO4",
    authDomain: "merdev-7b539.firebaseapp.com",
    projectId: "merdev-7b539",
    appId: "1:593369002159:web:a4b2bc1869eb6d0959645a",
  });
}

if (process.env.NEXT_PUBLIC_FIREDEV == "true") {
  // ---EMULATOR MODE! MAKE SURE TO TURN THESE OFF IN PRODUCTION---
  firebase.firestore().useEmulator("localhost", 8080); // dev
  firebase.functions().useEmulator("localhost", 5001); // dev
  firebase.auth().useEmulator("http://localhost:9099/"); // dev
  // -------------------------------------------------------------
}

const authContext = createContext();
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };
  const signup = (email, password, displayName) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        firebase.auth().currentUser.updateProfile({
          displayName: displayName,
        });
        setUser(response.user);
        return response.user;
      });
  };
  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };
  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };
  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };
  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
