import {configureStore} from "@reduxjs/toolkit";
import userReducer, {EmployeesState} from "src/app/store/user/slices/userSlice";
import applicationsReducer, {ApplicationArrState} from "src/app/store/applications/slices/applicationSlice";
import {CurriedGetDefaultMiddleware} from "@reduxjs/toolkit/dist/getDefaultMiddleware";

export interface AppState {
  users: EmployeesState;
  applications: ApplicationArrState;
}

export const store = configureStore({
  reducer: {users: userReducer, applications: applicationsReducer},
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}),
});
