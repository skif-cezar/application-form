/* eslint-disable @typescript-eslint/typedef */
import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "src/app/store";
import clsx from "clsx";
import styles from "src/app/logic/pages/employees/EmployeesPage.module.scss";
import {Pagination} from "src/app/components/pagination/Pagination";
import {NotData} from "src/app/components/notData/NotData";
import {Spinner} from "src/app/components/spinner/Spinner";
import {UserState, addEmploye, addUserLastVisible} from "src/app/store/user/slices/userSlice";
import {collection, getDocs, limit, orderBy, query, where} from "firebase/firestore";
import {db} from "src/firebase";
import {EmployeeCard} from "src/app/components/employeCard/EmployeeCard";

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
  const TITLE_EMAIL_STYLES = clsx(styles.title_email);
  const TITLE_ROLE_STYLES = clsx(styles.title_role);
  const CONTAINER_STYLES = clsx(styles.container);

  const dispatch = useDispatch();
  // Получение всех пользователей из store
  const users = useSelector((state: AppState) => state.users.employees);
  const areAnyUsers = users!.length;
  const [isLoading, setIsLoading] = useState(true);

  const getEmployees = async (): Promise<void> => {
    // Получение данных из Firestore по условию с лимитом по 8 записей
    const userData = query(collection(db, "users"),
      orderBy("role"),
      where("role", "!=", "Администратор"),
      orderBy("lastName"),
      limit(8));

    const querySnapshot = await getDocs(userData);

    if(querySnapshot.docs.length !== 0) {
      // Получение последних видимых записей
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      // Добавление последних видимых данных user в store
      dispatch(
        addUserLastVisible(lastVisible),
      );

      querySnapshot.forEach(async(doc: any) => {
        const {firstName, surname, lastName, idUser, email, isAdmin, role}: any = doc.data();

        if(!isAdmin) {
          // Добавление данных заявки в store
          dispatch(
            addEmploye({
              firstName,
              surname,
              lastName,
              token: null,
              idUser,
              email,
              isLoggedIn: false,
              isAdmin,
              role,
            }),
          );
        }
      });
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <>
      <div className={TABLE_STYLES}>
        <div className={HEADER_STYLES}>
          <p className={TITLE_EMPLOYEE_STYLES}>Сотрудник</p>
          <p className={TITLE_EMAIL_STYLES}>Email</p>
          <p className={TITLE_ROLE_STYLES}>Роль</p>
        </div>
        {(!isLoading) ? (
          <div className={CONTAINER_STYLES}>
            {!areAnyUsers ? (<NotData />) : (users!.map((user: UserState) => (
              <NavLink to={`${EMPLOYEES_PAGE_URL}/${user.idUser}`} key = {user.idUser}>
                <EmployeeCard
                  employee={`${user.lastName} ${user.firstName} ${user.surname}`}
                  email={user.email}
                  role={user.role}
                />
              </NavLink>
            )))}
          </div>
        ) : (<Spinner />)}
      </div>
      {(areAnyUsers === 0) ? "" : <Pagination />}
    </>
  );
};
