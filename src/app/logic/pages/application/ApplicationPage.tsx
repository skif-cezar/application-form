/* eslint-disable no-console */
import {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import clsx from "clsx";
import styles from "src/app/logic/pages/application/ApplicationPage.module.scss";
import {getDoc, doc, DocumentData} from "firebase/firestore";
import {db} from "src/firebase";
import {Spinner} from "src/app/components/spinner/Spinner";
import {getFormatDate} from "src/app/utility/getFormatDate";

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

  const {id}: any = useParams<{id?: string}>();
  const [app, setApp] = useState<DocumentData>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Кнопка назад
  const goBack = (): void => navigate(-1);

  const getApplicationById = useCallback(async (): Promise<void> => {
    setLoading(true);

    // Получение заявки по id
    const snap = await getDoc(doc(db, "applications", id));

    if (snap.exists()) {
      // Записываем данные заявки в state
      setApp(snap.data());
      console.log(snap.data());
      setLoading(false);
    } else {
      console.log("No such document");
    }
  }, []);

  useEffect(() => {
    getApplicationById();
    console.log(app);
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
