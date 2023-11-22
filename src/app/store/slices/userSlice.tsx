import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
  email: string | null;
  token: Promise<string> | null;
  id: string | null;
}

const initialState: UserState = {
  email: null,
  token: null,
  id: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state: any, action: PayloadAction<UserState>) {
      const newState = {...state};

      newState.email = action.payload.email;
      newState.token = action.payload.token;
      newState.id = action.payload.id;
    },
    removeUser(state: any) {
      const newState = {...state};

      newState.email = null;
      newState.token = null;
      newState.id = null;
    },
  },
});

// eslint-disable-next-line @typescript-eslint/typedef
export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;