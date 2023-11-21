import React from "react";
import clsx from "clsx";
import styles from "src/app/logic/layout/Layout.module.scss";
import {Hero} from "src/app/logic/hero/Hero";
import {Header} from "src/app/components/header/Header";
import {About} from "src/app/logic/about/About";
import {News} from "src/app/logic/news/News";
import {Info} from "src/app/logic/info/Info";
import {Donate} from "src/app/logic/donate/Donate";
import {Footer} from "src/app/logic/footer/Footer";

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
      <Header />
      <main className={MAIN_STYLES}>
        <Hero />
        <About />
        <News />
        <Info />
        <Donate />
      </main>
      <Footer />
    </div>
  );
};
