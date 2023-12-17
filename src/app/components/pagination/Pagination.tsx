import React, {useEffect} from "react";
import clsx from "clsx";
import styles from "src/app/components/pagination/Pagination.module.scss";
import {useSelector, useDispatch} from "react-redux";
import {AppState} from "src/app/store";
import {db} from "src/firebase";
import {collection, getDocs, limit, orderBy, query, startAfter, where} from "firebase/firestore";
import {
  ApplicationState,
  addAppLastVisible,
  addApplication,
} from "src/app/store/applications/slices/applicationSlice";
import {getFormatDate} from "src/app/utility/getFormatDate";
import {UserState, addEmploye, addUserLastVisible} from "src/app/store/user/slices/userSlice";

/**
 * Pagination component
 */
export const Pagination: React.FC = () => {
  const PAGINATION_STYLES = clsx(styles.pagination);
  const NEXT_STYLES = clsx(styles.next);

  // Получение последних видимых заявок из store
  const lastVisibleApp = useSelector((state: AppState) => state.applications!.appLastVisible);
  // Получение последних видимых сотрудников из store
  const lastVisibleEmploye = useSelector((state: AppState) => state.users.userLastVisible);
  // Получение  заявок из store
  const apps = useSelector((state: AppState) => state.applications!.applications);
  const dispatch = useDispatch();

  // Получение данных user из store
  const user = useSelector((state: AppState) => state.users.user);
  // Админ или обычный юзер из store
  const isAdminUser = useSelector((state: AppState) => state.users.user!.isAdmin);
  // Состояние выбора статуса заявки для фильтрации
  const selectedStatus = useSelector((state: AppState) => state.applications.selectedStatus);

  useEffect(() => {
    if(!lastVisibleApp && apps!.length) {alert("Это все заявки!");}
  }, [lastVisibleApp]);

  useEffect(() => {
    if(!lastVisibleEmploye && !(apps!.length)) {alert("Это все сотрудники!");}
  }, [lastVisibleEmploye]);

  // Показать следующие заявки
  const getNextApps = async (): Promise<void> => {
    if(lastVisibleApp) {
      let nextAppData;
      if(isAdminUser) {
        if(selectedStatus === "Все статусы") {
          // Получение всех заявок из Firestore по условию с лимитом по 8 записей
          nextAppData = query(collection(db, "applications"),
            orderBy("date", "desc"),
            startAfter(lastVisibleApp), limit(8));
        } else {
          // Получение заявок из Firestore по условию выбора статуса заявки с лимитом по 8 записей
          nextAppData = query(collection(db, "applications"),
            where("status", "==", selectedStatus),
            orderBy("date", "desc"),
            startAfter(lastVisibleApp),
            limit(8));
        }
      } else {
        nextAppData = query(collection(db, "applications"),
          where("idUser", "==", user.idUser),
          orderBy("date", "desc"),
          startAfter(lastVisibleApp), limit(8));
      }

      const querySnapshot = await getDocs(nextAppData);

      // Получение последних видимых записей
      const lastVisibleApps = querySnapshot.docs[querySnapshot.docs.length - 1];

      // Добавление последних видимых данных заявки в store
      dispatch(
        addAppLastVisible(lastVisibleApps),
      );

      querySnapshot.forEach(async (doc: any) => {
        // id заявки
        const {id}: ApplicationState = doc;
        const {idUser, title, description, parlor, comment, status, executor}: ApplicationState = doc.data();
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
                executor,
              }),
            );
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
              executor,
            }),
          );
        }
      });
    }
  };

  // Показать следующих сотрудников
  const getNextEmployees = async (): Promise<void> => {
    if(lastVisibleEmploye) {
      // Получение данных из Firestore по условию с лимитом по 8 записей
      const nextUserData = query(collection(db, "users"),
        orderBy("role"),
        where("role", "!=", "Администратор"),
        orderBy("lastName"),
        startAfter(lastVisibleEmploye), limit(1));

      const querySnapshot = await getDocs(nextUserData);

      // Получение последних видимых сотрудников
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      // Добавление последних видимых данных user в store
      dispatch(
        addUserLastVisible(lastVisible),
      );

      querySnapshot.forEach((doc: any) => {
        const {email, firstName, idUser, isAdmin, lastName, role, surname}: UserState = doc.data();

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
      });
    }
  };

  return (
    <div className={PAGINATION_STYLES}>
      {lastVisibleApp && (
        <button
          type="button" className={NEXT_STYLES}
          onClick={getNextApps}
        >
          Показать ещё
        </button>
      )}
      {lastVisibleEmploye && (
        <button
          type="button" className={NEXT_STYLES}
          onClick={getNextEmployees}
        >
          Показать ещё
        </button>
      )}
    </div>
  );

};