import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import styles from "../../styles/profile/Profile.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "../../utils/use-auth";
import Head from "next/head";
import firebase from "firebase/app";
import "firebase/storage";

const storage = firebase.storage();

interface ProfilePageProps {
  displayName: string;
  pfpUrl: string;
}

export default function Profile({ displayName, pfpUrl }: ProfilePageProps) {
  const auth = useAuth();
  const router = useRouter();

  const signOut = () => {
    auth.signout();
    router.push("/");
  };

  return (
    <div className={styles.profile}>
      <Head>
        <title>{displayName}'s profile on merdev</title>
        <meta
          name="description"
          content={`Check out ${displayName}'s profile on merdev`}
        />
        <meta
          property="og:title"
          content={`Check out ${displayName}'s profile on merdev`}
        />
        <meta property="og:image" content={pfpUrl} />
        <meta
          property="og:description"
          content={`Check out ${displayName}'s profile on merdev`}
        />
        <meta property="og:site_name" content="merdev" />
        <meta
          name="twitter:title"
          content={`${displayName}'s profile on merdev`}
        />
      </Head>
      <div className={styles.pfpContainer}>
        {pfpUrl && <Image src={pfpUrl} layout="fill" objectFit="cover" />}
      </div>
      <div className={styles.info}>
        <div className={styles.displayName}>{displayName}</div>
        {auth.user?.uid == router.query.id && (
          <div className={styles.signOut}>
            <button onClick={signOut}>Sign Out</button>
          </div>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let res;

  if (!process.env.NEXT_PUBLIC_FIREDEV) {
    // change region if needed, to do: use a environemnt variable for region
    res = await fetch(
      `https://us-central1-${process.env.NEXT_PUBLIC_PROJECTID}.cloudfunctions.net/userUidToDisplayName?userUid=${context.query.id}`
    );
  } else {
    res = await fetch(
      `http://localhost:5001/${process.env.NEXT_PUBLIC_PROJECTID}/us-central1/userUidToDisplayName?userUid=${context.query.id}`
    );
  }

  const json = await res.json();
  const displayName = json.displayName;
  const pfpUrl = json.pfpUrl;

  return {
    props: {
      displayName,
      pfpUrl,
    },
  };
};
