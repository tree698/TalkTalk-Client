import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import styles from './footer.module.css';

const Footer = (props) => (
  <footer className={styles.footer}>
    <div className={styles.contact}>
      <address>
        <a className={styles.email} href="mailto:tree698@gmail.com">
          tree698@gmail.com
        </a>
      </address>
      <a href="https://github.com/tree698/TalkTalk-Client" target="_blank">
        <FontAwesomeIcon icon={faGithub} className={styles.github} />
      </a>
    </div>
    <p className={styles.right}>2023 Chanwoo @All Right Reserved</p>
  </footer>
);

export default Footer;
