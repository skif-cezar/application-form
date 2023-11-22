import React from "react";
import clsx from "clsx";
import styles from "src/app/logic/layout/Layout.module.scss";
// import {Regestration} from "src/app/components/regestration/Regestration";
import {Form} from "src/app/components/form/Form";

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
        {/* <Regestration /> */}
        <Form />
      </main>
    </div>
  );
};
