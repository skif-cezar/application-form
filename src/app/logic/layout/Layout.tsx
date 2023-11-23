import React from "react";
import {Outlet} from "react-router-dom";
import clsx from "clsx";
import styles from "src/app/logic/layout/Layout.module.scss";

/**
 *  Path to main page
 */
export const MAIN_PAGE_PATH = "/";

/**
 * Layout component
 */
export const Layout: React.FC = () => {
  const WRAPPER_STYLES = clsx(styles.wrapper);

  return (
    <div className={WRAPPER_STYLES}>
      <Outlet />
    </div>
  );
};
