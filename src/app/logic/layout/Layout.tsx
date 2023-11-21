import React from "react";
import clsx from "clsx";
import styles from "src/app/logic/layout/Layout.module.scss";
// import {Header} from "src/app/components/header/Header";
// import {About} from "src/app/logic/about/About";
import {Regestration} from "src/app/components/regestration/Regestration";
// import {Footer} from "src/app/logic/footer/Footer";

/**
 *  Path to main page
 */
export const MAIN_PAGE_PATH = "/";

/**
 * Layout component
 */
export const Layout: React.FC = () => {
  const WRAPPER_STYLES = clsx(styles.wrapper);
  const MAIN_STYLES = clsx(styles.main);

  return (
    <div className={WRAPPER_STYLES}>
      <main className={MAIN_STYLES}>
        <Regestration />
      </main>
    </div>
  );
};
