/* eslint-disable @typescript-eslint/typedef */
import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppState} from "src/app/store";
import clsx from "clsx";
import styles from "src/app/logic/pages/user/UserPage.module.scss";
import {Pagination} from "src/app/components/pagination/Pagination";
import {NotData} from "src/app/components/notData/NotData";
import {Spinner} from "src/app/components/spinner/Spinner";
import {UserState} from "src/app/store/user/slices/userSlice";

/**
 *  Path to application user
 */
export const EMPLOYEES_PAGE_URL = "/admin/employees";

/**
 * Employees page
 */
export const EmployeesPage: React.FC = () => {
  const TABLE_STYLES = clsx(styles.table);
  const HEADER_STYLES = clsx(styles.table__heder);
  const TITLE_EMPLOYEE_STYLES = clsx(styles.title_employee);
  const TITLE_DATE_STYLES = clsx(styles.title_date);
  const TITLE_NAME_STYLES = clsx(styles.title_name);
  const CONTAINER_STYLES = clsx(styles.container);

  const [isLoading, setIsLoading] = useState(true);
  // Получение всех пользователей из store
  const users = useSelector((state: AppState) => state.users.employees);

  const areAnyUsers = users!.length;

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <div className={TABLE_STYLES}>
        <div className={HEADER_STYLES}>
          <p className={TITLE_EMPLOYEE_STYLES}>Сотрудник</p>
          <p className={TITLE_DATE_STYLES}>Email</p>
          <p className={TITLE_NAME_STYLES}>Роль</p>
        </div>
        {(!isLoading) ? (
          <div className={CONTAINER_STYLES}>
            {!areAnyUsers ? (<NotData />) : (users!.map((user: UserState) => (
              <NavLink to={`${EMPLOYEES_PAGE_URL}/${user.idUser}`} key = {user.idUser}>
                <p className={TITLE_EMPLOYEE_STYLES}>{`${user.lastName} ${user.firstName} ${user.surname}`}</p>
                <p className={TITLE_DATE_STYLES}>Email сотрудника</p>
                <p className={TITLE_NAME_STYLES}>{user.role}</p>
              </NavLink>
            )))}
          </div>
        ) : (<Spinner />)}
      </div>
      {(areAnyUsers === 0) ? "" : <Pagination />}
    </>
  );
};
