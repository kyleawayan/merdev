import React, { useState } from "react";
import styles from "../../styles/menu/Pfp.module.css";

interface PfpProps {
  name: string;
  imageUrl: string;
}

export default function Pfp({ name, imageUrl }: PfpProps) {
  const [hasImage, setHasImage] = useState(true);

  return (
    <div className={styles.pfp}>
      {hasImage && <img src={imageUrl} onError={() => console.log("no")} />}
      {!hasImage && <div>{name}</div>}
    </div>
  );
}
