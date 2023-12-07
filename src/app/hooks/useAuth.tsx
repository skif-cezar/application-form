import {useSelector} from "react-redux";

export interface UserState {
  isAuth: boolean;
  email: string | null;
  token: string | null;
  id: string | null;
}

export const useAuth = (): UserState => {
  const {email, token, id}: { email: string; token: string; id: string } = useSelector(
    (state: any) => state.users.user,
  );
  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
};
