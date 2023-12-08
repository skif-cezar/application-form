import {useSelector} from "react-redux";

export interface UserState {
  isAuth: boolean;
  token: string | null;
  idUser: string | null;
}

export const useAuth = (): UserState => {
  const {isLoggedIn, token, idUser}: { isLoggedIn: boolean; token: string; idUser: string } = useSelector(
    (state: any) => state.users.user,
  );
  return {
    isAuth: isLoggedIn,
    token,
    idUser,
  };
};
