import React from "react";
import styles from "./Footer.module.css";
import { BsYoutube, BsGithub, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <div className={styles.parentContainer}>
      <div className={styles.sect1}>
        <p>CONNECT WITH US</p>
        <input
          className={styles.inpt}
          type="email"
          placeholder="Enter Email ID"
        />

        <div className={styles.socialLink}>
          <BsYoutube />
          <a
            href="https://github.com/AshokChoudhary11/Croma-Clone---React-Project-2---z9qnjrap5ytl"
            target="_blank"
            rel="noreferrer"
          >
            <BsGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/ashok-kumar-51224a228"
            target="_blank"
            rel="noreferrer"
          >
            <BsLinkedin />
          </a>
        </div>
        <p>© Copyright 2023 Croma. All rights reserved</p>
      </div>
      <div className={styles.sect2}>
        <p>FAQs</p>
        <p>Buying Guide</p>
        <p>Return Policy</p>
        <p>B2B Orders</p>
        <p>Store Locator</p>
      </div>
      <div className={styles.sect3}>
        <div>
          <p>USEFUL LINKS</p>
          <p>About Croma</p>
          <p>Help And Support</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
