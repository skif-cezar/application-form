import {memo, useState, useCallback} from "react";
import {useDispatch} from "react-redux";
import {collection, query, where, orderBy, limit, getDocs} from "firebase/firestore";
import {db} from "src/firebase";
import {
  ApplicationState,
  addAppLastVisible,
  addApplication,
  clearApplication,
} from "src/app/store/applications/slices/applicationSlice";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {useAuth, UserState} from "src/app/hooks/useAuth";
import {MAIN_PAGE_PATH} from "src/app/logic/layout/Layout";
import {removeUser} from "src/app/store/user/slices/userSlice";
import {APPLICATION_FORM_URL} from "src/app/components/applicationForm/ApplicationForm";
import {APPLICATION_USER_URL} from "src/app/logic/pages/user/ApplicationUser";
import {Spinner} from "src/app/components/spinner/Spinner";
import clsx from "clsx";
import styles from "src/app/logic/pages/user/UserPage.module.scss";
import {REGISTRATION_PAGE_PATH} from "src/app/components/registration/Registration";
import {getFormatDate} from "src/app/utility/getFormatDate";

/**
 *  Path to user page
 */
export const USER_PAGE_URL = "/user";

/**
 * User page
 */
export const UserPage = memo((): any => {
  const BUTTON_STYLES = clsx(styles.button);
  const MENU_STYLES = clsx(styles.menu);
  const LIST_STYLES = clsx(styles.list);
  const ITEM_STYLES = clsx(styles.item);
  const LINK_STYLES = clsx(styles.link);
  const LINK_ACTIVE__STYLES = clsx(styles.link, styles.active);

  const {isAuth, email}: UserState = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const getApplicationData = useCallback(async (): Promise<void> => {
    setLoading(true);

    // Получение данных из Firestore по условию с лимитом по 6 записей
    const appData = query(collection(db, "applications"),
      where("author", "==", email),
      orderBy("date", "desc"),
      limit(6));
    const querySnapshot = await getDocs(appData);

    if(querySnapshot.docs.length !== 0) {
      // Получение последних видимых записей
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      // Добавление последних видимых данных заявки в store
      dispatch(
        addAppLastVisible(lastVisible),
      );

      querySnapshot.forEach((doc: any) => {
        // id заявки
        const {id}: ApplicationState = doc;
        const {author, title, description, parlor, comment, status}: ApplicationState = doc.data();

        // Перевод даты из Firestore в строку
        const date = getFormatDate(doc.data().date.seconds);

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
    } else {
      alert("Заявок нет");
    }
    setLoading(false);

  }, []);

  if (isAuth) {
    return (
      <>
        <nav className={MENU_STYLES}>
          <ul className={LIST_STYLES}>
            <li className={ITEM_STYLES}>
              <NavLink
                to={APPLICATION_FORM_URL}
                className={({isActive}: { isActive: boolean }) => isActive ? LINK_ACTIVE__STYLES : LINK_STYLES}
                onClick={() => dispatch(clearApplication())}
              >
                Новая заявка
              </NavLink>
            </li>
            <li className={ITEM_STYLES}>
              <NavLink
                to={APPLICATION_USER_URL}
                className={({isActive}: { isActive: boolean }) => isActive ? LINK_ACTIVE__STYLES : LINK_STYLES}
                onClick={getApplicationData}
              >
                Мои заявки
              </NavLink>
            </li>
          </ul>
          <button
            className={BUTTON_STYLES}
            type="button"
            onClick={() => {
              navigate(REGISTRATION_PAGE_PATH);
              dispatch(removeUser());
              dispatch(clearApplication());
            }}
          >
            Выйти из аккаунта
          </button>
        </nav>
        {loading ? (<Spinner />) : (<Outlet />)}
      </>
    );
  }
  return navigate(MAIN_PAGE_PATH);
});
