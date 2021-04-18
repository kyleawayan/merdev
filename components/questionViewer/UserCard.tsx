import React, { useEffect, useState } from "react";
import styles from "../../styles/questionViewer/UserCard.module.css";
import Moment from "react-moment";
import firebase from "firebase/app";
import "firebase/storage";
import Image from "next/image";

const storage = firebase.storage();

interface UserCardProps {
  displayName: string;
  userUid: string;
  datePosted: Date;
  action: string;
  points?: number;
}

export default function UserCard({
  displayName,
  userUid,
  datePosted,
  action,
  points,
}: UserCardProps) {
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
    <div className={styles.userCardContainer}>
      <div className={styles.userCard}>
        <div className={styles.pfpContainer}>
          {pfpUrl && <Image src={pfpUrl} layout="fill" objectFit="cover" />}
        </div>
        <div className={styles.info}>
          <div className={styles.displayName}>{displayName}</div>
          <div className={styles.datePosted}>
            {action} {<Moment date={datePosted} fromNow />}
          </div>
        </div>
      </div>
    </div>
  );
}
