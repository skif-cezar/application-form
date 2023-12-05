import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserState {
  email: string | null;
  token: string | null;
  id: string | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  role: string | null;
}

const initialState: UserState = {
  email: null,
  token: null,
  id: null,
  isLoggedIn: false,
  isAdmin: false,
  role: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state: any, action: PayloadAction<UserState>) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.isAdmin = action.payload.isAdmin;
      state.role = action.payload.role;
    },
    removeUser(state: any) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.role = null;
    },
  },
});

// eslint-disable-next-line @typescript-eslint/typedef
export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;