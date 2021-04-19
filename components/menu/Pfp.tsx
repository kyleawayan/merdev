import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../../styles/menu/Pfp.module.css";
import firebase from "firebase/app";
import "firebase/storage";

const storage = firebase.storage();

interface PfpProps {
  userUid: string;
}

export default function Pfp({ userUid }: PfpProps) {
  const [pfpUrl, setPfpUrl] = useState("");

  useEffect(() => {
    storage
      .ref(`avatars/${userUid}.jpg`)
      .getDownloadURL()
      .then((url) => {
        setPfpUrl(url);
      })
      .catch(console.warn);
  }, []);

  return (
    <span className={styles.pfp}>
      <div className={styles.pfpContainer}>
        {pfpUrl && <Image src={pfpUrl} layout="fill" objectFit="cover" />}
      </div>
    </span>
  );
}
