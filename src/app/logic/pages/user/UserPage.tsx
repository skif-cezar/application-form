import {Outlet, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAuth, UserState} from "src/app/hooks/useAuth";
import {MAIN_PAGE_PATH} from "src/app/logic/layout/Layout";
import {removeUser} from "src/app/store/slices/userSlice";

/**
 *  Path to user page
 */
export const USER_PAGE_URL = "/user";

/**
 * User page
 */
export const UserPage = ():any => {
  const {isAuth, email}: UserState = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate ();
  // eslint-disable-next-line no-console
  console.log(isAuth);
  // eslint-disable-next-line no-console
  console.log(email);

  if (isAuth) {
    return (
      <>
        <nav>Menu</nav>
        <button type="button" onClick={() => {return dispatch(removeUser());}}>{`Выйти из ${email}`}</button>
        <Outlet />
      </>
    );
  }
  return navigate(MAIN_PAGE_PATH);
};