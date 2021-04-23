import React from "react";
import styles from "../../styles/ask/RulesAndStuff.module.css";

export default function RulesAndStuff() {
  return (
    <div className={styles.rulesAndStuff}>
      <div>
        <p>
          {" "}
          Questions are formatted in markdown. Please take a look at{" "}
          <a
            href="https://guides.github.com/features/mastering-markdown/"
            target="_blank"
          >
            this guide
          </a>{" "}
          if you haven't used markdown before. Note that some markdown features
          in GitHub's guide are not implemented in merdev.
        </p>
        <p>
          LATEX is also supported. Surround your LATEX with <code>$</code> for
          inline display (letter variables, etc.), or <code>$$</code> for block
          display (useful for big equations).
        </p>
      </div>
      <div>
        <h3>Rules</h3>
        <p>
          Please follow these rules to ensure your question can be answered.
          <ul>
            <li>Make detailed questions</li>
            <li>Be as specific as possible</li>
            <li>Include error messages</li>
            <li>Show some code but copy and paste it, don't attach images</li>
            <li>Tag your question with the related CSE class</li>
            <li>
              Don't ask on how to do whole exercises or else your question will
              be deleted
            </li>
          </ul>
        </p>
      </div>
    </div>
  );
}
