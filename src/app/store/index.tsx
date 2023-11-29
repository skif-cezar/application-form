import {configureStore} from "@reduxjs/toolkit";
import userReducer, {UserState} from "src/app/store/user/slices/userSlice";
import applicationReducer, {ApplicationState} from "src/app/store/applications/slices/applicationSlice";

export interface AppState {
  user: UserState;
  application: ApplicationState;
}

export const store = configureStore({reducer: {user: userReducer, application: applicationReducer}});
