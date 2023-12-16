/* eslint-disable @typescript-eslint/typedef */
import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "src/app/store";
import clsx from "clsx";
import styles from "src/app/logic/pages/user/UserPage.module.scss";
import {Card} from "src/app/components/card/Card";
import {
  ApplicationState,
  addAppLastVisible,
  addApplication,
  clearApplication,
  setStatus,
} from "src/app/store/applications/slices/applicationSlice";
import {Pagination} from "src/app/components/pagination/Pagination";
import {NotData} from "src/app/components/notData/NotData";
import {Spinner} from "src/app/components/spinner/Spinner";
import {collection, getDocs, limit, orderBy, query, where} from "firebase/firestore";
import {db} from "src/firebase";
import {getFormatDate} from "src/app/utility/getFormatDate";
import {UserState} from "src/app/store/user/slices/userSlice";

/**
 *  Path to applications all
 */
export const APPLICATIONS_URL = "/admin/applications";

/**
 * Applications all
 */
export const ApplicationsAll: React.FC = () => {
  const TABLE_STYLES = clsx(styles.table);
  const HEADER_STYLES = clsx(styles.table__heder);
  const TITLE_EMPLOYEE_STYLES = clsx(styles.title_employee);
  const TITLE_DATE_STYLES = clsx(styles.title_date);
  const TITLE_NAME_STYLES = clsx(styles.title_name);
  const TITLE_PARLOR_STYLES = clsx(styles.title_parlor);
  const TITLE_STATUS_STYLES = clsx(styles.title_status);
  const CONTAINER_STYLES = clsx(styles.container);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  // Получение всех заявок пользователя из store
  const apps = useSelector((state: AppState) => state.applications.applications);
  // Состояние выбора статуса заявки для фильтрации
  const [selectedStatus, setSelectedStatus] = useState("Все статусы");

  const areAnyApps = apps!.length;

  const getApplicationData = async (): Promise<void> => {
    let appData;
    setIsLoading(true);
    dispatch(clearApplication());

    if(selectedStatus === "Все статусы") {
      // Получение всех заявок из Firestore по условию с лимитом по 8 записей
      appData = query(collection(db, "applications"),
        orderBy("date", "desc"),
        limit(8));
    } else {
      // Получение заявок из Firestore по условию выбора статуса заявки с лимитом по 8 записей
      appData = query(collection(db, "applications"),
        where("status", "==", selectedStatus),
        orderBy("date", "desc"),
        limit(8));
    }

    const querySnapshot = await getDocs(appData);

    if(querySnapshot.docs.length !== 0) {
      // Получение последних видимых записей
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      // Добавление последних видимых данных заявки в store
      dispatch(
        addAppLastVisible(lastVisible),
      );

      querySnapshot.forEach(async(doc: any) => {
        // id заявки
        const {id}: ApplicationState = doc;
        const {idUser, title, description, parlor, comment, status}: ApplicationState = doc.data();
        // Перевод даты из Firestore в строку
        const date = getFormatDate(doc.data().date.seconds);

        // Получение данных user из Firestore по условию
        const userData = query(collection(db, "users"),
          where("idUser", "==", idUser));

        const querySnapshotUser = await getDocs(userData);

        // Проверка на наличие данных
        if(querySnapshotUser.docs.length) {
          querySnapshotUser.forEach((userDoc: any) => {
            const {firstName, lastName, surname}: UserState = userDoc.data();
            const author = `${lastName} ${firstName} ${surname}`;

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
              }),
            );
            setIsLoading(false);
          });
        } else {
          // Добавление данных заявки в store
          dispatch(
            addApplication({
              id,
              idUser: null,
              author: "Пользователь был удалён",
              title,
              description,
              parlor,
              date,
              comment,
              status,
            }),
          );
          setIsLoading(false);
        }
      });
    }
  };

  useEffect(() => {
    getApplicationData();
  }, [selectedStatus]);

  return (
    <>
      <div className={TABLE_STYLES}>
        <div className={HEADER_STYLES}>
          <p className={TITLE_EMPLOYEE_STYLES}>Сотрудник</p>
          <p className={TITLE_DATE_STYLES}>Дата</p>
          <p className={TITLE_NAME_STYLES}>Тема заявки</p>
          <p className={TITLE_PARLOR_STYLES}>Кабинет</p>
          <div className={TITLE_STATUS_STYLES}>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                dispatch(setStatus(e.target.value));
              }}
            >
              <option value="Все статусы">Все статусы</option>
              <option value="Новая">Новая</option>
              <option value="В работе">В работе</option>
              <option value="Выполнена">Выполнена</option>
            </select>
          </div>

        </div>
        {(!isLoading) ? (
          <div className={CONTAINER_STYLES}>
            {areAnyApps ? (apps!.map((app: ApplicationState) => (
              <NavLink to={`${APPLICATIONS_URL}/${app.id}`} key = {app.id}>
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
