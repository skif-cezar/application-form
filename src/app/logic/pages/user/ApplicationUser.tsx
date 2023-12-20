/* eslint-disable @typescript-eslint/typedef */
import React, {useCallback, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "src/app/store";
import clsx from "clsx";
import styles from "src/app/logic/pages/user/UserPage.module.scss";
import {Card} from "src/app/components/card/Card";
import {ApplicationState, addAppLastVisible, addApplication} from "src/app/store/applications/slices/applicationSlice";
import {Pagination} from "src/app/components/pagination/Pagination";
import {NotData} from "src/app/components/notData/NotData";
import {Spinner} from "src/app/components/spinner/Spinner";
import {query, collection, where, orderBy, limit, getDocs} from "firebase/firestore";
import {getFormatDate} from "src/app/utility/getFormatDate";
import {db} from "src/firebase";

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
  const dispatch = useDispatch();

  // Получение данных о user из store
  const user = useSelector((state: AppState) => state.users.user);
  // Получение всех заявок пользователя из store
  const apps = useSelector((state: AppState) => state.applications.applications);

  const areAnyApps = apps!.length;

  // Получение заявок пользователя
  const getApplicationData = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    // Получение данных из Firestore по условию с лимитом по 8 записей
    const appData = query(collection(db, "applications"),
      where("idUser", "==", user.idUser),
      orderBy("date", "desc"),
      limit(8));

    // Получение данных user из Firestore по условию
    const userData = query(collection(db, "users"),
      where("idUser", "==", user.idUser));

    const querySnapshot = await getDocs(appData);
    const querySnapshotUser = await getDocs(userData);

    if(querySnapshot.docs.length !== 0 && !querySnapshotUser.empty) {
      const docUser = querySnapshotUser.docs[0]!.data();
      const author = `${docUser["lastName"]} ${docUser["firstName"]} ${docUser["surname"]}`;

      // Получение последних видимых записей
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      // Добавление последних видимых данных заявки в store
      dispatch(
        addAppLastVisible(lastVisible),
      );

      querySnapshot.forEach((doc: any) => {
        // id заявки
        const {id}: ApplicationState = doc;
        const {idUser, title, description, parlor, comment, status, executor}: ApplicationState = doc.data();

        // Перевод даты из Firestore в строку
        const date = getFormatDate(doc.data().date.seconds);

        // Добавление данных заявки в store
        dispatch(
          addApplication({
            id,
            idUser,
            author,
            title,
            description,
            parlor,
            date,
            comment,
            status,
            executor,
          }),
        );
        setIsLoading(false);
      });
    }
  }, []);

  // Получение назначенных заявок специалисту
  const getApplicationByExecutor = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    // Получение заявок из Firestore по условию с лимитом по 8 записей
    const appData = query(collection(db, "applications"),
      where("executor", "==", user.idUser),
      orderBy("date", "desc"),
      limit(8));

    const querySnapshot = await getDocs(appData);

    if(querySnapshot.docs.length !== 0) {
      let userData;

      querySnapshot.forEach(async (doc: any) => {
        // id заявки
        const {id}: ApplicationState = doc;
        const {idUser, title, description, parlor, comment, status, executor}: ApplicationState = doc.data();

        // Получение данных user из Firestore по условию
        userData = query(collection(db, "users"),
          where("idUser", "==", idUser));

        const querySnapshotUser = await getDocs(userData);

        if(!querySnapshotUser.empty) {
          const docUser = querySnapshotUser.docs[0]!.data();
          const author = `${docUser["lastName"]} ${docUser["firstName"]} ${docUser["surname"]}`;

          // Перевод даты из Firestore в строку
          const date = getFormatDate(doc.data().date.seconds);

          // Добавление данных заявки в store
          dispatch(
            addApplication({
              id,
              idUser,
              author,
              title,
              description,
              parlor,
              date,
              comment,
              status,
              executor,
            }),
          );

          // Получение последних видимых записей
          const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

          // Добавление последних видимых данных заявки в store
          dispatch(
            addAppLastVisible(lastVisible),
          );
          setIsLoading(false);
        }
      });
    }
  }, []);

  useEffect(() => {
    if(user.role === "Специалист") {
      getApplicationByExecutor();
    } else {
      getApplicationData();
    }
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
