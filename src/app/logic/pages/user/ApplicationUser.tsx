import React from "react";
import clsx from "clsx";
import styles from "src/app/logic/pages/user/UserPage.module.scss";
import {Card} from "src/app/components/card/Card";

/**
 *  Path to application user
 */
export const APPLICATION_USER_URL = "/user/applications";

/**
 * Application user
 */
export const ApplicationUser: React.FC = () => {
  const TABLE_STYLES = clsx(styles.table);
  const HEADER_STYLES = clsx(styles.table__heder);
  const TITLE_EMPLOYEE_STYLES = clsx(styles.title_employee);
  const TITLE_DATE_STYLES = clsx(styles.title_date);
  const TITLE_NAME_STYLES = clsx(styles.title_name);
  const TITLE_PARLOR_STYLES = clsx(styles.title_parlor);
  const TITLE_STATUS_STYLES = clsx(styles.title_status);
  const CONTAINER_STYLES = clsx(styles.container);

  return (
    <div className={TABLE_STYLES}>
      <div className={HEADER_STYLES}>
        <p className={TITLE_EMPLOYEE_STYLES}>Сотрудник</p>
        <p className={TITLE_DATE_STYLES}>Дата</p>
        <p className={TITLE_NAME_STYLES}>Тема заявки</p>
        <p className={TITLE_PARLOR_STYLES}>Кабинет</p>
        <p className={TITLE_STATUS_STYLES}>Статус</p>
      </div>
      <div className={CONTAINER_STYLES}>
        <Card
          employee="skif.cezar-8282hhbs2@gmil.com"
          date="13.09.2015 14:45"
          name="Не работает принтер и ксерокс"
          parlor="Кабинет 456"
          status="Открыта"
        />
        <Card
          employee="skif.cezar-8282hhbs2@gmil.com"
          date="13.09.2015 14:45"
          name="Не работает принтер и ксерокс"
          parlor="Кабинет 456"
          status="Открыта"
        />
        <Card
          employee="skif.cezar-8282hhbs2@gmil.com"
          date="13.09.2015 14:45"
          name="Не работает принтер и ксерокс"
          parlor="Кабинет 456"
          status="Открыта"
        />
        <Card
          employee="skif.cezar-8282hhbs2@gmil.com"
          date="13.09.2015 14:45"
          name="Не работает принтер и ксерокс"
          parlor="Кабинет 456"
          status="Открыта"
        />
        <Card
          employee="skif.cezar-8282hhbs2@gmil.com"
          date="13.09.2015 14:45"
          name="Не работает принтер и ксерокс"
          parlor="Кабинет 456"
          status="Открыта"
        />
      </div>
    </div>
  );
};
