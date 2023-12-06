import {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import clsx from "clsx";
import styles from "src/app/logic/pages/application/ApplicationPage.module.scss";
import {getDoc, doc, DocumentData, updateDoc, deleteDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {Spinner} from "src/app/components/spinner/Spinner";
import {getFormatDate} from "src/app/utility/getFormatDate";
import {AppState} from "src/app/store";
import {useDispatch, useSelector} from "react-redux";
import {removeApplication, updateApplication} from "src/app/store/applications/slices/applicationSlice";

/**
 * Application page
 */
export const ApplicationPage = (): any => {
  const CARD_STYLES = clsx(styles.card);
  const TITLE_STYLES = clsx(styles.title);
  const CONTAINER_STYLES = clsx(styles.container);
  const TITLE_ROWS_STYLES = clsx(styles.title_rows);
  const TEXT_ROWS_STYLES = clsx(styles.text_rows);
  const STATUS_OPEN_STYLES = clsx(styles.status_open);
  const STATUS_CLOSED_STYLES = clsx(styles.status_closed);
  const BUTTON_STYLES = clsx(styles.button);
  const BUTTON_OPEN_STYLES = clsx(styles.status_open, styles.status_btn);
  const BUTTON_CLOSE_STYLES = clsx(styles.status_closed, styles.status_btn);

  const isAdmin = useSelector((state: AppState) => state!.user!.isAdmin);
  const {id}: any = useParams<{id?: string}>();
  const [app, setApp] = useState<DocumentData>();
  const [loading, setLoading] = useState(false);
  const [isOpenApp, setIsOpenApp] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Кнопка назад
  const goBack = (): void => navigate(-1);

  // Получение данных заявки по id
  const getApplicationById = useCallback(async (): Promise<void> => {
    setLoading(true);

    // Получение заявки по id
    const snap = await getDoc(doc(db, "applications", id));

    if (snap.exists()) {
      // Записываем данные заявки в state
      setApp(snap.data());

      const {author, email, title, description, parlor, comment, status}: any = snap.data();

      if (status === "Открыта") {
        setIsOpenApp(true);
      } else {
        setIsOpenApp(false);
      }
      // Перевод даты из Firestore в строку
      const date = getFormatDate(snap.data()["date"].seconds);

      // Добавление данных заявки в store
      dispatch(
        updateApplication({
          id,
          author,
          email,
          title,
          description,
          parlor,
          date,
          comment,
          status,
        }),
      );
      setLoading(false);
    } else {
      alert("Заявка не найдена");
    }
  }, []);

  useEffect(() => {
    getApplicationById();
  }, []);

  // Изменить статус заявки
  const updateStatus = useCallback(async (): Promise<void> => {
    // Получение заявки по id
    const appRef = doc(db, "applications", id);

    try {
      if (isOpenApp) {
        await updateDoc(appRef, {"status": "Закрыта"});
      } else {
        await updateDoc(appRef, {"status": "Открыта"});
      }

      getApplicationById();

    } catch(error) {
      console.error("Error updating status: ", error);
    }
  }, [isOpenApp]);

  // Удаление заявки
  const deleteApp = useCallback(async (): Promise<void> => {
    // Получение заявки по id
    const appRef = doc(db, "applications", id);
    // eslint-disable-next-line no-restricted-globals
    const isDelete = confirm("Вы действительно хотите удалить заявку навсегда?");

    if(isDelete) {
      try {
        await deleteDoc(appRef);

        dispatch(
          removeApplication(id),
        );

        goBack();

      } catch(error) {
        console.error("Error updating status: ", error);
      }
    }
  }, []);

  if(loading) {
    return <Spinner />;
  } if(app) {
    return (
      <>
        <article className={CARD_STYLES}>
          <h2 className={TITLE_STYLES}>Информация о заявке</h2>
          <div className={CONTAINER_STYLES}>
            <div className={TITLE_ROWS_STYLES}>
              <p>Сотрудник:</p>
              <p>Тема заявки:</p>
              <p>Описание:</p>
              <p>Кабинет:</p>
              <p>Дата создания:</p>
              <p>Статус:</p>
              <p>Комментарий к заявке:</p>
            </div>
            <div className={TEXT_ROWS_STYLES}>
              <p>{app["author"]}</p>
              <p>{app["title"]}</p>
              <p>{app["description"]}</p>
              <p>{app["parlor"]}</p>
              <p>{getFormatDate(app["date"].seconds)}</p>
              <p>
                <span className={(app["status"] === "Открыта") ? STATUS_OPEN_STYLES : STATUS_CLOSED_STYLES}>{app["status"]}</span>
              </p>
              <p>{app["comment"]}</p>
            </div>
          </div>
          {isAdmin ? (
            <button
              className={(isOpenApp) ? BUTTON_CLOSE_STYLES : BUTTON_OPEN_STYLES}
              type="button" onClick={() => {updateStatus();}}
            >
              {isOpenApp ? "Закрыть заявку" : "Открыть заявку"}
            </button>
          ) : null}
          {isAdmin ? (
            <button
              className={BUTTON_CLOSE_STYLES}
              type="button" onClick={() => {deleteApp();}}
            >
              Удалить заявку
            </button>
          ) : null}
        </article>
        <div className={BUTTON_STYLES}>
          <button
            type="button" onClick={() => {goBack();}}
          >
            Вернуться назад
          </button>
        </div>
      </>
    );
  }
  return null;
};
