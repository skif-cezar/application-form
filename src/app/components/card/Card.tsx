import React from "react";
import clsx from "clsx";
import styles from "src/app/components/card/Card.module.scss";

/**
 * Card props
 */
export interface CardProps {
  employee: string | null;
  date: string | null;
  name: string | null;
  parlor: string | null;
  status: string | null;
}

/**
 * Card application component
 */
export const Card: React.FC<CardProps> = (props: CardProps) => {
  const CARD_STYLES = clsx(styles.card);
  const EMPLOYEE_STYLES = clsx(styles.employee);
  const DATE_STYLES = clsx(styles.date);
  const NAME_STYLES = clsx(styles.name);
  const PARLOR_STYLES = clsx(styles.parlor);
  const STATUS_STYLES = clsx(styles.status);
  const STATUS_OPEN_STYLES = clsx(styles.status_open);

  return (
    <div className={CARD_STYLES}>
      <p className={EMPLOYEE_STYLES}>{props.employee}</p>
      <p className={DATE_STYLES}>{props.date}</p>
      <p className={NAME_STYLES}>{props.name}</p>
      <p className={PARLOR_STYLES}>{props.parlor}</p>
      <p className={STATUS_STYLES}>
        <span className={STATUS_OPEN_STYLES}>{props.status}</span>
      </p>
    </div>
  );
};
