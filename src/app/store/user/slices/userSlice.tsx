import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserState {
  email: string | null;
  token: string | null;
  id: string | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

const initialState: UserState = {
  email: null,
  token: null,
  id: null,
  isLoggedIn: false,
  isAdmin: false,
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
    },
    removeUser(state: any) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.isLoggedIn = false;
      state.isAdmin = false;
    },
  },
});

// eslint-disable-next-line @typescript-eslint/typedef
export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;