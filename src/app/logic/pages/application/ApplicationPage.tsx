import {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import clsx from "clsx";
import styles from "src/app/logic/pages/application/ApplicationPage.module.scss";
import {getDoc, doc, DocumentData, updateDoc, deleteDoc, query, collection, where, getDocs} from "firebase/firestore";
import {db} from "src/firebase";
import {Spinner} from "src/app/components/spinner/Spinner";
import {getFormatDate} from "src/app/utility/getFormatDate";
import {AppState} from "src/app/store";
import {useDispatch, useSelector} from "react-redux";
import {removeApplication, updateApplication} from "src/app/store/applications/slices/applicationSlice";
import {UserState} from "src/app/store/user/slices/userSlice";
import {setStatusStyle} from "src/app/utility/setStatusStyle";

/**
 * Application page
 */
export const ApplicationPage = (): any => {
  const CARD_STYLES = clsx(styles.card);
  const TITLE_STYLES = clsx(styles.title);
  const CONTAINER_STYLES = clsx(styles.container);
  const TITLE_ROWS_STYLES = clsx(styles.title_rows);
  const TEXT_ROWS_STYLES = clsx(styles.text_rows);
  const BUTTON_STYLES = clsx(styles.button);
  const BUTTON_DELETE_STYLES = clsx(styles.btn_delete);
  const BUTTON_SAVE_STYLES = clsx(styles.btn_save);

  const user = useSelector((state: AppState) => state.users.user);
  const {isAdmin}: UserState = (user);
  const {id}: any = useParams<{id?: string}>();
  const [app, setApp] = useState<DocumentData>();
  const [employees, setEmployees] = useState<any>([]);
  const [selectedExecutor, setSelectedExecutor] = useState("Нет");
  const [loading, setLoading] = useState(false);
  const [statusApp, setStatusApp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Кнопка назад
  const goBack = (): void => navigate(-1);
  const fullNameUser = `${user!.lastName} ${user!.firstName} ${user!.surname}`;

  // Получение данных сотрудников "Специалист"
  const getUserByRole = async (): Promise<void> => {
    setLoading(true);

    // Получение данных user из Firestore по условию
    const usersData = query(collection(db, "users"),
      where("role", "==", "Специалист"));
    const querySnapshot = await getDocs(usersData);

    // Проверка на наличие данных
    if(querySnapshot.docs.length) {
      const newEmployees = querySnapshot.docs.map((docUser: any) => {
        const {firstName, surname, lastName, idUser}: any = docUser.data();
        const author = `${lastName} ${firstName} ${surname}`;
        return {idUser, fullName: author};
      });
      setEmployees([...employees, ...newEmployees]);
    }
  };

  // Получение ФИО специалиста по id
  const getNameUserById = (uid: string): string => {
    const employeData = employees.find((u: any) => u.idUser === uid);
    if(uid === "Нет") {
      return "Нет";
    }
    return employeData.fullName;
  };

  // Получение данных заявки по id
  const getApplicationById = useCallback(async (): Promise<void> => {
    setLoading(true);

    // Получение заявки по id
    const snap = await getDoc(doc(db, "applications", id));

    if (snap.exists()) {
      const {idUser, title, description, parlor, comment, status, date, executor}: any = snap.data();

      // Получение данных user из Firestore по условию
      const userData = query(collection(db, "users"),
        where("idUser", "==", idUser));
      const querySnapshotUser = await getDocs(userData);

      // Проверка на наличие данных
      if(querySnapshotUser.docs.length) {
        if(!querySnapshotUser.empty) {
          const docUser = querySnapshotUser.docs[0]!.data();
          const author = `${docUser["lastName"]} ${docUser["firstName"]} ${docUser["surname"]}`;
          // Перевод даты из Firestore в строку
          const dateString = getFormatDate(date.seconds);

          // Записываем данные заявки в state
          setApp({idUser, author, title, description, parlor, comment, status, date: dateString, executor});
        }
      } else {
        // Записываем данные заявки в state
        setApp({
          idUser: null,
          author: "Пользователь был удалён",
          title,
          description,
          parlor,
          comment,
          status,
          date: getFormatDate(date.seconds),
          executor,
        });
      }

      if (status === "Новая") {
        setStatusApp("Новая");
      } else if(status === "В работе") {
        setStatusApp("В работе");
      } else if(status === "Выполнена") {
        setStatusApp("Выполнена");
      }

      // Перевод даты в строку
      const dateString = getFormatDate(date.seconds);

      // Добавление данных заявки в store
      dispatch(
        updateApplication({
          id,
          idUser,
          author: fullNameUser,
          title,
          description,
          parlor,
          date: dateString,
          comment,
          status,
          executor,
        }),
      );
      setLoading(false);
    } else {
      setLoading(false);
      alert("Заявка не найдена");
    }
  }, []);

  useEffect(() => {
    getUserByRole();
    getApplicationById();
  }, []);

  // Изменить статус заявки
  const updateStatus = useCallback(async (): Promise<void> => {
    // Получение заявки по id
    const appRef = doc(db, "applications", id);

    try {
      if(statusApp === "В работе") {
        await updateDoc(appRef, {"status": "Выполнена"});
      } else if(statusApp === "Выполнена") {
        await updateDoc(appRef, {"status": "В работе"});
      }

      getApplicationById();

    } catch(error) {
      console.error("Ошибка обновления статуса: ", error);
    }
  }, [statusApp]);

  // Назначить исполнителя заявки
  const appointExecutor = async (): Promise<void> => {
    // Получение заявки по id
    const appRef = doc(db, "applications", id);

    try {
      await updateDoc(appRef, {"status": "В работе", "executor": selectedExecutor});
      alert("Исполнитель успешно назначен!");
      goBack();

    } catch(error) {
      console.error("Ошибка назначения исполнителя: ", error);
    }
  };

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
              <p>Исполнитель заявки:</p>
              <p>Комментарий к заявке:</p>
            </div>
            <div className={TEXT_ROWS_STYLES}>
              <p>{app["author"]}</p>
              <p>{app["title"]}</p>
              <p>{app["description"]}</p>
              <p>{app["parlor"]}</p>
              <p>{app["date"]}</p>
              <p>
                <span className={setStatusStyle(app["status"])}>{app["status"]}</span>
              </p>
              {(isAdmin && (app["executor"] === "Нет")) ? (
                <select
                  value={selectedExecutor}
                  onChange={(e: any) =>
                    setSelectedExecutor(e.target.value)
                  }
                >
                  <option value="Нет">Нет</option>
                  {employees!.map((employe: any) =>
                    <option value={employe.idUser} key={employe.idUser}>{employe.fullName}</option>,
                  )}
                </select>

              ) : (<p>{getNameUserById(app["executor"])}</p>)}
              <p>{app["comment"]}</p>
            </div>
          </div>
          {user.role === "Специалист" ? (
            <button
              className={(statusApp === "Выполнена") ? BUTTON_DELETE_STYLES : BUTTON_SAVE_STYLES}
              type="button" onClick={updateStatus}
            >
              {(statusApp === "Выполнена") ? "Поставить в работу" : "Выполнить"}
            </button>
          ) : null}
          {isAdmin ? (
            <>
              {(app["executor"] === "Нет") && (
                <button
                  className={BUTTON_SAVE_STYLES}
                  type="button" onClick={appointExecutor}
                >
                  Сохранить изменения
                </button>
              )}
              <button
                className={BUTTON_DELETE_STYLES}
                type="button" onClick={deleteApp}
              >
                Удалить заявку
              </button>
            </>
          ) : null}
        </article>
        <div className={BUTTON_STYLES}>
          <button
            type="button" onClick={goBack}
          >
            Вернуться назад
          </button>
        </div>
      </>
    );
  }
  return null;
};
