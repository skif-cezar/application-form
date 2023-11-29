import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ApplicationState {
  author: string | null;
  title: string | null;
  description: string | null;
  parlor: string | null;
  date: Date | null;
  comment: string | null;
  status: string | null;
}

const initialState: ApplicationState = {
  author: null,
  title: null,
  description: null,
  parlor: null,
  date: null,
  comment: null,
  status: null,
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    addApplication(state: any, action: PayloadAction<ApplicationState>) {
      state.author = action.payload.author;
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.parlor = action.payload.parlor;
      state.date = action.payload.date;
      state.comment = action.payload.comment;
      state.status = action.payload.status;
    },
    removeApplication(state: any) {
      state.author = null;
      state.title = null;
      state.description = null;
      state.parlor = null;
      state.date = null;
      state.comment = null;
      state.status = null;
    },
  },
});

// eslint-disable-next-line @typescript-eslint/typedef
export const {addApplication, removeApplication} = applicationSlice.actions;

export default applicationSlice.reducer;
