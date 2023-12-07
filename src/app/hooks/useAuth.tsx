import {useSelector} from "react-redux";

export interface UserState {
  isAuth: boolean;
  email: string | null;
  token: string | null;
  idUser: string | null;
}

export const useAuth = (): UserState => {
  const {email, token, idUser}: { email: string; token: string; idUser: string } = useSelector(
    (state: any) => state.users.user,
  );
  return {
    isAuth: !!email,
    email,
    token,
    idUser,
  };
};
