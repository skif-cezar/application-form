import {memo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearApplication} from "src/app/store/applications/slices/applicationSlice";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "src/app/hooks/useAuth";
import {MAIN_PAGE_PATH} from "src/app/logic/layout/Layout";
import {clearEmployees, removeUser} from "src/app/store/user/slices/userSlice";
import clsx from "clsx";
import styles from "src/app/logic/pages/user/UserPage.module.scss";
import {REGISTRATION_PAGE_PATH} from "src/app/components/registration/Registration";
import {APPLICATIONS_URL} from "src/app/logic/pages/admin/ApplicationsAll";
import {AppState} from "src/app/store";
import {EMPLOYEES_PAGE_URL} from "src/app/logic/pages/employees/EmployeesPage";
import {ProfilLink} from "src/app/components/profilLink/ProfilLink";

/**
 *  Path to admin page
 */
export const ADMIN_PAGE_URL = "/admin";

/**
 * Admin page
 */
export const AdminPage = memo((): any => {
  const MENU_STYLES = clsx(styles.menu);
  const LIST_STYLES = clsx(styles.list);
  const ITEM_STYLES = clsx(styles.item);
  const LINK_STYLES = clsx(styles.link);
  const LINK_ACTIVE__STYLES = clsx(styles.link, styles.active);

  const {isAuth}: any = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Получение данных о user из store
  const user = useSelector((state: AppState) => state.users.user);
  const userFullName = `${user!.lastName} ${user!.firstName} ${user!.surname}`;

  if (isAuth) {
    return (
      <>
        <nav className={MENU_STYLES}>
          <ul className={LIST_STYLES}>
            <li className={ITEM_STYLES}>
              <NavLink
                to={APPLICATIONS_URL}
                className={({isActive}: { isActive: boolean }) => isActive ? LINK_ACTIVE__STYLES : LINK_STYLES}
                onClick={() => {
                  dispatch(clearEmployees());
                }}
              >
                Все заявки
              </NavLink>
            </li>
            <li className={ITEM_STYLES}>
              <NavLink
                to={EMPLOYEES_PAGE_URL}
                className={({isActive}: { isActive: boolean }) => isActive ? LINK_ACTIVE__STYLES : LINK_STYLES}
                onClick={() => {
                  dispatch(clearEmployees());
                  dispatch(clearApplication());
                }}
              >
                Сотрудники
              </NavLink>
            </li>
          </ul>
          <ProfilLink
            fullName={userFullName} role={user!.role}
            onClick={() => {
              navigate(REGISTRATION_PAGE_PATH);
              dispatch(removeUser());
              dispatch(clearApplication());
              dispatch(clearEmployees());
            }}
          />
        </nav>
        <Outlet />
      </>
    );
  }
  return navigate(MAIN_PAGE_PATH);
});