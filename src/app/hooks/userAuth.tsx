import {useSelector} from "react-redux";

interface UserState {
  isAuth: boolean;
  email: string | null;
  token: string | null;
  id: string | null;
}

export const useAuth = (): UserState => {
  const {email, token, id}: { email: string; token: string; id: string } = useSelector(
    (state: any) => {return state.user;},
  );

  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
};
