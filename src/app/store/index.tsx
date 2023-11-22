import {configureStore} from "@reduxjs/toolkit";
import useReducer from "src/app/store/slices/userSlice";

export const store = configureStore({reducer: {user: useReducer}});