import React from "react";
import clsx from "clsx";
import styles from "src/app/components/spinner/Spinner.module.scss";

/**
 * Spinner component
 */
export const Spinner: React.FC = () => {
  const SPINNER_CONTAINER_STYLES = clsx(styles.container);
  const SPINNER_STYLES = clsx(styles.spinner);

  return (
    <div className={SPINNER_CONTAINER_STYLES}>
      <div className={SPINNER_STYLES}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </div>
    </div>
  );
};
