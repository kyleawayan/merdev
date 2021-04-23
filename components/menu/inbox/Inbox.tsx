import React, { useRef, useEffect, useState } from "react";
import BoxIconEmpty from "./icons/BoxIconEmpty";
import BoxIconFilled from "./icons/BoxIconFilled";
import styles from "../../../styles/menu/inbox/Inbox.module.css";
import firebase from "firebase/app";
import "firebase/firestore";
import { useAuth } from "../../../utils/use-auth";
import InboxItem from "./InboxItem";
import Badge from "./Badge";

const db = firebase.firestore();
const clearInbox = firebase.functions().httpsCallable("clearInbox");

export default function Inbox() {
  const auth = useAuth();
  const [data, setData] = useState<Array<InboxItem>>([]);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [clearingInbox, setClearingInbox] = useState(false);

  // https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
  function useOutsideAlerter(ref: React.MutableRefObject<null>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: { target: any }) {
        // @ts-ignore
        if (ref.current && !ref.current.contains(event.target)) {
          setInboxOpen(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(auth.user.uid)
      .collection("inbox")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setData(
          snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          }) as Array<InboxItem>
        );
      });
    return () => unsubscribe();
  }, []);

  const clearInboxCollection = () => {
    const confirm = window.confirm(
      "Are you sure you want to clear your inbox?"
    );
    if (confirm) {
      setClearingInbox(true);
      clearInbox()
        .then(() => {
          setClearingInbox(false);
        })
        .catch((error) => {
          setClearingInbox(false);
          console.error(error);
        });
    }
  };

  return (
    <span ref={wrapperRef}>
      {/* {https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e} */}
      <span className={styles.button} onClick={() => setInboxOpen(!inboxOpen)}>
        {data.filter((item) => item.read == false).length == 0 && (
          <BoxIconEmpty />
        )}
        {data.filter((item) => item?.read == false).length != 0 && (
          <div className={styles.filledInbox}>
            <BoxIconFilled />
            <Badge count={data.filter((item) => item?.read == false).length} />
          </div>
        )}
      </span>
      {inboxOpen && (
        <div className={styles.inboxWindow}>
          <div>
            <div>
              <h4 className={styles.inboxHeader}>Inbox</h4>
              <div className={styles.clear} onClick={clearInboxCollection}>
                {!clearingInbox ? "Clear" : "Clearing..."}
              </div>
            </div>
            {data.map((item: InboxItem) => (
              <InboxItem
                type={item.type}
                preview={item.preview}
                questionTitle={item.questionTitle}
                timestamp={item.timestamp}
                questionId={item.questionId}
                answerId={item.answerId}
                commentId={item.commentId}
                read={item.read}
                inboxItemId={item.id}
                closeWindow={() => setInboxOpen(false)}
                key={item.id}
              />
            ))}
          </div>
        </div>
      )}
    </span>
  );
}
