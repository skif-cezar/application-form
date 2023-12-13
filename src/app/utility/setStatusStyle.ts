import clsx from "clsx";
import styles from "src/app/components/card/Card.module.scss";

const STATUS_NEW_STYLES = clsx(styles.status_new);
const STATUS_WORKING_STYLES = clsx(styles.status_working);
const STATUS_COMPLETED_STYLES = clsx(styles.status_completed);

export const setStatusStyle = (statusApp: any): string | undefined => {
  if(statusApp === "Новая") {
    return STATUS_NEW_STYLES;
  } if(statusApp === "В работе") {
    return STATUS_WORKING_STYLES;
  } if(statusApp === "Выполнена") {
    return STATUS_COMPLETED_STYLES;
  };
  return undefined;
};