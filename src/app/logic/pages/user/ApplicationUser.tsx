/* eslint-disable @typescript-eslint/typedef */
import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppState} from "src/app/store";
import clsx from "clsx";
import styles from "src/app/logic/pages/user/UserPage.module.scss";
import {Card} from "src/app/components/card/Card";
import {ApplicationState} from "src/app/store/applications/slices/applicationSlice";
import {Pagination} from "src/app/components/pagination/Pagination";
import {NotData} from "src/app/components/notData/NotData";
import {Spinner} from "src/app/components/spinner/Spinner";

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

  const [isLoading, setIsLoading] = useState(true);
  // Получение всех заявок пользователя из store
  const apps = useSelector((state: AppState) => state.applications.applications);

  const areAnyApps = apps!.length;

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <div className={TABLE_STYLES}>
        <div className={HEADER_STYLES}>
          <p className={TITLE_EMPLOYEE_STYLES}>Сотрудник</p>
          <p className={TITLE_DATE_STYLES}>Дата</p>
          <p className={TITLE_NAME_STYLES}>Тема заявки</p>
          <p className={TITLE_PARLOR_STYLES}>Кабинет</p>
          <p className={TITLE_STATUS_STYLES}>Статус</p>
        </div>
        {(!isLoading) ? (
          <div className={CONTAINER_STYLES}>
            {areAnyApps ? (apps!.map((app: ApplicationState) => (
              <NavLink to={`${APPLICATION_USER_URL}/${app.id}`} key = {app.id}>
                <Card
                  employee={app.author}
                  date={app.date}
                  name={app.title}
                  parlor={app.parlor}
                  status={app.status}
                />
              </NavLink>
            ))) : (<NotData />)}
          </div>
        ) : (<Spinner />)}
      </div>
      {(areAnyApps === 0) ? "" : <Pagination />}
    </>
  );
};
