import {memo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearApplication} from "src/app/store/applications/slices/applicationSlice";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {removeUser} from "src/app/store/user/slices/userSlice";
import {APPLICATION_FORM_URL} from "src/app/components/applicationForm/ApplicationForm";
import {APPLICATION_USER_URL} from "src/app/logic/pages/user/ApplicationUser";
import clsx from "clsx";
import styles from "src/app/logic/pages/user/UserPage.module.scss";
import {REGISTRATION_PAGE_PATH} from "src/app/components/registration/Registration";
import {AppState} from "src/app/store";
import {ProfilLink} from "src/app/components/profilLink/ProfilLink";

/**
 *  Path to user page
 */
export const USER_PAGE_URL = "/user";

/**
 * User page
 */
export const UserPage = memo((): any => {
  const MENU_STYLES = clsx(styles.menu);
  const LIST_STYLES = clsx(styles.list);
  const ITEM_STYLES = clsx(styles.item);
  const LINK_STYLES = clsx(styles.link);
  const LINK_ACTIVE__STYLES = clsx(styles.link, styles.active);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Получение данных о user из store
  const user = useSelector((state: AppState) => state.users.user);
  const userFullName = `${user!.lastName} ${user!.firstName} ${user!.surname}`;

  return (
    <>
      <nav className={MENU_STYLES}>
        {(user!.role === "Пользователь") ? (
          <ul className={LIST_STYLES}>
            <li className={ITEM_STYLES}>
              <NavLink
                to={APPLICATION_FORM_URL}
                className={({isActive}: { isActive: boolean }) => isActive ? LINK_ACTIVE__STYLES : LINK_STYLES}
                onClick={() => {
                  dispatch(clearApplication());
                }}
              >
                Новая заявка
              </NavLink>
            </li>
            <li className={ITEM_STYLES}>
              <NavLink
                to={APPLICATION_USER_URL}
                className={({isActive}: { isActive: boolean }) => isActive ? LINK_ACTIVE__STYLES : LINK_STYLES}
              >
                Мои заявки
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className={LIST_STYLES}>
            <li className={ITEM_STYLES}>
              <NavLink
                to={APPLICATION_USER_URL}
                className={({isActive}: { isActive: boolean }) => isActive ? LINK_ACTIVE__STYLES : LINK_STYLES}
              >
                Мои заявки
              </NavLink>
            </li>
            <li className={ITEM_STYLES}>
              <NavLink
                to={APPLICATION_FORM_URL}
                className={({isActive}: { isActive: boolean }) => isActive ? LINK_ACTIVE__STYLES : LINK_STYLES}
                onClick={() => {
                  dispatch(clearApplication());
                }}
              >
                Отчёт
              </NavLink>
            </li>
          </ul>
        )}
        <ProfilLink
          fullName={userFullName} role={user!.role}
          onClick={() => {
            navigate(REGISTRATION_PAGE_PATH);
            dispatch(removeUser());
            dispatch(clearApplication());
          }}
        />
      </nav>
      <Outlet />
    </>
  );
});
