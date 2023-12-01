import {configureStore} from "@reduxjs/toolkit";
import userReducer, {UserState} from "src/app/store/user/slices/userSlice";
import applicationsReducer, {ApplicationArrState} from "src/app/store/applications/slices/applicationSlice";
import {CurriedGetDefaultMiddleware} from "@reduxjs/toolkit/dist/getDefaultMiddleware";

export interface AppState {
  user: UserState;
  applications: ApplicationArrState;
}

export const store = configureStore({
  reducer: {user: userReducer, applications: applicationsReducer},
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}),
});
