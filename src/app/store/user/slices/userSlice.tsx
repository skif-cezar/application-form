import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserState {
  firstName: string | null;
  surname: string | null;
  lastName: string | null;
  email: string | null;
  token: string | null;
  id: string | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  role: string | null;
}

export interface EmployeesState {
  employees: UserState[] | null;
  user: any | null;
  userLastVisible: any | undefined;
  isShowAlert: boolean;
}

const initialState: EmployeesState = {
  employees: [],
  user: {
    firstName: null,
    surname: null,
    lastName: null,
    email: null,
    token: null,
    id: null,
    isLoggedIn: false,
    isAdmin: false,
    role: null,
  },
  userLastVisible: null,
  isShowAlert: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addEmploye(state: any, action: PayloadAction<UserState>) {
      const isDuplicate = state.employees.some((employe: UserState) => employe.id === action.payload.id);

      if (!isDuplicate) {
        state.employees = [...state.employees, action.payload];
      }
    },
    removeEmploye(state: any, action: PayloadAction<UserState>) {
      state.employees = state.employees.filter((employe: any) => employe.id !== action.payload);
    },
    updateEmploye(state: any, action: PayloadAction<UserState>) {
      const {id, role}: UserState = action.payload;
      state.employees = state.employees.map((employe: UserState) => employe.id === id ? {...employe, role} : employe);
    },
    addUserLastVisible(state: any, action: PayloadAction<any>) {
      state.userLastVisible = action.payload;
    },
    clearUsers(state: any) {
      state.employees = [];
      state.user = null;
      state.userLastVisible = null;
    },
    clearEmployees(state: any) {
      state.employees = [];
      state.userLastVisible = null;
      state.isShowAlert = false;
    },
    setUser(state: any, action: PayloadAction<UserState>) {
      state.user.firstName = action.payload.firstName;
      state.user.surname = action.payload.surname;
      state.user.lastName = action.payload.lastName;
      state.user.email = action.payload.email;
      state.user.token = action.payload.token;
      state.user.id = action.payload.id;
      state.user.isLoggedIn = action.payload.isLoggedIn;
      state.user.isAdmin = action.payload.isAdmin;
      state.user.role = action.payload.role;
    },
    removeUser(state: any) {
      state.user.firstName = null;
      state.user.surname = null;
      state.user.lastName = null;
      state.user.email = null;
      state.user.token = null;
      state.user.id = null;
      state.user.isLoggedIn = false;
      state.user.isAdmin = false;
      state.user.role = null;
    },
    addIsShowEmployees(state: any, action: PayloadAction<any>) {
      state.isShowAlert = action.payload;
    },
  },
});

// eslint-disable-next-line @typescript-eslint/typedef
export const {
  addEmploye,
  removeEmploye,
  updateEmploye,
  clearUsers,
  setUser,
  removeUser,
  addUserLastVisible,
  clearEmployees,
  addIsShowEmployees,
} = userSlice.actions;

export default userSlice.reducer;