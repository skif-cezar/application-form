import React from "react";
import clsx from "clsx";
import styles from "src/app/components/header/Header.module.scss";
// import {Menu} from "src/app/components/menu/Menu";

/**
 * Header component
 */
export const Header: React.FC = () => {
  const HEADER_STYLES = clsx(styles.header);

  return (
    <header className={HEADER_STYLES}>
      Menu
    </header>
  );
};
