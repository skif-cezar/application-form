import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAuth, UserState} from "src/app/hooks/useAuth";
import {MAIN_PAGE_PATH} from "src/app/logic/layout/Layout";
import {removeUser} from "src/app/store/user/slices/userSlice";
import {APPLICATION_FORM_URL} from "src/app/components/applicationForm/ApplicationForm";
import {APPLICATION_USER_URL} from "src/app/logic/pages/user/ApplicationUser";
import clsx from "clsx";
import styles from "src/app/logic/pages/user/UserPage.module.scss";

/**
 *  Path to user page
 */
export const USER_PAGE_URL = "/user";

/**
 * User page
 */
export const UserPage = (): any => {
  const BUTTON_STYLES = clsx(styles.button);
  const MENU_STYLES = clsx(styles.menu);
  const LIST_STYLES = clsx(styles.list);
  const ITEM_STYLES = clsx(styles.item);
  const LINK_STYLES = clsx(styles.link);
  const LINK_ACTIVE__STYLES = clsx(styles.link, styles.active);

  const {isAuth, email}: UserState = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line no-console
  console.log(isAuth);
  // eslint-disable-next-line no-console
  console.log(email);

  if (isAuth) {
    return (
      <>
        <nav className={MENU_STYLES}>
          <ul className={LIST_STYLES}>
            <li className={ITEM_STYLES}>
              <NavLink
                to={APPLICATION_FORM_URL}
                className={({isActive}: { isActive: boolean }) => {
                  return isActive ? LINK_ACTIVE__STYLES : LINK_STYLES;
                }}
              >
                Новая заявка
              </NavLink>
            </li>
            <li className={ITEM_STYLES}>
              <NavLink
                to={APPLICATION_USER_URL}
                className={({isActive}: { isActive: boolean }) => {
                  return isActive ? LINK_ACTIVE__STYLES : LINK_STYLES;
                }}
              >
                Мои заявки
              </NavLink>
            </li>
          </ul>
          <button
            className={BUTTON_STYLES}
            type="button"
            onClick={() => {
              return dispatch(removeUser());
            }}
          >
            Выйти из аккаунта
          </button>
        </nav>
        <Outlet />
      </>
    );
  }
  return navigate(MAIN_PAGE_PATH);
};
