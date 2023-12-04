import React from "react";
import clsx from "clsx";
import styles from "src/app/components/pagination/Pagination.module.scss";
import {db} from "src/firebase";
import {collection, getDocs, limit, orderBy, query, startAfter, where} from "firebase/firestore";
import {AppState} from "src/app/store";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState, addAppLastVisible, addApplication} from "src/app/store/applications/slices/applicationSlice";

/**
 * Pagination component
 */
export const Pagination: React.FC = () => {
  const PAGINATION_STYLES = clsx(styles.pagination);
  const NEXT_STYLES = clsx(styles.next);

  const dispatch = useDispatch();

  // Получение email юзера из store
  const email = useSelector((state: AppState) => state!.user!.email);

  // Получение последних видимых заявок из store
  const lastVisible = useSelector((state: AppState) => state!.applications!.appLastVisible);
  // eslint-disable-next-line no-console
  console.log(lastVisible);

  if(!lastVisible) {
    alert("Это все заявки");
  }
  const showNextApps = (): void => {
    if(lastVisible) {
      const getNextApps = async (): Promise<void> => {
      // Получение данных из Firestore по условию с лимитом по 6 записей
        const nextAppData = query(collection(db, "applications"),
          where("author", "==", email),
          orderBy("date", "desc"),
          startAfter(lastVisible), limit(6));

        const querySnapshot = await getDocs(nextAppData);

        // Получение последних видимых записей
        const lastVisibleApps = querySnapshot.docs[querySnapshot.docs.length - 1];
        // eslint-disable-next-line no-console
        console.log(querySnapshot.docs.length);

        // Добавление последних видимых данных заявки в store
        dispatch(
          addAppLastVisible(lastVisibleApps),
        );

        querySnapshot.forEach((doc: any) => {
        // id заявки
          const {id}: ApplicationState = doc;
          const {author, title, description, parlor, comment, status}: ApplicationState = doc.data();

          // Перевод даты из Firestore в строку
          const dateToString = new Date(doc.data().date.seconds * 1000);
          const date = dateToString.toLocaleString();

          // Добавление данных заявки в store
          dispatch(
            addApplication({
              id,
              author,
              title,
              description,
              parlor,
              date,
              comment,
              status,
            }),
          );
        });
      };
      getNextApps();
    }
  };

  return (
    <div className={PAGINATION_STYLES}>
      {lastVisible && (
        <button
          type="button" className={NEXT_STYLES}
          onClick={showNextApps}
        >
          Показать ещё
        </button>
      )}
    </div>
  );

};